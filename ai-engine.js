// ============================================
// Vantiq Spark — AI Engine (Latest OpenAI API)
// ============================================
// Uses OpenAI Chat Completions API with Structured Outputs
// Default model: gpt-4.1 (supports gpt-5.4, o3-mini, etc.)

class AIEngine {
    constructor() {
        this.apiKey = sessionStorage.getItem('openai_api_key') || '';
        this.model = sessionStorage.getItem('openai_model') || 'gpt-4.1';
        this.baseUrl = 'https://api.openai.com/v1/chat/completions';
        this.maxRetries = 2;
        this.timeout = 600000; // 10 mins per agent call to accommodate slow GPT-5.4 JSON generation
        this.useWebSearch = false; // Enable for web-search-enabled models
    }

    setApiKey(key) {
        this.apiKey = key;
        sessionStorage.setItem('openai_api_key', key);
    }

    setModel(model) {
        this.model = model;
        sessionStorage.setItem('openai_model', model);
    }

    hasApiKey() {
        return this.apiKey && this.apiKey.trim().length > 10;
    }

    /**
     * Call an agent with the OpenAI Chat Completions API.
     * Uses JSON mode for structured output.
     */
    async callAgent(agentName, systemPrompt, userMessage, retryCount = 0) {
        if (!this.hasApiKey()) {
            throw new Error('OpenAI API key not configured. Please set your API key in Settings.');
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        const startTime = Date.now();
        // Log elapsed time for long-running requests
        const elapsedTimer = setInterval(() => {
            const elapsed = Math.round((Date.now() - startTime) / 1000);
            if (elapsed > 0 && elapsed % 30 === 0) {
                console.log(`[${agentName}] Still waiting... ${elapsed}s elapsed`);
            }
        }, 5000);

        try {
            const requestBody = {
                model: this.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage }
                ],
                response_format: { type: 'json_object' },
                temperature: 0.7,
                max_tokens: 8192,
                top_p: 0.95,
                frequency_penalty: 0.1
            };

            // Log prompt size for debugging
            console.log(`[${agentName}] Sending Request — Prompt Size: ${Math.round((systemPrompt.length + userMessage.length) / 1024)} KB`);

            // Removed 16k override to prevent runaway generation on newer models
            // max_tokens is kept at 8192 for all models to enforce conciseness

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                signal: controller.signal,
                body: JSON.stringify(requestBody)
            });

            clearTimeout(timeoutId);
            clearInterval(elapsedTimer);

            if (!response.ok) {
                const errorBody = await response.text();
                if (response.status === 429 && retryCount < this.maxRetries) {
                    const delay = Math.pow(2, retryCount + 1) * 1000;
                    console.warn(`[${agentName}] Rate limited. Retrying in ${delay}ms...`);
                    await this._sleep(delay);
                    return this.callAgent(agentName, systemPrompt, userMessage, retryCount + 1);
                }
                let err;
                if (response.status === 429) {
                    err = new Error('Rate limit exceeded. Please wait a moment and try again.');
                    err.type = 'rate_limit';
                } else if (response.status === 401) {
                    err = new Error('Invalid API key. Please check your OpenAI API key in Settings.');
                    err.type = 'auth';
                } else if (response.status === 404) {
                    err = new Error(`Model "${this.model}" not found. Try a different model in Settings.`);
                    err.type = 'model_not_found';
                } else if (response.status === 400) {
                    err = new Error(`API error (400 Bad Request). The request may be too large or contain invalid characters.`);
                    err.type = 'bad_request';
                    err.details = errorBody;
                } else {
                    err = new Error(`API error (${response.status}): ${errorBody}`);
                    err.type = 'api_error';
                }
                throw err;
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;

            if (!content || !data.choices || data.choices.length === 0) {
                const err = new Error(`[${agentName}] Empty response from API (no choices returned)`);
                err.type = 'empty_response';
                throw err;
            }

            // Log usage info
            if (data.usage) {
                console.log(`[${agentName}] Tokens: ${data.usage.prompt_tokens} in / ${data.usage.completion_tokens} out`);
            }

            try {
                let sanitizedContent = content;
                // Pre-parse sanitization
                sanitizedContent = sanitizedContent.replace(/[\u200B-\u200D\uFEFF]/g, ''); // strip zero-width chars
                sanitizedContent = sanitizedContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // remove JS comments
                sanitizedContent = sanitizedContent.replace(/,\s*([}\]])/g, '$1'); // fix trailing commas
                sanitizedContent = sanitizedContent.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":'); // quote unquoted keys
                
                const parsed = JSON.parse(sanitizedContent);
                console.log(`[${agentName}] ✓ Response received`);
                return parsed;
            } catch (parseErr) {
                // Try to extract JSON from markdown code fences
                const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                if (jsonMatch) {
                    try {
                        return JSON.parse(jsonMatch[1]);
                    } catch (e) { /* fall through to truncation recovery */ }
                }
                // Attempt truncation recovery: auto-close unclosed braces/brackets
                try {
                    let truncated = content.trim();
                    let openBraces = 0, openBrackets = 0;
                    let inString = false, escape = false;
                    for (const ch of truncated) {
                        if (escape) { escape = false; continue; }
                        if (ch === '\\') { escape = true; continue; }
                        if (ch === '"') { inString = !inString; continue; }
                        if (!inString) {
                            if (ch === '{') openBraces++;
                            else if (ch === '}') openBraces--;
                            else if (ch === '[') openBrackets++;
                            else if (ch === ']') openBrackets--;
                        }
                    }
                    // Remove trailing comma before closing
                    truncated = truncated.replace(/,\s*$/, '');
                    for (let i = 0; i < openBrackets; i++) truncated += ']';
                    for (let i = 0; i < openBraces; i++) truncated += '}';
                    const recovered = JSON.parse(truncated);
                    console.warn(`[${agentName}] Recovered truncated JSON (closed ${openBraces} braces, ${openBrackets} brackets)`);
                    return recovered;
                } catch (recoveryErr) {
                    // Recovery failed
                }
                if (retryCount < this.maxRetries) {
                    console.warn(`[${agentName}] JSON parse failed, retrying...`);
                    return this.callAgent(agentName, systemPrompt, userMessage, retryCount + 1);
                }
                const err = new Error(`[${agentName}] Failed to parse JSON: ${parseErr.message}`);
                err.type = 'parse_error';
                throw err;
            }

        } catch (err) {
            clearTimeout(timeoutId);
            clearInterval(elapsedTimer);

            // Handle network errors/fetch failures with retries
            const isNetworkError = err instanceof TypeError || err.name === 'TypeError' || err.message.includes('fetch');
            if (isNetworkError && retryCount < this.maxRetries) {
                const delay = Math.pow(2, retryCount + 1) * 1000;
                console.warn(`[${agentName}] Network error: ${err.message}. Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${this.maxRetries})`);
                await this._sleep(delay);
                return this.callAgent(agentName, systemPrompt, userMessage, retryCount + 1);
            }

            if (err.name === 'AbortError') {
                const timeoutErr = new Error(`[${agentName}] Request timed out after ${this.timeout / 1000}s`);
                timeoutErr.type = 'timeout';
                throw timeoutErr;
            }
            if (isNetworkError && !err.type) {
                err.type = 'network';
            }
            throw err;
        }
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Singleton
window.aiEngine = new AIEngine();

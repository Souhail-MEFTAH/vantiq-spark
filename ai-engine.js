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

            if (!response.ok) {
                const errorBody = await response.text();
                if (response.status === 429 && retryCount < this.maxRetries) {
                    const delay = Math.pow(2, retryCount + 1) * 1000;
                    console.warn(`[${agentName}] Rate limited. Retrying in ${delay}ms...`);
                    await this._sleep(delay);
                    return this.callAgent(agentName, systemPrompt, userMessage, retryCount + 1);
                }
                if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your OpenAI API key in Settings.');
                }
                if (response.status === 404) {
                    throw new Error(`Model "${this.model}" not found. Try a different model in Settings.`);
                }
                throw new Error(`API error (${response.status}): ${errorBody}`);
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;

            if (!content) {
                throw new Error(`[${agentName}] Empty response from API`);
            }

            // Log usage info
            if (data.usage) {
                console.log(`[${agentName}] Tokens: ${data.usage.prompt_tokens} in / ${data.usage.completion_tokens} out`);
            }

            try {
                const parsed = JSON.parse(content);
                console.log(`[${agentName}] ✓ Response received`);
                return parsed;
            } catch (parseErr) {
                // Try to extract JSON from markdown code fences
                const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                if (jsonMatch) {
                    return JSON.parse(jsonMatch[1]);
                }
                if (retryCount < this.maxRetries) {
                    console.warn(`[${agentName}] JSON parse failed, retrying...`);
                    return this.callAgent(agentName, systemPrompt, userMessage, retryCount + 1);
                }
                throw new Error(`[${agentName}] Failed to parse JSON: ${parseErr.message}`);
            }

        } catch (err) {
            clearTimeout(timeoutId);

            // Handle network errors/fetch failures with retries
            const isNetworkError = err instanceof TypeError || err.name === 'TypeError' || err.message.includes('fetch');
            if (isNetworkError && retryCount < this.maxRetries) {
                const delay = Math.pow(2, retryCount + 1) * 1000;
                console.warn(`[${agentName}] Network error: ${err.message}. Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${this.maxRetries})`);
                await this._sleep(delay);
                return this.callAgent(agentName, systemPrompt, userMessage, retryCount + 1);
            }

            if (err.name === 'AbortError') {
                throw new Error(`[${agentName}] Request timed out after ${this.timeout / 1000}s`);
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

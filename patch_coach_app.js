const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// ═══════════════════════════════════════════════
// 1. Add AI Coach logic BEFORE "window.app = {"
// ═══════════════════════════════════════════════
const coachCode = `

// ══════════════════════════════════════════════
// AI Coach — Contextual Chat Widget
// ══════════════════════════════════════════════

const coachHistory = {}; // per-panel conversation history
let coachCurrentPanel = null;

const COACH_PANEL_MAP = {
    analysis:       { contextKey: 'analysis',       label: 'Problem Analysis' },
    domain:         { contextKey: 'domainModel',    label: 'Domain Model' },
    architecture:   { contextKey: 'architecture',   label: 'System Architecture' },
    aimodels:       { contextKey: 'aiModels',       label: 'AI Model Recommendations' },
    agentic:        { contextKey: 'agentic',        label: 'Agentic AI Guide' },
    events:         { contextKey: 'events',         label: 'Event System Design' },
    implementation: { contextKey: 'implementation',  label: 'Implementation Plan' },
    diagrams:       { contextKey: 'diagrams',       label: 'Architecture Diagrams' },
    demo:           { contextKey: 'demo',           label: 'Demo Scenarios' },
    training:       { contextKey: 'training',       label: 'Training Labs' },
    business:       { contextKey: 'businessValue',  label: 'Business Value Justifier' },
    competitive:    { contextKey: 'competitive',    label: 'Competitive Analysis' }
};

function openCoach(panelKey) {
    const mapping = COACH_PANEL_MAP[panelKey];
    if (!mapping) return;

    coachCurrentPanel = panelKey;
    const drawer = document.getElementById('aiCoachDrawer');
    const contextLabel = document.getElementById('coachContextLabel');
    const messagesEl = document.getElementById('coachMessages');

    // Update header context label
    contextLabel.textContent = mapping.label;

    // Initialize history for this panel if needed
    if (!coachHistory[panelKey]) {
        coachHistory[panelKey] = [];
    }

    // Render existing messages or show welcome
    messagesEl.innerHTML = '';
    if (coachHistory[panelKey].length === 0) {
        // Show welcome message
        const welcomeHtml = \`<div class="coach-msg assistant">
            <div class="coach-msg-avatar">🎓</div>
            <div class="coach-msg-bubble">
                <strong>Welcome!</strong> I'm your AI Coach for the <em>\${mapping.label}</em> section.<br><br>
                I can help you understand what was generated here, explain technical concepts, and answer any questions you have. Just ask me anything!<br><br>
                <em style="color:var(--text-tertiary);font-size:12px">Try: "Explain this section in simple terms" or "What are the key takeaways?"</em>
            </div>
        </div>\`;
        messagesEl.innerHTML = welcomeHtml;
    } else {
        // Re-render saved messages
        coachHistory[panelKey].forEach(msg => {
            appendCoachMessage(msg.role, msg.content, false);
        });
    }

    // Open drawer
    drawer.classList.add('open');
    
    // Focus input  
    setTimeout(() => document.getElementById('coachInput').focus(), 400);
}

function closeCoach() {
    document.getElementById('aiCoachDrawer').classList.remove('open');
}

function appendCoachMessage(role, content, save = true) {
    const messagesEl = document.getElementById('coachMessages');
    const avatar = role === 'assistant' ? '🎓' : '👤';
    
    const msgDiv = document.createElement('div');
    msgDiv.className = \`coach-msg \${role}\`;
    msgDiv.innerHTML = \`
        <div class="coach-msg-avatar">\${avatar}</div>
        <div class="coach-msg-bubble">\${role === 'assistant' ? formatCoachMarkdown(content) : escapeHtml(content)}</div>
    \`;
    messagesEl.appendChild(msgDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    
    if (save && coachCurrentPanel) {
        coachHistory[coachCurrentPanel].push({ role, content });
    }
    
    return msgDiv;
}

function formatCoachMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
        .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
        .replace(/\`(.+?)\`/g, '<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:12px">$1</code>')
        .replace(/\\n/g, '<br>');
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

async function sendCoachMessage() {
    const input = document.getElementById('coachInput');
    const sendBtn = document.getElementById('coachSendBtn');
    const message = input.value.trim();
    if (!message || !coachCurrentPanel) return;

    if (!aiEngine.hasApiKey()) {
        alert('Please configure your OpenAI API key in Settings first.');
        return;
    }

    // Add user message
    appendCoachMessage('user', message);
    input.value = '';
    sendBtn.disabled = true;

    // Show typing indicator
    const messagesEl = document.getElementById('coachMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'coach-msg assistant';
    typingDiv.id = 'coachTyping';
    typingDiv.innerHTML = \`
        <div class="coach-msg-avatar">🎓</div>
        <div class="coach-msg-bubble">
            <div class="coach-typing"><span></span><span></span><span></span></div>
        </div>
    \`;
    messagesEl.appendChild(typingDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
        const mapping = COACH_PANEL_MAP[coachCurrentPanel];
        const contextData = state.results[mapping.contextKey];
        
        // Build context string (truncated to prevent token overflow)
        let contextStr = '';
        if (contextData) {
            contextStr = JSON.stringify(contextData);
            if (contextStr.length > 12000) {
                contextStr = contextStr.substring(0, 12000) + '... (truncated for brevity)';
            }
        }

        const systemPrompt = \`You are the Vantiq Spark AI Coach — a highly professional and educational assistant embedded within an AI-powered solution design tool.

You are currently helping the user understand the "\${mapping.label}" section of their generated solution.

CONTEXT (the generated output for this specific tab):
\${contextStr}

RULES:
- Explain concepts clearly for beginners who may not have technical expertise.
- Reference specific items, names, and values from the generated output above to ground your explanations.
- Be professional, educational, warm, and encouraging.
- Keep answers concise: 2-4 short paragraphs maximum.
- Use markdown formatting (bold for emphasis, bullet points for lists).
- If the user asks about content from other tabs, politely suggest they open the AI Coach on that specific tab for the most accurate context.
- Never fabricate information that isn't in the context above.
- Respond in the same language the user writes in.\`;

        // Build conversation messages
        const messages = [
            { role: 'system', content: systemPrompt }
        ];
        
        // Add conversation history (last 10 exchanges to keep prompt size manageable)
        const history = coachHistory[coachCurrentPanel] || [];
        const recentHistory = history.slice(-20); // last 10 pairs
        recentHistory.forEach(msg => {
            messages.push({ role: msg.role, content: msg.content });
        });

        // Call OpenAI directly
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': \`Bearer \${aiEngine.apiKey}\`
            },
            signal: controller.signal,
            body: JSON.stringify({
                model: aiEngine.model,
                messages: messages,
                temperature: 0.6,
                max_tokens: 1024
            })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(\`API error (\${response.status}): \${errBody.substring(0, 200)}\`);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'No response received.';

        // Remove typing indicator and add response
        const typing = document.getElementById('coachTyping');
        if (typing) typing.remove();

        appendCoachMessage('assistant', reply);

    } catch (error) {
        console.error('Coach error:', error);
        const typing = document.getElementById('coachTyping');
        if (typing) typing.remove();
        
        appendCoachMessage('assistant', \`⚠️ **Error:** \${error.message}\\n\\nPlease check your API key and try again.\`);
    }

    sendBtn.disabled = false;
    input.focus();
}

`;

// Inject before "// ── Public API ──"
code = code.replace(
    '// ── Public API ──',
    coachCode + '// ── Public API ──'
);

// ═══════════════════════════════════════════════
// 2. Add coach methods to window.app exports
// ═══════════════════════════════════════════════
code = code.replace(
    'exportToPDF\n};',
    `exportToPDF,
    openCoach,
    closeCoach,
    sendCoachMessage
};`
);

// ═══════════════════════════════════════════════
// 3. Add i18n translations for coach
// ═══════════════════════════════════════════════

// English
code = code.replace(
    '"btn-regenerate": "Regenerate",',
    `"btn-regenerate": "Regenerate",
        "coach-title": "AI Coach",
        "coach-btn": "AI Coach",
        "coach-placeholder": "Ask about this section...",`
);

// Korean - find a Korean string to anchor on
code = code.replace(
    '"btn-regenerate": "재생성",',
    `"btn-regenerate": "재생성",
        "coach-title": "AI 코치",
        "coach-btn": "AI 코치",
        "coach-placeholder": "이 섹션에 대해 질문하세요...",`
);

// Japanese
code = code.replace(
    '"btn-regenerate": "再生成",',
    `"btn-regenerate": "再生成",
        "coach-title": "AIコーチ",
        "coach-btn": "AIコーチ",
        "coach-placeholder": "このセクションについて質問...",`
);

// Arabic
code = code.replace(
    '"btn-regenerate": "إعادة التوليد",',
    `"btn-regenerate": "إعادة التوليد",
        "coach-title": "المدرب الذكي",
        "coach-btn": "المدرب الذكي",
        "coach-placeholder": "...اسأل عن هذا القسم",`
);

fs.writeFileSync('app.js', code);
console.log('AI Coach engine logic + i18n injected into app.js');

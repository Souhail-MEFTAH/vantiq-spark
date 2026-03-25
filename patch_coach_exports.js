const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// ═══════════════════════════════════════════════
// 1. Fix window.app exports — add coach methods
// ═══════════════════════════════════════════════
code = code.replace(
    '    exportToPDF\r\n};',
    `    exportToPDF,
    openCoach,
    closeCoach,
    sendCoachMessage,
    askCoachSuggestion
};`
);

// Also try LF-only line endings as fallback
code = code.replace(
    '    exportToPDF\n};',
    `    exportToPDF,
    openCoach,
    closeCoach,
    sendCoachMessage,
    askCoachSuggestion
};`
);

// ═══════════════════════════════════════════════
// 2. Add tab-specific suggested prompts to COACH_PANEL_MAP
// ═══════════════════════════════════════════════

// Replace the existing COACH_PANEL_MAP with an enhanced version that includes suggestions
const oldMap = `const COACH_PANEL_MAP = {
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
};`;

const newMap = `const COACH_PANEL_MAP = {
    analysis:       { contextKey: 'analysis',       label: 'Problem Analysis',          suggestions: ['What is the core problem being solved here?', 'Why is Vantiq a good fit for this use case?', 'Explain the AI tasks identified'] },
    domain:         { contextKey: 'domainModel',    label: 'Domain Model',              suggestions: ['What are domain entities and why do they matter?', 'How do these entities relate to each other?', 'What is a bounded context?'] },
    architecture:   { contextKey: 'architecture',   label: 'System Architecture',       suggestions: ['Walk me through this architecture step by step', 'What makes this event-driven?', 'How does data flow through the system?'] },
    aimodels:       { contextKey: 'aiModels',       label: 'AI Model Recommendations',  suggestions: ['Why were these specific AI models chosen?', 'What is the difference between these model types?', 'How would these models run in production?'] },
    agentic:        { contextKey: 'agentic',        label: 'Agentic AI Guide',          suggestions: ['What is an AI agent and how is it different from a model?', 'How do these agents coordinate with each other?', 'What tools do the agents use?'] },
    events:         { contextKey: 'events',         label: 'Event System Design',       suggestions: ['What is event-driven architecture?', 'Explain the event flow in simple terms', 'What are Visual Event Handlers?'] },
    implementation: { contextKey: 'implementation',  label: 'Implementation Plan',       suggestions: ['What should we build first?', 'What Vantiq tools are needed for each phase?', 'How long would this take to implement?'] },
    diagrams:       { contextKey: 'diagrams',       label: 'Architecture Diagrams',     suggestions: ['Walk me through this diagram', 'What do the arrows represent?', 'How do the components connect?'] },
    demo:           { contextKey: 'demo',           label: 'Demo Scenarios',            suggestions: ['How would I demo this to a customer?', 'What are the key wow moments?', 'What data do I need for the demo?'] },
    training:       { contextKey: 'training',       label: 'Training Labs',             suggestions: ['What skills will participants learn?', 'What prerequisites are needed?', 'How long should each lab take?'] },
    business:       { contextKey: 'businessValue',  label: 'Business Value Justifier',  suggestions: ['Explain the ROI in simple terms', 'How do I present this to executives?', 'What KPIs should we track?'] },
    competitive:    { contextKey: 'competitive',    label: 'Competitive Analysis',      suggestions: ['Why choose Vantiq over competitor X?', 'What are Vantiq\\'s unique strengths?', 'How do I handle pricing objections?'] }
};`;

code = code.replace(oldMap, newMap);

// ═══════════════════════════════════════════════
// 3. Update openCoach to render suggested prompts
// ═══════════════════════════════════════════════

const oldWelcome = `        const welcomeHtml = \\\`<div class="coach-msg assistant">
            <div class="coach-msg-avatar">🎓</div>
            <div class="coach-msg-bubble">
                <strong>Welcome!</strong> I'm your AI Coach for the <em>\\\${mapping.label}</em> section.<br><br>
                I can help you understand what was generated here, explain technical concepts, and answer any questions you have. Just ask me anything!<br><br>
                <em style="color:var(--text-tertiary);font-size:12px">Try: "Explain this section in simple terms" or "What are the key takeaways?"</em>
            </div>
        </div>\\\``;

const newWelcome = `        const suggestionsHtml = (mapping.suggestions || []).map(s => 
            \\\`<button class="coach-suggestion-btn" onclick="app.askCoachSuggestion(this.textContent)">\\\${s}</button>\\\`
        ).join('');
        const welcomeHtml = \\\`<div class="coach-msg assistant">
            <div class="coach-msg-avatar">🎓</div>
            <div class="coach-msg-bubble">
                <strong>Welcome!</strong> I'm your AI Coach for the <em>\\\${mapping.label}</em> section.<br><br>
                I can help you understand what was generated here, explain technical concepts, and answer any questions you have.<br><br>
                <div style="margin-top:10px;display:flex;flex-direction:column;gap:6px">\\\${suggestionsHtml}</div>
            </div>
        </div>\\\``;

code = code.replace(oldWelcome, newWelcome);

// ═══════════════════════════════════════════════
// 4. Add askCoachSuggestion function (before Public API)
// ═══════════════════════════════════════════════
const askFn = `
function askCoachSuggestion(text) {
    const input = document.getElementById('coachInput');
    if (input) {
        input.value = text;
        sendCoachMessage();
    }
}

`;

code = code.replace('// ── Public API ──', askFn + '// ── Public API ──');

fs.writeFileSync('app.js', code);
console.log('Fixed exports + added suggested prompts');

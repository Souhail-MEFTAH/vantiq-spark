const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Map: panel content-div-id → coach panel key
const panels = [
    { contentId: 'analysis-content', key: 'analysis' },
    { contentId: 'domain-content', key: 'domain' },
    { contentId: 'architecture-content', key: 'architecture' },
    { contentId: 'aimodels-content', key: 'aimodels' },
    { contentId: 'agentic-content', key: 'agentic' },
    { contentId: 'events-content', key: 'events' },
    { contentId: 'implementation-content', key: 'implementation' },
    { contentId: 'diagrams-content', key: 'diagrams' },
    { contentId: 'demo-content', key: 'demo' },
    { contentId: 'training-content', key: 'training' },
    { contentId: 'business-content', key: 'business' },
    { contentId: 'competitive-content', key: 'competitive' }
];

// For each panel, find the regenerate-group div and inject a coach button right before it
for (const p of panels) {
    // Find the section-header's regenerate-group for this panel by locating it near the content div
    // Strategy: find the refine-input for this panel key and inject before its parent regenerate-group
    const refineId = `refine-${p.key === 'analysis' ? 'interpreter' : p.key === 'aimodels' ? 'aimodel' : p.key === 'diagrams' ? 'visualizer' : p.key}`;

    // Find the regenerate-group that contains this refine input
    const refinePattern = `id="${refineId}"`;
    const idx = html.indexOf(refinePattern);
    if (idx === -1) {
        console.log(`WARNING: Could not find ${refineId}, skipping ${p.key}`);
        continue;
    }

    // Walk backwards to find the opening of the regenerate-group div
    const searchBack = html.substring(Math.max(0, idx - 200), idx);
    const regenGroupIdx = searchBack.lastIndexOf('<div class="regenerate-group"');
    if (regenGroupIdx === -1) {
        console.log(`WARNING: Could not find regenerate-group for ${p.key}`);
        continue;
    }

    const insertPos = Math.max(0, idx - 200) + regenGroupIdx;
    const coachBtn = `<button class="coach-toggle-btn" onclick="app.openCoach('${p.key}')"><span class="coach-icon">🎓</span> <span data-i18n="coach-btn">AI Coach</span></button>\n              `;

    html = html.substring(0, insertPos) + coachBtn + html.substring(insertPos);
}

fs.writeFileSync('index.html', html);
console.log('Toggle buttons injected into all panels');

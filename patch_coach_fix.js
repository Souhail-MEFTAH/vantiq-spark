const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The current broken pattern looks like:
// <button class="coach-toggle-btn" onclick="app.openCoach('XXX')">...</button>
//               <div class="regenerate-group" ...>

// We need to move each coach button INSIDE its corresponding regenerate-group div, as the first child

// Find all coach toggle buttons and relocate them
const coachBtnRegex = /<button class="coach-toggle-btn" onclick="app\.openCoach\('(\w+)'\)"><span class="coach-icon">🎓<\/span> <span data-i18n="coach-btn">AI Coach<\/span><\/button>\n\s*<div class="regenerate-group"/g;

let match;
let count = 0;

while ((match = coachBtnRegex.exec(html)) !== null) {
    count++;
}

// Reset and do replacement
// Strategy: replace the pattern "button ... </button>\n              <div class="regenerate-group"..."
// with: "<div class="regenerate-group" ... >\n  <button ..."

// Simpler approach: remove existing coach buttons, then re-inject inside regenerate-group
const panels = [
    { key: 'analysis', refine: 'refine-interpreter' },
    { key: 'domain', refine: 'refine-domain' },
    { key: 'architecture', refine: 'refine-architecture' },
    { key: 'aimodels', refine: 'refine-aimodel' },
    { key: 'agentic', refine: 'refine-agentic' },
    { key: 'events', refine: 'refine-events' },
    { key: 'implementation', refine: 'refine-implementation' },
    { key: 'diagrams', refine: 'refine-visualizer' },
    { key: 'demo', refine: 'refine-demo' },
    { key: 'training', refine: 'refine-training' },
    { key: 'business', refine: 'refine-business' },
    { key: 'competitive', refine: 'refine-competitive' }
];

// Step 1: Remove all existing coach toggle buttons
for (const p of panels) {
    const btnPattern = `<button class="coach-toggle-btn" onclick="app.openCoach('${p.key}')"><span class="coach-icon">🎓</span> <span data-i18n="coach-btn">AI Coach</span></button>\n              `;
    html = html.replace(btnPattern, '');
}

// Step 2: Inject coach button inside each regenerate-group (after the Regenerate button)
for (const p of panels) {
    const refineInput = `id="${p.refine}"`;
    const idx = html.indexOf(refineInput);
    if (idx === -1) {
        console.log(`WARNING: Could not find ${p.refine}`);
        continue;
    }

    // Find the closing </div> of the regenerate-group that contains this refine input
    // Look for the </button> of the Regenerate button, then the closing </div>
    const afterRefine = html.substring(idx);

    // Find the regenerate button closing tag
    const regenBtnClose = afterRefine.indexOf('</button>');
    if (regenBtnClose === -1) continue;

    // Find the closing </div> of the regenerate-group after the button
    const afterBtn = afterRefine.substring(regenBtnClose + '</button>'.length);
    const closingDiv = afterBtn.indexOf('</div>');
    if (closingDiv === -1) continue;

    // Insert position is right before this closing </div>
    const insertPos = idx + regenBtnClose + '</button>'.length + closingDiv;

    const coachBtn = `\n              <button class="coach-toggle-btn" onclick="app.openCoach('${p.key}')"><span class="coach-icon">🎓</span> <span data-i18n="coach-btn">AI Coach</span></button>`;

    html = html.substring(0, insertPos) + coachBtn + html.substring(insertPos);
}

fs.writeFileSync('index.html', html);
console.log('Coach buttons relocated inside regenerate-group divs');

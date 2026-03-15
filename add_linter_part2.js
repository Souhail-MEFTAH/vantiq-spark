const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Nav Item (under Architecture)
if (!html.includes('id="nav-linter"')) {
    html = html.replace(
        '<div class="nav-item disabled" data-panel="events" id="nav-events">\\n          <span class="nav-icon">⚡</span>\\n          <span class="nav-text">Event System</span>\\n        </div>',
        '<div class="nav-item disabled" data-panel="events" id="nav-events">\\n          <span class="nav-icon">⚡</span>\\n          <span class="nav-text">Event System</span>\\n        </div>\\n\\n        <div class="nav-section-label">Review</div>\\n        <div class="nav-item disabled" data-panel="linter" id="nav-linter">\\n          <span class="nav-icon">🛑</span>\\n          <span class="nav-text">Architecture Review</span>\\n        </div>'
    );
}

// Pipeline Step
if (!html.includes('id="step-linter"')) {
    html = html.replace(
        '<div class="pipeline-connector"></div>\\n        <div class="pipeline-step" data-agent="implementation" id="step-implementation">\\n          <span class="step-icon">🛠️</span>\\n          <span>Code</span>\\n        </div>',
        '<div class="pipeline-connector"></div>\\n        <div class="pipeline-step" data-agent="implementation" id="step-implementation">\\n          <span class="step-icon">🛠️</span>\\n          <span>Code</span>\\n        </div>\\n        <div class="pipeline-connector"></div>\\n        <div class="pipeline-step" data-agent="linter" id="step-linter">\\n          <span class="step-icon">🛑</span>\\n          <span>Review</span>\\n        </div>'
    );
}

// Panel
if (!html.includes('id="panel-linter"')) {
    const linterPanel = \`
        <!-- ── Linter Panel ── -->
        <div class="panel" id="panel-linter">
          <div class="section-header">
            <div>
              <div class="section-title"><span class="section-icon">🛑</span> Architecture Review</div>
              <div class="section-subtitle">Agent 11 — Vantiq Architecture Linter & Validation</div>
            </div>
            <div class="regenerate-group" style="display:flex; gap:8px; align-items:center">
              <input type="text" id="refine-linter" class="refine-input" placeholder="Refine this phase..." onkeydown="if(event.key==='Enter') app.regenerate('linter')" />
              <button class="btn btn-regenerate" onclick="app.regenerate('linter')">
                ↻ Regenerate
              </button>
            </div>
          </div>
          <div id="linter-content"></div>
        </div>
\`;
    html = html.replace('<!-- ── Visualizer Panel ── -->', linterPanel + '\\n        <!-- ── Visualizer Panel ── -->');
    fs.writeFileSync('index.html', html);
}

// 2. Update app.js
let appjs = fs.readFileSync('app.js', 'utf8');

if (!appjs.includes('updatePipelineStep(\\'linter\\', \\'active\\');')) {
    const runLinter = \`
        // ── Phase 4C: Agent 11 (Architecture Linter) ──
        updatePipelineStep('linter', 'active');
        document.getElementById('generatingAgentName').textContent = '🛑 Agent 11 — Architecture Linter';
        
        const linterResult = await Agents.vantiqLinter(text, state.results.analysis, state.results.architecture, state.results.eventSystem, state.results.implementation, "");
        state.results.linter = linterResult;
        Renderers.renderVantiqLinter(state.results.linter, document.getElementById('linter-content'));
        updatePipelineStep('linter', 'completed');
        enableNav('linter');
\`;
    appjs = appjs.replace('// ── Phase 4B: Agent 7 + Agent 8 in parallel ──', runLinter + '\\n        // ── Phase 4B: Agent 7 + Agent 8 in parallel ──');
    
    // Add to regenerate map
    const linterRegen = \`
        linter: async () => {
            const refineInput = document.getElementById('refine-linter');
            const refText = refineInput ? refineInput.value.trim() : "";
            state.results.linter = await Agents.vantiqLinter(state.problemText, state.results.analysis, state.results.architecture, state.results.eventSystem, state.results.implementation, refText, state.results.linter);
            Renderers.renderVantiqLinter(state.results.linter, document.getElementById('linter-content'));
        },\`;
    appjs = appjs.replace('const agentMap = {', 'const agentMap = {' + linterRegen);
    fs.writeFileSync('app.js', appjs);
}
console.log("HTML and App updated");

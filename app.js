// ============================================
// Vantiq Spark — App Controller (GPT-5.2)
// ============================================

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
        primaryColor: '#7c6bf5',
        primaryTextColor: '#e8eaed',
        primaryBorderColor: '#7c6bf5',
        lineColor: '#5c6078',
        secondaryColor: '#4fc3f7',
        tertiaryColor: '#12121e',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        darkMode: true,
        background: '#0c0c14',
        mainBkg: '#1a1a2e',
        nodeBorder: '#7c6bf5',
        clusterBkg: '#12121e',
        clusterBorder: '#7c6bf5',
        titleColor: '#e8eaed',
        edgeLabelBackground: '#0c0c14',
        nodeTextColor: '#e8eaed'
    },
    flowchart: { curve: 'basis', padding: 30, nodeSpacing: 60, rankSpacing: 70, htmlLabels: true },
    sequence: { actorMargin: 120, messageFontSize: 14, actorFontSize: 14, noteFontSize: 13, width: 200 }
});

// ── Example Problems ──
const EXAMPLES = [
    "Design a real-time wildfire detection system using drones and computer vision that can automatically alert emergency response teams when fires are detected in forest areas.",
    "Design a real-time hospital patient deterioration detection system that monitors vital signs, predicts clinical deterioration, and alerts nursing staff before critical events occur.",
    "Design a predictive maintenance system for industrial manufacturing equipment that uses vibration sensors, temperature monitors, and machine learning to predict equipment failures before they happen.",
    "Design a smart traffic management system that uses cameras and sensors at intersections to optimize traffic signal timing, detect accidents, and reduce congestion in real-time.",
    "Design a smart building energy optimization system that uses occupancy sensors, weather data, and HVAC controls to minimize energy consumption while maintaining comfort levels."
];

// ── App State ──
const state = {
    currentPanel: 'input',
    results: {},
    problemText: '',
    generating: false
};

// ── Status Bar ──
function updateStatus() {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (aiEngine.hasApiKey()) {
        dot.className = 'status-dot connected';
        text.textContent = `${aiEngine.model} connected`;
    } else {
        dot.className = 'status-dot disconnected';
        text.textContent = 'Configure API Key';
    }
}

// ── Settings Modal ──
function showSettings() {
    const modal = document.getElementById('settingsModal');
    const keyInput = document.getElementById('apiKeyInput');
    const modelSelect = document.getElementById('modelSelect');
    keyInput.value = aiEngine.apiKey || '';
    modelSelect.value = aiEngine.model || 'gpt-4.1';
    modal.classList.add('visible');
    keyInput.focus();
}

function hideSettings() {
    document.getElementById('settingsModal').classList.remove('visible');
}

function saveSettings() {
    const key = document.getElementById('apiKeyInput').value.trim();
    const model = document.getElementById('modelSelect').value;
    aiEngine.setApiKey(key);
    aiEngine.setModel(model);
    updateStatus();
    hideSettings();
}

// ── Session History ──
const HISTORY_KEY = 'vantiq_studio_history';

function loadHistory() {
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveHistory(sessionState) {
    let history = loadHistory();
    // Prepend new session
    const newSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        problemText: sessionState.problemText,
        results: JSON.parse(JSON.stringify(sessionState.results))
    };
    history.unshift(newSession);
    // Keep last 15 sessions
    if (history.length > 15) history = history.slice(0, 15);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory();
}

function clearHistory() {
    if (confirm("Are you sure you want to clear your entire session history? This cannot be undone.")) {
        localStorage.removeItem(HISTORY_KEY);
        renderHistory();
    }
}

function renderHistory() {
    const history = loadHistory();
    const grid = document.getElementById('historyGrid');
    if (!grid) return;

    if (history.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-secondary)">No history found.</p>';
        return;
    }

    grid.innerHTML = history.map(session => {
        const dateStr = new Date(session.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
        const summary = session.problemText.length > 100 ? session.problemText.substring(0, 100) + '...' : session.problemText;
        return `
            <div class="glass-card panel-card" style="cursor:pointer" onclick="app.loadSession('${session.id}')">
               <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:8px">${dateStr}</div>
               <div style="font-weight:600;font-size:15px;color:var(--text-primary);margin-bottom:8px; display:flex; justify-content:space-between; align-items:center">
                 <span>${session.results.domainModel?.projectName || 'Untitled AI Project'}</span>
                 <button class="btn-ghost" onclick="event.stopPropagation(); app.renameSession('${session.id}')" style="font-size:12px; padding:2px 6px" title="Rename Session">✏️</button>
               </div>
               <div style="font-size:13px;color:var(--text-secondary);line-height:1.5">${escapeHtml(summary)}</div>
            </div>
        `;
    }).join('');
}

function showHistory() {
    switchPanel("history");
}

function renameSession(id) {
    const history = loadHistory();
    const session = history.find(s => s.id === id);
    if (!session) return;
    const currentName = session.results.domainModel && session.results.domainModel.projectName ? session.results.domainModel.projectName : "Untitled AI Project";
    const newName = prompt("Enter new project name:", currentName);
    if (newName && newName.trim() !== "") {
        if (!session.results.domainModel) session.results.domainModel = {};
        session.results.domainModel.projectName = newName.trim();
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        renderHistory();
        if (state.currentPanel === 'history') showHistory();
    }
}

function exportToPDF() {
    if (!state.results || !state.results.analysis) {
        alert("Please generate a solution first before exporting.");
        return;
    }
    document.getElementById('generatingAgentName').textContent = '📄 Generating PDF Document...';
    document.getElementById('generatingOverlay').classList.add('visible');

    setTimeout(() => {
        try {
            PDFGenerator.generate(state);
        } catch (e) {
            console.error("PDF Generation failed:", e);
            alert("Failed to generate PDF. Check console for details.");
        } finally {
            document.getElementById('generatingOverlay').classList.remove('visible');
            document.getElementById('generatingAgentName').textContent = 'Starting pipeline...';
        }
    }, 100);
}

function loadSession(id) {
    const history = loadHistory();
    const session = history.find(s => s.id === id);
    if (!session) return;

    // Load state
    state.problemText = session.problemText;
    state.results = session.results;
    document.getElementById('problemInput').value = session.problemText;

    // Render all panels
    if (state.results.analysis) {
        Renderers.renderAnalysis(state.results.analysis, document.getElementById('analysis-content'));
        enableNav('analysis');
    }
    if (state.results.domainModel) {
        Renderers.renderDomainModel(state.results.domainModel, document.getElementById('domain-content'));
        enableNav('domain');
    }
    if (state.results.architecture) {
        Renderers.renderArchitecture(state.results.architecture, document.getElementById('architecture-content'));
        enableNav('architecture');
    }
    if (state.results.aiModels) {
        Renderers.renderAIModels(state.results.aiModels, document.getElementById('aimodels-content'));
        enableNav('aimodels');
    }
    if (state.results.agenticGuide) {
        Renderers.renderAgenticGuide(state.results.agenticGuide, document.getElementById('agentic-content'));
        enableNav('agentic');
    }
    if (state.results.eventSystem) {
        Renderers.renderEventSystem(state.results.eventSystem, document.getElementById('events-content'));
        enableNav('events');
    }
    if (state.results.implementation) {
        Renderers.renderImplementation(state.results.implementation, document.getElementById('implementation-content'));
        enableNav('implementation');
    }
    if (state.results.scenarios) {
        Renderers.renderScenarios(state.results.scenarios, document.getElementById('scenarios-content'));
        enableNav('scenarios');
    }
    if (state.results.training) {
        Renderers.renderTraining(state.results.training, document.getElementById('training-content'));
        enableNav('training');
    }
    if (state.results.competitive) {
        Renderers.renderCompetitiveAnalysis(state.results.competitive, document.getElementById('competitive-content'));
        enableNav('competitive');
    }

    // Switch to analysis panel
    document.getElementById('btnExportPdf').style.display = 'block';
    switchPanel('analysis');
}


// ── Navigation ──
function switchPanel(panelId) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const panel = document.getElementById('panel-' + panelId);
    const nav = document.getElementById('nav-' + panelId);
    if (panel) panel.classList.add('active');
    if (nav) nav.classList.add('active');

    state.currentPanel = panelId;

    // Re-render mermaid diagrams when switching to a panel with diagrams
    if (['architecture', 'events', 'diagrams', 'agentic'].includes(panelId)) {
        setTimeout(() => renderMermaidDiagrams(), 100);
    }
}

// Bind nav clicks
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (!item.classList.contains('disabled')) {
            switchPanel(item.dataset.panel);
        }
    });
});

// Close settings modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideSettings();
});

// ── Mermaid Rendering ──
async function renderMermaidDiagrams() {
    const mermaidEls = document.querySelectorAll('.panel.active .mermaid');
    for (const el of mermaidEls) {
        if (el.dataset.rendered) continue;
        try {
            const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
            const { svg } = await mermaid.render(id, el.textContent);
            el.innerHTML = svg;
            el.dataset.rendered = 'true';
        } catch (e) {
            console.warn('Mermaid render error:', e);
            el.innerHTML = '<div style="color:var(--text-tertiary);font-size:12px;padding:20px">Diagram could not be rendered. The AI may have generated invalid Mermaid syntax.</div>';
        }
    }
}

// ── Pipeline Progress ──
function updatePipelineStep(agentKey, status) {
    const step = document.getElementById('step-' + agentKey);
    if (!step) return;
    step.classList.remove('active', 'completed');
    if (status === 'active') step.classList.add('active');
    if (status === 'completed') step.classList.add('completed');

    // Update connectors
    const connectors = document.querySelectorAll('.pipeline-connector');
    const steps = document.querySelectorAll('.pipeline-step');
    steps.forEach((s, i) => {
        if (i < connectors.length && s.classList.contains('completed')) {
            connectors[i].classList.add('completed');
        }
    });

    // Update overlay text
    const overlay = document.getElementById('generatingAgentName');
    const names = {
        interpreter: '🔍 Agent 1 — Problem Interpreter',
        domain: '🧩 Agent 2 — Domain Model Generator',
        architecture: '🏗️ Agent 3 — Architecture Generator',
        aimodel: '🤖 Agent 4 — AI Model Advisor',
        agentic: '🧠 Agent 4b — Agentic AI Guide',
        events: '⚡ Agent 5 — Event System Designer',
        implementation: '🛠️ Agent 6 — Implementation Generator',
        visualizer: '📊 Agent 7 — Architecture Visualizer',
        demo: '🎬 Agent 8 — Demo Scenario Generator',
        training: '🎓 Agent 9 — Training Lab Generator'
    };
    if (status === 'active' && overlay) {
        overlay.textContent = names[agentKey] || agentKey;
    }
}

function enableNav(panelId) {
    const nav = document.getElementById('nav-' + panelId);
    if (nav) nav.classList.remove('disabled');
}

// ── Show Error in Panel ──
function showAgentError(contentId, agentName, error) {
    const container = document.getElementById(contentId);
    if (container) {
        container.innerHTML = `
      <div class="error-card">
        <div class="error-title">⚠️ ${agentName} Error</div>
        <p>${error.message || error}</p>
        <p style="margin-top:8px;font-size:11px;color:var(--text-tertiary)">Try clicking "↻ Regenerate" to retry this agent.</p>
      </div>`;
    }
}

// ── Main Generation Pipeline (Parallel Batched) ──
async function generate() {
    const input = document.getElementById('problemInput');
    const text = input.value.trim();
    if (!text) {
        input.focus();
        return;
    }

    // Check API key
    if (!aiEngine.hasApiKey()) {
        showSettings();
        return;
    }

    state.problemText = text;
    state.generating = true;

    // Show pipeline bar and overlay
    document.getElementById('pipelineBar').classList.add('visible');
    document.getElementById('generatingOverlay').classList.add('visible');
    document.getElementById('generateBtn').disabled = true;

    // Reset pipeline steps
    document.querySelectorAll('.pipeline-step').forEach(s => s.classList.remove('active', 'completed'));
    document.querySelectorAll('.pipeline-connector').forEach(c => c.classList.remove('completed'));

    try {
        // ── Phase 1: Agent 1 (no dependencies) ──
        updatePipelineStep('interpreter', 'active');
        state.results.analysis = await Agents.problemInterpreter(text);
        Renderers.renderAnalysis(state.results.analysis, document.getElementById('analysis-content'));
        updatePipelineStep('interpreter', 'completed');
        enableNav('analysis');

        // ── Phase 2: Agent 2 + Agent 4 in parallel ──
        // Agent 2 needs: analysis | Agent 4 needs: analysis
        updatePipelineStep('domain', 'active');
        updatePipelineStep('aimodel', 'active');
        document.getElementById('generatingAgentName').textContent = '🧩 Agent 2 + 🤖 Agent 4 (parallel)';

        const [domainResult, aiResult] = await Promise.all([
            Agents.domainModelGenerator(text, state.results.analysis),
            Agents.aiModelAdvisor(text, state.results.analysis)
        ]);

        state.results.domainModel = domainResult;
        Renderers.renderDomainModel(state.results.domainModel, document.getElementById('domain-content'));
        updatePipelineStep('domain', 'completed');
        enableNav('domain');

        state.results.aiModels = aiResult;
        Renderers.renderAIModels(state.results.aiModels, document.getElementById('aimodels-content'));
        updatePipelineStep('aimodel', 'completed');
        enableNav('aimodels');

        // ── Phase 3: Agent 3 + Agent 5 in parallel ──
        // Agent 3 needs: analysis + domainModel | Agent 5 needs: analysis + domainModel
        updatePipelineStep('architecture', 'active');
        updatePipelineStep('events', 'active');
        document.getElementById('generatingAgentName').textContent = '🏗️ Agent 3 + ⚡ Agent 5 (parallel)';

        const [archResult, eventsResult] = await Promise.all([
            Agents.architectureGenerator(text, state.results.analysis, state.results.domainModel),
            Agents.eventSystemDesigner(text, state.results.analysis, state.results.domainModel)
        ]);

        state.results.architecture = archResult;
        Renderers.renderArchitecture(state.results.architecture, document.getElementById('architecture-content'));
        updatePipelineStep('architecture', 'completed');
        enableNav('architecture');

        state.results.eventSystem = eventsResult;
        Renderers.renderEventSystem(state.results.eventSystem, document.getElementById('events-content'));
        updatePipelineStep('events', 'completed');
        enableNav('events');

        // ── Phase 4A: Agent 4b (Sequential) ──
        updatePipelineStep('agentic', 'active');
        document.getElementById('generatingAgentName').textContent = '🧠 Agent 4b — Agentic AI Pattern Guide';

        const agenticResult = await Agents.agenticGuide(text, state.results.analysis, state.results.domainModel, state.results.architecture);
        state.results.agenticGuide = agenticResult;
        Renderers.renderAgenticGuide(state.results.agenticGuide, document.getElementById('agentic-content'));
        setTimeout(() => renderMermaidDiagrams(), 100);
        updatePipelineStep('agentic', 'completed');
        enableNav('agentic');

        // ── Phase 4B: Agent 6 (Sequential) ──
        updatePipelineStep('implementation', 'active');
        document.getElementById('generatingAgentName').textContent = '🛠️ Agent 6 — Implementation Generator';

        const implResult = await Agents.implementationGenerator(text, state.results.analysis, state.results.domainModel, state.results.architecture);
        state.results.implementation = implResult;
        Renderers.renderImplementation(state.results.implementation, document.getElementById('implementation-content'));
        updatePipelineStep('implementation', 'completed');
        enableNav('implementation');

        // ── Phase 4C: Agent 11 (Architecture Linter) ──
        updatePipelineStep('linter', 'active');
        document.getElementById('generatingAgentName').textContent = '🛑 Agent 11 — Architecture Linter';

        state.results.linter = await Agents.vantiqLinter(text, state.results.analysis, state.results.architecture, state.results.eventSystem, state.results.implementation, "");
        Renderers.renderVantiqLinter(state.results.linter, document.getElementById('linter-content'));
        updatePipelineStep('linter', 'completed');
        enableNav('linter');

        // ── Phase 4D: Agent 7 + Agent 8 in parallel ──
        updatePipelineStep('visualizer', 'active');
        updatePipelineStep('demo', 'active');
        document.getElementById('generatingAgentName').textContent = '📊 Agent 7 + 🎬 Agent 8 (parallel)';

        const [diagResult, demoResult] = await Promise.all([
            Agents.architectureVisualizer(text, state.results.analysis, state.results.domainModel, state.results.architecture),
            Agents.demoScenarioGenerator(text, state.results.analysis, state.results.domainModel, state.results.architecture)
        ]);

        state.results.diagrams = diagResult;
        Renderers.renderDiagrams(state.results.diagrams, document.getElementById('diagrams-content'));
        updatePipelineStep('visualizer', 'completed');
        enableNav('diagrams');

        state.results.demo = demoResult;
        Renderers.renderDemo(state.results.demo, document.getElementById('demo-content'));
        updatePipelineStep('demo', 'completed');
        enableNav('demo');

        // ── Phase 5: Agent 9 (needs implementation from Agent 6) ──
        updatePipelineStep('training', 'active');
        state.results.training = await Agents.trainingLabGenerator(text, state.results.analysis, state.results.domainModel, state.results.architecture, state.results.implementation);
        Renderers.renderTraining(state.results.training, document.getElementById('training-content'));
        updatePipelineStep('training', 'completed');
        enableNav('training');

        // ── Phase 6: Agent 10 (Competitive Analysis) ──
        updatePipelineStep('competitive', 'active');
        document.getElementById('generatingAgentName').textContent = '🏆 Agent 10 — Competitive Analysis';
        const competitorsInput = document.getElementById('competitorsInput');
        const competitorsText = competitorsInput ? competitorsInput.value.trim() : '';
        state.results.competitive = await Agents.competitiveAnalysis(text, state.results.analysis, state.results.architecture, competitorsText);
        Renderers.renderCompetitiveAnalysis(state.results.competitive, document.getElementById('competitive-content'));
        updatePipelineStep('competitive', 'completed');
        enableNav('competitive');

        // Save the successful generation to history
        document.getElementById('generatingAgentName').textContent = '💾 Saving Project & Preparing PDF Export...';
        setTimeout(() => saveHistory(state), 100);

        // Done — hide overlay and navigate to first result
        document.getElementById('generatingOverlay').classList.remove('visible');
        document.getElementById('btnExportPdf').style.display = 'block';
        switchPanel('analysis');

    } catch (e) {
        console.error('Pipeline error:', e);
        document.getElementById('generatingOverlay').classList.remove('visible');

        // Show user-friendly error
        const errorMsg = e.message || 'An unexpected error occurred';
        if (errorMsg.includes('API key')) {
            showSettings();
        } else {
            // Display the error in the analysis panel so it's visible
            const el = document.getElementById('analysis-content'); if (el) el.innerHTML = `
              <div class="glass-card accent-rose" style="margin-top: 20px;">
                <div class="card-title"><span class="card-icon">⚠️</span> Generation Failed</div>
                <p style="font-size:14px;color:var(--text-primary);margin:12px 0">${errorMsg}</p>
                <p style="font-size:12px;color:var(--text-tertiary)">The pipeline was halted. Please check your model selection or API key permissions in Settings.</p>
              </div>`;
            switchPanel('analysis');
        }
    }

    state.generating = false;
    document.getElementById('generateBtn').disabled = false;
}

// ── Regenerate Single Agent (GPT-5.2) ──
async function regenerate(agentKey) {
    if (state.generating || !state.results.analysis) return;

    state.generating = true;

    // Local loading indicator
    const btn = document.querySelector(`#panel-${agentKey} .btn-regenerate`);
    const originalHtml = btn ? btn.innerHTML : "";
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="chat-typing"><span></span><span></span><span></span></span>';
    }

    const refineInput = document.getElementById('refine-' + agentKey);
    const refinement = refineInput ? refineInput.value.trim() : "";

    const agentMap = {
        interpreter: async () => {
            state.results.analysis = await Agents.problemInterpreter(state.problemText, refinement, state.results.analysis);
            Renderers.renderAnalysis(state.results.analysis, document.getElementById('analysis-content'));
        },
        domain: async () => {
            state.results.domainModel = await Agents.domainModelGenerator(state.problemText, state.results.analysis, refinement, state.results.domainModel);
            Renderers.renderDomainModel(state.results.domainModel, document.getElementById('domain-content'));
        },
        architecture: async () => {
            state.results.architecture = await Agents.architectureGenerator(state.problemText, state.results.analysis, state.results.domainModel, refinement, state.results.architecture);
            Renderers.renderArchitecture(state.results.architecture, document.getElementById('architecture-content'));
            setTimeout(() => renderMermaidDiagrams(), 100);
        },
        aimodel: async () => {
            state.results.aiModels = await Agents.aiModelAdvisor(state.problemText, state.results.analysis, refinement, state.results.aiModels);
            Renderers.renderAIModels(state.results.aiModels, document.getElementById('aimodels-content'));
        },
        agentic: async () => {
            state.results.agenticGuide = await Agents.agenticGuide(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.agenticGuide);
            Renderers.renderAgenticGuide(state.results.agenticGuide, document.getElementById('agentic-content'));
            setTimeout(() => renderMermaidDiagrams(), 100);
        },
        events: async () => {
            state.results.eventSystem = await Agents.eventSystemDesigner(state.problemText, state.results.analysis, state.results.domainModel, refinement, state.results.eventSystem);
            Renderers.renderEventSystem(state.results.eventSystem, document.getElementById('events-content'));
            setTimeout(() => renderMermaidDiagrams(), 100);
        },
        implementation: async () => {
            state.results.implementation = await Agents.implementationGenerator(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.implementation);
            Renderers.renderImplementation(state.results.implementation, document.getElementById('implementation-content'));
        },
        visualizer: async () => {
            state.results.diagrams = await Agents.architectureVisualizer(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.diagrams);
            Renderers.renderDiagrams(state.results.diagrams, document.getElementById('diagrams-content'));
            setTimeout(() => renderMermaidDiagrams(), 100);
        },
        demo: async () => {
            state.results.demo = await Agents.demoScenarioGenerator(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.demo);
            Renderers.renderDemo(state.results.demo, document.getElementById('demo-content'));
        },
        training: async () => {
            state.results.training = await Agents.trainingLabGenerator(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, state.results.implementation, refinement, state.results.training);
            Renderers.renderTraining(state.results.training, document.getElementById('training-content'));
        },
        linter: async () => {
            const refineInput = document.getElementById('refine-linter');
            const refText = refineInput ? refineInput.value.trim() : "";
            state.results.linter = await Agents.vantiqLinter(state.problemText, state.results.analysis, state.results.architecture, state.results.eventSystem, state.results.implementation, refText, state.results.linter);
            Renderers.renderVantiqLinter(state.results.linter, document.getElementById('linter-content'));
        },
        competitive: async () => {
            const competitorsInput = document.getElementById('competitorsInput');
            const competitorsText = competitorsInput ? competitorsInput.value.trim() : '';
            state.results.competitive = await Agents.competitiveAnalysis(state.problemText, state.results.analysis, state.results.architecture, competitorsText, refinement, state.results.competitive);
            Renderers.renderCompetitiveAnalysis(state.results.competitive, document.getElementById('competitive-content'));
        }
    };

    try {
        if (agentMap[agentKey]) {
            await agentMap[agentKey]();
        }
    } catch (e) {
        console.error(`Regenerate ${agentKey} error:`, e);
        const contentMap = {
            interpreter: 'analysis-content',
            domain: 'domain-content',
            architecture: 'architecture-content',
            aimodel: 'aimodels-content',
            agentic: 'agentic-content',
            events: 'events-content',
            implementation: 'implementation-content',
            visualizer: 'diagrams-content',
            demo: 'demo-content',
            training: 'training-content',
            linter: 'linter-content',
            competitive: 'competitive-content'
        };
        showAgentError(contentMap[agentKey], agentKey, e);
    }

    state.generating = false;
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
    }
}

// ── Load Example ──
function loadExample(index) {
    const input = document.getElementById('problemInput');
    input.value = EXAMPLES[index] || EXAMPLES[0];
    input.focus();
}

// ── Clear Input ──
function clearInput() {
    document.getElementById('problemInput').value = '';
    document.getElementById('problemInput').focus();
}

// ══════════════════════════════════════════════
// Usecase Assistant Chat
// ══════════════════════════════════════════════

const HF_SPACE_URL = 'https://souhail-meftah-vantiq.hf.space';
let chatMessageId = 0;

function chatMarkdownToHtml(text) {
    if (!text) return "";
    text = String(text);
    // 1. Extract links into placeholders BEFORE escaping
    const links = [];
    // Markdown links: [text](url)
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, (_, label, url) => {
        links.push(`<a href="${url}" target="_blank" rel="noopener" style="color:var(--brand-primary)">${label}</a>`);
        return `%%LINK_${links.length - 1}%%`;
    });
    // Bare URLs
    text = text.replace(/(https?:\/\/[^\s<>\)\]"',]+)/g, (url) => {
        links.push(`<a href="${url}" target="_blank" rel="noopener" style="color:var(--brand-primary)">${url}</a>`);
        return `%%LINK_${links.length - 1}%%`;
    });

    // 2. Now escape HTML entities safely
    text = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/```([\s\S]*?)```/g, '<pre style="background:rgba(255,255,255,0.04);padding:12px;border-radius:8px;overflow-x:auto;margin:8px 0"><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^### (.+)$/gm, '<div style="font-weight:600;font-size:14px;margin:12px 0 4px;color:var(--brand-primary)">$1</div>')
        .replace(/^## (.+)$/gm, '<div style="font-weight:700;font-size:15px;margin:14px 0 6px;color:var(--text-primary)">$1</div>')
        .replace(/^[-*] (.+)$/gm, '• $1')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

    // 3. Restore links
    text = text.replace(/%%LINK_(\d+)%%/g, (_, i) => links[parseInt(i)]);
    return text;
}

function addChatMessage(role, content, isTyping = false) {
    const container = document.getElementById('chatMessages');
    const id = 'chat-msg-' + (++chatMessageId);
    const avatar = role === 'user' ? '👤' : '🤖';
    const bubbleContent = isTyping
        ? '<div class="chat-typing"><span></span><span></span><span></span></div>'
        : (role === 'user' ? escapeHtml(content) : '<p>' + chatMarkdownToHtml(content) + '</p>');

    const div = document.createElement('div');
    div.className = 'chat-message ' + role;
    div.id = id;
    div.innerHTML = `
        <div class="chat-avatar">${avatar}</div>
        <div class="chat-bubble">${bubbleContent}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function updateChatMessage(id, content) {
    const msg = document.getElementById(id);
    if (!msg) return;
    const bubble = msg.querySelector('.chat-bubble');
    bubble.innerHTML = '<p>' + chatMarkdownToHtml(content) + '</p>';
    const container = document.getElementById('chatMessages');
    container.scrollTop = container.scrollHeight;
}

async function sendChat() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage('user', message);
    input.value = '';
    sendBtn.disabled = true;

    // Show typing indicator
    const typingId = addChatMessage('assistant', '', true);

    try {
        let answer = null;

        // Try /gradio_api/call/predict (Gradio 6.x uses /gradio_api prefix)
        try {
            const directRes = await fetch(`${HF_SPACE_URL}/gradio_api/call/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [message] })
            });
            if (directRes.ok) {
                const { event_id } = await directRes.json();
                const resultRes = await fetch(`${HF_SPACE_URL}/gradio_api/call/predict/${event_id}`);
                const text = await resultRes.text();
                const lines = text.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].startsWith('event: complete') && i + 1 < lines.length) {
                        const dataLine = lines[i + 1];
                        if (dataLine.startsWith('data: ')) {
                            answer = JSON.parse(dataLine.slice(6))[0];
                            break;
                        }
                    }
                    if (lines[i].startsWith('event: error') && i + 1 < lines.length) {
                        const dataLine = lines[i + 1];
                        if (dataLine.startsWith('data: ')) {
                            throw new Error(JSON.parse(dataLine.slice(6)));
                        }
                    }
                }
            }
        } catch (apiErr) {
            if (apiErr.message && !apiErr.message.includes('API returned')) throw apiErr;
        }

        if (answer) {
            updateChatMessage(typingId, answer);
        } else {
            updateChatMessage(typingId, '⚠️ No response received from the assistant. The HF Space may be sleeping — try again in a moment.');
        }
    } catch (error) {
        console.error('Chat error:', error);
        updateChatMessage(typingId, `⚠️ **Connection Error**\n\n${error.message}\n\nMake sure the [Vantiq HF Space](https://huggingface.co/spaces/Souhail-Meftah/Vantiq) is running and has been updated with the Gradio API.`);
    }

    sendBtn.disabled = false;
    input.focus();
}

function clearChat() {
    const container = document.getElementById('chatMessages');
    container.innerHTML = `
        <div class="chat-message assistant">
            <div class="chat-avatar">🤖</div>
            <div class="chat-bubble">
                <p>Hi! I'm the <strong>Vantiq Usecase Assistant</strong>. I can help you brainstorm and design real-time, event-driven applications on the Vantiq platform.</p>
                <p style="margin-top:8px">Try asking me things like:</p>
                <ul style="margin:8px 0 0 16px;font-size:13px;color:var(--text-secondary)">
                    <li>How can Vantiq help with predictive maintenance?</li>
                    <li>Design a smart building energy optimization system</li>
                    <li>What Vantiq features support real-time video analytics?</li>
                </ul>
            </div>
        </div>`;
    chatMessageId = 0;
}

// Bind Enter key on chat input
document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChat();
    }
});

// ── Init ──
updateStatus();
renderHistory();

// Auto-show settings if no API key
if (!aiEngine.hasApiKey()) {
    setTimeout(() => showSettings(), 500);
}

// ── Public API ──
window.app = {
    generate,
    regenerate,
    loadExample,
    clearInput,
    showSettings,
    hideSettings,
    saveSettings,
    sendChat,
    clearChat,
    loadSession,
    clearHistory,
    showHistory,
    renameSession,
    exportToPDF
};

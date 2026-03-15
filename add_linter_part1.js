const fs = require('fs');

// 1. Update agents.js
let agentsCode = fs.readFileSync('agents.js', 'utf8');

const linterPrompt = \`  // ══════════════════════════════════════════════
  // Agent 11: Vantiq Architecture Linter
  // ══════════════════════════════════════════════
  vantiqLinter: {
    system: \\\`You are Agent 11 — Vantiq Architecture Linter & Strict Validator.

  \${VANTIQ_CONTEXT}

YOUR TASK: Review the generated architecture, event system, and implementation plan. Act as a strict Vantiq Principal Engineer. Lint the solution for common mistakes.

RULES:
- Check for high-throughput streams mistakenly sent to Topics instead of Visual Event Handlers (VEH).
- Check for missing partitioned configurations on AI/ML models or heavy compute nodes.
- Check for missing State definitions on entities that require persistence.
- Identify single points of failure.
- Give an overall architecture score (0-100).
- If perfect, provide a minor nitpick.

You MUST respond with ONLY valid JSON:
{
  "summary": "string — 2-3 sentence executive review",
  "overallScore": 0-100,
  "warnings": [
    {
      "severity": "Critical|High|Medium|Low",
      "component": "string — name of the offending component",
      "issue": "string — description of the architectural flaw",
      "recommendation": "string — exact Vantiq feature or pattern to fix it"
    }
  ]
}\\\`
  },\`;

if (!agentsCode.includes('Agent 11: Vantiq Architecture Linter')) {
    agentsCode = agentsCode.replace('competitiveAnalysis: {', linterPrompt + '\\n\\n  competitiveAnalysis: {');
    
    const linterFunc = \`
async function agentVantiqLinter(problemText, analysis, architecture, eventSystem, implementation, refinement, previousOutput = null) {
  return await aiEngine.callAgent(
    'Architecture Linter',
    AGENT_PROMPTS.vantiqLinter.system,
    buildUserMessage(problemText, { analysis, architecture, eventSystem, implementation }, refinement, previousOutput)
  );
}\`;
    agentsCode = agentsCode.replace('async function agentCompetitiveAnalysis', linterFunc + '\\n\\nasync function agentCompetitiveAnalysis');
    
    agentsCode = agentsCode.replace('competitiveAnalysis: agentCompetitiveAnalysis', 'vantiqLinter: agentVantiqLinter,\\n  competitiveAnalysis: agentCompetitiveAnalysis');
    fs.writeFileSync('agents.js', agentsCode);
}

// 2. Update renderers.js
let renderersCode = fs.readFileSync('renderers.js', 'utf8');
if (!renderersCode.includes('function renderVantiqLinter')) {
    const linterRenderer = \`
function renderVantiqLinter(data, container) {
    if (!data || !data.warnings) {
        container.innerHTML = '<p>No linter data generated.</p>';
        return;
    }

    let scoreColor = 'var(--brand-primary)'; // Green
    if (data.overallScore < 75) scoreColor = '#f59e0b'; // Yellow
    if (data.overallScore < 50) scoreColor = '#ef4444'; // Red

    let html = \\\`
      <div class="glass-card" style="margin-bottom:var(--space-4); display:flex; align-items:center; gap:20px;">
        <div style="width:80px; height:80px; border-radius:50%; border: 4px solid \${scoreColor}; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:700; color:\${scoreColor};">
          \${data.overallScore}
        </div>
        <div>
          <h3 style="margin-top:0; margin-bottom:8px; color:var(--text-primary);">Architecture Grade</h3>
          <p style="margin:0; color:var(--text-secondary); line-height:1.5;">\${escapeHtml(data.summary)}</p>
        </div>
      </div>
      <h3 style="margin-top:var(--space-6); margin-bottom:var(--space-4); border-bottom: 1px solid var(--border-default); padding-bottom: 8px;">Audit Findings</h3>
    \\\`;

    data.warnings.forEach(warning => {
        let badgeColor = 'var(--text-tertiary)';
        if (warning.severity === 'Critical') badgeColor = '#ef4444';
        if (warning.severity === 'High') badgeColor = '#f97316';
        if (warning.severity === 'Medium') badgeColor = '#f59e0b';
        if (warning.severity === 'Low') badgeColor = '#3b82f6';

        html += \\\`
          <div class="glass-card" style="margin-bottom: var(--space-3); border-left: 4px solid \${badgeColor}">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <strong style="color:var(--text-primary)">\${escapeHtml(warning.component)}</strong>
              <span style="background:\${badgeColor}; color:white; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:600;">\${escapeHtml(warning.severity)}</span>
            </div>
            <p style="margin:0 0 8px 0; font-size:14px; color:var(--text-secondary);"><strong>Issue:</strong> \${escapeHtml(warning.issue)}</p>
            <p style="margin:0; font-size:14px; color:var(--text-secondary);"><strong>Fix:</strong> \${escapeHtml(warning.recommendation)}</p>
          </div>
        \\\`;
    });

    if (data.warnings.length === 0) {
        html += '<div class="glass-card"><p style="color:var(--text-secondary); margin:0;">No architectural flaws detected! The system design aligns perfectly with Vantiq best practices.</p></div>';
    }

    container.innerHTML = html;
}
\`;

    renderersCode = renderersCode.replace('window.Renderers = {', linterRenderer + '\\n\\nwindow.Renderers = {');
    renderersCode = renderersCode.replace('renderCompetitiveAnalysis,', 'renderCompetitiveAnalysis,\\n    renderVantiqLinter,');
    fs.writeFileSync('renderers.js', renderersCode);
}
console.log("Agents and Renderers updated");

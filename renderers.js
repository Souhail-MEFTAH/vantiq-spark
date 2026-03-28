// ============================================
// Vantiq Spark — Renderers
// ============================================

window.Renderers = {

  // ── Problem Analysis (Agent 1) ──
  renderAnalysis(data, container) {
    if (!data || !container) return;
    container.innerHTML = `
      <div class="card-grid">
        <div class="glass-card accent-purple" style="animation-delay:0s">
          <div class="card-title"><span class="card-icon">${data.domainIcon || '🏢'}</span> <span data-i18n="label-domain">Domain</span></div>
          <div style="font-size:20px;font-weight:700;color:var(--text-primary);margin:8px 0">${data.domain || ''}</div>
          <p style="font-size:13px;color:var(--text-secondary)">${data.summary || ''}</p>
        </div>
        <div class="glass-card accent-rose" style="animation-delay:0.04s; grid-column: span 2">
          <div class="card-title"><span class="card-icon">🎯</span> <span data-i18n="label-core-problem">Core Problem</span></div>
          <p style="font-size:14px;color:var(--text-primary);margin-top:8px">${data.coreProblem || ''}</p>
        </div>
        <div class="glass-card accent-cyan" style="animation-delay:0.08s">
          <div class="card-title"><span class="card-icon">👥</span> <span data-i18n="label-actors">Actors</span></div>
          <div class="tag-list">${(data.actors || []).map(a => `<span class="tag tag-cyan">${a}</span>`).join('')}</div>
        </div>
        <div class="glass-card accent-green" style="animation-delay:0.16s">
          <div class="card-title"><span class="card-icon">📊</span> <span data-i18n="label-data-sources">Data Sources</span></div>
          <ul class="data-list">${(data.dataSources || []).map(d => `<li><span class="list-icon">◆</span>${d}</li>`).join('')}</ul>
        </div>
        <div class="glass-card accent-warm" style="animation-delay:0.24s">
          <div class="card-title"><span class="card-icon">⚡</span> <span data-i18n="label-events">Events</span></div>
          <div class="tag-list">${(data.events || []).map(e => `<span class="tag tag-warm">${e}</span>`).join('')}</div>
        </div>
        <div class="glass-card accent-rose" style="animation-delay:0.32s">
          <div class="card-title"><span class="card-icon">🧠</span> <span data-i18n="label-ai-tasks">AI Tasks</span></div>
          <ul class="data-list">${(data.aiTasks || []).map(t => `<li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)">${t.task || ''}</strong><br/><span style="font-size:11px"><span data-i18n="type-${(t.type || 'unknown').toLowerCase()}">${t.type || ''}</span> — ${(t.models || []).join(', ')}</span></div></li>`).join('')}</ul>
        </div>
        <div class="glass-card accent-purple" style="animation-delay:0.4s">
          <div class="card-title"><span class="card-icon">🧩</span> <span data-i18n="label-entities">Entities</span></div>
          <div class="tag-list">${(data.entities || []).map(e => `<span class="tag tag-purple">${e}</span>`).join('')}</div>
        </div>
        <div class="glass-card accent-green" style="animation-delay:0.48s; grid-column: span 3">
          <div class="card-title"><span class="card-icon">🚀</span> <span data-i18n="label-why-vantiq">Why Vantiq?</span></div>
          <p style="font-size:14px;color:var(--text-primary);margin-top:8px; line-height: 1.5">${data.vantiqSuitability || ''}</p>
        </div>
      </div>`;
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── Domain Model (Agent 2) ──
  renderDomainModel(data, container) {
    if (!data || !container) return;
    const entitiesHTML = (data.entities || []).map(e => `
      <div class="entity-card">
        <div class="entity-type">${e.type}</div>
        <div class="entity-name">${e.name}</div>
        <div style="margin-top:6px">${(e.properties || []).map(p => `<span class="tag tag-purple" style="font-size:10px;margin:2px">${p}</span>`).join('')}</div>
      </div>`).join('');

    const eventsHTML = (data.events || []).map(e => `
      <div class="glass-card" style="padding:12px 16px;margin-bottom:8px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary)">${e.name}</span>
          </div>
          <span class="tag tag-${(e.type || '') === 'Alert' ? 'rose' : (e.type || '') === 'Detection' ? 'warm' : (e.type || '') === 'Command' ? 'purple' : 'cyan'}" data-i18n="type-${(e.type || 'event').toLowerCase()}">${e.type || 'Event'}</span>
        </div>
      </div>`).join('');

    const servicesHTML = (data.services || []).map(s => `
      <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)">${s.name}</strong><br/><span style="font-size:12px">${s.responsibility}</span></div></li>`).join('');

    const commandsHTML = (data.commands || []).map(c => `<span class="tag tag-green">${c.name || ''} → ${c.target || ''}</span>`).join('');

    container.innerHTML = `
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">📦</span> <span data-i18n="label-entities">Entities</span></div>
        <div class="entity-grid" style="margin-top:12px">${entitiesHTML}</div>
      </div>
      <div class="card-grid">
        <div class="glass-card accent-cyan">
          <div class="card-title"><span class="card-icon">⚡</span> <span data-i18n="label-events">Events</span></div>
          ${eventsHTML}
        </div>
        <div class="glass-card accent-green">
          <div class="card-title"><span class="card-icon">⚙️</span> <span data-i18n="label-services">Services</span></div>
          <ul class="data-list">${servicesHTML}</ul>
        </div>
      </div>
      <div class="glass-card accent-warm">
        <div class="card-title"><span class="card-icon">📋</span> <span data-i18n="label-commands">Commands</span></div>
        <div class="tag-list">${commandsHTML}</div>
      </div>`;
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── Architecture (Agent 3) ──
  renderArchitecture(data, container) {
    if (!data || !container) return;
    const componentsHTML = (data.components || []).map(c => `
      <div class="glass-card" style="padding:16px">
        <div class="card-title"><span class="card-icon">${c.icon}</span> ${c.name}</div>
        <p style="font-size:12px;color:var(--text-secondary);margin:6px 0">${c.description}</p>
        <div class="tag-list">${(c.tech || []).map(t => `<span class="tag tag-cyan">${t}</span>`).join('')}</div>
      </div>`).join('');

    const integrationsHTML = (data.integrations || []).map(ig => `
      <tr>
        <td style="color:var(--text-primary);font-weight:500">${ig.from}</td>
        <td>→</td>
        <td style="color:var(--text-primary);font-weight:500">${ig.to}</td>
        <td><span class="tag tag-purple">${ig.protocol}</span></td>
        <td>${ig.description}</td>
      </tr>`).join('');

    container.innerHTML = `
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">📝</span> <span data-i18n="label-arch-overview">Architecture Overview</span></div>
        <p style="font-size:14px;color:var(--text-secondary);margin:8px 0">${data.description || ''}</p>
        <div style="margin-top:12px">
          <div class="code-block" style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-accent)">${data.dataFlow || ''}</div>
        </div>
        <div class="tag-list" style="margin-top:12px">${(data.principles || []).map(p => `<span class="tag tag-green">${p}</span>`).join('')}</div>
      </div>
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">🏗️</span> <span data-i18n="label-sys-components">System Components</span></div>
        <div class="card-grid-3" style="margin-top:12px">${componentsHTML}</div>
      </div>
      <div class="glass-card accent-warm">
        <div class="card-title"><span class="card-icon">🔗</span> <span data-i18n="label-int-points">Integration Points</span></div>
        <table class="data-table" style="margin-top:12px">
          <thead><tr><th data-i18n="th-from">From</th><th></th><th data-i18n="th-to">To</th><th data-i18n="th-protocol">Protocol</th><th data-i18n="th-description">Description</th></tr></thead>
          <tbody>${integrationsHTML}</tbody>
        </table>
      </div>
      <div class="glass-card accent-green">
        <div class="card-title"><span class="card-icon">📊</span> <span data-i18n="label-arch-diagram">Architecture Diagram</span></div>
        ${data.mermaidDiagram ? `<div class="diagram-container"><pre class="mermaid">${data.mermaidDiagram}</pre></div>` : ''}
      </div>`;
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── AI Models (Agent 4) ──
  renderAIModels(data, container) {
    if (!data || !container) return;
    const recsHTML = (data.recommendations || []).map(rec => {
      const modelsHTML = (rec.models || []).map(m => `
        <div class="glass-card" style="padding:12px 16px;margin-bottom:8px;${m.isPrimary ? 'border-left:3px solid var(--brand-success)' : ''}">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-weight:600;color:var(--text-primary)">${m.name}</span>
            ${m.isPrimary ? '<span class="tag tag-green" data-i18n="label-recommended">Recommended</span>' : ''}
          </div>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">✅ ${m.pros}</div>
          <div style="font-size:12px;color:var(--text-tertiary)">⚠️ ${m.cons}</div>
        </div>`).join('');

      return `
        <div class="glass-card accent-purple">
          <div class="model-card">
            <div class="model-rank">${rec.rank}</div>
            <div class="model-info">
              <div class="model-name">${rec.task}</div>
              <div class="model-meta">
                <span class="tag tag-purple" data-i18n="type-${(rec.type || 'unknown').toLowerCase()}">${rec.type || ''}</span>
                <span class="tag tag-cyan" data-i18n="label-${((rec.deployment || {}).strategy || 'unknown').toLowerCase()}">${(rec.deployment || {}).strategy || ''}</span>
              </div>
            </div>
          </div>
          <div style="margin-top:16px">${modelsHTML}</div>
          <div style="margin-top:16px">
            <div style="font-size:12px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:8px" data-i18n="label-deployment">Deployment</div>
            <div class="card-grid">
              <div style="font-size:12px;color:var(--text-secondary)"><strong style="color:var(--text-accent)" data-i18n="label-edge">Edge</strong>: ${(rec.deployment || {}).edge || 'N/A'}</div>
              <div style="font-size:12px;color:var(--text-secondary)"><strong style="color:var(--brand-secondary)" data-i18n="label-cloud">Cloud</strong>: ${(rec.deployment || {}).cloud || 'N/A'}</div>
            </div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:8px">⏱️ <span data-i18n="label-latency">Latency</span>: <strong style="color:var(--brand-success)">${(rec.deployment || {}).latency || 'N/A'}</strong></div>
          </div>
          <div style="margin-top:16px">
            <div style="font-size:12px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:8px" data-i18n="label-hardware">Hardware</div>
            <div class="tag-list">
              <span class="tag tag-warm"><span data-i18n="label-edge">Edge</span>: ${(rec.hardware || {}).edge || 'N/A'}</span>
              <span class="tag tag-cyan"><span data-i18n="label-cloud">Cloud</span>: ${(rec.hardware || {}).cloud || 'N/A'}</span>
              <span class="tag tag-purple"><span data-i18n="label-ram">RAM</span>: ${(rec.hardware || {}).memory || 'N/A'}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    container.innerHTML = `
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">🎯</span> <span data-i18n="label-overall-strategy">Overall Strategy</span></div>
        <p style="font-size:13px;color:var(--text-secondary);margin:8px 0">${data.overallStrategy || ''}</p>
        <p style="font-size:12px;color:var(--text-tertiary);margin-top:8px"><strong style="color:var(--text-accent)" data-i18n="label-vantiq-int">Vantiq Integration:</strong> ${data.vantiqIntegration || ''}</p>
      </div>
      ${recsHTML}`;
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── Solution Architecture Guide (formerly Agentic AI, Phase 4b) ──
  renderAgenticGuide(data, container) {
    if (!data || !container) return;

    // Deterministic Components (Green)
    const deterministicHTML = (data.deterministicAndMLCore || []).map(c => `
      <div class="glass-card accent-green">
        <div class="card-title"><span class="card-icon">⚡</span> ${c.name}</div>
        <p style="font-size:13px;color:var(--text-secondary);margin:6px 0">${c.responsibility}</p>
        <div class="tag-list" style="margin:8px 0">
          <span class="tag tag-green">${c.vantiqComponent}</span>
        </div>
        <div style="margin-top:10px">
          <div style="font-size:11px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.5px" data-i18n="label-why-not-ai">Why Traditional Logic?</div>
          <p style="font-size:12px;color:var(--text-primary);margin-top:4px">${c.whyNotAgent || c.whyNotAI || ''}</p>
        </div>
      </div>`).join('');

    // AI Agents (Purple)
    const agentsHTML = (data.llmAgents || data.aiAgents || []).map(a => `
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">🧠</span> ${a.name}</div>
        <p style="font-size:13px;color:var(--text-secondary);margin:6px 0">${a.role}</p>
        <div class="tag-list" style="margin:8px 0">
          <span class="tag tag-purple"><span data-i18n="label-llm">LLM</span>: ${a.llm}</span>
          <span class="tag tag-cyan" data-i18n="label-${(a.memoryType || 'unknown').toLowerCase()}">${a.memoryType || ''}</span>
        </div>
        <div style="margin-top:10px">
          <div style="font-size:11px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.5px" data-i18n="label-justification">Agent Justification</div>
          <p style="font-size:12px;color:var(--text-primary);margin-top:4px">${a.justification}</p>
        </div>
        <div style="margin-top:10px">
          <div style="font-size:11px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.5px" data-i18n="label-tools">Tools</div>
          <div class="tag-list" style="margin-top:4px">${(a.tools || []).map(t => '<span class="tag tag-warm">' + t + '</span>').join('')}</div>
        </div>
      </div>`).join('');

    // Cost Optimization
    const costRows = (data.costOptimization || []).map(c => `
      <tr>
        <td style="color:var(--text-primary);font-weight:500">${c.technique}</td>
        <td><span class="tag tag-${(c.impact || '') === 'High' ? 'green' : (c.impact || '') === 'Medium' ? 'warm' : 'cyan'}" data-i18n="impact-${(c.impact || 'unknown').toLowerCase()}">${c.impact || ''}</span></td>
      </tr>`).join('');

    const llmRows = (data.llmComparison || []).map(m => `
        <tr>
          <td style="color:var(--text-primary);font-weight:500">${m.model}</td>
          <td><span class="tag tag-purple">${m.provider}</span></td>
          <td>${m.bestFor}</td>
          <td>${m.contextWindow}</td>
          <td><span class="tag tag-${(m.costTier || '') === 'Low' ? 'green' : (m.costTier || '') === 'Medium' ? 'warm' : 'rose'}" data-i18n="cost-${(m.costTier || 'unknown').toLowerCase()}">${m.costTier || ''}</span></td>
          <td style="font-size:12px;color:var(--text-tertiary)">${m.vantiqSource}</td>
        </tr>`).join('');

    const artifactRows = (data.artifacts || []).map(a => `
        <tr>
          <td style="color:var(--text-primary);font-weight:500">${a.name}</td>
          <td><span class="tag tag-cyan">${a.type}</span></td>
          <td>${a.description}</td>
          <td style="font-size:12px;color:var(--text-tertiary)">${a.vantiqResource}</td>
        </tr>`).join('');

    container.innerHTML = `
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">💡</span> <span data-i18n="label-solution-strategy">Hybrid Alternative Strategy</span></div>
        <p style="font-size:14px;color:var(--text-secondary);margin:8px 0">${data.hybridAlternativeStrategy || data.solutionStrategy || ''}</p>
      </div>
      
      <h3 style="margin-top:24px;margin-bottom:12px;color:var(--text-primary);font-size:16px"><span data-i18n="label-deterministic-core">⚡ Traditional AI & Logic</span> (Low Cost)</h3>
      <div class="card-grid">${deterministicHTML}</div>

      <h3 style="margin-top:24px;margin-bottom:12px;color:var(--text-primary);font-size:16px"><span data-i18n="label-ai-agents">🧠 LLM Agents</span> (High Value Augmentation)</h3>
      <div class="card-grid">${agentsHTML}</div>
      
      <div class="glass-card accent-yellow" style="margin-top:24px">
        <div class="card-title"><span class="card-icon">💰</span> <span data-i18n="label-cost-opt">Cost Optimization Analysis</span></div>
        <table class="data-table" style="margin-top:12px">
          <thead><tr><th data-i18n="th-technique">Technique</th><th data-i18n="th-impact">Impact</th></tr></thead>
          <tbody>${costRows}</tbody>
        </table>
      </div>
      <div class="glass-card accent-green">
        <div class="card-title"><span class="card-icon">📊</span> <span data-i18n="label-llm-comp">LLM Comparison</span></div>
        <table class="data-table" style="margin-top:12px">
          <thead><tr><th data-i18n="th-model">Model</th><th data-i18n="th-provider">Provider</th><th data-i18n="th-best-for">Best For</th><th data-i18n="th-context">Context</th><th data-i18n="th-cost">Cost</th><th data-i18n="th-vantiq-source">Vantiq Source</th></tr></thead>
          <tbody>${llmRows}</tbody>
        </table>
      </div>
      <div class="glass-card accent-warm">
        <div class="card-title"><span class="card-icon">📦</span> <span data-i18n="label-req-artifacts">Required Artifacts</span></div>
        <table class="data-table" style="margin-top:12px">
          <thead><tr><th data-i18n="th-artifact">Artifact</th><th data-i18n="th-type">Type</th><th data-i18n="th-description">Description</th><th data-i18n="th-vantiq-resource">Vantiq Resource</th></tr></thead>
          <tbody>${artifactRows}</tbody>
        </table>
      </div>
      <div class="glass-card accent-rose">
        <div class="card-title"><span class="card-icon">🛡️</span> <span data-i18n="label-safety">Safety & Guardrails</span></div>
        <ul class="data-list">
          <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)" data-i18n="li-input-val">Input Validation</strong><br/>${(data.guardrails || {}).inputValidation || ''}</div></li>
          <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)" data-i18n="li-output-val">Output Validation</strong><br/>${(data.guardrails || {}).outputValidation || ''}</div></li>
          <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)" data-i18n="li-hitl">Human-in-the-Loop</strong><br/>${(data.guardrails || {}).humanInTheLoop || ''}</div></li>
          <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)" data-i18n="li-fallback">Fallback Strategy</strong><br/>${(data.guardrails || {}).fallbackStrategy || ''}</div></li>
        </ul>
      </div>
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">📊</span> <span data-i18n="label-hybrid-diagram">Hybrid Architecture Flow</span></div>
        ${data.mermaidDiagram ? `<div class="diagram-container"><pre class="mermaid">${data.mermaidDiagram}</pre></div>` : ''}
      </div>`;
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── Event System (Agent 5) ──
  renderEventSystem(data, container) {
    if (!data || !container) return;
    const schemasHTML = (data.schemas || []).map(s => `
      <div class="glass-card" style="padding:14px;margin-bottom:8px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;color:var(--text-primary)">${s.name}</span>
          <span class="tag tag-${(s.type || '') === 'Alert' ? 'rose' : (s.type || '') === 'Detection' ? 'warm' : 'cyan'}" data-i18n="type-${(s.type || 'event').toLowerCase()}">${s.type || 'Event'}</span>
        </div>
        <div class="code-block" style="margin-top:8px;font-size:11px">${JSON.stringify(s.schema, null, 2)}</div>
      </div>`).join('');

    const producersHTML = (data.producers || []).map(p => `
      <tr>
        <td style="color:var(--text-primary);font-weight:500">${p.name}</td>
        <td>${(p.events || []).map(e => `<span class="tag tag-warm">${e}</span>`).join(' ')}</td>
        <td><span class="tag tag-cyan">${p.protocol}</span></td>
        <td>${p.frequency}</td>
      </tr>`).join('');

    const consumersHTML = (data.consumers || []).map(c => `
      <tr>
        <td style="color:var(--text-primary);font-weight:500">${c.name}</td>
        <td>${(c.subscribesTo || []).map(e => `<span class="tag tag-purple">${e}</span>`).join(' ')}</td>
        <td>${c.action}</td>
      </tr>`).join('');

    const eventOrch = data.orchestration || {};
    container.innerHTML = `
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">🔄</span> <span data-i18n="label-orchestration">Orchestration Pattern</span></div>
        <p style="font-size:14px;font-weight:600;color:var(--text-primary);margin:8px 0">${eventOrch.pattern || ''}</p>
        <p style="font-size:13px;color:var(--text-secondary)">${eventOrch.description || ''}</p>
        <p style="font-size:12px;color:var(--text-tertiary);margin-top:8px">🛡️ ${eventOrch.errorHandling || ''}</p>
      </div>
      <div class="glass-card accent-warm">
        <div class="card-title"><span class="card-icon">📋</span> <span data-i18n="label-event-schemas">Event Schemas</span></div>
        ${schemasHTML}
      </div>
      <div class="card-grid">
        <div class="glass-card accent-green">
          <div class="card-title"><span class="card-icon">📤</span> <span data-i18n="label-producers">Producers</span></div>
          <table class="data-table"><thead><tr><th data-i18n="th-producer">Producer</th><th data-i18n="th-events">Events</th><th data-i18n="th-protocol">Protocol</th><th data-i18n="th-frequency">Frequency</th></tr></thead><tbody>${producersHTML}</tbody></table>
        </div>
        <div class="glass-card accent-purple">
          <div class="card-title"><span class="card-icon">📥</span> <span data-i18n="label-consumers">Consumers</span></div>
          <table class="data-table"><thead><tr><th data-i18n="th-consumer">Consumer</th><th data-i18n="th-subscribes">Subscribes To</th><th data-i18n="th-action">Action</th></tr></thead><tbody>${consumersHTML}</tbody></table>
        </div>
      </div>
      <div class="glass-card accent-rose">
        <div class="card-title"><span class="card-icon">📊</span> <span data-i18n="label-event-flow">Event Flow Diagram</span></div>
        ${data.flowDiagram ? `<div class="diagram-container"><pre class="mermaid">${data.flowDiagram}</pre></div>` : ''}
      </div>`;
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── Implementation (Agent 6) ──
  renderImplementation(data, container) {
    if (!data || !container) return;
    const servicesHTML = (data.services || []).map(s => {
      const stepsHTML = (s.pseudoSteps || []).map(step => `
                <li>
                  <span class="ps-bullet">▸</span>
                  <span><span class="ps-keyword">${step.keyword}</span> — ${step.text}</span>
                </li>`).join('');

      return `
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">⚙️</span> ${s.name}</div>
        <p style="font-size:12px;color:var(--text-secondary);margin:6px 0">${s.description}</p>
        <div class="tag-list" style="margin:8px 0">
          <span class="tag tag-cyan"><span data-i18n="label-input">Input</span>: ${s.inputEvent || 'N/A'}</span>
          <span class="tag tag-green"><span data-i18n="label-output">Output</span>: ${s.outputEvent || 'N/A'}</span>
        </div>
        <div class="pseudo-code-block">
          <div class="pseudo-title"><span data-i18n="label-pseudo-code">Pseudo-Code</span> — ${s.name}</div>
          <ul class="pseudo-steps">${stepsHTML}</ul>
        </div>
        <div style="margin-top:12px;font-size:12px;font-weight:600;color:var(--text-tertiary)" data-i18n="label-api-endpoints">API Endpoints:</div>
        ${(s.endpoints || []).map(ep => `<div style="font-size:12px;margin-top:4px"><span class="tag tag-warm">${ep.method}</span> <span style="font-family:'JetBrains Mono',monospace;color:var(--text-secondary)">${ep.path}</span></div>`).join('')}
      </div>`;
    }).join('');

    const typesHTML = (data.eventTypes || []).map(et => {
      const fieldsHTML = (et.fields || []).map(f => `
              <tr>
                <td style="font-family:'JetBrains Mono',monospace;color:var(--text-primary);font-weight:500">${f.field}</td>
                <td><span class="tag tag-purple">${f.type}</span></td>
                <td>${f.description}</td>
              </tr>`).join('');

      return `
      <div class="glass-card" style="padding:14px;margin-bottom:8px">
        <span style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;color:var(--text-accent)">${et.name}</span>
        <table class="data-table" style="margin-top:8px">
          <thead><tr><th data-i18n="th-field">Field</th><th data-i18n="th-type">Type</th><th data-i18n="th-description">Description</th></tr></thead>
          <tbody>${fieldsHTML}</tbody>
        </table>
      </div>`;
    }).join('');

    const structureHTML = (data.projectStructure || []).map(d => `
      <li><span class="list-icon">📁</span><div><strong style="color:var(--text-primary)">${d.path}</strong><br/><span style="font-size:11px;font-family:'JetBrains Mono',monospace">${d.files.join(', ')}</span></div></li>`).join('');

    container.innerHTML = `
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">📂</span> <span data-i18n="label-project-struct">Project Structure</span></div>
        <ul class="data-list">${structureHTML}</ul>
      </div>
      ${servicesHTML}
      <div class="glass-card accent-green">
        <div class="card-title"><span class="card-icon">📝</span> <span data-i18n="label-event-defs">Event Type Definitions</span></div>
        ${typesHTML}
      </div>`;
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── Diagrams (Agent 7) ──
  renderDiagrams(data, container) {
    if (!data || !container) return;
    const diagramsHTML = (data.diagrams || []).map((d, i) => `
      <div class="glass-card accent-${['purple', 'cyan', 'green'][i % 3]}">
        <div class="card-title"><span class="card-icon">${d.type === 'architecture' ? '🏗️' : d.type === 'component' ? '🧩' : '☁️'}</span> ${d.title}</div>
        <p style="font-size:12px;color:var(--text-secondary);margin:6px 0 16px">${d.description}</p>
        ${d.mermaid ? `<div class="diagram-container"><pre class="mermaid">${d.mermaid}</pre></div>` : '<p style="color:var(--text-tertiary)">No diagram data generated.</p>'}
      </div>`).join('');
    container.innerHTML = diagramsHTML || '<p style="color:var(--text-tertiary)">No diagrams generated.</p>';
  },

  // ── Demo Scenarios (Agent 8) ──
  renderDemo(data, container) {
    if (!data || !container) return;
    const scenariosHTML = (data.scenarios || []).map(sc => {
      const stepsHTML = (sc.steps || []).map(st => `
        <li><div class="step-content"><strong>${st.title}</strong>${st.description}<br/><span style="font-size:11px;color:var(--brand-success)">✓ <span data-i18n="label-expected">Expected</span>: ${st.expected}</span></div></li>`).join('');

      const eventsHTML = (sc.simulatedEvents || []).map(ev => `
        <div class="glass-card" style="padding:12px;margin-bottom:8px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <span class="tag tag-warm">${ev.timing}</span>
            <span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-primary)">${ev.event}</span>
          </div>
          <div class="code-block" style="font-size:11px;margin:4px 0 0">${ev.payload}</div>
        </div>`).join('');

      return `
        <div class="glass-card accent-purple">
          <div class="card-title" style="font-size:18px"><span class="card-icon">🎬</span> ${sc.title}</div>
          <p style="font-size:13px;color:var(--text-secondary);margin:8px 0">${sc.narrative}</p>
          <div class="tag-list" style="margin:12px 0">
            <span class="tag tag-cyan">⏱️ ${sc.duration}</span>
            <span class="tag tag-purple">👥 ${sc.audience}</span>
          </div>
        </div>
        <div class="glass-card accent-cyan">
          <div class="card-title"><span class="card-icon">📋</span> <span data-i18n="label-demo-steps">Demo Steps</span></div>
          <ol class="step-list" style="margin-top:12px">${stepsHTML}</ol>
        </div>
        <div class="glass-card accent-warm">
          <div class="card-title"><span class="card-icon">⚡</span> <span data-i18n="label-sim-events">Simulated Events</span></div>
          ${eventsHTML}
        </div>`;
    }).join('');
    container.innerHTML = scenariosHTML || '<p style="color:var(--text-tertiary)">No demo scenarios generated.</p>';
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── Training Labs (Agent 9) ──
  renderTraining(data, container) {
    if (!data || !container) return;
    const labsHTML = (data.labs || []).map((lab, li) => {
      const stepsHTML = (lab.steps || []).map(st => `
        <li><div class="step-content"><strong>${st.instruction}</strong>${st.detail}<br/><span style="font-size:11px;color:var(--brand-warning)">💡 <span data-i18n="label-hint">Hint</span>: ${st.hint}</span></div></li>`).join('');

      const objHTML = (lab.objectives || []).map(o => `<li><span class="list-icon">◆</span>${o}</li>`).join('');

      return `
        <div class="lab-card" style="margin-bottom:24px;animation:cardReveal 0.4s ease backwards;animation-delay:${li * 0.15}s">
          <div class="lab-card-header">
            <h3>📚 ${lab.title}</h3>
            <p>${lab.description}</p>
            <div class="tag-list" style="margin-top:8px">
              <span class="tag tag-${(lab.difficulty || '') === 'Beginner' ? 'green' : (lab.difficulty || '') === 'Intermediate' ? 'warm' : 'rose'}" data-i18n="diff-${(lab.difficulty || 'unknown').toLowerCase()}">${lab.difficulty || ''}</span>
              <span class="tag tag-cyan">⏱️ ${lab.duration}</span>
            </div>
          </div>
          <div class="lab-card-body">
            <div class="lab-objectives">
              <h4 data-i18n="label-learning-obj">🎯 Learning Objectives</h4>
              <ul class="data-list">${objHTML}</ul>
            </div>
            <h4 style="font-size:12px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:12px" data-i18n="label-steps">📝 Steps</h4>
            <ol class="step-list">${stepsHTML}</ol>
            <div class="glass-card accent-green" style="margin-top:16px">
              <div class="card-title"><span class="card-icon">✅</span> <span data-i18n="label-outcome">Expected Outcome</span></div>
              <p style="font-size:13px;color:var(--text-secondary)">${lab.expectedOutcome}</p>
            </div>
          </div>
        </div>`;
    }).join('');
    container.innerHTML = labsHTML || '<p style="color:var(--text-tertiary)">No training labs generated.</p>';
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── Architecture Linter (Agent 11) ──
  renderVantiqLinter(data, container) {
    if (!data || !data.warnings) {
      if (container) container.innerHTML = '<p>No linter data generated.</p>';
      return;
    }

    let scoreColor = 'var(--brand-primary)'; // Green
    if (data.overallScore < 75) scoreColor = '#f59e0b'; // Yellow
    if (data.overallScore < 50) scoreColor = '#ef4444'; // Red

    let html = `
      <div class="glass-card" style="margin-bottom:var(--space-4); display:flex; align-items:center; gap:20px;">
        <div style="width:80px; height:80px; border-radius:50%; border: 4px solid ${scoreColor}; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:700; color:${scoreColor};">
          ${data.overallScore}
        </div>
        <div>
          <h3 style="margin-top:0; margin-bottom:8px; color:var(--text-primary);" data-i18n="label-arch-grade">Architecture Grade</h3>
          <p style="margin:0; color:var(--text-secondary); line-height:1.5;">${escapeHtml(data.summary)}</p>
        </div>
      </div>
      <h3 style="margin-top:var(--space-6); margin-bottom:var(--space-4); border-bottom: 1px solid var(--border-default); padding-bottom: 8px;" data-i18n="label-audit-findings">Audit Findings</h3>
    `;

    data.warnings.forEach(warning => {
      let badgeColor = 'var(--text-tertiary)';
      if (warning.severity === 'Critical') badgeColor = '#ef4444';
      if (warning.severity === 'High') badgeColor = '#f97316';
      if (warning.severity === 'Medium') badgeColor = '#f59e0b';
      if (warning.severity === 'Low') badgeColor = '#3b82f6';

      html += `
          <div class="glass-card" style="margin-bottom: var(--space-3); border-left: 4px solid ${badgeColor}">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <strong style="color:var(--text-primary)">${escapeHtml(warning.component)}</strong>
              <span style="background:${badgeColor}; color:white; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:600;" data-i18n="sev-${warning.severity.toLowerCase()}">${escapeHtml(warning.severity)}</span>
            </div>
            <p style="margin:0 0 8px 0; font-size:14px; color:var(--text-secondary);"><strong data-i18n="label-issue">Issue</strong>: ${escapeHtml(warning.issue)}</p>
            <p style="margin:0; font-size:14px; color:var(--text-secondary);"><strong data-i18n="label-fix">Fix</strong>: ${escapeHtml(warning.recommendation)}</p>
          </div>
        `;
    });

    if (data.warnings.length === 0) {
      html += '<div class="glass-card"><p style="color:var(--text-secondary); margin:0;">No architectural flaws detected! The system design aligns perfectly with Vantiq best practices.</p></div>';
    }

    if (container) container.innerHTML = html;
  },

  // ── Competitive Analysis (Agent 10) ──
  renderCompetitiveAnalysis(data, container) {
    // Use case summary
    let html = `
      <div class="glass-card accent-cyan" style="margin-bottom:20px">
        <div class="card-title"><span class="card-icon">🎯</span> <span data-i18n="label-use-case-context">Use Case Context</span></div>
        <p style="font-size:14px;color:var(--text-primary);margin:8px 0">${escapeHtml(data.useCaseSummary || '')}</p>
      </div>`;

    // Competitor profiles
    const competitorsHTML = (data.competitors || []).map((c, i) => {
      const isVantiq = i === 0;
      const accent = isVantiq ? 'accent-green' : 'accent-purple';
      const badge = isVantiq ? '<span class="tag tag-cyan" style="margin-left:8px">★ VANTIQ</span>' : '';
      const strengthsHTML = (c.strengths || []).map(s => `<li style="color:var(--brand-success);font-size:12px">✓ ${escapeHtml(s)}</li>`).join('');
      const weaknessesHTML = (c.weaknesses || []).map(w => `<li style="color:var(--brand-danger);font-size:12px">✗ ${escapeHtml(w)}</li>`).join('');
      return `
        <div class="glass-card ${accent}">
          <div class="card-title" style="font-size:16px">
            <span class="card-icon">${isVantiq ? '🏆' : '🏢'}</span> ${escapeHtml(c.name)}${badge}
          </div>
          <span class="tag tag-warm" style="margin:4px 0 8px">${escapeHtml(c.category || '')}</span>
          <p style="font-size:12px;color:var(--text-secondary);margin:6px 0"><strong data-i18n="label-best-for">Best for</strong>: ${escapeHtml(c.bestFor || '')}</p>
          <p style="font-size:12px;color:var(--text-tertiary);margin:4px 0"><strong data-i18n="label-pricing">Pricing</strong>: ${escapeHtml(c.pricing || '')}</p>
          <div style="display:flex;gap:16px;margin-top:10px">
            <div style="flex:1"><div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;font-weight:600" data-i18n="label-strengths">Strengths</div><ul style="padding-left:16px;margin:0">${strengthsHTML}</ul></div>
            <div style="flex:1"><div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;font-weight:600" data-i18n="label-weaknesses">Weaknesses</div><ul style="padding-left:16px;margin:0">${weaknessesHTML}</ul></div>
          </div>
        </div>`;
    }).join('');
    html += `<div class="card-grid">${competitorsHTML}</div>`;

    // Comparison matrix
    if (data.comparisonMatrix && data.comparisonMatrix.length) {
      const compNames = (data.competitors || []).map(c => c.name);
      const headerCells = (compNames || []).map(n => `<th style="padding:8px 6px;font-size:11px;color:var(--text-secondary);white-space:nowrap">${escapeHtml(n)}</th>`).join('');
      const rows = (data.comparisonMatrix || []).map(row => {
        const cells = (compNames || []).map(name => {
          const r = (row.ratings || []).find(x => x.competitor === name);
          if (!r) return '<td style="padding:6px;font-size:11px;color:var(--text-tertiary)">—</td>';
          const color = r.rating === 'Strong' ? 'var(--brand-success)' : r.rating === 'Moderate' ? 'var(--brand-warning)' : 'var(--brand-danger)';
          return `<td style="padding:6px;font-size:11px" title="${escapeHtml(r.note || '')}"><span style="color:${color};font-weight:600">${escapeHtml(r.rating)}</span></td>`;
        }).join('');
        return `<tr><td style="padding:6px 8px;font-size:12px;color:var(--text-primary);font-weight:500">${escapeHtml(row.criterion)}</td>${cells}</tr>`;
      }).join('');
      html += `
        <div class="glass-card accent-warm" style="margin-top:20px;overflow-x:auto">
          <div class="card-title"><span class="card-icon">📊</span> <span data-i18n="label-feature-matrix">Feature Comparison Matrix</span></div>
          <table style="width:100%;border-collapse:collapse;margin-top:12px">
            <thead><tr><th style="padding:8px;font-size:11px;color:var(--text-secondary);text-align:left" data-i18n="th-criterion">Criterion</th>${headerCells}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;
    }

    // Differentiators
    if (data.differentiators && data.differentiators.length) {
      const diffHTML = (data.differentiators || []).map(d => `
        <div class="glass-card" style="padding:14px;margin-bottom:8px">
          <div style="font-weight:600;font-size:14px;color:var(--brand-primary);margin-bottom:4px">✦ ${escapeHtml(d.feature)}</div>
          <p style="font-size:12px;color:var(--text-primary);margin:4px 0">${escapeHtml(d.description)}</p>
          <p style="font-size:11px;color:var(--text-tertiary);margin:4px 0"><em data-i18n="label-comp-gap">Competitor gap</em>: ${escapeHtml(d.competitorGap)}</p>
        </div>`).join('');
      html += `
        <div class="glass-card accent-green" style="margin-top:20px">
          <div class="card-title"><span class="card-icon">💎</span> <span data-i18n="label-vantiq-differentiators">Vantiq Differentiators</span></div>
          ${diffHTML}
        </div>`;
    }

    // Objection handling
    if (data.objectionHandling && data.objectionHandling.length) {
      const objHTML = (data.objectionHandling || []).map(o => `
        <div class="glass-card" style="padding:14px;margin-bottom:8px">
          <div style="font-weight:600;font-size:13px;color:var(--brand-danger);margin-bottom:6px">❓ "${escapeHtml(o.objection)}"</div>
          <div style="font-size:12px;color:var(--text-primary);padding-left:12px;border-left:2px solid var(--brand-success)">${escapeHtml(o.response)}</div>
        </div>`).join('');
      html += `
        <div class="glass-card accent-rose" style="margin-top:20px">
          <div class="card-title"><span class="card-icon">🛡️</span> <span data-i18n="label-objection-handling">Objection Handling</span></div>
          ${objHTML}
        </div>`;
    }

    // Recommendation
    if (data.recommendation) {
      html += `
        <div class="glass-card accent-cyan" style="margin-top:20px">
          <div class="card-title"><span class="card-icon">🎯</span> <span data-i18n="label-recommendation">Recommendation</span></div>
          <p style="font-size:14px;color:var(--text-primary);margin:8px 0;line-height:1.6">${escapeHtml(data.recommendation)}</p>
        </div>`;
    }

    if (container) container.innerHTML = html;
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  },

  // ── 11. Business Value Justifier ──
  renderBusinessValue: function (data, container) {
    if (!data) return;
    let html = '';

    if (data.summary) {
      html += `
        <div class="glass-card accent-cyan" style="margin-bottom:20px">
          <div class="card-title"><span class="card-icon">🎯</span> Executive Summary</div>
          <p style="font-size:14px;color:var(--text-primary);line-height:1.6">${escapeHtml(data.summary)}</p>
        </div>`;
    }

    if (data.valueDrivers && data.valueDrivers.length) {
      const driversHTML = data.valueDrivers.map(d => `
        <div class="glass-card" style="padding:14px;margin-bottom:8px">
          <div style="font-weight:600;font-size:14px;color:var(--brand-success);margin-bottom:4px">📈 ${escapeHtml(d.category)}</div>
          <p style="font-size:13px;color:var(--text-primary);margin:0">${escapeHtml(d.impact)}</p>
        </div>`).join('');
      html += `
        <div class="glass-card accent-green" style="margin-bottom:20px">
          <div class="card-title"><span class="card-icon">💎</span> Value Drivers</div>
          ${driversHTML}
        </div>`;
    }

    if (data.riskMitigations && data.riskMitigations.length) {
      const risksHTML = data.riskMitigations.map(r => `
        <div class="glass-card" style="padding:14px;margin-bottom:8px">
          <div style="font-weight:600;font-size:13px;color:var(--brand-danger);margin-bottom:6px">⚠️ ${escapeHtml(r.risk)}</div>
          <div style="font-size:13px;color:var(--text-primary);padding-left:12px;border-left:2px solid var(--brand-success)">🛡️ <strong>Solution:</strong> ${escapeHtml(r.solution)}</div>
        </div>`).join('');
      html += `
        <div class="glass-card accent-rose" style="margin-bottom:20px">
          <div class="card-title"><span class="card-icon">🛡️</span> Risk Mitigations</div>
          ${risksHTML}
        </div>`;
    }

    if (data.kpis && data.kpis.length) {
      const kpisHTML = data.kpis.map(k => `
        <div class="glass-card" style="padding:14px;flex:1;min-width:200px">
          <div style="font-size:12px;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">${escapeHtml(k.metric)}</div>
          <div style="font-weight:700;font-size:16px;color:var(--brand-primary)">${escapeHtml(k.target)}</div>
        </div>`).join('');
      html += `
        <div class="glass-card accent-warm">
          <div class="card-title"><span class="card-icon">📊</span> Success KPIs</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            ${kpisHTML}
          </div>
        </div>`;
    }

    if (container) container.innerHTML = html;
    if (window.app && window.app.localizeUI) window.app.localizeUI();
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ============================================
// Vantiq Spark — Renderers
// ============================================

window.Renderers = {

  // ── Problem Analysis (Agent 1) ──
  renderAnalysis(data, container) {
    if (container) container.innerHTML = `
      <div class="card-grid">
        <div class="glass-card accent-purple" style="animation-delay:0s">
          <div class="card-title"><span class="card-icon">${data.domainIcon}</span> Domain</div>
          <div style="font-size:20px;font-weight:700;color:var(--text-primary);margin:8px 0">${data.domain}</div>
          <p style="font-size:13px;color:var(--text-secondary)">${data.summary}</p>
        </div>
        <div class="glass-card accent-rose" style="animation-delay:0.04s; grid-column: span 2">
          <div class="card-title"><span class="card-icon">🎯</span> Core Problem</div>
          <p style="font-size:14px;color:var(--text-primary);margin-top:8px">${data.coreProblem}</p>
        </div>
        <div class="glass-card accent-cyan" style="animation-delay:0.08s">
          <div class="card-title"><span class="card-icon">👥</span> Actors</div>
          <div class="tag-list">${(data.actors || []).map(a => `<span class="tag tag-cyan">${a}</span>`).join('')}</div>
        </div>
        <div class="glass-card accent-green" style="animation-delay:0.16s">
          <div class="card-title"><span class="card-icon">📊</span> Data Sources</div>
          <ul class="data-list">${(data.dataSources || []).map(d => `<li><span class="list-icon">◆</span>${d}</li>`).join('')}</ul>
        </div>
        <div class="glass-card accent-warm" style="animation-delay:0.24s">
          <div class="card-title"><span class="card-icon">⚡</span> Events</div>
          <div class="tag-list">${(data.events || []).map(e => `<span class="tag tag-warm">${e}</span>`).join('')}</div>
        </div>
        <div class="glass-card accent-rose" style="animation-delay:0.32s">
          <div class="card-title"><span class="card-icon">🧠</span> AI Tasks</div>
          <ul class="data-list">${(data.aiTasks || []).map(t => `<li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)">${t.task}</strong><br/><span style="font-size:11px">${t.type} — ${t.models.join(', ')}</span></div></li>`).join('')}</ul>
        </div>
        <div class="glass-card accent-purple" style="animation-delay:0.4s">
          <div class="card-title"><span class="card-icon">🧩</span> Entities</div>
          <div class="tag-list">${(data.entities || []).map(e => `<span class="tag tag-purple">${e}</span>`).join('')}</div>
        </div>
        <div class="glass-card accent-green" style="animation-delay:0.48s; grid-column: span 3">
          <div class="card-title"><span class="card-icon">🚀</span> Why Vantiq?</div>
          <p style="font-size:14px;color:var(--text-primary);margin-top:8px; line-height: 1.5">${data.vantiqSuitability}</p>
        </div>
      </div>`;
  },

  // ── Domain Model (Agent 2) ──
  renderDomainModel(data, container) {
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
          <span class="tag tag-${e.type === 'Alert' ? 'rose' : e.type === 'Detection' ? 'warm' : e.type === 'Command' ? 'purple' : 'cyan'}">${e.type}</span>
        </div>
      </div>`).join('');

    const servicesHTML = (data.services || []).map(s => `
      <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)">${s.name}</strong><br/><span style="font-size:12px">${s.responsibility}</span></div></li>`).join('');

    const commandsHTML = (data.commands || []).map(c => `<span class="tag tag-green">${c.name} → ${c.target}</span>`).join('');

    if (container) container.innerHTML = `
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">📦</span> Entities</div>
        <div class="entity-grid" style="margin-top:12px">${entitiesHTML}</div>
      </div>
      <div class="card-grid">
        <div class="glass-card accent-cyan">
          <div class="card-title"><span class="card-icon">⚡</span> Events</div>
          ${eventsHTML}
        </div>
        <div class="glass-card accent-green">
          <div class="card-title"><span class="card-icon">⚙️</span> Services</div>
          <ul class="data-list">${servicesHTML}</ul>
        </div>
      </div>
      <div class="glass-card accent-warm">
        <div class="card-title"><span class="card-icon">📋</span> Commands</div>
        <div class="tag-list">${commandsHTML}</div>
      </div>`;
  },

  // ── Architecture (Agent 3) ──
  renderArchitecture(data, container) {
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

    if (container) container.innerHTML = `
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">📝</span> Architecture Overview</div>
        <p style="font-size:14px;color:var(--text-secondary);margin:8px 0">${data.description}</p>
        <div style="margin-top:12px">
          <div class="code-block" style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-accent)">${data.dataFlow}</div>
        </div>
        <div class="tag-list" style="margin-top:12px">${(data.principles || []).map(p => `<span class="tag tag-green">${p}</span>`).join('')}</div>
      </div>
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">🏗️</span> System Components</div>
        <div class="card-grid-3" style="margin-top:12px">${componentsHTML}</div>
      </div>
      <div class="glass-card accent-warm">
        <div class="card-title"><span class="card-icon">🔗</span> Integration Points</div>
        <table class="data-table" style="margin-top:12px">
          <thead><tr><th>From</th><th></th><th>To</th><th>Protocol</th><th>Description</th></tr></thead>
          <tbody>${integrationsHTML}</tbody>
        </table>
      </div>
      <div class="glass-card accent-green">
        <div class="card-title"><span class="card-icon">📊</span> Architecture Diagram</div>
        <div class="diagram-container"><pre class="mermaid">${data.mermaidDiagram}</pre></div>
      </div>`;
  },

  // ── AI Models (Agent 4) ──
  renderAIModels(data, container) {
    const recsHTML = (data.recommendations || []).map(rec => {
      const modelsHTML = (rec.models || []).map(m => `
        <div class="glass-card" style="padding:12px 16px;margin-bottom:8px;${m.isPrimary ? 'border-left:3px solid var(--brand-success)' : ''}">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-weight:600;color:var(--text-primary)">${m.name}</span>
            ${m.isPrimary ? '<span class="tag tag-green">Recommended</span>' : ''}
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
                <span class="tag tag-purple">${rec.type}</span>
                <span class="tag tag-cyan">${rec.deployment.strategy}</span>
              </div>
            </div>
          </div>
          <div style="margin-top:16px">${modelsHTML}</div>
          <div style="margin-top:16px">
            <div style="font-size:12px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:8px">Deployment</div>
            <div class="card-grid">
              <div style="font-size:12px;color:var(--text-secondary)"><strong style="color:var(--text-accent)">Edge:</strong> ${rec.deployment.edge}</div>
              <div style="font-size:12px;color:var(--text-secondary)"><strong style="color:var(--brand-secondary)">Cloud:</strong> ${rec.deployment.cloud}</div>
            </div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:8px">⏱️ Latency: <strong style="color:var(--brand-success)">${rec.deployment.latency}</strong></div>
          </div>
          <div style="margin-top:16px">
            <div style="font-size:12px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:8px">Hardware</div>
            <div class="tag-list">
              <span class="tag tag-warm">Edge: ${rec.hardware.edge}</span>
              <span class="tag tag-cyan">Cloud: ${rec.hardware.cloud}</span>
              <span class="tag tag-purple">RAM: ${rec.hardware.memory}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    if (container) container.innerHTML = `
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">🎯</span> Overall Strategy</div>
        <p style="font-size:13px;color:var(--text-secondary);margin:8px 0">${data.overallStrategy}</p>
        <p style="font-size:12px;color:var(--text-tertiary);margin-top:8px"><strong style="color:var(--text-accent)">Vantiq Integration:</strong> ${data.vantiqIntegration}</p>
      </div>
      ${recsHTML}`;
  },

  // ── Agentic AI Guide (Agent 4b) ──
  renderAgenticGuide(data, container) {
    const orchHTML = `
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">🔄</span> Orchestration: ${data.orchestrationPattern.name}</div>
        <p style="font-size:13px;color:var(--text-secondary);margin:8px 0">${data.orchestrationPattern.description}</p>
        <p style="font-size:12px;color:var(--text-tertiary);margin-top:8px"><strong style="color:var(--text-accent)">Vantiq:</strong> ${data.orchestrationPattern.vantiqImplementation}</p>
      </div>`;

    const agentsHTML = (data.agents || []).map(a => `
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">🤖</span> ${a.name}</div>
        <p style="font-size:13px;color:var(--text-secondary);margin:6px 0">${a.role}</p>
        <div class="tag-list" style="margin:8px 0">
          <span class="tag tag-purple">LLM: ${a.llm}</span>
          <span class="tag tag-cyan">${a.memoryType}</span>
          <span class="tag tag-green">${a.vantiqComponent}</span>
        </div>
        <div style="margin-top:10px">
          <div style="font-size:11px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.5px">Tools</div>
          <div class="tag-list" style="margin-top:4px">${(a.tools || []).map(t => '<span class="tag tag-warm">' + t + '</span>').join('')}</div>
        </div>
        <div style="margin-top:10px;display:flex;gap:16px;flex-wrap:wrap">
          <div>
            <div style="font-size:11px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase">Inputs</div>
            <div class="tag-list" style="margin-top:4px">${(a.inputs || []).map(i => '<span class="tag tag-cyan">' + i + '</span>').join('')}</div>
          </div>
          <div>
            <div style="font-size:11px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase">Outputs</div>
            <div class="tag-list" style="margin-top:4px">${(a.outputs || []).map(o => '<span class="tag tag-green">' + o + '</span>').join('')}</div>
          </div>
        </div>
      </div>`).join('');

    const llmRows = (data.llmComparison || []).map(m => `
        <tr>
          <td style="color:var(--text-primary);font-weight:500">${m.model}</td>
          <td><span class="tag tag-purple">${m.provider}</span></td>
          <td>${m.bestFor}</td>
          <td>${m.contextWindow}</td>
          <td><span class="tag tag-${m.costTier === 'Low' ? 'green' : m.costTier === 'Medium' ? 'warm' : 'rose'}">${m.costTier}</span></td>
          <td style="font-size:12px;color:var(--text-tertiary)">${m.vantiqSource}</td>
        </tr>`).join('');

    const artifactRows = (data.artifacts || []).map(a => `
        <tr>
          <td style="color:var(--text-primary);font-weight:500">${a.name}</td>
          <td><span class="tag tag-cyan">${a.type}</span></td>
          <td>${a.description}</td>
          <td style="font-size:12px;color:var(--text-tertiary)">${a.vantiqResource}</td>
        </tr>`).join('');

    if (container) container.innerHTML = `
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">🧠</span> Architecture Overview</div>
        <p style="font-size:14px;color:var(--text-secondary);margin:8px 0">${data.architectureOverview}</p>
      </div>
      ${orchHTML}
      <div class="card-grid">${agentsHTML}</div>
      <div class="glass-card accent-green">
        <div class="card-title"><span class="card-icon">📊</span> LLM Comparison</div>
        <table class="data-table" style="margin-top:12px">
          <thead><tr><th>Model</th><th>Provider</th><th>Best For</th><th>Context</th><th>Cost</th><th>Vantiq Source</th></tr></thead>
          <tbody>${llmRows}</tbody>
        </table>
      </div>
      <div class="glass-card accent-warm">
        <div class="card-title"><span class="card-icon">📦</span> Required Artifacts</div>
        <table class="data-table" style="margin-top:12px">
          <thead><tr><th>Artifact</th><th>Type</th><th>Description</th><th>Vantiq Resource</th></tr></thead>
          <tbody>${artifactRows}</tbody>
        </table>
      </div>
      <div class="glass-card accent-rose">
        <div class="card-title"><span class="card-icon">🛡️</span> Safety & Guardrails</div>
        <ul class="data-list">
          <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)">Input Validation</strong><br/>${data.guardrails.inputValidation}</div></li>
          <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)">Output Validation</strong><br/>${data.guardrails.outputValidation}</div></li>
          <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)">Human-in-the-Loop</strong><br/>${data.guardrails.humanInTheLoop}</div></li>
          <li><span class="list-icon">◆</span><div><strong style="color:var(--text-primary)">Fallback Strategy</strong><br/>${data.guardrails.fallbackStrategy}</div></li>
        </ul>
      </div>
      <div class="glass-card accent-purple">
        <div class="card-title"><span class="card-icon">📊</span> Agent Interaction Diagram</div>
        <div class="diagram-container"><pre class="mermaid">${data.mermaidDiagram}</pre></div>
      </div>`;
  },

  // ── Event System (Agent 5) ──
  renderEventSystem(data, container) {
    const schemasHTML = (data.schemas || []).map(s => `
      <div class="glass-card" style="padding:14px;margin-bottom:8px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;color:var(--text-primary)">${s.name}</span>
          <span class="tag tag-${s.type === 'Alert' ? 'rose' : s.type === 'Detection' ? 'warm' : 'cyan'}">${s.type}</span>
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

    if (container) container.innerHTML = `
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">🔄</span> Orchestration Pattern</div>
        <p style="font-size:14px;font-weight:600;color:var(--text-primary);margin:8px 0">${data.orchestration.pattern}</p>
        <p style="font-size:13px;color:var(--text-secondary)">${data.orchestration.description}</p>
        <p style="font-size:12px;color:var(--text-tertiary);margin-top:8px">🛡️ ${data.orchestration.errorHandling}</p>
      </div>
      <div class="glass-card accent-warm">
        <div class="card-title"><span class="card-icon">📋</span> Event Schemas</div>
        ${schemasHTML}
      </div>
      <div class="card-grid">
        <div class="glass-card accent-green">
          <div class="card-title"><span class="card-icon">📤</span> Producers</div>
          <table class="data-table"><thead><tr><th>Producer</th><th>Events</th><th>Protocol</th><th>Frequency</th></tr></thead><tbody>${producersHTML}</tbody></table>
        </div>
        <div class="glass-card accent-purple">
          <div class="card-title"><span class="card-icon">📥</span> Consumers</div>
          <table class="data-table"><thead><tr><th>Consumer</th><th>Subscribes To</th><th>Action</th></tr></thead><tbody>${consumersHTML}</tbody></table>
        </div>
      </div>
      <div class="glass-card accent-rose">
        <div class="card-title"><span class="card-icon">📊</span> Event Flow Diagram</div>
        <div class="diagram-container"><pre class="mermaid">${data.flowDiagram}</pre></div>
      </div>`;
  },

  // ── Implementation (Agent 6) ──
  renderImplementation(data, container) {
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
          <span class="tag tag-cyan">Input: ${s.inputEvent}</span>
          <span class="tag tag-green">Output: ${s.outputEvent}</span>
        </div>
        <div class="pseudo-code-block">
          <div class="pseudo-title">Pseudo-Code — ${s.name}</div>
          <ul class="pseudo-steps">${stepsHTML}</ul>
        </div>
        <div style="margin-top:12px;font-size:12px;font-weight:600;color:var(--text-tertiary)">API Endpoints:</div>
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
          <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>${fieldsHTML}</tbody>
        </table>
      </div>`;
    }).join('');

    const structureHTML = (data.projectStructure || []).map(d => `
      <li><span class="list-icon">📁</span><div><strong style="color:var(--text-primary)">${d.path}</strong><br/><span style="font-size:11px;font-family:'JetBrains Mono',monospace">${d.files.join(', ')}</span></div></li>`).join('');

    if (container) container.innerHTML = `
      <div class="glass-card accent-cyan">
        <div class="card-title"><span class="card-icon">📂</span> Project Structure</div>
        <ul class="data-list">${structureHTML}</ul>
      </div>
      ${servicesHTML}
      <div class="glass-card accent-green">
        <div class="card-title"><span class="card-icon">📝</span> Event Type Definitions</div>
        ${typesHTML}
      </div>`;
  },

  // ── Diagrams (Agent 7) ──
  renderDiagrams(data, container) {
    const diagramsHTML = (data.diagrams || []).map((d, i) => `
      <div class="glass-card accent-${['purple', 'cyan', 'green'][i % 3]}">
        <div class="card-title"><span class="card-icon">${d.type === 'architecture' ? '🏗️' : d.type === 'component' ? '🧩' : '☁️'}</span> ${d.title}</div>
        <p style="font-size:12px;color:var(--text-secondary);margin:6px 0 16px">${d.description}</p>
        <div class="diagram-container"><pre class="mermaid">${d.mermaid}</pre></div>
      </div>`).join('');
    if (container) container.innerHTML = diagramsHTML;
  },

  // ── Demo Scenarios (Agent 8) ──
  renderDemo(data, container) {
    const scenariosHTML = (data.scenarios || []).map(sc => {
      const stepsHTML = (sc.steps || []).map(st => `
        <li><div class="step-content"><strong>${st.title}</strong>${st.description}<br/><span style="font-size:11px;color:var(--brand-success)">✓ Expected: ${st.expected}</span></div></li>`).join('');

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
          <div class="card-title"><span class="card-icon">📋</span> Demo Steps</div>
          <ol class="step-list" style="margin-top:12px">${stepsHTML}</ol>
        </div>
        <div class="glass-card accent-warm">
          <div class="card-title"><span class="card-icon">⚡</span> Simulated Events</div>
          ${eventsHTML}
        </div>`;
    }).join('');
    if (container) container.innerHTML = scenariosHTML;
  },

  // ── Training Labs (Agent 9) ──
  renderTraining(data, container) {
    const labsHTML = (data.labs || []).map((lab, li) => {
      const stepsHTML = (lab.steps || []).map(st => `
        <li><div class="step-content"><strong>${st.instruction}</strong>${st.detail}<br/><span style="font-size:11px;color:var(--brand-warning)">💡 Hint: ${st.hint}</span></div></li>`).join('');

      const objHTML = (lab.objectives || []).map(o => `<li><span class="list-icon">◆</span>${o}</li>`).join('');

      return `
        <div class="lab-card" style="margin-bottom:24px;animation:cardReveal 0.4s ease backwards;animation-delay:${li * 0.15}s">
          <div class="lab-card-header">
            <h3>📚 ${lab.title}</h3>
            <p>${lab.description}</p>
            <div class="tag-list" style="margin-top:8px">
              <span class="tag tag-${lab.difficulty === 'Beginner' ? 'green' : lab.difficulty === 'Intermediate' ? 'warm' : 'rose'}">${lab.difficulty}</span>
              <span class="tag tag-cyan">⏱️ ${lab.duration}</span>
            </div>
          </div>
          <div class="lab-card-body">
            <div class="lab-objectives">
              <h4>🎯 Learning Objectives</h4>
              <ul class="data-list">${objHTML}</ul>
            </div>
            <h4 style="font-size:12px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:12px">📝 Steps</h4>
            <ol class="step-list">${stepsHTML}</ol>
            <div class="glass-card accent-green" style="margin-top:16px">
              <div class="card-title"><span class="card-icon">✅</span> Expected Outcome</div>
              <p style="font-size:13px;color:var(--text-secondary)">${lab.expectedOutcome}</p>
            </div>
          </div>
        </div>`;
    }).join('');
    if (container) container.innerHTML = labsHTML;
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
          <h3 style="margin-top:0; margin-bottom:8px; color:var(--text-primary);">Architecture Grade</h3>
          <p style="margin:0; color:var(--text-secondary); line-height:1.5;">${escapeHtml(data.summary)}</p>
        </div>
      </div>
      <h3 style="margin-top:var(--space-6); margin-bottom:var(--space-4); border-bottom: 1px solid var(--border-default); padding-bottom: 8px;">Audit Findings</h3>
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
              <span style="background:${badgeColor}; color:white; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:600;">${escapeHtml(warning.severity)}</span>
            </div>
            <p style="margin:0 0 8px 0; font-size:14px; color:var(--text-secondary);"><strong>Issue:</strong> ${escapeHtml(warning.issue)}</p>
            <p style="margin:0; font-size:14px; color:var(--text-secondary);"><strong>Fix:</strong> ${escapeHtml(warning.recommendation)}</p>
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
        <div class="card-title"><span class="card-icon">🎯</span> Use Case Context</div>
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
          <p style="font-size:12px;color:var(--text-secondary);margin:6px 0"><strong>Best for:</strong> ${escapeHtml(c.bestFor || '')}</p>
          <p style="font-size:12px;color:var(--text-tertiary);margin:4px 0"><strong>Pricing:</strong> ${escapeHtml(c.pricing || '')}</p>
          <div style="display:flex;gap:16px;margin-top:10px">
            <div style="flex:1"><div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;font-weight:600">Strengths</div><ul style="padding-left:16px;margin:0">${strengthsHTML}</ul></div>
            <div style="flex:1"><div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;font-weight:600">Weaknesses</div><ul style="padding-left:16px;margin:0">${weaknessesHTML}</ul></div>
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
          <div class="card-title"><span class="card-icon">📊</span> Feature Comparison Matrix</div>
          <table style="width:100%;border-collapse:collapse;margin-top:12px">
            <thead><tr><th style="padding:8px;font-size:11px;color:var(--text-secondary);text-align:left">Criterion</th>${headerCells}</tr></thead>
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
          <p style="font-size:11px;color:var(--text-tertiary);margin:4px 0"><em>Competitor gap:</em> ${escapeHtml(d.competitorGap)}</p>
        </div>`).join('');
      html += `
        <div class="glass-card accent-green" style="margin-top:20px">
          <div class="card-title"><span class="card-icon">💎</span> Vantiq Differentiators</div>
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
          <div class="card-title"><span class="card-icon">🛡️</span> Objection Handling</div>
          ${objHTML}
        </div>`;
    }

    // Recommendation
    if (data.recommendation) {
      html += `
        <div class="glass-card accent-cyan" style="margin-top:20px">
          <div class="card-title"><span class="card-icon">🎯</span> Recommendation</div>
          <p style="font-size:14px;color:var(--text-primary);margin:8px 0;line-height:1.6">${escapeHtml(data.recommendation)}</p>
        </div>`;
    }

    if (container) container.innerHTML = html;
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

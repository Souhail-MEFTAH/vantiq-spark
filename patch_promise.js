const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const targetA = `        const [compResult, busResult] = await Promise.all([
            Agents.competitiveAnalysis(text, state.results.analysis, state.results.architecture, competitorsText, "", null, state.language),
            Agents.businessValue(text, state.results.analysis, state.results.architecture, "", null, state.language)
        ]);

        state.results.competitive = compResult;
        Renderers.renderCompetitiveAnalysis(state.results.competitive, document.getElementById('competitive-content'));
        updatePipelineStep('competitive', 'completed');
        enableNav('competitive');

        state.results.businessValue = busResult;
        Renderers.renderBusinessValue(state.results.businessValue, document.getElementById('business-content'));
        updatePipelineStep('business', 'completed');
        enableNav('business');`;

const replaceA = `        // Run Agent 10 First
        state.results.competitive = await Agents.competitiveAnalysis(text, state.results.analysis, state.results.architecture, competitorsText, "", null, state.language);
        Renderers.renderCompetitiveAnalysis(state.results.competitive, document.getElementById('competitive-content'));
        updatePipelineStep('competitive', 'completed');
        enableNav('competitive');

        // Run Agent 11 Second (Sequential to prevent browser fetch connection limits)
        document.getElementById('generatingAgentName').textContent = '💡 Agent 11 — Business Value Justifier';
        state.results.businessValue = await Agents.businessValue(text, state.results.analysis, state.results.architecture, "", null, state.language);
        Renderers.renderBusinessValue(state.results.businessValue, document.getElementById('business-content'));
        updatePipelineStep('business', 'completed');
        enableNav('business');`;

code = code.replace(targetA, replaceA);
fs.writeFileSync('app.js', code);
console.log('app.js successfully patched to sequential phase 6');

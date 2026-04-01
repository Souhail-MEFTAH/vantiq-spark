window.PDFGenerator = {
    generate: function (state) {
        const lang = state.language || 'en';
        const isArabic = lang === 'ar';
        const translations = I18N[lang] || I18N.en;

        try {
            if (!state || !state.results || !state.results.analysis) {
                console.error("No valid state to generate PDF");
                return;
            }

            const results = state.results;
            const untitledName = translations['untitled-project'] || "Vantiq AI Project";
            const projectName = results.domainModel?.projectName || untitledName;
            const dateStr = new Date().toLocaleDateString(lang);

            // 1. Configure Fonts
            pdfMake.fonts = {
                Roboto: {
                    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/fonts/Roboto/Roboto-Regular.ttf',
                    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/fonts/Roboto/Roboto-Medium.ttf',
                    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/fonts/Roboto/Roboto-Italic.ttf',
                    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/fonts/Roboto/Roboto-MediumItalic.ttf'
                },
                NotoSansArabic: {
                    normal: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-arabic@latest/arabic-400-normal.ttf',
                    bold: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-arabic@latest/arabic-700-normal.ttf',
                    italics: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-arabic@latest/arabic-400-normal.ttf',
                    bolditalics: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-arabic@latest/arabic-700-normal.ttf'
                },
                NotoSansJP: {
                    normal: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-400-normal.ttf',
                    bold: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-700-normal.ttf',
                    italics: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-400-normal.ttf',
                    bolditalics: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-700-normal.ttf'
                },
                NotoSansKR: {
                    normal: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-400-normal.ttf',
                    bold: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-700-normal.ttf',
                    italics: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-400-normal.ttf',
                    bolditalics: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-700-normal.ttf'
                }
            };

            let primaryFont = 'Roboto';
            if (lang === 'ar') primaryFont = 'NotoSansArabic';
            else if (lang === 'ja') primaryFont = 'NotoSansJP';
            else if (lang === 'ko') primaryFont = 'NotoSansKR';

            const docDefinition = {
                info: { title: projectName, author: 'Vantiq Spark AI Solution Studio', subject: 'Architecture Blueprint' },
                pageSize: 'A4',
                pageOrientation: 'portrait',
                pageMargins: [40, 60, 40, 60],
                defaultStyle: { font: primaryFont, fontSize: 10, color: '#333333', lineHeight: 1.3, alignment: isArabic ? 'right' : 'left' },
                styles: {
                    title: { fontSize: 24, bold: true, color: '#00c389', margin: [0, 0, 0, 10] },
                    subtitle: { fontSize: 14, color: '#555555', margin: [0, 0, 0, 40] },
                    sectionHeader: { fontSize: 16, bold: true, color: '#1a1a2e', margin: [0, 20, 0, 10] },
                    subsectionHeader: { fontSize: 12, bold: true, color: '#7c6bf5', margin: [0, 10, 0, 5] },
                    bodyText: { fontSize: 10, margin: [0, 0, 0, 10] },
                    tableHeader: { bold: true, fontSize: 10, color: '#ffffff', fillColor: '#1a1a2e', margin: [4, 4, 4, 4] },
                    tableCell: { fontSize: 9, margin: [4, 4, 4, 4] },
                    list: { margin: [0, 0, 0, 10] }
                },
                content: []
            };

            const applyArabicRTL = (node, depth = 0) => {
                if (!isArabic || !node || typeof node !== 'object' || depth > 50) return;
                if (Array.isArray(node)) { node.forEach(n => applyArabicRTL(n, depth + 1)); return; }
                if (node.ul || node.ol) {
                    const items = node.ul || node.ol;
                    const isOrdered = !!node.ol;
                    const stackItems = [];
                    items.forEach((item, idx) => {
                        const marker = isOrdered ? `.${idx + 1}` : '•';
                        applyArabicRTL(item, depth + 1);
                        stackItems.push({
                            columns: [
                                typeof item === 'string' ? { text: item, alignment: 'right', width: '*' } : Object.assign({}, item, { alignment: 'right', width: '*' }),
                                { text: marker, width: 20, alignment: 'right', font: 'Roboto', color: '#555555', fontSize: 10 }
                            ],
                            columnGap: 6, margin: [0, 2, 0, 2]
                        });
                    });
                    delete node.ul; delete node.ol; node.stack = stackItems; node.margin = node.margin || [0, 0, 0, 10];
                    return;
                }
                if (node.table && node.table.body) {
                    node.table.body.forEach(row => { if (Array.isArray(row)) { row.reverse(); row.forEach(cell => applyArabicRTL(cell, depth + 1)); } });
                    if (node.table.widths && Array.isArray(node.table.widths)) { node.table.widths.reverse(); }
                }
                if (node.columns) { node.columns.forEach(c => applyArabicRTL(c, depth + 1)); }
                if (node.stack) { node.stack.forEach(s => applyArabicRTL(s, depth + 1)); }
                if (Array.isArray(node.margin) && node.margin.length === 4) { const [l, t, r, b] = node.margin; node.margin = [r, t, l, b]; }
                if (typeof node.text === 'string' && node.text.trim()) {
                    node.text = node.text.replace(/\u2192/g, '\u2190').replace(/->/g, '<-');
                    const str = node.text;
                    const hasArabic = /[\u0600-\u06FF]/.test(str);
                    if (hasArabic) {
                        const lines = str.split('\n');
                        const newTextRuns = [];
                        lines.forEach((line, index) => {
                            if (!line.trim()) { if (index < lines.length - 1) newTextRuns.push({ text: '\n' }); return; }
                            const tokens = line.match(/([a-zA-Z0-9](?:[\x20-\x7E]*[a-zA-Z0-9])?)|([\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]+)|(\s+)|([\x21-\x7E]+)|([^\x00-\x7F]+)/g) || [line];
                            tokens.reverse().forEach(token => {
                                const hasArabicChars = /[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(token);
                                newTextRuns.push({ text: token, font: hasArabicChars ? 'NotoSansArabic' : 'Roboto' });
                            });
                            if (index < lines.length - 1) newTextRuns.push({ text: '\n' });
                        });
                        node.text = newTextRuns; node.alignment = node.alignment || 'right';
                    } else { node.font = node.font || 'Roboto'; node.alignment = node.alignment || 'right'; }
                } else if (Array.isArray(node.text)) { node.text.reverse(); node.text.forEach(t => applyArabicRTL(t, depth + 1)); }
                if (!node.alignment && (node.text || node.stack)) node.alignment = 'right';
            };

            const addSection = (contentArray) => {
                if (contentArray && Array.isArray(contentArray)) {
                    if (isArabic) contentArray.forEach(item => applyArabicRTL(item, 0));
                    docDefinition.content.push(...contentArray);
                }
            };

            // TITLE PAGE
            addSection([
                { text: projectName, style: 'title' },
                { text: `${translations['pdf-blueprint'] || 'Architecture Blueprint'} — ${dateStr}`, style: 'subtitle' },
                { text: translations['pdf-problem-stmt'] || 'Problem Statement:', style: 'subsectionHeader' },
                { text: state.problemText || translations['pdf-no-problem'] || "No problem statement provided.", style: 'bodyText', italics: true },
                { text: '', pageBreak: 'after' }
            ]);

            // 1. PROBLEM ANALYSIS (Phases 1 & 1b)
            if (results.analysis || results.useCaseScope) {
                const analysisBlocks = [];
                if (results.analysis?.domain) analysisBlocks.push({ text: translations['pdf-industry'] || 'Industry Domain:', style: 'subsectionHeader' }, { text: results.analysis.domain, style: 'bodyText' });
                if (results.analysis?.summary) analysisBlocks.push({ text: translations['pdf-summary'] || 'System Summary:', style: 'subsectionHeader' }, { text: results.analysis.summary, style: 'bodyText' });
                if (results.analysis?.coreProblem) analysisBlocks.push({ text: translations['label-core-problem'] || 'Core Problem:', style: 'subsectionHeader' }, { text: results.analysis.coreProblem, style: 'bodyText' });

                if (results.analysis?.dealSize) {
                    analysisBlocks.push({ text: 'Deal Snapshot:', style: 'subsectionHeader' });
                    analysisBlocks.push({
                        ul: [
                            { text: `Deal Size: ${results.analysis.dealSize}` },
                            { text: `Urgency: ${results.analysis.urgency?.level || 'Unknown'} - ${results.analysis.urgency?.justification || ''}` }
                        ], style: 'list'
                    });
                }

                if (results.useCaseScope) {
                    analysisBlocks.push({ text: 'Use Case Scope & Investment:', style: 'subsectionHeader' });
                    analysisBlocks.push({
                        ul: [
                            ...(results.useCaseScope.investmentEstimate ? [{ text: `Investment: ${results.useCaseScope.investmentEstimate}` }] : []),
                            ...(results.useCaseScope.timeToValue ? [{ text: `Time to Value: ${results.useCaseScope.timeToValue}` }] : [])
                        ], style: 'list'
                    });
                }

                if (results.analysis?.painPoints?.length) {
                    analysisBlocks.push({ text: 'Pain Points:', style: 'subsectionHeader' });
                    analysisBlocks.push({ ul: results.analysis.painPoints.map(p => ({ text: `${p.pain} [${p.severity}]: ${p.impact}` })), style: 'list' });
                }

                if (results.analysis?.actors?.length) {
                    analysisBlocks.push({ text: translations['pdf-actors'] || 'Primary Actors:', style: 'subsectionHeader' }, { ul: results.analysis.actors.map(a => ({ text: a })), style: 'list' });
                }

                if (results.analysis?.events?.length) {
                    analysisBlocks.push({ text: translations['pdf-principal-events'] || 'Principal Events:', style: 'subsectionHeader' }, { ul: results.analysis.events.map(e => ({ text: e })), style: 'list' });
                }

                if (results.analysis?.aiTasks?.length) {
                    analysisBlocks.push({ text: translations['pdf-ai-tasks'] || 'AI / ML Tasks:', style: 'subsectionHeader' }, { ul: results.analysis.aiTasks.map(t => ({ text: `${t.task} (${t.type}) — Models: ${(t.models || []).join(', ')}` })), style: 'list' });
                }

                if (analysisBlocks.length > 0) addSection([{ text: '1. Problem Analysis & Discovery', style: 'sectionHeader' }, ...analysisBlocks]);
            }

            // 2. BUSINESS VALUE & COMPETITIVE (Phases 11 & 10)
            if (results.businessValue || results.competitive) {
                const bzBlocks = [];
                if (results.businessValue?.summary) bzBlocks.push({ text: results.businessValue.summary, style: 'bodyText', italics: true });

                if (results.businessValue?.roiProjection) {
                    bzBlocks.push({ text: 'ROI Projection:', style: 'subsectionHeader' });
                    const r = results.businessValue.roiProjection;
                    bzBlocks.push({ ul: [`Investment: ${r.investmentRange || ''}`, `Expected Return: ${r.expectedReturn || ''}`, `Payback Period: ${r.paybackPeriod || ''}`, `ROI: ${r.roiPercentage || ''}`], style: 'list' });
                }

                if (results.businessValue?.costOfInaction) {
                    bzBlocks.push({ text: 'Cost of Inaction:', style: 'subsectionHeader' });
                    bzBlocks.push({ text: results.businessValue.costOfInaction, style: 'bodyText' });
                }

                if (results.competitive?.competitors?.length) {
                    bzBlocks.push({ text: 'Competitive Comparison:', style: 'subsectionHeader' });
                    const compBody = [[{ text: 'Competitor / Approach', style: 'tableHeader' }, { text: 'Strengths', style: 'tableHeader' }, { text: 'Weaknesses / Gaps', style: 'tableHeader' }]];
                    results.competitive.competitors.forEach(c => compBody.push([{ text: c.name || "", bold: true }, { text: (c.strengths || []).join(', ') }, { text: (c.weaknesses || []).join(', ') }]));
                    bzBlocks.push({ table: { headerRows: 1, widths: ['30%', '35%', '35%'], body: compBody }, layout: 'lightHorizontalLines', margin: [0, 5, 0, 15] });
                }

                if (results.competitive?.winStrategy?.length) {
                    bzBlocks.push({ text: 'Win Strategy:', style: 'subsectionHeader' });
                    bzBlocks.push({ ul: results.competitive.winStrategy.map(w => ({ text: w })), style: 'list' });
                }

                if (bzBlocks.length > 0) addSection([{ text: '2. Business Value & Competitive Strategy', style: 'sectionHeader', pageBreak: 'before' }, ...bzBlocks]);
            }

            // 3. DOMAIN MODEL (Agent 2)
            if (results.domainModel) {
                const dmBlocks = [];
                if (results.domainModel.domain) dmBlocks.push({ text: results.domainModel.domain, style: 'bodyText', margin: [0, 0, 0, 15] });

                if (results.domainModel.boundedContexts?.length) {
                    dmBlocks.push({ text: 'Bounded Contexts:', style: 'subsectionHeader' });
                    dmBlocks.push({ ul: results.domainModel.boundedContexts.map(b => ({ text: `${b.name}: ${b.description}` })), style: 'list' });
                }

                if (results.domainModel.entities?.length) {
                    const entityBody = [[{ text: 'Entity / Type Name', style: 'tableHeader' }, { text: 'Classification', style: 'tableHeader' }, { text: 'Properties', style: 'tableHeader' }]];
                    results.domainModel.entities.forEach(e => entityBody.push([{ text: e.name || "", bold: true }, { text: `${e.type || ''} [${e.stateManagement || 'Stateful'}]` }, { text: (e.properties || []).join(', ') }]));
                    dmBlocks.push({ text: 'Vantiq Types (Entities)', style: 'subsectionHeader' }, { table: { headerRows: 1, widths: ['30%', '20%', '50%'], body: entityBody }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 15] });
                }

                if (results.domainModel.eventFlowSummary) {
                    dmBlocks.push({ text: 'Event Flow Summary:', style: 'subsectionHeader' }, { text: results.domainModel.eventFlowSummary, style: 'bodyText' });
                }

                if (dmBlocks.length > 0) addSection([{ text: '3. Domain Model', style: 'sectionHeader', pageBreak: 'before' }, ...dmBlocks]);
            }

            // 4. SYSTEM ARCHITECTURE & LINTER (Agent 3 & 11)
            if (results.architecture) {
                const archBlocks = [];
                if (results.architecture.description) archBlocks.push({ text: results.architecture.description, style: 'bodyText' });

                archBlocks.push({ text: 'Architecture Blueprint Insights:', style: 'subsectionHeader' });
                archBlocks.push({
                    ul: [
                        ...(results.architecture.scalabilityNotes ? [{ text: `Scalability: ${results.architecture.scalabilityNotes}` }] : []),
                        ...(results.architecture.securityConsiderations ? [{ text: `Security: ${results.architecture.securityConsiderations}` }] : []),
                        ...(results.architecture.deploymentTopology ? [{ text: `Topology: ${results.architecture.deploymentTopology}` }] : []),
                        ...(results.architecture.latencyBudget ? [{ text: `Latency Budget: ${results.architecture.latencyBudget}` }] : [])
                    ], style: 'list'
                });

                if (results.architecture.components?.length) {
                    const compBody = [[{ text: 'Component', style: 'tableHeader' }, { text: 'Description', style: 'tableHeader' }, { text: 'Technologies', style: 'tableHeader' }]];
                    results.architecture.components.forEach(c => compBody.push([{ text: c.name || "", bold: true }, { text: c.description || "" }, { text: (c.tech || []).join(', ') }]));
                    archBlocks.push({ text: 'Architecture Components', style: 'subsectionHeader' }, { table: { headerRows: 1, widths: ['25%', '50%', '25%'], body: compBody }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 15] });
                }

                if (results.linter?.findings?.length) {
                    archBlocks.push({ text: `Architecture Review Findings (Score: ${results.linter.overallGrade || 'N/A'}):`, style: 'subsectionHeader' });
                    archBlocks.push({ ul: results.linter.findings.map(f => ({ text: `[${f.severity || 'INFO'}] ${f.finding}: ${f.recommendation || ""}` })), style: 'list' });
                    if (results.linter.quickWins?.length) {
                        archBlocks.push({ text: 'Quick Wins:', style: 'subsectionHeader' });
                        archBlocks.push({ ul: results.linter.quickWins.map(q => ({ text: q })), style: 'list' });
                    }
                }

                if (archBlocks.length > 0) addSection([{ text: '4. System Architecture', style: 'sectionHeader', pageBreak: 'before' }, ...archBlocks]);
            }

            // 5. EVENT SYSTEM (Agent 5)
            if (results.eventSystem) {
                const evBlocks = [];

                if (results.eventSystem.orchestrationPattern) {
                    evBlocks.push({ text: 'Orchestration Pattern:', style: 'subsectionHeader' }, { text: results.eventSystem.orchestrationPattern, style: 'bodyText' });
                }

                if (results.eventSystem.schemas?.length) {
                    const schemaBody = [[{ text: 'Event Type', style: 'tableHeader' }, { text: 'Key Fields', style: 'tableHeader' }]];
                    results.eventSystem.schemas.forEach(s => Object.keys(s).forEach(k => schemaBody.push([{ text: k, bold: true }, { text: s[k] }])));
                    if (schemaBody.length > 1) {
                        evBlocks.push({ text: 'Event Schemas', style: 'subsectionHeader' }, { table: { headerRows: 1, widths: ['40%', '60%'], body: schemaBody }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 15] });
                    }
                }

                if (results.eventSystem.producers?.length) {
                    const prodBody = [[{ text: 'Producer', style: 'tableHeader' }, { text: 'Events Emitted', style: 'tableHeader' }, { text: 'Frequency / Protocol', style: 'tableHeader' }]];
                    results.eventSystem.producers.forEach(p => prodBody.push([{ text: p.name || "", bold: true }, { text: (p.events || []).join(', ') }, { text: `${p.frequency || ''} / ${p.protocol || ''}` }]));
                    evBlocks.push({ text: 'Producers', style: 'subsectionHeader' }, { table: { headerRows: 1, widths: ['30%', '40%', '30%'], body: prodBody }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 15] });
                }

                if (results.eventSystem.dataRetention?.length) {
                    const retBody = [[{ text: 'Event Type', style: 'tableHeader' }, { text: 'Retention Limit', style: 'tableHeader' }, { text: 'Rationale', style: 'tableHeader' }]];
                    results.eventSystem.dataRetention.forEach(r => {
                        const evtTitle = r.eventType || r.type || r.event || r.name || "Unknown";
                        retBody.push([{ text: evtTitle, bold: true }, { text: r.limit || r.retentionLimit || r.retention || '' }, { text: r.rationale || r.description || r.reason || '' }]);
                    });
                    evBlocks.push({ text: 'Data Retention Policy', style: 'subsectionHeader' }, { table: { headerRows: 1, widths: ['30%', '25%', '45%'], body: retBody }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 15] });
                }

                if (evBlocks.length > 0) addSection([{ text: '5. Event System & Orchestration', style: 'sectionHeader', pageBreak: 'before' }, ...evBlocks]);
            }

            // 6. AI MODELS & AGENTIC (Agents 4 & 4b)
            if (results.aiModels || results.agenticGuide) {
                const aiBlocks = [];

                if (results.aiModels?.models?.length) {
                    aiBlocks.push({ text: 'AI Model Recommendations:', style: 'subsectionHeader' });
                    const modelBody = [[{ text: 'Capability', style: 'tableHeader' }, { text: 'Recommended Models', style: 'tableHeader' }, { text: 'Cost / Complexity', style: 'tableHeader' }]];
                    results.aiModels.models.forEach(m => modelBody.push([{ text: m.capability || "", bold: true }, { text: (m.recommendations || []).join(', ') }, { text: `${results.aiModels.totalEstimatedCost || ''} | ${results.aiModels.rampUpComplexity || ''}` }]));
                    aiBlocks.push({ table: { headerRows: 1, widths: ['25%', '40%', '35%'], body: modelBody }, layout: 'lightHorizontalLines', margin: [0, 10, 0, 15] });
                }

                if (results.agenticGuide?.agents?.length) {
                    aiBlocks.push({ text: 'Agentic Alternative:', style: 'subsectionHeader' });
                    results.agenticGuide.agents.forEach(a => {
                        aiBlocks.push({ text: a.agentName || "AI Agent", style: 'bodyText', bold: true });
                        aiBlocks.push({ text: `Role: ${a.role || ""} - ${a.description || ""}`, style: 'bodyText', margin: [0, 0, 0, 4] });
                        if (a.tools?.length) aiBlocks.push({ ul: a.tools, style: 'list', margin: [15, 0, 0, 10] });
                    });
                    if (results.agenticGuide.humanInTheLoop) {
                        aiBlocks.push({ text: `Human-in-the-Loop: ${results.agenticGuide.humanInTheLoop}`, style: 'bodyText', italics: true });
                    }
                }

                if (aiBlocks.length > 0) addSection([{ text: '6. AI Models & Agentic Overlay', style: 'sectionHeader', pageBreak: 'before' }, ...aiBlocks]);
            }

            // 7. IMPLEMENTATION ROADMAP (Agent 6)
            if (results.implementation) {
                const impBlocks = [];

                if (results.implementation.projectStructure) {
                    impBlocks.push({ text: 'Project Structure:', style: 'subsectionHeader' }, { text: results.implementation.projectStructure, style: 'bodyText', margin: [0, 0, 0, 15] });
                }

                if (results.implementation.services?.length) {
                    results.implementation.services.forEach(s => {
                        impBlocks.push({ text: `Service: ${s.serviceName}`, style: 'subsectionHeader' });
                        impBlocks.push({ ul: [`Effort: ${s.estimatedEffort || 'Unknown'}`, `Testing: ${s.testingStrategy || 'Unknown'}`, `Dependencies: ${(s.dependencies || s.prerequisites || []).join(', ')}`], style: 'list' });
                        if (s.pseudoSteps?.length) {
                            impBlocks.push({ text: 'Implementation Steps:', style: 'bodyText', bold: true, margin: [0, 0, 0, 5] });
                            impBlocks.push({ ul: s.pseudoSteps.map(step => ({ text: step })), style: 'list' });
                        }
                    });
                }

                const dNotes = results.implementation.deploymentNotes;
                if (dNotes) {
                    impBlocks.push({ text: 'Deployment Notes:', style: 'subsectionHeader' });
                    if (typeof dNotes === 'string') {
                        impBlocks.push({ text: dNotes, style: 'bodyText' });
                    } else if (typeof dNotes === 'object') {
                        const ulItems = [];
                        if (dNotes.edgeConfig) ulItems.push({ text: `Edge Config: ${dNotes.edgeConfig}` });
                        if (dNotes.cloudConfig || dNotes.namespaceSetup) ulItems.push({ text: `Cloud/Namespace: ${dNotes.cloudConfig || dNotes.namespaceSetup}` });
                        if (dNotes.packaging) ulItems.push({ text: `Packaging: ${dNotes.packaging}` });
                        if (ulItems.length > 0) impBlocks.push({ ul: ulItems, style: 'list' });
                    }
                }

                if (impBlocks.length > 0) addSection([{ text: '7. Implementation Scaffolding', style: 'sectionHeader', pageBreak: 'before' }, ...impBlocks]);
            }

            // 8. EXPANSION (Agents 12, 13, 14)
            if (results.adjacentUseCases || results.roadmap || results.platformValue) {
                const expBlocks = [];

                if (results.roadmap?.timeline?.length) {
                    expBlocks.push({ text: 'Product Roadmap:', style: 'subsectionHeader' });
                    results.roadmap.timeline.forEach(quarter => {
                        expBlocks.push({ text: quarter.quarter || 'Quarter', style: 'bodyText', bold: true });
                        const ulItems = [];
                        if (quarter.focus) ulItems.push({ text: `Focus: ${quarter.focus}` });
                        if (quarter.successCriteria) ulItems.push({ text: `Success Criteria: ${quarter.successCriteria}` });
                        if (quarter.deliverables?.length) ulItems.push({ text: `Deliverables: ${quarter.deliverables.join(', ')}` });
                        expBlocks.push({ ul: ulItems, style: 'list', margin: [15, 0, 0, 10] });
                    });
                }

                if (results.platformValue?.horizons) {
                    expBlocks.push({ text: 'Platform Value Growth:', style: 'subsectionHeader' });
                    const valBody = [[{ text: 'Horizon', style: 'tableHeader' }, { text: 'Key Value Driver', style: 'tableHeader' }, { text: 'ROI & Maturity', style: 'tableHeader' }]];
                    ['month6', 'month12', 'month24'].forEach(key => {
                        const h = results.platformValue.horizons[key];
                        if (h) {
                            valBody.push([{ text: key === 'month6' ? '6 Months' : key === 'month12' ? '12 Months' : '24 Months', bold: true }, { text: h.keyValueDriver || '' }, { text: `${h.cumulativeROI || 'ROI'}\n${h.platformMaturityLevel || 'Maturity'}` }]);
                        }
                    });
                    if (valBody.length > 1) expBlocks.push({ table: { headerRows: 1, widths: ['20%', '50%', '30%'], body: valBody }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 15] });
                }

                if (results.adjacentUseCases?.cases?.length) {
                    expBlocks.push({ text: 'Adjacent Use Cases:', style: 'subsectionHeader' });
                    results.adjacentUseCases.cases.forEach(c => {
                        expBlocks.push({ text: `${c.name || 'Use Case'} [${c.timeframe || 'TBD'}]`, style: 'bodyText', bold: true });
                        expBlocks.push({ text: c.description || '', style: 'bodyText', margin: [15, 5, 0, 5] });
                        if (c.reusedComponents?.length) expBlocks.push({ text: `Reused Components: ${c.reusedComponents.join(', ')}`, style: 'bodyText', italics: true, margin: [15, 0, 0, 10] });
                    });
                }

                if (expBlocks.length > 0) addSection([{ text: '8. Future Expansion & Roadmap', style: 'sectionHeader', pageBreak: 'before' }, ...expBlocks]);
            }

            const pdfName = projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_architecture.pdf';
            pdfMake.createPdf(docDefinition).download(pdfName);
        } catch (error) {
            console.error("PDF Generation Error:", error);
            const errorMsg = translations['pdf-error'] || "Failed to generate PDF. Please check the console for details.";
            alert(errorMsg);
        }
    }
};

// ============================================
// Vantiq Spark — Programmatic PDF Generator
// ============================================

window.PDFGenerator = {
    generate: function (state) {
        if (!state || !state.results || !state.results.analysis) {
            console.error("No valid state to generate PDF");
            return;
        }

        const results = state.results;
        const projectName = results.domainModel?.projectName || "Vantiq AI Project";
        const dateStr = new Date().toLocaleDateString();

        // 1. Initialize Document Definition
        const docDefinition = {
            info: {
                title: projectName,
                author: 'Vantiq Spark AI Solution Studio',
                subject: 'Architecture Blueprint',
            },
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [40, 60, 40, 60],
            defaultStyle: {
                font: 'Roboto',
                fontSize: 10,
                color: '#333333',
                lineHeight: 1.3
            },
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

        // Helper to add sections safely
        const addSection = (contentArray) => {
            if (contentArray && Array.isArray(contentArray)) {
                docDefinition.content.push(...contentArray);
            }
        };

        // ==========================================
        // TITLE PAGE
        // ==========================================
        addSection([
            { text: projectName, style: 'title' },
            { text: `Vantiq Spark Architecture Blueprint — ${dateStr}`, style: 'subtitle' },
            { text: 'Problem Statement:', style: 'subsectionHeader' },
            { text: state.problemText || "No problem statement provided.", style: 'bodyText', italics: true },
            { text: '', pageBreak: 'after' } // Force page break after title
        ]);

        // ==========================================
        // AGENT 1: PROBLEM ANALYSIS
        // ==========================================
        if (results.analysis) {
            const analysisBlocks = [];

            if (results.analysis.domain) {
                analysisBlocks.push({ text: 'Industry Domain:', style: 'subsectionHeader' });
                analysisBlocks.push({ text: results.analysis.domain, style: 'bodyText' });
            }

            if (results.analysis.summary) {
                analysisBlocks.push({ text: 'System Summary:', style: 'subsectionHeader' });
                analysisBlocks.push({ text: results.analysis.summary, style: 'bodyText' });
            }

            if (results.analysis.coreProblem) {
                analysisBlocks.push({ text: 'Core Problem:', style: 'subsectionHeader' });
                analysisBlocks.push({ text: results.analysis.coreProblem, style: 'bodyText' });
            }

            if (results.analysis.actors && results.analysis.actors.length > 0) {
                analysisBlocks.push({ text: 'Primary Actors:', style: 'subsectionHeader' });
                analysisBlocks.push({ ul: results.analysis.actors.filter(a => a).map(a => ({ text: a, style: 'bodyText' })), style: 'list' });
            }

            if (results.analysis.entities && results.analysis.entities.length > 0) {
                analysisBlocks.push({ text: 'Core Entities:', style: 'subsectionHeader' });
                analysisBlocks.push({ ul: results.analysis.entities.filter(e => e).map(e => ({ text: e, style: 'bodyText' })), style: 'list' });
            }

            if (results.analysis.dataSources && results.analysis.dataSources.length > 0) {
                analysisBlocks.push({ text: 'Key Data Sources:', style: 'subsectionHeader' });
                analysisBlocks.push({ ul: results.analysis.dataSources.filter(d => d).map(d => ({ text: d, style: 'bodyText' })), style: 'list' });
            }

            if (results.analysis.events && results.analysis.events.length > 0) {
                analysisBlocks.push({ text: 'Principal Events:', style: 'subsectionHeader' });
                analysisBlocks.push({ ul: results.analysis.events.filter(e => e).map(e => ({ text: e, style: 'bodyText' })), style: 'list' });
            }

            if (results.analysis.aiTasks && results.analysis.aiTasks.length > 0) {
                analysisBlocks.push({ text: 'AI / ML Tasks:', style: 'subsectionHeader' });
                const aiTasksList = results.analysis.aiTasks.map(t => {
                    return { text: `${t.task} (${t.type}) — Models: ${t.models.join(', ')}`, style: 'bodyText' };
                });
                analysisBlocks.push({ ul: aiTasksList, style: 'list' });
            }

            if (results.analysis.vantiqSuitability) {
                analysisBlocks.push({ text: 'Vantiq Suitability:', style: 'subsectionHeader' });
                analysisBlocks.push({ text: results.analysis.vantiqSuitability, style: 'bodyText' });
            }

            if (analysisBlocks.length > 0) {
                addSection([
                    { text: '1. Problem Analysis & Scope', style: 'sectionHeader' },
                    ...analysisBlocks
                ]);
            }
        }

        // ==========================================
        // AGENT 2: DOMAIN MODEL
        // ==========================================
        if (results.domainModel) {
            const domainBlocks = [];

            if (results.domainModel.domain) {
                domainBlocks.push({ text: results.domainModel.domain, style: 'bodyText', margin: [0, 0, 0, 15] });
            }

            // Entities Table
            if (results.domainModel.entities && results.domainModel.entities.length > 0) {
                const entityBody = [
                    [
                        { text: 'Entity / Type Name', style: 'tableHeader' },
                        { text: 'Type classification', style: 'tableHeader' },
                        { text: 'Properties', style: 'tableHeader' }
                    ]
                ];
                results.domainModel.entities.forEach(e => {
                    entityBody.push([
                        { text: e.name || "", style: 'tableCell', bold: true },
                        { text: e.type || "", style: 'tableCell' },
                        { text: (e.properties || []).join(', '), style: 'tableCell' }
                    ]);
                });

                domainBlocks.push({ text: 'Vantiq Types (Entities)', style: 'subsectionHeader' });
                domainBlocks.push({
                    table: {
                        headerRows: 1,
                        widths: ['30%', '20%', '50%'],
                        body: entityBody
                    },
                    layout: 'lightHorizontalLines',
                    margin: [0, 0, 0, 15]
                });
            }

            // Events Table
            if (results.domainModel.events && results.domainModel.events.length > 0) {
                const eventBody = [
                    [
                        { text: 'Event Name', style: 'tableHeader' },
                        { text: 'Event Type', style: 'tableHeader' },
                        { text: 'Payload Structure', style: 'tableHeader' }
                    ]
                ];
                results.domainModel.events.forEach(e => {
                    eventBody.push([
                        { text: e.name || "", style: 'tableCell', bold: true },
                        { text: e.type || "", style: 'tableCell' },
                        { text: (e.payload || []).join(', '), style: 'tableCell' }
                    ]);
                });

                domainBlocks.push({ text: 'Event Streams', style: 'subsectionHeader' });
                domainBlocks.push({
                    table: {
                        headerRows: 1,
                        widths: ['30%', '20%', '50%'],
                        body: eventBody
                    },
                    layout: 'lightHorizontalLines',
                    margin: [0, 0, 0, 15]
                });
            }

            // Services Table
            if (results.domainModel.services && results.domainModel.services.length > 0) {
                const serviceBody = [
                    [
                        { text: 'Service Name', style: 'tableHeader' },
                        { text: 'Responsibility', style: 'tableHeader' }
                    ]
                ];
                results.domainModel.services.forEach(s => {
                    serviceBody.push([
                        { text: s.name || "", style: 'tableCell', bold: true },
                        { text: s.responsibility || "", style: 'tableCell' }
                    ]);
                });

                domainBlocks.push({ text: 'Microservices', style: 'subsectionHeader' });
                domainBlocks.push({
                    table: {
                        headerRows: 1,
                        widths: ['35%', '65%'],
                        body: serviceBody
                    },
                    layout: 'lightHorizontalLines',
                    margin: [0, 0, 0, 10]
                });
            }

            if (domainBlocks.length > 0) {
                addSection([{ text: '2. Domain Model', style: 'sectionHeader', pageBreak: 'before' }, ...domainBlocks]);
            }
        }

        // ==========================================
        // AGENT 3: SYSTEM ARCHITECTURE
        // ==========================================
        if (results.architecture) {
            const archBlocks = [];

            if (results.architecture.description) {
                archBlocks.push({ text: results.architecture.description, style: 'bodyText' });
            }

            // Components
            if (results.architecture.components && results.architecture.components.length > 0) {
                const compBody = [
                    [
                        { text: 'Component', style: 'tableHeader' },
                        { text: 'Description', style: 'tableHeader' },
                        { text: 'Technologies', style: 'tableHeader' }
                    ]
                ];
                results.architecture.components.forEach(c => {
                    compBody.push([
                        { text: c.name || "", style: 'tableCell', bold: true },
                        { text: c.description || "", style: 'tableCell' },
                        { text: (c.tech || []).join(', '), style: 'tableCell' }
                    ]);
                });

                archBlocks.push({ text: 'Architecture Components', style: 'subsectionHeader' });
                archBlocks.push({
                    table: {
                        headerRows: 1,
                        widths: ['25%', '50%', '25%'],
                        body: compBody
                    },
                    layout: 'lightHorizontalLines',
                    margin: [0, 0, 0, 15]
                });
            }

            // Integrations
            if (results.architecture.integrations && results.architecture.integrations.length > 0) {
                archBlocks.push({ text: 'Integration Flows', style: 'subsectionHeader' });
                const ol = results.architecture.integrations.map(i => {
                    return { text: `[${i.protocol || 'API'}] ${i.from || "?"} → ${i.to || "?"}: ${i.description || ""}`, style: 'bodyText' };
                });
                archBlocks.push({ ul: ol, style: 'list' });
            }

            // Principles
            if (results.architecture.principles && results.architecture.principles.length > 0) {
                archBlocks.push({ text: 'Architecture Principles', style: 'subsectionHeader' });
                archBlocks.push({ ul: results.architecture.principles.map(p => ({ text: p, style: 'bodyText' })), style: 'list' });
            }

            if (archBlocks.length > 0) {
                // Add Linter / Architecture Review if available
                if (results.linter && results.linter.findings && results.linter.findings.length > 0) {
                    archBlocks.push({ text: 'Architecture Review Findings:', style: 'subsectionHeader' });
                    const findings = results.linter.findings.map(f => {
                        return { text: `[${f.severity || 'INFO'}] ${f.finding}: ${f.recommendation || ""}`, style: 'bodyText' };
                    });
                    archBlocks.push({ ul: findings, style: 'list' });
                }

                addSection([{ text: '3. System Architecture', style: 'sectionHeader', pageBreak: 'before' }, ...archBlocks]);
            }
        }

        // ==========================================
        // AGENT 4: AI MODEL SELECTION
        // ==========================================
        if (results.aiModels && results.aiModels.models && results.aiModels.models.length > 0) {
            addSection([{ text: '4. AI Model Recommendations', style: 'sectionHeader', pageBreak: 'before' }]);

            const modelBody = [
                [
                    { text: 'Capability', style: 'tableHeader' },
                    { text: 'Recommended Models', style: 'tableHeader' },
                    { text: 'Justification', style: 'tableHeader' }
                ]
            ];

            results.aiModels.models.forEach(m => {
                modelBody.push([
                    { text: m.capability || "", style: 'tableCell', bold: true },
                    { text: (m.recommendations || []).join(', '), style: 'tableCell' },
                    { text: m.justification || "", style: 'tableCell' }
                ]);
            });

            addSection([
                {
                    table: {
                        headerRows: 1,
                        widths: ['25%', '30%', '45%'],
                        body: modelBody
                    },
                    layout: 'lightHorizontalLines',
                    margin: [0, 10, 0, 15]
                }
            ]);

            if (results.aiModels.infrastructure) {
                addSection([{ text: 'Infrastructure & Guardrails:', style: 'subsectionHeader' }]);
                addSection([{ text: results.aiModels.infrastructure, style: 'bodyText' }]);
            }
        }

        // ==========================================
        // AGENT 5: EVENT SYSTEM FLOWS
        // ==========================================
        if (results.eventSystem && results.eventSystem.flows && results.eventSystem.flows.length > 0) {
            addSection([{ text: '5. Event System & Orchestration', style: 'sectionHeader', pageBreak: 'before' }]);

            results.eventSystem.flows.forEach(f => {
                addSection([
                    { text: f.flowName || "Event Flow", style: 'subsectionHeader' },
                    { text: f.description || "", style: 'bodyText' }
                ]);

                if (f.steps && f.steps.length > 0) {
                    const stepList = f.steps.map(s => {
                        return { text: `[${s.component || 'App'}] ${s.action || ""}`, style: 'bodyText' };
                    });
                    addSection([{ ol: stepList, style: 'list' }]);
                }
            });
        }

        // ==========================================
        // AGENT 4b: AGENTIC AI GUIDE
        // ==========================================
        if (results.agenticGuide && results.agenticGuide.agents && results.agenticGuide.agents.length > 0) {
            addSection([{ text: '6. Agentic AI Orchestration', style: 'sectionHeader', pageBreak: 'before' }]);

            results.agenticGuide.agents.forEach(a => {
                addSection([
                    { text: a.agentName || "AI Agent", style: 'subsectionHeader' },
                    { text: `Role: ${a.role || ""}`, style: 'bodyText', bold: true },
                    { text: a.description || "", style: 'bodyText' }
                ]);

                if (a.tools && a.tools.length > 0) {
                    addSection([{ text: 'Tools & Capabilities:', style: 'bodyText', bold: true, margin: [0, 5, 0, 2] }]);
                    addSection([{ ul: a.tools, style: 'list' }]);
                }
            });
        }

        // ==========================================
        // AGENT 10: COMPETITIVE ANALYSIS
        // ==========================================
        if (results.competitive) {
            addSection([{ text: '7. Competitive Strategy', style: 'sectionHeader', pageBreak: 'before' }]);

            if (results.competitive.marketLandscape) {
                addSection([{ text: 'Market Landscape:', style: 'subsectionHeader' }]);
                addSection([{ text: results.competitive.marketLandscape, style: 'bodyText' }]);
            }

            if (results.competitive.competitors && results.competitive.competitors.length > 0) {
                const compBody = [
                    [
                        { text: 'Competitor / Approach', style: 'tableHeader' },
                        { text: 'Strengths', style: 'tableHeader' },
                        { text: 'Weaknesses / Gaps', style: 'tableHeader' }
                    ]
                ];
                results.competitive.competitors.forEach(c => {
                    compBody.push([
                        { text: c.name || "", style: 'tableCell', bold: true },
                        { text: (c.strengths || []).join(', '), style: 'tableCell' },
                        { text: (c.weaknesses || []).join(', '), style: 'tableCell' }
                    ]);
                });

                addSection([
                    { text: 'Competitive Comparison:', style: 'subsectionHeader' },
                    {
                        table: {
                            headerRows: 1,
                            widths: ['30%', '35%', '35%'],
                            body: compBody
                        },
                        layout: 'lightHorizontalLines',
                        margin: [0, 5, 0, 15]
                    }
                ]);
            }

            if (results.competitive.differentiation && results.competitive.differentiation.length > 0) {
                addSection([{ text: 'Vantiq Spark Differentiators:', style: 'subsectionHeader' }]);
                addSection([{ ul: results.competitive.differentiation.map(d => ({ text: d, style: 'bodyText' })), style: 'list' }]);
            }
        }

        // ==========================================
        // FINAL SECTION: IMPLEMENTATION PLAN
        // ==========================================
        if (results.implementation && results.implementation.phases && results.implementation.phases.length > 0) {
            addSection([{ text: '8. Implementation Roadmap', style: 'sectionHeader', pageBreak: 'before' }]);

            results.implementation.phases.forEach((p, idx) => {
                const phaseBlocks = [];
                if (p.phase) phaseBlocks.push({ text: `Phase ${idx + 1}: ${p.phase}`, style: 'subsectionHeader' });
                if (p.description) phaseBlocks.push({ text: p.description, style: 'bodyText' });

                if (p.tasks && p.tasks.length > 0) {
                    const tasks = p.tasks.filter(t => t && t.task).map(t => {
                        let tText = `[${t.role || 'Any'}] ${t.task}`;
                        if (t.vantiqTool) tText += ` (Requires: ${t.vantiqTool})`;
                        return { text: tText, style: 'bodyText' };
                    });
                    if (tasks.length > 0) phaseBlocks.push({ ul: tasks, style: 'list' });
                }

                if (phaseBlocks.length > 0) addSection(phaseBlocks);
            });
        }

        // 2. Generate and Download PDF
        const pdfName = projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_architecture.pdf';
        pdfMake.createPdf(docDefinition).download(pdfName);
    }
};

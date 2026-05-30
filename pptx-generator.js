window.PPTXGenerator = {
    generate: async function (state) {
        if (!state || !state.results || Object.keys(state.results).length === 0) {
            return;
        }

        const pptx = new PptxGenJS();
        const results = state.results;
        
        pptx.layout = 'LAYOUT_16x9';
        
        // Define master slide / branding
        pptx.defineSlideMaster({
            title: 'MASTER_SLIDE',
            background: { color: 'FFFFFF' },
            objects: [
                { rect: { x: 0, y: 0, w: '100%', h: 0.7, fill: { color: '1A1A2E' } } },
                { text: { text: 'Vantiq AI Solution Blueprint', options: { x: 0.5, y: 0.15, w: 5, h: 0.4, color: 'FFFFFF', fontSize: 16, fontFace: 'Arial', bold: true } } }
            ]
        });

        // 1. Title Slide
        const titleSlide = pptx.addSlide();
        titleSlide.addText(results.domainModel?.projectName || 'Vantiq Architecture Blueprint', {
            x: 1, y: 2.5, w: '80%', h: 1, fontSize: 36, bold: true, color: '1A1A2E', align: 'center'
        });
        titleSlide.addText(state.problemText || '', {
            x: 1, y: 3.5, w: '80%', h: 1.5, fontSize: 14, color: '555555', align: 'center'
        });

        // Helper to add a generic slide with a title and list
        const addListSlide = (title, listItems) => {
            if (!listItems || listItems.length === 0) return;
            const slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
            slide.addText(title, { x: 0.5, y: 0.8, w: '90%', h: 0.6, fontSize: 24, color: '1A1A2E', bold: true });
            slide.addText(listItems.map(t => ({ text: String(t), options: { bullet: true } })), {
                x: 0.5, y: 1.6, w: '90%', h: 3.5, fontSize: 16, color: '333333', valign: 'top'
            });
        };

        // Helper to get SVG as PNG data url natively
        const getDiagramImageDataUrl = async (containerSelector) => {
            const svgEl = document.querySelector(containerSelector + ' svg');
            if (!svgEl) return null;
            return new Promise((resolve) => {
                try {
                    const svgString = new XMLSerializer().serializeToString(svgEl);
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const DOMURL = window.URL || window.webkitURL || window;
                    const img = new Image();
                    const svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
                    const url = DOMURL.createObjectURL(svg);
                    img.onload = function() {
                        const scale = 2;
                        const w = img.width || svgEl.getBoundingClientRect().width || 500;
                        const h = img.height || svgEl.getBoundingClientRect().height || 300;
                        canvas.width = w * scale;
                        canvas.height = h * scale;
                        ctx.scale(scale, scale);
                        ctx.fillStyle = '#1a1a2e'; 
                        ctx.fillRect(0, 0, w, h);
                        ctx.drawImage(img, 0, 0, w, h);
                        const dataUrl = canvas.toDataURL("image/png");
                        DOMURL.revokeObjectURL(url);
                        resolve(dataUrl);
                    };
                    img.onerror = function() { resolve(null); };
                    img.src = url;
                } catch(e) { resolve(null); }
            });
        };

        // 2. Analysis
        if (results.analysis) {
            addListSlide('Problem Analysis', [
                `Domain: ${results.analysis.domain || ''}`,
                `Core Problem: ${results.analysis.coreProblem || ''}`,
                `Current State: ${results.analysis.currentState || ''}`,
                `Summary: ${results.analysis.summary || ''}`
            ].filter(s => !s.endsWith(': ')));
        }

        // 3. Architecture Overview
        if (results.architecture) {
            const slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
            slide.addText('Architecture Overview', { x: 0.5, y: 0.8, w: '90%', h: 0.6, fontSize: 24, color: '1A1A2E', bold: true });
            slide.addText(results.architecture.description || '', { x: 0.5, y: 1.5, w: '90%', h: 1.5, fontSize: 14, color: '333333', valign: 'top' });
            
            try {
                const dataUrl = await getDiagramImageDataUrl('#architecture-content .diagram-container');
                if (dataUrl) {
                    slide.addImage({ data: dataUrl, x: 0.5, y: 3.2, w: 9, h: 4, sizing: { type: 'contain', w: 9, h: 4 } });
                }
            } catch(e) { console.error('SVG to PPTX error', e); }
        }

        // 4. Event System
        if (results.eventSystem) {
            const slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
            slide.addText('Event System', { x: 0.5, y: 0.8, w: '90%', h: 0.6, fontSize: 24, color: '1A1A2E', bold: true });
            slide.addText(results.eventSystem.orchestrationPattern || 'Event Orchestration', { x: 0.5, y: 1.5, w: '90%', h: 0.6, fontSize: 14, color: '333333', valign: 'top' });
            
            try {
                const dataUrl = await getDiagramImageDataUrl('#events-content .diagram-container');
                if (dataUrl) {
                    slide.addImage({ data: dataUrl, x: 0.5, y: 2.3, w: 9, h: 4.8, sizing: { type: 'contain', w: 9, h: 4.8 } });
                }
            } catch(e) { console.error('SVG to PPTX error', e); }
        }

        // 5. Additional Diagrams
        if (results.diagrams && results.diagrams.diagrams) {
            const containers = document.querySelectorAll('#diagrams-content .diagram-container');
            for (let i = 0; i < containers.length; i++) {
                const container = containers[i];
                const dTitle = results.diagrams.diagrams[i]?.title || 'System Diagram';
                const slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
                slide.addText(dTitle, { x: 0.5, y: 0.8, w: '90%', h: 0.6, fontSize: 24, color: '1A1A2E', bold: true });
                try {
                    const dataUrl = await getDiagramImageDataUrl('#' + (container.id || 'diagrams-content') + ' .diagram-container');
                    if (dataUrl) {
                        slide.addImage({ data: dataUrl, x: 0.5, y: 1.6, w: 9, h: 5.5, sizing: { type: 'contain', w: 9, h: 5.5 } });
                    }
                } catch(e) { console.error('SVG to PPTX error', e); }
            }
        }

        // 6. AI Models
        if (results.aiModels && results.aiModels.recommendations) {
            addListSlide('AI Models Recommendation', 
                results.aiModels.recommendations.map(r => r.capability || 'AI Capability')
            );
        }

        // Output file
        const safeName = (results.domainModel?.projectName || 'vantiq_blueprint').replace(/[^a-zA-Z0-9_-]/g, '_');
        await pptx.writeFile({ fileName: `${safeName}.pptx` });
    }
};

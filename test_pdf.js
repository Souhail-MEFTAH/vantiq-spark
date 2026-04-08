const fs = require('fs');

global.window = {};
const content = fs.readFileSync('pdf-generator.js', 'utf8');

global.I18N = { en: {} };
eval(content);

global.pdfMake = {
    fonts: {},
    createPdf: function (docDefinition) {
        // Just mock createPdf to see if docDefinition generation succeeds
        console.log("PDF Definition successfully created!");
        console.log("Number of blocks:", docDefinition.content.length);
        return {
            download: function (name) {
                console.log("Simulating download for:", name);
            }
        };
    }
};

const fakeState = {
    language: 'en',
    problemText: 'A simple smart factory',
    results: {
        analysis: {
            domain: "Manufacturing",
            summary: "Smart factory",
            coreProblem: "Downtime"
        },
        useCaseScope: {
            investmentEstimate: "$100k",
            timeToValue: "3 months"
        },
        domainModel: {
            projectName: "Factory AI"
        },
        architecture: {
            description: "Microservices",
            components: [{ name: "IoT Broker", description: "Collects data", tech: ["MQTT"] }]
        },
        linter: {
            warnings: [{ severity: "High", issue: "No encryption", recommendation: "Add TLS" }],
            overallScore: "B"
        },
        eventSystem: {
            producers: [{ name: "Sensors", events: ["Temp", "Vibration"], protocol: "MQTT" }]
        },
        aiModels: {
            recommendations: [{ capability: "Anomaly Detection", models: ["Random Forest"], complexity: "Medium" }]
        },
        agenticGuide: {
            llmAgents: [{ agentName: "Analyzer", role: "Detects errors" }]
        },
        implementation: {
            services: [{ serviceName: "Data Ingest", estimatedEffort: "Low" }]
        },
        adjacentUseCases: {
            cases: [{ name: "Predictive Maintenance" }]
        },
        roadmap: {
            timeline: [{ quarter: "Q1", focus: "IoT" }]
        },
        platformValueGrowth: {
            horizons: {
                month6: { keyValueDriver: "Visibility" }
            }
        }
    }
};

try {
    window.PDFGenerator.generate(fakeState);
} catch (err) {
    console.error("CRASH ERROR:", err);
}

const fs = require('fs');
const appJsCode = fs.readFileSync('c:/Users/SouhailMeftah/OneDrive - Vantiq, Inc/Documents/Vantiq AI Solution Studio/app.js', 'utf8');

const startIdx = appJsCode.indexOf('function preprocessMermaid');
const endIdx = appJsCode.indexOf('function simplifyMermaid');
const preprocessMermaidStr = appJsCode.substring(startIdx, endIdx);

const sanitizeIdx = appJsCode.indexOf('function sanitizeMermaidLabel');
const sanitizeEndIdx = appJsCode.indexOf('async function renderMermaidDiagrams');
const sanitizeStr = appJsCode.substring(sanitizeIdx, sanitizeEndIdx);

eval(sanitizeStr);
eval(preprocessMermaidStr);

const testFlowchart = `graph TD
    A["Agent"] --> B["Logic"]
    classDef ai fill:#2d1b4e,stroke:#7c6bf5;
    class A ai;
`;

console.log("Preprocessed Flowchart:");
console.log(preprocessMermaid(testFlowchart));

const svgGraph = `<g class="node default" id="flowchart-A-123"></g>`;
const hasVisibleElements = (svgGraph.match(/<g[^>]*class="[^"]*(node|actor|messageLine|entity)[^"]*"/g) || []).length;
console.log("Regex Test Graph:", hasVisibleElements);

const svgSequence = `<g class="actor" id="some-actor"></g>`;
console.log("Regex Test Sequence:", (svgSequence.match(/<g[^>]*class="[^"]*(node|actor|messageLine|entity)[^"]*"/g) || []).length);

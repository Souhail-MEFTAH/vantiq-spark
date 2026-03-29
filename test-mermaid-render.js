const mermaid = require('mermaid');
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="container"></div></body></html>');
const window = dom.window;
const document = window.document;

global.window = window;
global.document = document;

mermaid.default.initialize({ startOnLoad: false });

const testDiagrams = [
    `sequenceDiagram\nparticipant "Agent 1" as A\nA->>B: msg`,
    `sequenceDiagram\nparticipant A as "Agent 1"\nA->>B: msg`,
    `sequenceDiagram\nparticipant A as Agent 1\nA->>B: msg`,
    `sequenceDiagram\nbox "My Group"\nparticipant A\nend\nA->>B: msg`,
    `sequenceDiagram\nactor A\nA->>B: msg`,
    `sequenceDiagram\ncreate participant A\nA->>B: msg`,
    `sequenceDiagram\nparticipant My Agent as MA\nMA->>B: msg`
];

async function run() {
    for (let i = 0; i < testDiagrams.length; i++) {
        try {
            console.log("\\nTesting:", testDiagrams[i].replace(/\n/g, '\\n'));
            await mermaid.default.render('graph' + i, testDiagrams[i]);
            console.log("SUCCESS");
        } catch (e) {
            console.error("FAILED:", e.message);
        }
    }
}
run();

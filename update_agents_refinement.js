const fs = require('fs');
let code = fs.readFileSync('agents.js', 'utf8');

// 1. Update buildUserMessage
let oldMsgFn = `function buildUserMessage(problemText, upstreamContext = {}, refinement = "") {
  let msg = \`PROBLEM DESCRIPTION: \\n\${problemText} \\n\`;`;
let newMsgFn = `function buildUserMessage(problemText, upstreamContext = {}, refinement = "", previousOutput = null) {
  let msg = \`PROBLEM DESCRIPTION: \\n\${problemText} \\n\`;

  if (previousOutput) {
    msg += \`\\nYOUR PREVIOUS GENERATION FOR THIS PHASE (To be adjusted):\\n\${JSON.stringify(previousOutput)}\\n\`;
  }`;
code = code.replace(oldMsgFn, newMsgFn);

// 2. Add previousOutput parameter to all agent functions
code = code.replace(/async function agentProblemInterpreter\(problemText, refinement\)/g, "async function agentProblemInterpreter(problemText, refinement, previousOutput = null)");
code = code.replace(/buildUserMessage\(problemText, \{\}, refinement\)/g, "buildUserMessage(problemText, {}, refinement, previousOutput)");

code = code.replace(/async function agentDomainModelGenerator\(problemText, analysis, refinement\)/g, "async function agentDomainModelGenerator(problemText, analysis, refinement, previousOutput = null)");
code = code.replace(/buildUserMessage\(problemText, \{ analysis \}, refinement\)/g, "buildUserMessage(problemText, { analysis }, refinement, previousOutput)");

code = code.replace(/async function agentArchitectureGenerator\(problemText, analysis, domainModel, refinement\)/g, "async function agentArchitectureGenerator(problemText, analysis, domainModel, refinement, previousOutput = null)");
code = code.replace(/buildUserMessage\(problemText, \{ analysis, domainModel \}, refinement\)/g, "buildUserMessage(problemText, { analysis, domainModel }, refinement, previousOutput)");

code = code.replace(/async function agentAIModelAdvisor\(problemText, analysis, refinement\)/g, "async function agentAIModelAdvisor(problemText, analysis, refinement, previousOutput = null)");

code = code.replace(/async function agentAgenticGuide\(problemText, analysis, domainModel, architecture, refinement\)/g, "async function agentAgenticGuide(problemText, analysis, domainModel, architecture, refinement, previousOutput = null)");
code = code.replace(/buildUserMessage\(problemText, \{ analysis, domainModel, architecture \}, refinement\)/g, "buildUserMessage(problemText, { analysis, domainModel, architecture }, refinement, previousOutput)");

code = code.replace(/async function agentEventSystemDesigner\(problemText, analysis, domainModel, refinement\)/g, "async function agentEventSystemDesigner(problemText, analysis, domainModel, refinement, previousOutput = null)");

code = code.replace(/async function agentImplementationGenerator\(problemText, analysis, domainModel, architecture, refinement\)/g, "async function agentImplementationGenerator(problemText, analysis, domainModel, architecture, refinement, previousOutput = null)");

code = code.replace(/async function agentArchitectureVisualizer\(problemText, analysis, domainModel, architecture, refinement\)/g, "async function agentArchitectureVisualizer(problemText, analysis, domainModel, architecture, refinement, previousOutput = null)");

code = code.replace(/async function agentDemoScenarioGenerator\(problemText, analysis, domainModel, architecture, refinement\)/g, "async function agentDemoScenarioGenerator(problemText, analysis, domainModel, architecture, refinement, previousOutput = null)");

code = code.replace(/async function agentTrainingLabGenerator\(problemText, analysis, domainModel, architecture, implementation, refinement\)/g, "async function agentTrainingLabGenerator(problemText, analysis, domainModel, architecture, implementation, refinement, previousOutput = null)");
code = code.replace(/buildUserMessage\(problemText, \{ analysis, domainModel, architecture, implementation \}, refinement\)/g, "buildUserMessage(problemText, { analysis, domainModel, architecture, implementation }, refinement, previousOutput)");

code = code.replace(/async function agentCompetitiveAnalysis\(problemText, analysis, architecture, competitors, refinement\)/g, "async function agentCompetitiveAnalysis(problemText, analysis, architecture, competitors, refinement, previousOutput = null)");
code = code.replace(/let userMsg = buildUserMessage\(problemText, \{ analysis, architecture \}, refinement\);/g, "let userMsg = buildUserMessage(problemText, { analysis, architecture }, refinement, previousOutput);");

// Fix Agent 5 Mermaid Prompt
code = code.replace(
    "- IMPORTANT: Only define participants that actually send or receive messages in the sequence. Do NOT include unused participants or unconnected nodes.",
    "- IMPORTANT: Do NOT use the 'participant' keyword explicitly unless defining an alias. Let Mermaid infer the participants from the message flow (e.g. ComponentA->>ComponentB: message). Keep the sequence strictly connected without standalone nodes."
);

fs.writeFileSync('agents.js', code);
console.log('agents.js refined context added!');

let appcode = fs.readFileSync('app.js', 'utf8');
appcode = appcode.replace(/Agents\.problemInterpreter\(state\.problemText, refinement\)/g, "Agents.problemInterpreter(state.problemText, refinement, state.results.analysis)");
appcode = appcode.replace(/Agents\.domainModelGenerator\(state\.problemText, state\.results\.analysis, refinement\)/g, "Agents.domainModelGenerator(state.problemText, state.results.analysis, refinement, state.results.domainModel)");
appcode = appcode.replace(/Agents\.architectureGenerator\(state\.problemText, state\.results\.analysis, state\.results\.domainModel, refinement\)/g, "Agents.architectureGenerator(state.problemText, state.results.analysis, state.results.domainModel, refinement, state.results.architecture)");
appcode = appcode.replace(/Agents\.aiModelAdvisor\(state\.problemText, state\.results\.analysis, refinement\)/g, "Agents.aiModelAdvisor(state.problemText, state.results.analysis, refinement, state.results.aiModels)");
appcode = appcode.replace(/Agents\.agenticGuide\(state\.problemText, state\.results\.analysis, state\.results\.domainModel, state\.results\.architecture, refinement\)/g, "Agents.agenticGuide(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.agenticGuide)");
appcode = appcode.replace(/Agents\.eventSystemDesigner\(state\.problemText, state\.results\.analysis, state\.results\.domainModel, refinement\)/g, "Agents.eventSystemDesigner(state.problemText, state.results.analysis, state.results.domainModel, refinement, state.results.eventSystem)");
appcode = appcode.replace(/Agents\.implementationGenerator\(state\.problemText, state\.results\.analysis, state\.results\.domainModel, state\.results\.architecture, refinement\)/g, "Agents.implementationGenerator(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.implementation)");
appcode = appcode.replace(/Agents\.architectureVisualizer\(state\.problemText, state\.results\.analysis, state\.results\.domainModel, state\.results\.architecture, refinement\)/g, "Agents.architectureVisualizer(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.diagrams)");
appcode = appcode.replace(/Agents\.demoScenarioGenerator\(state\.problemText, state\.results\.analysis, state\.results\.domainModel, state\.results\.architecture, refinement\)/g, "Agents.demoScenarioGenerator(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.demo)");
appcode = appcode.replace(/Agents\.trainingLabGenerator\(state\.problemText, state\.results\.analysis, state\.results\.domainModel, state\.results\.architecture, state\.results\.implementation, refinement\)/g, "Agents.trainingLabGenerator(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, state.results.implementation, refinement, state.results.training)");
appcode = appcode.replace(/Agents\.competitiveAnalysis\(state\.problemText, state\.results\.analysis, state\.results\.architecture, competitorsText, refinement\)/g, "Agents.competitiveAnalysis(state.problemText, state.results.analysis, state.results.architecture, competitorsText, refinement, state.results.competitive)");

fs.writeFileSync('app.js', appcode);
console.log('app.js refined context added!');

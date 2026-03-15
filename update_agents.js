const fs = require('fs');
let code = fs.readFileSync('agents.js', 'utf8');

// 1. Update buildUserMessage signature and body
let newBuildUserMsgStr = `function buildUserMessage(problemText, upstreamContext = {}, refinement = "") {
  let msg = \`PROBLEM DESCRIPTION: \\n\${problemText} \\n\`;

  if (upstreamContext.analysis) {
    msg += \`\\nAGENT 1 OUTPUT(Problem Analysis): \\n\${JSON.stringify(upstreamContext.analysis)} \\n\`;
  }
  if (upstreamContext.domainModel) {
    msg += \`\\nAGENT 2 OUTPUT(Domain Model): \\n\${JSON.stringify(upstreamContext.domainModel)} \\n\`;
  }
  if (upstreamContext.architecture) {
    msg += \`\\nAGENT 3 OUTPUT(Architecture): \\n\${JSON.stringify(upstreamContext.architecture)} \\n\`;
  }
  if (upstreamContext.aiModels) {
    msg += \`\\nAGENT 4 OUTPUT(AI Models): \\n\${JSON.stringify(upstreamContext.aiModels)} \\n\`;
  }
  if (upstreamContext.eventSystem) {
    msg += \`\\nAGENT 5 OUTPUT(Event System): \\n\${JSON.stringify(upstreamContext.eventSystem)} \\n\`;
  }
  if (upstreamContext.implementation) {
    msg += \`\\nAGENT 6 OUTPUT(Implementation): \\n\${JSON.stringify(upstreamContext.implementation)} \\n\`;
  }

  if (refinement && refinement.trim()) {
    msg += \`\\n\\nUSER REFINEMENT INSTRUCTIONS: \\n\${refinement}\\nPlease adjust your previous generation according to these instructions.\\n\`;
  }

  return msg;
}`;

// Regex to replace buildUserMessage entirely
code = code.replace(/function buildUserMessage\([\s\S]*?return msg;\n\}/g, newBuildUserMsgStr);

// 2. Add refinement to every agent...
// async function agentProblemInterpreter(problemText) -> async function agentProblemInterpreter(problemText, refinement)
code = code.replace(/async function agentProblemInterpreter\(problemText\)/g, "async function agentProblemInterpreter(problemText, refinement)");
code = code.replace(/buildUserMessage\(problemText\)/g, "buildUserMessage(problemText, {}, refinement)");

// Domain Model
code = code.replace(/async function agentDomainModelGenerator\(problemText, analysis\)/g, "async function agentDomainModelGenerator(problemText, analysis, refinement)");
code = code.replace(/buildUserMessage\(problemText, { analysis }\)/g, "buildUserMessage(problemText, { analysis }, refinement)");

// Architecture
code = code.replace(/async function agentArchitectureGenerator\(problemText, analysis, domainModel\)/g, "async function agentArchitectureGenerator(problemText, analysis, domainModel, refinement)");
code = code.replace(/buildUserMessage\(problemText, { analysis, domainModel }\)/g, "buildUserMessage(problemText, { analysis, domainModel }, refinement)");

// AI Models
code = code.replace(/async function agentAIModelAdvisor\(problemText, analysis\)/g, "async function agentAIModelAdvisor(problemText, analysis, refinement)");

// Agentic
code = code.replace(/async function agentAgenticGuide\(problemText, analysis, domainModel, architecture\)/g, "async function agentAgenticGuide(problemText, analysis, domainModel, architecture, refinement)");
code = code.replace(/buildUserMessage\(problemText, { analysis, domainModel, architecture }\)/g, "buildUserMessage(problemText, { analysis, domainModel, architecture }, refinement)");

// Event System
code = code.replace(/async function agentEventSystemDesigner\(problemText, analysis, domainModel\)/g, "async function agentEventSystemDesigner(problemText, analysis, domainModel, refinement)");

// Implementation
code = code.replace(/async function agentImplementationGenerator\(problemText, analysis, domainModel, architecture\)/g, "async function agentImplementationGenerator(problemText, analysis, domainModel, architecture, refinement)");

// Visualizer
code = code.replace(/async function agentArchitectureVisualizer\(problemText, analysis, domainModel, architecture\)/g, "async function agentArchitectureVisualizer(problemText, analysis, domainModel, architecture, refinement)");

// Demo
code = code.replace(/async function agentDemoScenarioGenerator\(problemText, analysis, domainModel, architecture\)/g, "async function agentDemoScenarioGenerator(problemText, analysis, domainModel, architecture, refinement)");

// Training
code = code.replace(/async function agentTrainingLabGenerator\(problemText, analysis, domainModel, architecture, implementation\)/g, "async function agentTrainingLabGenerator(problemText, analysis, domainModel, architecture, implementation, refinement)");
code = code.replace(/buildUserMessage\(problemText, { analysis, domainModel, architecture, implementation }\)/g, "buildUserMessage(problemText, { analysis, domainModel, architecture, implementation }, refinement)");

// Competitive
code = code.replace(/async function agentCompetitiveAnalysis\(problemText, analysis, architecture, competitors\)/g, "async function agentCompetitiveAnalysis(problemText, analysis, architecture, competitors, refinement)");
code = code.replace(/let userMsg = buildUserMessage\(problemText, { analysis, architecture }\);/g, "let userMsg = buildUserMessage(problemText, { analysis, architecture }, refinement);");

fs.writeFileSync('agents.js', code);
console.log("Agents updated completely!");

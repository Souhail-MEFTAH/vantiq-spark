const vm = require('vm');
const fs = require('fs');

const code = fs.readFileSync('agents.js', 'utf8');

// Mock dependencies
const sandbox = {
    window: {},
    aiEngine: {
        callAgent: async (name, sys, user) => {
            console.log('--- CALLING AGENT:', name, '---');
            console.log('SYSTEM TYPE:', typeof sys);
            if (typeof sys === 'undefined') {
                console.error('ERROR: sys is undefined!');
            }

            const requestBody = {
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: sys },
                    { role: 'user', content: user }
                ],
                response_format: { type: 'json_object' }
            };

            try {
                const json = JSON.stringify(requestBody);
                console.log('JSON Length:', json.length);
                console.log('JSON Valid?', !!JSON.parse(json));
            } catch (e) {
                console.error('JSON Error:', e.message);
            }
        }
    },
    console: console
};

vm.createContext(sandbox);

try {
    vm.runInContext(code, sandbox);

    // Test businessValue
    const agent = sandbox.window.Agents.businessValue;
    if (!agent) {
        console.error("agentBusinessValue NOT FOUND IN WINDOW.AGENTS");
    } else {
        agent('my problem', { analysis: 1 }, { architecture: 1 }, '', null, 'en').catch(e => console.error(e));
    }
} catch (e) {
    console.error("Execution error:", e);
}

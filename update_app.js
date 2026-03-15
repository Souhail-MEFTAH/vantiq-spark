const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

// Add showHistory() function
if (!js.includes('function showHistory()')) {
    js = js.replace('function switchPanel(panelId) {', 'function showHistory() {\n    switchPanel("history");\n}\n\nfunction switchPanel(panelId) {');
}

// Add app.showHistory to public exporter
if (!js.includes('showHistory,')) {
    js = js.replace('clearHistory', 'showHistory,\n    renameSession,\n    clearHistory');
}

// Add renameSession() function
if (!js.includes('function renameSession(')) {
    const renameFunc = `
function renameSession(id) {
    const history = loadHistory();
    const session = history.find(s => s.id === id);
    if (!session) return;
    const currentName = session.results.domainModel && session.results.domainModel.projectName ? session.results.domainModel.projectName : "Untitled AI Project";
    const newName = prompt("Enter new project name:", currentName);
    if (newName && newName.trim() !== "") {
        if (!session.results.domainModel) session.results.domainModel = {};
        session.results.domainModel.projectName = newName.trim();
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        renderHistory();
    }
}
`;
    js = js.replace('function clearHistory() {', renameFunc + '\nfunction clearHistory() {');
}

// Update renderHistory to include rename button using regular string concatenation
const oldTemplate = '<div style="font-weight:600;font-size:15px;color:var(--text-primary);margin-bottom:8px">\\n                 ${session.results.domainModel?.projectName || \\'Untitled AI Project\\'}';

// Using a simple replace on the inner HTML of that div
if (!js.includes('app.renameSession')) {
    js = js.replace(
        '<div style="font-weight:600;font-size:15px;color:var(--text-primary);margin-bottom:8px">',
        '<div style="font-weight:600;font-size:15px;color:var(--text-primary);margin-bottom:8px; display:flex; justify-content:space-between; align-items:center">'
    );

    js = js.replace(
        "${session.results.domainModel?.projectName || 'Untitled AI Project'}",
        "<span>${session.results.domainModel?.projectName || 'Untitled AI Project'}</span>\\n                 <button class=\\"btn - ghost\\" onclick=\\"event.stopPropagation(); app.renameSession('${session.id}') \\" style=\\"font - size: 12px; padding: 2px 6px\\" title=\\"Rename Session\\">✏️</button>"
    );
}

fs.writeFileSync('app.js', js);
console.log('App.js updated successfully');

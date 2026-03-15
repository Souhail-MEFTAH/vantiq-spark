const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove history from sidebar nav
html = html.replace(/<div class="nav-item" data-panel="history" id="nav-history">[\s\S]*?<\/div>\s*/g, '');

// Add history to footer if not already there
if (!html.includes('id="btnHistory"')) {
    html = html.replace(
        '<button class="btn-ghost" onclick="window.print()" id="btnExportPdf"',
        '<button class="btn-ghost" onclick="app.showHistory()" id="btnHistory" style="font-size:14px" title="Session History">🕒</button>\n          <button class="btn-ghost" onclick="window.print()" id="btnExportPdf"'
    );
}

fs.writeFileSync('index.html', html);
console.log('HTML updated successfully');

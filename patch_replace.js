const fs = require('fs');

function patch(file) {
    let code = fs.readFileSync(file, 'utf8');

    // Make escapeHtml safe against undefined/null
    code = code.replace(/function escapeHtml\(text\)\s*{\s*return text\n\s*\.replace\(/g,
        'function escapeHtml(text) { \n    if (!text) return "";\n    return String(text).replace(');

    // Fallback: simply replace `function escapeHtml(text) { return text.replace`
    code = code.replace(/function escapeHtml\(text\)\s*{\s*return\s+text\.replace\(/g,
        'function escapeHtml(text) { \n    if (!text) return "";\n    return String(text).replace(');

    // Make chatMarkdownToHtml safe against undefined/null
    code = code.replace(/function chatMarkdownToHtml\(text\)\s*{/g,
        'function chatMarkdownToHtml(text) {\n    if (!text) return "";\n    text = String(text);');

    // Also try to find any raw `.replace(` chained calls and add `String(...)` if it's a known variable like `problemText`
    // but the safest approach is fixing the helper functions.

    fs.writeFileSync(file, code);
    console.log(file + " string methods patched.");
}

patch('renderers.js');
patch('app.js');

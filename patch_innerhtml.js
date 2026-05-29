const fs = require('fs');
let code = fs.readFileSync('renderers.js', 'utf8');

// We need to make sure every function in window.Renderers has a null check for `container`
// A simple way is to replace `container.innerHTML = ` with `if (container) container.innerHTML = `
// But they might also do `if (!data) { container.innerHTML = ...; return; }`

code = code.replace(/container\.innerHTML\s*=/g, 'if (container) container.innerHTML =');

fs.writeFileSync('renderers.js', code);
console.log("renderers.js innerHTML patched");

let appCode = fs.readFileSync('app.js', 'utf8');
appCode = appCode.replace(/document\.getElementById\((.*?)\)\.innerHTML\s*=/g, 'const el = document.getElementById($1); if(el) el.innerHTML =');
fs.writeFileSync('app.js', appCode);
console.log("app.js innerHTML patched");

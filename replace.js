const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /<button class="btn btn-regenerate" onclick="app\.regenerate\('([a-z]+)'\)">\s*↻ Regenerate\s*<\/button>/g;

html = html.replace(regex, (match, p1) => {
    return `<div class="regenerate-group" style="display:flex; gap:8px; align-items:center">
              <input type="text" id="refine-${p1}" class="refine-input" placeholder="Refine this phase..." onkeydown="if(event.key==='Enter') app.regenerate('${p1}')" />
              <button class="btn btn-regenerate" onclick="app.regenerate('${p1}')">
                ↻ Regenerate
              </button>
            </div>`;
});

fs.writeFileSync('index.html', html);
console.log("Replaced successfully!");

const fs = require('fs');
let code = fs.readFileSync('renderers.js', 'utf8');

// We want to replace standard array maps with safe maps. 
// e.g. data.actors.map -> (data.actors || []).map
// e.g. e.properties.map -> (e.properties || []).map

// Regex pattern to match property paths before .map(
// It matches words and dots, e.g., data.actors, e.properties, rec.models, etc.
// But we should ignore if it's already inside (something || [])
// This regex replaces  someVarname.propName.map(  with  (someVarname.propName || []).map(
const regex = /([a-zA-Z0-9_]+\.[a-zA-Z0-9_\.]+)\.map\(/g;

code = code.replace(regex, (match, p1) => {
    // If it's something like "history.map" we might not want to touch it if "history" is not a property path, but the regex enforces at least one dot.
    console.log("Patching:", match, "->", `(${p1} || []).map(`);
    return `(${p1} || []).map(`;
});

// For things without dots, like 'history.map' or 'competitors.map' if they exist, 
// let's do a wider search for standard variables just in case
const regex2 = /(?<!\.)\b([a-zA-Z0-9_]+)\.map\(/g;
code = code.replace(regex2, (match, p1) => {
    // Avoid replacing if already handled or if it's something safe
    if (p1 === 'history') return match; // app.js handles history safely usually, but this is renderers.js anyway
    console.log("Patching base var:", match, "->", `(${p1} || []).map(`);
    return `(${p1} || []).map(`;
});


fs.writeFileSync('renderers.js', code);
console.log("renderers.js patched securely.");

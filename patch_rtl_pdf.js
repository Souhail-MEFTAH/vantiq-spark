const fs = require('fs');
let code = fs.readFileSync('pdf-generator.js', 'utf8');

// The old function spans from line 83 to line 163
const oldStart = '            // ── Arabic helper: Manual Word Reordering for Visual RTL ──';
const oldEnd = '            };';

const startIdx = code.indexOf(oldStart);
if (startIdx === -1) { console.error('Could not find start marker'); process.exit(1); }

// Find the closing `};` that ends the applyArabicRTL arrow function
// It's the `};` on line 163 — search from startIdx
const searchAfter = code.substring(startIdx);
// Find the pattern "            };\r\n\r\n            // Helper to add sections"
const endMarker = '            };\r\n\r\n            // Helper to add sections';
const endIdx = searchAfter.indexOf(endMarker);
if (endIdx === -1) { console.error('Could not find end marker'); process.exit(1); }

const before = code.substring(0, startIdx);
const after = code.substring(startIdx + endIdx + '            };\r\n'.length);

const newFunction = `            // ── Arabic helper: Comprehensive RTL Processing ──
            // Handles: word reordering, list markers, table column reversal,
            // margin flipping, and directional symbol replacement.
            const applyArabicRTL = (node) => {
                if (!isArabic) return;
                if (!node || typeof node !== 'object') return;

                // Process array of nodes
                if (Array.isArray(node)) {
                    node.forEach(n => applyArabicRTL(n));
                    return;
                }

                // ── 1. Convert ul/ol to manual RTL stacks ──
                // pdfMake's built-in list RTL is unreliable. We convert each list
                // into a stack of {columns} rows with the marker on the RIGHT side.
                if (node.ul || node.ol) {
                    const items = node.ul || node.ol;
                    const isOrdered = !!node.ol;
                    const stackItems = [];

                    items.forEach((item, idx) => {
                        const marker = isOrdered ? \`.\${idx + 1}\` : '•';

                        // Recursively process the item first
                        applyArabicRTL(item);

                        // Build columns: [text content ← marker] for RTL visual order
                        stackItems.push({
                            columns: [
                                typeof item === 'string'
                                    ? { text: item, alignment: 'right', width: '*' }
                                    : Object.assign({}, item, { alignment: 'right', width: '*' }),
                                { text: marker, width: 20, alignment: 'right', font: 'Roboto', color: '#555555', fontSize: 10 }
                            ],
                            columnGap: 6,
                            margin: [0, 2, 0, 2]
                        });
                    });

                    // Replace the ul/ol with a stack
                    delete node.ul;
                    delete node.ol;
                    node.stack = stackItems;
                    node.margin = node.margin || [0, 0, 0, 10];
                    return;
                }

                // ── 2. Reverse table columns for RTL ──
                if (node.table && node.table.body) {
                    node.table.body.forEach(row => {
                        if (Array.isArray(row)) {
                            row.reverse();
                            row.forEach(cell => applyArabicRTL(cell));
                        }
                    });
                    if (node.table.widths && Array.isArray(node.table.widths)) {
                        node.table.widths.reverse();
                    }
                }

                // ── 3. Process child containers ──
                if (node.columns) { node.columns.forEach(c => applyArabicRTL(c)); }
                if (node.stack) { node.stack.forEach(s => applyArabicRTL(s)); }

                // ── 4. Flip left/right margins ──
                if (Array.isArray(node.margin) && node.margin.length === 4) {
                    const [left, top, right, bottom] = node.margin;
                    node.margin = [right, top, left, bottom];
                }

                // ── 5. Process text — reverse words and fix directional symbols ──
                if (typeof node.text === 'string' && node.text.trim()) {
                    // Replace directional arrows for RTL
                    node.text = node.text.replace(/\\u2192/g, '\\u2190').replace(/->/g, '<-');

                    const str = node.text;
                    const hasArabic = /[\\u0600-\\u06FF]/.test(str);

                    if (hasArabic) {
                        const lines = str.split('\\n');
                        const newTextRuns = [];

                        lines.forEach((line, index) => {
                            if (!line.trim()) {
                                if (index < lines.length - 1) newTextRuns.push({ text: '\\n' });
                                return;
                            }

                            // Tokenize: Latin phrases | Arabic words | spaces | punctuation
                            const tokens = line.match(/([a-zA-Z0-9](?:[\\x20-\\x7E]*[a-zA-Z0-9])?)|([\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF]+)|(\\s+)|([\\x21-\\x7E]+)|([^\\x00-\\x7F]+)/g) || [line];

                            // Reverse tokens for visual RTL
                            const reversedTokens = tokens.reverse();

                            reversedTokens.forEach(token => {
                                const hasArabicChars = /[\\u0600-\\u06FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF]/.test(token);
                                newTextRuns.push({
                                    text: token,
                                    font: hasArabicChars ? 'NotoSansArabic' : 'Roboto'
                                });
                            });

                            if (index < lines.length - 1) {
                                newTextRuns.push({ text: '\\n' });
                            }
                        });

                        node.text = newTextRuns;
                        node.alignment = node.alignment || 'right';
                    } else {
                        node.font = node.font || 'Roboto';
                        node.alignment = node.alignment || 'right';
                    }
                } else if (Array.isArray(node.text)) {
                    node.text.reverse();
                    node.text.forEach(t => applyArabicRTL(t));
                }

                // ── 6. Ensure alignment is always right ──
                if (!node.alignment && (node.text || node.stack)) {
                    node.alignment = 'right';
                }
            };
`;

code = before + newFunction + after;

fs.writeFileSync('pdf-generator.js', code);
console.log('applyArabicRTL overhauled successfully');

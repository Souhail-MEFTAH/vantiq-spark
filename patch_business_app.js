const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Korean translations
appJs = appJs.replace(
    /"nav-strategy": "전략",/,
    `"nav-strategy": "전략",\n        "nav-business": "비즈니스 가치",`
);

appJs = appJs.replace(
    /"step-training": "교육",/,
    `"step-training": "교육",\n        "step-business": "가치",`
);

appJs = appJs.replace(
    /"linter-subtitle": "에이전트 11 — Vantiq 모범 사례 감사",/,
    `"linter-subtitle": "에이전트 11 — Vantiq 모범 사례 감사",\n        "business-title": "비즈니스 가치 증명",\n        "business-subtitle": "에이전트 11 — 예상 ROI, 위험 및 KPI",`
);

appJs = appJs.replace(
    /"reg-linter": "에이전트 11 — 아키텍처 린터",\n(.*)"reg-competitive"/,
    `"reg-linter": "에이전트 11 — 아키텍처 린터",\n        "reg-business": "에이전트 11 — 가치",\n$1"reg-competitive"`
);

// 2. Japanese translations
appJs = appJs.replace(
    /"nav-strategy": "戦略",/,
    `"nav-strategy": "戦略",\n        "nav-business": "ビジネス価値",`
);

appJs = appJs.replace(
    /"step-training": "トレーニング",/,
    `"step-training": "トレーニング",\n        "step-business": "価値",`
);

appJs = appJs.replace(
    /"linter-subtitle": "エージェント 11 — Vantiq ベストプラクティス監査",/,
    `"linter-subtitle": "エージェント 11 — Vantiq ベストプラクティス監査",\n        "business-title": "ビジネス価値の正当化",\n        "business-subtitle": "エージェント 11 — 予想されるROI、リスク、およびKPI",`
);

appJs = appJs.replace(
    /"reg-linter": "エージェント 11 — アーキテクチャリンター",\n(.*)"reg-competitive"/,
    `"reg-linter": "エージェント 11 — アーキテクチャリンター",\n        "reg-business": "エージェント 11 — 価値",\n$1"reg-competitive"`
);

// 3. Arabic translations
appJs = appJs.replace(
    /"nav-strategy": "الإستراتيجية",/,
    `"nav-strategy": "الإستراتيجية",\n        "nav-business": "القيمة التجارية",`
);

appJs = appJs.replace(
    /"step-training": "التدريب",/,
    `"step-training": "التدريب",\n        "step-business": "القيمة",`
);

appJs = appJs.replace(
    /"linter-subtitle": "الوكيل 11 — مراجعة أفضل ممارسات Vantiq",/,
    `"linter-subtitle": "الوكيل 11 — مراجعة أفضل ممارسات Vantiq",\n        "business-title": "مُبرر القيمة التجارية",\n        "business-subtitle": "الوكيل 11 — العائد على الاستثمار المتوقع، المخاطر، ومؤشرات الأداء",`
);

appJs = appJs.replace(
    /"reg-linter": "الوكيل 11 — مدقق البنية",\n(.*)"reg-competitive"/,
    `"reg-linter": "الوكيل 11 — مدقق البنية",\n        "reg-business": "الوكيل 11 — القيمة",\n$1"reg-competitive"`
);

// 4. Nav update in restoreSession
appJs = appJs.replace(
    /if \(state\.results\.linter\) {(\s*Renderers\.renderVantiqLinter.*?)}/s,
    `if (state.results.businessValue) {
        Renderers.renderBusinessValue(state.results.businessValue, document.getElementById('business-content'));
        enableNav('business');
    }\n    if (state.results.linter) {$1}`
);

fs.writeFileSync('app.js', appJs);
console.log("app.js patched!");

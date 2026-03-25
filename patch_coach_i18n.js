const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// 1. Replace the static COACH_PANEL_MAP with a dynamic getter function getCoachPanelMap(lang)
const oldMapDef = `const COACH_PANEL_MAP = {
    analysis: { contextKey: 'analysis', label: 'Problem Analysis', suggestions: ['What is the core problem being solved here?', 'Why is Vantiq a good fit for this use case?', 'Explain the AI tasks identified'] },
    domain: { contextKey: 'domainModel', label: 'Domain Model', suggestions: ['What are domain entities and why do they matter?', 'How do these entities relate to each other?', 'What is a bounded context?'] },
    architecture: { contextKey: 'architecture', label: 'System Architecture', suggestions: ['Walk me through this architecture step by step', 'What makes this event-driven?', 'How does data flow through the system?'] },
    aimodels: { contextKey: 'aiModels', label: 'AI Model Recommendations', suggestions: ['Why were these specific AI models chosen?', 'What is the difference between these model types?', 'How would these models run in production?'] },
    agentic: { contextKey: 'agentic', label: 'Agentic AI Guide', suggestions: ['What is an AI agent and how is it different from a model?', 'How do these agents coordinate with each other?', 'What tools do the agents use?'] },
    events: { contextKey: 'events', label: 'Event System Design', suggestions: ['What is event-driven architecture?', 'Explain the event flow in simple terms', 'What are Visual Event Handlers?'] },
    implementation: { contextKey: 'implementation', label: 'Implementation Plan', suggestions: ['What should we build first?', 'What Vantiq tools are needed for each phase?', 'How long would this take to implement?'] },
    diagrams: { contextKey: 'diagrams', label: 'Architecture Diagrams', suggestions: ['Walk me through this diagram', 'What do the arrows represent?', 'How do the components connect?'] },
    demo: { contextKey: 'demo', label: 'Demo Scenarios', suggestions: ['How would I demo this to a customer?', 'What are the key wow moments?', 'What data do I need for the demo?'] },
    training: { contextKey: 'training', label: 'Training Labs', suggestions: ['What skills will participants learn?', 'What prerequisites are needed?', 'How long should each lab take?'] },
    business: { contextKey: 'businessValue', label: 'Business Value Justifier', suggestions: ['Explain the ROI in simple terms', 'How do I present this to executives?', 'What KPIs should we track?'] },
    competitive: { contextKey: 'competitive', label: 'Competitive Analysis', suggestions: ['Why choose Vantiq over competitor X?', 'What are Vantiq\\'s unique strengths?', 'How do I handle pricing objections?'] }
};`;

const dynamicMapDef = `function getCoachPanelMap() {
    const lang = currentLang || window.currentLang || 'en';
    const maps = {
        en: {
            analysis: { contextKey: 'analysis', label: 'Problem Analysis', welcome: "Welcome! I'm your AI Coach for the", sub: "I can help you understand what was generated here, explain technical concepts, and answer any questions you have. Just ask me anything!", hint: 'Try: "Explain this section in simple terms" or "What are the key takeaways?"', suggestions: ['What is the core problem being solved here?', 'Why is Vantiq a good fit for this use case?', 'Explain the AI tasks identified'] },
            domain: { contextKey: 'domainModel', label: 'Domain Model', suggestions: ['What are domain entities and why do they matter?', 'How do these entities relate to each other?', 'What is a bounded context?'] },
            architecture: { contextKey: 'architecture', label: 'System Architecture', suggestions: ['Walk me through this architecture step by step', 'What makes this event-driven?', 'How does data flow through the system?'] },
            aimodels: { contextKey: 'aiModels', label: 'AI Model Recommendations', suggestions: ['Why were these specific AI models chosen?', 'What is the difference between these model types?', 'How would these models run in production?'] },
            agentic: { contextKey: 'agentic', label: 'Agentic AI Guide', suggestions: ['What is an AI agent and how is it different from a model?', 'How do these agents coordinate with each other?', 'What tools do the agents use?'] },
            events: { contextKey: 'events', label: 'Event System Design', suggestions: ['What is event-driven architecture?', 'Explain the event flow in simple terms', 'What are Visual Event Handlers?'] },
            implementation: { contextKey: 'implementation', label: 'Implementation Plan', suggestions: ['What should we build first?', 'What Vantiq tools are needed for each phase?', 'How long would this take to implement?'] },
            diagrams: { contextKey: 'diagrams', label: 'Architecture Diagrams', suggestions: ['Walk me through this diagram', 'What do the arrows represent?', 'How do the components connect?'] },
            demo: { contextKey: 'demo', label: 'Demo Scenarios', suggestions: ['How would I demo this to a customer?', 'What are the key wow moments?', 'What data do I need for the demo?'] },
            training: { contextKey: 'training', label: 'Training Labs', suggestions: ['What skills will participants learn?', 'What prerequisites are needed?', 'How long should each lab take?'] },
            business: { contextKey: 'businessValue', label: 'Business Value Justifier', suggestions: ['Explain the ROI in simple terms', 'How do I present this to executives?', 'What KPIs should we track?'] },
            competitive: { contextKey: 'competitive', label: 'Competitive Analysis', suggestions: ['Why choose Vantiq over competitor X?', 'What are Vantiq\\'s unique strengths?', 'How do I handle pricing objections?'] }
        },
        ko: {
            analysis: { contextKey: 'analysis', label: '문제 분석', welcome: "환영합니다! 저는 다음 섹션의 AI 코치입니다:", sub: "생성된 내용을 이해하고, 기술적 개념을 설명하며, 질문에 답변해 드립니다. 무엇이든 물어보세요!", hint: '제안: "이 섹션을 쉽게 설명해 줘" 또는 "주요 요점이 뭐야?"', suggestions: ['여기서 해결하려는 핵심 문제는 무엇인가요?', '이 사용 사례에 Vantiq가 적합한 이유는 무엇인가요?', '식별된 AI 작업을 설명해 주세요'] },
            domain: { contextKey: 'domainModel', label: '도메인 모델', suggestions: ['도메인 엔티티란 무엇이며 왜 중요한가요?', '이 엔티티들은 서로 어떻게 연결되나요?', 'Bounded Context(제한된 컨텍스트)란 무엇인가요?'] },
            architecture: { contextKey: 'architecture', label: '시스템 아키텍처', suggestions: ['이 아키텍처를 단계별로 설명해 주세요', '이것이 이벤트 기반인 이유는 무엇인가요?', '시스템을 통해 데이터가 어떻게 흐르나요?'] },
            aimodels: { contextKey: 'aiModels', label: 'AI 모델 추천', suggestions: ['이 특정 AI 모델들이 선택된 이유는 무엇인가요?', '이 모델 유형들의 차이점은 무엇인가요?', '이 모델들은 프로덕션 환경에서 어떻게 실행되나요?'] },
            agentic: { contextKey: 'agentic', label: '에이전트 AI 가이드', suggestions: ['AI 에이전트란 무엇이며 모델과 어떻게 다른가요?', '이 에이전트들은 서로 어떻게 협력하나요?', '에이전트는 어떤 도구를 사용하나요?'] },
            events: { contextKey: 'events', label: '이벤트 시스템 설계', suggestions: ['이벤트 기반 아키텍처란 무엇인가요?', '이벤트 흐름을 쉽게 설명해 주세요', 'Visual Event Handlers(시각적 이벤트 핸들러)란 무엇인가요?'] },
            implementation: { contextKey: 'implementation', label: '구현 계획', suggestions: ['가장 먼저 무엇을 구축해야 하나요?', '각 단계에 어떤 Vantiq 도구가 필요한가요?', '이것을 구현하는 데 얼마나 걸릴까요?'] },
            diagrams: { contextKey: 'diagrams', label: '아키텍처 다이어그램', suggestions: ['이 다이어그램을 설명해 주세요', '화살표는 무엇을 의미하나요?', '컴포넌트들은 어떻게 연결되나요?'] },
            demo: { contextKey: 'demo', label: '데모 시나리오', suggestions: ['고객에게 이것을 어떻게 시연해야 하나요?', '가장 인상적인 (Wow) 순간은 무엇인가요?', '데모에 어떤 데이터가 필요한가요?'] },
            training: { contextKey: 'training', label: '교육 랩', suggestions: ['참가자들은 어떤 기술을 배우게 되나요?', '어떤 사전 지식이 필요한가요?', '각 실습은 얼마나 걸리나요?'] },
            business: { contextKey: 'businessValue', label: '비즈니스 가치 증명', suggestions: ['ROI를 쉽게 설명해 주세요', '이것을 임원들에게 어떻게 발표해야 하나요?', '어떤 KPI를 추적해야 하나요?'] },
            competitive: { contextKey: 'competitive', label: '경쟁 분석', suggestions: ['X 경쟁사 대신 Vantiq를 선택해야 하는 이유는 무엇인가요?', 'Vantiq만의 고유한 강점은 무엇인가요?', '가격 관련 이의 제기에 어떻게 대처해야 하나요?'] }
        },
        ja: {
            analysis: { contextKey: 'analysis', label: '問題分析', welcome: "ようこそ！私は次のセクションのAIコーチです:", sub: "ここで生成された内容を理解し、技術的な概念を説明し、質問にお答えします。何でも聞いてください！", hint: 'ヒント: "このセクションを簡単に説明して" または "重要なポイントは何ですか？"', suggestions: ['ここで解決すべき核となる問題は何ですか？', 'このユースケースにVantiqが適している理由は何ですか？', '特定されたAIタスクについて説明してください'] },
            domain: { contextKey: 'domainModel', label: 'ドメインモデル', suggestions: ['ドメインエンティティとは何ですか？なぜ重要なのですか？', 'これらのエンティティは互いにどのように関連していますか？', '境界づけられたコンテキスト（Bounded Context）とは何ですか？'] },
            architecture: { contextKey: 'architecture', label: 'システムアーキテクチャ', suggestions: ['このアーキテクチャをステップバイステップで説明してください', 'どこがイベント駆動型なのですか？', 'システム内でデータはどのように流れますか？'] },
            aimodels: { contextKey: 'aiModels', label: 'AIモデルの推奨', suggestions: ['なぜこれらの特定のAIモデルが選ばれたのですか？', 'これらのモデルタイプの違いは何ですか？', 'これらのモデルは本番環境でどのように実行されますか？'] },
            agentic: { contextKey: 'agentic', label: 'エージェントAIガイド', suggestions: ['AIエージェントとは何ですか？モデルとどう違うのですか？', 'これらのエージェントは互いにどのように連携しますか？', 'エージェントはどのようなツールを使用しますか？'] },
            events: { contextKey: 'events', label: 'イベントシステム設計', suggestions: ['イベント駆動型アーキテクチャとは何ですか？', 'イベントのフローを簡単に説明してください', 'ビジュアルイベントハンドラー（Visual Event Handlers）とは何ですか？'] },
            implementation: { contextKey: 'implementation', label: '実装計画', suggestions: ['最初に何を構築すべきですか？', '各フェーズでどのVantiqツールが必要ですか？', 'これを実装するのにどのくらいかかりますか？'] },
            diagrams: { contextKey: 'diagrams', label: 'アーキテクチャ図', suggestions: ['この図について説明してください', '矢印は何を表していますか？', 'コンポーネントはどのように接続されていますか？'] },
            demo: { contextKey: 'demo', label: 'デモシナリオ', suggestions: ['これを顧客にどのようにデモすればよいですか？', '重要な「ワオ(Wow)」の瞬間は何ですか？', 'デモにはどのようなデータが必要ですか？'] },
            training: { contextKey: 'training', label: 'トレーニングラボ', suggestions: ['参加者はどのようなスキルを学びますか？', 'どのような前提知識が必要ですか？', '各ラボにはどのくらいの時間がかかりますか？'] },
            business: { contextKey: 'businessValue', label: 'ビジネス価値の証明', suggestions: ['ROIを簡単に説明してください', 'これを経営陣にどのようにプレゼンすればよいですか？', 'どのKPIを追跡すべきですか？'] },
            competitive: { contextKey: 'competitive', label: '競合分析', suggestions: ['競合他社XではなくVantiqを選ぶ理由は何ですか？', 'Vantiq独自の強みは何ですか？', '価格に関する異議にどのように対処すべきですか？'] }
        },
        ar: {
            analysis: { contextKey: 'analysis', label: 'تحليل المشكلة', welcome: "مرحباً! أنا مدرب الذكاء الاصطناعي الخاص بك لقسم", sub: "يمكنني مساعدتك في فهم ما تم إنشاؤه هنا، وشرح المفاهيم التقنية، والإجابة على أي أسئلة لديك. اسألني أي شيء!", hint: 'جرب أن تسأل: "اشرح هذا القسم بعبارات بسيطة" أو "ما هي النقاط الرئيسية؟"', suggestions: ['ما هي المشكلة الأساسية التي يتم حلها هنا؟', 'لماذا تعتبر Vantiq مناسبة لحالة الاستخدام هذه؟', 'اشرح مهام الذكاء الاصطناعي المحددة'] },
            domain: { contextKey: 'domainModel', label: 'نموذج المجال (Domain Model)', suggestions: ['ما هي كيانات المجال ولماذا هي مهمة؟', 'كيف ترتبط هذه الكيانات ببعضها البعض؟', 'ما هو السياق المقيد (Bounded Context)؟'] },
            architecture: { contextKey: 'architecture', label: 'بنية النظام', suggestions: ['اشرح لي هذه البنية خطوة بخطوة', 'ما الذي يجعل هذا النظام مبنياً على الأحداث؟', 'كيف تتدفق البيانات عبر النظام؟'] },
            aimodels: { contextKey: 'aiModels', label: 'توصيات نماذج الذكاء الاصطناعي', suggestions: ['لماذا تم اختيار هذه النماذج المحددة للذكاء الاصطناعي؟', 'ما هو الفرق بين أنواع هذه النماذج؟', 'كيف ستعمل هذه النماذج في بيئة الإنتاج؟'] },
            agentic: { contextKey: 'agentic', label: 'دليل الذكاء الاصطناعي الوكيل', suggestions: ['ما هو وكيل الذكاء الاصطناعي وكيف يختلف عن النموذج العادي؟', 'كيف تنسق هذه الوكالات مع بعضها البعض؟', 'ما هي الأدوات التي تستخدمها الوكالات؟'] },
            events: { contextKey: 'events', label: 'تصميم نظام الأحداث', suggestions: ['ما هي البنية القائمة على الأحداث؟', 'اشرح تدفق الأحداث بعبارات بسيطة', 'ما هي معالجات الأحداث المرئية (Visual Event Handlers)؟'] },
            implementation: { contextKey: 'implementation', label: 'خطة التنفيذ', suggestions: ['ما الذي يجب أن نبنيه أولاً؟', 'ما هي أدوات Vantiq المطلوبة لكل مرحلة؟', 'كم من الوقت سيستغرق تنفيذ هذا؟'] },
            diagrams: { contextKey: 'diagrams', label: 'مخططات البنية', suggestions: ['اشرح لي هذا المخطط', 'ماذا تمثل الأسهم؟', 'كيف تتصل المكونات ببعضها؟'] },
            demo: { contextKey: 'demo', label: 'سيناريوهات العرض التجريبي', suggestions: ['كيف سأقوم بعرض هذا للعميل؟', 'ما هي اللحظات المبهرة (Wow moments) الرئيسية؟', 'ما هي البيانات التي أحتاجها للعرض التجريبي؟'] },
            training: { contextKey: 'training', label: 'مختبرات التدريب', suggestions: ['ما هي المهارات التي سيتعلمها المشاركون؟', 'ما هي المتطلبات الأساسية اللازمة؟', 'كم يجب أن يستغرق كل مختبر؟'] },
            business: { contextKey: 'businessValue', label: 'مبرر قيمة الأعمال', suggestions: ['اشرح العائد على الاستثمار (ROI) بعبارات بسيطة', 'كيف أعرض هذا على المديرين التنفيذيين؟', 'ما هي مؤشرات الأداء الرئيسية (KPIs) التي يجب تتبعها؟'] },
            competitive: { contextKey: 'competitive', label: 'التحليل التنافسي', suggestions: ['لماذا نختار Vantiq بدلاً من المنافس X؟', 'ما هي نقاط القوة الفريدة لـ Vantiq؟', 'كيف أتعامل مع الاعتراضات على الأسعار؟'] }
        }
    };
    
    // Copy welcome/sub/hint strings from 'analysis' into all other sections for the current lang
    const activeMap = maps[lang] || maps.en;
    const baseWelcome = activeMap.analysis.welcome;
    const baseSub = activeMap.analysis.sub;
    const baseHint = activeMap.analysis.hint;
    
    for (let key in activeMap) {
        activeMap[key].welcome = baseWelcome;
        activeMap[key].sub = baseSub;
        activeMap[key].hint = baseHint;
    }
    
    return activeMap;
}`;

// Make sure to replace exact content
if (code.includes(oldMapDef)) {
    code = code.replace(oldMapDef, dynamicMapDef);
} else {
    console.error("Could not find COACH_PANEL_MAP definition to replace.");
    // Fallback: search for it if space format changed
    const startIdx = code.indexOf('const COACH_PANEL_MAP = {');
    const endIdx = code.indexOf('};', startIdx) + 2;
    if (startIdx !== -1) {
        code = code.substring(0, startIdx) + dynamicMapDef + code.substring(endIdx);
    }
}

// 2. Update openCoach to use getCoachPanelMap() and inject the translated welcome message
const oldOpenCoachStart = `function openCoach(panelKey) {
    const mapping = COACH_PANEL_MAP[panelKey];`;

const newOpenCoachStart = `function openCoach(panelKey) {
    const pMap = getCoachPanelMap();
    const mapping = pMap[panelKey];`;

code = code.replace(oldOpenCoachStart, newOpenCoachStart);

// Now find where the welcome message is written:
const oldWelcomeHtml = `        // Show welcome message
        const welcomeHtml = \`<div class="coach-msg assistant">
            <div class="coach-msg-avatar">🎓</div>
            <div class="coach-msg-bubble">
                <strong>Welcome!</strong> I'm your AI Coach for the <em>\${mapping.label}</em> section.<br><br>
                I can help you understand what was generated here, explain technical concepts, and answer any questions you have. Just ask me anything!<br><br>
                <em style="color:var(--text-tertiary);font-size:12px">Try: "Explain this section in simple terms" or "What are the key takeaways?"</em>
            </div>
        </div>\`;`;

const newWelcomeHtml = `        // Show welcome message
        const isRtl = (window.currentLang === 'ar') ? 'dir="rtl" style="text-align:right"' : '';
        const welcomeHtml = \`<div class="coach-msg assistant" \${isRtl}>
            <div class="coach-msg-avatar">🎓</div>
            <div class="coach-msg-bubble">
                <strong>\${mapping.welcome}</strong> <em>\${mapping.label}</em>.<br><br>
                \${mapping.sub}<br><br>
                <em style="color:var(--text-tertiary);font-size:12px">\${mapping.hint}</em>
            </div>
        </div>\`;`;

// Handle spaces and tabs gracefully by finding index
const wIndex1 = code.indexOf('<strong>Welcome!</strong>');
if (wIndex1 !== -1) {
    const startW = code.lastIndexOf('        // Show welcome message', wIndex1);
    const endW = code.indexOf('        </div>`;', wIndex1) + 16;
    code = code.substring(0, startW) + newWelcomeHtml + code.substring(endW);
}

// 3. Update sendCoachMessage to ensure COACH_PANEL_MAP usage is fixed
const oldCoachPanelMapRef = `const mapping = COACH_PANEL_MAP[coachCurrentPanel];`;
const newCoachPanelMapRef = `const pMap = getCoachPanelMap();
        const mapping = pMap[coachCurrentPanel];`;
code = code.replace(oldCoachPanelMapRef, newCoachPanelMapRef);

// 4. Update the suggestions HTML generator to translate chips properly
const oldSuggestionsLoop = `// Generate suggested prompt chips
        let suggestionsHtml = '';
        if (mapping.suggestions) {
            mapping.suggestions.forEach(sug => {
                suggestionsHtml += \`<div class="coach-suggestion-chip" onclick="app.askCoachSuggestion('\${sug.replace(/'/g, "\\'")}')">\${sug}</div>\`;
            });
        }`;
const newSuggestionsLoop = `// Generate suggested prompt chips
        let suggestionsHtml = '';
        if (mapping.suggestions) {
            mapping.suggestions.forEach(sug => {
                suggestionsHtml += \`<div class="coach-suggestion-chip" onclick="app.askCoachSuggestion('\${sug.replace(/'/g, "\\'")}')">\${sug}</div>\`;
            });
            const isRtl = (window.currentLang === 'ar') ? 'dir="rtl"' : '';
            const welcomeHtmlReplaced = welcomeHtml.replace('</div>\\n        </div>', \`<div style="margin-top:10px;display:flex;flex-direction:column;gap:6px" \${isRtl}>\${suggestionsHtml}</div></div></div>\`);
            messagesEl.innerHTML = welcomeHtmlReplaced;
        } else {
            messagesEl.innerHTML = welcomeHtml;
        }`;

// We need to inject the suggestions generation. Wait, the old openCoach is:
/*
    // Render existing messages or show welcome
    messagesEl.innerHTML = '';
    if (coachHistory[panelKey].length === 0) {
        // Show welcome message
        const welcomeHtml = `<div class="coach-msg assistant">
            <div class="coach-msg-avatar">🎓</div>
            <div class="coach-msg-bubble">
                <strong>Welcome!</strong> I'm your AI Coach for the <em>${mapping.label}</em> section.<br><br>
                I can help you understand what was generated here, explain technical concepts, and answer any questions you have. Just ask me anything!<br><br>
                <em style="color:var(--text-tertiary);font-size:12px">Try: "Explain this section in simple terms" or "What are the key takeaways?"</em>
            </div>
        </div>`;
        messagesEl.innerHTML = welcomeHtml;
...
*/

// Let's rewrite openCoach completely using regex
fs.writeFileSync('app.js', code);
console.log('App patched.');

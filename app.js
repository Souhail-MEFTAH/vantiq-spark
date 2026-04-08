// ============================================
// Vantiq Spark — App Controller (GPT-5.2)
// ============================================

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
        primaryColor: '#7c6bf5',
        primaryTextColor: '#e8eaed',
        primaryBorderColor: '#7c6bf5',
        lineColor: '#5c6078',
        secondaryColor: '#4fc3f7',
        tertiaryColor: '#12121e',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        darkMode: true,
        background: '#0c0c14',
        mainBkg: '#1a1a2e',
        nodeBorder: '#7c6bf5',
        clusterBkg: '#12121e',
        clusterBorder: '#7c6bf5',
        titleColor: '#e8eaed',
        edgeLabelBackground: '#0c0c14',
        nodeTextColor: '#e8eaed'
    },
    flowchart: { curve: 'basis', padding: 30, nodeSpacing: 60, rankSpacing: 70, htmlLabels: true },
    sequence: { actorMargin: 120, messageFontSize: 14, actorFontSize: 14, noteFontSize: 13, width: 200 }
});

// ── Example Problems ──
function getExamples() {
    const lang = state.language || 'en';
    const t = I18N[lang] || I18N.en;
    return [
        t['example-prompt-wildfire'] || "Design a real-time wildfire detection system...",
        t['example-prompt-hospital'] || "Design a real-time hospital patient deterioration detection system...",
        t['example-prompt-industrial'] || "Design a predictive maintenance system for industrial manufacturing equipment...",
        t['example-prompt-traffic'] || "Design a smart traffic management system...",
        t['example-prompt-building'] || "Design a smart building energy optimization system..."
    ];
}

// State is declared below in the I18N section

// ── I18N Translations ──
const I18N = {
    en: {
        "app-subtitle": "Solution Designer",
        "nav-assistant": "Assistant",
        "nav-usecase": "Usecase Assistant",
        "nav-design": "Design",
        "nav-input": "Problem Input",
        "nav-usecasescope": "Use Case Scope",
        "nav-phase2": "② Value Assessment",
        "nav-phase3": "③ Architecture",
        "nav-phase4": "④ AI Consulting",
        "nav-phase5": "⑤ Implementation",
        "nav-phase6": "⑥ Expansion",
        "nav-adjacent": "Adjacent Use Cases",
        "nav-roadmap": "Roadmap",
        "nav-valuegrowth": "Value Growth",
        "nav-analysis": "Sales Discovery",
        "nav-phase1": "① Discovery",
        "nav-domain": "Domain Model",
        "nav-architecture": "Architecture",
        "nav-architecture-tab": "Architecture",
        "nav-aimodels": "AI Models",
        "nav-agentic": "Agentic Alternative",
        "nav-events": "Event System",
        "nav-build": "Build",
        "nav-implementation": "Implementation",
        "nav-diagrams": "Diagrams",
        "nav-enablement": "Enablement",
        "nav-demo": "Demo Scenarios",
        "nav-training": "Training Labs",
        "nav-strategy": "Strategy",
        "nav-business": "Business Value",
        "nav-competitive": "Competitive Analysis",
        "status-configure": "Configure API Key",
        "welcome-description": "Describe your problem and our AI agents will generate a complete system architecture, implementation scaffolding, demo scenarios, and training labs — all in one workflow.",
        "problem-label": "Problem Description",
        "btn-generate": "Generate Solution",
        "btn-clear": "Clear",
        "examples-label": "Try an example",
        "chat-welcome-1": "Hi! I'm the <strong>Vantiq Usecase Assistant</strong>. I can help you brainstorm and design real-time, event-driven applications on the Vantiq platform.",
        "chat-welcome-2": "Try asking me things like:",
        "chat-example-1": "How can Vantiq help with predictive maintenance?",
        "chat-example-2": "Design a smart building energy optimization system",
        "chat-example-3": "What Vantiq features support real-time video analytics?",
        "history-title": "Session History",
        "history-subtitle": "Resume your previous AI generation sessions",
        "settings-model": "Model",
        "settings-language": "Language",
        "btn-cancel": "Cancel",
        "btn-save": "Save Settings",
        "title-history": "Session History",
        "title-export": "Export Solution to PDF",
        "title-settings": "Settings",
        "step-interpreter": "Interpreter",
        "step-domain": "Domain",
        "step-architecture": "Architecture",
        "step-aimodel": "AI Models",
        "step-agentic": "Agentic",
        "step-events": "Events",
        "step-implementation": "Implement",
        "step-visualizer": "Diagrams",
        "step-demo": "Demo",
        "step-training": "Training",
        "step-business": "Value",
        "step-competitive": "Compete",
        "chat-title": "Vantiq Usecase Assistant",
        "chat-subtitle": "AI-powered chatbot for Vantiq use case ideation, architecture guidance, and best practices",
        "btn-clear-chat": "Clear Chat",
        "chat-placeholder": "Ask about Vantiq use cases, architecture, best practices...",
        "btn-clear-all": "Clear All",
        "problem-placeholder": "Describe your real-time AI system problem...\n\nExample: Design a real-time wildfire detection system using drones and computer vision that can automatically alert emergency response teams.",
        "competitors-label": "Competitors to Compare",
        "optional-label": "(optional)",
        "competitors-placeholder": "e.g. AWS IoT, Azure IoT, PTC ThingWorx, C3.ai, Siemens MindSphere (leave empty to auto-select 5)",
        "example-wildfire": "Wildfire Detection",
        "example-hospital": "Hospital Patient Deterioration",
        "example-industrial": "Industrial Predictive Maintenance",
        "example-traffic": "Smart Traffic Management",
        "example-building": "Smart Building Energy",
        "analysis-title": "Problem Analysis",
        "analysis-subtitle": "Agent 1 — Problem Interpreter output",
        "refine-placeholder": "Refine this phase...",
        "btn-regenerate": "Regenerate",
        "coach-title": "AI Coach",
        "coach-btn": "AI Coach",
        "coach-placeholder": "Ask about this section...",
        "domain-title": "Domain Model",
        "domain-subtitle": "Agent 2 — Entity & Context Mapping",
        "architecture-title": "System Architecture",
        "architecture-subtitle": "Agent 3 — Blueprint & Infrastructure",
        "aimodels-title": "AI Models",
        "aimodels-subtitle": "Agent 4 — Model Advisory",
        "agentic-title": "Agentic Alternative",
        "agentic-subtitle": "Agent 4b — LLM Agent Augmentation Guide",
        "events-title": "Event System",
        "events-subtitle": "Agent 5 — Real-time Orchestration",
        "implementation-title": "Implementation",
        "implementation-subtitle": "Agent 6 — Resource & Code Generator",
        "diagrams-title": "Diagrams",
        "diagrams-subtitle": "Agent 7 — Architecture Visualizer",
        "demo-title": "Demo Scenarios",
        "demo-subtitle": "Agent 8 — Solution Narrative & Validation",
        "training-title": "Training Labs",
        "training-subtitle": "Agent 9 — Education & Workshop Guide",
        "linter-title": "Arch Linter",
        "linter-subtitle": "Agent 11 — Vantiq Best Practices Audit",
        "business-title": "Business Value Justifier",
        "business-subtitle": "Agent 11 — Expected ROI, Risks, and KPIs",
        "competitive-title": "Competitive Strategy",
        "competitive-subtitle": "Agent 10 — Market Analysis & Differentiators",
        "gen-main-status": "Generating Solution...",
        "gen-starting": "Starting pipeline...",
        "settings-title": "⚙️ AI Engine Settings",
        "settings-key": "🔑 OpenAI API Key",
        "key-placeholder": "sk-...",
        "settings-key-note": "Your API key is stored only in this browser session and never sent anywhere except api.openai.com.",
        "model-recommended": "GPT-4.1 (Recommended)",
        "model-mini": "GPT-4.1 Mini (Faster)",
        "model-nano": "GPT-4.1 Nano (Fastest)",
        "model-capable": "GPT-5.4 (Most Capable)",
        "model-reasoning": "Reasoning",
        "lang-en": "English",
        "lang-ko": "Korean",
        "lang-ja": "Japanese",
        "lang-ar": "Arabic",
        "label-default": "Default",
        "history-empty": "No history found.",
        "chat-welcome-1": "Hi! I'm the <strong>Vantiq Usecase Assistant</strong>. I can help you brainstorm and design real-time, event-driven applications on the Vantiq platform.",
        "chat-welcome-2": "Try asking me things like:",
        "chat-example-1": "How can Vantiq help with predictive maintenance?",
        "chat-example-2": "Design a smart building energy optimization system",
        "chat-example-3": "What Vantiq features support real-time video analytics?",
        "btn-clear": "Clear",
        "label-domain": "Domain",
        "label-core-problem": "Core Problem",
        "label-actors": "Actors",
        "label-data-sources": "Data Sources",
        "label-events": "Events",
        "label-ai-tasks": "AI Tasks",
        "label-entities": "Entities",
        "label-why-vantiq": "Why Vantiq?",
        "label-services": "Services",
        "label-commands": "Commands",
        "label-arch-overview": "Architecture Overview",
        "label-sys-components": "System Components",
        "label-int-points": "Integration Points",
        "label-arch-diagram": "Architecture Diagram",
        "label-overall-strategy": "Overall Strategy",
        "label-vantiq-int": "Vantiq Integration:",
        "label-llm-comp": "LLM Comparison",
        "label-req-artifacts": "Required Artifacts",
        "label-safety": "Safety & Guardrails",
        "label-interaction-diagram": "Agent Interaction Diagram",
        "label-orchestration": "Orchestration Pattern",
        "label-event-schemas": "Event Schemas",
        "label-producers": "Producers",
        "label-consumers": "Consumers",
        "label-event-flow": "Event Flow Diagram",
        "label-project-struct": "Project Structure",
        "label-event-defs": "Event Type Definitions",
        "label-demo-steps": "Demo Steps",
        "label-sim-events": "Simulated Events",
        "label-learning-obj": "Learning Objectives",
        "label-steps": "Steps",
        "label-outcome": "Expected Outcome",
        "label-arch-grade": "Architecture Grade",
        "label-audit-findings": "Audit Findings",
        "label-use-case-context": "Use Case Context",
        "label-feature-matrix": "Feature Comparison Matrix",
        "label-vantiq-differentiators": "Vantiq Differentiators",
        "label-objection-handling": "Objection Handling",
        "label-recommendation": "Recommendation",
        "th-from": "From",
        "th-to": "To",
        "th-protocol": "Protocol",
        "th-description": "Description",
        "th-model": "Model",
        "th-provider": "Provider",
        "th-best-for": "Best For",
        "th-context": "Context",
        "th-cost": "Cost",
        "th-vantiq-source": "Vantiq Source",
        "th-artifact": "Artifact",
        "th-type": "Type",
        "th-vantiq-resource": "Vantiq Resource",
        "th-producer": "Producer",
        "th-events": "Events",
        "th-frequency": "Frequency",
        "th-consumer": "Consumer",
        "th-subscribes": "Subscribes To",
        "th-action": "Action",
        "th-criterion": "Criterion",
        "li-input-val": "Input Validation",
        "li-output-val": "Output Validation",
        "li-hitl": "Human-in-the-Loop",
        "li-fallback": "Fallback Strategy",
        "label-recommended": "Recommended",
        "label-deployment": "Deployment",
        "label-hardware": "Hardware",
        "label-tools": "Tools",
        "label-inputs": "Inputs",
        "label-outputs": "Outputs",
        "label-pseudo-code": "Pseudo-Code",
        "label-api-endpoints": "API Endpoints:",
        "th-field": "Field",
        "label-edge": "Edge",
        "label-cloud": "Cloud",
        "label-hybrid": "Hybrid",
        "label-latency": "Latency",
        "label-ram": "RAM",
        "label-llm": "LLM",
        "label-input": "Input",
        "label-output": "Output",
        "label-expected": "Expected",
        "label-hint": "Hint",
        "label-issue": "Issue",
        "label-fix": "Fix",
        "label-best-for": "Best for",
        "label-pricing": "Pricing",
        "label-strengths": "Strengths",
        "label-weaknesses": "Weaknesses",
        "label-comp-gap": "Competitor gap",
        "type-alert": "Alert",
        "type-detection": "Detection",
        "type-telemetry": "Telemetry",
        "type-command": "Command",
        "type-domain": "Domain",
        "type-actor": "Actor",
        "type-entity": "Entity",
        "diff-beginner": "Beginner",
        "diff-intermediate": "Intermediate",
        "diff-advanced": "Advanced",
        "cost-low": "Low",
        "cost-medium": "Medium",
        "cost-high": "High",
        "sev-critical": "Critical",
        "sev-high": "High",
        "sev-medium": "Medium",
        "sev-low": "Low",
        "confirm-clear-history": "Are you sure you want to clear your entire session history? This cannot be undone.",
        "status-generating-pdf": "📄 Generating PDF Document...",
        "untitled-project": "Untitled AI Project",
        "prompt-rename": "Enter new project name:",
        "pdf-blueprint": "Architecture Blueprint",
        "pdf-problem-stmt": "Problem Statement:",
        "pdf-no-problem": "No problem statement provided.",
        "pdf-industry": "Industry Domain:",
        "pdf-summary": "System Summary:",
        "pdf-actors": "Primary Actors:",
        "pdf-entities": "Core Entities:",
        "pdf-data-sources": "Key Data Sources:",
        "pdf-principal-events": "Principal Events:",
        "pdf-ai-tasks": "AI / ML Tasks:",
        "pdf-vantiq-suitability": "Vantiq Suitability:",
        "pdf-sec-analysis": "1. Problem Analysis & Scope",
        "pdf-th-entity-name": "Entity / Type Name",
        "pdf-th-type-class": "Type classification",
        "pdf-th-props": "Properties",
        "pdf-vantiq-types": "Vantiq Types (Entities)",
        "pdf-th-event-name": "Event Name",
        "pdf-th-event-type": "Event Type",
        "pdf-th-payload": "Payload Structure",
        "pdf-event-streams": "Event Streams",
        "pdf-th-service-name": "Service Name",
        "pdf-th-resp": "Responsibility",
        "pdf-microservices": "Microservices",
        "pdf-sec-domain": "2. Domain Model",
        "pdf-th-comp": "Component",
        "pdf-th-tech": "Technologies",
        "pdf-arch-comps": "Architecture Components",
        "pdf-int-flows": "Integration Flows",
        "pdf-arch-principles": "Architecture Principles",
        "pdf-arch-review": "Architecture Review Findings:",
        "pdf-sec-arch": "3. System Architecture",
        "pdf-th-capability": "Capability",
        "pdf-th-models": "Recommended Models",
        "pdf-th-justification": "Justification",
        "pdf-sec-aimodels": "4. AI Model Recommendations",
        "pdf-infra-guardrails": "Infrastructure & Guardrails:",
        "pdf-sec-events": "5. Event System & Orchestration",
        "pdf-sec-agentic": "6. Agentic Alternative",
        "pdf-market-landscape": "Market Landscape:",
        "pdf-th-approach": "Competitor / Approach",
        "pdf-sec-compete": "7. Competitive Strategy",
        "pdf-comp-compare": "Competitive Comparison:",
        "pdf-vantiq-diff": "Vantiq Spark Differentiators:",
        "pdf-sec-roadmap": "8. Implementation Roadmap",
        "error-gen-failed": "Generation Failed",
        "error-pipeline-halted": "The pipeline was halted. Please check your model selection or API key permissions in Settings.",
        "example-prompt-wildfire": "Design a real-time wildfire detection system using drones and computer vision that can automatically alert emergency response teams when fires are detected in forest areas.",
        "example-prompt-hospital": "Design a real-time hospital patient deterioration detection system that monitors vital signs, predicts clinical deterioration, and alerts nursing staff before critical events occur.",
        "example-prompt-industrial": "Design a predictive maintenance system for industrial manufacturing equipment that uses vibration sensors, temperature monitors, and machine learning to predict equipment failures before they happen.",
        "example-prompt-traffic": "Design a smart traffic management system that uses cameras and sensors at intersections to optimize traffic signal timing, detect accidents, and reduce congestion in real-time.",
        "example-prompt-building": "Design a smart building energy optimization system that uses occupancy sensors, weather data, and HVAC controls to minimize energy consumption while maintaining comfort levels.",
        "reg-interpreter": "Agent 1 — Interpreter",
        "reg-domain": "Agent 2 — Domain",
        "reg-architecture": "Agent 3 — Architecture",
        "reg-aimodel": "Agent 4 — AI Models",
        "reg-agentic": "Agent 4b — Agentic Alt",
        "reg-events": "Agent 5 — Events",
        "reg-implementation": "Agent 6 — Implement",
        "reg-visualizer": "Agent 7 — Visualizer",
        "reg-demo": "Agent 8 — Demo",
        "reg-training": "Agent 9 — Training",
        "reg-competitive": "Agent 10 — Compete",
        "l-deal-snapshot": "Deal Snapshot",
        "l-pain-points": "Pain Points",
        "l-key-stakeholders": "Key Stakeholders",
        "l-current-state": "Current State",
        "l-why-hard": "Why Hard Without Vantiq",
        "l-qualifying-qs": "Qualifying Questions",
        "l-bounded-contexts": "Bounded Contexts",
        "l-event-flow-sum": "Event Flow Summary",
        "l-arch-insights": "Architecture Blueprint Insights",
        "l-scalability": "Scalability",
        "l-security": "Security Considerations",
        "l-deployment-topo": "Deployment",
        "l-latency-budget": "Latency Budget",
        "l-data-retention": "Data Retention Policy",
        "l-prerequisites": "PREREQUISITES",
        "l-testing-strategy": "TESTING",
        "l-deployment-notes": "Deployment Notes",
        "l-win-strategy": "Win Strategy",
        "l-roi-snapshot": "ROI Snapshot",
        "l-value-drivers": "Value Drivers",
        "l-risk-mitigations": "Risk Mitigations",
        "l-success-kpis": "Success KPIs",
        "l-in-scope": "In Scope",
        "l-out-of-scope": "Out of Scope",
        "l-success-metrics": "Success Metrics",
        "l-reused": "REUSED",
        "l-new": "NEW",
        "l-decision-points": "Key Decision Points",
        "l-strategic-value": "Strategic Value",
        "l-compt-adv": "Competitive Advantage",
        "l-exec-summary": "Executive Summary",
        "l-expected-return": "Expected Return",
        "l-payback-period": "Payback Period"
    },
    ko: {
        "app-subtitle": "솔루션 디자이너",
        "nav-assistant": "어시스턴트",
        "nav-usecase": "유스케이스 어시스턴트",
        "nav-design": "디자인",
        "nav-input": "문제 입력",
        "nav-usecasescope": "유스케이스 범위",
        "nav-phase2": "② 가치 평가",
        "nav-phase3": "③ 아키텍처",
        "nav-phase4": "④ AI 컨설팅",
        "nav-phase5": "⑤ 구현",
        "nav-phase6": "⑥ 확장",
        "nav-adjacent": "인접 유스케이스",
        "nav-roadmap": "로드맵",
        "nav-valuegrowth": "가치 성장",
        "nav-analysis": "세일즈 디스커버리",
        "nav-phase1": "① 디스커버리",
        "nav-domain": "도메인 모델",
        "nav-architecture": "아키텍처",
        "nav-architecture-tab": "아키텍처",
        "nav-aimodels": "AI 모델",
        "nav-agentic": "에이전틱 대안",
        "nav-events": "이벤트 시스템",
        "nav-build": "빌드",
        "nav-implementation": "구현",
        "nav-diagrams": "다이어그램",
        "nav-enablement": "활성화",
        "nav-demo": "데모 시나리오",
        "nav-training": "교육 랩",
        "nav-strategy": "전략",
        "nav-business": "비즈니스 가치",
        "nav-competitive": "경쟁 분석",
        "status-configure": "API 키 설정",
        "welcome-description": "문제를 설명하면 AI 에이전트가 전체 시스템 아키텍처, 구현 스캐폴딩, 데모 시나리오 및 교육 랩을 하나의 워크플로우로 생성합니다.",
        "problem-label": "문제 설명",
        "btn-generate": "솔루션 생성",
        "btn-clear": "지우기",
        "examples-label": "예시 시도",
        "chat-welcome-1": "안녕하세요! 저는 <strong>Vantiq 유스케이스 어시스턴트</strong>입니다. Vantiq 플랫폼에서 실시간 이벤트 기반 애플리케이션을 브레인스토밍하고 디자인하는 것을 도와드릴 수 있습니다.",
        "chat-welcome-2": "다음과 같이 질문해 보세요:",
        "chat-example-1": "Vantiq이 예측 유지보수에 어떻게 도움이 되나요?",
        "chat-example-2": "스마트 빌딩 에너지 최적화 시스템 설계",
        "chat-example-3": "실시간 비디오 분석을 지원하는 Vantiq 기능은 무엇인가요?",
        "history-title": "세션 기록",
        "history-subtitle": "이전 AI 생성 세션 재개",
        "settings-model": "모델",
        "settings-language": "언어",
        "btn-cancel": "취소",
        "btn-save": "설정 저장",
        "title-history": "세션 기록",
        "title-export": "PDF로 솔루션 내보내기",
        "title-settings": "설정",
        "step-interpreter": "해석기",
        "step-domain": "도메인",
        "step-architecture": "아키텍처",
        "step-aimodel": "AI 모델",
        "step-agentic": "에이전틱",
        "step-events": "이벤트",
        "step-implementation": "구현",
        "step-visualizer": "다이어그램",
        "step-demo": "데모",
        "step-training": "교육",
        "step-business": "가치",
        "step-competitive": "경쟁",
        "chat-title": "Vantiq 유스케이스 어시스턴트",
        "chat-subtitle": "유스케이스 아이디어 구상, 아키텍처 가이드 및 모범 사례를 위한 AI 기반 챗봇",
        "btn-clear-chat": "채팅 지우기",
        "chat-placeholder": "Vantiq 유스케이스, 아키텍처 등에 대해 문의하세요...",
        "btn-clear-all": "모두 지우기",
        "problem-placeholder": "실시간 AI 시스템 문제를 설명하세요...\n\n예: 드론과 컴퓨터 비전을 사용하여 소방 대원에게 자동으로 알림을 보낼 수 있는 실시간 산불 감지 시스템 설계.",
        "competitors-label": "비교할 경쟁사",
        "optional-label": "(선택 사항)",
        "competitors-placeholder": "예: AWS IoT, Azure IoT (자동 선택하려면 비워 두세요)",
        "example-wildfire": "산불 감지",
        "example-hospital": "병원 환자 악화",
        "example-industrial": "산업용 예측 유지보수",
        "example-traffic": "스마트 교통 관리",
        "example-building": "스마트 빌딩 에너지",
        "analysis-title": "문제 분석",
        "analysis-subtitle": "에이전트 1 — 문제 해석기 결과",
        "refine-placeholder": "이 단계 수정하기...",
        "btn-regenerate": "재생성",
        "coach-title": "AI 코치",
        "coach-btn": "AI 코치",
        "coach-placeholder": "이 섹션에 대해 질문하세요...",
        "domain-title": "도메인 모델",
        "domain-subtitle": "에이전트 2 — 엔티티 및 컨텍스트 매핑",
        "architecture-title": "시스템 아키텍처",
        "architecture-subtitle": "에이전트 3 — 청사진 및 인프라",
        "aimodels-title": "AI 모델",
        "aimodels-subtitle": "에이전트 4 — 모델 자문",
        "agentic-title": "에이전틱 대안",
        "agentic-subtitle": "에이전트 4b — LLM 에이전트 증강 가이드",
        "events-title": "이벤트 시스템",
        "events-subtitle": "에이전트 5 — 실시간 오케스트레이션",
        "implementation-title": "구현",
        "implementation-subtitle": "에이전트 6 — 리소스 및 코드 생성기",
        "diagrams-title": "다이어그램",
        "diagrams-subtitle": "에이전트 7 — 아키텍처 시각화",
        "demo-title": "데모 시나리오",
        "demo-subtitle": "에이전트 8 — 솔루션 내러티브 및 검증",
        "training-title": "교육 실습",
        "training-subtitle": "에이전트 9 — 교육 및 워크숍 가이드",
        "linter-title": "아키텍처 린터",
        "linter-subtitle": "에이전트 11 — Vantiq 베스트 프랙티스 감사",
        "competitive-title": "경쟁 전략",
        "competitive-subtitle": "에이전트 10 — 시장 분석 및 차별화 요소",
        "gen-main-status": "솔루션 생성 중...",
        "gen-starting": "파이프라인 시작 중...",
        "settings-title": "⚙️ AI 엔진 설정",
        "settings-key": "🔑 OpenAI API 키",
        "key-placeholder": "sk-...",
        "settings-key-note": "API 키는 이 브라우저 세션에만 저장되며 api.openai.com 이외의 장소로 전송되지 않습니다.",
        "model-recommended": "GPT-4.1 (권장)",
        "model-mini": "GPT-4.1 미니 (빠름)",
        "model-nano": "GPT-4.1 나노 (가장 빠름)",
        "model-capable": "GPT-5.4 (가장 유능함)",
        "model-reasoning": "추론",
        "lang-en": "영어",
        "lang-ko": "한국어",
        "lang-ja": "일본어",
        "lang-ar": "아랍어",
        "label-domain": "도메인",
        "label-core-problem": "핵심 문제",
        "label-actors": "행위자",
        "label-data-sources": "데이터 소스",
        "label-events": "이벤트",
        "label-ai-tasks": "AI 작업",
        "label-entities": "엔티티",
        "label-why-vantiq": "왜 Vantiq인가?",
        "label-services": "서비스",
        "label-commands": "명령",
        "label-arch-overview": "아키텍처 개요",
        "label-sys-components": "시스템 구성 요소",
        "label-int-points": "통합 포인트",
        "label-arch-diagram": "아키텍처 다이어그램",
        "label-overall-strategy": "전반적인 전략",
        "label-vantiq-int": "Vantiq 통합:",
        "label-llm-comp": "LLM 비교",
        "label-req-artifacts": "필요한 산출물",
        "label-safety": "안전 및 가드레일",
        "label-interaction-diagram": "에이전트 상호 작용 다이어그램",
        "label-orchestration": "오케스트레이션 패턴",
        "label-event-schemas": "이벤트 스키마",
        "label-producers": "생산자",
        "label-consumers": "소비자",
        "label-event-flow": "이벤트 흐름 다이어그램",
        "label-project-struct": "프로젝트 구조",
        "label-event-defs": "이벤트 유형 정의",
        "label-demo-steps": "데모 단계",
        "label-sim-events": "시뮬레이션된 이벤트",
        "label-learning-obj": "학습 목표",
        "label-steps": "단계",
        "label-outcome": "예상 결과",
        "label-arch-grade": "아키텍처 등급",
        "label-audit-findings": "감사 결과",
        "label-use-case-context": "유스케이스 맥락",
        "label-feature-matrix": "기능 비교 매트릭스",
        "label-vantiq-differentiators": "Vantiq 차별점",
        "label-objection-handling": "이의 제기 처리",
        "label-recommendation": "권장 사항",
        "th-from": "출발지",
        "th-to": "목적지",
        "th-protocol": "프로토콜",
        "th-description": "설명",
        "th-model": "모델",
        "th-provider": "제공자",
        "th-best-for": "적합 용도",
        "th-context": "컨텍스트",
        "th-cost": "비용",
        "th-vantiq-source": "Vantiq 소스",
        "th-artifact": "산출물",
        "th-type": "유형",
        "th-vantiq-resource": "Vantiq 리소스",
        "th-producer": "생산자",
        "th-events": "이벤트",
        "th-frequency": "빈도",
        "th-consumer": "소비자",
        "th-subscribes": "구독 대상",
        "th-action": "작업",
        "th-criterion": "기준",
        "li-input-val": "입력 유효성 검사",
        "li-output-val": "출력 유효성 검사",
        "li-hitl": "사람의 개입 (HITL)",
        "li-fallback": "대체 전략",
        "label-recommended": "권장됨",
        "label-deployment": "배포",
        "label-hardware": "하드웨어",
        "label-tools": "도구",
        "label-inputs": "입력",
        "label-outputs": "출력",
        "label-pseudo-code": "의사 코드",
        "label-api-endpoints": "API 엔드포인트:",
        "th-field": "필드",
        "label-edge": "엣지",
        "label-cloud": "클라우드",
        "label-hybrid": "하이브리드",
        "label-latency": "지연 시간",
        "label-ram": "RAM",
        "label-llm": "LLM",
        "label-input": "입력",
        "label-output": "출력",
        "label-expected": "예상 결과",
        "label-hint": "힌트",
        "label-issue": "문제",
        "label-fix": "해결책",
        "label-best-for": "최적 용도",
        "label-pricing": "가격 정책",
        "label-strengths": "강점",
        "label-weaknesses": "약점",
        "label-comp-gap": "경쟁사 격차",
        "type-alert": "알림",
        "type-detection": "감지",
        "type-telemetry": "텔레메트리",
        "type-command": "명령",
        "type-domain": "도메인",
        "type-actor": "행위자",
        "type-entity": "엔티티",
        "diff-beginner": "초급",
        "diff-intermediate": "중급",
        "diff-advanced": "고급",
        "cost-low": "낮음",
        "cost-medium": "중간",
        "cost-high": "높음",
        "sev-critical": "심각",
        "sev-high": "높음",
        "sev-medium": "중간",
        "sev-low": "낮음",
        "confirm-clear-history": "전체 세션 기록을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.",
        "status-generating-pdf": "📄 PDF 문서 생성 중...",
        "untitled-project": "제목 없는 AI 프로젝트",
        "prompt-rename": "새 프로젝트 이름을 입력하세요:",
        "pdf-blueprint": "아키텍처 설계도",
        "pdf-problem-stmt": "문제 설명:",
        "pdf-no-problem": "제공된 문제 설명이 없습니다.",
        "pdf-industry": "산업 도메인:",
        "pdf-summary": "시스템 요약:",
        "pdf-actors": "주요 행위자:",
        "pdf-entities": "핵심 엔티티:",
        "pdf-data-sources": "주요 데이터 소스:",
        "pdf-principal-events": "주요 이벤트:",
        "pdf-ai-tasks": "AI / ML 작업:",
        "pdf-vantiq-suitability": "Vantiq 적합성:",
        "pdf-sec-analysis": "1. 문제 분석 및 범위",
        "pdf-th-entity-name": "엔티티 / 유형 이름",
        "pdf-th-type-class": "유형 분류",
        "pdf-th-props": "속성",
        "pdf-vantiq-types": "Vantiq 유형 (엔티티)",
        "pdf-th-event-name": "이벤트 이름",
        "pdf-th-event-type": "이벤트 유형",
        "pdf-th-payload": "페이로드 구조",
        "pdf-event-streams": "이벤트 스트림",
        "pdf-th-service-name": "서비스 이름",
        "pdf-th-resp": "책임",
        "pdf-microservices": "마이크로서비스",
        "pdf-sec-domain": "2. 도메인 모델",
        "pdf-th-comp": "구성 요소",
        "pdf-th-tech": "기술",
        "pdf-arch-comps": "아키텍처 구성 요소",
        "pdf-int-flows": "통합 흐름",
        "pdf-arch-principles": "아키텍처 원칙",
        "pdf-arch-review": "아키텍처 검토 결과:",
        "pdf-sec-arch": "3. 시스템 아키텍처",
        "pdf-th-capability": "역량",
        "pdf-th-models": "권장 모델",
        "pdf-th-justification": "타당성",
        "pdf-sec-aimodels": "4. AI 모델 권장 사항",
        "pdf-infra-guardrails": "인프라 및 가드레일:",
        "pdf-sec-events": "5. 이벤트 시스템 및 오케스트레이션",
        "pdf-sec-agentic": "6. 에이전틱 대안 분석",
        "pdf-market-landscape": "시장 현황:",
        "pdf-th-approach": "경쟁사 / 접근 방식",
        "pdf-sec-compete": "7. 경쟁 전략",
        "pdf-comp-compare": "경쟁 비교:",
        "pdf-vantiq-diff": "Vantiq Spark 차별점:",
        "pdf-sec-roadmap": "8. 구현 로드맵",
        "error-gen-failed": "생성 실패",
        "error-pipeline-halted": "파이프라인이 중단되었습니다. 설정에서 모델 선택 또는 API 키 권한을 확인하십시오.",
        "example-prompt-wildfire": "드론과 컴퓨터 비전을 사용하여 산불이 감지되면 자동으로 비상 대응 팀에 알릴 수 있는 실시간 산불 감지 시스템을 설계하십시오.",
        "example-prompt-hospital": "활력 징후를 모니터링하고, 임상 악화를 예측하며, 심각한 사건이 발생하기 전에 간호 직원에게 알리는 실시간 병원 환자 상태 악화 감지 시스템을 설계하십시오.",
        "example-prompt-industrial": "진동 센서, 온도 모니터 및 머신 러닝을 사용하여 장비 고장이 발생하기 전에 예측하는 산업용 제조 장비의 예측 유지 보수 시스템을 설계하십시오.",
        "example-prompt-traffic": "교차로의 카메라와 센서를 사용하여 교통 신호 타이밍을 최적화하고, 사고를 감지하며, 실시간으로 혼잡을 줄이는 스마트 교통 관리 시스템을 설계하십시오.",
        "example-prompt-building": "점유 센서, 날씨 데이터 및 HVAC 제어를 사용하여 쾌적함을 유지하면서 에너지 소비를 최소화하는 스마트 빌딩 에너지 최적화 시스템을 설계하십시오.",
        "reg-interpreter": "에이전트 1 — 해석기",
        "reg-domain": "에이전트 2 — 도메인",
        "reg-architecture": "에이전트 3 — 아키텍처",
        "reg-aimodel": "에이전트 4 — AI 모델",
        "reg-agentic": "에이전트 4b — 에이전틱",
        "reg-events": "에이전트 5 — 이벤트",
        "reg-implementation": "에이전트 6 — 구현",
        "reg-visualizer": "에이전트 7 — 시각화",
        "reg-demo": "에이전트 8 — 데모",
        "reg-training": "에이전트 9 — 교육",
        "reg-competitive": "에이전트 10 — 경쟁",
        "label-orchestration": "오케스트레이션 패턴",
        "label-event-schemas": "이벤트 스키마",
        "label-producers": "생산자",
        "label-consumers": "소비자",
        "label-event-flow": "이벤트 흐름 다이어그램",
        "th-producer": "생산자",
        "th-events": "이벤트",
        "th-protocol": "프로토콜",
        "th-frequency": "빈도",
        "th-consumer": "소비자",
        "th-subscribes": "구독 대상",
        "th-action": "동작",
        "label-project-struct": "프로젝트 구조",
        "label-event-defs": "이벤트 정의",
        "label-pseudo-code": "의사 코드",
        "label-api-endpoints": "API 엔드포인트:",
        "l-deal-snapshot": "거래 요약",
        "l-pain-points": "문제점",
        "l-key-stakeholders": "핵심 이해관계자",
        "l-current-state": "현재 상태",
        "l-why-hard": "Vantiq 없이 어려운 이유",
        "l-qualifying-qs": "자격 검증 질문",
        "l-bounded-contexts": "제한된 컨텍스트",
        "l-event-flow-sum": "이벤트 흐름 요약",
        "l-arch-insights": "아키텍처 인사이트",
        "l-scalability": "확장성",
        "l-security": "보안 고려사항",
        "l-deployment-topo": "배포",
        "l-latency-budget": "지연 시간 예산",
        "l-data-retention": "데이터 보존 정책",
        "l-prerequisites": "필수 구성 요소",
        "l-testing-strategy": "테스트",
        "l-deployment-notes": "배포 참고 사항",
        "l-win-strategy": "승리 전략",
        "l-roi-snapshot": "ROI 스냅샷",
        "l-value-drivers": "가치 동인",
        "l-risk-mitigations": "위험 완화",
        "l-success-kpis": "성공 KPI",
        "l-in-scope": "범위 내",
        "l-out-of-scope": "범위 외",
        "l-success-metrics": "성공 지표",
        "l-reused": "재사용 됨",
        "l-new": "신규",
        "l-decision-points": "주요 결정 지점",
        "l-strategic-value": "전략적 가치",
        "l-compt-adv": "경쟁 우위",
        "l-exec-summary": "요약 보고서",
        "l-expected-return": "기대 수익",
        "l-payback-period": "투자 회수 기간"
    },
    ja: {
        "app-subtitle": "ソリューションデザイナー",
        "nav-assistant": "アシスタント",
        "nav-usecase": "ユースケースアシスタント",
        "nav-design": "デザイン",
        "nav-input": "問題入力",
        "nav-usecasescope": "ユースケース範囲",
        "nav-phase2": "② 価値評価",
        "nav-phase3": "③ アーキテクチャ",
        "nav-phase4": "④ AIコンサルティング",
        "nav-phase5": "⑤ 実装",
        "nav-phase6": "⑥ 拡張",
        "nav-adjacent": "隣接するユースケース",
        "nav-roadmap": "ロードマップ",
        "nav-valuegrowth": "価値の成長",
        "nav-analysis": "セールスディスカバリー",
        "nav-phase1": "① ディスカバリー",
        "nav-domain": "ドメインモデル",
        "nav-architecture": "アーキテクチャ",
        "nav-architecture-tab": "アーキテクチャ",
        "nav-aimodels": "AIモデル",
        "nav-agentic": "エージェント代替案",
        "nav-events": "イベントシステム",
        "nav-build": "ビルド",
        "nav-implementation": "実装",
        "nav-diagrams": "図面",
        "nav-enablement": "イネーブルメント",
        "nav-demo": "デモシナリオ",
        "nav-training": "トレーニングラボ",
        "nav-strategy": "戦略",
        "nav-business": "ビジネス価値",
        "nav-competitive": "競合分析",
        "status-configure": "APIキーを設定",
        "welcome-description": "問題を説明すると、AIエージェントが完全なシステムアーキテクチャ、実装スキャフォールディング、デモシナリオ、トレーニングラボを1つのワークフローで生成します。",
        "problem-label": "問題の説明",
        "btn-generate": "ソリューションを生成",
        "btn-clear": "クリア",
        "examples-label": "例を試す",
        "chat-welcome-1": "こんにちは！私は <strong>Vantiqユースケースアシスタント</strong>です。Vantiqプラットフォームでのリアルタイムなイベント駆動型アプリケーションのブレインストーミングと設計をお手伝いします。",
        "chat-welcome-2": "次のように聞いてみてください：",
        "chat-example-1": "Vantiqは予兆保全にどのように役立ちますか？",
        "chat-example-2": "スマートビルのエネルギー最適化システムを設計して",
        "chat-example-3": "リアルタイムビデオ分析をサポートするVantiqの機能は何ですか？",
        "history-title": "セッション履歴",
        "history-subtitle": "以前のAI生成セッションを再開",
        "settings-model": "モデル",
        "settings-language": "言語",
        "btn-cancel": "キャンセル",
        "btn-save": "設定を保存",
        "label-default": "デフォルト",
        "history-empty": "履歴はありません。",
        "title-history": "セッション履歴",
        "title-export": "ソリューションをPDFで書き出す",
        "title-settings": "設定",
        "step-interpreter": "解釈",
        "step-domain": "ドメイン",
        "step-architecture": "構成",
        "step-aimodel": "AIモデル",
        "step-agentic": "エージェント",
        "step-events": "イベント",
        "step-implementation": "実装",
        "step-visualizer": "図面",
        "step-demo": "デモ",
        "step-training": "トレーニング",
        "step-business": "価値",
        "step-competitive": "競合",
        "chat-title": "Vantiqユースケースアシスタント",
        "chat-subtitle": "Vantiqのユースケース、アーキテクチャ、ベストプラクティスに関するAIチャットボット",
        "btn-clear-chat": "チャットをクリア",
        "chat-placeholder": "Vantiqのユースケース、アーキテクチャについて質問する...",
        "btn-clear-all": "すべてクリア",
        "problem-placeholder": "リアルタイムAIシステムの問題を説明してください...\n\n例：ドローンとコンピュータビジョンを使用して自動的に消防隊に通知するリアルタイム森林火災検知システムを設計する。",
        "competitors-label": "比較する競合他社",
        "optional-label": "（任意）",
        "competitors-placeholder": "例：AWS IoT, Azure IoT (自動選択する場合は空欄)",
        "example-wildfire": "火災検知",
        "example-hospital": "病院の病状悪化",
        "example-industrial": "産業用予兆保全",
        "example-traffic": "スマート交通管理",
        "example-building": "スマートビルエネルギー",
        "analysis-title": "問題分析",
        "analysis-subtitle": "エージェント 1 — 問題解釈出力",
        "refine-placeholder": "このフェーズを洗練させる...",
        "btn-regenerate": "再生成",
        "coach-title": "AIコーチ",
        "coach-btn": "AIコーチ",
        "coach-placeholder": "このセクションについて質問...",
        "domain-title": "ドメインモデル",
        "domain-subtitle": "エージェント 2 — エンティティ & コンテキストマッピング",
        "architecture-title": "システム構成",
        "architecture-subtitle": "エージェント 3 — 設計図 & インフラ",
        "aimodels-title": "AIモデル",
        "aimodels-subtitle": "エージェント 4 — モデルの助言",
        "agentic-title": "エージェント代替案",
        "agentic-subtitle": "エージェント 4b — LLMエージェント拡張ガイド",
        "events-title": "イベントシステム",
        "events-subtitle": "エージェント 5 — リアルタイムオーケストレーション",
        "implementation-title": "実装",
        "implementation-subtitle": "エージェント 6 — リソース & コード生成",
        "diagrams-title": "図面",
        "diagrams-subtitle": "エージェント 7 — アーキテクチャ可視化",
        "demo-title": "デモシナリオ",
        "demo-subtitle": "エージェント 8 — ソリューションナラティブ & 検証",
        "training-title": "トレーニングラボ",
        "training-subtitle": "エージェント 9 — 教育 & ワークショップガイド",
        "linter-title": "アーキテクトリンター",
        "linter-subtitle": "エージェント 11 — Vantiqベストプラクティス監査",
        "competitive-title": "競合戦略",
        "competitive-subtitle": "エージェント 10 — 市場分析 & 差別化要因",
        "gen-main-status": "ソリューションを生成中...",
        "gen-starting": "パイプラインを開始中...",
        "settings-title": "⚙️ AIエンジン設定",
        "settings-key": "🔑 OpenAI APIキー",
        "key-placeholder": "sk-...",
        "settings-key-note": "APIキーはこのブラウザセッションにのみ保存され、api.openai.com以外には送信されません。",
        "model-recommended": "GPT-4.1 (推奨)",
        "model-mini": "GPT-4.1 Mini (高速)",
        "model-nano": "GPT-4.1 Nano (最速)",
        "model-capable": "GPT-5.4 (最高性能)",
        "model-reasoning": "推論",
        "lang-en": "英語",
        "lang-ko": "韓国語",
        "lang-ja": "日本語",
        "lang-ar": "アラビア語",
        "label-domain": "ドメイン",
        "label-core-problem": "核心的な課題",
        "label-actors": "アクター",
        "label-data-sources": "データソース",
        "label-events": "イベント",
        "label-ai-tasks": "AIタスク",
        "label-entities": "エンティティ",
        "label-why-vantiq": "なぜVantiqなのか？",
        "label-services": "サービス",
        "label-commands": "コマンド",
        "label-arch-overview": "アーキテクチャの概要",
        "label-sys-components": "システムコンポーネント",
        "label-int-points": "統合ポイント",
        "label-arch-diagram": "アーキテクチャ図",
        "label-overall-strategy": "全体戦略",
        "label-vantiq-int": "Vantiq統合:",
        "label-llm-comp": "LLM比較",
        "label-req-artifacts": "必要なアーティファクト",
        "label-safety": "安全とガードレール",
        "label-interaction-diagram": "エージェント相互作用図",
        "label-orchestration": "オーケストレーションパターン",
        "label-event-schemas": "イベントスキーマ",
        "label-producers": "プロデューサー",
        "label-consumers": "コンシューマー",
        "label-event-flow": "イベントフロー図",
        "label-project-struct": "プロジェクト構造",
        "label-event-defs": "イベント型定義",
        "label-demo-steps": "デモステップ",
        "label-sim-events": "シミュレーションイベント",
        "label-learning-obj": "学習目標",
        "label-steps": "ステップ",
        "label-outcome": "期待される成果",
        "label-arch-grade": "アーキテクチャグレード",
        "label-audit-findings": "監査結果",
        "label-use-case-context": "ユースケースコンテキスト",
        "label-feature-matrix": "機能比較マトリックス",
        "label-vantiq-differentiators": "Vantiqの差別化要因",
        "label-objection-handling": "反論処理",
        "label-recommendation": "推奨事項",
        "th-from": "送信元",
        "th-to": "送信先",
        "th-protocol": "プロトコル",
        "th-description": "説明",
        "th-model": "モデル",
        "th-provider": "プロバイダー",
        "th-best-for": "用途",
        "th-context": "コンテキスト",
        "th-cost": "コスト",
        "th-vantiq-source": "Vantiqソース",
        "th-artifact": "成果物",
        "th-type": "種類",
        "th-vantiq-resource": "Vantiqリソース",
        "th-producer": "プロデューサー",
        "th-events": "イベント",
        "th-frequency": "頻度",
        "th-consumer": "コンシューマー",
        "th-subscribes": "購読先",
        "th-action": "アクション",
        "th-criterion": "基準",
        "li-input-val": "入力検証",
        "li-output-val": "出力検証",
        "li-hitl": "人の介入 (HITL)",
        "li-fallback": "フォールバック戦略",
        "label-recommended": "推奨",
        "label-deployment": "デプロイメント",
        "label-hardware": "ハードウェア",
        "label-tools": "ツール",
        "label-inputs": "入力",
        "label-outputs": "出力",
        "label-pseudo-code": "疑似コード",
        "label-api-endpoints": "APIエンドポイント:",
        "th-field": "フィールド",
        "confirm-clear-history": "セッション履歴をすべて削除してもよろしいですか？この操作は取り消せません。",
        "status-generating-pdf": "📄 PDFドキュメントを生成中...",
        "untitled-project": "無題のAIプロジェクト",
        "prompt-rename": "新しいプロジェクト名を入力してください:",
        "pdf-blueprint": "アーキテクチャ設計図",
        "pdf-problem-stmt": "問題の説明:",
        "pdf-no-problem": "問題の説明が提供されていません。",
        "pdf-industry": "産業ドメイン:",
        "pdf-summary": "システム概要:",
        "pdf-actors": "主要アクター:",
        "pdf-entities": "コアエンティティ:",
        "pdf-data-sources": "主要データソース:",
        "pdf-principal-events": "主要イベント:",
        "pdf-ai-tasks": "AI / MLタスク:",
        "pdf-vantiq-suitability": "Vantiqの適合性:",
        "pdf-sec-analysis": "1. 問題分析とスコープ",
        "pdf-th-entity-name": "エンティティ / 型名",
        "pdf-th-type-class": "型分類",
        "pdf-th-props": "プロパティ",
        "pdf-vantiq-types": "Vantiq型 (エンティティ)",
        "pdf-th-event-name": "イベント名",
        "pdf-th-event-type": "イベント型",
        "pdf-th-payload": "ペイロード構造",
        "pdf-event-streams": "イベントストリーム",
        "pdf-th-service-name": "サービス名",
        "pdf-th-resp": "責任",
        "pdf-microservices": "マイクロサービス",
        "pdf-sec-domain": "2. ドメインモデル",
        "pdf-th-comp": "コンポーネント",
        "pdf-th-tech": "技術",
        "pdf-arch-comps": "アーキテクチャコンポーネント",
        "pdf-int-flows": "統合フロー",
        "pdf-arch-principles": "アーキテクチャ原則",
        "pdf-arch-review": "アーキテクチャレビューの結果:",
        "pdf-sec-arch": "3. システムアーキテクチャ",
        "pdf-th-capability": "機能",
        "pdf-th-models": "推奨モデル",
        "pdf-th-justification": "正当性",
        "pdf-sec-aimodels": "4. AIモデル推奨事項",
        "pdf-infra-guardrails": "インフラとガードレール:",
        "pdf-sec-events": "5. イベントシステムとオーケストレーション",
        "pdf-sec-agentic": "6. エージェント代替分析",
        "pdf-market-landscape": "市場環境:",
        "pdf-th-approach": "競合 / アプローチ",
        "pdf-sec-compete": "7. 競争戦略",
        "pdf-comp-compare": "競合比較:",
        "pdf-vantiq-diff": "Vantiq Sparkの差別化要因:",
        "pdf-sec-roadmap": "8. 実装ロードマップ",
        "error-gen-failed": "生成に失敗しました",
        "error-pipeline-halted": "パイプラインが停止しました。設定からモデルの選択またはAPIキーの権限を確認してください。",
        "example-prompt-wildfire": "ドローンとコンピュータビジョンを使用して、森林エリアで火災が検出されたときに緊急対応チームに自動的に通知するリアルタイム森林火災検知システムを設計する。",
        "example-prompt-hospital": "バイタルサインを監視し、臨床的な悪化を予測し、重大なイベントが発生する前に看護スタッフに通知するリアルタイム病院患者悪化検知システムを設計する。",
        "example-prompt-industrial": "振動センサー、温度モニター、機械学習を使用して、故障が発生する前に機器の故障を予測する産業用製造機器の予兆保全システムを設計する。",
        "example-prompt-traffic": "交差点のカメラとセンサーを使用して交通信号のタイミングを最適化し、事故を検出し、リアルタイムで渋滞を緩和するスマート交通管理システムを設計する。",
        "example-prompt-building": "占有センサー、気象データ、空調制御を使用して、快適性を維持しながらエネルギー消費を最小限に抑えるスマートビルエネルギー最適化システムを設計する。",
        "reg-interpreter": "エージェント 1 — 解釈",
        "reg-domain": "エージェント 2 — ドメイン",
        "reg-architecture": "エージェント 3 — 構成",
        "reg-aimodel": "エージェント 4 — AIモデル",
        "reg-agentic": "エージェント 4b — エージェント",
        "reg-events": "エージェント 5 — イベント",
        "reg-implementation": "エージェント 6 — 実装",
        "reg-visualizer": "エージェント 7 — 図面",
        "reg-demo": "エージェント 8 — デモ",
        "reg-training": "エージェント 9 — トレーニング",
        "reg-competitive": "エージェント 10 — 競合",
        "label-orchestration": "オーケストレーション パターン",
        "label-event-schemas": "イベント スキーマ",
        "label-producers": "プロデューサー",
        "label-consumers": "コンシューマー",
        "label-event-flow": "イベント フロー図",
        "th-producer": "プロデューサー",
        "th-events": "イベント",
        "th-protocol": "プロトコル",
        "th-frequency": "頻度",
        "th-consumer": "コンシューマー",
        "th-subscribes": "サブスクライブ先",
        "th-action": "アクション",
        "label-project-struct": "プロジェクト構造",
        "label-event-defs": "イベント定義",
        "label-pseudo-code": "擬似コード",
        "label-api-endpoints": "API エンドポイント:",
        "l-deal-snapshot": "取引の概要",
        "l-pain-points": "課題点",
        "l-key-stakeholders": "主要な関係者",
        "l-current-state": "現状",
        "l-why-hard": "Vantiqなしで困難な理由",
        "l-qualifying-qs": "適格性確認の質問",
        "l-bounded-contexts": "境界付きコンテキスト",
        "l-event-flow-sum": "イベントフローの概要",
        "l-arch-insights": "アーキテクチャの洞察",
        "l-scalability": "拡張性",
        "l-security": "セキュリティの考慮事項",
        "l-deployment-topo": "デプロイメント",
        "l-latency-budget": "レイテンシの予算",
        "l-data-retention": "データ保持ポリシー",
        "l-prerequisites": "前提条件",
        "l-testing-strategy": "テスト",
        "l-deployment-notes": "デプロイメントのメモ",
        "l-win-strategy": "勝利戦略",
        "l-roi-snapshot": "ROIの概要",
        "l-value-drivers": "価値の推進要因",
        "l-risk-mitigations": "リスクの軽減",
        "l-success-kpis": "成功のKPI",
        "l-in-scope": "スコープ内",
        "l-out-of-scope": "スコープ外",
        "l-success-metrics": "成功の指標",
        "l-reused": "再利用",
        "l-new": "新規",
        "l-decision-points": "重要な決定ポイント",
        "l-strategic-value": "戦略的価値",
        "l-compt-adv": "競争上の優位性",
        "l-exec-summary": "エグゼクティブサマリー",
        "l-expected-return": "期待リターン",
        "l-payback-period": "回収期間"
    },
    ar: {
        "app-subtitle": "مصمم الحلول",
        "nav-assistant": "المساعد",
        "nav-usecase": "مساعد حالات الاستخدام",
        "nav-design": "التصميم",
        "nav-input": "مدخلات المشكلة",
        "nav-usecasescope": "نطاق حالة الاستخدام",
        "nav-phase2": "② تقييم القيمة",
        "nav-phase3": "③ البنية التحتية",
        "nav-phase4": "④ استشارات الذكاء الاصطناعي",
        "nav-phase5": "⑤ التنفيذ",
        "nav-phase6": "⑥ التوسع",
        "nav-adjacent": "حالات الاستخدام المجاورة",
        "nav-roadmap": "خارطة الطريق",
        "nav-valuegrowth": "نمو القيمة",
        "nav-analysis": "استكشاف المبيعات",
        "nav-phase1": "① الاستكشاف",
        "nav-domain": "نموذج النطاق",
        "nav-architecture": "البنية التحتية",
        "nav-architecture-tab": "البنية",
        "nav-aimodels": "نماذج الذكاء الاصطناعي",
        "nav-agentic": "البديل الوكيلي (Agentic Alternative)",
        "nav-events": "نظام الأحداث",
        "nav-build": "البناء",
        "nav-implementation": "التنفيذ",
        "nav-diagrams": "المخططات",
        "nav-enablement": "التمكين",
        "nav-demo": "سيناريوهات العرض",
        "nav-training": "مختبرات التدريب",
        "nav-strategy": "الاستراتيجية",
        "nav-competitive": "التحليل التنافسي",
        "status-configure": "تكوين مفتاح API",
        "welcome-description": "صف مشكلتك وسيقوم وكلاء الذكاء الاصطناعي لدينا بإنشاء بنية نظام كاملة، وهياكل تنفيذ، وسيناريوهات عرض، ومختبرات تدريب - كل ذلك في سير عمل واحد.",
        "problem-label": "وصف المشكلة",
        "btn-generate": "إنشاء الحل",
        "btn-clear": "مسح",
        "examples-label": "جرب مثالاً",
        "chat-welcome-1": "مرحباً! أنا **مساعد حالات استخدام فانتيك**. يمكنني مساعدتك في العصف الذهني وتصميم تطبيقات تعتمد على الأحداث في الوقت الفعلي على منصة فانتيك.",
        "chat-welcome-2": "حاول سؤالي عن أشياء مثل:",
        "chat-example-1": "كيف يمكن لـ فانتيك المساعدة في الصيانة التنبؤية؟",
        "chat-example-2": "تصميم نظام تحسين طاقة المباني الذكية",
        "chat-example-3": "ما هي ميزات فانتيك التي تدعم تحليلات الفيديو في الوقت الفعلي؟",
        "history-title": "سجل الجلسات",
        "history-subtitle": "استئناف جلسات الإنشاء السابقة",
        "settings-model": "النموذج",
        "settings-language": "اللغة",
        "btn-cancel": "إلغاء",
        "btn-save": "حفظ الإعدادات",
        "title-history": "سجل الجلسات",
        "title-export": "تصدير الحل إلى PDF",
        "title-settings": "الإعدادات",
        "step-interpreter": "المفسر",
        "step-domain": "النطاق",
        "step-architecture": "البنية",
        "step-aimodel": "النماذج",
        "step-agentic": "الوكيل",
        "step-events": "الأحداث",
        "step-implementation": "التنفيذ",
        "step-visualizer": "المخططات",
        "step-demo": "العرض",
        "step-training": "التدريب",
        "step-business": "القيمة",
        "step-competitive": "المنافسة",
        "chat-title": "مساعد حالات استخدام فانتيك",
        "chat-subtitle": "روبوت دردشة ذكاء اصطناعي لأفكار حالات الاستخدام وإرشادات الهندسة المعمارية",
        "btn-clear-chat": "مسح المحادثة",
        "chat-placeholder": "اسأل عن حالات استخدام فانتيك، الهندسة المعمارية...",
        "btn-clear-all": "مسح الكل",
        "problem-placeholder": "صف مشكلة نظام الذكاء الاصطناعي في الوقت الفعلي...\n\nمثال: تصميم نظام للكشف عن حرائق الغابات باستخدام الطائرات بدون طيار ورؤية الكمبيوتر.",
        "competitors-label": "المنافسون للمقارنة",
        "optional-label": "(اختياري)",
        "competitors-placeholder": "مثال: AWS IoT، Azure IoT (اتركه فارغاً للاختيار التلقائي)",
        "example-wildfire": "🔥 الكشف عن حرائق الغابات",
        "example-hospital": "🏥 تدهور حالة مرضى المستشفى",
        "example-industrial": "🏭 مراقبة المعدات الصناعية",
        "example-traffic": "🚗 الإدارة الذكية لحركة المرور",
        "example-building": "🏢 تحسين طاقة المباني الذكية",
        "analysis-title": "تحليل المشكلة",
        "analysis-subtitle": "الوكيل 1 — مخرجات مفسر المشكلة",
        "refine-placeholder": "تحسين هذه المرحلة...",
        "btn-regenerate": "إعادة الإنشاء",
        "domain-title": "نموذج النطاق",
        "domain-subtitle": "الوكيل 2 — مخرجات منشئ نموذج النطاق",
        "arch-title": "بنية النظام",
        "arch-subtitle": "الوكيل 3 — مخرجات منشئ البنية",
        "aimodels-title": "توصيات نماذج الذكاء الاصطناعي",
        "aimodels-subtitle": "الوكيل 4 — مخرجات مستشار نماذج الذكاء الاصطناعي",
        "agentic-title": "البديل الوكيلي",
        "agentic-subtitle": "الوكيل 4ب — دليل تعزيز النماذج الوكيلة (LLMs)",
        "events-title": "تصميم نظام الأحداث",
        "events-subtitle": "الوكيل 5 — مخرجات مصمم نظام الأحداث",
        "impl-title": "هياكل التنفيذ",
        "impl-subtitle": "الوكيل 6 — مخرجات منشئ التنفيذ",
        "diagrams-title": "مخططات الهندسة المعمارية",
        "diagrams-subtitle": "الوكيل 7 — مخرجات مصور الهندسة المعمارية",
        "demo-title": "سيناريوهات العرض",
        "demo-subtitle": "الوكيل 8 — مخرجات منشئ سيناريوهات العرض",
        "training-title": "مختبرات التدريب",
        "training-subtitle": "الوكيل 9 — مخرجات منشئ مختبر التدريب",
        "competitive-title": "التحليل التنافسي",
        "competitive-subtitle": "الوكيل 10 — مخرجات الاستخبارات التنافسية",
        "gen-main-status": "جاري إنشاء الحل...",
        "gen-starting": "جاري بدء خط الأنابيب...",
        "settings-title": "⚙️ إعدادات محرك الذكاء الاصطناعي",
        "settings-key": "🔑 مفتاح OpenAI API",
        "key-placeholder": "sk-...",
        "settings-key-note": "يتم تخزين مفتاح API الخاص بك فقط في جلسة المتصفح هذه ولا يتم إرساله أبداً إلى أي مكان باستثناء api.openai.com.",
        "model-recommended": "GPT-4.1 (موصى به)",
        "model-mini": "GPT-4.1 Mini (أسرع)",
        "model-nano": "GPT-4.1 Nano (الأسرع)",
        "model-capable": "GPT-5.4 (الأكثر قدرة)",
        "model-reasoning": "التفكير الاستنتاجي",
        "lang-en": "الإنجليزية",
        "lang-ko": "الكورية",
        "lang-ja": "اليابانية",
        "lang-ar": "العربية",
        "label-default": "الافتراضي",
        "history-empty": "لم يتم العثور على سجل.",
        "coach-title": "مدرب الذكاء الاصطناعي",
        "coach-btn": "مدرب الذكاء الاصطناعي",
        "coach-placeholder": "اسأل عن هذا القسم...",
        "chat-welcome-1": "مرحباً! أنا <strong>مساعد حالات استخدام فانتيك</strong>. يمكنني مساعدتك في العصف الذهني وتصميم تطبيقات تعتمد على الأحداث في الوقت الفعلي على منصة فانتيك.",
        "chat-welcome-2": "جرب سؤالي عن أشياء مثل:",
        "chat-example-1": "كيف يمكن لفانتيك المساعدة في الصيانة التنبؤية؟",
        "chat-example-2": "تصميم نظام لتحسين طاقة المباني الذكية",
        "chat-example-3": "ما هي ميزات فانتيك التي تدعم تحليلات الفيديو في الوقت الفعلي؟",
        "btn-clear": "مسح",
        "label-domain": "النطاق",
        "label-core-problem": "المشكلة الجوهرية",
        "label-actors": "جهات الاتصال",
        "label-data-sources": "مصادر البيانات",
        "label-events": "الأحداث",
        "label-ai-tasks": "مهام الذكاء الاصطناعي",
        "label-entities": "الكيانات",
        "label-why-vantiq": "لماذا فانتيك؟",
        "label-services": "الخدمات",
        "label-commands": "الأوامر",
        "label-arch-overview": "نظرة عامة على البنية",
        "label-sys-components": "مكونات النظام",
        "label-int-points": "نقاط التكامل",
        "label-arch-diagram": "مخطط البنية",
        "label-overall-strategy": "الاستراتيجية العامة",
        "label-vantiq-int": "تكامل فانتيك:",
        "label-llm-comp": "مقارنة نماذج اللغة Large",
        "label-req-artifacts": "النماذج المطلوبة",
        "label-safety": "الأمان والقواعد",
        "label-interaction-diagram": "مخطط تفاعل الوكلاء",
        "label-orchestration": "نمط التنسيق",
        "label-event-schemas": "مخططات الأحداث",
        "label-producers": "المنتجون",
        "label-consumers": "المستهلكون",
        "label-event-flow": "مخطط تدفق الأحداث",
        "label-project-struct": "هيكل المشروع",
        "label-event-defs": "تعريفات أنواع الأحداث",
        "label-demo-steps": "خطوات العرض",
        "label-sim-events": "الأحداث المحاكية",
        "label-learning-obj": "أهداف التعلم",
        "label-steps": "الخطوات",
        "label-outcome": "النتيجة المتوقعة",
        "label-arch-grade": "درجة البنية",
        "label-audit-findings": "نتائج التدقيق",
        "label-use-case-context": "سياق حالة الاستخدام",
        "label-feature-matrix": "مصفوفة مقارنة المميزات",
        "label-vantiq-differentiators": "مميزات فانتيك التنافسية",
        "label-objection-handling": "التعامل مع الاعتراضات",
        "label-recommendation": "التوصية",
        "th-from": "من",
        "th-to": "إلى",
        "th-protocol": "البروتوكول",
        "th-description": "الوصف",
        "th-model": "النموذج",
        "th-provider": "المزود",
        "th-best-for": "الأفضل لـ",
        "th-context": "السياق",
        "th-cost": "التكلفة",
        "th-vantiq-source": "مصدر فانتيك",
        "th-artifact": "المخرج",
        "th-type": "النوع",
        "th-vantiq-resource": "مورد فانتيك",
        "th-producer": "المنتج",
        "th-events": "الأحداث",
        "th-frequency": "التكرار",
        "th-consumer": "المستهلك",
        "th-subscribes": "يشترك في",
        "th-action": "الإجراء",
        "th-criterion": "المعيار",
        "li-input-val": "التحقق من المدخلات",
        "li-output-val": "التحقق من المخرجات",
        "li-hitl": "التدخل البشري",
        "li-fallback": "استراتيجية التراجع",
        "label-recommended": "موصى به",
        "label-deployment": "النشر",
        "label-hardware": "الأجهزة",
        "label-tools": "الأدوات",
        "label-inputs": "المدخلات",
        "label-outputs": "المخرجات",
        "label-pseudo-code": "كود تجريبي",
        "label-api-endpoints": "نقاط نهاية API:",
        "th-field": "الحقل",
        "label-edge": "الحافة",
        "label-cloud": "السحابة",
        "label-hybrid": "هجين",
        "label-latency": "زمن التأخير",
        "label-ram": "ذاكرة الوصول العشوائي",
        "label-llm": "نموذج لغوي كبير",
        "label-input": "المدخلات",
        "label-output": "المخرجات",
        "label-expected": "النتيجة المتوقعة",
        "label-hint": "تلميح",
        "label-issue": "المشكلة",
        "label-fix": "الإصلاح",
        "label-best-for": "الأفضل لـ",
        "label-pricing": "التسعير",
        "label-strengths": "نقاط القوة",
        "label-weaknesses": "نقاط الضعف",
        "label-comp-gap": "فجوة المنافسين",
        "type-alert": "تنبيه",
        "type-detection": "كشف",
        "type-telemetry": "تتبع عن بعد",
        "type-command": "أمر",
        "type-domain": "نطاق",
        "type-actor": "جهة فاعلة",
        "type-entity": "كيان",
        "diff-beginner": "مبتدئ",
        "diff-intermediate": "متوسط",
        "diff-advanced": "متقدم",
        "cost-low": "منخفض",
        "cost-medium": "متوسط",
        "cost-high": "مرتفع",
        "sev-critical": "حرج",
        "sev-high": "مرتفع",
        "sev-medium": "متوسط",
        "sev-low": "منخفض",
        "confirm-clear-history": "هل أنت متأكد أنك تريد مسح سجل الجلسات بالكامل؟ لا يمكن التراجع عن هذا الإجراء.",
        "status-generating-pdf": "📄 جاري إنشاء مستند PDF...",
        "untitled-project": "مشروع ذكاء اصطناعي بدون عنوان",
        "prompt-rename": "أدخل اسم المشروع الجديد:",
        "pdf-blueprint": "مخطط الهندسة المعمارية",
        "pdf-problem-stmt": "بيان المشكلة:",
        "pdf-no-problem": "لم يتم تقديم بيان للمشكلة.",
        "pdf-industry": "نطاق الصناعة:",
        "pdf-summary": "ملخص النظام:",
        "pdf-actors": "الأطراف الرئيسية:",
        "pdf-entities": "الكيانات الجوهرية:",
        "pdf-data-sources": "مصادر البيانات الرئيسية:",
        "pdf-principal-events": "الأحداث الرئيسية:",
        "pdf-ai-tasks": "مهام الذكاء الاصطناعي:",
        "pdf-vantiq-suitability": "ملاءمة فانتيك:",
        "pdf-sec-analysis": "1. تحليل المشكلة والنطاق",
        "pdf-th-entity-name": "اسم الكيان / النوع",
        "pdf-th-type-class": "تصنيف النوع",
        "pdf-th-props": "الخصائص",
        "pdf-vantiq-types": "أنواع فانتيك (الكيانات)",
        "pdf-th-event-name": "اسم الحدث",
        "pdf-th-event-type": "نوع الحدث",
        "pdf-th-payload": "هيكل البيانات",
        "pdf-event-streams": "تدفقات الأحداث",
        "pdf-th-service-name": "اسم الخدمة",
        "pdf-th-resp": "المسؤولية",
        "pdf-microservices": "الخدمات المصغرة",
        "pdf-sec-domain": "2. نموذج النطاق",
        "pdf-th-comp": "المكون",
        "pdf-th-tech": "التقنيات",
        "pdf-arch-comps": "مكونات الهندسة المعمارية",
        "pdf-int-flows": "تدفقات التكامل",
        "pdf-arch-principles": "مبادئ الهندسة المعمارية",
        "pdf-arch-review": "نتائج مراجعة الهندسة المعمارية:",
        "pdf-sec-arch": "3. بنية النظام",
        "pdf-th-capability": "القدرة",
        "pdf-th-models": "النماذج الموصى بها",
        "pdf-th-justification": "التبرير",
        "pdf-sec-aimodels": "4. توصيات نماذج الذكاء الاصطناعي",
        "pdf-infra-guardrails": "البنية التحتية والقواعد:",
        "pdf-sec-events": "5. نظام الأحداث والتنسيق",
        "pdf-sec-agentic": "6. تحليل البديل الوكيلي (Agentic Alternative)",
        "pdf-market-landscape": "مشهد السوق:",
        "pdf-th-approach": "المنافس / النهج",
        "pdf-sec-compete": "7. الاستراتيجية التنافسية",
        "pdf-comp-compare": "المقارنة التنافسية:",
        "pdf-vantiq-diff": "مميزات فانتيك سبارك التنافسية:",
        "pdf-sec-roadmap": "8. خارطة طريق التنفيذ",
        "error-gen-failed": "فشل الإنشاء",
        "error-pipeline-halted": "توقف خط الأنابيب. يرجى التحقق من اختيار النموذج أو أذونات مفتاح API في الإعدادات.",
        "example-prompt-wildfire": "تصميم نظام للكشف عن حرائق الغابات في الوقت الفعلي باستخدام الطائرات بدون طيار ورؤية الكمبيوتر الذي يمكنه تنبيه فرق الاستجابة للطوارئ تلقائياً عند اكتشاف الحرائق في مناطق الغابات.",
        "example-prompt-hospital": "تصميم نظام كشف تدهور حالة مرضى المستشفى في الوقت الفعلي الذي يراقب العلامات الحيوية، ويتنبأ بالتدهور السريري، وينبه طاقم التمريض قبل وقوع الأحداث الحرجة.",
        "example-prompt-industrial": "تصميم نظام صيانة تنبؤية لمعدات التصنيع الصناعية التي تستخدم مستشعرات الاهتزاز ومراقبة درجة الحرارة والتعلم الآلي للتنبؤ بأعطال المعدات قبل حدوثها.",
        "example-prompt-traffic": "تصميم نظام ذكي لإدارة حركة المرور يستخدم الكاميرات والمستشعرات عند التقاطعات لتحسين توقيت إشارات المرور، واكتشاف الحوادث، وتقليل الازدحام في الوقت الفعلي.",
        "example-prompt-building": "تصميم نظام تحسين طاقة المباني الذكية الذي يستخدم مستشعرات الإشغال وبيانات الطقس وعناصر التحكم في التدفئة والتهوية وتكييف الهواء لتقليل استهلاك الطاقة مع الحفاظ على مستويات الراحة.",
        "reg-interpreter": "الوكيل 1 — المفسر",
        "reg-domain": "الوكيل 2 — النطاق",
        "reg-architecture": "الوكيل 3 — البنية",
        "reg-aimodel": "الوكيل 4 — النماذج",
        "reg-agentic": "الوكيل 4ب — الوكيل البديل",
        "reg-events": "الوكيل 5 — الأحداث",
        "reg-implementation": "الوكيل 6 — التنفيذ",
        "reg-visualizer": "الوكيل 7 — المخططات",
        "reg-demo": "الوكيل 8 — العرض",
        "reg-training": "الوكيل 9 — التدريب",
        "reg-competitive": "الوكيل 10 — المنافسة",
        "label-orchestration": "نمط التنسيق",
        "label-event-schemas": "مخططات الأحداث",
        "label-producers": "المنتجين",
        "label-consumers": "المستهلكين",
        "label-event-flow": "مخطط تدفق الأحداث",
        "th-producer": "المنتج",
        "th-events": "الأحداث",
        "th-protocol": "البروتوكول",
        "th-frequency": "التردد",
        "th-consumer": "المستهلك",
        "th-subscribes": "يشترك في",
        "th-action": "الإجراء",
        "label-project-struct": "هيكل المشروع",
        "label-event-defs": "تعريفات الأحداث",
        "label-pseudo-code": "الكود الظاهري",
        "label-api-endpoints": "نقاط نهاية API:",
        "l-deal-snapshot": "ملخص الصفقة",
        "l-pain-points": "نقاط الضعف",
        "l-key-stakeholders": "أصحاب المصلحة الرئيسيون",
        "l-current-state": "الوضع الحالي",
        "l-why-hard": "السبب في صعوبة الأمر بدون فانتيك",
        "l-qualifying-qs": "الأسئلة التأهيلية",
        "l-bounded-contexts": "السياقات المحدودة",
        "l-event-flow-sum": "ملخص تدفق الأحداث",
        "l-arch-insights": "رؤى بنية النظام",
        "l-scalability": "قابلية التوسع",
        "l-security": "الاعتبارات الأمنية",
        "l-deployment-topo": "النشر",
        "l-latency-budget": "ميزانية زمن الاستجابة",
        "l-data-retention": "سياسة الاحتفاظ بالبيانات",
        "l-prerequisites": "المتطلبات الأساسية",
        "l-testing-strategy": "الاختبار",
        "l-deployment-notes": "ملاحظات النشر",
        "l-win-strategy": "استراتيجية الفوز",
        "l-roi-snapshot": "لمحة عن عائد الاستثمار",
        "l-value-drivers": "دوافع القيمة",
        "l-risk-mitigations": "تخفيف المخاطر",
        "l-success-kpis": "مؤشرات الأداء الرئيسية للنجاح",
        "l-in-scope": "في النطاق",
        "l-out-of-scope": "خارج النطاق",
        "l-success-metrics": "مقاييس النجاح",
        "l-reused": "معاد استخدامه",
        "l-new": "جديد",
        "l-decision-points": "النقاط الرئيسية لاتخاذ القرار",
        "l-strategic-value": "القيمة الاستراتيجية",
        "l-compt-adv": "الميزة التنافسية",
        "l-exec-summary": "الملخص التنفيذي",
        "l-expected-return": "العائد المتوقع",
        "l-payback-period": "فترة الاسترداد"
    }
};

// ── App State ──
const state = {
    currentPanel: 'input',
    results: {},
    problemText: '',
    generating: false,
    language: localStorage.getItem('vantiq_spark_lang') || 'en'
};

// ── Status Bar ──
function updateStatus() {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (aiEngine.hasApiKey()) {
        dot.className = 'status-dot connected';
        const lang = state.language || 'en';
        const connectedLabel = lang === 'ko' ? '연결됨' : lang === 'ja' ? '接続済み' : lang === 'ar' ? 'متصل' : 'connected';
        text.textContent = `${aiEngine.model} ${connectedLabel}`;
    } else {
        dot.className = 'status-dot disconnected';
        text.setAttribute('data-i18n', 'status-configure');
        localizeUI();
    }
}

// ── Internationalization ──
function localizeUI() {
    const lang = state.language || 'en';
    const translations = I18N[lang] || I18N.en;

    // Update RTL/LTR
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update all elements with data-i18n (innerHTML)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.innerHTML = translations[key];
        } else if (I18N.en[key]) {
            el.innerHTML = I18N.en[key];
        }
    });

    // Update title attributes (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (translations[key]) {
            el.title = translations[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            el.placeholder = translations[key];
        } else if (I18N.en[key]) {
            el.placeholder = I18N.en[key];
        }
    });
}

function updateLanguage() {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        state.language = langSelect.value;
        localStorage.setItem('vantiq_spark_lang', state.language);
        localizeUI();
        updateStatus();
    }
}

// ── Settings Modal ──
function showSettings() {
    const modal = document.getElementById('settingsModal');
    const keyInput = document.getElementById('apiKeyInput');
    const modelSelect = document.getElementById('modelSelect');
    const langSelect = document.getElementById('langSelect');
    keyInput.value = aiEngine.apiKey || '';
    modelSelect.value = aiEngine.model || 'gpt-4.1';
    if (langSelect) langSelect.value = state.language || 'en';
    modal.classList.add('visible');
    keyInput.focus();
}

function hideSettings() {
    document.getElementById('settingsModal').classList.remove('visible');
}

function saveSettings() {
    const key = document.getElementById('apiKeyInput').value.trim();
    const model = document.getElementById('modelSelect').value;
    aiEngine.setApiKey(key);
    aiEngine.setModel(model);
    updateLanguage(); // This also calls updateStatus/localizeUI
    hideSettings();
}

// ── Session History ──
const HISTORY_KEY = 'vantiq_spark_history';

function loadHistory() {
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveHistory(sessionState) {
    let history = loadHistory();
    // Prepend new session
    const newSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        problemText: sessionState.problemText,
        results: JSON.parse(JSON.stringify(sessionState.results))
    };
    history.unshift(newSession);
    // Keep last 15 sessions
    if (history.length > 15) history = history.slice(0, 15);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory();
}

function clearHistory() {
    const lang = state.language || 'en';
    const translations = I18N[lang] || I18N.en;
    if (confirm(translations['confirm-clear-history'] || "Are you sure?")) {
        localStorage.removeItem(HISTORY_KEY);
        renderHistory();
    }
}

function renderHistory() {
    const lang = state.language || 'en';
    const translations = I18N[lang] || I18N.en;
    const history = loadHistory();
    const grid = document.getElementById('historyGrid');
    if (!grid) return;

    if (history.length === 0) {
        grid.innerHTML = `<p style="color:var(--text-secondary)" data-i18n="history-empty">${I18N[state.language]['history-empty'] || 'No history found.'}</p>`;
        return;
    }

    grid.innerHTML = history.map(session => {
        const dateStr = new Date(session.date).toLocaleString(lang, { dateStyle: 'medium', timeStyle: 'short' });
        const summary = session.problemText.length > 100 ? session.problemText.substring(0, 100) + '...' : session.problemText;
        const untitledName = translations['untitled-project'] || 'Untitled AI Project';
        const projName = session.results.domainModel?.projectName || untitledName;
        return `
            <div class="glass-card panel-card" style="cursor:pointer" onclick="app.loadSession('${session.id}')">
               <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:8px">${dateStr}</div>
               <div style="font-weight:600;font-size:15px;color:var(--text-primary);margin-bottom:8px; display:flex; justify-content:space-between; align-items:center">
                 <span>${projName}</span>
                 <button class="btn-ghost" onclick="event.stopPropagation(); app.renameSession('${session.id}')" style="font-size:12px; padding:2px 6px" data-i18n-title="prompt-rename">✏️</button>
               </div>
               <div style="font-size:13px;color:var(--text-secondary);line-height:1.5">${escapeHtml(summary)}</div>
            </div>
        `;
    }).join('');
    localizeUI(); // Update potential tooltips
}

function showHistory() {
    switchPanel("history");
}

function renameSession(id) {
    const lang = state.language || 'en';
    const translations = I18N[lang] || I18N.en;
    const history = loadHistory();
    const session = history.find(s => s.id === id);
    if (!session) return;
    const untitledName = translations['untitled-project'] || 'Untitled AI Project';
    const currentName = session.results.domainModel && session.results.domainModel.projectName ? session.results.domainModel.projectName : untitledName;
    const newName = prompt(translations['prompt-rename'] || "Enter name:", currentName);
    if (newName && newName.trim() !== "") {
        if (!session.results.domainModel) session.results.domainModel = {};
        session.results.domainModel.projectName = newName.trim();
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        renderHistory();
        if (state.currentPanel === 'history') showHistory();
    }
}

function exportToPDF() {
    if (!state.results || !state.results.analysis) {
        alert("Please generate a solution first before exporting.");
        return;
    }
    const lang = state.language || 'en';
    const translations = I18N[lang] || I18N.en;
    document.getElementById('generatingAgentName').textContent = translations['status-generating-pdf'] || 'Generating PDF...';
    document.getElementById('generatingOverlay').classList.add('visible');

    // Use setTimeout to let the overlay paint, then await the async generator
    setTimeout(async () => {
        try {
            await PDFGenerator.generate(state);
        } catch (e) {
            console.error("PDF Generation failed:", e);
            alert(translations['pdf-error'] || "Failed to generate PDF. Check console for details.");
        } finally {
            document.getElementById('generatingOverlay').classList.remove('visible');
            document.getElementById('generatingAgentName').setAttribute('data-i18n', 'gen-starting');
            localizeUI();
        }
    }, 100);
}

function loadSession(id) {
    const history = loadHistory();
    const session = history.find(s => s.id === id);
    if (!session) return;

    // Load state
    state.problemText = session.problemText;
    state.results = session.results;
    document.getElementById('problemInput').value = session.problemText;

    // Render all panels
    if (state.results.analysis) {
        Renderers.renderAnalysis(state.results.analysis, document.getElementById('analysis-content'));
        enableNav('analysis');
    }
    if (state.results.domainModel) {
        Renderers.renderDomainModel(state.results.domainModel, document.getElementById('domain-content'));
        enableNav('domain');
    }
    if (state.results.architecture) {
        Renderers.renderArchitecture(state.results.architecture, document.getElementById('architecture-content'));
        enableNav('architecture');
    }
    if (state.results.aiModels) {
        Renderers.renderAIModels(state.results.aiModels, document.getElementById('aimodels-content'));
        enableNav('aimodels');
    }
    if (state.results.agenticGuide) {
        Renderers.renderAgenticGuide(state.results.agenticGuide, document.getElementById('agentic-content'));
        enableNav('agentic');
    }
    if (state.results.eventSystem) {
        Renderers.renderEventSystem(state.results.eventSystem, document.getElementById('events-content'));
        enableNav('events');
    }
    if (state.results.implementation) {
        Renderers.renderImplementation(state.results.implementation, document.getElementById('implementation-content'));
        enableNav('implementation');
    }
    if (state.results.scenarios) {
        Renderers.renderScenarios(state.results.scenarios, document.getElementById('scenarios-content'));
        enableNav('scenarios');
    }
    if (state.results.training) {
        Renderers.renderTraining(state.results.training, document.getElementById('training-content'));
        enableNav('training');
    }
    if (state.results.competitive) {
        Renderers.renderCompetitiveAnalysis(state.results.competitive, document.getElementById('competitive-content'));
        enableNav('competitive');
    }

    // Switch to analysis panel
    document.getElementById('btnExportPdf').style.display = 'block';
    switchPanel('analysis');
}


// ── Navigation ──
function switchPanel(panelId) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const panel = document.getElementById('panel-' + panelId);
    const nav = document.getElementById('nav-' + panelId);
    if (panel) panel.classList.add('active');
    if (nav) nav.classList.add('active');

    state.currentPanel = panelId;

    // Re-render mermaid diagrams when switching to a panel with diagrams
    if (['architecture', 'events', 'diagrams', 'agentic'].includes(panelId)) {
        setTimeout(() => renderMermaidDiagrams(), 100);
    }
}

// Bind nav clicks
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (!item.classList.contains('disabled')) {
            switchPanel(item.dataset.panel);
        }
    });
});

// Close settings modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideSettings();
});

// ── Mermaid Rendering ──
/**
 * Aggressively cleans and hardens LLM-generated Mermaid syntax.
 * Handles localized content, special characters, and common AI generation mistakes.
 */
function preprocessMermaid(code) {
    if (!code) return '';
    let rawCode = code.trim();
    rawCode = rawCode.replace(/```(?:mermaid)?\s*\n?/g, '').replace(/```\s*$/g, '').trim();
    rawCode = rawCode.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    return rawCode;

    let cleaned = code.trim();

    // 0. Strip markdown fences if AI included them
    cleaned = cleaned.replace(/```(?:mermaid)?\s*\n?/g, '').replace(/```\s*$/g, '').trim();

    // 1. Detect diagram type — default to graph TD if none
    const knownTypes = ['graph ', 'flowchart ', 'sequenceDiagram', 'classDiagram',
        'stateDiagram', 'erDiagram', 'pie ', 'pie\n', 'gantt', 'journey', 'gitGraph', 'C4Context'];
    const hasType = knownTypes.some(t => cleaned.startsWith(t));
    if (!hasType) {
        cleaned = 'graph TD\n' + cleaned;
    }

    // 2. Decode HTML entities that LLMs sometimes inject
    cleaned = cleaned.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');

    // 3. Remove HTML tags that LLMs sometimes include
    cleaned = cleaned.replace(/<br\s*\/?>/gi, ' ')
        .replace(/<\/?[a-z][^>]*>/gi, '');

    // 4. Strip comments (Mermaid doesn't support all comment styles)
    cleaned = cleaned.replace(/^\s*%%.*$/gm, '');

    // 5. Fix arrow syntax issues
    // Normalize weird arrow variants: ==> → -->  ,  -> → -->  , ==> → -->
    cleaned = cleaned.replace(/\s*==+>\s*/g, ' --> ');
    // Fix arrows without spaces: A-->B → A --> B
    cleaned = cleaned.replace(/(\w)(-->)(\w)/g, '$1 --> $3');
    cleaned = cleaned.replace(/(\w)(--)(\w)/g, '$1 -- $3');
    // Fix dotted arrows without spaces
    cleaned = cleaned.replace(/(\w)(-.->)(\w)/g, '$1 -.-> $3');
    // Remove arrows pointing to nothing
    cleaned = cleaned.replace(/-->\s*$/gm, '');

    // 6. For graph/flowchart: sanitize node labels
    const isSequence = cleaned.startsWith('sequenceDiagram');
    const isER = cleaned.startsWith('erDiagram');
    const isPie = cleaned.startsWith('pie');

    if (!isSequence && !isER && !isPie) {
        // Process line by line to handle labels carefully
        const lines = cleaned.split('\n');
        const processedLines = lines.map((line, idx) => {
            // Skip the diagram type declaration line
            if (idx === 0 && hasType) return line;

            // Skip subgraph end
            if (line.trim() === 'end') return line;

            // Handle subgraph labels: subgraph Title → subgraph "Title"
            const subgraphMatch = line.match(/^(\s*subgraph\s+)(.+)$/);
            if (subgraphMatch) {
                const label = subgraphMatch[2].trim();
                if (!label.startsWith('"') && !label.startsWith("'")) {
                    return `${subgraphMatch[1]}"${sanitizeMermaidLabel(label)}"`;
                }
                return line;
            }

            // Quote labels in square brackets: id[Label Text] → id["Label Text"]
            line = line.replace(/(\w[\w\d_]*)?\[([^\]"]+)\]/g, (m, id, label) => {
                if (!id) return m; // Skip if no ID prefix
                return `${id}["${sanitizeMermaidLabel(label)}"]`;
            });

            // Quote labels in curly braces (rhombus): id{Label} → id{"Label"}
            line = line.replace(/(\w[\w\d_]*)\{([^}"]+)\}/g, (m, id, label) => {
                return `${id}{"${sanitizeMermaidLabel(label)}"}`;
            });

            // Quote labels in double round brackets (stadium): id((Label)) → id(("Label"))
            line = line.replace(/(\w[\w\d_]*)\(\(([^)"]+)\)\)/g, (m, id, label) => {
                return `${id}(("${sanitizeMermaidLabel(label)}"))`;
            });

            // Quote labels in round brackets: id(Label Text) → id("Label Text")
            // Must come after (( )) handling
            line = line.replace(/(\w[\w\d_]*)\(([^)"(]+)\)/g, (m, id, label) => {
                return `${id}("${sanitizeMermaidLabel(label)}")`;
            });

            return line;
        });
        cleaned = processedLines.join('\n');
    }

    // 7. Sequence diagram hardening
    if (isSequence) {
        // Quote participant names that contain spaces
        cleaned = cleaned.replace(/participant\s+([^"\n]+?)(?:\s+as\s+)/g, (m, name) => {
            if (name.includes(' ') && !name.startsWith('"')) {
                return `participant "${name.trim()}" as `;
            }
            return m;
        });
    }

    // 8. Remove trailing semicolons
    cleaned = cleaned.replace(/;\s*$/gm, '');

    // 9. Remove empty lines between nodes (can confuse parser)
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    // 10. Remove duplicate edges (same line appearing multiple times)
    const lineSet = new Set();
    const deduped = [];
    for (const line of cleaned.split('\n')) {
        const trimmed = line.trim();
        // Only deduplicate edge lines (contain -->), keep all other lines
        if (trimmed.includes('-->') || trimmed.includes('-.-') || trimmed.includes('==>')) {
            if (!lineSet.has(trimmed)) {
                lineSet.add(trimmed);
                deduped.push(line);
            }
        } else {
            deduped.push(line);
        }
    }
    cleaned = deduped.join('\n');

    // 11. Final safety: remove any remaining unbalanced quotes
    // Count quotes per line and add closing quote if odd
    cleaned = cleaned.split('\n').map(line => {
        const quoteCount = (line.match(/"/g) || []).length;
        if (quoteCount % 2 !== 0) {
            line += '"';
        }
        return line;
    }).join('\n');

    // 12. Strip zero-width/invisible Unicode characters that LLMs sometimes emit
    cleaned = cleaned.replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, '');

    // 13. Strip :::className style classes (many models emit these but Mermaid often chokes)
    cleaned = cleaned.replace(/:::[\w-]+/g, '');

    // 14. Remove click handler lines
    cleaned = cleaned.replace(/^\s*click\s+\S+.*$/gm, '');

    // 15. Remove linkStyle lines
    cleaned = cleaned.replace(/^\s*linkStyle\s+.*$/gm, '');

    // 16. Fix pipe-label syntax on edges: A -->|text| B
    // Ensure pipes are balanced
    cleaned = cleaned.replace(/-->(\|[^|]*)(\s)/g, (m, label, sp) => {
        if (!label.endsWith('|')) return `-->${label}|${sp}`;
        return m;
    });

    // 17. Handle stray 'direction' keyword mid-diagram for flowcharts
    if (!isSequence && !isER && !isPie) {
        cleaned = cleaned.replace(/^\s*direction\s+(TB|BT|LR|RL)\s*$/gm, '');
    }

    // 18. Auto-balance subgraph/end blocks
    const subgraphOpens = (cleaned.match(/^\s*subgraph\s/gm) || []).length;
    const subgraphEnds = (cleaned.match(/^\s*end\s*$/gm) || []).length;
    if (subgraphOpens > subgraphEnds) {
        for (let i = 0; i < subgraphOpens - subgraphEnds; i++) {
            cleaned += '\nend';
        }
    }

    // 19. Remove orphan nodes (defined but not connected to any edge)
    if (!isSequence && !isER && !isPie) {
        const edgeLines = cleaned.split('\n').filter(l => /-->|-\.->|==>/.test(l));
        const connectedIds = new Set();
        for (const edgeLine of edgeLines) {
            const ids = edgeLine.match(/\b([a-zA-Z_][\w]*)/g);
            if (ids) ids.forEach(id => connectedIds.add(id));
        }
        // Remove standalone node definition lines where the node ID is not in any edge
        const reservedWords = new Set(['graph', 'flowchart', 'subgraph', 'end', 'style', 'classDef', 'class', 'click', 'linkStyle', 'direction']);
        cleaned = cleaned.split('\n').filter(line => {
            const trimmed = line.trim();
            if (!trimmed) return true;
            // Keep diagram declaration, subgraph, end, style lines, edge lines
            if (/-->|-\.->|==>|^\s*(graph|flowchart|subgraph|end|style|classDef|class)\s/i.test(trimmed)) return true;
            if (trimmed === 'end') return true;
            // Check if this is a standalone node definition
            const nodeIdMatch = trimmed.match(/^([a-zA-Z_][\w]*)/);
            if (nodeIdMatch && !reservedWords.has(nodeIdMatch[1])) {
                // If this node ID is not in any edge, it's orphan — remove it
                if (!connectedIds.has(nodeIdMatch[1])) {
                    console.warn(`[Mermaid] Removing orphan node: ${nodeIdMatch[1]}`);
                    return false;
                }
            }
            return true;
        }).join('\n');
    }

    return cleaned;
}

/**
 * Sanitize a label string for Mermaid (strip dangerous chars).
 */
function sanitizeMermaidLabel(label) {
    if (!label) return '';
    return label.trim()
        .replace(/"/g, "'")  // Escape inner quotes
        .replace(/[#;]/g, '')    // Remove hash and semicolons
        .replace(/[\r\n]/g, ' ');  // No newlines inside labels
}

async function renderMermaidDiagrams() {
    const mermaidEls = document.querySelectorAll('.mermaid');
    for (const el of mermaidEls) {
        if (el.dataset.rendered) continue;
        const rawCode = el.textContent;

        // Skip empty/trivial diagram data
        if (!rawCode || rawCode.trim().length < 20) {
            el.innerHTML = `
                <div style="background:var(--bg-elevated);border:1px solid var(--border-default);border-radius:var(--radius-lg);padding:16px;font-size:12px">
                    <div style="color:var(--text-tertiary)">Insufficient diagram data.</div>
                </div>`;
            el.dataset.rendered = 'true';
            continue;
        }

        try {
            const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
            const hardenedCode = preprocessMermaid(rawCode);

            console.log(`[Mermaid] Rendering ${id}:`, hardenedCode.substring(0, 200) + '...');

            const { svg } = await mermaid.render(id, hardenedCode);

            if (!svg || svg.length < 50) {
                console.warn(`[Mermaid] SVG appears empty. Retrying...`);
                throw new Error('Empty SVG output');
            }

            el.innerHTML = svg;
            el.dataset.rendered = 'true';
        } catch (e) {
            console.warn('[Mermaid] render failed:', e.message);
            // Show raw code so the user at least sees something useful
            const escaped = (rawCode || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            el.innerHTML = `
                <div style="background:var(--bg-elevated);border:1px solid var(--border-default);border-radius:var(--radius-lg);padding:16px;font-size:12px">
                    <div style="color:var(--brand-warning);margin-bottom:8px;font-weight:600">⚠️ Diagram could not be rendered</div>
                    <div style="color:var(--text-tertiary);margin-bottom:12px;font-size:11px">The AI generated Mermaid syntax that could not be parsed. You can copy the code below and test it at <a href="https://mermaid.live" target="_blank" style="color:var(--brand-primary)">mermaid.live</a></div>
                    <pre style="background:var(--bg-primary);padding:12px;border-radius:var(--radius-md);color:var(--text-secondary);font-family:'JetBrains Mono',monospace;font-size:11px;overflow-x:auto;white-space:pre-wrap">${escaped}</pre>
                </div>`;
            el.dataset.rendered = 'true';
        }
    }
}

/**
 * Aggressively simplify Mermaid code by stripping all styling, 
 * reducing to basic node→node connections.
 */
function simplifyMermaid(code) {
    return preprocessMermaid(code);
}

// ── Pipeline Progress ──
function updatePipelineStep(agentKey, status) {
    const step = document.getElementById('step-' + agentKey);

    if (step) {
        step.classList.remove('active', 'completed');
        if (status === 'active') step.classList.add('active');
        if (status === 'completed') step.classList.add('completed');
    }

    // Update connectors
    const connectors = document.querySelectorAll('.pipeline-connector');
    const steps = document.querySelectorAll('.pipeline-step');
    let prevCompleted = true;
    steps.forEach((s, i) => {
        if (i < connectors.length) {
            if (s.classList.contains('completed') || (s.classList.contains('active') && prevCompleted)) {
                connectors[i].classList.add('completed');
            } else {
                connectors[i].classList.remove('completed');
                prevCompleted = false;
            }
        }
    });

    // Update overlay text
    const overlay = document.getElementById('generatingAgentName');

    // Skip overlay update for linter as requested
    if (agentKey === 'linter' || !overlay || status !== 'active') return;

    const overlayMap = {
        interpreter: { icon: '🔍', label: 'Sales Discovery', num: '1' },
        useCaseScope: { icon: '🎯', label: 'Use Case Scope', num: '2' },
        business: { icon: '💰', label: 'Business Value', num: '3' },
        competitive: { icon: '🏆', label: 'Competitive Analysis', num: '4' },
        domain: { icon: '🧩', label: 'Domain Model', num: '5' },
        architecture: { icon: '🏗️', label: 'Architecture', num: '6' },
        events: { icon: '⚡', label: 'Event System', num: '7' },
        visualizer: { icon: '📊', label: 'Diagrams', num: '8' },
        aimodel: { icon: '🤖', label: 'AI Models', num: '9' },
        agentic: { icon: '🧠', label: 'Agentic Approach', num: '10' },
        implementation: { icon: '🛠️', label: 'Implementation', num: '11' },
        adjacent: { icon: '🔗', label: 'Adjacent Use Cases', num: '12' },
        roadmap: { icon: '🗺️', label: 'Roadmap', num: '13' },
        valueGrowth: { icon: '📈', label: 'Platform Value Growth', num: '14' }
    };

    const info = overlayMap[agentKey];
    if (info) {
        const lang = state.language || 'en';
        const agentLabel = lang === 'ko' ? '에이전트' : lang === 'ja' ? 'エージェント' : lang === 'ar' ? 'الوكيل' : 'Agent';
        overlay.textContent = `${info.icon} ${agentLabel} ${info.num} — ${info.label}`;
    }
}

function enableNav(panelId) {
    const nav = document.getElementById('nav-' + panelId);
    if (nav) nav.classList.remove('disabled');
}

// ── Show Error in Panel ──
function showAgentError(contentId, agentName, error) {
    const container = document.getElementById(contentId);
    if (container) {
        container.innerHTML = `
      <div class="error-card">
        <div class="error-title">⚠️ ${agentName} Error</div>
        <p>${error.message || error}</p>
        <p style="margin-top:8px;font-size:11px;color:var(--text-tertiary)">Try clicking "↻ Regenerate" to retry this agent.</p>
      </div>`;
    }
}

// ── Checkpoint Gate UI ──
function showCheckpoint(phaseNumber, phaseName, prompt, nextPhaseFn) {
    const lastPanel = document.querySelector('.panel.active') || document.querySelector('.panel:not([style*="display: none"])');
    // Build a checkpoint card and inject it at the bottom of the current view
    const checkpointId = `checkpoint-phase-${phaseNumber}`;
    // Remove any existing checkpoint
    const existing = document.getElementById(checkpointId);
    if (existing) existing.remove();

    const checkpointHTML = `
      <div id="${checkpointId}" class="glass-card accent-green" style="margin-top:24px;border:2px solid var(--brand-success);animation:cardReveal 0.4s ease">
        <div class="card-title" style="font-size:16px"><span class="card-icon">✅</span> Phase ${phaseNumber}: ${phaseName} Complete</div>
        <p style="font-size:13px;color:var(--text-secondary);margin:12px 0;line-height:1.6">${prompt}</p>
        <textarea id="checkpoint-notes-${phaseNumber}" class="refine-input" rows="3" 
          style="width:100%;margin:12px 0;padding:12px;font-size:13px;resize:vertical;border-radius:var(--radius-md);background:var(--bg-primary);color:var(--text-primary);border:1px solid var(--border-default)"
          placeholder="Optional: Add notes, corrections, or constraints for the next phase..."></textarea>
        <div style="display:flex; gap:8px; margin-top:8px">
          <select id="checkpoint-skip-${phaseNumber}" class="refine-input" style="flex:1; padding:12px; font-size:14px; border-radius:var(--radius-md); background:var(--bg-primary); color:var(--text-primary); border:1px solid var(--border-default)">
            <option value="app.runPhase1Discovery()" ${nextPhaseFn === 'app.runPhase1Discovery()' ? 'selected' : ''}>Phase 1: Discovery</option>
            <option value="app.runPhase2Value()" ${nextPhaseFn === 'app.runPhase2Value()' ? 'selected' : ''}>Phase 2: Value Assessment</option>
            <option value="app.runPhase3Architecture()" ${nextPhaseFn === 'app.runPhase3Architecture()' ? 'selected' : ''}>Phase 3: Architecture</option>
            <option value="app.runPhase4AIConsulting()" ${nextPhaseFn === 'app.runPhase4AIConsulting()' ? 'selected' : ''}>Phase 4: AI Consulting</option>
            <option value="app.runPhase5Implementation()" ${nextPhaseFn === 'app.runPhase5Implementation()' ? 'selected' : ''}>Phase 5: Implementation</option>
            <option value="app.runPhase6Expansion()" ${nextPhaseFn === 'app.runPhase6Expansion()' ? 'selected' : ''}>Phase 6: Expansion</option>
          </select>
          <button class="btn btn-primary" style="flex:1; padding:12px; font-size:14px; font-weight:600" 
            onclick="(function(){ 
              var notes = document.getElementById('checkpoint-notes-${phaseNumber}').value.trim();
              state.phaseNotes = state.phaseNotes || {};
              state.phaseNotes['phase${phaseNumber}'] = notes;
              var selectedFn = document.getElementById('checkpoint-skip-${phaseNumber}').value;
              document.getElementById('${checkpointId}').style.display='none';
              eval(selectedFn);
            })()">
            Continue →
          </button>
        </div>
      </div>`;

    // Find the content container of the last tab of this phase and append the checkpoint
    if (lastPanel) {
        const contentEl = lastPanel.querySelector('[id$="-content"]');
        if (contentEl) {
            contentEl.insertAdjacentHTML('beforeend', checkpointHTML);
        }
    }
}

// Build phase context string from previous phase notes
function getPhaseContext() {
    if (!state.phaseNotes) return '';
    let ctx = '';
    for (const [phase, notes] of Object.entries(state.phaseNotes)) {
        if (notes) ctx += `\nUSER FEEDBACK FROM ${phase}: ${notes}\n`;
    }
    return ctx;
}

// ── Error display helper for pipeline ──
function showPipelineError(e) {
    console.error('Pipeline error:', e);
    document.getElementById('generatingOverlay').classList.remove('visible');

    const errorMsg = e.message || 'An unexpected error occurred';
    let technicalAdvice = 'The pipeline was halted. Please check your model selection or API key permissions in Settings.';

    if (errorMsg.includes('API key') || errorMsg.includes('401')) {
        showSettings();
        return;
    } else if (errorMsg.toLowerCase().includes('fetch') || errorMsg.includes('NetworkError')) {
        technicalAdvice = 'A network error occurred while reaching OpenAI. Please check your internet connection or try again shortly.';
    } else if (errorMsg.includes('timed out')) {
        technicalAdvice = 'The request took too long. Try a faster model or try again.';
    } else if (errorMsg.includes('429')) {
        technicalAdvice = 'You have been rate limited by OpenAI. Please wait a few moments before trying again.';
    }

    const el = document.getElementById('analysis-content');
    if (el) {
        el.innerHTML = `
          <div class="glass-card accent-rose" style="margin-top: 20px;">
            <div class="card-title"><span class="card-icon">⚠️</span> <span data-i18n="error-gen-failed">Generation Failed</span></div>
            <p style="font-size:14px;color:var(--text-primary);margin:12px 0">${errorMsg}</p>
            <p style="font-size:12px;color:var(--text-tertiary)">${technicalAdvice}</p>
          </div>`;
        localizeUI();
        switchPanel('analysis');
    }

    state.generating = false;
    document.getElementById('generateBtn').disabled = false;
}

// ══════════════════════════════════════════════
// Phase 1: Discovery (Sales Analysis + Use Case Scope)
// ══════════════════════════════════════════════
async function runPhase1Discovery(text) {
    try {
        document.getElementById('generatingOverlay').classList.add('visible');
        document.getElementById('generatingAgentName').textContent = '🔍 Phase 1 — Sales Discovery';

        // Agent 1: Sales Discovery Analyst
        updatePipelineStep('interpreter', 'active');
        state.results.analysis = await Agents.problemInterpreter(text, "", null, state.language);
        Renderers.renderAnalysis(state.results.analysis, document.getElementById('analysis-content'));
        updatePipelineStep('interpreter', 'completed');
        enableNav('analysis');

        // Agent 1b: Use Case Scope
        updatePipelineStep('useCaseScope', 'active');
        state.results.useCaseScope = await Agents.useCaseScope(text, state.results.analysis, "", null, state.language);
        Renderers.renderUseCaseScope(state.results.useCaseScope, document.getElementById('usecasescope-content'));
        updatePipelineStep('useCaseScope', 'completed');
        enableNav('usecasescope');

        // Update browser tab title
        if (state.results.analysis?.domain) {
            document.title = `${state.results.analysis.domain} — Vantiq Spark`;
            renderHistory();
        }

        document.getElementById('generatingOverlay').classList.remove('visible');
        state.generating = false;
        document.getElementById('generateBtn').disabled = false;

        switchPanel('usecasescope');

        // Checkpoint on LAST tab of Discovery
        showCheckpoint(1, 'Discovery',
            'Does this accurately capture the problem and use case scope? Validate the success metrics and phasing before we assess business value.',
            'app.runPhase2Value()');

    } catch (e) { showPipelineError(e); }
}

// ══════════════════════════════════════════════
// Phase 2: Value & Competitive Position
// ══════════════════════════════════════════════
async function runPhase2Value() {
    state.generating = true;
    const ctx = getPhaseContext();

    try {
        document.getElementById('generatingOverlay').classList.add('visible');
        document.getElementById('generatingAgentName').textContent = '💰 Phase 2 — Value Assessment';
        document.getElementById('generateBtn').disabled = true;

        updatePipelineStep('business', 'active');
        updatePipelineStep('competitive', 'active');

        const competitorsInput = document.getElementById('competitorsInput');
        const competitorsText = competitorsInput ? competitorsInput.value.trim() : '';

        const [busResult, compResult] = await Promise.allSettled([
            Agents.businessValue(state.problemText + ctx, state.results.analysis, state.results.architecture || null, "", null, state.language),
            Agents.competitiveAnalysis(state.problemText + ctx, state.results.analysis, state.results.architecture || null, competitorsText, "", null, state.language)
        ]);

        if (busResult.status === 'fulfilled') {
            state.results.businessValue = busResult.value;
            Renderers.renderBusinessValue(state.results.businessValue, document.getElementById('business-content'));
        } else {
            showAgentError('business-content', 'Business Value', busResult.reason);
        }
        updatePipelineStep('business', 'completed');
        enableNav('business');

        if (compResult.status === 'fulfilled') {
            state.results.competitive = compResult.value;
            Renderers.renderCompetitiveAnalysis(state.results.competitive, document.getElementById('competitive-content'));
        } else {
            showAgentError('competitive-content', 'Competitive Analysis', compResult.reason);
        }
        updatePipelineStep('competitive', 'completed');
        enableNav('competitive');

        document.getElementById('generatingOverlay').classList.remove('visible');
        state.generating = false;
        document.getElementById('generateBtn').disabled = false;

        switchPanel('competitive');

        // Checkpoint on LAST tab of Value section
        showCheckpoint(2, 'Value Assessment',
            'Do these value drivers resonate with your customer? Any specific competitors or objections to address before building the architecture?',
            'app.runPhase3Architecture()');

    } catch (e) { showPipelineError(e); }
}

// ══════════════════════════════════════════════
// Phase 3: Architecture (Arch + Events + Domain + Linter + Diagrams)
// ══════════════════════════════════════════════
async function runPhase3Architecture() {
    state.generating = true;
    const ctx = getPhaseContext();

    try {
        document.getElementById('generatingOverlay').classList.add('visible');
        document.getElementById('generatingAgentName').textContent = '🏗️ Phase 3 — Architecture';
        document.getElementById('generateBtn').disabled = true;

        // Agent 2: Domain Model
        try {
            updatePipelineStep('domain', 'active');
            document.getElementById('generatingAgentName').textContent = '🧩 Agent 2 — Domain Model';
            state.results.domainModel = await Agents.domainModelGenerator(state.problemText + ctx, state.results.analysis, "", null, state.language);
            Renderers.renderDomainModel(state.results.domainModel, document.getElementById('domain-content'));
            updatePipelineStep('domain', 'completed');
        } catch (eDom) {
            showAgentError('domain-content', 'Domain Model', eDom);
            updatePipelineStep('domain', 'completed');
        }
        enableNav('domain');

        if (state.results.domainModel?.projectName) {
            document.title = `${state.results.domainModel.projectName} — Vantiq Spark`;
            renderHistory();
        }

        // Agent 3 + Agent 5 in parallel
        updatePipelineStep('architecture', 'active');
        updatePipelineStep('events', 'active');
        document.getElementById('generatingAgentName').textContent = '🏗️ Phase 3 — Architecture & Events';

        const [archResult, eventsResult] = await Promise.all([
            Agents.architectureGenerator(state.problemText + ctx, state.results.analysis, state.results.useCaseScope || null, "", null, state.language),
            Agents.eventSystemDesigner(state.problemText + ctx, state.results.analysis, state.results.useCaseScope || null, "", null, state.language)
        ]);

        state.results.architecture = archResult;
        Renderers.renderArchitecture(state.results.architecture, document.getElementById('architecture-content'));
        updatePipelineStep('architecture', 'completed');
        enableNav('architecture');

        state.results.eventSystem = eventsResult;
        Renderers.renderEventSystem(state.results.eventSystem, document.getElementById('events-content'));
        updatePipelineStep('events', 'completed');
        enableNav('events');

        // Agent 11: Architecture Linter
        try {
            updatePipelineStep('linter', 'active');
            document.getElementById('generatingAgentName').textContent = '🛑 Agent 11 — Architecture Linter';
            state.results.linter = await Agents.vantiqLinter(state.problemText + ctx, state.results.analysis, state.results.architecture, state.results.eventSystem, null, "", null, state.language);
            Renderers.renderVantiqLinter(state.results.linter, document.getElementById('linter-content'));
            updatePipelineStep('linter', 'completed');
        } catch (eLint) {
            showAgentError('linter-content', 'Architecture Linter', eLint);
            updatePipelineStep('linter', 'completed');
        }
        enableNav('linter');

        // Agent 7: Architecture Visualizer
        try {
            updatePipelineStep('visualizer', 'active');
            document.getElementById('generatingAgentName').textContent = '📊 Agent 7 — Diagrams';
            state.results.diagrams = await Agents.architectureVisualizer(state.problemText + ctx, state.results.analysis, state.results.domainModel, state.results.architecture, "", null, state.language);
            Renderers.renderDiagrams(state.results.diagrams, document.getElementById('diagrams-content'));
            updatePipelineStep('visualizer', 'completed');
        } catch (eDiag) {
            showAgentError('diagrams-content', 'Architecture Visualizer', eDiag);
            updatePipelineStep('visualizer', 'completed');
        }
        enableNav('diagrams');

        setTimeout(() => renderMermaidDiagrams(), 200);

        document.getElementById('generatingOverlay').classList.remove('visible');
        state.generating = false;
        document.getElementById('generateBtn').disabled = false;

        switchPanel('diagrams');

        // Checkpoint on LAST tab of Architecture section
        showCheckpoint(3, 'Architecture',
            'Does this architecture align with the customer\'s infrastructure? Any integration or deployment constraints before we explore AI consulting?',
            'app.runPhase4AIConsulting()');

    } catch (e) { showPipelineError(e); }
}

// ══════════════════════════════════════════════
// Phase 4: AI Consulting (AI Models + Agentic)
// ══════════════════════════════════════════════
async function runPhase4AIConsulting() {
    state.generating = true;
    const ctx = getPhaseContext();

    try {
        document.getElementById('generatingOverlay').classList.add('visible');
        document.getElementById('generatingAgentName').textContent = '🤖 Phase 4 — AI Consulting';
        document.getElementById('generateBtn').disabled = true;

        updatePipelineStep('aimodel', 'active');

        // Agent 4: AI Model Advisor
        state.results.aiModels = await Agents.aiModelAdvisor(state.problemText + ctx, state.results.analysis, "", null, state.language);
        Renderers.renderAIModels(state.results.aiModels, document.getElementById('aimodels-content'));
        updatePipelineStep('aimodel', 'completed');
        enableNav('aimodels');

        // Agent 4b: Agentic Approach
        try {
            updatePipelineStep('agentic', 'active');
            document.getElementById('generatingAgentName').textContent = '🧠 Agent 4b — Agentic Approach';
            state.results.agenticGuide = await Agents.agenticGuide(state.problemText + ctx, state.results.analysis, state.results.domainModel, null, "", null, state.language);
            Renderers.renderAgenticGuide(state.results.agenticGuide, document.getElementById('agentic-content'));
            setTimeout(() => renderMermaidDiagrams(), 100);
            updatePipelineStep('agentic', 'completed');
        } catch (e4b) {
            showAgentError('agentic-content', 'Agentic Approach', e4b);
            updatePipelineStep('agentic', 'completed');
        }
        enableNav('agentic');

        document.getElementById('generatingOverlay').classList.remove('visible');
        state.generating = false;
        document.getElementById('generateBtn').disabled = false;

        switchPanel('agentic');

        // Checkpoint on LAST tab of AI Consulting section
        showCheckpoint(4, 'AI Consulting',
            'Are the AI capabilities realistic for the customer\'s environment? Any constraints on cloud vs. edge, budget, or infrastructure before generating the implementation plan?',
            'app.runPhase5Implementation()');

    } catch (e) { showPipelineError(e); }
}

// ══════════════════════════════════════════════
// Phase 5: Implementation
// ══════════════════════════════════════════════
async function runPhase5Implementation() {
    state.generating = true;
    const ctx = getPhaseContext();

    try {
        document.getElementById('generatingOverlay').classList.add('visible');
        document.getElementById('generatingAgentName').textContent = '🛠️ Phase 5 — Implementation';
        document.getElementById('generateBtn').disabled = true;

        updatePipelineStep('implementation', 'active');
        state.results.implementation = await Agents.implementationGenerator(state.problemText + ctx, state.results.analysis, state.results.domainModel, state.results.architecture, "", null, state.language);
        Renderers.renderImplementation(state.results.implementation, document.getElementById('implementation-content'));
        updatePipelineStep('implementation', 'completed');
        enableNav('implementation');

        document.getElementById('generatingOverlay').classList.remove('visible');
        state.generating = false;
        document.getElementById('generateBtn').disabled = false;

        switchPanel('implementation');

        // Checkpoint on LAST tab — continue to Expansion
        showCheckpoint(5, 'Implementation',
            'Does this implementation plan look right? Ready to explore expansion opportunities — adjacent use cases, roadmap, and value growth?',
            'app.runPhase6Expansion()');

    } catch (e) { showPipelineError(e); }
}

// ══════════════════════════════════════════════
// Phase 6: Expansion (Adjacent Use Cases + Roadmap + Platform Value Growth)
// ══════════════════════════════════════════════
async function runPhase6Expansion() {
    state.generating = true;
    const ctx = getPhaseContext();

    try {
        document.getElementById('generatingOverlay').classList.add('visible');
        document.getElementById('generatingAgentName').textContent = '🔗 Phase 6 — Expansion';
        document.getElementById('generateBtn').disabled = true;

        // Adjacent Use Cases
        updatePipelineStep('adjacent', 'active');
        state.results.adjacentUseCases = await Agents.adjacentUseCases(state.problemText + ctx, state.results.analysis, state.results.architecture, state.results.implementation, "", null, state.language);
        Renderers.renderAdjacentUseCases(state.results.adjacentUseCases, document.getElementById('adjacent-content'));
        updatePipelineStep('adjacent', 'completed');
        enableNav('adjacent');

        // Roadmap
        updatePipelineStep('roadmap', 'active');
        state.results.roadmap = await Agents.roadmap(state.problemText + ctx, state.results.analysis, state.results.architecture, state.results.implementation, state.results.businessValue || null, "", null, state.language);
        Renderers.renderRoadmap(state.results.roadmap, document.getElementById('roadmap-content'));
        updatePipelineStep('roadmap', 'completed');
        enableNav('roadmap');

        // Platform Value Growth
        updatePipelineStep('valueGrowth', 'active');
        state.results.platformValueGrowth = await Agents.platformValueGrowth(state.problemText + ctx, state.results.analysis, state.results.architecture, state.results.businessValue || null, "", null, state.language);
        Renderers.renderPlatformValueGrowth(state.results.platformValueGrowth, document.getElementById('valuegrowth-content'));
        updatePipelineStep('valueGrowth', 'completed');
        enableNav('valuegrowth');

        // Save the full generation to history
        document.getElementById('generatingAgentName').textContent = '💾 Saving Project & Preparing PDF Export...';
        setTimeout(() => saveHistory(state), 100);

        document.getElementById('generatingOverlay').classList.remove('visible');
        document.getElementById('btnExportPdf').style.display = 'block';
        switchPanel('valuegrowth');

    } catch (e) { showPipelineError(e); }

    state.generating = false;
    document.getElementById('generateBtn').disabled = false;
}

// ── Main Entry Point ──
async function generate() {
    const input = document.getElementById('problemInput');
    const text = input.value.trim();
    if (!text) {
        input.focus();
        return;
    }

    // Check API key
    if (!aiEngine.hasApiKey()) {
        showSettings();
        return;
    }

    state.problemText = text;
    state.generating = true;
    state.phaseNotes = {};

    // Show pipeline bar and overlay
    document.getElementById('pipelineBar').classList.add('visible');
    document.getElementById('generatingOverlay').classList.add('visible');
    document.getElementById('generateBtn').disabled = true;

    // Reset pipeline steps
    document.querySelectorAll('.pipeline-step').forEach(s => s.classList.remove('active', 'completed'));
    document.querySelectorAll('.pipeline-connector').forEach(c => c.classList.remove('completed'));

    await runPhase1Discovery(text);
}

// ── Regenerate Single Agent (GPT-5.2) ──
async function regenerate(agentKey) {
    if (state.generating || !state.results.analysis) return;

    state.generating = true;

    // Local loading indicator
    const btn = document.querySelector(`#panel-${agentKey} .btn-regenerate`);
    const originalHtml = btn ? btn.innerHTML : "";
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="chat-typing"><span></span><span></span><span></span></span>';
    }

    const refineInput = document.getElementById('refine-' + agentKey);
    const refinement = refineInput ? refineInput.value.trim() : "";

    const agentMap = {
        interpreter: async () => {
            state.results.analysis = await Agents.problemInterpreter(state.problemText, refinement, state.results.analysis, state.language);
            Renderers.renderAnalysis(state.results.analysis, document.getElementById('analysis-content'));
        },
        usecasescope: async () => {
            state.results.useCaseScope = await Agents.useCaseScope(state.problemText, state.results.analysis, refinement, state.results.useCaseScope, state.language);
            Renderers.renderUseCaseScope(state.results.useCaseScope, document.getElementById('usecasescope-content'));
        },
        domain: async () => {
            state.results.domainModel = await Agents.domainModelGenerator(state.problemText, state.results.analysis, refinement, state.results.domainModel, state.language);
            Renderers.renderDomainModel(state.results.domainModel, document.getElementById('domain-content'));
        },
        architecture: async () => {
            state.results.architecture = await Agents.architectureGenerator(state.problemText, state.results.analysis, state.results.domainModel, refinement, state.results.architecture, state.language);
            Renderers.renderArchitecture(state.results.architecture, document.getElementById('architecture-content'));
            setTimeout(() => renderMermaidDiagrams(), 100);
        },
        aimodel: async () => {
            state.results.aiModels = await Agents.aiModelAdvisor(state.problemText, state.results.analysis, refinement, state.results.aiModels, state.language);
            Renderers.renderAIModels(state.results.aiModels, document.getElementById('aimodels-content'));
        },
        agentic: async () => {
            state.results.agenticGuide = await Agents.agenticGuide(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.agenticGuide, state.language);
            Renderers.renderAgenticGuide(state.results.agenticGuide, document.getElementById('agentic-content'));
            setTimeout(() => renderMermaidDiagrams(), 100);
        },
        events: async () => {
            state.results.eventSystem = await Agents.eventSystemDesigner(state.problemText, state.results.analysis, state.results.domainModel, refinement, state.results.eventSystem, state.language);
            Renderers.renderEventSystem(state.results.eventSystem, document.getElementById('events-content'));
            setTimeout(() => renderMermaidDiagrams(), 100);
        },
        implementation: async () => {
            state.results.implementation = await Agents.implementationGenerator(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.implementation, state.language);
            Renderers.renderImplementation(state.results.implementation, document.getElementById('implementation-content'));
        },
        visualizer: async () => {
            state.results.diagrams = await Agents.architectureVisualizer(state.problemText, state.results.analysis, state.results.domainModel, state.results.architecture, refinement, state.results.diagrams, state.language);
            Renderers.renderDiagrams(state.results.diagrams, document.getElementById('diagrams-content'));
            setTimeout(() => renderMermaidDiagrams(), 100);
        },
        linter: async () => {
            const refineInput = document.getElementById('refine-linter');
            const refText = refineInput ? refineInput.value.trim() : "";
            state.results.linter = await Agents.vantiqLinter(state.problemText, state.results.analysis, state.results.architecture, state.results.eventSystem, state.results.implementation, refText, state.results.linter, state.language);
            Renderers.renderVantiqLinter(state.results.linter, document.getElementById('linter-content'));
        },
        competitive: async () => {
            const competitorsInput = document.getElementById('competitorsInput');
            const competitorsText = competitorsInput ? competitorsInput.value.trim() : '';
            state.results.competitive = await Agents.competitiveAnalysis(state.problemText, state.results.analysis, state.results.architecture, competitorsText, refinement, state.results.competitive, state.language);
            Renderers.renderCompetitiveAnalysis(state.results.competitive, document.getElementById('competitive-content'));
        },
        business: async () => {
            state.results.businessValue = await Agents.businessValue(state.problemText, state.results.analysis, state.results.architecture, refinement, state.results.businessValue, state.language);
            Renderers.renderBusinessValue(state.results.businessValue, document.getElementById('business-content'));
        },
        adjacent: async () => {
            state.results.adjacentUseCases = await Agents.adjacentUseCases(state.problemText, state.results.analysis, state.results.architecture, state.results.implementation, refinement, state.results.adjacentUseCases, state.language);
            Renderers.renderAdjacentUseCases(state.results.adjacentUseCases, document.getElementById('adjacent-content'));
        },
        roadmap: async () => {
            state.results.roadmap = await Agents.roadmap(state.problemText, state.results.analysis, state.results.architecture, state.results.implementation, state.results.businessValue, refinement, state.results.roadmap, state.language);
            Renderers.renderRoadmap(state.results.roadmap, document.getElementById('roadmap-content'));
        },
        valuegrowth: async () => {
            state.results.platformValueGrowth = await Agents.platformValueGrowth(state.problemText, state.results.analysis, state.results.architecture, state.results.businessValue, refinement, state.results.platformValueGrowth, state.language);
            Renderers.renderPlatformValueGrowth(state.results.platformValueGrowth, document.getElementById('valuegrowth-content'));
        }
    };

    try {
        if (agentMap[agentKey]) {
            await agentMap[agentKey]();
        }
    } catch (e) {
        console.error(`Regenerate ${agentKey} error:`, e);
        const contentMap = {
            interpreter: 'analysis-content',
            usecasescope: 'usecasescope-content',
            domain: 'domain-content',
            architecture: 'architecture-content',
            aimodel: 'aimodels-content',
            agentic: 'agentic-content',
            events: 'events-content',
            implementation: 'implementation-content',
            visualizer: 'diagrams-content',
            linter: 'linter-content',
            competitive: 'competitive-content',
            business: 'business-content',
            adjacent: 'adjacent-content',
            roadmap: 'roadmap-content',
            valuegrowth: 'valuegrowth-content'
        };
        showAgentError(contentMap[agentKey], agentKey, e);
    }

    state.generating = false;
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
    }
}

// ── Load Example ──
function loadExample(index) {
    const input = document.getElementById('problemInput');
    const examples = getExamples();
    input.value = examples[index] || examples[0];
    input.focus();
}

// ── Clear Input ──
function clearInput() {
    document.getElementById('problemInput').value = '';
    document.getElementById('problemInput').focus();
}

// ══════════════════════════════════════════════
// Usecase Assistant Chat
// ══════════════════════════════════════════════

const HF_SPACE_URL = 'https://souhail-meftah-vantiq.hf.space';
let chatMessageId = 0;

function chatMarkdownToHtml(text) {
    if (!text) return "";
    text = String(text);
    // 1. Extract links into placeholders BEFORE escaping
    const links = [];
    // Markdown links: [text](url)
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, (_, label, url) => {
        links.push(`<a href="${url}" target="_blank" rel="noopener" style="color:var(--brand-primary)">${label}</a>`);
        return `%%LINK_${links.length - 1}%%`;
    });
    // Bare URLs
    text = text.replace(/(https?:\/\/[^\s<>\)\]"',]+)/g, (url) => {
        links.push(`<a href="${url}" target="_blank" rel="noopener" style="color:var(--brand-primary)">${url}</a>`);
        return `%%LINK_${links.length - 1}%%`;
    });

    // 2. Now escape HTML entities safely
    text = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/```([\s\S]*?)```/g, '<pre style="background:rgba(255,255,255,0.04);padding:12px;border-radius:8px;overflow-x:auto;margin:8px 0"><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^### (.+)$/gm, '<div style="font-weight:600;font-size:14px;margin:12px 0 4px;color:var(--brand-primary)">$1</div>')
        .replace(/^## (.+)$/gm, '<div style="font-weight:700;font-size:15px;margin:14px 0 6px;color:var(--text-primary)">$1</div>')
        .replace(/^[-*] (.+)$/gm, '• $1')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

    // 3. Restore links
    text = text.replace(/%%LINK_(\d+)%%/g, (_, i) => links[parseInt(i)]);
    return text;
}

function addChatMessage(role, content, isTyping = false) {
    const container = document.getElementById('chatMessages');
    const id = 'chat-msg-' + (++chatMessageId);
    const avatar = role === 'user' ? '👤' : '🤖';
    const bubbleContent = isTyping
        ? '<div class="chat-typing"><span></span><span></span><span></span></div>'
        : (role === 'user' ? escapeHtml(content) : '<p>' + chatMarkdownToHtml(content) + '</p>');

    const div = document.createElement('div');
    div.className = 'chat-message ' + role;
    div.id = id;
    div.innerHTML = `
        <div class="chat-avatar">${avatar}</div>
        <div class="chat-bubble">${bubbleContent}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function updateChatMessage(id, content) {
    const msg = document.getElementById(id);
    if (!msg) return;
    const bubble = msg.querySelector('.chat-bubble');
    bubble.innerHTML = '<p>' + chatMarkdownToHtml(content) + '</p>';
    const container = document.getElementById('chatMessages');
    container.scrollTop = container.scrollHeight;
}

async function sendChat() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage('user', message);
    input.value = '';
    sendBtn.disabled = true;

    // Show typing indicator
    const typingId = addChatMessage('assistant', '', true);

    try {
        let answer = null;

        // Try /gradio_api/call/predict (Gradio 6.x uses /gradio_api prefix)
        try {
            const directRes = await fetch(`${HF_SPACE_URL}/gradio_api/call/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [message] })
            });
            if (directRes.ok) {
                const { event_id } = await directRes.json();
                const resultRes = await fetch(`${HF_SPACE_URL}/gradio_api/call/predict/${event_id}`);
                const text = await resultRes.text();
                const lines = text.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].startsWith('event: complete') && i + 1 < lines.length) {
                        const dataLine = lines[i + 1];
                        if (dataLine.startsWith('data: ')) {
                            answer = JSON.parse(dataLine.slice(6))[0];
                            break;
                        }
                    }
                    if (lines[i].startsWith('event: error') && i + 1 < lines.length) {
                        const dataLine = lines[i + 1];
                        if (dataLine.startsWith('data: ')) {
                            throw new Error(JSON.parse(dataLine.slice(6)));
                        }
                    }
                }
            }
        } catch (apiErr) {
            if (apiErr.message && !apiErr.message.includes('API returned')) throw apiErr;
        }

        if (answer) {
            updateChatMessage(typingId, answer);
        } else {
            updateChatMessage(typingId, '⚠️ No response received from the assistant. The HF Space may be sleeping — try again in a moment.');
        }
    } catch (error) {
        console.error('Chat error:', error);
        updateChatMessage(typingId, `⚠️ **Connection Error**\n\n${error.message}\n\nMake sure the [Vantiq HF Space](https://huggingface.co/spaces/Souhail-Meftah/Vantiq) is running and has been updated with the Gradio API.`);
    }

    sendBtn.disabled = false;
    input.focus();
}

function clearChat() {
    const container = document.getElementById('chatMessages');
    container.innerHTML = `
        <div class="chat-message assistant">
            <div class="chat-avatar">🤖</div>
            <div class="chat-bubble">
                <p data-i18n="chat-welcome-1">${I18N[state.language]['chat-welcome-1'] || I18N['en']['chat-welcome-1']}</p>
                <p style="margin-top:8px" data-i18n="chat-welcome-2">${I18N[state.language]['chat-welcome-2'] || I18N['en']['chat-welcome-2']}</p>
                <ul style="margin:8px 0 0 16px;font-size:13px;color:var(--text-secondary)">
                    <li data-i18n="chat-example-1">${I18N[state.language]['chat-example-1'] || I18N['en']['chat-example-1']}</li>
                    <li data-i18n="chat-example-2">${I18N[state.language]['chat-example-2'] || I18N['en']['chat-example-2']}</li>
                    <li data-i18n="chat-example-3">${I18N[state.language]['chat-example-3'] || I18N['en']['chat-example-3']}</li>
                </ul>
            </div>
        </div>`;
    chatMessageId = 0;
    localizeUI(); // Ensure new elements are localized
}

// Bind Enter key on chat input
document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChat();
    }
});

// ── Init ──
localizeUI();
updateStatus();
renderHistory();

// Auto-show settings if no API key
if (!aiEngine.hasApiKey()) {
    setTimeout(() => showSettings(), 500);
}



// ══════════════════════════════════════════════
// AI Coach — Contextual Chat Widget
// ══════════════════════════════════════════════

const coachHistory = {}; // per-panel conversation history
let coachCurrentPanel = null;

function getCoachPanelMap() {
    const lang = state.language || 'en';
    const maps = {
        en: {
            analysis: { contextKey: 'analysis', label: 'Problem Analysis', welcome: "Welcome! I'm your AI Coach for the", sub: "I can help you understand what was generated here, explain technical concepts, and answer any questions you have. Just ask me anything!", hint: 'Try: "Explain this section in simple terms" or "What are the key takeaways?"', suggestions: ["What is the core problem being solved here?", "Why is Vantiq a good fit for this use case?", "Explain the AI tasks identified"] },
            domain: { contextKey: 'domainModel', label: 'Domain Model', suggestions: ["What are domain entities and why do they matter?", "How do these entities relate to each other?", "What is a bounded context?"] },
            architecture: { contextKey: 'architecture', label: 'System Architecture', suggestions: ["Walk me through this architecture step by step", "What makes this event-driven?", "How does data flow through the system?"] },
            aimodels: { contextKey: 'aiModels', label: 'AI Model Recommendations', suggestions: ["Why were these specific AI models chosen?", "What is the difference between these model types?", "How would these models run in production?"] },
            agentic: { contextKey: 'agentic', label: 'Agentic Alternative', suggestions: ["Why use a traditional ML model instead of an LLM Agent here?", "How much token cost does using deterministic logic save?", "When should we augment this with an expensive LLM Agent?"] },
            events: { contextKey: 'events', label: 'Event System Design', suggestions: ["What is event-driven architecture?", "Explain the event flow in simple terms", "What are Visual Event Handlers?"] },
            implementation: { contextKey: 'implementation', label: 'Implementation Plan', suggestions: ["What should we build first?", "What Vantiq tools are needed for each phase?", "How long would this take to implement?"] },
            diagrams: { contextKey: 'diagrams', label: 'Architecture Diagrams', suggestions: ["Walk me through this diagram", "What do the arrows represent?", "How do the components connect?"] },
            demo: { contextKey: 'demo', label: 'Demo Scenarios', suggestions: ["How would I demo this to a customer?", "What are the key wow moments?", "What data do I need for the demo?"] },
            training: { contextKey: 'training', label: 'Training Labs', suggestions: ["What skills will participants learn?", "What prerequisites are needed?", "How long should each lab take?"] },
            business: { contextKey: 'businessValue', label: 'Business Value Justifier', suggestions: ["Explain the ROI in simple terms", "How do I present this to executives?", "What KPIs should we track?"] },
            competitive: { contextKey: 'competitive', label: 'Competitive Analysis', suggestions: ["Why choose Vantiq over competitor X?", "What are Vantiq's unique strengths?", "How do I handle pricing objections?"] },
            usecasescope: { contextKey: 'useCaseScope', label: 'Use Case Scope', suggestions: ["What's in scope for this use case?", "What success metrics are defined?", "How is the scope prioritized?"] },
            adjacent: { contextKey: 'adjacentUseCases', label: 'Adjacent Use Cases', suggestions: ["What other use cases could we expand into?", "Which components can be reused?", "How do these relate to the primary use case?"] },
            roadmap: { contextKey: 'roadmap', label: 'Implementation Roadmap', suggestions: ["What should we deliver first?", "What are the key milestones?", "How long until full deployment?"] },
            valuegrowth: { contextKey: 'platformValue', label: 'Platform Value Growth', suggestions: ["How does platform value compound over time?", "What maturity level are we targeting?", "What ROI can we expect at each stage?"] },
            linter: { contextKey: 'linter', label: 'Architecture Linter', suggestions: ["What are the most critical findings?", "How do quick wins improve the score?", "What Vantiq best practices are being assessed?"] }
        },
        ko: {
            analysis: { contextKey: 'analysis', label: '문제 분석', welcome: "환영합니다! 저는 다음 섹션의 AI 코치입니다: ", sub: "생성된 내용을 이해하고, 기술적인 개념을 설명하며, 궁금한 점에 답변해 드립니다. 무엇이든 물어보세요!", hint: '💡 제안: "이 섹션을 쉽게 설명해 줘" 또는 "핵심 요점이 무엇인가요?"', suggestions: ['여기서 해결하려는 핵심 문제는 무엇인가요?', '이 사용 사례에 Vantiq가 적합한 이유는 무엇인가요?', '식별된 AI 작업을 설명해 주세요'] },
            domain: { contextKey: 'domainModel', label: '도메인 모델', suggestions: ['도메인 엔티티란 무엇이며 왜 중요한가요?', '이 엔티티들은 서로 어떻게 연결되나요?', '제한된 컨텍스트(Bounded Context)란 무엇인가요?'] },
            architecture: { contextKey: 'architecture', label: '시스템 아키텍처', suggestions: ['이 아키텍처를 단계별로 설명해 주세요', '이 시스템이 이벤트 기반인 이유는 무엇인가요?', '시스템 전체에서 데이터가 어떻게 흐르나요?'] },
            aimodels: { contextKey: 'aiModels', label: 'AI 모델 추천', suggestions: ['왜 특정 AI 모델들이 선택되었나요?', '각 모델 유형 간의 차이점은 무엇인가요?', '이러한 모델들은 프로덕션에서 어떻게 실행되나요?'] },
            agentic: { contextKey: 'agentic', label: '에이전틱 대안', suggestions: ['여기에 LLM 에이전트 대신 기존 ML 모델을 사용하는 이유는 무엇인가요?', '결정론적 로직을 사용하면 토큰 비용이 얼마나 절감되나요?', '언제 비용이 많이 드는 LLM 에이전트로 시스템을 증강해야 하나요?'] },
            events: { contextKey: 'events', label: '이벤트 시스템 설계', suggestions: ['이벤트 기반 아키텍처란 무엇인가요?', '이벤트 흐름을 쉽게 설명해 주세요', '시각적 이벤트 핸들러(Visual Event Handlers)란 무엇인가요?'] },
            implementation: { contextKey: 'implementation', label: '구현 계획', suggestions: ['가장 먼저 무엇을 개발해야 하나요?', '각 단계에서 필요한 Vantiq 도구는 무엇인가요?', '이 시스템을 구현하는 데 시간이 얼마나 걸리나요?'] },
            diagrams: { contextKey: 'diagrams', label: '아키텍처 다이어그램', suggestions: ['이 다이어그램을 설명해 주세요', '이 화살표는 무엇을 상징하나요?', '컴포넌트들은 어떻게 연결되어 있나요?'] },
            demo: { contextKey: 'demo', label: '데모 시나리오', suggestions: ['고객에게 이 데모를 어떻게 시연해야 하나요?', '가장 중요한 "와우 포인트(wow moments)"는 무엇인가요?', '데모에 필요한 데이터는 무엇인가요?'] },
            training: { contextKey: 'training', label: '교육 랩', suggestions: ['참가자들은 어떤 기술을 배우게 되나요?', '이 과정을 위해 필요한 사전 지식은 무엇인가요?', '각 실습 랩은 보통 얼마나 걸리나요?'] },
            business: { contextKey: 'businessValue', label: '비즈니스 가치 증명', suggestions: ['ROI를 쉽게 설명해 주세요', '경영진에게 이 솔루션을 어떻게 제안해야 하나요?', '어떤 KPI를 추적해야 하나요?'] },
            competitive: { contextKey: 'competitive', label: '경쟁 분석', suggestions: ['경쟁사 X보다 Vantiq를 선택해야 하는 이유는 무엇인가요?', 'Vantiq만의 특별한 기능은 무엇인가요?', '비용에 대한 이의 제기에 어떻게 대처해야 하나요?'] },
            usecasescope: { contextKey: 'useCaseScope', label: '유스케이스 범위', suggestions: ['이 유스케이스의 범위는 무엇인가요?', '정의된 성공 지표는 무엇인가요?', '범위의 우선순위는 어떻게 결정되나요?'] },
            adjacent: { contextKey: 'adjacentUseCases', label: '인접 유스케이스', suggestions: ['어떤 다른 유스케이스로 확장할 수 있나요?', '어떤 컴포넌트를 재사용할 수 있나요?', '이 유스케이스들은 기본 유스케이스와 어떻게 관련되나요?'] },
            roadmap: { contextKey: 'roadmap', label: '구현 로드맵', suggestions: ['무엇을 먼저 제공해야 하나요?', '핵심 마일스톤은 무엇인가요?', '전체 배포까지 얼마나 걸리나요?'] },
            valuegrowth: { contextKey: 'platformValue', label: '플랫폼 가치 성장', suggestions: ['시간이 지남에 따라 플랫폼 가치는 어떻게 복합 성장하나요?', '목표 성숙도 수준은 무엇인가요?', '각 단계에서 기대할 수 있는 ROI는 무엇인가요?'] },
            linter: { contextKey: 'linter', label: '아키텍처 린터', suggestions: ['가장 중요한 발견 사항은 무엇인가요?', '빠른 수정(Quick Wins)이 점수를 어떻게 개선하나요?', '어떤 Vantiq 모범 사례가 평가되고 있나요?'] }
        },
        ja: {
            analysis: { contextKey: 'analysis', label: '問題分析', welcome: "ようこそ！私は次のセクションのAIコーチです: ", sub: "ここで生成された内容を理解し、技術的な概念を説明し、質問にお答えします。何でも聞いてください！", hint: '💡 ヒント: "このセクションを簡単に説明して" または "重要なポイントは何ですか？"', suggestions: ['ここで解決すべき核となる問題は何ですか？', 'このユースケースにVantiqが適している理由は何ですか？', '特定されたAIタスクについて説明してください'] },
            domain: { contextKey: 'domainModel', label: 'ドメインモデル', suggestions: ['ドメインエンティティとは何ですか？なぜ重要なのですか？', 'これらのエンティティは互いにどのように関連していますか？', '境界づけられたコンテキスト（Bounded Context）とは何ですか？'] },
            architecture: { contextKey: 'architecture', label: 'システムアーキテクチャ', suggestions: ['このアーキテクチャをステップバイステップで説明してください', 'どこがイベント駆動型なのですか？', 'システム内でデータはどのように流れますか？'] },
            aimodels: { contextKey: 'aiModels', label: 'AIモデルの推奨', suggestions: ['なぜこれらの特定のAIモデルが選ばれたのですか？', 'これらのモデルタイプの違いは何ですか？', 'これらのモデルは本番環境でどのように実行されますか？'] },
            agentic: { contextKey: 'agentic', label: 'エージェント代替案', suggestions: ['ここでLLMエージェントの代わりに従来のMLモデルを使用する理由は何ですか？', '決定論的ロジックを使用することで、トークンコストはどのくらい節約できますか？', 'いつ高価なLLMエージェントでシステムを拡張すべきですか？'] },
            events: { contextKey: 'events', label: 'イベントシステム設計', suggestions: ['イベント駆動型アーキテクチャとは何ですか？', 'イベントのフローを簡単に説明してください', 'ビジュアルイベントハンドラー（Visual Event Handlers）とは何ですか？'] },
            implementation: { contextKey: 'implementation', label: '実装計画', suggestions: ['最初に何を構築すべきですか？', '各フェーズでどのVantiqツールが必要ですか？', 'これを実装するのにどのくらいかかりますか？'] },
            diagrams: { contextKey: 'diagrams', label: 'アーキテクチャ図', suggestions: ['この図について説明してください', '矢印は何を表していますか？', 'コンポーネントはどのように接続されていますか？'] },
            demo: { contextKey: 'demo', label: 'デモシナリオ', suggestions: ['これを顧客にどのようにデモすればよいですか？', '重要な「ワオ(Wow)」の瞬間は何ですか？', 'デモにはどのようなデータが必要ですか？'] },
            training: { contextKey: 'training', label: 'トレーニングラボ', suggestions: ['参加者はどのようなスキルを学びますか？', 'どのような前提知識が必要ですか？', '各ラボにはどのくらいの時間がかかりますか？'] },
            business: { contextKey: 'businessValue', label: 'ビジネス価値の証明', suggestions: ['ROIを簡単に説明してください', 'これを経営陣にどのようにプレゼンすればよいですか？', 'どのKPIを追跡すべきですか？'] },
            competitive: { contextKey: 'competitive', label: '競合分析', suggestions: ['競合他社XではなくVantiqを選ぶ理由は何ですか？', 'Vantiq独自の卓越した強みは何ですか？', '価格に関する異議にどのように対処すべきですか？'] },
            usecasescope: { contextKey: 'useCaseScope', label: 'ユースケース範囲', suggestions: ['このユースケースの範囲は何ですか？', '定義された成功指標は何ですか？', '範囲の優先順位はどのように決定されますか？'] },
            adjacent: { contextKey: 'adjacentUseCases', label: '隣接するユースケース', suggestions: ['他にどのようなユースケースに拡張できますか？', 'どのコンポーネントを再利用できますか？', 'これらはプライマリユースケースとどのように関連していますか？'] },
            roadmap: { contextKey: 'roadmap', label: '実装ロードマップ', suggestions: ['最初に何を提供すべきですか？', '重要なマイルストーンは何ですか？', '完全な展開までどのくらいかかりますか？'] },
            valuegrowth: { contextKey: 'platformValue', label: 'プラットフォーム価値の成長', suggestions: ['プラットフォームの価値は時間とともにどのように複利成長しますか？', '目標とする成熟度レベルは何ですか？', '各段階で期待できるROIは何ですか？'] },
            linter: { contextKey: 'linter', label: 'アーキテクチャリンター', suggestions: ['最も重要な発見事項は何ですか？', 'クイックウィン(Quick Wins)はスコアをどのように改善しますか？', 'どのようなVantiqベストプラクティスが評価されていますか？'] }
        },
        ar: {
            analysis: { contextKey: 'analysis', label: 'تحليل المشكلة', welcome: "مرحباً! أنا مدرب الذكاء الاصطناعي الخاص بك لقسم", sub: "يمكنني مساعدتك في فهم ما تم إنشاؤه هنا، وشرح المفاهيم التقنية، والإجابة على أي أسئلة لديك. اسألني أي شيء!", hint: '💡 جرب أن تسأل: "اشرح هذا القسم بعبارات بسيطة" أو "ما هي النقاط الرئيسية؟"', suggestions: ['ما هي المشكلة الأساسية التي يتم حلها هنا؟', 'لماذا تعتبر منصة Vantiq مناسبة لحالة الاستخدام هذه؟', 'اشرح مهام الذكاء الاصطناعي المحددة في النظام'] },
            domain: { contextKey: 'domainModel', label: 'نموذج المجال (Domain Model)', suggestions: ['ما هي كيانات المجال ولماذا هي مهمة؟', 'كيف ترتبط هذه الكيانات ببعضها البعض؟', 'ما هو السياق المقيد (Bounded Context)؟'] },
            architecture: { contextKey: 'architecture', label: 'بنية النظام (Architecture)', suggestions: ['اشرح لي هذه البنية خطوة بخطوة', 'ما الذي يجعل هذا النظام مبنياً على الأحداث؟', 'كيف تتدفق البيانات عبر هذا النظام؟'] },
            aimodels: { contextKey: 'aiModels', label: 'توصيات نماذج الذكاء الاصطناعي', suggestions: ['لماذا تم اختيار هذه النماذج المحددة للذكاء الاصطناعي؟', 'ما هو الفرق بين أنواع هذه النماذج المختلفة؟', 'كيف ستعمل هذه النماذج في بيئة الإنتاج الفعلي؟'] },
            agentic: { contextKey: 'agentic', label: 'البديل الوكيلي', suggestions: ['لماذا نستخدم نموذج تعلم آلي تقليدي (ML) بدلاً من متحدث ذكي (LLM Agent) هنا؟', 'كم تكلفة الرموز التي يوفرها استخدام المنطق البرمجي العادي؟', 'متى يجب أن نعزز هذا النظام بوكيل ذكاء اصطناعي مكلف؟'] },
            events: { contextKey: 'events', label: 'تصميم نظام الأحداث (Event System)', suggestions: ['ما هي البنية القائمة على الأحداث؟', 'اشرح لي تدفق الأحداث بعبارات بسيطة', 'ما هي معالجات الأحداث المرئية (Visual Event Handlers)؟'] },
            implementation: { contextKey: 'implementation', label: 'خطة التنفيذ (Implementation)', suggestions: ['ما الذي يجب أن نبدأ ببنائه أولاً؟', 'ما هي أدوات Vantiq المطلوبة لكل مرحلة؟', 'كم من الوقت سيستغرق تنفيذ وتطوير هذا النظام؟'] },
            diagrams: { contextKey: 'diagrams', label: 'مخططات البنية والهيكلة', suggestions: ['اشرح لي تفاصيل هذا المخطط', 'ماذا تمثل هذه الأسهم تحديداً؟', 'كيف تتصل وتتفاعل المكونات مع بعضها البعض؟'] },
            demo: { contextKey: 'demo', label: 'سيناريوهات العرض التجريبي (Demo)', suggestions: ['كيف سأقوم بعرض وفكرة هذا النظام للعميل؟', 'ما هي اللحظات المبهرة (Wow moments) الرئيسية الممكنة؟', 'ما هي البيانات التي أحتاجها لعمل العرض التجريبي؟'] },
            training: { contextKey: 'training', label: 'مختبرات التدريب والتعليم', suggestions: ['ما هي المهارات الرئيسية التي سيتعلمها المشاركون؟', 'ما هي المتطلبات الأساسية اللازمة للبدء؟', 'كم يجب أن يستغرق إكمال كل مختبر؟'] },
            business: { contextKey: 'businessValue', label: 'مبرر قيمة الأعمال والتكلفة', suggestions: ['اشرح العائد على الاستثمار (ROI) بعبارات واضحة وبسيطة', 'كيف أعرض هذا النظام وفوائده على المديرين التنفيذيين؟', 'ما هي مؤشرات الأداء الرئيسية (KPIs) التي يجب تتبعها وتسجيلها؟'] },
            competitive: { contextKey: 'competitive', label: 'التحليل التنافسي (Competitive Analysis)', suggestions: ['لماذا نختار Vantiq بدلاً من حلول المنافس X؟', 'ما هي نقاط القوة والميزات الفريدة لـ Vantiq؟', 'كيف أتعامل مع اعتراضات العملاء على الأسعار والتكاليف؟'] },
            usecasescope: { contextKey: 'useCaseScope', label: 'نطاق حالة الاستخدام', suggestions: ['ما هو نطاق حالة الاستخدام هذه؟', 'ما هي مقاييس النجاح المحددة؟', 'كيف يتم تحديد أولويات النطاق؟'] },
            adjacent: { contextKey: 'adjacentUseCases', label: 'حالات الاستخدام المجاورة', suggestions: ['ما هي حالات الاستخدام الأخرى التي يمكننا التوسع فيها؟', 'ما هي المكونات التي يمكن إعادة استخدامها؟', 'كيف ترتبط هذه بحالة الاستخدام الأساسية؟'] },
            roadmap: { contextKey: 'roadmap', label: 'خارطة طريق التنفيذ', suggestions: ['ما الذي يجب تقديمه أولاً؟', 'ما هي المعالم الرئيسية؟', 'كم من الوقت حتى النشر الكامل؟'] },
            valuegrowth: { contextKey: 'platformValue', label: 'نمو قيمة المنصة', suggestions: ['كيف تتراكم قيمة المنصة بمرور الوقت؟', 'ما هو مستوى النضج المستهدف؟', 'ما هو العائد على الاستثمار المتوقع في كل مرحلة؟'] },
            linter: { contextKey: 'linter', label: 'مدقق البنية التحتية', suggestions: ['ما هي أهم النتائج؟', 'كيف تحسن الإصلاحات السريعة الدرجة؟', 'ما هي أفضل ممارسات Vantiq التي يتم تقييمها؟'] }
        }
    };

    const activeMap = maps[lang] || maps.en;

    // Propagate standard welcome arrays onto each panel item
    const baseWelcome = activeMap.analysis.welcome;
    const baseSub = activeMap.analysis.sub;
    const baseHint = activeMap.analysis.hint;
    for (let key in activeMap) {
        activeMap[key].welcome = baseWelcome;
        activeMap[key].sub = baseSub;
        activeMap[key].hint = baseHint;
    }

    return activeMap;
}

function openCoach(panelKey) {
    const pMap = getCoachPanelMap();
    const mapping = pMap[panelKey];
    if (!mapping) return;

    coachCurrentPanel = panelKey;
    const drawer = document.getElementById('aiCoachDrawer');
    const contextLabel = document.getElementById('coachContextLabel');
    const messagesEl = document.getElementById('coachMessages');

    // Update header context label
    contextLabel.textContent = mapping.label;

    // Initialize history for this panel if needed
    if (!coachHistory[panelKey]) {
        coachHistory[panelKey] = [];
    }

    // Render existing messages or show welcome
    messagesEl.innerHTML = '';
    if (coachHistory[panelKey].length === 0) {

        // Generate suggested prompt chips
        let suggestionsHtml = '';
        if (mapping.suggestions) {
            mapping.suggestions.forEach(sug => {
                suggestionsHtml += `<div class="coach-suggestion-chip" onclick="app.askCoachSuggestion('${sug.replace(/'/g, "\\'")}')">${sug}</div>`;
            });
        }

        // Show welcome message
        const isRtl = (state.language === 'ar') ? 'dir="rtl" style="text-align:right"' : '';
        const welcomeHtml = `<div class="coach-msg assistant" ${isRtl}>
            <div class="coach-msg-avatar">🎓</div>
            <div class="coach-msg-bubble">
                <strong>${mapping.welcome}</strong> <em>${mapping.label}</em>.<br><br>
                ${mapping.sub}<br><br>
                <em style="color:var(--text-tertiary);font-size:12px">${mapping.hint}</em>
                <div style="margin-top:10px;display:flex;flex-direction:column;gap:6px">${suggestionsHtml}</div>
            </div>
        </div>`;
        messagesEl.innerHTML = welcomeHtml;
    } else {
        // Re-render saved messages
        coachHistory[panelKey].forEach(msg => {
            appendCoachMessage(msg.role, msg.content, false);
        });
    }

    // Open drawer
    drawer.classList.add('open');
    initCoachResize();

    // Focus input  
    setTimeout(() => document.getElementById('coachInput').focus(), 400);
}

function closeCoach() {
    document.getElementById('aiCoachDrawer').classList.remove('open');
}

function appendCoachMessage(role, content, save = true) {
    const messagesEl = document.getElementById('coachMessages');
    const avatar = role === 'assistant' ? '🎓' : '👤';

    const msgDiv = document.createElement('div');
    msgDiv.className = `coach-msg ${role}`;
    msgDiv.innerHTML = `
        <div class="coach-msg-avatar">${avatar}</div>
        <div class="coach-msg-bubble">${role === 'assistant' ? formatCoachMarkdown(content) : escapeHtml(content)}</div>
    `;
    messagesEl.appendChild(msgDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    if (save && coachCurrentPanel) {
        coachHistory[coachCurrentPanel].push({ role, content });
    }

    return msgDiv;
}

function formatCoachMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:12px">$1</code>')
        .replace(/\n/g, '<br>');
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function sendCoachMessage() {
    const input = document.getElementById('coachInput');
    const sendBtn = document.getElementById('coachSendBtn');
    const message = input.value.trim();
    if (!message || !coachCurrentPanel) return;

    if (!aiEngine.hasApiKey()) {
        alert('Please configure your OpenAI API key in Settings first.');
        return;
    }

    // Add user message
    appendCoachMessage('user', message);
    input.value = '';
    sendBtn.disabled = true;

    // Show typing indicator
    const messagesEl = document.getElementById('coachMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'coach-msg assistant';
    typingDiv.id = 'coachTyping';
    typingDiv.innerHTML = `
        <div class="coach-msg-avatar">🎓</div>
        <div class="coach-msg-bubble">
            <div class="coach-typing"><span></span><span></span><span></span></div>
        </div>
    `;
    messagesEl.appendChild(typingDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
        const pMap = getCoachPanelMap();
        const mapping = pMap[coachCurrentPanel];
        const contextData = state.results[mapping.contextKey];

        // Build context string (truncated to prevent token overflow)
        let contextStr = '';
        if (contextData) {
            contextStr = JSON.stringify(contextData);
            if (contextStr.length > 12000) {
                contextStr = contextStr.substring(0, 12000) + '... (truncated for brevity)';
            }
        }

        const systemPrompt = `You are the Vantiq Spark AI Coach — a highly professional and educational assistant embedded within an AI-powered solution design tool.

You are currently helping the user understand the "${mapping.label}" section of their generated solution.

CONTEXT (the generated output for this specific tab):
${contextStr}

RULES:
- Explain concepts clearly for beginners who may not have technical expertise.
- Reference specific items, names, and values from the generated output above to ground your explanations.
- Be professional, educational, warm, and encouraging.
- Keep answers concise: 2-4 short paragraphs maximum.
- Use markdown formatting (bold for emphasis, bullet points for lists).
- If the user asks about content from other tabs, politely suggest they open the AI Coach on that specific tab for the most accurate context.
- Never fabricate information that isn't in the context above.
- You MUST respond in ${state.language === 'ko' ? 'Korean' : state.language === 'ja' ? 'Japanese' : state.language === 'ar' ? 'Arabic' : 'English'}, regardless of the language the user uses.`;

        // Build conversation messages
        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        // Add conversation history (last 10 exchanges to keep prompt size manageable)
        const history = coachHistory[coachCurrentPanel] || [];
        const recentHistory = history.slice(-20); // last 10 pairs
        recentHistory.forEach(msg => {
            messages.push({ role: msg.role, content: msg.content });
        });

        // Call OpenAI directly
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aiEngine.apiKey}`
            },
            signal: controller.signal,
            body: JSON.stringify({
                model: aiEngine.model,
                messages: messages,
                temperature: 0.6,
                max_tokens: 1024
            })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`API error (${response.status}): ${errBody.substring(0, 200)}`);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'No response received.';

        // Remove typing indicator and add response
        const typing = document.getElementById('coachTyping');
        if (typing) typing.remove();

        appendCoachMessage('assistant', reply);

    } catch (error) {
        console.error('Coach error:', error);
        const typing = document.getElementById('coachTyping');
        if (typing) typing.remove();

        appendCoachMessage('assistant', `⚠️ **Error:** ${error.message}\n\nPlease check your API key and try again.`);
    }

    sendBtn.disabled = false;
    input.focus();
}

// ── Coach Drawer Resize ──
let coachResizeInitialized = false;

function initCoachResize() {
    if (coachResizeInitialized) return;
    const handle = document.getElementById('coachResizeHandle');
    const drawer = document.getElementById('aiCoachDrawer');
    if (!handle || !drawer) return;
    coachResizeInitialized = true;

    let isResizing = false;

    handle.addEventListener('mousedown', (e) => {
        isResizing = true;
        drawer.classList.add('resizing');
        handle.classList.add('active');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        e.preventDefault();
        const isRTL = document.documentElement.dir === 'rtl';
        let newWidth;
        if (isRTL) {
            newWidth = e.clientX;
        } else {
            newWidth = window.innerWidth - e.clientX;
        }
        newWidth = Math.min(800, Math.max(320, newWidth));
        drawer.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (!isResizing) return;
        isResizing = false;
        drawer.classList.remove('resizing');
        handle.classList.remove('active');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    });
}


function askCoachSuggestion(text) {
    const input = document.getElementById('coachInput');
    if (input) {
        input.value = text;
        sendCoachMessage();
    }
}

// ── Public API ──
window.app = {
    generate,
    regenerate,
    loadExample,
    clearInput,
    showSettings,
    hideSettings,
    saveSettings,
    updateLanguage,
    sendChat,
    clearChat,
    loadSession,
    clearHistory,
    showHistory,
    renameSession,
    exportToPDF,
    openCoach,
    closeCoach,
    sendCoachMessage,
    askCoachSuggestion,
    runPhase2Value,
    runPhase3Architecture,
    runPhase4AIConsulting,
    runPhase5Implementation,
    runPhase6Expansion
};

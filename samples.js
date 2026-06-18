const PRELOADED_SAMPLES = {
  "retail_inventory": {
    "title": "Retail Inventory Management",
    "description": "Real-time retail inventory tracking using RFID tags and in-store cameras to prevent stockouts and detect misplaced items.",
    "results": {
      "analysis": {
        "domainIcon": "🏬",
        "domain": "Retail & Operations",
        "summary": "A real-time inventory management system leveraging RFID and smart cameras to track stock levels instantly across all store zones.",
        "currentState": "Periodic manual scanning resulting in inaccurate counts, delayed restocking, and lost revenue.",
        "whyHardWithoutVantiq": "Integrating real-time, high-throughput RFID streams with computer vision events from hundreds of edge nodes requires complex stream processing and edge-to-cloud synchronization.",
        "urgency": {
          "level": "Critical",
          "justification": "Lost sales and frustrated customers due to phantom inventory."
        },
        "painPoints": [
          {
            "pain": "Stockouts",
            "severity": "High",
            "impact": "Lost revenue and reduced customer loyalty."
          },
          {
            "pain": "Labor Inefficiency",
            "severity": "Medium",
            "impact": "Staff spending hours manually scanning items."
          },
          {
            "pain": "Misplaced Items",
            "severity": "High",
            "impact": "Items technically in stock but unavailable to shoppers."
          }
        ],
        "stakeholders": [
          {
            "role": "Store Manager",
            "concern": "Daily operations and sales targets",
            "benefit": "Real-time visibility into stockouts"
          },
          {
            "role": "Supply Chain VP",
            "concern": "Inventory accuracy",
            "benefit": "Accurate systemic inventory"
          }
        ],
        "qualifyingQuestions": [
          "What is your current inventory accuracy rate?",
          "How much labor is dedicated to physical counts?",
          "Are you already deploying RFID or smart cameras?"
        ]
      },
      "useCaseScope": {
        "scope": "Real-time tracking of apparel on the sales floor and backroom using RFID and ceiling cameras.",
        "inScope": [
          "RFID ingestion at the edge",
          "Real-time alerting to associate mobile devices",
          "Integration with master ERP inventory"
        ],
        "outOfScope": [
          "Point of Sale transaction processing",
          "Warehouse logistics tracking"
        ],
        "boundaries": "System applies only to physical brick-and-mortar locations.",
        "assumptions": [
          "Stores have adequate network infrastructure",
          "Items are pre-tagged with RFID at the distribution center"
        ],
        "constraints": [
          "Must process 10,000 tag reads per second per store",
          "Alert latency must be under 2 seconds"
        ]
      },
      "businessValue": {
        "summary": "Deploying this system will dramatically increase on-floor availability and reduce manual labor, driving immediate revenue lift.",
        "roiProjection": {
          "investmentRange": "$500K - $1M",
          "expectedReturn": "$3M - $5M/year",
          "paybackPeriod": "8-12 months",
          "roiPercentage": "400%"
        },
        "valueDrivers": [
          {
            "category": "Revenue Uplift",
            "impact": "Fewer stockouts lead to higher conversion.",
            "quantification": "+4% Top-line Revenue"
          },
          {
            "category": "Labor Savings",
            "impact": "Elimination of weekly physical counts.",
            "quantification": "$1M/year saved across 50 stores"
          }
        ],
        "riskMitigations": [
          {
            "risk": "Customer Churn",
            "solution": "Ensuring item availability prevents customers from switching to competitors."
          }
        ],
        "kpis": [
          {
            "metric": "Inventory Accuracy",
            "target": "99.9%",
            "timeframe": "Post-deployment"
          },
          {
            "metric": "Stockout Duration",
            "target": "< 15 minutes",
            "timeframe": "Monthly average"
          }
        ],
        "industryBenchmarks": [
          {
            "benchmark": "Retail inventory accuracy averages 65% without RFID.",
            "source": "Auburn University RFID Lab"
          }
        ]
      },
      "competitive": {
        "competitors": [
          {
            "name": "Legacy ERP Add-ons",
            "profile": "Traditional batch-oriented databases",
            "strengths": [
              "Deep enterprise integration",
              "Trusted brand"
            ],
            "weaknesses": [
              "Batch processing only",
              "High latency",
              "Cannot handle streaming edge data"
            ]
          },
          {
            "name": "Custom Cloud Infrastructure",
            "profile": "DIY on AWS/Azure",
            "strengths": [
              "Complete control",
              "Native cloud services"
            ],
            "weaknesses": [
              "High development cost",
              "Complex edge orchestration",
              "Long time to value"
            ]
          }
        ],
        "competitiveMatrix": [
          {
            "vendor": "Vantiq",
            "criterion": "Edge-to-Cloud Orchestration",
            "rating": "Strong",
            "note": "Native support for distributed edge processing."
          },
          {
            "vendor": "Legacy ERP",
            "criterion": "Edge-to-Cloud Orchestration",
            "rating": "Weak",
            "note": "Cloud-only, batch-oriented."
          },
          {
            "vendor": "Custom Cloud",
            "criterion": "Time to Market",
            "rating": "Weak",
            "note": "Requires heavy custom coding."
          },
          {
            "vendor": "Vantiq",
            "criterion": "Time to Market",
            "rating": "Strong",
            "note": "Low-code visual development."
          }
        ],
        "vantiqDifferentiators": [
          {
            "feature": "Native Edge Deployment",
            "description": "Deploy exactly the same logic to the edge as the cloud.",
            "competitorGap": "Competitors require separate tech stacks for edge vs cloud."
          },
          {
            "feature": "Visual Event Handlers",
            "description": "Design complex streaming logic visually.",
            "competitorGap": "Competitors require complex Java/Scala streaming code."
          }
        ],
        "objectionHandling": [
          {
            "objection": "We already have an ERP.",
            "response": "Vantiq complements your ERP by acting as the real-time nervous system, feeding curated, accurate data into it rather than replacing it."
          },
          {
            "objection": "Edge computing is too hard to manage.",
            "response": "Vantiq abstracts edge management. You deploy to the edge as easily as you deploy to the cloud."
          }
        ],
        "recommendation": "Focus on the agility of the edge-to-cloud architecture and the speed of development compared to a custom AWS build.",
        "winStrategy": [
          "Conduct a 2-week POV in a single store",
          "Prove 99% accuracy",
          "Demonstrate ERP integration"
        ]
      },
      "domainModel": {
        "entities": [
          {
            "type": "Asset",
            "name": "InventoryItem",
            "properties": [
              "rfidTag",
              "sku",
              "locationZone",
              "lastSeen",
              "status"
            ]
          },
          {
            "type": "Location",
            "name": "StoreZone",
            "properties": [
              "zoneId",
              "zoneType",
              "capacity",
              "readerIds"
            ]
          },
          {
            "type": "Event",
            "name": "StockoutEvent",
            "properties": [
              "eventId",
              "sku",
              "zone",
              "timestamp",
              "resolved"
            ]
          },
          {
            "type": "User",
            "name": "StoreAssociate",
            "properties": [
              "employeeId",
              "name",
              "currentZone",
              "taskQueue"
            ]
          }
        ],
        "events": [
          {
            "name": "RawTagRead",
            "type": "Raw Event",
            "trigger": "RFID reader detects a tag"
          },
          {
            "name": "ZoneChange",
            "type": "Derived Event",
            "trigger": "Item moves from one zone to another"
          },
          {
            "name": "ItemMisplaced",
            "type": "Derived Alert",
            "trigger": "Item remains in wrong zone for >10 mins"
          },
          {
            "name": "StockoutAlert",
            "type": "Business Event",
            "trigger": "Inventory for an active SKU drops below threshold on the sales floor"
          }
        ],
        "services": [
          {
            "name": "RFIDIngestionService",
            "responsibility": "Filter, smooth, and aggregate raw tag reads at the edge."
          },
          {
            "name": "InventoryStateService",
            "responsibility": "Maintain the real-time location of every item."
          },
          {
            "name": "NotificationService",
            "responsibility": "Route alerts to the correct store associate based on location."
          },
          {
            "name": "ERPIntegrationService",
            "responsibility": "Sync inventory state with the central ERP system."
          }
        ],
        "boundedContexts": [
          {
            "name": "Edge Processing Context",
            "description": "Handles raw hardware events.",
            "services": [
              "RFIDIngestionService"
            ]
          },
          {
            "name": "Core Inventory Context",
            "description": "Global state and alerting.",
            "services": [
              "InventoryStateService",
              "ERPIntegrationService"
            ]
          },
          {
            "name": "Task Management Context",
            "description": "Associate tasking.",
            "services": [
              "NotificationService"
            ]
          }
        ],
        "commands": [
          {
            "name": "TriggerRestockAlert",
            "target": "NotificationService",
            "action": "Send push to associate mobile app"
          },
          {
            "name": "SyncInventory",
            "target": "ERPIntegrationService",
            "action": "Push current counts to ERP"
          }
        ]
      },
      "architecture": {
        "components": [
          {
            "name": "Store Edge Node",
            "type": "Gateway",
            "responsibility": "Process RFID reads locally to reduce bandwidth.",
            "tech": [
              "Vantiq Edge",
              "MQTT",
              "Docker"
            ]
          },
          {
            "name": "Cloud Control Plane",
            "type": "Service",
            "responsibility": "Global inventory state and ERP sync.",
            "tech": [
              "Vantiq Cloud",
              "REST"
            ]
          },
          {
            "name": "Associate App",
            "type": "App",
            "responsibility": "Receive task notifications.",
            "tech": [
              "iOS",
              "Android",
              "WebSockets"
            ]
          },
          {
            "name": "Vision Analytics",
            "type": "AI Model",
            "responsibility": "Process RTSP camera feeds.",
            "tech": [
              "YOLOv8",
              "Python",
              "Vantiq"
            ]
          }
        ],
        "integrations": [
          {
            "system": "SAP ERP",
            "protocol": "REST/OData",
            "purpose": "Sync master SKU data and update final stock levels."
          },
          {
            "system": "Impinj Readers",
            "protocol": "LLRP/MQTT",
            "purpose": "Ingest raw tag events."
          },
          {
            "system": "Twilio",
            "protocol": "REST",
            "purpose": "Send SMS alerts for critical incidents."
          }
        ],
        "dataFlow": [
          "1. RFID readers publish to MQTT broker at the edge.",
          "2. Vantiq Edge node filters duplicate reads and publishes 'ZoneChange' events to Cloud.",
          "3. Vantiq Cloud updates global state and checks against ERP stock levels.",
          "4. If stockout detected, Cloud sends push notification to Associate App."
        ],
        "mermaidDiagram": "graph TD;\n  A[RFID Readers] -->|Raw MQTT| B[Vantiq Edge Node]\n  B -->|Filtered ZoneChange| C[Vantiq Cloud]\n  C -->|Updates| D[(SAP ERP)]\n  C -->|Alerts| E[Mobile App]",
        "scalabilityNotes": "Edge nodes handle the massive volume of raw reads. Cloud only processes state changes, ensuring horizontal scalability.",
        "securityConsiderations": [
          "Mutual TLS for edge-to-cloud communication.",
          "Encrypt inventory data at rest in the cloud.",
          "Role-based access control for associate apps."
        ],
        "principles": [
          "Process data close to the source.",
          "Design for offline edge autonomy."
        ]
      },
      "eventSystem": {
        "schemas": [
          {
            "eventName": "RawTagRead",
            "fields": [
              "epc",
              "antennaPort",
              "rssi",
              "timestamp"
            ]
          },
          {
            "eventName": "ZoneChange",
            "fields": [
              "rfidTag",
              "previousZone",
              "newZone",
              "timestamp"
            ]
          },
          {
            "eventName": "RestockAlert",
            "fields": [
              "sku",
              "zone",
              "quantityNeeded",
              "urgency"
            ]
          }
        ],
        "producers": [
          {
            "name": "RFID Gateway",
            "events": [
              "RawTagRead"
            ],
            "protocol": "MQTT",
            "frequency": "10,000/sec",
            "throughput": "High"
          },
          {
            "name": "Edge Node",
            "events": [
              "ZoneChange"
            ],
            "protocol": "Vantiq Async",
            "frequency": "50/sec",
            "throughput": "Medium"
          }
        ],
        "consumers": [
          {
            "name": "Cloud Node",
            "subscribesTo": [
              "ZoneChange"
            ],
            "action": "Update State",
            "errorStrategy": "Retry"
          },
          {
            "name": "Mobile App",
            "subscribesTo": [
              "RestockAlert"
            ],
            "action": "Show Notification",
            "errorStrategy": "Log"
          }
        ],
        "topics": [
          {
            "name": "/store/{id}/rfid",
            "usage": "Raw reads"
          },
          {
            "name": "/cloud/inventory/updates",
            "usage": "State changes"
          }
        ],
        "flowDiagram": "sequenceDiagram\n  participant RFID\n  participant Edge\n  participant Cloud\n  participant App\n  RFID->>Edge: RawTagRead\n  Edge->>Edge: Filter & Aggregate\n  Edge->>Cloud: ZoneChange\n  Cloud->>Cloud: Check Stock Rules\n  Cloud->>App: RestockAlert",
        "dataRetention": [
          {
            "eventType": "RawTagRead",
            "retentionPeriod": "5 minutes",
            "rationale": "Only needed for immediate smoothing at the edge."
          },
          {
            "eventType": "ZoneChange",
            "retentionPeriod": "30 days",
            "rationale": "Used for analytics and heat mapping."
          },
          {
            "eventType": "RestockAlert",
            "retentionPeriod": "1 year",
            "rationale": "Audit and associate performance metrics."
          }
        ]
      },
      "diagrams": {
        "diagrams": [
          {
            "title": "System Architecture",
            "type": "architecture",
            "description": "High-level overview of the distributed edge-to-cloud infrastructure.",
            "mermaid": "graph TD;\n  subgraph Edge[Store Location]\n    R1[RFID Readers] -->|MQTT| M[Mosquitto Broker]\n    C1[Cameras] -->|RTSP| AI[Vision Service]\n    M --> VEdge[Vantiq Edge Node]\n    AI --> VEdge\n  end\n  subgraph Cloud[Vantiq Cloud]\n    VEdge -->|Vantiq Async| VCloud[Vantiq Cloud Engine]\n    VCloud <--> DB[(State DB)]\n  end\n  subgraph External[Enterprise Systems]\n    VCloud <-->|REST| ERP[(SAP ERP)]\n    VCloud -->|Push| App[Associate Mobile App]\n  end"
          },
          {
            "title": "Component Interaction Flow",
            "type": "component",
            "description": "Details the sequence of events during a stockout scenario.",
            "mermaid": "sequenceDiagram\n  participant R as RFID Reader\n  participant E as Edge Node\n  participant C as Cloud Service\n  participant S as SAP ERP\n  participant A as Associate App\n  R->>E: Tag Read (Item removed)\n  E->>C: Zone Change (Sales Floor -> Out)\n  C->>C: Update In-Memory State\n  C->>C: Evaluate Stock Rule\n  C->>S: Query Master Inventory\n  S-->>C: Current Stock: 0\n  C->>A: Push Notification: Restock SKU"
          },
          {
            "title": "Deployment Topology",
            "type": "deployment",
            "description": "Physical deployment of nodes across the retail footprint.",
            "mermaid": "graph TB;\n  subgraph Region[North America]\n    subgraph Store1[Store 101]\n      EN1[Edge Node Docker] --> CR[Cloud Router]\n    end\n    subgraph Store2[Store 102]\n      EN2[Edge Node Docker] --> CR\n    end\n    CR --> VC[Vantiq Cloud Cluster AWS]\n  end"
          }
        ]
      },
      "aiModels": {
        "recommendations": [
          {
            "task": "Camera Feed Analysis",
            "approach": "Computer Vision",
            "deployment": "Edge",
            "models": [
              {
                "name": "YOLOv8",
                "size": "Small",
                "rationale": "Fast inference on edge hardware for detecting empty shelves."
              }
            ]
          },
          {
            "task": "Restock Prediction",
            "approach": "Time-series Forecasting",
            "deployment": "Cloud",
            "models": [
              {
                "name": "Custom XGBoost",
                "size": "Medium",
                "rationale": "Predicting when a shelf will go empty based on foot traffic patterns."
              }
            ]
          }
        ]
      },
      "agenticGuide": {
        "agents": [
          {
            "name": "Store Manager Agent",
            "role": "Orchestrator",
            "tools": [
              "GetInventoryLevel",
              "PageAssociate",
              "CheckSchedule"
            ],
            "interaction": "Monitors alerts and autonomously decides which associate to page based on their current location and workload."
          },
          {
            "name": "Replenishment Agent",
            "role": "Specialist",
            "tools": [
              "QueryERP",
              "DraftPurchaseOrder"
            ],
            "interaction": "Automatically drafts purchase orders when warehouse stock drops below safety thresholds."
          }
        ]
      },
      "implementation": {
        "phases": [
          {
            "phase": "Phase 1: POV",
            "duration": "4 weeks",
            "focus": "Single store RFID ingestion",
            "deliverables": [
              "Edge node deployed",
              "Basic alerting",
              "Hardware tuned"
            ]
          },
          {
            "phase": "Phase 2: ERP Integration",
            "duration": "6 weeks",
            "focus": "Two-way sync with SAP",
            "deliverables": [
              "Cloud service deployed",
              "SAP connector active"
            ]
          },
          {
            "phase": "Phase 3: Rollout",
            "duration": "12 weeks",
            "focus": "Scale to 50 stores",
            "deliverables": [
              "Automated provisioning",
              "Full dashboard",
              "Associate training"
            ]
          },
          {
            "phase": "Phase 4: AI Agent integration",
            "duration": "8 weeks",
            "focus": "Agentic orchestration",
            "deliverables": [
              "Store Manager Agent live",
              "Automated task routing"
            ]
          }
        ],
        "quickWins": [
          "Immediate visibility into backroom vs sales floor inventory.",
          "Automated nightly stock reconciliation."
        ],
        "risks": [
          {
            "risk": "Poor RFID read rates due to metal fixtures",
            "impact": "High",
            "mitigation": "Conduct thorough RF site survey before deployment and adjust antenna placement."
          },
          {
            "risk": "Associate adoption",
            "impact": "Medium",
            "mitigation": "Design ultra-simple UI for the mobile app and gamify restock tasks."
          }
        ]
      },
      "roadmap": {
        "quarters": [
          {
            "quarter": "Q1",
            "theme": "Foundation & POV",
            "milestones": [
              "Store 1 Live",
              "ERP Integration"
            ],
            "deliverables": [
              "Vantiq Edge config",
              "SAP Connector"
            ]
          },
          {
            "quarter": "Q2",
            "theme": "Cloud Scale",
            "milestones": [
              "50 Stores Live",
              "Dashboards Deployed"
            ],
            "deliverables": [
              "Monitoring Console",
              "Provisioning Scripts"
            ]
          },
          {
            "quarter": "Q3",
            "theme": "AI Vision Integration",
            "milestones": [
              "Camera Integration"
            ],
            "deliverables": [
              "YOLOv8 model deployment",
              "Multimodal event fusion"
            ]
          },
          {
            "quarter": "Q4",
            "theme": "Agentic Autonomy",
            "milestones": [
              "Agents Deployed"
            ],
            "deliverables": [
              "Store Manager Agent",
              "Dynamic task allocation"
            ]
          }
        ],
        "keyDecisionPoints": [
          "Go/No-go after Store 1 POV.",
          "Choose camera hardware vendor in Q2.",
          "Evaluate agent performance in Q4."
        ]
      },
      "adjacentUseCases": {
        "adjacentUseCases": [
          {
            "name": "Smart Fitting Rooms",
            "description": "Use RFID to detect items brought into fitting rooms to recommend accessories on a smart mirror.",
            "reusedComponents": [
              "RFIDIngestionService",
              "InventoryStateService"
            ],
            "newComponents": [
              "SmartMirror UI",
              "Recommendation Engine"
            ]
          },
          {
            "name": "Loss Prevention",
            "description": "Trigger cameras and lock doors if unpaid items move toward the exit.",
            "reusedComponents": [
              "RFIDIngestionService",
              "ZoneChange"
            ],
            "newComponents": [
              "SecurityAlertService",
              "DoorControlIntegration"
            ]
          },
          {
            "name": "Dynamic Pricing",
            "description": "Automatically lower prices on digital signs for items that have been on the floor too long.",
            "reusedComponents": [
              "InventoryStateService"
            ],
            "newComponents": [
              "PricingEngine",
              "DigitalSignIntegration"
            ]
          }
        ]
      }
    }
  },
  "supply_chain": {
    "title": "Supply Chain Logistics Tracking",
    "description": "Real-time tracking of high-value shipments across global transit routes using IoT sensors for location, temperature, and shock monitoring.",
    "results": {
      "analysis": {
        "domainIcon": "🚚",
        "domain": "Supply Chain",
        "summary": "A comprehensive logistics tracking system ensuring compliance and security for high-value goods in transit.",
        "currentState": "Periodic manual scanning resulting in inaccurate counts, delayed restocking, and lost revenue.",
        "whyHardWithoutVantiq": "Integrating real-time, high-throughput RFID streams with computer vision events from hundreds of edge nodes requires complex stream processing and edge-to-cloud synchronization.",
        "urgency": {
          "level": "Critical",
          "justification": "Lost sales and frustrated customers due to phantom inventory."
        },
        "painPoints": [
          {
            "pain": "Stockouts",
            "severity": "High",
            "impact": "Lost revenue and reduced customer loyalty."
          },
          {
            "pain": "Labor Inefficiency",
            "severity": "Medium",
            "impact": "Staff spending hours manually scanning items."
          },
          {
            "pain": "Misplaced Items",
            "severity": "High",
            "impact": "Items technically in stock but unavailable to shoppers."
          }
        ],
        "stakeholders": [
          {
            "role": "Store Manager",
            "concern": "Daily operations and sales targets",
            "benefit": "Real-time visibility into stockouts"
          },
          {
            "role": "Supply Chain VP",
            "concern": "Inventory accuracy",
            "benefit": "Accurate systemic inventory"
          }
        ],
        "qualifyingQuestions": [
          "What is your current inventory accuracy rate?",
          "How much labor is dedicated to physical counts?",
          "Are you already deploying RFID or smart cameras?"
        ]
      },
      "useCaseScope": {
        "scope": "Real-time tracking of apparel on the sales floor and backroom using RFID and ceiling cameras.",
        "inScope": [
          "RFID ingestion at the edge",
          "Real-time alerting to associate mobile devices",
          "Integration with master ERP inventory"
        ],
        "outOfScope": [
          "Point of Sale transaction processing",
          "Warehouse logistics tracking"
        ],
        "boundaries": "System applies only to physical brick-and-mortar locations.",
        "assumptions": [
          "Stores have adequate network infrastructure",
          "Items are pre-tagged with RFID at the distribution center"
        ],
        "constraints": [
          "Must process 10,000 tag reads per second per store",
          "Alert latency must be under 2 seconds"
        ]
      },
      "businessValue": {
        "summary": "Reduces spoilage and theft by providing immediate alerting when shipments deviate from defined parameters.",
        "roiProjection": {
          "investmentRange": "$500K - $1M",
          "expectedReturn": "$3M - $5M/year",
          "paybackPeriod": "8-12 months",
          "roiPercentage": "400%"
        },
        "valueDrivers": [
          {
            "category": "Revenue Uplift",
            "impact": "Fewer stockouts lead to higher conversion.",
            "quantification": "+4% Top-line Revenue"
          },
          {
            "category": "Labor Savings",
            "impact": "Elimination of weekly physical counts.",
            "quantification": "$1M/year saved across 50 stores"
          }
        ],
        "riskMitigations": [
          {
            "risk": "Customer Churn",
            "solution": "Ensuring item availability prevents customers from switching to competitors."
          }
        ],
        "kpis": [
          {
            "metric": "Inventory Accuracy",
            "target": "99.9%",
            "timeframe": "Post-deployment"
          },
          {
            "metric": "Stockout Duration",
            "target": "< 15 minutes",
            "timeframe": "Monthly average"
          }
        ],
        "industryBenchmarks": [
          {
            "benchmark": "Retail inventory accuracy averages 65% without RFID.",
            "source": "Auburn University RFID Lab"
          }
        ]
      },
      "competitive": {
        "competitors": [
          {
            "name": "Legacy ERP Add-ons",
            "profile": "Traditional batch-oriented databases",
            "strengths": [
              "Deep enterprise integration",
              "Trusted brand"
            ],
            "weaknesses": [
              "Batch processing only",
              "High latency",
              "Cannot handle streaming edge data"
            ]
          },
          {
            "name": "Custom Cloud Infrastructure",
            "profile": "DIY on AWS/Azure",
            "strengths": [
              "Complete control",
              "Native cloud services"
            ],
            "weaknesses": [
              "High development cost",
              "Complex edge orchestration",
              "Long time to value"
            ]
          }
        ],
        "competitiveMatrix": [
          {
            "vendor": "Vantiq",
            "criterion": "Edge-to-Cloud Orchestration",
            "rating": "Strong",
            "note": "Native support for distributed edge processing."
          },
          {
            "vendor": "Legacy ERP",
            "criterion": "Edge-to-Cloud Orchestration",
            "rating": "Weak",
            "note": "Cloud-only, batch-oriented."
          },
          {
            "vendor": "Custom Cloud",
            "criterion": "Time to Market",
            "rating": "Weak",
            "note": "Requires heavy custom coding."
          },
          {
            "vendor": "Vantiq",
            "criterion": "Time to Market",
            "rating": "Strong",
            "note": "Low-code visual development."
          }
        ],
        "vantiqDifferentiators": [
          {
            "feature": "Native Edge Deployment",
            "description": "Deploy exactly the same logic to the edge as the cloud.",
            "competitorGap": "Competitors require separate tech stacks for edge vs cloud."
          },
          {
            "feature": "Visual Event Handlers",
            "description": "Design complex streaming logic visually.",
            "competitorGap": "Competitors require complex Java/Scala streaming code."
          }
        ],
        "objectionHandling": [
          {
            "objection": "We use a standard tracking portal.",
            "response": "Portals require humans to watch them. Vantiq proactively alerts you the second a temperature drops, before spoilage occurs."
          },
          {
            "objection": "Edge computing is too hard to manage.",
            "response": "Vantiq abstracts edge management. You deploy to the edge as easily as you deploy to the cloud."
          }
        ],
        "recommendation": "Focus on the agility of the edge-to-cloud architecture and the speed of development compared to a custom AWS build.",
        "winStrategy": [
          "Conduct a 2-week POV in a single store",
          "Prove 99% accuracy",
          "Demonstrate ERP integration"
        ]
      },
      "domainModel": {
        "entities": [
          {
            "type": "Asset",
            "name": "InventoryItem",
            "properties": [
              "rfidTag",
              "sku",
              "locationZone",
              "lastSeen",
              "status"
            ]
          },
          {
            "type": "Location",
            "name": "StoreZone",
            "properties": [
              "zoneId",
              "zoneType",
              "capacity",
              "readerIds"
            ]
          },
          {
            "type": "Event",
            "name": "StockoutEvent",
            "properties": [
              "eventId",
              "sku",
              "zone",
              "timestamp",
              "resolved"
            ]
          },
          {
            "type": "User",
            "name": "StoreAssociate",
            "properties": [
              "employeeId",
              "name",
              "currentZone",
              "taskQueue"
            ]
          }
        ],
        "events": [
          {
            "name": "RawTagRead",
            "type": "Raw Event",
            "trigger": "RFID reader detects a tag"
          },
          {
            "name": "ZoneChange",
            "type": "Derived Event",
            "trigger": "Item moves from one zone to another"
          },
          {
            "name": "ItemMisplaced",
            "type": "Derived Alert",
            "trigger": "Item remains in wrong zone for >10 mins"
          },
          {
            "name": "StockoutAlert",
            "type": "Business Event",
            "trigger": "Inventory for an active SKU drops below threshold on the sales floor"
          }
        ],
        "services": [
          {
            "name": "RFIDIngestionService",
            "responsibility": "Filter, smooth, and aggregate raw tag reads at the edge."
          },
          {
            "name": "InventoryStateService",
            "responsibility": "Maintain the real-time location of every item."
          },
          {
            "name": "NotificationService",
            "responsibility": "Route alerts to the correct store associate based on location."
          },
          {
            "name": "ERPIntegrationService",
            "responsibility": "Sync inventory state with the central ERP system."
          }
        ],
        "boundedContexts": [
          {
            "name": "Edge Processing Context",
            "description": "Handles raw hardware events.",
            "services": [
              "RFIDIngestionService"
            ]
          },
          {
            "name": "Core Inventory Context",
            "description": "Global state and alerting.",
            "services": [
              "InventoryStateService",
              "ERPIntegrationService"
            ]
          },
          {
            "name": "Task Management Context",
            "description": "Associate tasking.",
            "services": [
              "NotificationService"
            ]
          }
        ],
        "commands": [
          {
            "name": "TriggerRestockAlert",
            "target": "NotificationService",
            "action": "Send push to associate mobile app"
          },
          {
            "name": "SyncInventory",
            "target": "ERPIntegrationService",
            "action": "Push current counts to ERP"
          }
        ]
      },
      "architecture": {
        "components": [
          {
            "name": "Store Edge Node",
            "type": "Gateway",
            "responsibility": "Process RFID reads locally to reduce bandwidth.",
            "tech": [
              "Vantiq Edge",
              "MQTT",
              "Docker"
            ]
          },
          {
            "name": "Cloud Control Plane",
            "type": "Service",
            "responsibility": "Global inventory state and ERP sync.",
            "tech": [
              "Vantiq Cloud",
              "REST"
            ]
          },
          {
            "name": "Associate App",
            "type": "App",
            "responsibility": "Receive task notifications.",
            "tech": [
              "iOS",
              "Android",
              "WebSockets"
            ]
          },
          {
            "name": "Vision Analytics",
            "type": "AI Model",
            "responsibility": "Process RTSP camera feeds.",
            "tech": [
              "YOLOv8",
              "Python",
              "Vantiq"
            ]
          }
        ],
        "integrations": [
          {
            "system": "SAP ERP",
            "protocol": "REST/OData",
            "purpose": "Sync master SKU data and update final stock levels."
          },
          {
            "system": "Impinj Readers",
            "protocol": "LLRP/MQTT",
            "purpose": "Ingest raw tag events."
          },
          {
            "system": "Twilio",
            "protocol": "REST",
            "purpose": "Send SMS alerts for critical incidents."
          }
        ],
        "dataFlow": [
          "1. RFID readers publish to MQTT broker at the edge.",
          "2. Vantiq Edge node filters duplicate reads and publishes 'ZoneChange' events to Cloud.",
          "3. Vantiq Cloud updates global state and checks against ERP stock levels.",
          "4. If stockout detected, Cloud sends push notification to Associate App."
        ],
        "mermaidDiagram": "graph TD;\n  A[RFID Readers] -->|Raw MQTT| B[Vantiq Edge Node]\n  B -->|Filtered ZoneChange| C[Vantiq Cloud]\n  C -->|Updates| D[(SAP ERP)]\n  C -->|Alerts| E[Mobile App]",
        "scalabilityNotes": "Edge nodes handle the massive volume of raw reads. Cloud only processes state changes, ensuring horizontal scalability.",
        "securityConsiderations": [
          "Mutual TLS for edge-to-cloud communication.",
          "Encrypt inventory data at rest in the cloud.",
          "Role-based access control for associate apps."
        ],
        "principles": [
          "Process data close to the source.",
          "Design for offline edge autonomy."
        ]
      },
      "eventSystem": {
        "schemas": [
          {
            "eventName": "RawTagRead",
            "fields": [
              "epc",
              "antennaPort",
              "rssi",
              "timestamp"
            ]
          },
          {
            "eventName": "ZoneChange",
            "fields": [
              "rfidTag",
              "previousZone",
              "newZone",
              "timestamp"
            ]
          },
          {
            "eventName": "RestockAlert",
            "fields": [
              "sku",
              "zone",
              "quantityNeeded",
              "urgency"
            ]
          }
        ],
        "producers": [
          {
            "name": "RFID Gateway",
            "events": [
              "RawTagRead"
            ],
            "protocol": "MQTT",
            "frequency": "10,000/sec",
            "throughput": "High"
          },
          {
            "name": "Edge Node",
            "events": [
              "ZoneChange"
            ],
            "protocol": "Vantiq Async",
            "frequency": "50/sec",
            "throughput": "Medium"
          }
        ],
        "consumers": [
          {
            "name": "Cloud Node",
            "subscribesTo": [
              "ZoneChange"
            ],
            "action": "Update State",
            "errorStrategy": "Retry"
          },
          {
            "name": "Mobile App",
            "subscribesTo": [
              "RestockAlert"
            ],
            "action": "Show Notification",
            "errorStrategy": "Log"
          }
        ],
        "topics": [
          {
            "name": "/store/{id}/rfid",
            "usage": "Raw reads"
          },
          {
            "name": "/cloud/inventory/updates",
            "usage": "State changes"
          }
        ],
        "flowDiagram": "sequenceDiagram\n  participant RFID\n  participant Edge\n  participant Cloud\n  participant App\n  RFID->>Edge: RawTagRead\n  Edge->>Edge: Filter & Aggregate\n  Edge->>Cloud: ZoneChange\n  Cloud->>Cloud: Check Stock Rules\n  Cloud->>App: RestockAlert",
        "dataRetention": [
          {
            "eventType": "RawTagRead",
            "retentionPeriod": "5 minutes",
            "rationale": "Only needed for immediate smoothing at the edge."
          },
          {
            "eventType": "ZoneChange",
            "retentionPeriod": "30 days",
            "rationale": "Used for analytics and heat mapping."
          },
          {
            "eventType": "RestockAlert",
            "retentionPeriod": "1 year",
            "rationale": "Audit and associate performance metrics."
          }
        ]
      },
      "diagrams": {
        "diagrams": [
          {
            "title": "System Architecture",
            "type": "architecture",
            "description": "High-level overview of the distributed edge-to-cloud infrastructure.",
            "mermaid": "graph LR;\n  A[IoT Sensors] -->|Cellular| B[Vantiq Cloud]\n  B --> C{Rule Engine}\n  C -- Temp Alert --> D[Dispatcher Dashboard]\n  C -- OK --> E[(Log DB)]"
          },
          {
            "title": "Component Interaction Flow",
            "type": "component",
            "description": "Details the sequence of events during a stockout scenario.",
            "mermaid": "sequenceDiagram\n  Sensor->>Cloud: Temp: 8C\n  Cloud->>Cloud: Evaluate Threshold (Max 5C)\n  Cloud->>Dispatcher: Alert: Spoilage Risk\n  Cloud->>DriverApp: Alert: Check Reefer Unit"
          },
          {
            "title": "Deployment Topology",
            "type": "deployment",
            "description": "Physical deployment of nodes across the retail footprint.",
            "mermaid": "graph TB;\n  subgraph Region[North America]\n    subgraph Store1[Store 101]\n      EN1[Edge Node Docker] --> CR[Cloud Router]\n    end\n    subgraph Store2[Store 102]\n      EN2[Edge Node Docker] --> CR\n    end\n    CR --> VC[Vantiq Cloud Cluster AWS]\n  end"
          }
        ]
      },
      "aiModels": {
        "recommendations": [
          {
            "task": "Camera Feed Analysis",
            "approach": "Computer Vision",
            "deployment": "Edge",
            "models": [
              {
                "name": "YOLOv8",
                "size": "Small",
                "rationale": "Fast inference on edge hardware for detecting empty shelves."
              }
            ]
          },
          {
            "task": "Restock Prediction",
            "approach": "Time-series Forecasting",
            "deployment": "Cloud",
            "models": [
              {
                "name": "Custom XGBoost",
                "size": "Medium",
                "rationale": "Predicting when a shelf will go empty based on foot traffic patterns."
              }
            ]
          }
        ]
      },
      "agenticGuide": {
        "agents": [
          {
            "name": "Store Manager Agent",
            "role": "Orchestrator",
            "tools": [
              "GetInventoryLevel",
              "PageAssociate",
              "CheckSchedule"
            ],
            "interaction": "Monitors alerts and autonomously decides which associate to page based on their current location and workload."
          },
          {
            "name": "Replenishment Agent",
            "role": "Specialist",
            "tools": [
              "QueryERP",
              "DraftPurchaseOrder"
            ],
            "interaction": "Automatically drafts purchase orders when warehouse stock drops below safety thresholds."
          }
        ]
      },
      "implementation": {
        "phases": [
          {
            "phase": "Phase 1: POV",
            "duration": "4 weeks",
            "focus": "Single store RFID ingestion",
            "deliverables": [
              "Edge node deployed",
              "Basic alerting",
              "Hardware tuned"
            ]
          },
          {
            "phase": "Phase 2: ERP Integration",
            "duration": "6 weeks",
            "focus": "Two-way sync with SAP",
            "deliverables": [
              "Cloud service deployed",
              "SAP connector active"
            ]
          },
          {
            "phase": "Phase 3: Rollout",
            "duration": "12 weeks",
            "focus": "Scale to 50 stores",
            "deliverables": [
              "Automated provisioning",
              "Full dashboard",
              "Associate training"
            ]
          },
          {
            "phase": "Phase 4: AI Agent integration",
            "duration": "8 weeks",
            "focus": "Agentic orchestration",
            "deliverables": [
              "Store Manager Agent live",
              "Automated task routing"
            ]
          }
        ],
        "quickWins": [
          "Immediate visibility into backroom vs sales floor inventory.",
          "Automated nightly stock reconciliation."
        ],
        "risks": [
          {
            "risk": "Poor RFID read rates due to metal fixtures",
            "impact": "High",
            "mitigation": "Conduct thorough RF site survey before deployment and adjust antenna placement."
          },
          {
            "risk": "Associate adoption",
            "impact": "Medium",
            "mitigation": "Design ultra-simple UI for the mobile app and gamify restock tasks."
          }
        ]
      },
      "roadmap": {
        "quarters": [
          {
            "quarter": "Q1",
            "theme": "Foundation & POV",
            "milestones": [
              "Store 1 Live",
              "ERP Integration"
            ],
            "deliverables": [
              "Vantiq Edge config",
              "SAP Connector"
            ]
          },
          {
            "quarter": "Q2",
            "theme": "Cloud Scale",
            "milestones": [
              "50 Stores Live",
              "Dashboards Deployed"
            ],
            "deliverables": [
              "Monitoring Console",
              "Provisioning Scripts"
            ]
          },
          {
            "quarter": "Q3",
            "theme": "AI Vision Integration",
            "milestones": [
              "Camera Integration"
            ],
            "deliverables": [
              "YOLOv8 model deployment",
              "Multimodal event fusion"
            ]
          },
          {
            "quarter": "Q4",
            "theme": "Agentic Autonomy",
            "milestones": [
              "Agents Deployed"
            ],
            "deliverables": [
              "Store Manager Agent",
              "Dynamic task allocation"
            ]
          }
        ],
        "keyDecisionPoints": [
          "Go/No-go after Store 1 POV.",
          "Choose camera hardware vendor in Q2.",
          "Evaluate agent performance in Q4."
        ]
      },
      "adjacentUseCases": {
        "adjacentUseCases": [
          {
            "name": "Smart Fitting Rooms",
            "description": "Use RFID to detect items brought into fitting rooms to recommend accessories on a smart mirror.",
            "reusedComponents": [
              "RFIDIngestionService",
              "InventoryStateService"
            ],
            "newComponents": [
              "SmartMirror UI",
              "Recommendation Engine"
            ]
          },
          {
            "name": "Loss Prevention",
            "description": "Trigger cameras and lock doors if unpaid items move toward the exit.",
            "reusedComponents": [
              "RFIDIngestionService",
              "ZoneChange"
            ],
            "newComponents": [
              "SecurityAlertService",
              "DoorControlIntegration"
            ]
          },
          {
            "name": "Dynamic Pricing",
            "description": "Automatically lower prices on digital signs for items that have been on the floor too long.",
            "reusedComponents": [
              "InventoryStateService"
            ],
            "newComponents": [
              "PricingEngine",
              "DigitalSignIntegration"
            ]
          }
        ]
      }
    }
  },
  "fraud_detection": {
    "title": "Real-Time Payment Fraud Detection",
    "description": "Analyzing millions of transactions per second to detect and block fraudulent payments before they settle.",
    "results": {
      "analysis": {
        "domainIcon": "💳",
        "domain": "Financial Services",
        "summary": "An ultra-low latency transaction processing engine integrating machine learning to score transactions in under 50ms.",
        "currentState": "Periodic manual scanning resulting in inaccurate counts, delayed restocking, and lost revenue.",
        "whyHardWithoutVantiq": "Integrating real-time, high-throughput RFID streams with computer vision events from hundreds of edge nodes requires complex stream processing and edge-to-cloud synchronization.",
        "urgency": {
          "level": "Critical",
          "justification": "Lost sales and frustrated customers due to phantom inventory."
        },
        "painPoints": [
          {
            "pain": "Stockouts",
            "severity": "High",
            "impact": "Lost revenue and reduced customer loyalty."
          },
          {
            "pain": "Labor Inefficiency",
            "severity": "Medium",
            "impact": "Staff spending hours manually scanning items."
          },
          {
            "pain": "Misplaced Items",
            "severity": "High",
            "impact": "Items technically in stock but unavailable to shoppers."
          }
        ],
        "stakeholders": [
          {
            "role": "Store Manager",
            "concern": "Daily operations and sales targets",
            "benefit": "Real-time visibility into stockouts"
          },
          {
            "role": "Supply Chain VP",
            "concern": "Inventory accuracy",
            "benefit": "Accurate systemic inventory"
          }
        ],
        "qualifyingQuestions": [
          "What is your current inventory accuracy rate?",
          "How much labor is dedicated to physical counts?",
          "Are you already deploying RFID or smart cameras?"
        ]
      },
      "useCaseScope": {
        "scope": "Real-time tracking of apparel on the sales floor and backroom using RFID and ceiling cameras.",
        "inScope": [
          "RFID ingestion at the edge",
          "Real-time alerting to associate mobile devices",
          "Integration with master ERP inventory"
        ],
        "outOfScope": [
          "Point of Sale transaction processing",
          "Warehouse logistics tracking"
        ],
        "boundaries": "System applies only to physical brick-and-mortar locations.",
        "assumptions": [
          "Stores have adequate network infrastructure",
          "Items are pre-tagged with RFID at the distribution center"
        ],
        "constraints": [
          "Must process 10,000 tag reads per second per store",
          "Alert latency must be under 2 seconds"
        ]
      },
      "businessValue": {
        "summary": "Prevents millions in fraudulent chargebacks while minimizing false positives to preserve customer experience.",
        "roiProjection": {
          "investmentRange": "$500K - $1M",
          "expectedReturn": "$3M - $5M/year",
          "paybackPeriod": "8-12 months",
          "roiPercentage": "400%"
        },
        "valueDrivers": [
          {
            "category": "Revenue Uplift",
            "impact": "Fewer stockouts lead to higher conversion.",
            "quantification": "+4% Top-line Revenue"
          },
          {
            "category": "Labor Savings",
            "impact": "Elimination of weekly physical counts.",
            "quantification": "$1M/year saved across 50 stores"
          }
        ],
        "riskMitigations": [
          {
            "risk": "Customer Churn",
            "solution": "Ensuring item availability prevents customers from switching to competitors."
          }
        ],
        "kpis": [
          {
            "metric": "Inventory Accuracy",
            "target": "99.9%",
            "timeframe": "Post-deployment"
          },
          {
            "metric": "Stockout Duration",
            "target": "< 15 minutes",
            "timeframe": "Monthly average"
          }
        ],
        "industryBenchmarks": [
          {
            "benchmark": "Retail inventory accuracy averages 65% without RFID.",
            "source": "Auburn University RFID Lab"
          }
        ]
      },
      "competitive": {
        "competitors": [
          {
            "name": "Legacy ERP Add-ons",
            "profile": "Traditional batch-oriented databases",
            "strengths": [
              "Deep enterprise integration",
              "Trusted brand"
            ],
            "weaknesses": [
              "Batch processing only",
              "High latency",
              "Cannot handle streaming edge data"
            ]
          },
          {
            "name": "Custom Cloud Infrastructure",
            "profile": "DIY on AWS/Azure",
            "strengths": [
              "Complete control",
              "Native cloud services"
            ],
            "weaknesses": [
              "High development cost",
              "Complex edge orchestration",
              "Long time to value"
            ]
          }
        ],
        "competitiveMatrix": [
          {
            "vendor": "Vantiq",
            "criterion": "Edge-to-Cloud Orchestration",
            "rating": "Strong",
            "note": "Native support for distributed edge processing."
          },
          {
            "vendor": "Legacy ERP",
            "criterion": "Edge-to-Cloud Orchestration",
            "rating": "Weak",
            "note": "Cloud-only, batch-oriented."
          },
          {
            "vendor": "Custom Cloud",
            "criterion": "Time to Market",
            "rating": "Weak",
            "note": "Requires heavy custom coding."
          },
          {
            "vendor": "Vantiq",
            "criterion": "Time to Market",
            "rating": "Strong",
            "note": "Low-code visual development."
          }
        ],
        "vantiqDifferentiators": [
          {
            "feature": "Native Edge Deployment",
            "description": "Deploy exactly the same logic to the edge as the cloud.",
            "competitorGap": "Competitors require separate tech stacks for edge vs cloud."
          },
          {
            "feature": "Visual Event Handlers",
            "description": "Design complex streaming logic visually.",
            "competitorGap": "Competitors require complex Java/Scala streaming code."
          }
        ],
        "objectionHandling": [
          {
            "objection": "We do daily batch fraud checks.",
            "response": "Batch checks catch fraud after the money is gone. Real-time blocking prevents the loss entirely."
          },
          {
            "objection": "Edge computing is too hard to manage.",
            "response": "Vantiq abstracts edge management. You deploy to the edge as easily as you deploy to the cloud."
          }
        ],
        "recommendation": "Focus on the agility of the edge-to-cloud architecture and the speed of development compared to a custom AWS build.",
        "winStrategy": [
          "Conduct a 2-week POV in a single store",
          "Prove 99% accuracy",
          "Demonstrate ERP integration"
        ]
      },
      "domainModel": {
        "entities": [
          {
            "type": "Asset",
            "name": "InventoryItem",
            "properties": [
              "rfidTag",
              "sku",
              "locationZone",
              "lastSeen",
              "status"
            ]
          },
          {
            "type": "Location",
            "name": "StoreZone",
            "properties": [
              "zoneId",
              "zoneType",
              "capacity",
              "readerIds"
            ]
          },
          {
            "type": "Event",
            "name": "StockoutEvent",
            "properties": [
              "eventId",
              "sku",
              "zone",
              "timestamp",
              "resolved"
            ]
          },
          {
            "type": "User",
            "name": "StoreAssociate",
            "properties": [
              "employeeId",
              "name",
              "currentZone",
              "taskQueue"
            ]
          }
        ],
        "events": [
          {
            "name": "RawTagRead",
            "type": "Raw Event",
            "trigger": "RFID reader detects a tag"
          },
          {
            "name": "ZoneChange",
            "type": "Derived Event",
            "trigger": "Item moves from one zone to another"
          },
          {
            "name": "ItemMisplaced",
            "type": "Derived Alert",
            "trigger": "Item remains in wrong zone for >10 mins"
          },
          {
            "name": "StockoutAlert",
            "type": "Business Event",
            "trigger": "Inventory for an active SKU drops below threshold on the sales floor"
          }
        ],
        "services": [
          {
            "name": "RFIDIngestionService",
            "responsibility": "Filter, smooth, and aggregate raw tag reads at the edge."
          },
          {
            "name": "InventoryStateService",
            "responsibility": "Maintain the real-time location of every item."
          },
          {
            "name": "NotificationService",
            "responsibility": "Route alerts to the correct store associate based on location."
          },
          {
            "name": "ERPIntegrationService",
            "responsibility": "Sync inventory state with the central ERP system."
          }
        ],
        "boundedContexts": [
          {
            "name": "Edge Processing Context",
            "description": "Handles raw hardware events.",
            "services": [
              "RFIDIngestionService"
            ]
          },
          {
            "name": "Core Inventory Context",
            "description": "Global state and alerting.",
            "services": [
              "InventoryStateService",
              "ERPIntegrationService"
            ]
          },
          {
            "name": "Task Management Context",
            "description": "Associate tasking.",
            "services": [
              "NotificationService"
            ]
          }
        ],
        "commands": [
          {
            "name": "TriggerRestockAlert",
            "target": "NotificationService",
            "action": "Send push to associate mobile app"
          },
          {
            "name": "SyncInventory",
            "target": "ERPIntegrationService",
            "action": "Push current counts to ERP"
          }
        ]
      },
      "architecture": {
        "components": [
          {
            "name": "Store Edge Node",
            "type": "Gateway",
            "responsibility": "Process RFID reads locally to reduce bandwidth.",
            "tech": [
              "Vantiq Edge",
              "MQTT",
              "Docker"
            ]
          },
          {
            "name": "Cloud Control Plane",
            "type": "Service",
            "responsibility": "Global inventory state and ERP sync.",
            "tech": [
              "Vantiq Cloud",
              "REST"
            ]
          },
          {
            "name": "Associate App",
            "type": "App",
            "responsibility": "Receive task notifications.",
            "tech": [
              "iOS",
              "Android",
              "WebSockets"
            ]
          },
          {
            "name": "Vision Analytics",
            "type": "AI Model",
            "responsibility": "Process RTSP camera feeds.",
            "tech": [
              "YOLOv8",
              "Python",
              "Vantiq"
            ]
          }
        ],
        "integrations": [
          {
            "system": "SAP ERP",
            "protocol": "REST/OData",
            "purpose": "Sync master SKU data and update final stock levels."
          },
          {
            "system": "Impinj Readers",
            "protocol": "LLRP/MQTT",
            "purpose": "Ingest raw tag events."
          },
          {
            "system": "Twilio",
            "protocol": "REST",
            "purpose": "Send SMS alerts for critical incidents."
          }
        ],
        "dataFlow": [
          "1. RFID readers publish to MQTT broker at the edge.",
          "2. Vantiq Edge node filters duplicate reads and publishes 'ZoneChange' events to Cloud.",
          "3. Vantiq Cloud updates global state and checks against ERP stock levels.",
          "4. If stockout detected, Cloud sends push notification to Associate App."
        ],
        "mermaidDiagram": "graph TD;\n  A[RFID Readers] -->|Raw MQTT| B[Vantiq Edge Node]\n  B -->|Filtered ZoneChange| C[Vantiq Cloud]\n  C -->|Updates| D[(SAP ERP)]\n  C -->|Alerts| E[Mobile App]",
        "scalabilityNotes": "Edge nodes handle the massive volume of raw reads. Cloud only processes state changes, ensuring horizontal scalability.",
        "securityConsiderations": [
          "Mutual TLS for edge-to-cloud communication.",
          "Encrypt inventory data at rest in the cloud.",
          "Role-based access control for associate apps."
        ],
        "principles": [
          "Process data close to the source.",
          "Design for offline edge autonomy."
        ]
      },
      "eventSystem": {
        "schemas": [
          {
            "eventName": "RawTagRead",
            "fields": [
              "epc",
              "antennaPort",
              "rssi",
              "timestamp"
            ]
          },
          {
            "eventName": "ZoneChange",
            "fields": [
              "rfidTag",
              "previousZone",
              "newZone",
              "timestamp"
            ]
          },
          {
            "eventName": "RestockAlert",
            "fields": [
              "sku",
              "zone",
              "quantityNeeded",
              "urgency"
            ]
          }
        ],
        "producers": [
          {
            "name": "RFID Gateway",
            "events": [
              "RawTagRead"
            ],
            "protocol": "MQTT",
            "frequency": "10,000/sec",
            "throughput": "High"
          },
          {
            "name": "Edge Node",
            "events": [
              "ZoneChange"
            ],
            "protocol": "Vantiq Async",
            "frequency": "50/sec",
            "throughput": "Medium"
          }
        ],
        "consumers": [
          {
            "name": "Cloud Node",
            "subscribesTo": [
              "ZoneChange"
            ],
            "action": "Update State",
            "errorStrategy": "Retry"
          },
          {
            "name": "Mobile App",
            "subscribesTo": [
              "RestockAlert"
            ],
            "action": "Show Notification",
            "errorStrategy": "Log"
          }
        ],
        "topics": [
          {
            "name": "/store/{id}/rfid",
            "usage": "Raw reads"
          },
          {
            "name": "/cloud/inventory/updates",
            "usage": "State changes"
          }
        ],
        "flowDiagram": "sequenceDiagram\n  participant RFID\n  participant Edge\n  participant Cloud\n  participant App\n  RFID->>Edge: RawTagRead\n  Edge->>Edge: Filter & Aggregate\n  Edge->>Cloud: ZoneChange\n  Cloud->>Cloud: Check Stock Rules\n  Cloud->>App: RestockAlert",
        "dataRetention": [
          {
            "eventType": "RawTagRead",
            "retentionPeriod": "5 minutes",
            "rationale": "Only needed for immediate smoothing at the edge."
          },
          {
            "eventType": "ZoneChange",
            "retentionPeriod": "30 days",
            "rationale": "Used for analytics and heat mapping."
          },
          {
            "eventType": "RestockAlert",
            "retentionPeriod": "1 year",
            "rationale": "Audit and associate performance metrics."
          }
        ]
      },
      "diagrams": {
        "diagrams": [
          {
            "title": "System Architecture",
            "type": "architecture",
            "description": "High-level overview of the distributed edge-to-cloud infrastructure.",
            "mermaid": "graph TD;\n  A[Payment Gateway] --> B[Vantiq Streaming Engine]\n  B --> C{ML Scoring Model}\n  C -- Fraud Score > 90 --> D[Block Transaction]\n  C -- Fraud Score < 90 --> E[Settle Payment]"
          },
          {
            "title": "Component Interaction Flow",
            "type": "component",
            "description": "Details the sequence of events during a stockout scenario.",
            "mermaid": "sequenceDiagram\n  Gateway->>Vantiq: Auth Request ($500)\n  Vantiq->>MLModel: Get Fraud Score\n  MLModel-->>Vantiq: Score: 95\n  Vantiq->>Gateway: Decline Request\n  Vantiq->>CRM: Flag Account"
          },
          {
            "title": "Deployment Topology",
            "type": "deployment",
            "description": "Physical deployment of nodes across the retail footprint.",
            "mermaid": "graph TB;\n  subgraph Region[North America]\n    subgraph Store1[Store 101]\n      EN1[Edge Node Docker] --> CR[Cloud Router]\n    end\n    subgraph Store2[Store 102]\n      EN2[Edge Node Docker] --> CR\n    end\n    CR --> VC[Vantiq Cloud Cluster AWS]\n  end"
          }
        ]
      },
      "aiModels": {
        "recommendations": [
          {
            "task": "Camera Feed Analysis",
            "approach": "Computer Vision",
            "deployment": "Edge",
            "models": [
              {
                "name": "YOLOv8",
                "size": "Small",
                "rationale": "Fast inference on edge hardware for detecting empty shelves."
              }
            ]
          },
          {
            "task": "Restock Prediction",
            "approach": "Time-series Forecasting",
            "deployment": "Cloud",
            "models": [
              {
                "name": "Custom XGBoost",
                "size": "Medium",
                "rationale": "Predicting when a shelf will go empty based on foot traffic patterns."
              }
            ]
          }
        ]
      },
      "agenticGuide": {
        "agents": [
          {
            "name": "Store Manager Agent",
            "role": "Orchestrator",
            "tools": [
              "GetInventoryLevel",
              "PageAssociate",
              "CheckSchedule"
            ],
            "interaction": "Monitors alerts and autonomously decides which associate to page based on their current location and workload."
          },
          {
            "name": "Replenishment Agent",
            "role": "Specialist",
            "tools": [
              "QueryERP",
              "DraftPurchaseOrder"
            ],
            "interaction": "Automatically drafts purchase orders when warehouse stock drops below safety thresholds."
          }
        ]
      },
      "implementation": {
        "phases": [
          {
            "phase": "Phase 1: POV",
            "duration": "4 weeks",
            "focus": "Single store RFID ingestion",
            "deliverables": [
              "Edge node deployed",
              "Basic alerting",
              "Hardware tuned"
            ]
          },
          {
            "phase": "Phase 2: ERP Integration",
            "duration": "6 weeks",
            "focus": "Two-way sync with SAP",
            "deliverables": [
              "Cloud service deployed",
              "SAP connector active"
            ]
          },
          {
            "phase": "Phase 3: Rollout",
            "duration": "12 weeks",
            "focus": "Scale to 50 stores",
            "deliverables": [
              "Automated provisioning",
              "Full dashboard",
              "Associate training"
            ]
          },
          {
            "phase": "Phase 4: AI Agent integration",
            "duration": "8 weeks",
            "focus": "Agentic orchestration",
            "deliverables": [
              "Store Manager Agent live",
              "Automated task routing"
            ]
          }
        ],
        "quickWins": [
          "Immediate visibility into backroom vs sales floor inventory.",
          "Automated nightly stock reconciliation."
        ],
        "risks": [
          {
            "risk": "Poor RFID read rates due to metal fixtures",
            "impact": "High",
            "mitigation": "Conduct thorough RF site survey before deployment and adjust antenna placement."
          },
          {
            "risk": "Associate adoption",
            "impact": "Medium",
            "mitigation": "Design ultra-simple UI for the mobile app and gamify restock tasks."
          }
        ]
      },
      "roadmap": {
        "quarters": [
          {
            "quarter": "Q1",
            "theme": "Foundation & POV",
            "milestones": [
              "Store 1 Live",
              "ERP Integration"
            ],
            "deliverables": [
              "Vantiq Edge config",
              "SAP Connector"
            ]
          },
          {
            "quarter": "Q2",
            "theme": "Cloud Scale",
            "milestones": [
              "50 Stores Live",
              "Dashboards Deployed"
            ],
            "deliverables": [
              "Monitoring Console",
              "Provisioning Scripts"
            ]
          },
          {
            "quarter": "Q3",
            "theme": "AI Vision Integration",
            "milestones": [
              "Camera Integration"
            ],
            "deliverables": [
              "YOLOv8 model deployment",
              "Multimodal event fusion"
            ]
          },
          {
            "quarter": "Q4",
            "theme": "Agentic Autonomy",
            "milestones": [
              "Agents Deployed"
            ],
            "deliverables": [
              "Store Manager Agent",
              "Dynamic task allocation"
            ]
          }
        ],
        "keyDecisionPoints": [
          "Go/No-go after Store 1 POV.",
          "Choose camera hardware vendor in Q2.",
          "Evaluate agent performance in Q4."
        ]
      },
      "adjacentUseCases": {
        "adjacentUseCases": [
          {
            "name": "Smart Fitting Rooms",
            "description": "Use RFID to detect items brought into fitting rooms to recommend accessories on a smart mirror.",
            "reusedComponents": [
              "RFIDIngestionService",
              "InventoryStateService"
            ],
            "newComponents": [
              "SmartMirror UI",
              "Recommendation Engine"
            ]
          },
          {
            "name": "Loss Prevention",
            "description": "Trigger cameras and lock doors if unpaid items move toward the exit.",
            "reusedComponents": [
              "RFIDIngestionService",
              "ZoneChange"
            ],
            "newComponents": [
              "SecurityAlertService",
              "DoorControlIntegration"
            ]
          },
          {
            "name": "Dynamic Pricing",
            "description": "Automatically lower prices on digital signs for items that have been on the floor too long.",
            "reusedComponents": [
              "InventoryStateService"
            ],
            "newComponents": [
              "PricingEngine",
              "DigitalSignIntegration"
            ]
          }
        ]
      }
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRELOADED_SAMPLES;
}

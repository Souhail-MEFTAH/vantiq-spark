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
            "vendor": "Vantiq",
            "criterion": "Time to Market",
            "rating": "Strong",
            "note": "Low-code visual development."
          },
          {
            "vendor": "Legacy ERP",
            "criterion": "Time to Market",
            "rating": "Moderate",
            "note": "Long implementation cycles."
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
              "lastSeen"
            ]
          },
          {
            "type": "Location",
            "name": "StoreZone",
            "properties": [
              "zoneId",
              "zoneType",
              "capacity"
            ]
          }
        ],
        "events": [
          {
            "name": "TagRead",
            "type": "Raw Event",
            "trigger": "RFID reader detects a tag"
          },
          {
            "name": "ItemMisplaced",
            "type": "Derived Alert",
            "trigger": "Item remains in wrong zone for >10 mins"
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
          }
        ],
        "boundedContexts": [
          {
            "name": "Edge Processing",
            "description": "Handles raw hardware events.",
            "services": [
              "RFIDIngestionService"
            ]
          },
          {
            "name": "Cloud Analytics",
            "description": "Global state and alerting.",
            "services": [
              "InventoryStateService"
            ]
          }
        ],
        "commands": [
          {
            "name": "TriggerRestockAlert",
            "target": "NotificationService",
            "action": "Send push to associate mobile app"
          }
        ]
      },
      "architecture": {
        "components": [
          {
            "name": "Store Edge Node",
            "type": "Vantiq Edge",
            "responsibility": "Process RFID reads locally to reduce bandwidth.",
            "tech": [
              "Vantiq",
              "MQTT"
            ]
          },
          {
            "name": "Cloud Control Plane",
            "type": "Vantiq Cloud",
            "responsibility": "Global inventory state and ERP sync.",
            "tech": [
              "Vantiq",
              "REST"
            ]
          }
        ],
        "integrations": [
          {
            "system": "SAP ERP",
            "protocol": "REST/OData",
            "purpose": "Sync master SKU data and update final stock levels."
          }
        ],
        "dataFlow": [
          "1. RFID readers publish to MQTT broker at the edge.",
          "2. Vantiq Edge node filters duplicate reads and publishes 'ZoneChange' events to Cloud.",
          "3. Vantiq Cloud updates global state and checks against ERP stock levels.",
          "4. If stockout detected, Cloud sends push notification to Associate App."
        ],
        "scalabilityNotes": "Edge nodes handle the massive volume of raw reads. Cloud only processes state changes.",
        "securityConsiderations": [
          "Mutual TLS for edge-to-cloud communication.",
          "Encrypt inventory data at rest in the cloud."
        ],
        "principles": [
          "Process data close to the source.",
          "Design for offline edge autonomy."
        ]
      },
      "eventSystem": {
        "schemas": [
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
            ]
          },
          {
            "name": "Edge Node",
            "events": [
              "ZoneChange"
            ]
          }
        ],
        "consumers": [
          {
            "name": "Cloud Node",
            "subscribesTo": [
              "ZoneChange"
            ]
          },
          {
            "name": "Mobile App",
            "subscribesTo": [
              "RestockAlert"
            ]
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
        "dataRetention": [
          "Raw reads discarded at edge after 5 seconds.",
          "Zone changes kept in cloud state indefinitely until sold."
        ]
      },
      "diagrams": {
        "diagrams": [
          {
            "title": "Edge-to-Cloud Data Flow",
            "type": "Architecture",
            "description": "Shows how raw reads are filtered at the edge.",
            "mermaidCode": "graph TD;\n  A[RFID Readers] -->|Raw MQTT| B[Vantiq Edge Node]\n  B -->|Filtered ZoneChange| C[Vantiq Cloud]\n  C -->|Updates| D[(SAP ERP)]\n  C -->|Alerts| E[Mobile App]"
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
              "PageAssociate"
            ],
            "interaction": "Monitors alerts and autonomously decides which associate to page based on their current location and workload."
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
              "Basic alerting"
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
              "Full dashboard"
            ]
          }
        ],
        "quickWins": [
          "Immediate visibility into backroom vs sales floor inventory."
        ],
        "risks": [
          {
            "risk": "Poor RFID read rates",
            "impact": "Inaccurate system",
            "mitigation": "Conduct thorough RF site survey before deployment."
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
            "theme": "AI Integration",
            "milestones": [
              "Camera Integration"
            ],
            "deliverables": [
              "YOLOv8 model deployment"
            ]
          }
        ],
        "keyDecisionPoints": [
          "Go/No-go after Store 1 POV.",
          "Choose camera hardware vendor in Q2."
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
            "vendor": "Vantiq",
            "criterion": "Time to Market",
            "rating": "Strong",
            "note": "Low-code visual development."
          },
          {
            "vendor": "Legacy ERP",
            "criterion": "Time to Market",
            "rating": "Moderate",
            "note": "Long implementation cycles."
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
              "lastSeen"
            ]
          },
          {
            "type": "Location",
            "name": "StoreZone",
            "properties": [
              "zoneId",
              "zoneType",
              "capacity"
            ]
          }
        ],
        "events": [
          {
            "name": "TagRead",
            "type": "Raw Event",
            "trigger": "RFID reader detects a tag"
          },
          {
            "name": "ItemMisplaced",
            "type": "Derived Alert",
            "trigger": "Item remains in wrong zone for >10 mins"
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
          }
        ],
        "boundedContexts": [
          {
            "name": "Edge Processing",
            "description": "Handles raw hardware events.",
            "services": [
              "RFIDIngestionService"
            ]
          },
          {
            "name": "Cloud Analytics",
            "description": "Global state and alerting.",
            "services": [
              "InventoryStateService"
            ]
          }
        ],
        "commands": [
          {
            "name": "TriggerRestockAlert",
            "target": "NotificationService",
            "action": "Send push to associate mobile app"
          }
        ]
      },
      "architecture": {
        "components": [
          {
            "name": "Store Edge Node",
            "type": "Vantiq Edge",
            "responsibility": "Process RFID reads locally to reduce bandwidth.",
            "tech": [
              "Vantiq",
              "MQTT"
            ]
          },
          {
            "name": "Cloud Control Plane",
            "type": "Vantiq Cloud",
            "responsibility": "Global inventory state and ERP sync.",
            "tech": [
              "Vantiq",
              "REST"
            ]
          }
        ],
        "integrations": [
          {
            "system": "SAP ERP",
            "protocol": "REST/OData",
            "purpose": "Sync master SKU data and update final stock levels."
          }
        ],
        "dataFlow": [
          "1. RFID readers publish to MQTT broker at the edge.",
          "2. Vantiq Edge node filters duplicate reads and publishes 'ZoneChange' events to Cloud.",
          "3. Vantiq Cloud updates global state and checks against ERP stock levels.",
          "4. If stockout detected, Cloud sends push notification to Associate App."
        ],
        "scalabilityNotes": "Edge nodes handle the massive volume of raw reads. Cloud only processes state changes.",
        "securityConsiderations": [
          "Mutual TLS for edge-to-cloud communication.",
          "Encrypt inventory data at rest in the cloud."
        ],
        "principles": [
          "Process data close to the source.",
          "Design for offline edge autonomy."
        ]
      },
      "eventSystem": {
        "schemas": [
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
            ]
          },
          {
            "name": "Edge Node",
            "events": [
              "ZoneChange"
            ]
          }
        ],
        "consumers": [
          {
            "name": "Cloud Node",
            "subscribesTo": [
              "ZoneChange"
            ]
          },
          {
            "name": "Mobile App",
            "subscribesTo": [
              "RestockAlert"
            ]
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
        "dataRetention": [
          "Raw reads discarded at edge after 5 seconds.",
          "Zone changes kept in cloud state indefinitely until sold."
        ]
      },
      "diagrams": {
        "diagrams": [
          {
            "title": "Edge-to-Cloud Data Flow",
            "type": "Architecture",
            "description": "Shows how raw reads are filtered at the edge.",
            "mermaidCode": "graph LR;\n  A[IoT Sensors] --> B[Truck Edge Gateway]\n  B --> C[Cellular Network]\n  C --> D[Vantiq Cloud]\n  D --> E[Dispatcher Dashboard]"
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
              "PageAssociate"
            ],
            "interaction": "Monitors alerts and autonomously decides which associate to page based on their current location and workload."
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
              "Basic alerting"
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
              "Full dashboard"
            ]
          }
        ],
        "quickWins": [
          "Immediate visibility into backroom vs sales floor inventory."
        ],
        "risks": [
          {
            "risk": "Poor RFID read rates",
            "impact": "Inaccurate system",
            "mitigation": "Conduct thorough RF site survey before deployment."
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
            "theme": "AI Integration",
            "milestones": [
              "Camera Integration"
            ],
            "deliverables": [
              "YOLOv8 model deployment"
            ]
          }
        ],
        "keyDecisionPoints": [
          "Go/No-go after Store 1 POV.",
          "Choose camera hardware vendor in Q2."
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
            "vendor": "Vantiq",
            "criterion": "Time to Market",
            "rating": "Strong",
            "note": "Low-code visual development."
          },
          {
            "vendor": "Legacy ERP",
            "criterion": "Time to Market",
            "rating": "Moderate",
            "note": "Long implementation cycles."
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
              "lastSeen"
            ]
          },
          {
            "type": "Location",
            "name": "StoreZone",
            "properties": [
              "zoneId",
              "zoneType",
              "capacity"
            ]
          }
        ],
        "events": [
          {
            "name": "TagRead",
            "type": "Raw Event",
            "trigger": "RFID reader detects a tag"
          },
          {
            "name": "ItemMisplaced",
            "type": "Derived Alert",
            "trigger": "Item remains in wrong zone for >10 mins"
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
          }
        ],
        "boundedContexts": [
          {
            "name": "Edge Processing",
            "description": "Handles raw hardware events.",
            "services": [
              "RFIDIngestionService"
            ]
          },
          {
            "name": "Cloud Analytics",
            "description": "Global state and alerting.",
            "services": [
              "InventoryStateService"
            ]
          }
        ],
        "commands": [
          {
            "name": "TriggerRestockAlert",
            "target": "NotificationService",
            "action": "Send push to associate mobile app"
          }
        ]
      },
      "architecture": {
        "components": [
          {
            "name": "Store Edge Node",
            "type": "Vantiq Edge",
            "responsibility": "Process RFID reads locally to reduce bandwidth.",
            "tech": [
              "Vantiq",
              "MQTT"
            ]
          },
          {
            "name": "Cloud Control Plane",
            "type": "Vantiq Cloud",
            "responsibility": "Global inventory state and ERP sync.",
            "tech": [
              "Vantiq",
              "REST"
            ]
          }
        ],
        "integrations": [
          {
            "system": "SAP ERP",
            "protocol": "REST/OData",
            "purpose": "Sync master SKU data and update final stock levels."
          }
        ],
        "dataFlow": [
          "1. RFID readers publish to MQTT broker at the edge.",
          "2. Vantiq Edge node filters duplicate reads and publishes 'ZoneChange' events to Cloud.",
          "3. Vantiq Cloud updates global state and checks against ERP stock levels.",
          "4. If stockout detected, Cloud sends push notification to Associate App."
        ],
        "scalabilityNotes": "Edge nodes handle the massive volume of raw reads. Cloud only processes state changes.",
        "securityConsiderations": [
          "Mutual TLS for edge-to-cloud communication.",
          "Encrypt inventory data at rest in the cloud."
        ],
        "principles": [
          "Process data close to the source.",
          "Design for offline edge autonomy."
        ]
      },
      "eventSystem": {
        "schemas": [
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
            ]
          },
          {
            "name": "Edge Node",
            "events": [
              "ZoneChange"
            ]
          }
        ],
        "consumers": [
          {
            "name": "Cloud Node",
            "subscribesTo": [
              "ZoneChange"
            ]
          },
          {
            "name": "Mobile App",
            "subscribesTo": [
              "RestockAlert"
            ]
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
        "dataRetention": [
          "Raw reads discarded at edge after 5 seconds.",
          "Zone changes kept in cloud state indefinitely until sold."
        ]
      },
      "diagrams": {
        "diagrams": [
          {
            "title": "Edge-to-Cloud Data Flow",
            "type": "Architecture",
            "description": "Shows how raw reads are filtered at the edge.",
            "mermaidCode": "graph TD;\n  A[Payment Gateway] --> B[Vantiq Streaming Engine]\n  B --> C{ML Scoring Model}\n  C -- Fraud --> D[Block Transaction]\n  C -- Safe --> E[Settle Payment]"
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
              "PageAssociate"
            ],
            "interaction": "Monitors alerts and autonomously decides which associate to page based on their current location and workload."
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
              "Basic alerting"
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
              "Full dashboard"
            ]
          }
        ],
        "quickWins": [
          "Immediate visibility into backroom vs sales floor inventory."
        ],
        "risks": [
          {
            "risk": "Poor RFID read rates",
            "impact": "Inaccurate system",
            "mitigation": "Conduct thorough RF site survey before deployment."
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
            "theme": "AI Integration",
            "milestones": [
              "Camera Integration"
            ],
            "deliverables": [
              "YOLOv8 model deployment"
            ]
          }
        ],
        "keyDecisionPoints": [
          "Go/No-go after Store 1 POV.",
          "Choose camera hardware vendor in Q2."
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
          }
        ]
      }
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRELOADED_SAMPLES;
}

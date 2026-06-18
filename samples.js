const PRELOADED_SAMPLES = {
  "retail_inventory": {
    "title": "Retail Inventory Management",
    "description": "Real-time retail inventory tracking using RFID tags and in-store cameras to prevent stockouts and detect misplaced items.",
    "results": {
      "analysis": {
        "domainIcon": "🏬",
        "domain": "Retail & Operations",
        "summary": "A real-time inventory management system leveraging RFID and smart cameras to track stock levels.",
        "currentState": "Periodic manual scanning resulting in inaccurate counts and delayed restocking.",
        "whyHardWithoutVantiq": "Integrating real-time high-throughput RFID streams with computer vision events requires complex stream processing.",
        "urgency": {
          "level": "High",
          "justification": "Lost sales and frustrated customers"
        },
        "painPoints": [
          {
            "pain": "Stockouts",
            "severity": "Critical",
            "impact": "Lost revenue and reduced customer loyalty"
          },
          {
            "pain": "Misplaced Items",
            "severity": "High",
            "impact": "Poor shopping experience and wasted staff time"
          }
        ],
        "stakeholders": [
          {
            "role": "Store Operations Manager",
            "buyerType": "Economic",
            "concern": "Revenue loss and operational efficiency"
          },
          {
            "role": "IT Director",
            "buyerType": "Technical",
            "concern": "Integration with legacy ERP systems"
          }
        ],
        "qualifyingQuestions": [
          "How frequently are you experiencing stockouts for high-velocity items?",
          "Do you currently have RFID infrastructure deployed in your stores?"
        ]
      },
      "useCaseScope": {
        "useCaseTitle": "Real-time Retail Inventory Tracking",
        "elevator": "Track inventory in real-time across the retail floor using RFID and cameras to eliminate stockouts.",
        "inScope": [
          "Real-time RFID tracking",
          "Camera-based shelf monitoring",
          "Instant stockout alerts"
        ],
        "outOfScope": [
          "Point of Sale (POS) transaction processing",
          "Customer loyalty programs"
        ],
        "successMetrics": [
          {
            "metric": "Inventory Accuracy",
            "current": "75%",
            "target": "99.9%"
          },
          {
            "metric": "Stockout Incidents",
            "current": "15/week",
            "target": "<2/week"
          }
        ],
        "decisionCriteria": [
          "System latency under 1 second",
          "High availability during peak shopping hours"
        ],
        "competitiveAlternative": "Traditional batch scanning inventory systems"
      },
      "businessValue": {
        "roiProjection": [
          {
            "category": "Revenue Uplift",
            "value": "+5%",
            "timeframe": "Year 1"
          },
          {
            "category": "Labor Savings",
            "value": "20 hrs/week/store",
            "timeframe": "Year 1"
          }
        ],
        "valueDrivers": [
          {
            "driver": "Reduced stockouts",
            "impact": "High"
          },
          {
            "driver": "Optimized staff allocation",
            "impact": "Medium"
          }
        ],
        "riskMitigations": [
          {
            "risk": "High upfront hardware cost",
            "mitigation": "Phased rollout starting with flagship stores"
          }
        ],
        "kpis": [
          {
            "kpi": "Stockout reduction",
            "target": "80%"
          },
          {
            "kpi": "Inventory recount frequency",
            "target": "Monthly instead of Weekly"
          }
        ]
      },
      "competitive": {
        "competitors": [
          {
            "name": "Legacy DB Vendors",
            "profile": "Traditional batch-oriented databases"
          }
        ],
        "featureComparison": [
          {
            "feature": "Real-time Event Processing",
            "ourCapability": "Yes",
            "competitorCapability": "No",
            "differentiator": "True"
          }
        ],
        "competitiveMatrix": [
          {
            "vendor": "Vantiq",
            "criteria": "Event-driven Architecture",
            "rating": "Excellent"
          }
        ],
        "vantiqDifferentiators": [
          {
            "differentiator": "Native EDA",
            "reason": "Built for streaming data from edge devices"
          }
        ],
        "objectionHandling": [
          {
            "objection": "Implementation complexity",
            "handling": "Low-code platform simplifies development significantly"
          }
        ],
        "recommendation": "Focus heavily on the real-time alerting capabilities that legacy DBs cannot match.",
        "winStrategy": "Execute a rapid Proof of Value on a single high-traffic store."
      },
      "domainModel": {
        "entities": [
          {
            "type": "Asset",
            "name": "InventoryItem",
            "stateManagement": "Stateful",
            "persistence": "Yes",
            "properties": [
              "rfidTag",
              "location",
              "status"
            ]
          },
          {
            "type": "Location",
            "name": "StoreZone",
            "stateManagement": "Stateless",
            "persistence": "No",
            "properties": [
              "zoneId",
              "cameraIds"
            ]
          }
        ],
        "events": [
          {
            "name": "ItemMoved",
            "type": "Event"
          },
          {
            "name": "ShelfEmptyAlert",
            "type": "Alert"
          }
        ],
        "services": [
          {
            "name": "InventoryService",
            "responsibility": "Track item locations and state"
          },
          {
            "name": "AlertingService",
            "responsibility": "Notify staff of stockouts"
          }
        ],
        "commands": [
          {
            "name": "DispatchRestock",
            "target": "AlertingService"
          }
        ]
      },
      "architecture": {
        "components": [
          {
            "name": "EdgeNode",
            "type": "Gateway",
            "responsibility": "Process raw RFID tag reads locally"
          },
          {
            "name": "VisionService",
            "type": "AI Model",
            "responsibility": "Analyze camera feeds for empty shelves"
          }
        ],
        "integrations": [
          {
            "system": "Legacy ERP",
            "protocol": "REST",
            "purpose": "Sync master stock levels"
          }
        ],
        "dataFlow": [
          "RFID/Cameras -> Edge Node -> Vantiq Cloud -> Mobile App & ERP"
        ],
        "mermaidDiagram": "graph TD;\n  A[RFID Readers] --> B[Edge Node]\n  B --> C(Vantiq Cloud)\n  C --> D[Staff Mobile App]",
        "scalabilityNotes": "Deploy edge nodes in each store for local processing and resilience.",
        "securityConsiderations": "Use TLS for all external integrations and encrypt data at rest."
      },
      "eventSystem": {
        "schemas": [
          {
            "eventName": "ItemMoved",
            "fields": [
              "rfid",
              "timestamp",
              "fromZone",
              "toZone"
            ]
          }
        ],
        "producers": [
          {
            "name": "RFID Gateway",
            "events": [
              "ItemMoved"
            ]
          }
        ],
        "consumers": [
          {
            "name": "InventoryTracker",
            "consumes": [
              "ItemMoved"
            ]
          }
        ],
        "flowDiagram": "graph LR;\n  A[RFID Gateway] -->|ItemMoved| B(Vantiq Event Broker)\n  B --> C[InventoryTracker]",
        "dataRetention": "Retain raw events for 7 days, aggregated data for 1 year."
      },
      "diagrams": {
        "diagrams": [
          {
            "title": "High Level Architecture",
            "code": "graph TD;\n A-->B",
            "description": "Basic system flow from edge to cloud."
          }
        ]
      },
      "aiModels": {
        "overallStrategy": "Use AI to detect anomalies in camera feeds and predict stockout trends.",
        "aiAgents": [
          {
            "name": "VisionAnalyzer",
            "role": "Computer Vision",
            "model": "Custom YOLOv8",
            "rationale": "Fast real-time object detection on edge."
          },
          {
            "name": "PredictiveRestock",
            "role": "Forecasting",
            "model": "RandomForest",
            "rationale": "Predictive analytics based on historical sales."
          }
        ],
        "llmComparison": [
          {
            "model": "Edge ML",
            "pros": [
              "Low Latency",
              "Privacy"
            ],
            "cons": [
              "Limited capacity"
            ]
          }
        ],
        "costOptimization": "Run models at the edge to reduce cloud bandwidth costs."
      },
      "agenticGuide": {
        "solutionStrategy": "Implement an Agentic pattern for autonomous inventory reallocation.",
        "llmAgents": [
          {
            "name": "StockManagerAgent",
            "purpose": "Autonomously decide restocking priorities.",
            "tools": [
              "ERP API",
              "Staff Notification API"
            ]
          }
        ]
      },
      "implementation": {
        "projectStructure": [
          "src/services/inventory/",
          "src/events/schemas/",
          "src/edge/"
        ],
        "deploymentNotes": "Use Docker containers managed by Kubernetes for cloud components.",
        "warnings": [
          "Ensure high network bandwidth is available if streaming video instead of edge-processing."
        ]
      },
      "roadmap": {
        "roadmapTitle": "Smart Retail Inventory Rollout",
        "vision": "Fully autonomous, self-healing retail store inventory.",
        "quarters": [
          {
            "quarter": "Q1",
            "milestones": [
              "Deploy in 1 pilot store",
              "Integrate core ERP"
            ]
          },
          {
            "quarter": "Q2",
            "milestones": [
              "Expand to 10 stores",
              "Activate AI predictive models"
            ]
          }
        ],
        "keyDecisionPoints": [
          "Select standardized RFID vendor hardware."
        ]
      },
      "adjacentUseCases": {
        "adjacentUseCases": [
          {
            "title": "Customer Path Analytics",
            "description": "Use the same camera infrastructure to analyze foot traffic and optimize store layouts."
          }
        ]
      }
    }
  },
  "supply_chain": {
    "title": "Supply Chain Logistics",
    "description": "End-to-end supply chain tracking, predictive ETAs, and cold-chain monitoring.",
    "results": {
      "analysis": {
        "domainIcon": "🚚",
        "domain": "Logistics & Supply Chain",
        "summary": "A unified logistics platform providing real-time visibility, predictive ETAs, and temperature compliance.",
        "currentState": "Siloed tracking systems with delayed batch updates.",
        "whyHardWithoutVantiq": "Correlating streaming GPS data, IoT telemetry, and traffic APIs in real-time is extremely complex.",
        "urgency": {
          "level": "High",
          "justification": "Spoilage costs and SLA penalties are increasing."
        },
        "painPoints": [
          {
            "pain": "Spoilage",
            "severity": "Critical",
            "impact": "Product loss and regulatory fines"
          },
          {
            "pain": "Inaccurate ETAs",
            "severity": "High",
            "impact": "Inefficient warehouse scheduling"
          }
        ],
        "stakeholders": [
          {
            "role": "VP of Supply Chain",
            "buyerType": "Economic",
            "concern": "Overall logistics costs"
          }
        ],
        "qualifyingQuestions": [
          "How much product is lost annually due to temperature excursions?"
        ]
      },
      "useCaseScope": {
        "useCaseTitle": "Smart Supply Chain & Cold-Chain Tracking",
        "elevator": "Track fleets in real-time while monitoring environmental conditions to ensure compliance.",
        "inScope": [
          "GPS fleet tracking",
          "IoT temperature monitoring",
          "Predictive ETA alerts"
        ],
        "outOfScope": [
          "Vehicle maintenance scheduling"
        ],
        "successMetrics": [
          {
            "metric": "Spoilage Rate",
            "current": "4%",
            "target": "<0.5%"
          }
        ],
        "decisionCriteria": [
          "Ability to process millions of IoT events per minute"
        ],
        "competitiveAlternative": "Traditional fleet management software"
      },
      "businessValue": {
        "roiProjection": [
          {
            "category": "Spoilage Reduction",
            "value": "$2M/year",
            "timeframe": "Year 1"
          }
        ],
        "valueDrivers": [
          {
            "driver": "Guaranteed SLA compliance",
            "impact": "High"
          }
        ],
        "riskMitigations": [
          {
            "risk": "IoT sensor failure",
            "mitigation": "Redundant sensor deployment"
          }
        ],
        "kpis": [
          {
            "kpi": "On-time Delivery Rate",
            "target": "98%"
          }
        ]
      },
      "competitive": {
        "competitors": [
          {
            "name": "Standard Fleet Trackers",
            "profile": "GPS-only legacy systems"
          }
        ],
        "featureComparison": [
          {
            "feature": "Complex Event Processing",
            "ourCapability": "Yes",
            "competitorCapability": "No",
            "differentiator": "True"
          }
        ],
        "competitiveMatrix": [
          {
            "vendor": "Vantiq",
            "criteria": "Extensibility",
            "rating": "Excellent"
          }
        ],
        "vantiqDifferentiators": [
          {
            "differentiator": "Distributed Edge",
            "reason": "Process data on the truck"
          }
        ],
        "objectionHandling": [
          {
            "objection": "Cost of IoT",
            "handling": "Offset by immediate spoilage reduction"
          }
        ],
        "recommendation": "Highlight the ability to react to temperature drops *before* spoilage occurs.",
        "winStrategy": "Pilot with the highest-value refrigerated fleet."
      },
      "domainModel": {
        "entities": [
          {
            "type": "Asset",
            "name": "DeliveryTruck",
            "stateManagement": "Stateful",
            "persistence": "Yes",
            "properties": [
              "truckId",
              "location",
              "temperature"
            ]
          }
        ],
        "events": [
          {
            "name": "LocationUpdate",
            "type": "Event"
          },
          {
            "name": "TemperatureWarning",
            "type": "Alert"
          }
        ],
        "services": [
          {
            "name": "FleetTracker",
            "responsibility": "Maintain truck states"
          }
        ],
        "commands": [
          {
            "name": "Reroute",
            "target": "DriverApp"
          }
        ]
      },
      "architecture": {
        "components": [
          {
            "name": "TelematicsGateway",
            "type": "Gateway",
            "responsibility": "Ingest MQTT streams from trucks"
          }
        ],
        "integrations": [
          {
            "system": "Traffic API",
            "protocol": "REST",
            "purpose": "Fetch route conditions"
          }
        ],
        "dataFlow": [
          "Truck IoT -> TelematicsGateway -> Vantiq Broker -> Operations Dashboard"
        ],
        "mermaidDiagram": "graph TD;\n  A[Truck IoT] --> B(Vantiq)\n  B --> C[Dashboard]",
        "scalabilityNotes": "Partition streams by geographic region.",
        "securityConsiderations": "Mutual TLS for truck IoT devices."
      },
      "eventSystem": {
        "schemas": [
          {
            "eventName": "TelemetryUpdate",
            "fields": [
              "truckId",
              "lat",
              "lon",
              "temp"
            ]
          }
        ],
        "producers": [
          {
            "name": "Truck Sensors",
            "events": [
              "TelemetryUpdate"
            ]
          }
        ],
        "consumers": [
          {
            "name": "ComplianceMonitor",
            "consumes": [
              "TelemetryUpdate"
            ]
          }
        ],
        "flowDiagram": "graph LR;\n  A[Truck] --> B(Vantiq)\n  B --> C[Monitor]",
        "dataRetention": "Store temperature logs for 5 years for compliance."
      },
      "diagrams": {
        "diagrams": [
          {
            "title": "Telemetry Flow",
            "code": "graph TD;\n A-->B",
            "description": "IoT ingestion pipeline."
          }
        ]
      },
      "aiModels": {
        "overallStrategy": "Apply ML to predict ETA delays based on historical and real-time traffic.",
        "aiAgents": [
          {
            "name": "ETAPredictor",
            "role": "Routing",
            "model": "XGBoost",
            "rationale": "Excellent for structured tabular data."
          }
        ],
        "llmComparison": [
          {
            "model": "XGBoost",
            "pros": [
              "Fast training"
            ],
            "cons": [
              "Requires feature engineering"
            ]
          }
        ],
        "costOptimization": "Only trigger ETA recalculation if deviation > 5 miles."
      },
      "agenticGuide": {
        "solutionStrategy": "Use an Autonomous Dispatch Agent.",
        "llmAgents": [
          {
            "name": "DispatchAgent",
            "purpose": "Automatically reroute trucks encountering traffic.",
            "tools": [
              "Maps API",
              "Driver SMS API"
            ]
          }
        ]
      },
      "implementation": {
        "projectStructure": [
          "src/ingestion/",
          "src/analytics/"
        ],
        "deploymentNotes": "High availability required (multi-AZ).",
        "warnings": [
          "Expect intermittent connectivity from trucks; implement robust buffering."
        ]
      },
      "roadmap": {
        "roadmapTitle": "Next-Gen Supply Chain",
        "vision": "Self-optimizing autonomous logistics network.",
        "quarters": [
          {
            "quarter": "Q1",
            "milestones": [
              "Deploy GPS tracking"
            ]
          }
        ],
        "keyDecisionPoints": [
          "Select MQTT broker architecture."
        ]
      },
      "adjacentUseCases": {
        "adjacentUseCases": [
          {
            "title": "Driver Behavior Monitoring",
            "description": "Use existing telemetry to track harsh braking and acceleration."
          }
        ]
      }
    }
  },
  "fraud_detection": {
    "title": "Financial Fraud Detection",
    "description": "Real-time analysis of transaction streams to detect and block fraudulent activity instantly.",
    "results": {
      "analysis": {
        "domainIcon": "💳",
        "domain": "Financial Services",
        "summary": "A high-throughput event processing system that evaluates transactions against ML models in milliseconds.",
        "currentState": "Post-transaction batch analysis resulting in unrecoverable funds.",
        "whyHardWithoutVantiq": "Meeting sub-50ms latency SLAs for blocking transactions while running complex ML models requires a highly optimized streaming architecture.",
        "urgency": {
          "level": "Critical",
          "justification": "Surging fraud losses in the current quarter."
        },
        "painPoints": [
          {
            "pain": "Unrecoverable Funds",
            "severity": "Critical",
            "impact": "Direct financial loss"
          }
        ],
        "stakeholders": [
          {
            "role": "Chief Risk Officer",
            "buyerType": "Economic",
            "concern": "Fraud loss metrics"
          }
        ],
        "qualifyingQuestions": [
          "What is your current transaction volume and latency SLA?"
        ]
      },
      "useCaseScope": {
        "useCaseTitle": "Real-time Transaction Fraud Prevention",
        "elevator": "Analyze every transaction in milliseconds to block fraud before funds are transferred.",
        "inScope": [
          "Credit card transactions",
          "Wire transfers",
          "Real-time ML scoring"
        ],
        "outOfScope": [
          "Anti-Money Laundering (AML) batch reporting"
        ],
        "successMetrics": [
          {
            "metric": "False Positive Rate",
            "current": "15%",
            "target": "<2%"
          }
        ],
        "decisionCriteria": [
          "End-to-end latency < 50ms"
        ],
        "competitiveAlternative": "Legacy rules engines"
      },
      "businessValue": {
        "roiProjection": [
          {
            "category": "Fraud Prevention",
            "value": "$10M/year",
            "timeframe": "Year 1"
          }
        ],
        "valueDrivers": [
          {
            "driver": "Reduced chargebacks",
            "impact": "High"
          }
        ],
        "riskMitigations": [
          {
            "risk": "Latency spikes",
            "mitigation": "In-memory caching and optimized model serving"
          }
        ],
        "kpis": [
          {
            "kpi": "Blocked Fraud Amount",
            "target": "$1M/month"
          }
        ]
      },
      "competitive": {
        "competitors": [
          {
            "name": "Legacy Rules Engines",
            "profile": "Static rule-based systems"
          }
        ],
        "featureComparison": [
          {
            "feature": "Dynamic ML Injection",
            "ourCapability": "Yes",
            "competitorCapability": "Limited",
            "differentiator": "True"
          }
        ],
        "competitiveMatrix": [
          {
            "vendor": "Vantiq",
            "criteria": "Latency",
            "rating": "Excellent"
          }
        ],
        "vantiqDifferentiators": [
          {
            "differentiator": "In-memory processing",
            "reason": "Achieves sub-millisecond overhead"
          }
        ],
        "objectionHandling": [
          {
            "objection": "System Reliability",
            "handling": "Distributed clustered architecture ensures 99.999% uptime"
          }
        ],
        "recommendation": "Focus on the agility to update fraud models on the fly.",
        "winStrategy": "Shadow deployment proving higher catch rates."
      },
      "domainModel": {
        "entities": [
          {
            "type": "Event",
            "name": "Transaction",
            "stateManagement": "Stateless",
            "persistence": "Yes",
            "properties": [
              "amount",
              "merchant",
              "cardId"
            ]
          }
        ],
        "events": [
          {
            "name": "TransactionRequest",
            "type": "Event"
          },
          {
            "name": "FraudDetected",
            "type": "Alert"
          }
        ],
        "services": [
          {
            "name": "ScoringService",
            "responsibility": "Evaluate transactions against ML models"
          }
        ],
        "commands": [
          {
            "name": "BlockTransaction",
            "target": "PaymentGateway"
          }
        ]
      },
      "architecture": {
        "components": [
          {
            "name": "TransactionIngress",
            "type": "API",
            "responsibility": "Receive requests from payment gateways"
          }
        ],
        "integrations": [
          {
            "system": "PaymentGateway",
            "protocol": "gRPC",
            "purpose": "Fast synchronous response"
          }
        ],
        "dataFlow": [
          "Gateway -> Vantiq -> ML Model -> Gateway"
        ],
        "mermaidDiagram": "graph TD;\n  A[Gateway] --> B(Vantiq Scoring)\n  B --> A",
        "scalabilityNotes": "Auto-scale based on transaction throughput.",
        "securityConsiderations": "PCI-DSS compliance required."
      },
      "eventSystem": {
        "schemas": [
          {
            "eventName": "TxRequest",
            "fields": [
              "txId",
              "amount",
              "currency",
              "merchantId"
            ]
          }
        ],
        "producers": [
          {
            "name": "Payment Switch",
            "events": [
              "TxRequest"
            ]
          }
        ],
        "consumers": [
          {
            "name": "FraudAnalyzer",
            "consumes": [
              "TxRequest"
            ]
          }
        ],
        "flowDiagram": "graph LR;\n  A[Switch] --> B(Vantiq)\n  B --> C[Analyzer]",
        "dataRetention": "Archived to cold storage immediately."
      },
      "diagrams": {
        "diagrams": [
          {
            "title": "Scoring Flow",
            "code": "graph TD;\n A-->B",
            "description": "Synchronous scoring path."
          }
        ]
      },
      "aiModels": {
        "overallStrategy": "Ensemble approach: fast rules engine followed by Deep Learning anomaly detection.",
        "aiAgents": [
          {
            "name": "AnomalyDetector",
            "role": "Scoring",
            "model": "Deep Neural Network",
            "rationale": "High accuracy for complex patterns."
          }
        ],
        "llmComparison": [
          {
            "model": "DNN",
            "pros": [
              "High accuracy"
            ],
            "cons": [
              "Compute intensive"
            ]
          }
        ],
        "costOptimization": "Only run heavy DNN if transaction amount > $100."
      },
      "agenticGuide": {
        "solutionStrategy": "Use an Investigator Agent for borderline cases.",
        "llmAgents": [
          {
            "name": "InvestigatorAgent",
            "purpose": "Gather context on flagged transactions and ask user via SMS.",
            "tools": [
              "SMS API",
              "CRM API"
            ]
          }
        ]
      },
      "implementation": {
        "projectStructure": [
          "src/rules/",
          "src/models/"
        ],
        "deploymentNotes": "Deploy in same datacenter as Payment Switch.",
        "warnings": [
          "Garbage collection pauses can violate SLAs; tune JVM/Node carefully."
        ]
      },
      "roadmap": {
        "roadmapTitle": "Fraud Prevention Platform",
        "vision": "Zero-loss financial ecosystem.",
        "quarters": [
          {
            "quarter": "Q1",
            "milestones": [
              "Shadow mode deployment"
            ]
          }
        ],
        "keyDecisionPoints": [
          "Determine acceptable false positive thresholds."
        ]
      },
      "adjacentUseCases": {
        "adjacentUseCases": [
          {
            "title": "Anti-Money Laundering (AML)",
            "description": "Use the same event stream to build long-term graph relationships."
          }
        ]
      }
    }
  }
};

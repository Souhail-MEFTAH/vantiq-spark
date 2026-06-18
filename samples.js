const PRELOADED_SAMPLES = {
  retail_inventory: {
    title: "Retail Inventory Management",
    description: "Real-time retail inventory tracking using RFID tags and in-store cameras to prevent stockouts and detect misplaced items.",
    results: {
      analysis: {
        domain: "Retail & Operations",
        coreProblem: "Manual inventory tracking leads to stockouts, misplaced items, and lost sales.",
        currentState: "Periodic manual scanning resulting in inaccurate counts and delayed restocking.",
        summary: "A real-time inventory management system leveraging RFID and smart cameras to track stock levels and alert staff instantly."
      },
      useCaseScope: {
        inScope: ["Real-time RFID tracking", "Camera-based shelf monitoring", "Stockout alerts", "Misplaced item detection"],
        outOfScope: ["Point of Sale (POS) transaction processing", "Customer loyalty programs"],
        successMetrics: [
          { metric: "Inventory Accuracy", target: "99.9%" },
          { metric: "Stockout Incidents", target: "Reduce by 80%" }
        ]
      },
      businessValue: {
        summary: "Significant increase in sales due to available stock and reduced labor costs for manual counting.",
        roiProjection: { expectedReturn: "High", roiPercentage: "150%" },
        kpis: [
          { metric: "Sales Lift", timeframe: "6 months" },
          { metric: "Labor Hours Saved", timeframe: "Monthly" }
        ],
        riskMitigations: [{ risk: "Hardware failure", mitigation: "Redundant camera overlaps and active RFID battery monitoring" }]
      },
      competitive: {
        competitors: [{ name: "Traditional ERPs" }, { name: "Manual Barcode Systems" }],
        differentiators: [{ feature: "Real-time edge processing for immediate alerting" }],
        recommendation: "Deploy Vantiq at the store edge to process RFID and camera streams without network latency."
      },
      domainModel: {
        projectName: "Retail Inventory Edge Platform",
        entities: [
          { name: "Store", type: "Location", properties: ["storeId", "region"] },
          { name: "Shelf", type: "Location", properties: ["shelfId", "storeId", "category"] },
          { name: "Product", type: "Asset", properties: ["sku", "name", "price"] },
          { name: "InventoryItem", type: "Asset", properties: ["rfid", "sku", "status"] }
        ],
        events: [
          { name: "RFIDRead", type: "SensorData" },
          { name: "ShelfCameraAnalysis", type: "InferenceResult" },
          { name: "StockoutAlert", type: "SystemAlert" }
        ]
      },
      architecture: {
        description: "Edge nodes in stores process RFID streams and camera feeds. Alerts are generated locally and synced to the cloud.",
        mermaid: `graph TD\n    RFID["RFID Readers"] --> EdgeNode["Store Edge Node (Vantiq)"]\n    Cams["Smart Cameras"] --> EdgeNode\n    EdgeNode --> Cloud["Central Cloud Server"]\n    EdgeNode --> StaffApp["Staff Mobile App"]`
      },
      eventSystem: {
        orchestrationPattern: "Edge Filtering and Aggregation",
        mermaid: `graph LR\n    Event["RFID Read"] --> Filter{"Is Item Misplaced?"}\n    Filter -- Yes --> Alert["Trigger Staff Alert"]\n    Filter -- No --> Agg["Update Inventory Count"]`
      },
      diagrams: {
        diagrams: [
          {
            title: "Store Edge Deployment",
            description: "Physical layout of edge computing relative to the store layout.",
            mermaid: `graph TD\n    StoreNetwork["Store Network"] --> EdgeServer["Edge Server"]\n    EdgeServer --> VantiqApp["Vantiq Edge Runtime"]\n    VantiqApp --> LocalDB["Local DB"]`
          }
        ]
      },
      aiModels: {
        recommendations: [
          { capability: "Computer Vision", model: "YOLOv8 Edge", rationale: "Fast object detection for empty shelf spaces." }
        ]
      },
      agenticGuide: {
        summary: "Implementation approach for agents.",
        agents: [
          { role: "Inventory Manager Agent", responsibilities: ["Monitor thresholds", "Dispatch staff"] }
        ]
      },
      implementation: {
        services: [{ name: "ShelfMonitorService", description: "Processes camera frames." }],
        eventTypes: [{ name: "RFID_Tag_Event", fields: [{ field: "tagId", type: "String", description: "RFID Tag ID" }] }],
        projectStructure: [{ path: "src/services", files: ["ShelfMonitorService.json"] }],
        deploymentNotes: { namespaceSetup: "One namespace per store.", edgeConfig: "Deploy on lightweight Kubernetes (K3s) at store edge." }
      },
      roadmap: {
        roadmapPhases: [
          { phase: "Phase 1", timeline: "Weeks 1-4", focus: "Pilot in 1 store with RFID only." },
          { phase: "Phase 2", timeline: "Weeks 5-8", focus: "Integrate cameras and roll out to 5 stores." }
        ]
      },
      adjacentUseCases: [
        { title: "Customer Path Tracking", description: "Analyze how customers move through the store using the same cameras." }
      ]
    }
  },
  supply_chain: {
    title: "Supply Chain Logistics",
    description: "Tracking fleet vehicles and cold-chain temperature monitoring across global distribution networks.",
    results: {
      analysis: {
        domain: "Logistics & Supply Chain",
        coreProblem: "Spoilage of goods due to temperature fluctuations and lack of real-time visibility into truck locations.",
        currentState: "Data loggers are checked post-delivery, resulting in spoiled goods reaching customers.",
        summary: "A real-time IoT platform tracking truck location and trailer temperature, alerting drivers instantly if thresholds are breached."
      },
      useCaseScope: {
        inScope: ["GPS tracking", "Temperature monitoring", "Driver alerts", "Route deviation detection"],
        outOfScope: ["Vehicle maintenance scheduling"],
        successMetrics: [
          { metric: "Spoilage Reduction", target: "95%" },
          { metric: "On-time Delivery", target: "98%" }
        ]
      },
      businessValue: {
        summary: "Millions saved annually by preventing spoiled shipments.",
        roiProjection: { expectedReturn: "Very High", roiPercentage: "300%" },
        kpis: [
          { metric: "Spoilage Cost", timeframe: "Quarterly" }
        ],
        riskMitigations: [{ risk: "Connectivity loss", mitigation: "Edge caching of data on truck gateways" }]
      },
      competitive: {
        competitors: [{ name: "Legacy Telematics" }],
        differentiators: [{ feature: "Real-time stateful stream processing" }],
        recommendation: "Use Vantiq's temporal state windows to detect temperature drops over time."
      },
      domainModel: {
        projectName: "Cold-Chain Tracker",
        entities: [
          { name: "Truck", type: "Asset", properties: ["truckId", "driver"] },
          { name: "Shipment", type: "Asset", properties: ["shipmentId", "requiredTemp"] }
        ],
        events: [
          { name: "TelemetryEvent", type: "SensorData" },
          { name: "TempAlert", type: "SystemAlert" }
        ]
      },
      architecture: {
        description: "Truck IoT gateways send MQTT data to a central cloud Vantiq cluster.",
        mermaid: `graph TD\n    TruckIoT["Truck IoT Gateway"] --> MQTT["MQTT Broker"]\n    MQTT --> Vantiq["Vantiq Cloud Cluster"]\n    Vantiq --> Dashboard["Dispatch Dashboard"]`
      },
      eventSystem: {
        orchestrationPattern: "Complex Event Processing (CEP)",
        mermaid: `graph LR\n    Event["Temp Reading"] --> Window{"Avg > Max over 5 min?"}\n    Window -- Yes --> Alert["Alert Driver"]`
      },
      diagrams: {
        diagrams: [
          {
            title: "Data Flow",
            description: "How telemetry data flows.",
            mermaid: `graph TD\n    Sensor["Sensors"] --> Gateway["Edge Gateway"]\n    Gateway --> Cloud["Cloud Processing"]`
          }
        ]
      },
      aiModels: {
        recommendations: [
          { capability: "Predictive Analytics", model: "Time-series forecasting", rationale: "Predict if temperature will breach threshold based on current cooling rate." }
        ]
      },
      agenticGuide: {
        summary: "Agentic system for automated dispatching.",
        agents: [
          { role: "Route Optimizer Agent", responsibilities: ["Reroute trucks dynamically"] }
        ]
      },
      implementation: {
        services: [{ name: "TelemetryProcessor", description: "Handles incoming MQTT events." }],
        eventTypes: [{ name: "Truck_Telemetry", fields: [{ field: "temp", type: "Double", description: "Temperature" }] }],
        projectStructure: [{ path: "src", files: ["TelemetryProcessor.json"] }],
        deploymentNotes: { namespaceSetup: "Global cloud deployment.", edgeConfig: "N/A" }
      },
      roadmap: {
        roadmapPhases: [
          { phase: "Phase 1", timeline: "Weeks 1-4", focus: "Basic GPS tracking." }
        ]
      },
      adjacentUseCases: [
        { title: "Predictive Maintenance", description: "Monitor engine telemetry to predict breakdowns." }
      ]
    }
  },
  fraud_detection: {
    title: "Financial Fraud Detection",
    description: "Real-time monitoring of banking transactions to detect and block fraudulent activity instantly.",
    results: {
      analysis: {
        domain: "Financial Services",
        coreProblem: "Batch processing of transactions allows fraud to occur before it is detected.",
        currentState: "Overnight batch jobs resulting in high chargeback rates.",
        summary: "A high-throughput stream processing system analyzing transactions in under 10ms."
      },
      useCaseScope: {
        inScope: ["Credit card transactions", "Rules-based fraud detection", "ML model scoring"],
        outOfScope: ["Cryptocurrency tracking"],
        successMetrics: [
          { metric: "Fraud Detection Rate", target: "99%" },
          { metric: "Processing Latency", target: "< 10ms" }
        ]
      },
      businessValue: {
        summary: "Massive reduction in fraud losses and improved customer trust.",
        roiProjection: { expectedReturn: "High", roiPercentage: "200%" },
        kpis: [
          { metric: "Blocked Fraud Value", timeframe: "Daily" }
        ],
        riskMitigations: [{ risk: "False positives", mitigation: "Human-in-the-loop review for borderline scores" }]
      },
      competitive: {
        competitors: [{ name: "Off-the-shelf fraud engines" }],
        differentiators: [{ feature: "Customizable, real-time reactive rules engine" }],
        recommendation: "Build a highly scalable Vantiq cluster utilizing in-memory state for rapid scoring."
      },
      domainModel: {
        projectName: "Transaction Scorer",
        entities: [
          { name: "Account", type: "Entity", properties: ["accountId", "balance"] },
          { name: "Transaction", type: "Event", properties: ["txId", "amount", "merchant"] }
        ],
        events: [
          { name: "TxRequest", type: "SystemEvent" },
          { name: "TxBlocked", type: "SystemAlert" }
        ]
      },
      architecture: {
        description: "Payment gateway routes transactions to Vantiq for immediate ML scoring.",
        mermaid: `graph TD\n    Gateway["Payment Gateway"] --> Vantiq["Vantiq Cluster"]\n    Vantiq --> ML["Fraud ML Model"]\n    ML --> Vantiq\n    Vantiq -- Approve --> CoreBank["Core Banking"]\n    Vantiq -- Deny --> Gateway`
      },
      eventSystem: {
        orchestrationPattern: "Synchronous Request/Reply",
        mermaid: `graph LR\n    Req["Tx Request"] --> Score{"ML Score > 0.8?"}\n    Score -- Yes --> Block["Block Tx"]\n    Score -- No --> Approve["Approve Tx"]`
      },
      diagrams: {
        diagrams: [
          {
            title: "Throughput Architecture",
            description: "High availability setup.",
            mermaid: `graph TD\n    LB["Load Balancer"] --> Node1["App Node 1"]\n    LB --> Node2["App Node 2"]`
          }
        ]
      },
      aiModels: {
        recommendations: [
          { capability: "Anomaly Detection", model: "Isolation Forest / XGBoost", rationale: "High accuracy and low latency for scoring tabular transaction data." }
        ]
      },
      agenticGuide: {
        summary: "Agents for manual review.",
        agents: [
          { role: "Fraud Analyst Agent", responsibilities: ["Review borderline cases"] }
        ]
      },
      implementation: {
        services: [{ name: "TransactionScorer", description: "Scores transactions." }],
        eventTypes: [{ name: "Transaction", fields: [{ field: "amount", type: "Double", description: "Tx Amount" }] }],
        projectStructure: [{ path: "src", files: ["TransactionScorer.json"] }],
        deploymentNotes: { namespaceSetup: "Highly available multi-region deployment.", edgeConfig: "N/A" }
      },
      roadmap: {
        roadmapPhases: [
          { phase: "Phase 1", timeline: "Weeks 1-6", focus: "Implement rules engine alongside ML model." }
        ]
      },
      adjacentUseCases: [
        { title: "Anti-Money Laundering (AML)", description: "Track complex transaction graphs to detect money laundering." }
      ]
    }
  }
};

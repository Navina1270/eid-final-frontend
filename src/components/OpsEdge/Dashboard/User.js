// Users Request/Response 

const aiveeRequest = {
  prompt: "input query",
  userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
};

const aiveeResponse = {
  statusCode: 200,
  message: "Dashboard data loaded successfully",
  promptResponse: "Response from Aivee…!",
  graphs: [
    {
      type: "line",
      title: "Sales vs Revenue",
      labels: ["Jan", "Feb", "Mar"],
      datasets: [
        {
          label: "Sales",
          data: [30, 50, 70],
        },
        {
          label: "Revenue",
          data: [40, 60, 80],
        },
      ],
    },
    {
      type: "heatmap",
      xTicks: ["X1", "X2", "X3"],
      yTicks: ["Y1", "Y2", "Y3"],
      xLabel: "X Axis",
      yLabel: "Y Axis",
      matrix: [
        [1, 3, 4],
        [5, 7, 10],
        [9, 6, 2],
      ],
    },
    {
      type: "histogram",
      data: [5, 8, 12, 15, 18, 21, 25, 27, 30, 32, 38, 42, 44, 48, 50],
      xLabel: "Score Ranges",
      yLabel: "Count",
    },
  ],
};

/////////////////////////////////////////////////////////////

const aiveeFeedbackRequest = {
  prompt: "input query",
  promptResponse: "response message from aivee",
  isLiked: true,
  feedback: "feedback message from user",
  userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
};

const aiveeFeedbackResponse = {
  statusCode: STATUSCODE,
  message: "Feedback submitted successfully…!",
};

///////////////////////////////////////////////////////////////////

const agentSummeryRequest = {}

const agentSummeryResponse = {
  statusCode: 200,
  message: "Dashboard data loaded successfully.",
  systemStatus:"All the system is working fine, only compressor and pump from location 32 is deviated.",
  agent1DeviationOutput: [
    "Compressor: Suction pressure deviated from its normal operating range",
    "Pump: Tag 35 deviated from its normal operating range",
  ],
  rca: "Summary of RCA based on 2 ...",
  notification: "Based on 2, Short text, Long text, FLOC for compressor & pump",
  materialAvailability:
    "List of materials with availability status which will be required by",
  historicalWO: "List of historical WO raised for the asset given in 2.",
};

//////////////////////////////////////

const insightRequest = {}

const insightResponse = {
  statusCode: 200,
  message: "Equipment data fetched successfully",
  equipments: [
    {
      equipmentId: "EQ001",
      title: "HP Compressor",
      score: 75,
    },
    {
      equipmentId: "EQ002",
      title: "LP Compressor",
      score: 85,
    },
  ],
};


const insightDetailsRequest = { equipmentId: "EQ001" };

const insightDetailsResponse = {
  statusCode: 200,
  message: "Discharge pressure analysis report retrieved successfully",
  equipmentId: "EQ001",
  anomolyId:"001",
  Name: "Discharge Pressure Analysis",
  Summary:
    "This report analyzes the discharge pressure at location P1000-UTL-AMINE. The actual range slightly exceeds the operational range, with a maximum of 10.32 and a deviation of 21.00% from the mean value.",
  Data: [
    {
      Parameter: "discharge pressure",
      Location: "P1000-UTL-AMINE",
      "Operation Range": "7.69 - 10.12",
      "Actual Range": "7.1 - 10.32",
      Description:
        "The max is 10.32, the mean is 8.99, the standard deviation is 0.54, and this feature is 21.00% deviated from the mean (0.32).",
    },
    {
      Parameter: "discharge pressure",
      Location: "P1000-UTL-AMINE",
      "Operation Range": "7.69 - 10.12",
      "Actual Range": "7.1 - 10.32",
      Description:
        "For discharge pressure, the min is 7.1, the max is 10.32, the mean is 8.99, the standard deviation is 0.54, and this feature is 21.00% deviated from the mean (0.32).",
    },
    {
      Parameter: "discharge pressure",
      Location: "P1000-UTL-AMINE",
      "Operation Range": "7.69 - 10.12",
      "Actual Range": "7.1 - 10.32",
      Description:
        "For discharge pressure, the min is 7.1, the max is 10.32, the mean is 8.99, the standard deviation is 0.54, and this feature is 21.00% deviated from the mean (0.32).",
    },
  ],
};

/////////////////////////////////////////////////

const systemFactsRequest = {}

const systemFactsResponse = {
  statusCode: 200,
  message: "System facts retrieved successfully",
  systemFacts: [
    {
      icon: "⚙️",
      title: "Maintenance Bot",
      text: "RCA can reduce equipment downtime by up to 50%, allowing your system to recover faster and operate more reliably.",
    },
    {
      icon: "📊",
      title: "Log Analyzer",
      text: "Always validate compressor logs weekly. Its a simple step that prevents costly failures and ensures optimal performance.",
    },
    {
      icon: "🤖",
      title: "AI Engine",
      text: "Our AI models analyze over 1 million datapoints in seconds, finding issues that human eyes might miss.",
    },
    {
      icon: "🚨",
      title: "Alert System",
      text: "Early warnings from RCA prevent unplanned outages. Stay ahead of failures before they happen.",
    },
    {
      icon: "🔧",
      title: "Predictive Maintainer",
      text: "Predictive maintenance based on RCA insights can cut repair costs by 30% and increase equipment lifespan.",
    },
    {
      icon: "📈",
      title: "System Insight",
      text: "Using historical RCA data helps prevent recurring problems, ensuring long-term system stability and performance.",
    },
  ],
};

/////////////////////////////////////////////////////////////////////////

const rcaListRequest = { userId: "c1931d9a-1031-70fb-715d-28a939b15e10" };

const rcaListResponse = {
  statusCode: 200,
  message: "Notification status list retrieved successfully",
  notificationStatus: [
    {
      id: "2123",
      "Equipment Name": "HP Compressor",
      "Date & Time": "03/26/2025 05:33PM",
      Notifications: "Generated",
    },
    {
      id: 2,
      "Equipment Name": "LP Compressor",
      "Date & Time": "03/26/2025 05:33PM",
      Notifications: "Not Generated",
    },
    {
      id: 3,
      "Equipment Name": "HP Compressor",
      "Date & Time": "03/26/2025 05:33PM",
      Notifications: "Generated",
    },
    {
      id: 4,
      "Equipment Name": "LP Compressor",
      "Date & Time": "03/26/2025 05:33PM",
      Notifications: "Not Generated",
    },
    {
      id: 5,
      "Equipment Name": "HP Compressor",
      "Date & Time": "03/26/2025 05:33PM",
      Notifications: "Generated",
    },
  ],
};


/////////////////////////////////////////////////////////////


const generateNotificationRequest = {
  "query" : "issue in lubricator",
  "rcaId": "2123",
  "userId": "c1931d9a-1031-70fb-715d-28a939b15e10",
}


const generateNotificationResponse = {
  statusCode: 200,
  message: "Notification details retrieved successfully",
  notificationDetails: {
    reportedBy: "John Doe",
    notificationDate: "2024-03-04",
    notification: "Equipment Failure",
    notificationType: "Breakdown",
    description:
      "For the Centrifuge machine, it was observed to vibrate more than normal, which may lead to mechanical seal failure in the next coming weeks.",
    additionalNotes: "Additional Notes of attachments",
    attachmentLink: "https://example.com",
    priority: "High",
    breakdown: "Yes",
    requiredStartDate: "2024-03-10",
    requiredEndDate: "2024-03-15",
    functionalLocation: {
      name: "Plant A",
      tooltip: "Main Processing Unit",
    },
    equipmentName: {
      name: "Centrifuge Machine",
      tooltip: "High-speed rotating equipment",
    },
    mainPlant: {
      name: "Chemical Processing Unit",
      tooltip: "Primary chemical treatment area",
    },
    plantSection: {
      name: "Chemical Processing Unit",
      tooltip: "Primary chemical treatment area",
    },
    plannerGroup: {
      name: "Maintenance Team",
      tooltip: "Responsible for periodic inspections",
    },
    mainWorkCtr: {
      name: "Machinery Maintenance",
      tooltip: "Handles rotating equipment issues",
    },
  },
};

/////////////////////////////////////////////////////////////////

const createNotificationRequest = {
  reportedBy: "John Doe",
  notificationDate: "2024-03-04",
  notification: "Equipment Failure",
  notificationType: "Breakdown",
  description:
    "For the Centrifuge machine, it was observed to vibrate more than normal, which may lead to mechanical seal failure in the next coming weeks.",
  additionalNotes: "Additional Notes of attachments",
  attachmentLink: "https://example.com",
  priority: "High",
  breakdown: "Yes",
  requiredStartDate: "2024-03-10",
  requiredEndDate: "2024-03-15",
  functionalLocation: {
    name: "Plant A",
    tooltip: "Main Processing Unit",
  },
  equipmentName: {
    name: "Centrifuge Machine",
    tooltip: "High-speed rotating equipment",
  },
  mainPlant: {
    name: "Chemical Processing Unit",
    tooltip: "Primary chemical treatment area",
  },
  plantSection: {
    name: "Chemical Processing Unit",
    tooltip: "Primary chemical treatment area",
  },
  plannerGroup: {
    name: "Maintenance Team",
    tooltip: "Responsible for periodic inspections",
  },
  mainWorkCtr: {
    name: "Machinery Maintenance",
    tooltip: "Handles rotating equipment issues",
  },
};

const createNotificationResponse = {
    "statusCode":STATUSCODE, 
    "Message":"Notification created successfully"
}

const notificationListRequest = {
  userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
};

const notificationListResponse = {
  statusCode: 200,
  message: "Work order data retrieved successfully",
  open: 2,
  closed: 1,
  rejected: 1,
  data: [
    {
      "Equipment": "HP Compressor",
      "Maintenance Type": "Preventive",
      "Priority": "High",
      "Work Order": "Generated",
    },
    {
      "Equipment": "LP Compressor",
      "Maintenance Type": "Corrective",
      "Priority": "Medium",
      "Work Order": "Not Generated",
    },
    {
      "Equipment": "LP Compressor",
      "Maintenance Type": "Predictive",
      "Priority": "Low",
      "Work Order": "Generated",
    },
    {
      "Equipment": "HP Compressor",
      "Maintenance Type": "Emergency",
      "Priority": "High",
      "Work Order": "Not Generated",
    },
  ],
};

const notificationDetailsRequest = { 
    notificationId: "EQ001" 
};

const notificationDetailsResponse = {
  statusCode: 200,
  message: "Notification details retrieved successfully",
  notificationDetails: {
    reportedBy: "John Doe",
    notificationDate: "2024-03-04",
    notification: "Equipment Failure",
    notificationType: "Breakdown",
    description:
      "For the Centrifuge machine, it was observed to vibrate more than normal, which may lead to mechanical seal failure in the next coming weeks.",
    additionalNotes: "Additional Notes of attachments",
    attachmentLink: "https://example.com",
    priority: "High",
    breakdown: "Yes",
    requiredStartDate: "2024-03-10",
    requiredEndDate: "2024-03-15",
    functionalLocation: {
      name: "Plant A",
      tooltip: "Main Processing Unit",
    },
    equipmentName: {
      name: "Centrifuge Machine",
      tooltip: "High-speed rotating equipment",
    },
    mainPlant: {
      name: "Chemical Processing Unit",
      tooltip: "Primary chemical treatment area",
    },
    plantSection: {
      name: "Chemical Processing Unit",
      tooltip: "Primary chemical treatment area",
    },
    plannerGroup: {
      name: "Maintenance Team",
      tooltip: "Responsible for periodic inspections",
    },
    mainWorkCtr: {
      name: "Machinery Maintenance",
      tooltip: "Handles rotating equipment issues",
    },
  },
};


const generateWorkOrderRequest = { 
    notificationId: "EQ001" 
};


const generateWorkOrderResponse = {
  statusCode: 200,
  message: "Work order details generated successfully",
  workOrderDetails: {
    reportedBy: "John Doe",
    notificationDate: "2024-03-04",
    status: "Open",
    description:
      "For the Centrifuge machine, it was observed to vibrate more than normal, which may lead to mechanical seal failure in the next coming weeks.",
    additionalNotes: "Additional Notes of attachments",
    attachmentLink: "https://example.com",
  },
  headerData: [
    {
      orderType: "PM01",
      equipment: "Centrifuge Machine",
      priority: "High",
      maintenancePlant: "Plant A",
      startDate: "2024-03-10",
      endDate: "2024-03-15",
    },
  ],
  operationsData: [
    {
      operationNo: "0010",
      description: "Inspect the vibration levels of the centrifuge machine.",
      workCenter: "Maintenance Workshop",
      duration: "2h",
      controlKey: "PM01",
    },
    {
      operationNo: "0020",
      description: "Replace mechanical seal if required.",
      workCenter: "Maintenance Workshop",
      duration: "3h",
      controlKey: "PM02",
    },
  ],
  componentsData: [
    {
      materialNo: "MAT-1001",
      description: "Mechanical Seal for Centrifuge",
      reservationNo: "RES-12345",
      quantity: "2",
      storageLocation: "SL-01",
    },
    {
      materialNo: "MAT-1002",
      description: "Lubricant Oil",
      reservationNo: "RES-12346",
      quantity: "1L",
      storageLocation: "SL-02",
    },
  ],
  costsData: [
    {
      costCenter: "CC-001",
      description: "Centrifuge Maintenance",
      estimatedCosts: "5000",
      settlementReceiver: "PLANT-A",
    },
    {
      costCenter: "CC-002",
      description: "Spare Part Replacement",
      estimatedCosts: "2500",
      settlementReceiver: "PLANT-A",
    },
  ],
};


const workOrderListRequest = {
  userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
};


const workOrderListResponse = {
  "statusCode": 200,
  "message": "Work Order list retrieved successfully",
  "maintenanceTasks": [
    {
      "Id": 1,
      "Equipment Name": "HP Compressor",
      "Maintenance Type": "Preventive",
      "Priority": "High",
      "Status": "In Progress"
    },
    {
      "Id": 2,
      "Equipment Name": "LP Compressor",
      "Maintenance Type": "Corrective",
      "Priority": "Medium",
      "Status": "Completed"
    },
    {
      "Id": 3,
      "Equipment Name": "LP Compressor",
      "Maintenance Type": "Predictive",
      "Priority": "Low",
      "Status": "Schedule"
    },
    {
      "Id": 4,
      "Equipment Name": "HP Compressor",
      "Maintenance Type": "Emergency",
      "Priority": "High",
      "Status": "Pending Approval"
    }
  ]
};

const workOrderDetailsRequest = {
  workOrderId: "EQ001",
  notificationId: "NO001",
};


const workOrderDetailsResponse = {
  statusCode: 200,
  message: "Work order details fetched successfully",
  workOrderDetails: {
    reportedBy: "John Doe",
    notificationDate: "2024-03-04",
    status: "Open",
    description:
      "For the Centrifuge machine, it was observed to vibrate more than normal, which may lead to mechanical seal failure in the next coming weeks.",
    additionalNotes: "Additional Notes of attachments",
    attachmentLink: "https://example.com",
  },
  headerData: [
    {
      orderType: "PM01",
      equipment: "Centrifuge Machine",
      priority: "High",
      maintenancePlant: "Plant A",
      startDate: "2024-03-10",
      endDate: "2024-03-15",
    },
  ],
  operationsData: [
    {
      operationNo: "0010",
      description: "Inspect the vibration levels of the centrifuge machine.",
      workCenter: "Maintenance Workshop",
      duration: "2h",
      controlKey: "PM01",
    },
    {
      operationNo: "0020",
      description: "Replace mechanical seal if required.",
      workCenter: "Maintenance Workshop",
      duration: "3h",
      controlKey: "PM02",
    },
  ],
  componentsData: [
    {
      materialNo: "MAT-1001",
      description: "Mechanical Seal for Centrifuge",
      reservationNo: "RES-12345",
      quantity: "2",
      storageLocation: "SL-01",
    },
    {
      materialNo: "MAT-1002",
      description: "Lubricant Oil",
      reservationNo: "RES-12346",
      quantity: "1L",
      storageLocation: "SL-02",
    },
  ],
  costsData: [
    {
      costCenter: "CC-001",
      description: "Centrifuge Maintenance",
      estimatedCosts: "5000",
      settlementReceiver: "PLANT-A",
    },
    {
      costCenter: "CC-002",
      description: "Spare Part Replacement",
      estimatedCosts: "2500",
      settlementReceiver: "PLANT-A",
    },
  ],
};

//////////////////////

const createWorkOrderRequest = {
  workOrderDetails: {
    reportedBy: "John Doe",
    notificationDate: "2024-03-04",
    status: "Open",
    description:
      "For the Centrifuge machine, it was observed to vibrate more than normal, which may lead to mechanical seal failure in the next coming weeks.",
    additionalNotes: "Additional Notes of attachments",
    attachmentLink: "https://example.com",
    notificationId: "NO001",
  },
  headerData: [
    {
      orderType: "PM01",
      equipment: "Centrifuge Machine",
      priority: "High",
      maintenancePlant: "Plant A",
      startDate: "2024-03-10",
      endDate: "2024-03-15",
    },
  ],
  operationsData: [
    {
      operationNo: "0010",
      description: "Inspect the vibration levels of the centrifuge machine.",
      workCenter: "Maintenance Workshop",
      duration: "2h",
      controlKey: "PM01",
    },
    {
      operationNo: "0020",
      description: "Replace mechanical seal if required.",
      workCenter: "Maintenance Workshop",
      duration: "3h",
      controlKey: "PM02",
    },
  ],
  componentsData: [
    {
      materialNo: "MAT-1001",
      description: "Mechanical Seal for Centrifuge",
      reservationNo: "RES-12345",
      quantity: "2",
      storageLocation: "SL-01",
    },
    {
      materialNo: "MAT-1002",
      description: "Lubricant Oil",
      reservationNo: "RES-12346",
      quantity: "1L",
      storageLocation: "SL-02",
    },
  ],
  costsData: [
    {
      costCenter: "CC-001",
      description: "Centrifuge Maintenance",
      estimatedCosts: "5000",
      settlementReceiver: "PLANT-A",
    },
    {
      costCenter: "CC-002",
      description: "Spare Part Replacement",
      estimatedCosts: "2500",
      settlementReceiver: "PLANT-A",
    },
  ],
};

const createWorkOrderResponse = {
    "statusCode":STATUSCODE, 
    "Message":"Workorder created successfully"
}

const workOrderStatusRequest = {
  workOrderId: "WO001",
  notificationId: "NO001",
  status: "Completed",
};

const workOrderStatusResponse = {
    "statusCode":STATUSCODE, 
    "Message":"Workorder status changed successfully"
}


const anomalyListRequest = {
  userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
};

const anomalyListResponse = {
  statusCode: StatusCode,
  message:"Anomoly List fetched successfully...!",
  data: [
    {
      anomalyId: "12422",
      equipment: "LP Compressor",
      "Date & Time": "",
      "rca status": "Generated",
    },
    {
      anomalyId: "12422",
      equipment: "LP Compressor",
      "Date & Time": "",
      "rca status": "Generated",
    },
  ],
};

///////////////////////////////////////////////

const generateRCARequest = {
  anomalyId:"12223",
  userId:"c1931d9a-1031-70fb-715d-28a939b15e10"
};

const generateRCAResponse = {
  statusCode: "StatusCode",
  message: "RCA Generated Successfully...!",
  data: {
    summary: "RCA Report Summary",
    rcaPlot: "S3Link",
    troubleshooting: {
      tagID: [
        "B32PI0039A.PV.1",
        "B32PDI0084.PV",
        "B32JI0003.PV.1",
        "B32FI0075.PV",
        "B32PI0039C.PV",
        "B32PI0039B.PV",
        "B32PI0039A.PV",
        "B32JI0003.PV",
        "B32RHIC0003B.PV",
      ],
      parameter: [
        "Compressor K-0001A Outlet Pressure",
        "Compressor K-0001B Suction Strainer Differential Pressure",
        "Compressor K-0001A Vibration",
        "Compressor K-0001B Suction Flow",
        "Compressor K-0001A Outlet Pressure",
        "Compressor K-0001A Outlet Pressure",
        "Compressor K-0001A Outlet Pressure",
        "Compressor K-0001A Vibration",
        "Compressor High Pressure Vibration Control Manual Output",
      ],
      troubleshootingSteps: [
        [
          "Check for blockages in the discharge line",
          "Verify the discharge valve is fully open",
          "Inspect for any leaks in the discharge piping",
          "Calibrate the pressure sensor",
          "Check for any process changes affecting discharge pressure",
        ],
        [
          "Inspect the suction strainer for clogging",
          "Clean or replace the strainer if necessary",
          "Check for any upstream contamination sources",
          "Verify the differential pressure sensor calibration",
          "Inspect the suction piping for any restrictions",
        ],
        [
          "Check for unit misalignment and realign if necessary",
          "Inspect the rotor for unbalance or damage",
          "Examine the bearings for abnormalities",
          "Verify the coupling integrity",
          "Check for any rubbing between static and dynamic parts",
        ],
        [
          "Verify the suction valve is fully open",
          "Check for any restrictions in the suction line",
          "Calibrate the flow meter",
          "Inspect for any leaks in the suction piping",
          "Verify the compressor's operating conditions are within design parameters",
        ],
        [
          "Check for blockages in the discharge line",
          "Verify the discharge valve is fully open",
          "Inspect for any leaks in the discharge piping",
          "Calibrate the pressure sensor",
          "Check for any process changes affecting discharge pressure",
        ],
        [
          "Check for blockages in the discharge line",
          "Verify the discharge valve is fully open",
          "Inspect for any leaks in the discharge piping",
          "Calibrate the pressure sensor",
          "Check for any process changes affecting discharge pressure",
        ],
        [
          "Check for blockages in the discharge line",
          "Verify the discharge valve is fully open",
          "Inspect for any leaks in the discharge piping",
          "Calibrate the pressure sensor",
          "Check for any process changes affecting discharge pressure",
        ],
        [
          "Check for unit misalignment and realign if necessary",
          "Inspect the rotor for unbalance or damage",
          "Examine the bearings for abnormalities",
          "Verify the coupling integrity",
          "Check for any rubbing between static and dynamic parts",
        ],
        [
          "Verify the manual output settings",
          "Check the high-pressure vibration control system",
          "Inspect the vibration sensors for proper functioning",
          "Calibrate the control system if necessary",
          "Examine the compressor for any abnormal vibrations",
        ],
      ],
    },
  },
};

////////////////////////////////////////////////////

const viewRCARequest = {
  rcaId: "12223",
  userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
};

const viewRCAResponse = {
  statusCode: "StatusCode",
  message: "RCA Fetched Successfully...!",
  data: {
    summary: "RCA Report Summary",
    rcaPlot: "S3Link",
    troubleshooting: {
      tagID: [
        "B32PI0039A.PV.1",
        "B32PDI0084.PV",
        "B32JI0003.PV.1",
        "B32FI0075.PV",
        "B32PI0039C.PV",
        "B32PI0039B.PV",
        "B32PI0039A.PV",
        "B32JI0003.PV",
        "B32RHIC0003B.PV",
      ],
      parameter: [
        "Compressor K-0001A Outlet Pressure",
        "Compressor K-0001B Suction Strainer Differential Pressure",
        "Compressor K-0001A Vibration",
        "Compressor K-0001B Suction Flow",
        "Compressor K-0001A Outlet Pressure",
        "Compressor K-0001A Outlet Pressure",
        "Compressor K-0001A Outlet Pressure",
        "Compressor K-0001A Vibration",
        "Compressor High Pressure Vibration Control Manual Output",
      ],
      troubleshootingSteps: [
        [
          "Check for blockages in the discharge line",
          "Verify the discharge valve is fully open",
          "Inspect for any leaks in the discharge piping",
          "Calibrate the pressure sensor",
          "Check for any process changes affecting discharge pressure",
        ],
        [
          "Inspect the suction strainer for clogging",
          "Clean or replace the strainer if necessary",
          "Check for any upstream contamination sources",
          "Verify the differential pressure sensor calibration",
          "Inspect the suction piping for any restrictions",
        ],
        [
          "Check for unit misalignment and realign if necessary",
          "Inspect the rotor for unbalance or damage",
          "Examine the bearings for abnormalities",
          "Verify the coupling integrity",
          "Check for any rubbing between static and dynamic parts",
        ],
        [
          "Verify the suction valve is fully open",
          "Check for any restrictions in the suction line",
          "Calibrate the flow meter",
          "Inspect for any leaks in the suction piping",
          "Verify the compressor's operating conditions are within design parameters",
        ],
        [
          "Check for blockages in the discharge line",
          "Verify the discharge valve is fully open",
          "Inspect for any leaks in the discharge piping",
          "Calibrate the pressure sensor",
          "Check for any process changes affecting discharge pressure",
        ],
        [
          "Check for blockages in the discharge line",
          "Verify the discharge valve is fully open",
          "Inspect for any leaks in the discharge piping",
          "Calibrate the pressure sensor",
          "Check for any process changes affecting discharge pressure",
        ],
        [
          "Check for blockages in the discharge line",
          "Verify the discharge valve is fully open",
          "Inspect for any leaks in the discharge piping",
          "Calibrate the pressure sensor",
          "Check for any process changes affecting discharge pressure",
        ],
        [
          "Check for unit misalignment and realign if necessary",
          "Inspect the rotor for unbalance or damage",
          "Examine the bearings for abnormalities",
          "Verify the coupling integrity",
          "Check for any rubbing between static and dynamic parts",
        ],
        [
          "Verify the manual output settings",
          "Check the high-pressure vibration control system",
          "Inspect the vibration sensors for proper functioning",
          "Calibrate the control system if necessary",
          "Examine the compressor for any abnormal vibrations",
        ],
      ],
    },
  },
};
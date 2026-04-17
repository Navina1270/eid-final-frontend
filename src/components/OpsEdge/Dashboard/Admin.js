// Admin Request/Response Body for Domainwise
const createUserRequest = {
  firstName: "Adarsh",
  lastName: "Shet",
  email: "adarsh.shet@example.com",
  role: "admin",
  userId: "c1931d9a-1031-70fb-715d-28a939b15e10",
  project: "Project1",
};

const createUserResponse = {
  statusCode: "STATUSCODE",
  message:
    "User Created Successfully...! Verification link send to Registered Email Id",
};

///////////////////////////////////////////////////

const getProjectListRequest = [];

const getProjectListResponse = {
  statusCode: "STATUSCODE",
  message: "project list fetched Successfully...!",
  data: [
    {
      name: "Project 1",
      description: "Optimize chemical factory ...",
      creationDate: "2025-03-13T05:34:00",
      lastUpdated: "2025-03-13T05:34:00",
      kgURL: "knowledge graph url",
    },
    {
      name: "Project 2",
      description: "Optimize 2 chemical factory ...",
      creationDate: "2025-03-13T05:34:00",
      lastUpdated: "2025-03-13T05:34:00",
      kgURL: "knowledge graph url",
    },
  ],
};

////////////////////////////////////////

const createProjectRequest = {
  project: {
    name: "Project Name",
    description: "Project Description",
  },
  llmConfig: {
    name: "LLM Name",
    model: "Model Name",
    accessId: "your-access-id",
    apiKey: "your-API-Key",
    secretAccessKey: "your-secret-access-key",
    details: "Additional LLM details",
  },
  knowledgeGraph: {
    graphType: "Neo4j",
    name: "Graph Name",
    uri: "bolt://localhost:7687",
    username: "neo4j",
    password: "password",
  },
  connectors: {
    files: [
      {
        type: "FTP",
        host: "ftp.example.com",
        port: 21,
        username: "ftp_user",
        password: "ftp_password",
        paths: [
          {
            source: "/data/source1",
            destination: "/data/target1",
          },
          {
            source: "/data/source2",
            destination: "/data/target2",
          },
        ],
      },
      {
        type: "SFTP",
        host: "ftp.example.com",
        port: 21,
        username: "ftp_user",
        password: "ftp_password",
        paths: [
          {
            source: "/data/source1",
            destination: "/data/target1",
          },
          {
            source: "/data/source2",
            destination: "/data/target2",
          },
        ],
      },
    ],
    timeseries: [
      {
        type: "FTP",
        host: "ftp.example.com",
        port: 21,
        username: "ftp_user",
        password: "ftp_password",
        paths: [
          {
            source: "/data/source1",
            destination: "/data/target1",
          },
          {
            source: "/data/source2",
            destination: "/data/target2",
          },
        ],
      },
      {
        type: "SFTP",
        host: "ftp.example.com",
        port: 21,
        username: "ftp_user",
        password: "ftp_password",
        paths: [
          {
            source: "/data/source1",
            destination: "/data/target1",
          },
          {
            source: "/data/source2",
            destination: "/data/target2",
          },
        ],
      },
    ],
    sap: [
      {
        type: "FTP",
        host: "ftp.example.com",
        port: 21,
        username: "ftp_user",
        password: "ftp_password",
        paths: [
          {
            source: "/data/source1",
            destination: "/data/target1",
          },
          {
            source: "/data/source2",
            destination: "/data/target2",
          },
        ],
      },
      {
        type: "SFTP",
        host: "ftp.example.com",
        port: 21,
        username: "ftp_user",
        password: "ftp_password",
        paths: [
          {
            source: "/data/source1",
            destination: "/data/target1",
          },
          {
            source: "/data/source2",
            destination: "/data/target2",
          },
        ],
      },
    ],
    database: [
      {
        type: "FTP",
        host: "ftp.example.com",
        port: 21,
        username: "ftp_user",
        password: "ftp_password",
        paths: [
          {
            source: "/data/source1",
            destination: "/data/target1",
          },
          {
            source: "/data/source2",
            destination: "/data/target2",
          },
        ],
      },
      {
        type: "SFTP",
        host: "ftp.example.com",
        port: 21,
        username: "ftp_user",
        password: "ftp_password",
        paths: [
          {
            source: "/data/source1",
            destination: "/data/target1",
          },
          {
            source: "/data/source2",
            destination: "/data/target2",
          },
        ],
      },
    ],
  },
  modelValidation: {
    modelFile: "model.onnx",
    tests: [
      "Concept Drift",
      "Data Drift",
      "Latency & Inference Time",
      "Usage",
      "LIME Test",
      "Health Score",
      "Inference Consistency",
      "Data Quality",
      "Memory & Compute",
      "SHAP test",
      "Compliance & Regulatory",
    ],
    frequency: "weekly", // or daily/monthly
    startDate: "2025-07-23",
  },
};

const createProjectResponse = {
  statusCode: "STATUSCODE",
  message: "Project Created Successfully",
};

//////////////////////////////////////////////
const modelListRequest = [];

const modelListResponse = {
  statusCode: "STATUSCODE",
  message: "Model List Fetched Successfully",
  data: [
    { value: "GPT-3", label: "GPT-3" },
    { value: "GPT-4", label: "GPT-4" },
    { value: "BERT", label: "BERT" },
    { value: "AWS Bedrock", label: "AWS Bedrock" },
    { value: "Azure OpenAI", label: "Azure OpenAI" },
    { value: "Google Gemini", label: "Google Gemini" },
    { value: "Anthropic Claude", label: "Anthropic Claude" },
    { value: "Mistral", label: "Mistral" },
    { value: "Llama 2", label: "Llama 2" },
    { value: "Llama 3", label: "Llama 3" },
    { value: "OpenAI Codex", label: "OpenAI Codex" },
    { value: "Other", label: "Other" },
  ],
};

//////////////////////////////////////////////////////////////
const kgListRequest = [];

const kgListResponse = {
  statusCode: "STATUSCODE",
  message: "Knowledge Graph List Fetched Successfully",
  data: [
    { value: "kg1", label: "Knowledge Graph 1" },
    { value: "kg2", label: "Knowledge Graph 2" },
  ],
};

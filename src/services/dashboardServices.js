import constants from "@/config/constants.json";
import axios from "axios";
const BASE_URL = constants.BASE_URL;

export const getInsights = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}insights`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("getInsights error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const getAnamolyList = async (equipmentId, startTime, endTime) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}anomaly_list`, {
      params: {
        start_time: startTime,
        end_time: endTime,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Map the data to match frontend expectations
    if (response.data && response.data.data) {
      response.data.data = response.data.data.map((item) => ({
        "anomaly id": item.anomalyId,
        equipment: item.equipment,
        "Start Time": item["Date & Time"],
        "End Time": item["Date & Time"],
        Remark: item.remark,
        "rca status": item["rca status"],
      }));
    }

    return response.data;
  } catch (error) {
    console.log("getAnamolyList error:", error);
    return (
      error?.response?.data || {
        statusCode: 500,
        message: "Network error. Please try again.",
      }
    );
  }
};

export const enterRCA = async (anomalyId) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    const response = await axios.post(
      `${BASE_URL}api/main/generate_rca`,
      { anomalyId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("enterRCA API error:", error);
    return (
      error?.response?.data || {
        status: false,
        statusCode: 500,
        message: "Something went wrong. Please try again later.",
      }
    );
  }
};

export const getRCAList = async (pageNumber = 1, pageSize = 10) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    const response = await axios.post(
      `${BASE_URL.replace(/\/$/, "")}/api/main/rca_list_paginated`,
      { userId, pageNumber, pageSize },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("RCA API error:", error);
    return (
      error?.response?.data || {
        statusCode: 500,
        message: "Network error. Please check your connection and try again.",
      }
    );
  }
};

export const getNotificationList = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await axios.post(
      `${BASE_URL}notifications_list`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("RCA API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const getWorkOrderList = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await axios.post(
      `${BASE_URL}workorder_list`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const getInsightDetails = async (equipmentId, anomalyId, anomalyTime) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://yeca8lp5p5.execute-api.ap-south-1.amazonaws.com/insight-details`,
      { equipmentId, anomalyId, anomalyTime },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const generateRCA = async (
  input,
  anamolyId,
  rcaData,
  rcaId,
  equipmentId,
  date,
  feedbackType,
  step,
  method,
  threadId
) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // const response = await axios.post(
    //     `${BASE_URL}generate_rca`,
    //     { anomalyId, equipmentId },
    //     {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     }
    // );

    const response = await fetch(`${BASE_URL}generate_rca`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        feedbackText: input,
        anomalyId: anamolyId,
        rcaData: rcaData,
        userId: userId,
        rcaId: rcaId,
        equipmentId: equipmentId,
        date: date,
        feedback: feedbackType,
        step: step,
        method: method,
        threadId: threadId,
      }),
    });

    return response;
  } catch (error) {
    console.error("RCA API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const generateNotification = async (rcaId, query) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await axios.post(
      `${BASE_URL}generate_notification`,
      { rcaId, userId, query },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Generate Notification error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const createNotification = async (notificationDetails) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}create_notification`,
      notificationDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const createWorkOder = async (workOrderDetails) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}create_workorder`,
      workOrderDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const generateWorkOrder = async (notificationId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}generate_workorder`,
      { notificationId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const viewRCA = async (rcaId) => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!userId || userId === "undefined" || userId === "null") {
      console.error("viewRCA error: userId is missing or invalid in localStorage");
      return { statusCode: 400, message: "User ID missing. Please log in again." };
    }

    if (!rcaId || rcaId === "undefined" || rcaId === "null") {
        console.error("viewRCA error: rcaId is missing or invalid");
        return { statusCode: 400, message: "RCA ID is missing." };
      }

    const url = `${BASE_URL.replace(/\/$/, "")}/api/main/view_rca`;
    console.log(`Calling viewRCA API: ${url} with rcaId: ${rcaId} and userId: ${userId}`);

    const response = await axios.post(
      url,
      { rcaId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const errorDetail = error?.response?.data || error.message;
    console.error("view_rca API error:", errorDetail);
    return error?.response?.data || { statusCode: error?.response?.status || 500, message: JSON.stringify(errorDetail) || "Network error. Please try again." };
  }
};

export const viewNotification = async (notificationId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}notification_details`,
      { notificationId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const viewWorkOrder = async (workorderNumber, notificationId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}workorder_details`,
      { workorderNumber, notificationId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const saveWorkOrderStatus = async (
  workOrderId,
  notificationId,
  status
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}workorder_status`,
      { workOrderId, notificationId, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const getCausal = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}symbolic_graph_retrieval`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("causal error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

const BOILER_DATA_SAMPLE = [
  { "Date & Time": "2025-05-23 05:00:00", "Feed_water_Economizer_inlet_temperature": 114.47, "Feed_water_Economizer_outlet_temperature": 134.55, "Main_steam_outlet_temperature_1": 362.88, "Main_steam_outlet_temperature_2": 363.37, "Steam_Temperature_at_attemptator_outlet": 312.09, "Superheater_1_inlet_Temperature": 266.19, "Steam_drum_level_transmitter": 47.5, "Steam_drum_pressure": 49.56, "Attemperator": 0, "Main_steam_outlet_line_pressure1": 42.59, "Main_steam_outlet_line_pressure2": 42.95, "Steam_flow_to_Deaerator": 0, "Boiler_Blow_down_flow_meter": 0, "Main_steam_flow_1": 19223.44, "Main_steam_flow_2": 19179.19, "Bed_temperature_Compartment_1A": 1050.47, "Bed_temperature_Compartment_1B": 1036.02, "Bed_temperature_Compartment_2A": 1054.29, "Bed_temperature_Compartment_2B": 1048, "Furnace_pressure_1": 0.18, "Furnace_pressure_2": 1.49, "Furnace_Temperature": 660.12, "FD_air_flow_FI_401": 36.59, "FD_air_pressure_compartment_1": 1173.87, "FD_air_pressure_compartment_2": 1160.49, "SA_air_flow": 9.95, "Flue_gas_pressure_at_SH_1": -0.09, "Flue_gas_pressure_at_SH_2": 4.73, "Flue_gas_Temperature_at_SH_1": 418.65, "Flue_gas_Temperature_at_SH_2": 481.81, "Evaporator_2_temperature": 271.43, "Flue_gas_pressure_at_Evaporator_1_inlet": -1.16, "Flue_gas_pressure_at_Evaporator_2_inlet": 0, "SA_air_pressure": 604.33, "Flue_gas_Temperature_at_Evaporator_1_inlet": 352, "Flue_gas_Temperature_at_Evaporator_3_inlet": -6.69, "Preseperator_temp": 179.27, "ID_fan_suction_flue_gas_pressure": -93.44, "ID_fan_temperature": 163.23, "Spent_wash_Brix": 79.96, "Instrument_air_pressure": 5.66 },
  { "Date & Time": "2025-05-23 05:30:00", "Feed_water_Economizer_inlet_temperature": 117.96, "Feed_water_Economizer_outlet_temperature": 135.73, "Main_steam_outlet_temperature_1": 359.65, "Main_steam_outlet_temperature_2": 359.51, "Steam_Temperature_at_attemptator_outlet": 310.82, "Superheater_1_inlet_Temperature": 264.37, "Steam_drum_level_transmitter": 48.5, "Steam_drum_pressure": 48.32, "Attemperator": 0, "Main_steam_outlet_line_pressure1": 41.12, "Main_steam_outlet_line_pressure2": 41.48, "Steam_flow_to_Deaerator": 0, "Boiler_Blow_down_flow_meter": 0, "Main_steam_flow_1": 19351.06, "Main_steam_flow_2": 19253.99, "Bed_temperature_Compartment_1A": 1065.42, "Bed_temperature_Compartment_1B": 1051.96, "Bed_temperature_Compartment_2A": 1069.02, "Bed_temperature_Compartment_2B": 1064, "Furnace_pressure_1": 0.04, "Furnace_pressure_2": 1.07, "Furnace_Temperature": 660.12, "FD_air_flow_FI_401": 36.59, "FD_air_pressure_compartment_1": 1245.09, "FD_air_pressure_compartment_2": 1235.64, "SA_air_flow": 9.79, "Flue_gas_pressure_at_SH_1": -0.09, "Flue_gas_pressure_at_SH_2": 1.59, "Flue_gas_Temperature_at_SH_1": 411.68, "Flue_gas_Temperature_at_SH_2": 468.38, "Evaporator_2_temperature": 268.52, "Flue_gas_pressure_at_Evaporator_1_inlet": -2.6, "Flue_gas_pressure_at_Evaporator_2_inlet": -7.69, "SA_air_pressure": 590.52, "Flue_gas_Temperature_at_Evaporator_1_inlet": 346.01, "Flue_gas_Temperature_at_Evaporator_3_inlet": -9.18, "Preseperator_temp": 179.46, "ID_fan_suction_flue_gas_pressure": -94.42, "ID_fan_temperature": 163.01, "Spent_wash_Brix": 85.67, "Instrument_air_pressure": 5.5 },
  { "Date & Time": "2025-05-23 06:00:00", "Feed_water_Economizer_inlet_temperature": 114.78, "Feed_water_Economizer_outlet_temperature": 135.74, "Main_steam_outlet_temperature_1": 361.46, "Main_steam_outlet_temperature_2": 361.34, "Steam_Temperature_at_attemptator_outlet": 310.6, "Superheater_1_inlet_Temperature": 265.66, "Steam_drum_level_transmitter": 49, "Steam_drum_pressure": 48.15, "Attemperator": 0, "Main_steam_outlet_line_pressure1": 41.1, "Main_steam_outlet_line_pressure2": 41.39, "Steam_flow_to_Deaerator": 0, "Boiler_Blow_down_flow_meter": 0, "Main_steam_flow_1": 19235.55, "Main_steam_flow_2": 19194.15, "Bed_temperature_Compartment_1A": 1052.42, "Bed_temperature_Compartment_1B": 1038.57, "Bed_temperature_Compartment_2A": 1048.21, "Bed_temperature_Compartment_2B": 1056, "Furnace_pressure_1": 0.51, "Furnace_pressure_2": 0.49, "Furnace_Temperature": 658.75, "FD_air_flow_FI_401": 0, "FD_air_pressure_compartment_1": 1259.19, "FD_air_pressure_compartment_2": 1258.5, "SA_air_flow": 9.85, "Flue_gas_pressure_at_SH_1": -0.24, "Flue_gas_pressure_at_SH_2": 0.91, "Flue_gas_Temperature_at_SH_1": 412.84, "Flue_gas_Temperature_at_SH_2": 469.27, "Evaporator_2_temperature": 266.15, "Flue_gas_pressure_at_Evaporator_1_inlet": -1.96, "Flue_gas_pressure_at_Evaporator_2_inlet": -21.62, "SA_air_pressure": 597.32, "Flue_gas_Temperature_at_Evaporator_1_inlet": 346.54, "Flue_gas_Temperature_at_Evaporator_3_inlet": -8.07, "Preseperator_temp": 178.23, "ID_fan_suction_flue_gas_pressure": -96.23, "ID_fan_temperature": 162.05, "Spent_wash_Brix": 85.29, "Instrument_air_pressure": 5.81 },
  { "Date & Time": "2025-05-23 06:30:00", "Feed_water_Economizer_inlet_temperature": 115.03, "Feed_water_Economizer_outlet_temperature": 137.58, "Main_steam_outlet_temperature_1": 363.54, "Main_steam_outlet_temperature_2": 363.13, "Steam_Temperature_at_attemptator_outlet": 312.77, "Superheater_1_inlet_Temperature": 267.28, "Steam_drum_level_transmitter": 46.5, "Steam_drum_pressure": 49.62, "Attemperator": 0, "Main_steam_outlet_line_pressure1": 42.32, "Main_steam_outlet_line_pressure2": 42.6, "Steam_flow_to_Deaerator": 0, "Boiler_Blow_down_flow_meter": 0, "Main_steam_flow_1": 19544.8, "Main_steam_flow_2": 19246.18, "Bed_temperature_Compartment_1A": 1057.66, "Bed_temperature_Compartment_1B": 1042.89, "Bed_temperature_Compartment_2A": 1059.99, "Bed_temperature_Compartment_2B": 1056, "Furnace_pressure_1": 0.3, "Furnace_pressure_2": 1.06, "Furnace_Temperature": 660.02, "FD_air_flow_FI_401": 0, "FD_air_pressure_compartment_1": 1284.53, "FD_air_pressure_compartment_2": 1280.93, "SA_air_flow": 10.15, "Flue_gas_pressure_at_SH_1": -0.28, "Flue_gas_pressure_at_SH_2": 0.63, "Flue_gas_Temperature_at_SH_1": 416.77, "Flue_gas_Temperature_at_SH_2": 474.49, "Evaporator_2_temperature": 268.44, "Flue_gas_pressure_at_Evaporator_1_inlet": -1.95, "Flue_gas_pressure_at_Evaporator_2_inlet": -12.81, "SA_air_pressure": 606.99, "Flue_gas_Temperature_at_Evaporator_1_inlet": 350.39, "Flue_gas_Temperature_at_Evaporator_3_inlet": -7.58, "Preseperator_temp": 179.49, "ID_fan_suction_flue_gas_pressure": -102.36, "ID_fan_temperature": 161.2, "Spent_wash_Brix": 77.48, "Instrument_air_pressure": 5.88 }
];

export const getPlotForRCA = async (
  tagId,
  equipmentId,
  startTime,
  endTime,
  plotType
) => {
  try {
    const token = localStorage.getItem("token");
    const url = `${BASE_URL.replace(/\/$/, "")}/get_plot_data`;
    
    console.log("Fetching Plot Data for tags:", tagId);

    const response = await axios.post(
      url,
      { tagId, equipmentId, startTime, endTime, plotType },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.data) {
      return response.data;
    }
    
    throw new Error("Empty or invalid data from server");

  } catch (error) {
    console.warn("getPlotForRCA API failed, trying local fallback for Boiler data:", error.message);
    
    // Check if we can provide a fallback for Boiler data
    const targetTag = Array.isArray(tagId) ? tagId[0] : tagId;
    
    // Check if targetTag exists in our sample
    if (BOILER_DATA_SAMPLE[0][targetTag] !== undefined) {
      console.log("Serving mock fallback data for:", targetTag);
      return {
        statusCode: 200,
        message: "Success (Fallback)",
        data: {
          title: targetTag.replace(/_/g, " "),
          xLabel: "Time",
          yLabel: "Value",
          labels: BOILER_DATA_SAMPLE.map(row => row["Date & Time"]),
          datasets: [
            {
              label: targetTag,
              data: BOILER_DATA_SAMPLE.map(row => row[targetTag])
            }
          ]
        }
      };
    }

    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const getTagPDF = async (path) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}shareable_link`,
      { path },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const getRCAPDF = async (date, equipmentId, rcaData, rcaId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}compile_report`,
      { date, equipmentId, rcaData, rcaId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const getPlotForInsights = async (equipmentId, startTime, endTime) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://yeca8lp5p5.execute-api.ap-south-1.amazonaws.com/boiler_efficiency`,
      { 
        startTime: startTime, 
        endTime: endTime 
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const addRuleSymbolic = async (symbolic_rule, file) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (symbolic_rule) formData.append("symbolic_rule", symbolic_rule);
    if (file) formData.append("file", file);
    const response = await axios.post(
      `${BASE_URL}symbolic_ai_add_rule`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const addQuerySymbolic = async (query) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}symbolic_query_graph_retrieval`,
      { query },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("workorder_list API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

export const getEquipmentDetails = async (equipmentNumber) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}api/equipment`,
      {
        equipment_no: equipmentNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Equipments details API error:", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};


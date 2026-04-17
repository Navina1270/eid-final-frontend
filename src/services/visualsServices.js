import { visualChartResponse, visualResponse } from "@/config/constant";
import constants from "@/config/constants.json";
import axios from "axios";
const BASE_URL = constants.BASE_URL;

// To get the visuals list
export const getVisualsList = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.post(
      `${BASE_URL.replace(/\/$/, "")}/api/main/visuals_list`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch visuals list=========================>",
      error
    );
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

//To get visual chart data and selected tag list by visual Id
export const getVisualsDetails = async (
  visualId,
  fromDate,
  toDate,
  equipmentId,
  tagId
) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const payload = {
    visualId,
    fromDate,
    toDate,
    equipmentId,
    tagId,
    userId,
  };
  try {
    const response = await axios.post(`${BASE_URL}get_visuals_by_id`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch visuals chart data====================>",
      error
    );
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

//To delete tag from selected tag list

export const deleteSelectedTag = async (visualId, tagId) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.post(
      `${BASE_URL}delete_tag_by_id`,
      { visualId, tagId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete the tag=====================>", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

// To get tag list
export const getTagList = async (visualId) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.post(
      `${BASE_URL}get_tag_list`,
      { visualId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in fetching tag list================>", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

//To add tags (add_visuals) from tag list

export const addVisuals = async (type, name, visualId, equipmentId, tagId) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  try {
    const response = await axios.post(
      `${BASE_URL}add_visuals`,
      { type, name, visualId, equipmentId, tagId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in adding new tag================>", error);
    return error?.response?.data || { statusCode: 500, message: "Network error. Please try again." };
  }
};

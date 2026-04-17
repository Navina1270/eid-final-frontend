import { KGLIST, MODELLIST, PROJECTLIST } from "@/config/constant";
import constants from "@/config/constants.json";
import axios from "axios";
const BASE_URL = constants.BASE_URL;

export const getProjectList = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}getprojectlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      message: error?.response?.data?.message,
      statusCode: error?.response?.data?.statusCode,
    };
  }
};

export const addProject = async (token, projectData) => {
  try {
    console.log("Creating new Project");
    const response = await axios.post(`${BASE_URL}addproject`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.response.status,
      message: error.response.data?.message || "Failed to create the project",
    };
  }
};

export const getKnowledgeGraphList = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}kglist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return {
      message: error?.response?.data?.message,
      statusCode: error?.response?.data?.statusCode,
    };
  }
};

export const getModelList = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}modellist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return {
      message: error.response.data?.message || "Something went wrong",
      statusCode: error?.response?.status || 500,
    };
  }
};


export const editProject = async (token, id) => {
  try {
  } catch (error) {}
};

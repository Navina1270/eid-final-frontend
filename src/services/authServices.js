import constants from "@/config/constants.json";
import axios from "axios";
const BASE_URL = constants.BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}login`,
      {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching Login data:", error);

    if (error.response && error.response.status === 401) {
      return {
        status: "error",
        message: "Invalid username or password!",
      };
    }

    return {
      status: "error",
      message: "Something went wrong. Please try again later.",
    };
  }
};

export const register = async (name, email, password) => {
  try {
    // const response = await axios.post(`${BASE_URL}/login`, {
    //   email,
    //   password
    // });

    // if (response.status === 200) {
    //   return {
    //     status: response.status,
    //     success: true,
    //     message: 'Login successful',
    //     data: response.data
    //   };
    // } else {
    //   return {
    //     status: response.status,
    //     success: false,
    //     message: 'Unexpected status code',
    //     data: null
    //   };
    // }

    const response = {
      name: "ABC",
      email: email,
      user_id: 123123123,
    };

    return {
      status: 200,
      success: true,
      message: "Login successful",
      data: response,
    };
  } catch (error) {
    console.error("Login Error:", error);

    // Handle Axios error object correctly
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message || "An error occurred during login";

    return {
      status,
      success: false,
      message,
      data: null,
    };
  }
};

export const setNewPassword = async (passwordDetails) => {
  try {
    const response = await axios.post(
      `${BASE_URL}set_new_password`,
      passwordDetails
    );
    return response.data;
  } catch (error) {
    console.log(error)
    return {
      statusCode: error?.response?.data?.statusCode || "error",
      message:
        error?.response?.data?.message || "Something went wrong. Please try again later.",
    };
  }
};

export const createUser = async (token, userDetails) => {
  try {
    const response = await axios.post(`${BASE_URL}create_user`, userDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error====>", error);

    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403 ||
      error?.response?.data?.statusCode === 409
    ) {
      // console.log("Error====>", error?.response);
      // console.log("Error====>", error?.response?.data);
      console.log("Error====>", error?.response?.data);

      return {
        message: error?.response?.data?.message,
        statusCode: error?.response?.data?.statusCode,
      };
    }
    return {
      message: "An unexpected error occurred",
      status: error?.response?.status || 500,
    };

    // return {
    //   status: "error",
    //   message: "Something went wrong. Please try again later.",
    // };
  }
};

// ;

export const forgetPassword = async (email) => {
  try {
    const forgetPasswordDetails = {
      email: email,
    };

    console.log("forgetPasswordDetails===========>", forgetPasswordDetails);
    console.log("BASE_URL===========>", BASE_URL);

    const response = await axios.post(
      `${BASE_URL}forgetpassword`,
      forgetPasswordDetails
    );
    return response.data;
  } catch (error) {
    console.log("forgetpassword Error====>", error);

    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403 ||
      error?.response?.data?.statusCode === 409
    ) {
      // console.log("Error====>", error?.response);
      // console.log("Error====>", error?.response?.data);
      console.log("Error====>", error?.response?.data);

      return {
        message: error?.response?.data?.message,
        statusCode: error?.response?.data?.statusCode,
      };
    }
    return {
      message: "An unexpected error occurred",
      status: error?.response?.status || 500,
    };
  }
};

export const otpConfirmation = async (
  email,
  otp,
  newPassword,
  confirmPassword
) => {
  try {
    const confirmPasswordDetails = {
      email: email,
      code: otp,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    const response = await axios.post(
      `${BASE_URL}confirm-forgetpassword`,
      confirmPasswordDetails
    );
    return response.data;
  } catch (error) {
    console.log("Error====>", error);

    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403 ||
      error?.response?.data?.statusCode === 409
    ) {
      // console.log("Error====>", error?.response);
      // console.log("Error====>", error?.response?.data);
      console.log("Error====>", error?.response?.data);

      return {
        message: error?.response?.data?.message,
        statusCode: error?.response?.data?.statusCode,
      };
    }
    return {
      message: "An unexpected error occurred",
      status: error?.response?.status || 500,
    };
  }
};

// ;

export const userList = async (token, userId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}userlist`,
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
    console.log("Error====>", error);
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403 ||
      error?.response?.data?.statusCode === 409
    ) {
      // console.log("Error====>", error?.response);
      // console.log("Error====>", error?.response?.data);
      console.log("Error====>", error?.response?.data);

      return {
        message: error?.response?.data?.message,
        statusCode: error?.response?.data?.statusCode,
      };
    }
    return {
      message: "An unexpected error occurred",
      status: error?.response?.status || 500,
    };
  }
};

export const updateUserStatus = async (token, userData) => {
  console.log(userData);
  try {
    const response = await axios.post(`${BASE_URL}updateuserstatus`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error====>", error);
    if (error?.response) {
      console.log("Error====>", error?.response?.data);
      return {
        message: error?.response?.data?.message,
        statusCode: error?.response?.data?.statusCode,
      };
    }
    return {
      message: "An unexpected error occurred",
      status: error?.response?.status || 500,
    };
  }
};

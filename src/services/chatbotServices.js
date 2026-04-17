import constants from "@/config/constants.json";
import axios from "axios";
const BASE_URL = constants.BASE_URL;

export const sendChatQuery = async (prompt, userId, signal) => {
  try {
    const token = localStorage.getItem("token");
    console.log(
      "Sending prompt to chatbot API:",
      prompt + " for user:",
      userId
    );
    const response = await fetch(
      `${BASE_URL}aivee`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, userId }),
        signal
      });
    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      return null;
    }
    console.error("Chatbot API error:", error);
    return {
      statusCode: 500,
      message: "Server error. Please try again later.",
      data: {},
    };
  }
};

// export const sendChatQuery = async (prompt) => {
//   try {
//     console.log("Sending prompt to chatbot API:", prompt);
//     const response = await axios.get(`${BASE_URL}`);
//     return response.data;
//   } catch (error) {
//     console.error("Chatbot API error:", error);
//     return {
//       statusCode: 500,
//       message: "Server error. Please try again later.",
//       data: {}
//     };

//   }
// };

export const submitUserFeedback = async ({
  prompt,
  promptResponse,
  isLiked,
  feedback,
  username,
}) => {
  const token = localStorage.getItem("token");
  console.log("Submitting feedback:", {
    prompt,
    promptResponse,
    isLiked,
    feedback,
  });
  try {
    const response = await axios.post(
      `${BASE_URL}aivee_feedback`,
      {
        prompt,
        promptResponse,
        isLiked,
        feedback,
        user_id: "1",
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Feedback response:111111", response.data);

    return response.data;
  } catch (error) {
    console.error("Feedback submission failed:", error);
    throw error.response?.data || error;
  }
};

// export const submitUserFeedback = async ({ prompt, promptResponse, isLiked, feedback }) => {
//     console.log("Submitting feedback:", { prompt, promptResponse, isLiked, feedback });
//     try {
//         const response = await axios.get(`${BASE_URL}`);

//         return response.data;
//     } catch (error) {
//         console.error("Feedback submission failed:", error);
//         throw error.response?.data || error;
//     }
// };


export const deleteChat = async ({ userId }) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${BASE_URL}delete_chat`,
      {
        userId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    return response.data;
  } catch (error) {
    console.error("Delete chat failed:", error);
    throw error.response?.data || error;
  }
};
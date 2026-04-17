// "use client";
// import NextButton from "@/components/Common/Form/NextButton";
// import TextInput from "@/components/Common/Form/TextInput";
// import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
// import { sendChatQuery, submitUserFeedback } from "@/services/chatbotServices";
// import {
//     PaperAirplaneIcon,
//     XMarkIcon,
// } from "@heroicons/react/24/solid";
// import { useEffect, useRef, useState } from "react";
// import { Toaster, toast } from "sonner";
// import React from "react";
// import ChatMessages from "./ChatMessages";
// import { showError, showSuccess } from "@/utils/toastUtils";

// export default function ChatBot({ onBotMessage }) {
//     const [messages, setMessages] = useState(() => {
//         if (typeof window !== "undefined") {
//             const saved = sessionStorage.getItem("chatMessages");
//             if (saved) {
//                 return JSON.parse(saved);
//             }
//         }
//         return [
//             {
//                 text: "Hi, I am Aivee how can I help you today?",
//                 from: "bot",
//                 originalQuery: "",
//                 feedbackGiven: true,
//             },
//         ];
//     });
//     const [input, setInput] = useState("");
//     const [feedbackModal, setFeedbackModal] = useState({ open: false, type: "", messageIndex: null, feedback: "" });
//     const chatRef = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const [responseRequested, setResponseRequested] = useState(false);
//     const inputRef = useRef(null);

//     useEffect(() => {
//         sessionStorage.setItem("chatMessages", JSON.stringify(messages));
//     }, [messages]);

//     useEffect(() => {
//         const last = messages[messages.length - 1];
//         if (last?.from === "bot" && last.graphs?.length > 0) {
//             onBotMessage?.(last);
//         }
//     }, [messages, onBotMessage]);

//     const sendMessage = async () => {
//         if (!input.trim()) return;

//         const userMsg = { text: input, from: "user" };
//         const loadingMsg = {
//             text: "",
//             from: "bot",
//             isLoading: true,
//             feedbackGiven: true,
//         };

//         setMessages((prev) => [...prev, userMsg, loadingMsg]);
//         const prompt = input;
//         setInput("");
//         setResponseRequested(true);
//         const userId = localStorage.getItem("userId");
//         const response = await sendChatQuery(prompt, userId);

//         console.log("Chatbot Response:", response);

//         setMessages((prev) => {
//             const updated = [...prev];
//             updated.pop();

//             if (response.statusCode === 200 && response.promptResponse) {
//                 updated.push({
//                     text: response.promptResponse,
//                     graphs: response.graphs || [],
//                     from: "bot",
//                     originalQuery: prompt,
//                     feedbackGiven: false,
//                 });

//                 setResponseRequested(false);
//             } else {
//                 showError(response.message)
//                 setResponseRequested(false);
//             }

//             return updated;
//         });
//     };

//     useEffect(() => {
//         chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
//     }, [messages]);

//     useEffect(() => {
//         const last = messages[messages.length - 1];
//         if (last?.from === "bot" && !last.isLoading) {
//             inputRef.current?.focus();
//         }
//     }, [messages]);

//     const handleFeedbackClick = (type, index) => {
//         setFeedbackModal({ open: true, type, messageIndex: index, feedback: "" });
//     };

//     const submitFeedback = async () => {
//         setLoading(true);
//         const index = feedbackModal.messageIndex;

//         const updatedMessages = [...messages];

//         const botMsg = updatedMessages[index];
//         const userQuery =
//             botMsg.originalQuery ||
//             updatedMessages
//                 .slice(0, index)
//                 .reverse()
//                 .find((m) => m.from === "user")?.text;

//         const payload = {
//             prompt: userQuery,
//             promptResponse: botMsg.text,
//             isLiked: feedbackModal.type === "like" ? true : false,
//             feedback: feedbackModal.feedback,
//             userId: localStorage.getItem("userId"),
//         };

//         try {
//             const result = await submitUserFeedback(payload);

//             console.log("✅ Server Response:", result);

//             updatedMessages[index] = {
//                 ...botMsg,
//                 feedbackGiven: true,
//             };

//             setMessages(updatedMessages);
//             setLoading(false);
//             setFeedbackModal({ open: false, type: "", messageIndex: null, feedback: "" });

//             showSuccess("Feedback Submitted")

//         } catch (err) {
//             setLoading(false);
//             console.error("❌ Feedback submission failed", err);
//             showError(response.message || "Something went wrong")

//         }
//     };

//     const lastBotMsg = [...messages].reverse().find((m) => m.from === "bot");
//     const feedbackPending = lastBotMsg && !lastBotMsg.feedbackGiven;

//     return (
//         <>
//             {loading && (
//                 <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-md flex items-center justify-center">
//                     <RippleLoader />
//                 </div>
//             )}

//             <div className="flex flex-col h-full ">

//                 <div
//                     ref={chatRef}
//                     className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar"
//                 >
//                     <ChatMessages
//                         messages={messages}
//                         handleFeedbackClick={handleFeedbackClick}
//                     />
//                 </div>

//                 <div className="px-4 py-2 border-t border-slate-700 bg-slate-900 sticky bottom-0">
//                     <div className="max-w-4xl mx-auto flex items-center gap-2">
//                         <input
//                             ref={inputRef}
//                             type="text"
//                             className="flex-1 bg-slate-800 text-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-slate-400"
//                             placeholder="Type your message..."
//                             value={input}
//                             // onFocus={() => {
//                             //     if (feedbackPending) {
//                             //         showError("Please provide feedback for the previous message to continue.")
//                             //     }
//                             // }}
//                             onChange={(e) => {
//                                 // if (feedbackPending && input.length === 0) {
//                                 //     showError("Please provide feedback for the previous message to continue.")
//                                 // }
//                                 setInput(e.target.value);
//                             }}
//                             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                             disabled={responseRequested}
//                         />
//                         <button
//                             onClick={sendMessage}
//                             disabled={responseRequested || feedbackPending}
//                             className={`p-2 rounded-lg transition ${responseRequested
//                                 ? "bg-gray-400 cursor-not-allowed"
//                                 : "bg-cyan-400 hover:scale-105 text-black"
//                                 }`}
//                         >
//                             <PaperAirplaneIcon className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {feedbackModal.open && (
//                 <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 flex items-center justify-center">
//                     <div className="bg-slate-800 p-2 rounded-xl shadow-lg ring-2 ring-slate-700 w-full max-w-xl text-gray-300 relative">
//                         <div className="relative text-center text-lg mb-4 ">
//                             Feedback
//                             <button
//                                 onClick={() => setFeedbackModal({ open: false, type: "", messageIndex: null, feedback: "" })}
//                                 className="absolute right-2 p-1 hover:bg-white/10 rounded"
//                             >
//                                 <XMarkIcon className="w-5 h-5" />
//                             </button>
//                             <div className="mt-2 h-0.5 w-full bg-gradient-to-r from-cyan-400 to-lime-400 rounded-full" />
//                         </div>
//                         <div>
//                             <h3 className="flex justify-center text-lg font-semibold text-slate-200 mb-3 gap-2">
//                                 {
//                                     feedbackModal.type === "like" ?
//                                         "Like the response? Feel free to share your thoughts with us!" :
//                                         "Din't like the response? Let us know how we can improve!"
//                                 }

//                             </h3>
//                             <TextInput
//                                 value={feedbackModal.feedback}
//                                 onChange={(e) =>
//                                     setFeedbackModal({ ...feedbackModal, feedback: e.target.value })
//                                 }
//                                 // error={projectDescriptionError}
//                                 placeholder="What did you like/dislike?"
//                                 rows={3}
//                             />
//                             <div className="flex justify-center mt-4 gap-2">
//                                 <NextButton onClick={submitFeedback} label="Submit" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <style jsx>{`
//                 .custom-scrollbar::-webkit-scrollbar {
//                     width: 6px;
//                 }
//                 .custom-scrollbar::-webkit-scrollbar-thumb {
//                     background: rgba(255, 255, 255, 0.1);
//                     border-radius: 9999px;
//                 }
//             `}</style>
//         </>
//     );
// }


"use client";
import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import { sendChatQuery, submitUserFeedback } from "@/services/chatbotServices";
import { PaperAirplaneIcon, StopCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import React from "react";
import ChatMessages from "./ChatMessages";
import { showError, showSuccess } from "@/utils/toastUtils";
import LZString from "lz-string";

const defaultWelcomeMessage = [
  {
    text: "Hi, I am Aivee how can I help you today?",
    from: "bot",
    originalQuery: "",
    feedbackGiven: true,
  },
];

export default function ChatBot({ onBotMessage, clearChatSignal }) {
  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const compressed = sessionStorage.getItem("chatMessages");
      if (compressed) {
        try {
          const decompressed = LZString.decompress(compressed);
          const parsed = JSON.parse(decompressed);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (e) {
          console.error("❌ Failed to decompress chat messages:", e);
          sessionStorage.removeItem("chatMessages");
        }
      }
    }
    return defaultWelcomeMessage;
  });

  const [input, setInput] = useState("");
  const [feedbackModal, setFeedbackModal] = useState({
    open: false,
    type: "",
    messageIndex: null,
    feedback: "",
  });
  const chatRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [responseRequested, setResponseRequested] = useState(false);
  const inputRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    try {
      const json = JSON.stringify(messages);
      const compressed = LZString.compress(json);
      sessionStorage.setItem("chatMessages", compressed);
    } catch (e) {
      console.error("❌ Failed to compress chat messages:", e);
    }
  }, [messages]);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.from === "bot" && last.graphs?.length > 0) {
      onBotMessage?.(last);
    }
  }, [messages, onBotMessage]);

  useEffect(() => {
    if (clearChatSignal) {
      setMessages(defaultWelcomeMessage);
    }
  }, [clearChatSignal]);

  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connect = () => {
      // Browsers cannot send custom headers (Authorization) with WebSocket.
      // Pass token as a query parameter for AWS API Gateway $connect authorizer.
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const wsUrl = `wss://w71ioy3ka2.execute-api.ap-south-1.amazonaws.com/production?token=${encodeURIComponent(token || "")}&userId=${encodeURIComponent(userId || "")}`;
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("✅ Chatbot WebSocket connected to:", ws.url);
        setConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          console.log("📩 Raw WS message received:", event.data);
          const response = JSON.parse(event.data);
          console.log("📩 Parsed Chatbot Response:", response);

          // Handle greeting/connection acknowledgment messages (no statusCode)
          if (response.response_type === "greeting" || (!response.statusCode && response.message && !response.data)) {
            console.log("👋 Server greeting received:", response.message);
            return; // Ignore greeting messages, don't show error
          }

          if (response.statusCode === 200 && response.data) {
            // promptResponse can be an array of {type, text} objects or a plain string
            const promptArr = response.data.promptResponse || [];
            let botText;
            if (Array.isArray(promptArr)) {
              botText = promptArr.map(item => (typeof item === "string" ? item : item.text || "")).join("\n");
            } else {
              botText = String(promptArr);
            }

            // Attempt to nicely format embedded JSON from the LLM
            try {
              const jsonStart = botText.indexOf('{');
              const jsonEnd = botText.lastIndexOf('}');
              if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                const jsonStr = botText.substring(jsonStart, jsonEnd + 1);
                // Validate if it's actually parseable JSON
                const parsed = JSON.parse(jsonStr);

                let formattedJson = "";
                
                // If the JSON is wrapped in a "response" key, unwrap it for cleaner display
                let rootObj = parsed;
                if (parsed.response && typeof parsed.response === 'object' && !Array.isArray(parsed.response)) {
                    rootObj = parsed.response;
                }

                function formatValue(key, value) {
                    const readableKey = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    
                    if (Array.isArray(value)) {
                        return `**${readableKey}:**\n` + value.map(v => `- ${v}`).join("\n") + "\n\n";
                    } else if (value && typeof value === 'object') {
                        let res = `**${readableKey}:**\n\n`;
                        for (const [k, v] of Object.entries(value)) {
                            const subReadableKey = k.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                            if (Array.isArray(v)) {
                                res += `* **${subReadableKey}:**\n` + v.map(item => `  - ${item}`).join("\n") + "\n";
                            } else if (v && typeof v === 'object') {
                                res += `* **${subReadableKey}:** ${JSON.stringify(v)}\n`;
                            } else {
                                res += `* **${subReadableKey}:** ${v}\n`;
                            }
                        }
                        return res + "\n";
                    } else {
                        return `**${readableKey}:**\n${value}\n\n`;
                    }
                }

                for (const [key, value] of Object.entries(rootObj)) {
                    formattedJson += formatValue(key, value);
                }

                // Replace the raw JSON block in the bot's response with our clean Markdown formatting
                botText = botText.substring(0, jsonStart).trim() + "\n\n" + formattedJson.trim() + "\n\n" + botText.substring(jsonEnd + 1).trim();
              }
            } catch (e) {
              // If it's not valid JSON, we just ignore and show the original text
              console.log("Response text didn't contain valid JSON, rendering as plain text.");
            }

            setMessages((prev) => {
              const updated = [...prev];
              // Replace the loading message with the actual response
              if (updated[updated.length - 1]?.isLoading) {
                updated.pop();
              }
              updated.push({
                text: botText,
                graphs: response.data.graphs || [],
                from: "bot",
                originalQuery: updated[updated.length - 1]?.text || "",
                feedbackGiven: false,
              });
              return updated;
            });
            setResponseRequested(false);
          } else if (response.statusCode && response.statusCode !== 200) {
            showError(response.message || "Failed to get response");
            setResponseRequested(false);
          }
        } catch (err) {
          console.error("❌ Failed to parse WS message:", err, "Original data:", event.data);
        }
      };

      ws.onerror = (err) => {
        // Detailed error logging
        console.error("❌ Chatbot WebSocket Error Event:", err);
        // Error events often don't have human-readable info, so we check various properties
        if (ws.readyState === WebSocket.CLOSED) {
          console.error("❌ WebSocket connection was refused or closed immediately.");
        }
        setConnected(false);
      };

      ws.onclose = (event) => {
        console.log(`⚠️ Chatbot WebSocket closed (Code: ${event.code}, Reason: ${event.reason || 'No reason provided'})`);
        setConnected(false);
        // Attempt to reconnect after a short delay if it wasn't a normal closure
        if (event.code !== 1000) {
          console.log("🔄 Attempting to reconnect in 5 seconds...");
          setTimeout(connect, 5000);
        }
      };
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !connected) {
      if (!connected) showError("Connecting to server, please wait...");
      return;
    }

    const userMsg = { text: input, from: "user" };
    const loadingMsg = {
      text: "",
      from: "bot",
      isLoading: true,
      feedbackGiven: true,
      originalQuery: input
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    const prompt = input;
    const userId = localStorage.getItem("userId");

    setInput("");
    setResponseRequested(true);

    try {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({
          prompt: prompt,
          userId: userId
        }));
      } else {
        throw new Error("WebSocket not connected");
      }
    } catch (err) {
      console.error("❌ Send Message Error:", err);
      showError("Failed to send message. Please check your connection.");
      setResponseRequested(false);
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // Remove loading message
        return updated;
      });
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.from === "bot" && !last.isLoading) {
      inputRef.current?.focus();
    }
  }, [messages]);

  const handleFeedbackClick = (type, index) => {
    setFeedbackModal({ open: true, type, messageIndex: index, feedback: "" });
  };

  const submitFeedback = async () => {
    setLoading(true);
    const index = feedbackModal.messageIndex;

    const updatedMessages = [...messages];
    const botMsg = updatedMessages[index];
    const userQuery =
      botMsg.originalQuery ||
      updatedMessages
        .slice(0, index)
        .reverse()
        .find((m) => m.from === "user")?.text;

    const payload = {
      prompt: userQuery,
      promptResponse: botMsg.text,
      isLiked: feedbackModal.type === "like",
      feedback: feedbackModal.feedback,
      userId: localStorage.getItem("userId"),
    };

    try {
      const result = await submitUserFeedback(payload);

      updatedMessages[index] = {
        ...botMsg,
        feedbackGiven: true,
      };

      setMessages(updatedMessages);
      setLoading(false);
      setFeedbackModal({
        open: false,
        type: "",
        messageIndex: null,
        feedback: "",
      });

      showSuccess("Feedback Submitted");
    } catch (err) {
      setLoading(false);
      console.error("❌ Feedback submission failed", err);
      showError(err.message || "Something went wrong");
    }
  };

  const stopStreaming = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;

      setResponseRequested(false);
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        updated[updated.length - 1] = { ...last, isLoading: false };
        return updated;
      });
    }
  };

  const lastBotMsg = [...messages].reverse().find((m) => m.from === "bot");
  const feedbackPending = lastBotMsg && !lastBotMsg.feedbackGiven;

  return (
    <>
      {loading && (
        <RippleLoader />
      )}

      <div className="flex flex-col h-full">
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar"
        >
          <ChatMessages
            messages={messages}
            handleFeedbackClick={handleFeedbackClick}
          />
        </div>

        <div className="px-4 py-3 border-t border-slate-200 bg-white sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-slate-100 text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={responseRequested}
            />
            {!responseRequested ? (
              <button
                onClick={sendMessage}
                className={`p-2.5 rounded-xl transition bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-md group`}
              >
                <PaperAirplaneIcon className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button
                onClick={stopStreaming}
                className={`p-1.5 rounded-xl transition bg-red-500 hover:bg-red-600 hover:scale-105 shadow-md`}
              >
                <StopCircleIcon className="w-8 h-8 text-white" />
              </button>
            )}

          </div>
        </div>
      </div>

      {feedbackModal.open && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
            <div className="relative text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Share your Feedback</h2>
              <button
                onClick={() =>
                  setFeedbackModal({
                    open: false,
                    type: "",
                    messageIndex: null,
                    feedback: "",
                  })
                }
                className="absolute -top-1 -right-1 p-2 hover:bg-slate-100 rounded-full transition-colors"
                title="Close"
              >
                <XMarkIcon className="w-6 h-6 text-slate-400" />
              </button>
              <div className="mt-3 h-1 w-24 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
            </div>

            <div className="space-y-4">
              <h3 className="text-center text-slate-600 font-medium px-4">
                {feedbackModal.type === "like"
                  ? "Great! We're glad Aivee helped. Anything else you'd like to tell us?"
                  : "We're sorry the response wasn't helpful. Please let us know how we can improve."}
              </h3>

              <div className="bg-slate-50 rounded-2xl p-1 border border-slate-100 focus-within:border-blue-500 transition-colors">
                <TextInput
                  value={feedbackModal.feedback}
                  onChange={(e) =>
                    setFeedbackModal({
                      ...feedbackModal,
                      feedback: e.target.value,
                    })
                  }
                  placeholder="Your thoughts..."
                  rows={4}
                  className="bg-transparent border-none focus:ring-0 text-slate-800"
                />
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={submitFeedback}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 9999px;
        }
      `}</style>
    </>
  );
}

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
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import React from "react";
import ChatMessages from "./ChatMessages";
import { showError, showSuccess } from "@/utils/toastUtils";
import LZString from "lz-string";

// ✅ Default message
const defaultWelcomeMessage = [
  {
    text: "Hi, I am Aivee how can I help you today?",
    from: "bot",
    originalQuery: "",
    feedbackGiven: true,
  },
];

export default function ChatBot({ onBotMessage }) {
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
          // Optional: clear invalid data
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

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, from: "user" };
    const loadingMsg = {
      text: "",
      from: "bot",
      isLoading: true,
      feedbackGiven: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    const prompt = input;
    setInput("");
    setResponseRequested(true);
    const userId = localStorage.getItem("userId");
    const response = await sendChatQuery(prompt, userId);

    setMessages((prev) => {
      const updated = [...prev];
      updated.pop();

      if (response.statusCode === 200 && response.promptResponse) {
        updated.push({
          text: response.promptResponse,
          graphs: response.graphs || [],
          from: "bot",
          originalQuery: prompt,
          feedbackGiven: false,
        });

        setResponseRequested(false);
      } else {
        showError(response.message);
        setResponseRequested(false);
      }

      return updated;
    });
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

        <div className="px-4 py-2 border-t border-slate-700 bg-slate-900 sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-slate-800 text-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-slate-400"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={responseRequested}
            />
            <button
              onClick={sendMessage}
              disabled={responseRequested}
              className={`p-2 rounded-lg transition ${
                responseRequested
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-400 hover:scale-105 text-black"
              }`}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {feedbackModal.open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="bg-slate-800 p-2 rounded-xl shadow-lg ring-2 ring-slate-700 w-full max-w-xl text-gray-300 relative">
            <div className="relative text-center text-lg mb-4 ">
              Feedback
              <button
                onClick={() =>
                  setFeedbackModal({
                    open: false,
                    type: "",
                    messageIndex: null,
                    feedback: "",
                  })
                }
                className="absolute right-2 p-1 hover:bg-white/10 rounded"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
              <div className="mt-2 h-0.5 w-full bg-gradient-to-r from-cyan-400 to-lime-400 rounded-full" />
            </div>
            <div>
              <h3 className="flex justify-center text-lg font-semibold text-slate-200 mb-3 gap-2">
                {feedbackModal.type === "like"
                  ? "Like the response? Feel free to share your thoughts with us!"
                  : "Didn't like the response? Let us know how we can improve!"}
              </h3>
              <TextInput
                value={feedbackModal.feedback}
                onChange={(e) =>
                  setFeedbackModal({
                    ...feedbackModal,
                    feedback: e.target.value,
                  })
                }
                placeholder="What did you like/dislike?"
                rows={3}
              />
              <div className="flex justify-center mt-4 gap-2">
                <NextButton onClick={submitFeedback} label="Submit" />
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
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
        }
      `}</style>
    </>
  );
}

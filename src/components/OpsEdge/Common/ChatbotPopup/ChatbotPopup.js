"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    PaperAirplaneIcon,
    XMarkIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon
} from "@heroicons/react/24/solid";

export default function ChatbotPopup({ onClose, onMaximizeChange }) {
    const [messages, setMessages] = useState([
        { text: "Hi, Im Aivee 🤖. How can I help you today?", from: "bot", isTyping: false },
    ]);
    const [input, setInput] = useState("");
    const chatRef = useRef(null);
    const popupRef = useRef(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [showGreeting, setShowGreeting] = useState(true);

    // Typing animation helper
    const typeMessage = (fullText, from) => {
        // Show typing dots first
        setMessages(prev => [...prev, { text: "", from, isTyping: true }]);

        setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { text: fullText.slice(0, index), from, isTyping: true };
                    return updated;
                });
                index++;
                if (index > fullText.length) {
                    clearInterval(interval);
                    setMessages(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1].isTyping = false;
                        return updated;
                    });
                }
            }, 30);
        }, 2000); // wait 1s showing dots before starting text
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        const userMsg = { text: input, from: "user", isTyping: false };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        setTimeout(() => {
            typeMessage(`You said: "${userMsg.text}"`, "bot");
        }, 500);
    };

    const handleToggleMaximize = () => {
        setIsMaximized(prev => {
            const newVal = !prev;
            if (onMaximizeChange) onMaximizeChange(newVal);
            return newVal;
        });
    };

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <>
            <div
                ref={popupRef}
                className={`fixed border text-gray-300 border-[#00ffcc]/50 flex flex-col transition-all duration-300 ${isMaximized
                    ? "top-18 bottom-8 right-2 left-66 rounded-xl bg-slate-900"
                    : "bottom-24 right-6 w-80 h-96 rounded-2xl mb-4 bg-slate-800"
                    }`}
            >
                {/* Header */}
                <div className={`px-4 py-2 rounded-t-2xl flex justify-between items-center ${isMaximized ? "bg-slate-800" : "bg-slate-900"}`}>
                    <div className="flex items-center gap-2 bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
                        <img src="/images/Aivee.gif" alt="Logo" className="h-8" />
                        <p className="leading-none text-cyan-400 ">Ask Aivee</p>
                    </div>
                    <div className="flex gap-2">
                        {isMaximized ? (
                            <ArrowsPointingInIcon
                                className="h-5 w-5 text-white cursor-pointer hover:text-blue-400"
                                title="Minimize"
                                onClick={handleToggleMaximize}
                            />
                        ) : (
                            <ArrowsPointingOutIcon
                                className="h-5 w-5 text-white cursor-pointer hover:text-blue-400"
                                title="Maximize"
                                onClick={handleToggleMaximize}
                            />
                        )}
                        <XMarkIcon
                            className="w-5 h-5 cursor-pointer hover:text-red-400 transition-colors"
                            title="Close"
                            onClick={() => {
                                onClose();
                                if (onMaximizeChange) onMaximizeChange(false);
                            }}
                        />
                    </div>
                </div>

                {/* Chat Body */}
                <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm text-white custom-scrollbar"
                >
                    {isMaximized && showGreeting && (
                        <div className="text-center mt-5 mb-12">
                            <h2 className="text-3xl text-cyan-500"> Hi! Im Aivee</h2>
                            <p className="text-slate-300 mt-1 text-sm">
                                Ask anything related to your applications, knowledge graph, or connected data.
                            </p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`px-5 py-3 rounded-2xl shadow-md w-fit max-w-[70%]
                                   ${msg.from === "user"
                                    ? "bg-cyan-600 text-white rounded-tr-none ml-auto"
                                    : "bg-slate-600 text-slate-200 rounded-tl-none mr-auto"
                                }                                                             
                               `}
                        >
                            {msg.isTyping && !msg.text ? (
                                <span className="typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            ) : (
                                msg.text
                            )}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="flex items-center border-t border-[#00ffcc]/30 p-2">
                    <input
                        className="flex-1 px-3 py-2 rounded-full bg-slate-800 outline-none placeholder:text-gray-200"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Ask your question..."
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 p-2 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(20, 84, 194, 0.3);
                    border-radius: 9999px;
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(20, 84, 194, 0.3) transparent;
                }
                .typing-dots {
                 display: inline-flex;
                 align-items: flex-end;
                 gap: 4px;
                }

                .typing-dots span {
                 display: block;
                 width: 6px;
                 height: 6px;
                 background: white;
                 border-radius: 50%;
                 animation: bounceUpDown 0.6s infinite ease-in-out;
                }

                .typing-dots span:nth-child(1) {
                    animation-delay: 0s;
                }
                .typing-dots span:nth-child(2) {
                    animation-delay: 0.15s;
                }
                .typing-dots span:nth-child(3) {
                    animation-delay: 0.3s;
                }

                @keyframes bounceUpDown {
                    0%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-4px);
                    }
                }
                }
                @keyframes bounce {
                    0%, 80%, 100% {
                        transform: scale(0);
                    }
                    40% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </>
    );
}


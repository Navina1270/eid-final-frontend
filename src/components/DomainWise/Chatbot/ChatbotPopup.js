"use client";
import { useState, useEffect } from "react";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";

import LZString from "lz-string";
import { showError, showSuccess } from "@/utils/toastUtils";
import { deleteChat } from "@/services/chatbotServices";
import dynamic from "next/dynamic";

const ChatBot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ChatbotPopup({ open, onClose }) {
  const [maximized, setMaximized] = useState(false);
  const [clearChatSignal, setClearChatSignal] = useState(false);

  const handleBotResponse = (msg) => {
    if (msg.graphs?.length > 0) {
      setMaximized(true);
    }
  };

  // const downloadChatPDF = async () => {
  //   const messages = JSON.parse(sessionStorage.getItem("chatMessages") || "[]");
  //   const doc = new jsPDF({ unit: "pt", format: "a4" });
  //   let y = 60;
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const margin = 40;

  //   for (const [i, msg] of messages.entries()) {
  //     const sender = msg.from === "user" ? "You" : "Aivee";
  //     doc.setFontSize(12);
  //     doc.setFont("helvetica", "bold");
  //     doc.text(`${sender}:`, margin, y);
  //     y += 18;

  //     doc.setFontSize(10);
  //     doc.setFont("helvetica", "normal");
  //     const splitText = doc.splitTextToSize(msg.text || "", pageWidth - margin * 2);
  //     doc.text(splitText, margin + 10, y);
  //     y += splitText.length * 16 + 10;

  //     if (msg.from === "bot" && msg.graphs?.length > 0) {
  //       for (let g = 0; g < msg.graphs.length; g++) {
  //         const graphEl = document.getElementById(`graph-${i}-${g}`);

  //         if (graphEl) {
  //           try {
  //             const scale = 2;
  //             const dataUrl = await domtoimage.toPng(graphEl, {
  //               cacheBust: true,
  //               width: graphEl.offsetWidth * scale,
  //               height: graphEl.offsetHeight * scale,
  //               style: {
  //                 transform: `scale(${scale})`,
  //                 transformOrigin: "top left",
  //               },
  //             });

  //             const imgWidth = pageWidth - margin * 2;
  //             const aspect = graphEl.offsetHeight / graphEl.offsetWidth;
  //             const imgHeight = imgWidth * aspect;

  //             if (y + imgHeight > doc.internal.pageSize.getHeight() - margin) {
  //               doc.addPage();
  //               y = margin;
  //             }
  //             doc.addImage(dataUrl, "PNG", margin, y, imgWidth, imgHeight);
  //             y += imgHeight + 20;
  //           } catch (err) {
  //             console.error("Graph capture failed:", err);
  //           }
  //         }
  //       }
  //     }

  //     if (y > doc.internal.pageSize.getHeight() - margin) {
  //       doc.addPage();
  //       y = margin;
  //     }
  //   }

  //   doc.save("chat_history.pdf");
  // };

  const downloadChatPDF = async () => {
    const compressed = sessionStorage.getItem("chatMessages");
    const decompressed = LZString.decompress(compressed || "");

    let messages = [];
    try {
      messages = JSON.parse(decompressed);
    } catch (err) {
      console.error("Failed to parse decompressed chat data:", err);
      alert("Failed to generate PDF. Chat data may be corrupted.");
      return;
    }

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    let y = 60;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;

    for (const [i, msg] of messages.entries()) {
      const sender = msg.from === "user" ? "You" : "Aivee";
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${sender}:`, margin, y);
      y += 18;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const splitText = doc.splitTextToSize(
        msg.text || "",
        pageWidth - margin * 2
      );
      doc.text(splitText, margin + 10, y);
      y += splitText.length * 16 + 10;

      if (msg.from === "bot" && msg.graphs?.length > 0) {
        for (let g = 0; g < msg.graphs.length; g++) {
          const graphEl = document.getElementById(`graph-${i}-${g}`);

          if (graphEl) {
            try {
              const scale = 2;
              const dataUrl = await domtoimage.toPng(graphEl, {
                cacheBust: true,
                width: graphEl.offsetWidth * scale,
                height: graphEl.offsetHeight * scale,
                style: {
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                },
              });

              const imgWidth = pageWidth - margin * 2;
              const aspect = graphEl.offsetHeight / graphEl.offsetWidth;
              const imgHeight = imgWidth * aspect;

              if (y + imgHeight > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                y = margin;
              }

              doc.addImage(dataUrl, "PNG", margin, y, imgWidth, imgHeight);
              y += imgHeight + 20;
            } catch (err) {
              console.error("Graph capture failed:", err);
            }
          }
        }
      }

      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
    }

    doc.save("chat_history.pdf");
  };

  // if (!open) return null;

  const deleteChatHistory = async () => {
    setClearChatSignal(true);

    const userId = localStorage.getItem("userId");
    try {
      const rcaDetails = await deleteChat({ userId });

      if (rcaDetails.statusCode === 401 || rcaDetails.statusCode === 403) {
        showError(rcaDetails.message || "Invalid token or access denied");
      } else if (rcaDetails.statusCode && rcaDetails.statusCode !== 200) {
        showError(rcaDetails.message || "Failed to delete chat");
      } else {
        showSuccess(rcaDetails.message || "Chat cleared");
        sessionStorage.removeItem("chatMessages");
      }
    } catch (err) {
      console.error("❌ Delete chat error:", err);
      // Still clear local chat even if server call fails
      sessionStorage.removeItem("chatMessages");
      showSuccess("Chat cleared locally");
    }

    setClearChatSignal(false);
  };

  return (
    <div
      className={`fixed z-100 bg-white shadow-2xl border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300
    ${maximized
          ? "top-18 bottom-8 right-2 left-66"
          : "bottom-28 right-4 w-[375px] top-20"
        }
    ${open
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none translate-y-full"
        }
  `}
    >
      <div className="flex justify-between items-center bg-slate-50 px-4 py-3 border-b border-slate-200">
        <h3 className="text-blue-600 font-bold border-l-4 border-blue-500 pl-3">Aivee Assistant</h3>
        <div className="flex gap-1">
          <button
            onClick={downloadChatPDF}
            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
            title="Download Chat PDF"
          >
            <ArrowDownTrayIcon className="w-5 h-5 text-slate-500" />
          </button>
          <button
            onClick={deleteChatHistory}
            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
            title="Delete Chat History"
          >
            <TrashIcon className="w-5 h-5 text-slate-500" />
          </button>
          <button
            onClick={() => setMaximized((prev) => !prev)}
            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {maximized ? (
              <ArrowsPointingInIcon className="w-5 h-5 text-slate-500" />
            ) : (
              <ArrowsPointingOutIcon className="w-5 h-5 text-slate-500" />
            )}
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group">
            <XMarkIcon className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
          </button>
        </div>
      </div>

      <ChatBot
        onBotMessage={handleBotResponse}
        clearChatSignal={clearChatSignal}
      />
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}

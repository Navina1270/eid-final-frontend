"use client";
import { useState, useEffect } from "react";
import { ArrowsPointingOutIcon, ArrowsPointingInIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ChatBot from "./Chatbot";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";

import LZString from "lz-string";


export default function ChatbotPopup({ open, onClose }) {
  const [maximized, setMaximized] = useState(false);

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
    const splitText = doc.splitTextToSize(msg.text || "", pageWidth - margin * 2);
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


  if (!open) return null;

  return (
    <div
      className={`fixed z-100 bg-slate-900 shadow-xl border-2 border-cyan-400 rounded-xl overflow-hidden transition-all duration-300 
      ${maximized ? "top-18 bottom-8 right-2 left-66" : "bottom-28 right-4 w-[375px] top-20"}`}
    >
      <div className="flex justify-between items-center bg-slate-800 px-4 py-2 border-b border-slate-700">
        <h3 className="text-cyan-400 font-semibold">Aivee Assistant</h3>
        <div className="flex gap-2">
          <button
            onClick={downloadChatPDF}
            className="p-1 hover:bg-slate-700 rounded"
            title="Download Chat PDF"
          >
            <ArrowDownTrayIcon className="w-5 h-5 text-cyan-400" />
          </button>
          <button
            onClick={() => setMaximized((prev) => !prev)}
            className="p-1 hover:bg-slate-700 rounded"
          >
            {maximized ? (
              <ArrowsPointingInIcon className="w-5 h-5 text-cyan-400" />
            ) : (
              <ArrowsPointingOutIcon className="w-5 h-5 text-cyan-400" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>


      <ChatBot onBotMessage={handleBotResponse} />
    </div>
  );
}

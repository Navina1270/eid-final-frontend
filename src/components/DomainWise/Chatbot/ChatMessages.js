import React from "react";
import Image from "next/image";
import LoadingThreeDotsJumping from "@/components/Common/LoadingThreeDotsJumping/LoadingThreeDotsJumping";
import LineChart from "@/components/Common/Graphs/LineChart/LineChart";
import HeatMapChart from "@/components/Common/Graphs/HeatMapChart/HeatMapChart";
import HistogramChart from "@/components/Common/Graphs/HistogramChart/HistogramChart ";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

function linkifyIfNeeded(text) {
  if (typeof text !== "string") return "";
  if (!text) return "";

  // Escape HTML special chars except links
  const escapeHTML = (str) =>
    str ? str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";

  // Replace URLs with anchor tags displaying "Source"
  let replaced = text.replace(/https?:\/\/[^\s"]+/g, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">Source</a>`;
  });

  // Escape remaining text and preserve line breaks
  replaced = replaced
    .split(/(<a .*?<\/a>)/g)
    .map((part) =>
      part.startsWith("<a ") ? part : escapeHTML(part).replace(/\n/g, "<br>")
    )
    .join("");

  return replaced;
}


const GraphRenderer = React.memo(function GraphRenderer({ graph }) {
  return (
    <div className="w-full min-w-md ">
      {graph.type === "line" && <LineChart data={graph} />}
      {graph.type === "heatmap" && <HeatMapChart data={graph} />}
      {graph.type === "histogram" && <HistogramChart data={graph} />}
    </div>
  );
});

const ChatMessages = React.memo(function ChatMessages({
  messages,
  handleFeedbackClick,
}) {
  return (
    <>
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`w-full flex mb-8 ${
            msg.from === "user" ? "justify-end" : "justify-start"
          } animate-in slide-in-from-bottom-2 duration-300`}
        >
          {msg.from === "bot" && (
            <div className="flex flex-col items-center mr-3 gap-1">
              <Image
                src="/images/Aivee_1.png"
                alt="Aivee"
                className="rounded-full shadow-md border-2 border-white"
                width={36}
                height={36}
              />
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter">Aivee</span>
            </div>
          )}
          <div className="flex flex-col gap-1 max-w-[80%] sm:max-w-[70%]">
            <div
              className={`px-5 py-3.5 text-[14px] leading-relaxed shadow-sm transition-all ${
                msg.from === "user"
                  ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-none shadow-blue-100"
                  : "bg-white text-slate-700 rounded-2xl rounded-tl-none border border-slate-100 shadow-slate-100/50"
              }`}
            >
              {msg.isLoading ? (
                <div className="py-1">
                  <LoadingThreeDotsJumping />
                </div>
              ) : (
                <>
                  {/* Main message text */}
                  <div
                    className="[&>a]:text-blue-600 [&>a]:underline [&>a]:font-semibold [&>a]:hover:text-blue-800"
                    dangerouslySetInnerHTML={{
                      __html: linkifyIfNeeded(msg?.text),
                    }}
                  />

                  {/* Prompt Response (if exists) */}
                  {msg.promptResponse && (
                    <div
                      className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[13px] text-slate-600 leading-relaxed italic"
                      dangerouslySetInnerHTML={{
                        __html: linkifyIfNeeded(msg.promptResponse),
                      }}
                    />
                  )}

                  {/* Graph rendering */}
                  {msg.from === "bot" && msg.graphs?.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 w-full mt-5">
                      {msg.graphs.map((graph, index) => (
                        <div
                          id={`graph-${i}-${index}`}
                          key={`graph-${i}-${index}`}
                          className="bg-white rounded-xl border border-slate-100 p-2 shadow-sm overflow-hidden"
                        >
                          <GraphRenderer graph={graph} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Feedback buttons */}
            {msg.from === "bot" && !msg.feedbackGiven && (
              <div className="flex items-center gap-4 mt-2 ml-1 opacity-60 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleFeedbackClick("like", i)}
                  className="p-1 px-2 hover:bg-green-50 rounded-lg group transition-all"
                  title="Helpful"
                >
                  <HandThumbUpIcon className="w-4 h-4 text-slate-400 group-hover:text-green-500 transition-colors" />
                </button>
                <button
                  onClick={() => handleFeedbackClick("dislike", i)}
                  className="p-1 px-2 hover:bg-red-50 rounded-lg group transition-all"
                  title="Not helpful"
                >
                  <HandThumbDownIcon className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
});

export default ChatMessages;

// import React from "react";
// import Image from "next/image";
// import LoadingThreeDotsJumping from "@/components/Common/LoadingThreeDotsJumping/LoadingThreeDotsJumping";
// import LineChart from "@/components/Common/Graphs/LineChart/LineChart";
// import HeatMapChart from "@/components/Common/Graphs/HeatMapChart/HeatMapChart";
// import HistogramChart from "@/components/Common/Graphs/HistogramChart/HistogramChart ";
// import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

// const GraphRenderer = React.memo(function GraphRenderer({ graph }) {
//   return (
//     <div className="w-full min-w-md p-3 rounded-lg border border-[#00ffcc] shadow-md bg-gray-800">
//       {graph.type === "line" && <LineChart data={graph} />}
//       {graph.type === "heatmap" && <HeatMapChart data={graph} />}
//       {graph.type === "histogram" && <HistogramChart data={graph} />}
//     </div>
//   );
// });

// const ChatMessages = React.memo(function ChatMessages({ messages, handleFeedbackClick }) {
//   return (
//     <>
//       {messages.map((msg, i) => (
//         <div
//           key={i}
//           className={`w-full flex mb-10 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
//         >
//           {msg.from === "bot" && (
//             <Image
//               src="/images/Aivee_1.png"
//               alt="Aivee"
//               className="rounded-full mr-2 self-start"
//               width={32}
//               height={32}
//             />
//           )}
//           <div className="flex-col">
//             <div
//               className={`px-5 py-3 text-sm whitespace-pre-wrap rounded-2xl shadow-md ${msg.from === "user"
//                 ? "bg-cyan-600 text-gray-300 rounded-tr-none"
//                 : "bg-slate-700 text-gray-300 rounded-tl-none"
//                 }`}
//               style={{
//                 maxWidth: "60vw",
//                 alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
//               }}
//             >
//               {msg.isLoading ? (
//                 <LoadingThreeDotsJumping />
//               ) : (
//                 <>
//                   <div className="[&>a]:text-cyan-400 [&>a]:underline [&>a]:hover:text-cyan-300" dangerouslySetInnerHTML={{ __html: msg?.text }} />

//                   {(console.log("Message Text:", msg?.graphs))}
//                   {msg.from === "bot" && msg.graphs?.length > 0 && (
//                     <div className="grid grid-cols-1 gap-4 w-full">
//                       {msg.graphs.map((graph, index) => (
//                         <div
//                           id={`graph-${i}-${index}`}
//                           key={`graph-${i}-${index}`}
//                           className="bg-gray-800 p-2 rounded-lg"
//                         >
//                           <GraphRenderer graph={graph} />
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                 </>
//               )}
//             </div>

//             {msg.from === "bot" && !msg.feedbackGiven && (
//               <div className="flex gap-3 mt-1 ml-5">
//                 <button
//                   onClick={() => handleFeedbackClick("like", i)}
//                   title="Like"
//                   className="hover:scale-110 transition"
//                 >
//                   <HandThumbUpIcon className="w-5 h-5 text-green-400 hover:text-green-500" />
//                 </button>
//                 <button
//                   onClick={() => handleFeedbackClick("dislike", i)}
//                   title="Dislike"
//                   className="hover:scale-110 transition"
//                 >
//                   <HandThumbDownIcon className="w-5 h-5 text-red-400 hover:text-red-500" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// });

// export default ChatMessages;

import React from "react";
import Image from "next/image";
import LoadingThreeDotsJumping from "@/components/Common/LoadingThreeDotsJumping/LoadingThreeDotsJumping";
import LineChart from "@/components/Common/Graphs/LineChart/LineChart";
import HeatMapChart from "@/components/Common/Graphs/HeatMapChart/HeatMapChart";
import HistogramChart from "@/components/Common/Graphs/HistogramChart/HistogramChart ";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

function linkifyIfNeeded(text) {
  if (!text) return "";

  // Escape HTML special chars except links
  const escapeHTML = (str) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
          className={`w-full flex mb-10 ${
            msg.from === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.from === "bot" && (
            <Image
              src="/images/Aivee_1.png"
              alt="Aivee"
              className="rounded-full mr-2 self-start"
              width={32}
              height={32}
            />
          )}
          <div className="flex-col">
            <div
              className={`px-5 py-3 text-sm whitespace-pre-wrap rounded-2xl shadow-md ${
                msg.from === "user"
                  ? "bg-cyan-600 text-gray-300 rounded-tr-none"
                  : "bg-slate-800 text-gray-300 rounded-tl-none"
              }`}
              style={{
                maxWidth: "60vw",
                alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.isLoading ? (
                <LoadingThreeDotsJumping />
              ) : (
                <>
                  {/* Main message text */}
                  <div
                    className="[&>a]:text-cyan-400 [&>a]:underline [&>a]:hover:text-cyan-300"
                    dangerouslySetInnerHTML={{
                      __html: linkifyIfNeeded(msg?.text),
                    }}
                  />

                  {/* Prompt Response (if exists) */}
                  {msg.promptResponse && (
                    <div
                      className="mt-3 text-sm text-gray-400 [&>a]:text-cyan-400 [&>a]:underline [&>a]:hover:text-cyan-300"
                      dangerouslySetInnerHTML={{
                        __html: linkifyIfNeeded(msg.promptResponse),
                      }}
                    />
                  )}

                  {/* Graph rendering */}
                  {msg.from === "bot" && msg.graphs?.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 w-full mt-3">
                      {msg.graphs.map((graph, index) => (
                        <div
                          id={`graph-${i}-${index}`}
                          key={`graph-${i}-${index}`}
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
              <div className="flex gap-3 mt-1 ml-5">
                <button
                  onClick={() => handleFeedbackClick("like", i)}
                  title="Like"
                  className="hover:scale-110 transition"
                >
                  <HandThumbUpIcon className="w-5 h-5 text-green-400 hover:text-green-500" />
                </button>
                <button
                  onClick={() => handleFeedbackClick("dislike", i)}
                  title="Dislike"
                  className="hover:scale-110 transition"
                >
                  <HandThumbDownIcon className="w-5 h-5 text-red-400 hover:text-red-500" />
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

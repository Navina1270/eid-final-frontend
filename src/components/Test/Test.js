// "use client";
// import { useEffect, useRef, useState } from "react";
// import { Transformer } from "markmap-lib";
// import { Markmap } from "markmap-view";
// import LineChart from "../Common/Graphs/LineChart/LineChart";
// import { motion, AnimatePresence } from "framer-motion";

// import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
// import { usePathname, useRouter } from "next/navigation";

// import {
//   HomeIcon,
//   ClipboardDocumentListIcon,
//   BellIcon,
//   WrenchScrewdriverIcon,
//   ShareIcon
// } from "@heroicons/react/24/outline";

// import { Toaster } from "sonner";
// import ChatbotPopup from "@/components/DomainWise/Chatbot/ChatbotPopup";
// import Header from "../OpsEdge/Common/Header/Header";
// import Footer from "../OpsEdge/Common/Footer/Footer";
// import ModalComponent from "../Common/ModalComponent/ModalComponent";

// const Test = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [loading, setLoading] = useState(false);
//   const [chatbotOpen, setChatbotOpen] = useState(false);

//   const navItems = [
//     {
//       label: "Home",
//       icon: <HomeIcon className="w-5 h-5" />,
//       paths: [
//         "/opsedge/home",
//         "/opsedge/insight",
//         "/opsedge/view_rca",
//         "/opsedge/view_notification",
//         "/opsedge/view_workorder",
//       ],
//     },
//     {
//       label: "RCA",
//       icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
//       paths: ["/opsedge/rca", "/domainwise/create_project"],
//     },
//     {
//       label: "Notifications",
//       icon: <BellIcon className="w-5 h-5" />,
//       paths: ["/opsedge/notification"],
//     },
//     {
//       label: "Work Order",
//       icon: <WrenchScrewdriverIcon className="w-5 h-5" />,
//       paths: ["/opsedge/workorder"],
//     },
//     {
//       label: "Causal AI",
//       icon: <ShareIcon className="w-5 h-5" />,
//       paths: ["/opsedge/causal"],
//     },
//   ];

//   useEffect(() => {
//     setLoading(false);
//   }, [pathname]);

//   return (
//     <div className="min-h-screen bg-slate-900 flex flex-col">
//       <Header />
//       {loading && (
//         <RippleLoader />
//       )}
//       <div className="flex pt-16 ">
//         <aside className="w-64 bg-slate-800 border-r border-slate-700 shadow-lg p-6 flex flex-col gap-6 fixed top-16 bottom-0 left-0">
//           <nav className="flex flex-col space-y-4 text-lg text-slate-400">
//             {navItems.map(({ label, icon, paths }) => {
//               const isActive = paths.includes(pathname);
//               return (
//                 <a
//                   key={label}
//                   onClick={() => {
//                     setLoading(true);
//                     router.push(paths[0]);
//                   }}
//                   className={`cursor-pointer flex items-center gap-3 transition-colors ${isActive
//                     ? "text-[#00ffcc] font-semibold"
//                     : "hover:text-[#00ffcc] hover:scale-101"
//                     }`}
//                 >
//                   {icon}
//                   {label}
//                 </a>
//               );
//             })}
//           </nav>
//         </aside>
//         <Toaster position="top-center" richColors />
//         <main className="ml-64 flex-1 p-4 mb-5"><MarkmapWithPlot /></main>

//         <div className="p-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-lime-400 w-[65px] h-[65px] fixed bottom-6 right-6 z-40 mb-4 animate-breathe hover:scale-110 transition-transform duration-300 ">
//           <button
//             onClick={() => setChatbotOpen((prev) => !prev)}
//             className="w-full h-full cursor-pointer bg-slate-900 rounded-full text-white flex items-center justify-center"
//           >
//             <img src="/images/thinking.gif" alt="Logo" className="h-15" />
//           </button>
//         </div>
//         {/* <DraggableChatbotButton onClick={() => setChatbotOpen((prev) => !prev)} /> */}

//         <style jsx>{`
//           @keyframes breathe {
//             0%,
//             100% {
//               transform: scale(1);
//               opacity: 0.85;
//             }
//             50% {
//               transform: scale(1.1);
//               opacity: 1;
//             }
//           }
//           // .animate-breathe {
//           //   animation: breathe 2.5s ease-in-out infinite;
//           // }
//         `}</style>
//         <Footer />
//       </div>
//       <ChatbotPopup open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
//     </div>
//   );
// };

// export default Test;

// import dynamic from 'next/dynamic';
// import { getPlotForRCA } from "@/services/dashboardServices";
// const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

// const LineChartPlotly = ({ data, onClickZoom = true, onRangeChange }) => {
//   const [open, setOpen] = useState(false);
//   const plotRef = useRef(null);

//   const colors = [
//     "#06b6d4", "#3b82f6", "#facc15", "#f87171", "#34d399", "#fbbf24",
//     "#a78bfa", "#10b981", "#f97316", "#e879f9", "#60a5fa", "#14b8a6",
//     "#f59e0b", "#0ea5e9", "#f43f5e", "#84cc16", "#22c55e", "#ef4444",
//     "#c084fc", "#f472b6", "#2dd4bf", "#fb923c", "#93c5fd", "#fcd34d"
//   ];

//   const allTraces = [];

//   data.datasets.forEach((ds, idx) => {
//     const groupName = `${ds.label}-${idx}`;

//     allTraces.push({
//       x: data.labels,
//       y: ds.data.map(v => (isNaN(v) ? null : v)),
//       name: ds.label,
//       type: "scatter",
//       mode: "lines",
//       line: { color: colors[idx % colors.length], width: 2 },
//       legendgroup: groupName
//     });

//     if (ds.minThreshold !== undefined) {
//       allTraces.push({
//         x: data.labels,
//         y: data.labels.map(() => ds.minThreshold),
//         type: "scatter",
//         mode: "lines",
//         line: { color: colors[idx % colors.length], width: 1.5, dash: "dash" },
//         legendgroup: groupName,
//         showlegend: false
//       });
//     }

//     if (ds.maxThreshold !== undefined) {
//       allTraces.push({
//         x: data.labels,
//         y: data.labels.map(() => ds.maxThreshold),
//         type: "scatter",
//         mode: "lines",
//         line: { color: colors[idx % colors.length], width: 1.5, dash: "dash" },
//         legendgroup: groupName,
//         showlegend: false
//       });
//     }

//     if (ds.scatter) {
//       allTraces.push({
//         x: ds.scatter.labels,
//         y: ds.scatter.data,
//         name: ds.scatter.legend || "",
//         mode: "markers",
//         marker: { color: "red", size: 6 },
//         type: "scatter",
//         showlegend: true
//       });
//     }
//   });

//   if (data.anomalyHighlight?.ranges?.length) {
//     const anomalyHighlightGroup = 'anomaly highlight';

//     const allValues = data.datasets.flatMap(ds => {
//       const values = ds.data.filter(v => v !== null && !isNaN(v));
//       if (ds.minThreshold !== undefined) values.push(ds.minThreshold);
//       if (ds.maxThreshold !== undefined) values.push(ds.maxThreshold);
//       return values;

//     });
//     const yMin = Math.min(...allValues);
//     const yMax = Math.max(...allValues);

//     data.anomalyHighlight.ranges.forEach((range, idx) => {
//       allTraces.push({
//         x: [range[0], range[1], range[1], range[0], range[0]],
//         y: [yMin, yMin, yMax, yMax, yMin],
//         type: 'scatter',
//         mode: 'lines',
//         fill: 'toself',
//         fillcolor: 'rgba(255,0,0,0.4)',
//         line: { width: 0 },
//         name: data.anomalyHighlight.legend,
//         showlegend: idx === 0,
//         legendgroup: anomalyHighlightGroup,

//       });
//     });
//   }

//   if (data.startupHighlight?.ranges?.length) {
//     const startupHighlightGroup = 'startup highlight';

//     const allValues = data.datasets.flatMap(ds => {
//       const values = ds.data.filter(v => v !== null && !isNaN(v));
//       if (ds.minThreshold !== undefined) values.push(ds.minThreshold);
//       if (ds.maxThreshold !== undefined) values.push(ds.maxThreshold);
//       return values;

//     });
//     const yMin = Math.min(...allValues);
//     const yMax = Math.max(...allValues);

//     data.startupHighlight.ranges.forEach((range, idx) => {
//       allTraces.push({
//         x: [range[0], range[1], range[1], range[0], range[0]],
//         y: [yMin, yMin, yMax, yMax, yMin],
//         type: 'scatter',
//         mode: 'lines',
//         fill: 'toself',
//         fillcolor: 'rgba(255,165,0,0.3)',
//         line: { width: 0 },
//         name: idx === 0 ? data.startupHighlight.legend : undefined,
//         showlegend: idx === 0,
//         legendgroup: startupHighlightGroup,

//       });
//     });
//   }

//   if (data.shutdownHighlight?.ranges?.length) {
//     const shutdownHighlightGroup = 'shutdown highlight';

//     const allValues = data.datasets.flatMap(ds => {
//       const values = ds.data.filter(v => v !== null && !isNaN(v));
//       if (ds.minThreshold !== undefined) values.push(ds.minThreshold);
//       if (ds.maxThreshold !== undefined) values.push(ds.maxThreshold);
//       return values;

//     });
//     const yMin = Math.min(...allValues);
//     const yMax = Math.max(...allValues);

//     data.shutdownHighlight.ranges.forEach((range, idx) => {
//       allTraces.push({
//         x: [range[0], range[1], range[1], range[0], range[0]],
//         y: [yMin, yMin, yMax, yMax, yMin],
//         type: 'scatter',
//         mode: 'lines',
//         fill: 'toself',
//         fillcolor: 'rgba(255,165,0,0.3)',
//         line: { width: 0 },
//         name: idx === 0 ? data.shutdownHighlight.legend : undefined,
//         showlegend: idx === 0,
//         legendgroup: shutdownHighlightGroup,

//       });
//     });
//   }

//   if (data.downtimeHighlight?.ranges?.length) {
//     const downtimeHighlightGroup = 'downtime highlight';

//     const allValues = data.datasets.flatMap(ds => {
//       const values = ds.data.filter(v => v !== null && !isNaN(v));
//       if (ds.minThreshold !== undefined) values.push(ds.minThreshold);
//       if (ds.maxThreshold !== undefined) values.push(ds.maxThreshold);
//       return values;

//     });
//     const yMin = Math.min(...allValues);
//     const yMax = Math.max(...allValues);

//     data.downtimeHighlight.ranges.forEach((range, idx) => {
//       allTraces.push({
//         x: [range[0], range[1], range[1], range[0], range[0]],
//         y: [yMin, yMin, yMax, yMax, yMin],
//         type: 'scatter',
//         mode: 'lines',
//         fill: 'toself',
//         fillcolor: 'rgba(128,128,128,0.3)',
//         line: { width: 0 },
//         name: idx === 0 ? data.downtimeHighlight.legend : undefined,
//         showlegend: idx === 0,
//         legendgroup: downtimeHighlightGroup,

//       });
//     });
//   }

//   const layout = {
//     title: { text: data.title, font: { size: 14, color: '#cbd5e1' } },
//     paper_bgcolor: '#334155',
//     plot_bgcolor: '#334155',
//     font: { color: '#cbd5e1' },
//     legend: {
//       orientation: 'h',
//       x: 0.5,
//       xanchor: 'center',
//       y: -0.2,
//       yanchor: 'top',
//     },
//     margin: { t: 25, b: 10, l: 25, r: 25 },
//     dragmode: 'zoom',
//     xaxis: {
//       showgrid: true, gridcolor: '#334155',
//       zeroline: false, tickfont: { color: '#cbd5e1' }
//     },
//     yaxis: {
//       showgrid: true, gridcolor: '#334155',
//       zeroline: false, tickfont: { color: '#cbd5e1' }
//     }
//   };

//   const config = {
//     responsive: true,
//     displaylogo: false,
//     modeBarButtonsToRemove: [
//       'zoom',
//       'pan2d',
//       'select2d',
//       'lasso2d',
//       'resetScale2d',
//       'hoverClosestCartesian',
//       'hoverCompareCartesian',
//       'toggleSpikelines',
//       'toImage'
//     ],
//     modeBarButtonsToAdd: ['zoomIn2d', 'zoomOut2d', 'autoScale2d'],
//   };

//   const handleRelayout = (eventData) => {
//     if (eventData['xaxis.range[0]'] && eventData['xaxis.range[1]']) {
//       const startTime = eventData['xaxis.range[0]'];
//       const endTime = eventData['xaxis.range[1]'];
//       if (onRangeChange) onRangeChange(startTime, endTime);
//     }
//   };

//   const chart = (
//     <Plot
//       ref={plotRef}
//       data={allTraces}
//       layout={layout}
//       config={config}
//       useResizeHandler
//       style={{ width: '100%', height: '100%' }}
//       onInitialized={(figure, graphDiv) => {
//         graphDiv.on('plotly_relayout', handleRelayout);
//       }}
//     />
//   );

//   return (
//     <>
//       <div
//         onClick={onClickZoom ? () => setOpen(true) : null}
//         className={`bg-slate-700 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-shadow ${onClickZoom ? "cursor-pointer" : "cursor-default"}`}
//       >
//         <div className="h-60 relative">
//           {chart}
//         </div>
//       </div>

//       {open && (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 flex items-center justify-center">
//           <div className="bg-slate-700 p-6 rounded-xl w-full max-w-5xl relative">
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-3 right-3 text-slate-400 hover:text-slate-100 transition"
//             >
//               ✕
//             </button>
//             <h2 className="text-xl font-semibold text-slate-100 mb-4">{data.label}</h2>
//             <div className="h-96 w-full relative">
//               {chart}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const MarkmapWithPlot = () => {

//   const data = [
//     {
//       x: [
//         "2024-06-01 00:00",
//         "2024-06-01 00:02",
//         "2024-06-01 00:04",
//         "2024-06-01 00:06",
//         "2024-06-01 00:08",
//         "2024-06-01 00:10",
//         "2024-06-01 00:12",
//         "2024-06-01 00:14",
//         "2024-06-01 00:16",
//         "2024-06-01 00:18"
//       ],
//       y: [50000, null, 350000, 420000, 380000, 400000, null, 410000, 430000, 440000],
//       mode: "lines",
//       name: "Pressure",
//       yaxis: "y",
//       line: { color: "teal" },
//       xLabel: "Time",
//       yLabel: "Pressure (Pa)"
//     },
//     {
//       x: [
//         "2024-06-01 00:00",
//         "2024-06-01 00:02",
//         "2024-06-01 00:04",
//         "2024-06-01 00:06",
//         "2024-06-01 00:08",
//         "2024-06-01 00:10",
//         "2024-06-01 00:12",
//         "2024-06-01 00:14",
//         "2024-06-01 00:16",
//         "2024-06-01 00:18"
//       ],
//       y: [0.5, 1.5, 2.5, 3.8, 3.2, null, 2.8, 3.0, 3.5, 3.7],
//       mode: "lines",
//       name: "Flow",
//       yaxis: "y2",
//       line: { color: "dodgerblue" },
//       yLabel: "Flow (m³/s)"
//     },
//     {
//       x: [
//         "2024-06-01 00:00",
//         "2024-06-01 00:02",
//         "2024-06-01 00:04",
//         "2024-06-01 00:06",
//         "2024-06-01 00:08",
//         "2024-06-01 00:10",
//         "2024-06-01 00:12",
//         "2024-06-01 00:14",
//         "2024-06-01 00:16",
//         "2024-06-01 00:18"
//       ],
//       y: [200, 400, 800, 1000, 950, 900, 850, 800, 750, 700],
//       mode: "lines",
//       name: "Volume",
//       yaxis: "y3",
//       line: { color: "purple" },
//       yLabel: "Volume (L)"
//     },
//     {
//       x: [
//         "2024-06-01 00:00",
//         "2024-06-01 00:02",
//         "2024-06-01 00:04",
//         "2024-06-01 00:06",
//         "2024-06-01 00:08",
//         "2024-06-01 00:10",
//         "2024-06-01 00:12",
//         "2024-06-01 00:14",
//         "2024-06-01 00:16",
//         "2024-06-01 00:18"
//       ],
//       y: [10, 12, 15, 13, 14, null, 16, 18, 17, 19],
//       mode: "lines",
//       name: "Temperature",
//       yaxis: "y4",
//       line: { color: "orange" },
//       yLabel: "Temperature (°C)"
//     }
//   ];

//   const axisSpacing = 0.035;
//   const totalSpace = axisSpacing * (data.length - 0.75);

//   const layout = {
//     paper_bgcolor: "#334155",
//     plot_bgcolor: "#334155",
//     font: { color: "#cbd5e1" },
//     xaxis: {
//       title: "Time",
//       automargin: true,
//       domain: [totalSpace, 1],
//     },
//     legend: {
//       orientation: "h",
//       x: 0.5,
//       xanchor: "center",
//       y: -0.05,
//       yanchor: "top",
//     },
//     margin: { t: 25, b: 40, l: 40, r: 25 },
//     dragmode: "zoom",
//   };

//   data.forEach((signal, index) => {
//     const axisName = index === 0 ? "yaxis" : `yaxis${index + 1}`;
//     layout[axisName] = {
//       title: signal.name,
//       side: "left",
//       overlaying: index === 0 ? undefined : "y",
//       position: index * axisSpacing,
//       automargin: true,
//     };
//   });

//   const config = {
//     responsive: true,
//     displaylogo: false,
//     modeBarButtonsToRemove: [
//       "zoom",
//       "pan2d",
//       "select2d",
//       "lasso2d",
//       "resetScale2d",
//       "hoverClosestCartesian",
//       "hoverCompareCartesian",
//       "toggleSpikelines",
//       "toImage",
//     ],
//     modeBarButtonsToAdd: ["zoomIn2d", "zoomOut2d", "autoScale2d"],
//   };

//   return (
//      <div className={`bg-slate-700 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-shadow`}>
//       <Plot
//         data={data}
//         layout={layout}
//         config={config}
//         useResizeHandler
//         style={{ width: "100%", height: "100%" }}

//       />
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import dynamic from "next/dynamic";
// import neo4j from "neo4j-driver";

// // Dynamically import NVL wrapper to avoid SSR issues
// const InteractiveNvlWrapper = dynamic(
//   () => import("@neo4j-nvl/react").then((mod) => mod.InteractiveNvlWrapper),
//   { ssr: false }
// );

// const Neo4jGraph = () => {
//   const [nodes, setNodes] = useState([]);
//   const [rels, setRels] = useState([]);
//   const [selectedNode, setSelectedNode] = useState(null);

//   const nvlRef = useRef();

//   useEffect(() => {
//     const driver = neo4j.driver(
//       "neo4j://3.7.40.189:7687",
//       neo4j.auth.basic("neo4j", "neo4j123")
//     );

//     const session = driver.session();

//     session
//       .run("MATCH (n:Equipment)-[r]->(m) RETURN n, r, m LIMIT 50")
//       .then((result) => {
//         const newNodes = [];
//         const newRels = [];

//         result.records.forEach((record) => {
//           const n = record.get("n");
//           const m = record.get("m");
//           const r = record.get("r");

//           if (!newNodes.find((x) => x.id === n.identity.low)) {
//             newNodes.push({
//               id: n.identity.low.toString(),
//               labels: n.labels,
//               properties: n.properties,
//             });
//           }

//           if (!newNodes.find((x) => x.id === m.identity.low)) {
//             newNodes.push({
//               id: m.identity.low.toString(),
//               labels: m.labels,
//               properties: m.properties,
//             });
//           }

//           newRels.push({
//             id: r.identity.low.toString(),
//             from: n.identity.low.toString(),
//             to: m.identity.low.toString(),
//             type: r.type,
//             properties: r.properties,
//           });
//         });

//         setNodes(newNodes);
//         setRels(newRels);
//       })
//       .finally(() => session.close());
//   }, []);

//   // Mouse event callbacks
//   const mouseEventCallbacks = {
//     onNodeClick: (node) => setSelectedNode(node),
//     onCanvasClick: () => setSelectedNode(null),
//   };

//   return (
//     <div style={{ display: "flex", height: "90vh", backgroundColor: "#0f172a" }}>
//       <div style={{ flex: 1 }}>
//         {nodes.length > 0 && (
//           <InteractiveNvlWrapper
//             nodes={nodes}
//             rels={rels}
//             ref={nvlRef}
//             mouseEventCallbacks={mouseEventCallbacks}
//             settings={{ layout: "force", backgroundColor: "#0f172a" }}
//             style={{ width: "100%", height: "100%" }}
//           />
//         )}
//       </div>

//       {/* Sidebar */}
//       <div
//         style={{
//           width: "300px",
//           padding: "10px",
//           borderLeft: "1px solid #1e293b",
//           backgroundColor: "#0f172a",
//           color: "#ffffff",
//         }}
//       >
//         <h3 style={{ margin: 0, fontSize: "16px", color: "#38bdf8" }}>
//           Node Properties
//         </h3>
//         <div style={{ marginTop: "10px", overflowY: "auto", maxHeight: "80vh" }}>
//           {selectedNode ? (
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 fontSize: "13px",
//               }}
//             >
//               <tbody>
//                 {Object.entries(selectedNode.properties || {}).map(([key, value]) => (
//                   <tr key={key}>
//                     <td
//                       style={{
//                         border: "1px solid #1e293b",
//                         padding: "5px",
//                         fontWeight: "bold",
//                         backgroundColor: "#1e293b",
//                         color: "#ffffff",
//                         width: "40%",
//                         wordBreak: "break-word",
//                       }}
//                     >
//                       {key}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #1e293b",
//                         padding: "5px",
//                         backgroundColor: "#334155",
//                         color: "#f8fafc",
//                         wordBreak: "break-word",
//                       }}
//                     >
//                       {String(value)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p style={{ color: "#94a3b8" }}>Click on a node to view its properties.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Neo4jGraph;

// "use client";
// import React, { useEffect, useState } from "react";

// const Loader = ({ text = "Loading your awesome content..." }) => {
//   const [displayedText, setDisplayedText] = useState("");

//   useEffect(() => {
//     let i = 0;
//     const interval = setInterval(() => {
//       setDisplayedText(text.slice(0, i + 1));
//       i++;
//       if (i === text.length) clearInterval(interval);
//     }, 50);
//     return () => clearInterval(interval);
//   }, [text]);

//   return (
//     <>
//       <style jsx>{`
//         .loader-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 100%;
//         }

//         .loader {
//           --fill-color: #5c3d99;
//           --shine-color: #5c3d9933;
//           transform: scale(0.5);
//           width: 100px;
//           height: auto;
//           position: relative;
//           filter: drop-shadow(0 0 10px var(--shine-color));
//           margin-bottom: 50px;
//         }

//         .loader svg {
//           position: absolute;
//           opacity: 0;
//           transform: scale(0);
//         }

//         .loader #pegtopone {
//           animation: flowe-one 1s linear infinite;
//         }

//         .loader #pegtoptwo {
//           animation: flowe-two 1s linear infinite 0.3s;
//         }

//         .loader #pegtopthree {
//           animation: flowe-three 1s linear infinite 0.6s;
//         }

//         .loader svg g path:first-child {
//           fill: var(--fill-color);
//         }

//         .typing-text {
//           color: white;
//           font-size: 1.2rem;
//           font-family: monospace;
//           min-height: 1.5em; /* prevents layout shift */
//         }

//         @keyframes flowe-one {
//           0% {
//             transform: scale(0) translateY(-200px);
//             opacity: 0;
//           }
//           25% {
//             transform: scale(0.75) translateY(-100px);
//             opacity: 1;
//           }
//           50% {
//             transform: scale(1) translateY(0px);
//             opacity: 1;
//           }
//           75% {
//             transform: scale(0.5) translateY(50px);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(0) translateY(100px);
//             opacity: 0;
//           }
//         }

//         @keyframes flowe-two {
//           0% {
//             transform: scale(0) rotateZ(-10deg) translateY(-200px) translateX(-100px);
//             opacity: 0;
//           }
//           25% {
//             transform: scale(1) rotateZ(-5deg) translateY(-100px) translateX(-50px);
//             opacity: 1;
//           }
//           50% {
//             transform: scale(1) rotateZ(0deg) translateY(0px) translateX(-25px);
//             opacity: 1;
//           }
//           75% {
//             transform: scale(0.5) rotateZ(5deg) translateY(50px) translateX(0px);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(0) rotateZ(10deg) translateY(100px) translateX(25px);
//             opacity: 0;
//           }
//         }

//         @keyframes flowe-three {
//           0% {
//             transform: scale(0) rotateZ(10deg) translateY(-200px) translateX(100px);
//             opacity: 0;
//           }
//           25% {
//             transform: scale(1) rotateZ(5deg) translateY(-100px) translateX(50px);
//             opacity: 1;
//           }
//           50% {
//             transform: scale(1) rotateZ(0deg) translateY(0px) translateX(25px);
//             opacity: 1;
//           }
//           75% {
//             transform: scale(0.5) rotateZ(-5deg) translateY(50px) translateX(0px);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(0) rotateZ(-10deg) translateY(100px) translateX(-25px);
//             opacity: 0;
//           }
//         }
//       `}</style>

//       <div className="loader-container">
//         <div className="loader">
//           <svg id="pegtopone" viewBox="0 0 100 100">
//             {commonDefs()}
//             {commonPaths()}
//           </svg>

//           <svg id="pegtoptwo" viewBox="0 0 100 100">
//             {commonDefs()}
//             {commonPaths()}
//           </svg>

//           <svg id="pegtopthree" viewBox="0 0 100 100">
//             {commonDefs()}
//             {commonPaths()}
//           </svg>
//         </div>

//         <div className="typing-text">{displayedText}</div>
//       </div>
//     </>
//   );
// };

// const commonDefs = () => (
//   <defs>
//     <filter id="shine">
//       <feGaussianBlur stdDeviation="3"></feGaussianBlur>
//     </filter>
//     <mask id="mask">
//       <path
//         d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
//         fill="white"
//       ></path>
//     </mask>
//     <radialGradient
//       id="gradient-1"
//       cx="50"
//       cy="66"
//       fx="50"
//       fy="66"
//       r="30"
//       gradientTransform="translate(0 35) scale(1 0.5)"
//       gradientUnits="userSpaceOnUse"
//     >
//       <stop offset="0%" stopColor="black" stopOpacity="0.3"></stop>
//       <stop offset="50%" stopColor="black" stopOpacity="0.1"></stop>
//       <stop offset="100%" stopColor="black" stopOpacity="0"></stop>
//     </radialGradient>
//     <radialGradient
//       id="gradient-2"
//       cx="55"
//       cy="20"
//       fx="55"
//       fy="20"
//       r="30"
//       gradientUnits="userSpaceOnUse"
//     >
//       <stop offset="0%" stopColor="white" stopOpacity="0.3"></stop>
//       <stop offset="50%" stopColor="white" stopOpacity="0.1"></stop>
//       <stop offset="100%" stopColor="white" stopOpacity="0"></stop>
//     </radialGradient>
//     <radialGradient id="gradient-3" cx="85" cy="50" fx="85" fy="50" xlinkHref="#gradient-2" />
//     <radialGradient
//       id="gradient-4"
//       cx="50"
//       cy="58"
//       fx="50"
//       fy="58"
//       r="60"
//       gradientTransform="translate(0 47) scale(1 0.2)"
//       xlinkHref="#gradient-3"
//     />
//     <linearGradient id="gradient-5" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse">
//       <stop offset="0%" stopColor="black" stopOpacity="0.2" />
//       <stop offset="40%" stopColor="black" stopOpacity="0" />
//     </linearGradient>
//   </defs>
// );

// const commonPaths = () => (
//   <g>
//     <path
//       d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
//       fill="currentColor"
//     />
//     <path
//       d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
//       fill="url(#gradient-1)"
//     />
//     <path
//       d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
//       fill="none"
//       stroke="white"
//       opacity="0.3"
//       strokeWidth="3"
//       filter="url(#shine)"
//       mask="url(#mask)"
//     />
//     <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2)" />
//     <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3)" />
//     <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-4)" />
//     <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-5)" />
//   </g>
// );

// export default Loader;

// "use client";
// import { Transformer } from "markmap-lib";
// import { Markmap } from "markmap-view";
// import { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import {
//   MagnifyingGlassPlusIcon,
//   MagnifyingGlassMinusIcon,
//   ArrowsPointingInIcon,
//   PlusIcon,
//   PencilIcon,
// } from "@heroicons/react/24/solid";
// import {
//   addQuerySymbolic,
//   addRuleSymbolic,
//   getCausal,
//   getPlotForRCA,
// } from "@/services/dashboardServices";
// import { showError, showSuccess } from "@/utils/toastUtils";
// import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
// import { motion, AnimatePresence } from "framer-motion";
// import TextInput from "@/components/Common/Form/TextInput";
// import LineChart from "@/components/Common/Graphs/LineChart/LineChart";
// import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
// import { clearAuthStorage } from "@/utils/authUtils";
// import { useRouter } from "next/navigation";
// import NextButton from "@/components/Common/Form/NextButton";

// export default function MarkmapComponent() {
//   const refSvg = useRef(null);
//   const markmapInstance = useRef(null);
//   const markmapRoot = useRef(null);

//   const zoomBehavior = useRef(null);
//   const [causalError, setCausalError] = useState("");
//   const [causal, setCausal] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showQueryModal, setShowQueryModal] = useState(false);
//   const [ruleInput, setRuleInput] = useState("");
//   const [queryInput, setQueryInput] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [chartData, setChartData] = useState(null);
//   const [chartDataError, setChartDataError] = useState(null);
//   const router = useRouter();
//   const plotDataMap = useRef({});
//   const [fileData, setFileData] = useState(null);
//   const [contextMenu, setContextMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     fullPathText: [],
//   });
//   const [highlightedNodePath, setHighlightedNodePath] = useState(null);

//   const handleNodeDelete = async (e) => {
//     e.preventDefault();

//     let node = e.target;
//     while (node && !node.classList?.contains("markmap-node")) {
//       node = node.parentElement;
//     }

//     if (!node) return;

//     const nodePath = node.getAttribute("data-path");
//     const fullPathText = getNodePathText(markmapRoot.current, nodePath);
//     const subtreeText = getSubtreeText(markmapRoot.current, nodePath);
//     d3.selectAll(".markmap-node").classed("highlighted", false);
//     d3.select(node).classed("highlighted", true);
//     setHighlightedNodePath(nodePath);
//     setContextMenu({
//       visible: true,
//       x: e.pageX,
//       y: e.pageY,
//       fullPathText,
//       subtreeText
//     });
//   };

//   const hideContextMenu = () => {
//     setContextMenu((prev) => ({ ...prev, visible: false }));
//     d3.selectAll(".markmap-node").classed("highlighted", false);
//     setHighlightedNodePath(null);
//   };

//   useEffect(() => {
//     console.log("Setting up context menu listener for node deletion");
//     document.addEventListener("contextmenu", handleNodeDelete);
//     return () => document.removeEventListener("contextmenu", handleNodeDelete);
//   }, [causal]);

//   useEffect(() => {
//     const handleClickOutside = () => hideContextMenu();
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (!zoomBehavior.current || !refSvg.current) return;
//     const svg = d3.select(refSvg.current);
//     svg.call(zoomBehavior.current);
//     const handleZoomOrScroll = () => {
//       hideContextMenu();
//     };
//     zoomBehavior.current.on("zoom.contextMenuHide", handleZoomOrScroll);
//     return () => {
//       zoomBehavior.current.on("zoom.contextMenuHide", null);
//     };
//   }, [zoomBehavior.current]);

//   const fetchData = async () => {
//     setCausal(` ---\ntitle: Khurais\nmarkmap:\ninitialExpandLevel: 1\n---\n# Equipment: B32K0001 <!-- markmap: foldAll -->\n\n# Equipment: B32K0002 <!-- markmap: foldAll -->\n## Issue: High Discharge Pressure\n### Rule: %[tagId:[B32PI0023 ],equipmentId:B32K0002,startTime:2024-10-09 14:53:25,endTime:2025-10-09 14:53:25]% > 55 [psig]\n#### Cause: PCV0028 opening less than 20%\n##### Check: Check PCV0028 opening percentage and verify against DCS (B32VPCV0028.PV < 20 %)\n###### Action: Open PCV0028 up to 30% to reduce anti-surge valve opening and discharge pressure\n## Issue: High Vibration\n### Rule: %[tagId:[B32VXI0305.PV, B32VYI0305.PV ],equipmentId:B32K0002,startTime:2024-10-09 14:53:25,endTime:2025-10-09 14:53:25]% > 2 [mils]\n#### Cause: Rotor Unbalance\n##### Check: Perform dynamic balancing of the motor rotor and coupling (B32VXI0305.PV, B32VYI0305.PV > 2 mils)\n###### Action: Perform dynamic balancing of the motor rotor and coupling\n##### Check: Perform dynamic balancing of the motor rotor and coupling (B32VXI0314.PV, B32VYI0314.PV > 2 mils)\n###### Action: Perform dynamic balancing of the motor rotor and coupling\n### Rule: %[tagId:[B32VXI0314.PV, B32VYI0314.PV ],equipmentId:B32K0002,startTime:2024-10-09 14:53:25,endTime:2025-10-09 14:53:25]% > 2 [mils]\n#### Cause: Rotor Unbalance\n##### Check: Perform dynamic balancing of the motor rotor and coupling (B32VXI0305.PV, B32VYI0305.PV > 2 mils)\n###### Action: Perform dynamic balancing of the motor rotor and coupling\n##### Check: Perform dynamic balancing of the motor rotor and coupling (B32VXI0314.PV, B32VYI0314.PV > 2 mils)\n###### Action: Perform dynamic balancing of the motor rotor and coupling\n\n# Equipment: B32KM0001 <!-- markmap: foldAll -->\n## Issue: High Vibration\n### Rule: %[tagId:[['B32VXI0401.PV', 'B32VYI0401.PV'] ],equipmentId:B32KM0001,startTime:2024-10-09 14:53:25,endTime:2025-10-09 14:53:25]% >2 [mm/s]\n#### Cause: Bearing Defect or Degradation (Outboard Side)\n##### Check: Inspect and replace damaged bearing (NA NA NA)\n###### Action: Replace damaged bearings if inspection reveals wear or damage\n\n# Equipment: B32KM0002 <!-- markmap: foldAll -->\n## Issue: High Vibration\n### Rule: %[tagId:[['B32VXI0301.PV', 'B32VYI0301.PV'] ],equipmentId:B32KM0002,startTime:2024-10-09 14:53:25,endTime:2025-10-09 14:53:25]% >3 [mm/s]\n#### Cause: Bearing Defect or Degradation (Outboard Side)\n##### Check: Inspect bearing condition (NA NA NA)\n###### Action: Inspect and replace damaged bearing\n`);
//   };

//   const getNodePathText = (root, dataPath) => {
//     if (!root || !dataPath) return null;

//     const targetId = parseInt(dataPath.split(".").pop(), 10);
//     let foundPath = [];

//     function dfs(node, path = []) {
//       if (!node) return false;

//       const currentId = node?.state?.id;
//       const newPath = [...path, node.content];

//       if (currentId === targetId) {
//         foundPath = newPath;
//         return true;
//       }

//       if (node.children && node.children.length > 0) {
//         for (const child of node.children) {
//           if (dfs(child, newPath)) return true;
//         }
//       }

//       return false;
//     }

//     dfs(root);
//     if (!foundPath.length) console.warn("⚠️ Node not found for id:", targetId);
//     return foundPath;
//   };

//   const getSubtreeText = (root, dataPath) => {
//     if (!root || !dataPath) return null;
//     const targetId = parseInt(dataPath.split(".").pop(), 10);
//     let subtreeContent = [];
//     function dfs(node) {
//       if (!node) return;
//       subtreeContent.push(node.content);
//       if (node.children && node.children.length > 0) {
//         for (const child of node.children) {
//           dfs(child);
//         }
//       }
//     }
//     function findNode(node) {
//       if (!node) return null;
//       if (node.state?.id === targetId) return node;
//       if (node.children && node.children.length > 0) {
//         for (const child of node.children) {
//           const result = findNode(child);
//           if (result) return result;
//         }
//       }
//       return null;
//     }
//     const selectedNode = findNode(root);
//     if (!selectedNode) {
//       console.warn("⚠️ Selected node not found for subtree");
//       return [];
//     }
//     dfs(selectedNode);
//     return subtreeContent;
//   };


//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!causal || !refSvg.current) {
//       console.log("Skipping Markmap creation because:", {
//         hasCausal: !!causal,
//         hasRefSvg: !!refSvg.current,
//       });
//       return;
//     }

//     const regex =
//       /%\[tagId:\[(.*?)\],\s*equipmentId:(.*?),\s*startTime:\s*(.*?),\s*endTime:(.*?)\]%/g;
//     const plotDataMapTemp = {};

//     const markdown = causal.replace(
//       regex,
//       (match, tagIds, equipmentId, startTime, endTime) => {
//         const tagArray = tagIds.split(",").map((t) => t.trim());
//         const linkText = tagArray.join(", ");
//         if (!plotDataMapTemp[linkText]) plotDataMapTemp[linkText] = [];
//         plotDataMapTemp[linkText].push({
//           tagId: tagArray,
//           equipmentId: equipmentId.trim(),
//           startTime: startTime.trim(),
//           endTime: endTime.trim(),
//         });
//         return `[${linkText}](#)`;
//       }
//     );

//     plotDataMap.current = plotDataMapTemp;

//     const transformer = new Transformer();
//     const { root } = transformer.transform(markdown);

//     markmapInstance.current?.destroy?.();

//     markmapInstance.current = Markmap.create(
//       refSvg.current,
//       {
//         maxWidth: 300,
//         spacingVertical: 20,
//       },
//       root
//     );
//     markmapRoot.current = root;
//     zoomBehavior.current = markmapInstance.current.zoom;
//     refSvg.current.style.setProperty("--markmap-text-color", "#D1D5DB");
//   }, [causal]);

//   useEffect(() => {
//     const handleClick = async (e) => {
//       const target = e.target;
//       if (target.tagName === "A") {
//         e.preventDefault();
//         const linkText = target.textContent.trim();
//         const dataForItem = plotDataMap.current[linkText] || [];
//         console.log(`Clicked: ${linkText}`, dataForItem);
//         if (dataForItem.length > 0) {
//           await fetchPlotData(dataForItem);
//         }
//       }
//     };

//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, []);

//   const fetchPlotData = async (dataForItem) => {
//     setLoading(true);
//     const chartData = await getPlotForRCA(
//       dataForItem[0].tagId,
//       dataForItem[0].equipmentId,
//       dataForItem[0].startTime,
//       dataForItem[0].endTime
//     );
//     if (chartData.statusCode == 401 || chartData.statusCode == 403) {
//       setChartDataError("");
//       showError(chartData.message || "Invalid token or access denied");
//       setChartData(null);
//       clearAuthStorage(router);
//     } else if (chartData.statusCode && chartData.statusCode !== 200) {
//       setChartDataError(chartData.message || "Failed to fetch anamoly list");
//       showError(chartData.message || "Failed to fetch anamoly list");
//       setChartData(null);
//     } else {
//       setChartData(chartData.data);
//       setChartDataError("");
//     }
//     console.log("Data", chartData);
//     setLoading(false);
//   };

//   const zoomIn = () =>
//     zoomBehavior.current &&
//     d3
//       .select(refSvg.current)
//       .transition()
//       .call(zoomBehavior.current.scaleBy, 1.2);
//   const zoomOut = () =>
//     zoomBehavior.current &&
//     d3
//       .select(refSvg.current)
//       .transition()
//       .call(zoomBehavior.current.scaleBy, 0.8);
//   const fit = () => markmapInstance.current?.fit();

//   const handleCloseModal = async () => {
//     setChartData(null);
//     await fetchData();
//   };

//   return (
//     <>
//       {loading && <RippleLoader />}
//       {!loading && (
//         <div className="w-full h-[80vh] relative">
//           <>
//             <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 p-1 bg-slate-800 bg-opacity-20 rounded-lg text-slate-400">
//               <button onClick={zoomIn} className="p-2" title="Zoom In">
//                 <MagnifyingGlassPlusIcon className="h-6 w-6 hover:scale-125 transition" />
//               </button>
//               <button onClick={zoomOut} className="p-2" title="Zoom Out">
//                 <MagnifyingGlassMinusIcon className="h-6 w-6 hover:scale-125 transition" />
//               </button>
//               <button onClick={fit} className="p-2" title="Fit">
//                 <ArrowsPointingInIcon className="h-6 w-6 hover:scale-125 transition" />
//               </button>
//               <button
//                 onClick={() => setShowModal((prev) => !prev)}
//                 className="p-2 bg-slate-700 rounded hover:bg-slate-600"
//                 title="Add Rule"
//               >
//                 <PlusIcon className="h-6 w-6 text-white" />
//               </button>
//               <button
//                 onClick={() => setShowQueryModal((prev) => !prev)}
//                 className="p-2 bg-slate-700 rounded hover:bg-slate-600"
//                 title="Add Query"
//               >
//                 <PencilIcon className="h-6 w-6 text-white" />
//               </button>
//             </div>
//             {causalError ? (
//               <div className="text-center p-4">{causalError}</div>
//             ) : (
//               causal && <svg ref={refSvg} className="w-full h-full"></svg>
//             )}
//             <AnimatePresence>
//               {showModal && (
//                 <motion.div
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   className="absolute top-14 right-14 bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-slate-700 w-[50%] z-50 flex flex-col gap-2"
//                 >
//                   <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-2 border-b border-[#00ffcc]/60 pb-1 w-full">
//                     Add New Rule
//                   </h2>

//                   <TextInput
//                     value={ruleInput}
//                     onChange={(e) => {
//                       setRuleInput(e.target.value);
//                       if (fileData) setFileData(null);
//                     }}
//                     placeholder="Enter rule"
//                     rows={3}
//                   />

//                   <div className="text-slate-400 text-center font-medium">
//                     or
//                   </div>

//                   <label className="w-full flex items-center justify-center bg-slate-800 border border-slate-700 rounded-lg py-2 text-sm text-slate-400 cursor-pointer hover:bg-slate-700 transition">
//                     Upload Excel
//                     <input
//                       type="file"
//                       accept=".xlsx,.xls"
//                       onChange={handleFileChange}
//                       className="hidden"
//                       disabled={submitting}
//                     />
//                   </label>
//                   {fileData && (
//                     <div className="text-sm text-slate-400 text-center">
//                       {fileData.name}
//                     </div>
//                   )}

//                   <div className="flex justify-center mt-2">
//                     <NextButton
//                       onClick={handleSubmit}
//                       label={submitting ? "Submitting..." : "Submit"}
//                       disabled={submitting || (!ruleInput && !fileData)}
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <AnimatePresence>
//               {showQueryModal && (
//                 <motion.div
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   className="absolute top-14 right-14 bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-slate-700 w-[50%] z-50 flex flex-col gap-2"
//                 >
//                   <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-2 border-b border-[#00ffcc]/60 pb-1 w-full">
//                     Query
//                   </h2>

//                   <TextInput
//                     value={queryInput}
//                     onChange={(e) => {
//                       setQueryInput(e.target.value);
//                     }}
//                     placeholder="Enter query"
//                     rows={3}
//                   />

//                   <div className="flex justify-center mt-2">
//                     <NextButton
//                       onClick={handleQuerySubmit}
//                       label={loading ? "Submitting..." : "Submit"}
//                       disabled={loading}
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//             {chartData && (
//               <ModalComponent
//                 isHeading={false}
//                 modalData={
//                   <>
//                     {chartDataError ? (
//                       <div className=" text-center p-4">{chartDataError}</div>
//                     ) : (
//                       chartData &&
//                       chartData != null && (
//                         <LineChart data={chartData} onClickZoom={false} />
//                       )
//                     )}
//                   </>
//                 }
//                 onClose={handleCloseModal}
//               />
//             )}
//           </>

//           {contextMenu.visible && (
//             <div
//               className="absolute bg-slate-800 text-white p-2 rounded shadow-lg z-50 cursor-pointer"
//               style={{ top: contextMenu.y, left: contextMenu.x }}
//               onClick={() => {
//                 console.log("Full path text:", contextMenu.fullPathText);
//                 console.log("Subtree text:", contextMenu.subtreeText);
//                 setContextMenu(prev => ({ ...prev, visible: false }));
//               }}
//             >
//               Delete Node
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

"use client";
import React, { useEffect, useRef, useState } from "react";

export default function AiveeChat() {
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const ws = useRef(null);

  // Connect WebSocket
  useEffect(() => {
    const wsUrl = "wss://mjohcgnfjg.execute-api.ap-south-1.amazonaws.com/testing/";
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
      setConnected(true);
    };

    ws.current.onclose = () => {
      console.log("❌ WebSocket disconnected");
      setConnected(false);
    };

    ws.current.onmessage = (event) => {
      if (!event.data) return;

      // Try to parse as JSON first
      try {
        const data = JSON.parse(event.data);
        console.log("📩 JSON message from server:", data);

        if (data.event === "message") {
          setMessages((prev) => [...prev, { type: "response", text: data.data }]);
        } else if (data.event === "graphdata") {
          console.log("📊 Graph data received:", data.data);
        } else if (data.statusCode === 200 && data.token) {
          setToken(data.token);
          alert("Login successful!");
        } else if (data.statusCode >= 400) {
          alert(data.message || "Error");
        }
        return;
      } catch (err) {
        const msg = event.data.trim();
        console.warn("⚠️ Non-JSON message received:", msg);

        if (msg.startsWith("data: ")) {
          const text = msg.replace("data: ", "");
          setMessages((prev) => [...prev, { type: "response", text }]);
        } else if (msg.startsWith("graphdata: ")) {
          const graphStr = msg.replace("graphdata: ", "");
          try {
            const graphData = JSON.parse(graphStr);
            console.log("📊 Parsed graph data:", graphData);
          } catch {
            console.log("📊 Graph data (raw):", graphStr);
          }
        } else if (msg.startsWith("stop:")) {
          console.log("✅ Stream ended:", msg);
        } else {
          // Fallback - just show whatever came
          setMessages((prev) => [...prev, { type: "response", text: msg }]);
        }
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // 🔐 Handle Login (example)
  const handleLogin = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      alert("WebSocket not connected");
      return;
    }

    ws.current.send(
      JSON.stringify({
        action: "login",
        email: "kunal.gokhe@tridiagonal.ai",
        password: "Kunal@123",
      })
    );
  };

  // 💬 Send user prompt
  const handleSendPrompt = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      alert("WebSocket not connected");
      return;
    }

    if (!prompt.trim()) return;

    ws.current.send(
      JSON.stringify({
        action: "aivee",
        prompt,
        Authorization: `Bearer ${token}`,
      })
    );

    setMessages((prev) => [...prev, { type: "user", text: prompt }]);
    setPrompt("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🧠 AIVEE WebSocket Chat</h2>

      {!token ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleLogin}
          disabled={!connected}
        >
          {connected ? "Login" : "Connecting..."}
        </button>
      ) : (
        <>
          <div className="border p-2 h-64 overflow-y-auto rounded mb-4 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  m.type === "user"
                    ? "text-right text-blue-600"
                    : "text-left text-gray-700"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="border flex-1 p-2 rounded"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt..."
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSendPrompt}
              disabled={!token}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}



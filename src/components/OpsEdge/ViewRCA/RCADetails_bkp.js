// import React from "react";
// import { ArrowDownTrayIcon, ShareIcon } from "@heroicons/react/24/outline";
// import { showError, showSuccess } from "@/utils/toastUtils";

// const RCADetails = ({ data }) => {
//     const handleDownload = () => {
//         const link = document.createElement("a");
//         link.href = data.rcaReport;
//         link.target="_blank"
//         link.click();
//     };

//     const handleShare = async () => {
//         const shareLink = data.rcaReport;
//         try {
//             await navigator.clipboard.writeText(shareLink);
//             showSuccess("Link copied to clipboard!");
//         } catch (err) {
//             showError("Failed to copy link:", err);
//         }
//     };

//     return (
//         <div className="relative">
//             <div className="flex justify-center items-center mb-4 relative">
//                 <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-2 border-b border-[#00ffcc]/60 pb-1 w-full">
//                     Root Cause Analysis Report {data?.rcaId || ""}
//                 </h2>

//                 <div className="absolute -top-3 right-4 flex space-x-3 p-2">
//                     <button
//                         onClick={handleDownload}
//                         className="p-2 rounded-full "
//                         title="Download PDF"
//                     >
//                         <ArrowDownTrayIcon className="h-6 w-6 text-gray-400 hover:text-[#00ffcc] transition-colors duration-200" />
//                     </button>
//                     <button
//                         onClick={handleShare}
//                         className="p-2 rounded-full "
//                         title="Share PDF"
//                     >
//                         <ShareIcon className="h-6 w-6 text-gray-400 hover:text-[#00ffcc] transition-colors duration-200" />
//                     </button>
//                 </div>
//             </div>

//             {/* <h3 className="text-md font-semibold mb-2">Summary</h3>
//             <h2 className="text-sm mb-6">{data.summary}</h2>

//             <div className="mb-8">
//                 <h3 className="text-md font-semibold mb-2">
//                     Ishikawa Diagram for RCA
//                 </h3>
//                 <div className="flex justify-center">
//                     <img
//                         src={data.rcaPlot}
//                         alt="Fish Bone Diagram"
//                         className="w-full max-w-xl rounded-lg shadow-md"
//                     />
//                 </div>
//             </div>

//             <h3 className="text-md font-semibold mb-2">Troubleshooting Steps</h3>
//             {data.troubleshooting?.tagID && data.troubleshooting.tagID.length > 0 ? (
//                 data.troubleshooting.tagID.map((tag, i) => (
//                     <div key={tag + i} className="mb-6">
//                         <p className="text-sm">Tag ID: {tag}</p>
//                         <p className="text-sm">
//                             Parameter: {data.troubleshooting?.parameter?.[i] || "N/A"}
//                         </p>
//                         <p className="text-sm">Troubleshooting Steps:</p>
//                         <ol className="list-decimal list-inside text-sm">
//                             {data.troubleshooting?.troubleshootingSteps?.[i]?.map((step, idx) => (
//                                 <li key={idx}>{step}</li>
//                             )) || <li>No steps available</li>}
//                         </ol>
//                     </div>
//                 ))
//             ) : (
//                 <p className="text-sm italic text-gray-400">
//                     No troubleshooting data available.
//                 </p>
//             )} */}

//             <div className="w-full h-[55vh] border rounded-lg overflow-hidden shadow-md">
//                 <iframe
//                     width={"100%"}
//                     height={"100%"}
//                     src={`${data.rcaReport}#toolbar=0&navpanes=0&scrollbar=0&zoom=FitH`}
//                 />

//             </div>

//         </div>
//     );
// };

// export default RCADetails;
"use client";
const lineData = {
  datasets: [
    {
      data: [
        0.18, 0.18, 0.18, 0.18, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17,
        0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.18, 0.18,
        0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18,
      ],
      label: "B32PDI0036.PV",
    },
    {
      data: [
        641.54, 642.12, 642.71, 640.54, 636.39, 640.08, 640.25, 647.58, 644.88,
        641.55, 639.85, 640.13, 640.92, 641.05, 640.41, 637.31, 636.7, 638.46,
        642.46, 642.06, 639.47, 638.1, 641.52, 644.94, 648.36, 651.78, 658.29,
        658.46, 661.88, 660.02, 665.51,
      ],
      label: "B32JI0003.PV",
    },
  ],
  labels: [
    "2025-01-01 00:00:00",
    "2025-01-01 00:02:00",
    "2025-01-01 00:04:00",
    "2025-01-01 00:06:00",
    "2025-01-01 00:08:00",
    "2025-01-01 00:10:00",
    "2025-01-01 00:12:00",
    "2025-01-01 00:14:00",
    "2025-01-01 00:16:00",
    "2025-01-01 00:18:00",
    "2025-01-01 00:20:00",
    "2025-01-01 00:22:00",
    "2025-01-01 00:24:00",
    "2025-01-01 00:26:00",
    "2025-01-01 00:28:00",
    "2025-01-01 00:30:00",
    "2025-01-01 00:32:00",
    "2025-01-01 00:34:00",
    "2025-01-01 00:36:00",
    "2025-01-01 00:38:00",
    "2025-01-01 00:40:00",
    "2025-01-01 00:42:00",
    "2025-01-01 00:44:00",
    "2025-01-01 00:46:00",
    "2025-01-01 00:48:00",
    "2025-01-01 00:50:00",
    "2025-01-01 00:52:00",
    "2025-01-01 00:54:00",
    "2025-01-01 00:56:00",
    "2025-01-01 00:58:00",
    "2025-01-01 01:00:00",
  ],
  title: "Timeseries Plot of B32PDI0036.PV, B32JI0003.PV",
  type: "line",
};

import LineChart from "@/components/Common/Graphs/LineChart/LineChart";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import InsightsIcon from "@mui/icons-material/Insights";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownTrayIcon, ShareIcon } from "@heroicons/react/24/outline";
import { showError, showSuccess, showWarning } from "@/utils/toastUtils";
import {
  getPlotForInsights,
  getPlotForRCA,
  getRCAPDF,
  getTagPDF,
} from "@/services/dashboardServices";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import { clearAuthStorage } from "@/utils/authUtils";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import NextButton from "@/components/Common/Form/NextButton";
import Table from "@/components/Common/Table/Table";
import TextInput from "@/components/Common/Form/TextInput";
import { addVisuals, getVisualsList } from "@/services/visualsServices";

export default function RCADetails({ data }) {
  const [content, setContent] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [popupDataError, setPopupDataError] = useState("");
  const router = useRouter();
  const [rcaUrl, setRcaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [loadingReportCompilation, setLoadingReportCompilation] =
    useState(null);
  const [globalStartTime, setGlobalStartTime] = useState("");
  const [globalEndTime, setGlobalEndTime] = useState("");
  const [addVisualModal, setAddVisualModal] = useState(false);
  const [visualsAddMethod, setVisualsAddMethod] = useState("new");
  const [visualName, setVisualsName] = useState("");
  const [visualNameError, setVisualNameError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visualsRow, setVisualsRow] = useState(null);
  const [visualsList, setVisualsList] = useState([]);
  const [equipmentId, setEquipmentId] = useState("");

  const fetchRcaUrl = async () => {
    const rcaPdfData = await getRCAPDF(
      data.date,
      data.equipmentId,
      data.rcaData,
      data.rcaId
    );
    if (rcaPdfData.statusCode == 401 || rcaPdfData.statusCode == 403) {
      showError(rcaPdfData.message || "Invalid token or access denied");
      clearAuthStorage(router);
      return null;
    } else if (rcaPdfData.statusCode && rcaPdfData.statusCode !== 200) {
      showError(rcaPdfData.message || "Failed to fetch anamoly list");
      return null;
    } else {
      setRcaUrl(rcaPdfData.data.rcaUrl);
      return rcaPdfData.data.rcaUrl;
    }
  };

  const handleDownload = async () => {
    setLoadingReportCompilation(true);
    showWarning("Compiling Report, Please wait...");
    const url = await fetchRcaUrl();
    if (url) {
      showSuccess("Report Generated Successfully!");
      window.open(url, "_blank");
    }
    setLoadingReportCompilation(false);
  };

  const handleShare = async () => {
    setLoadingReportCompilation(true);

    try {
      if (!rcaUrl) {
        showWarning("Compiling Report, Please wait...");
      }
      const url = rcaUrl || (await fetchRcaUrl());
      if (url) {
        await navigator.clipboard.writeText(url);
        showSuccess("Link copied to clipboard!");
      }
    } catch (err) {
      showError("Failed to copy link:", err);
    }
    setLoadingReportCompilation(false);
  };

  const generateTitleBlockHTML = (rcaid, date, equip) => {
    return `
    <div style="text-align:center; margin:40px 0;">
  <table style="
    margin: 0 auto;
    border-collapse: collapse;
    width: 60%;
    font-size: 15px;
    border: 1px solid #374151;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
  ">
    <thead style="
      background: linear-gradient(to right, #0e7490, #0f172a);
      text-transform: uppercase;
      font-size: 13px;
    ">
      <tr>
        <th style="border: 1px solid #374151; padding: 5px;">Generated Date</th>
        <th style="border: 1px solid #374151; padding: 5px;">RCA ID</th>
        <th style="border: 1px solid #374151; padding: 5px;">Equipment</th>
      </tr>
    </thead>
    <tbody>
      <tr style=" transition: background 0.3s;">
        <td style="border: 1px solid #374151; padding: 5px; text-align:center;">${date}</td>
        <td style="border: 1px solid #374151; padding: 5px; text-align:center;">${rcaid}</td>
        <td style="border: 1px solid #374151; padding: 5px; text-align:center;">${equip}</td>
      </tr>
    </tbody>
  </table>
</div>

`;
  };

  const parseAndAddHTML = (markdown, rcaId, date, equipmentId) => {
    const lines = markdown.trim().split("\n");
    let mainHeading = "";
    let htmlOutput = [];
    let startProcessing = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (!mainHeading && line.startsWith("# ")) {
        mainHeading = `<div><span style="display:block; text-align:center; font-size:20px; font-weight:bold; margin-bottom:20px;">${line
          .slice(2)
          .trim()}</span></div>`;
        startProcessing = true;
        continue;
      }

      if (startProcessing) {
        if (!line) {
          htmlOutput.push("<br>");
          continue;
        }

        if (line.startsWith("##### ")) {
          htmlOutput.push(
            `<div><span style="display:block; font-size:14px; font-weight:bold;">${line
              .slice(6)
              .trim()}</span></div>`
          );
        } else if (line.startsWith("#### ")) {
          htmlOutput.push(
            `<div><span style="display:block; font-size:16px; font-weight:bold; ">${line
              .slice(5)
              .trim()}</span></div>`
          );
        } else if (line.startsWith("### ")) {
          htmlOutput.push(
            `<div><span style="display:block; margin-top:20px; font-size:18px; font-weight:bold; ">${line
              .slice(4)
              .trim()}</span></div>`
          );
        } else if (line.startsWith("## ")) {
          htmlOutput.push(
            `<div><span style="display:block; margin-top:25px; font-size:20px; font-weight:bold; ">${line
              .slice(3)
              .trim()}</span></div>`
          );
        } else if (line.startsWith("# ")) {
          htmlOutput.push(
            `<div><span style="display:block; text-align:center; margin-top:30px; margin-bottom:15px; font-size:29px; font-weight:bold;">${line
              .slice(2)
              .trim()}</span></div>`
          );
        } else {
          let htmlLine = line.replace(
            /\*\*(.*?)\*\*/g,
            (_, text) => `<b>${text}</b>`
          );
          htmlLine = htmlLine.replace(
            /\|\|(.*?)\|\|/g,
            '<span style="color:red;">$1</span>'
          );
          htmlOutput.push(
            `<p style="margin:10px 0; font-size:15px; color:#333;">${htmlLine}</p>`
          );
        }
      }
    }

    const titleBlockHTML = generateTitleBlockHTML(rcaId, date, equipmentId);

    const finalHTML = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Root Cause Analysis Report</title>
      <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 40px; 
            line-height: 1.6; 
            background: #fafafa; 
          }
          p { color: #333; }
          a { color: #0056b3; text-decoration: none; }
          a:hover { text-decoration: underline; }
      </style>
  </head>
  <body>
      ${mainHeading}
      ${titleBlockHTML}
      ${htmlOutput.join("\n")}
  </body>
  </html>
  `;
    return finalHTML;
  };

  const parseKeyValueString = (str) => {
    const pairs = str.match(/(\w+):(\[.*?\]|[^,\]]+)/g) || [];
    const obj = {};
    pairs.forEach((pair) => {
      const [key, value] = pair.split(/:(.+)/); // split only at first colon
      obj[key.trim()] = value.replace(/^\[|\]$/g, "").trim(); // remove [ ] if present
    });
    return obj;
  };

  const parseMarkdownToParts = (htmlString) => {
    const regexClickable = /\^\[(.*?)\]\^/g;
    const regexChart = /\!\[(.*?)\]\!/g;
    const regexReference = /\$\[(.*?)\]\$/g;
    const regexAnomalyChart =
      /@\[\s*equipmentId:(.*?)\s*,\s*startTime:(.*?)\s*,\s*endTime:(.*?)\s*\]@/g;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    return Array.from(doc.body.children).map((p, pIndex) => {
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = regexClickable.exec(p.innerHTML)) !== null) {
        parts.push(p.innerHTML.slice(lastIndex, match.index));

        const dataObj = parseKeyValueString(match[1]);

        parts.push({
          tagId: dataObj.tagId
            ? dataObj.tagId.split(",").map((t) => t.trim())
            : [],
          equipmentId: dataObj.equipmentId || null,
          startTime: dataObj.startTime || null,
          endTime: dataObj.endTime || null,
          plotType: dataObj.plotType || "line",
          type: "clickable",
        });

        lastIndex = regexClickable.lastIndex;
      }

      let remaining = p.innerHTML.slice(lastIndex);
      lastIndex = 0;
      while ((match = regexChart.exec(remaining)) !== null) {
        parts.push(remaining.slice(lastIndex, match.index));

        const dataObj = parseKeyValueString(match[1]);

        parts.push({
          tagId: dataObj.tagId
            ? dataObj.tagId.split(",").map((t) => t.trim())
            : [],
          equipmentId: dataObj.equipmentId || null,
          startTime: dataObj.startTime || null,
          endTime: dataObj.endTime || null,
          plotType: dataObj.plotType || "",
          type: "chart",
          data: null,
          loading: true,
        });

        lastIndex = regexChart.lastIndex;
      }

      let afterCharts = remaining.slice(lastIndex);
      lastIndex = 0;

      while ((match = regexAnomalyChart.exec(afterCharts)) !== null) {
        parts.push(afterCharts.slice(lastIndex, match.index));
        parts.push({
          equipmentId: match[1],
          startTime: match[2],
          endTime: match[3],
          type: "eventChart",
          data: null,
          loading: true,
        });
        lastIndex = regexAnomalyChart.lastIndex;
      }

      let afterAnomalyCharts = afterCharts.slice(lastIndex);
      lastIndex = 0;

      while ((match = regexReference.exec(afterAnomalyCharts)) !== null) {
        parts.push(afterAnomalyCharts.slice(lastIndex, match.index));
        parts.push({
          filePath: match[1],
          type: "reference",
        });
        lastIndex = regexReference.lastIndex;
      }

      parts.push(afterAnomalyCharts.slice(lastIndex));
      return { parts, key: pIndex };
    });
  };

  const handleReferenceClick = async (filePath) => {
    setLoading(true);
    const pdfData = await getTagPDF(filePath);
    if (pdfData.statusCode == 401 || pdfData.statusCode == 403) {
      showError(pdfData.message || "Invalid token or access denied");
      clearAuthStorage(router);
    } else if (pdfData.statusCode && pdfData.statusCode !== 200) {
      showError(pdfData.message || "Failed to fetch anamoly list");
    } else {
      showSuccess(pdfData.message);
      window.open(pdfData.data, "_blank");
    }
    console.log("pdfData", pdfData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const htmlResponse = parseAndAddHTML(
      data.rcaData,
      data.rcaId,
      data.date,
      data.equipmentId
    );
    const parsedBlocks = parseMarkdownToParts(htmlResponse);

    const withLoading = parsedBlocks.map((block) => ({
      ...block,
      parts: block.parts.map((p) =>
        p.type === "chart" ? { ...p, loading: true } : p
      ),
    }));

    setContent(withLoading);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    content.forEach((block, bIndex) => {
      block.parts.forEach((part, pIndex) => {
        if (
          (part.type === "chart" || part.type === "eventChart") &&
          part.loading
        ) {
          const fetchData = async () => {
            let chartData;
            if (part.type === "chart") {
              chartData = await getPlotForRCA(
                part.tagId,
                part.equipmentId,
                part.startTime,
                part.endTime,
                part.plotType
              );
            } else if (part.type === "eventChart") {
              chartData = await getPlotForInsights(
                part.equipmentId,
                part.startTime,
                part.endTime
              );
            }

            setContent((prev) =>
              prev.map((b, i) =>
                i === bIndex
                  ? {
                      ...b,
                      parts: b.parts.map((p, j) =>
                        j === pIndex
                          ? {
                              ...p,
                              data: chartData?.data || [],
                              loading: false,
                              error: chartData?.statusCode !== 200,
                            }
                          : p
                      ),
                    }
                  : b
              )
            );
          };
          fetchData();
        }
      });
    });
  }, [content]);

  const handleInitialClick = (part) => {
    setSelectedData({
      tagId: part.tagId,
      equipmentId: part.equipmentId,
      startTime: part.startTime,
      endTime: part.endTime,
      plotType: part.plotType,
    });
    const startTime = globalStartTime || part.startTime;
    const endTime = globalEndTime || part.endTime;
    console.log("ST and ET", startTime, endTime);
    fetchChartData(
      part.tagId,
      part.equipmentId,
      startTime,
      endTime,
      part.plotType,
      true
    );
  };

  const handleRangeChange = (startTime, endTime) => {
    if (!selectedData) return;
    console.log("Range changed:", startTime, endTime, selectedData);
    if (startTime === "FULL_RANGE") {
      fetchChartData(
        selectedData.tagId,
        selectedData.equipmentId,
        selectedData.startTime,
        selectedData.endTime,
        selectedData.plotType,
        false
      );
    } else {
      fetchChartData(
        selectedData.tagId,
        selectedData.equipmentId,
        startTime,
        endTime,
        selectedData.plotType,
        false
      );
    }
  };

  const fetchChartData = async (
    tagId,
    equipmentId,
    startTime,
    endTime,
    plotType,
    showLoader = false
  ) => {
    if (showLoader) setLoading(true);
    const chartData = await getPlotForRCA(
      tagId,
      equipmentId,
      startTime,
      endTime,
      plotType
    );
    if (chartData.statusCode == 401 || chartData.statusCode == 403) {
      setPopupDataError("");
      showError(chartData.message || "Invalid token or access denied");
      setPopupData(null);
      clearAuthStorage(router);
    } else if (chartData.statusCode && chartData.statusCode !== 200) {
      setPopupDataError(chartData.message || "Failed to fetch anamoly list");
      showError(chartData.message || "Failed to fetch anamoly list");
      setPopupData(null);
    } else {
      setPopupData(chartData.data);
      setPopupDataError("");
    }
    console.log("Data", chartData);

    if (showLoader) setLoading(false);
  };

  // const handleRangeChangeRendered = async (startTime, endTime, part) => {
  //     if (!part) return;
  //     console.log("Range changed in rendered chart:", startTime, endTime, part);
  //     let chartData;
  //     if (startTime === 'FULL_RANGE') {
  //         chartData = await getPlotForRCA(part.tagId, part.equipmentId, part.startTime, part.endTime, part.plotType);
  //     } else {
  //         chartData = await getPlotForRCA(part.tagId, part.equipmentId, startTime, endTime, part.plotType);
  //     }
  //     setContent(prev =>
  //         prev.map(block => ({
  //             ...block,
  //             parts: block.parts.map(p =>
  //                 p.type === "chart" &&
  //                     p.tagId === part.tagId &&
  //                     p.equipmentId === part.equipmentId
  //                     ? {
  //                         ...p,
  //                         data: chartData?.data || [],
  //                         loading: false,
  //                         error: chartData?.statusCode !== 200
  //                     }
  //                     : p
  //             )
  //         }))
  //     );
  // };

  const handleRangeChangeRendered = async (startTime, endTime) => {
    console.log("Range changed for all charts:", startTime, endTime);

    setGlobalStartTime(startTime);
    setGlobalEndTime(endTime);

    const updatedBlocks = await Promise.all(
      content.map(async (block) => {
        const updatedParts = await Promise.all(
          block.parts.map(async (p) => {
            if (p.type === "chart" || p.type === "eventChart") {
              let chartData;
              if (p.type === "chart") {
                chartData = await getPlotForRCA(
                  p.tagId,
                  p.equipmentId,
                  startTime === "FULL_RANGE" ? p.startTime : startTime,
                  endTime === "FULL_RANGE" ? p.endTime : endTime,
                  p.plotType
                );
              } else if (p.type === "eventChart") {
                chartData = await getPlotForInsights(
                  p.equipmentId,
                  startTime === "FULL_RANGE" ? p.startTime : startTime,
                  endTime === "FULL_RANGE" ? p.endTime : endTime
                );
              }
              return {
                ...p,
                data: chartData?.data || [],
                loading: false,
                error: chartData?.statusCode !== 200,
              };
            }
            return p;
          })
        );
        return {
          ...block,
          parts: updatedParts,
        };
      })
    );

    setContent(updatedBlocks);
  };

  // Add visual and visual list
  useEffect(() => {
    const fetchVisualsList = async () => {
      const visualListResponse = await getVisualsList();
      if (visualListResponse.statusCode === 200) {
        setVisualsList(visualListResponse?.data);
      } else if (
        visualListResponse.statusCode == 401 ||
        visualListResponse.statusCode == 403
      ) {
        showError(
          visualListResponse.message || "Invalid token or access denied"
        );
        clearAuthStorage(router);
      } else {
        showError(visualListResponse.message || "Something went wrong");
      }
    };
    fetchVisualsList();
  }, []);

  const handleAddVisuals = async () => {
    if (visualsAddMethod === "new" && visualName.trim() === "") {
      setVisualNameError("Please enter dashboard name");
      return;
    } else {
      setVisualNameError("");
    }

    let type = visualsAddMethod;
    let name = visualsAddMethod === "existing" ? visualsRow?.name : visualName;
    let visualId = visualsAddMethod === "existing" ? visualsRow?.id : "";
    const addVisualsResponse = await addVisuals(
      type,
      name,
      visualId,
      selectedData?.equipmentId,
      selectedData?.tagId
    );

    if (addVisualsResponse.statusCode === 200) {
      const redirectVisualId =
        visualsAddMethod === "existing"
          ? visualId
          : addVisualsResponse.visualId;
      console.log("🔗 Redirecting to:", redirectVisualId);
      const redirectURL = `/opsedge/visuals/charts?visualId=${redirectVisualId}`;
      window.open(redirectURL, "_blank");
      setAddVisualModal(false);
    } else if (addVisualsResponse === 401 || addVisualsResponse === 403) {
      showError(addVisualsResponse.message || "Invalid token or access denied");
      clearAuthStorage(router);
    } else {
      showError(addVisualsResponse.message || "Something went wrong...");
    }
  };

  const filteredVisuals = useMemo(() => {
    if (!visualsList) return [];
    if (!searchQuery) return visualsList;
    return visualsList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, visualsList]);

  return (
    <>
      {loading && <RippleLoader />}
      {!loading && content && (
        <div className="relative">
          <div className="flex justify-center items-center mb-2 relative">
            <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-2 border-b border-[#00ffcc]/60 pb-1 w-full">
              Early Event Investigation Report
            </h2>

            <div className="absolute -top-3 right-4 flex space-x-3 p-2">
              <button
                onClick={handleDownload}
                className="p-2 rounded-full "
                title="Download PDF"
                disabled={loadingReportCompilation}
              >
                <ArrowDownTrayIcon
                  className={`h-6 w-6 transition-colors duration-200 ${
                    loadingReportCompilation
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-400 hover:text-[#00ffcc] cursor-pointer"
                  }`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full "
                title="Share PDF"
                disabled={loadingReportCompilation}
              >
                <ShareIcon
                  className={`h-6 w-6 transition-colors duration-200 ${
                    loadingReportCompilation
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-400 hover:text-[#00ffcc] cursor-pointer"
                  }`}
                />
              </button>
            </div>
          </div>

          <div>
            {content.map((block) => (
              <div key={block.key} className="mb-2">
                {block.parts.map((part, i) =>
                  typeof part === "string" ? (
                    <span key={i} dangerouslySetInnerHTML={{ __html: part }} />
                  ) : part.type === "clickable" ? (
                    <button
                      key={i}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleInitialClick(part)}
                    >
                      {part.tagId.join(", ")}&nbsp;
                      <InsightsIcon className="h-3 w-3 mb-1" />
                    </button>
                  ) : part.type === "chart" ? (
                    <div key={i} className="my-3">
                      {part.loading && (
                        <div className="flex flex-col justify-center items-center min-h-[150px] space-y-2">
                          <CircularProgress
                            size={28}
                            thickness={4}
                            color="inherit"
                          />
                          <span className="text-sm text-gray-500 mt-1">
                            Loading chart...
                          </span>
                        </div>
                      )}
                      {!part.loading && part.error && (
                        <div className="text-red-500 text-sm">
                          Failed to load chart
                        </div>
                      )}
                      {!part.loading && !part.error && part.data && (
                        <LineChart
                          data={part.data}
                          onClickZoom={false}
                          onRangeChange={(start, end) =>
                            handleRangeChangeRendered(start, end, part)
                          }
                        />
                      )}
                    </div>
                  ) : part.type === "eventChart" ? (
                    <div key={i} className="my-3">
                      {part.loading && (
                        <div className="flex flex-col justify-center items-center min-h-[150px] space-y-2">
                          <CircularProgress
                            size={28}
                            thickness={4}
                            color="inherit"
                          />
                          <span className="text-sm text-gray-500 mt-1">
                            Loading chart...
                          </span>
                        </div>
                      )}
                      {!part.loading && part.error && (
                        <div className="text-red-500 text-sm">
                          Failed to load chart
                        </div>
                      )}
                      {!part.loading && !part.error && part.data && (
                        <LineChart
                          data={part.data}
                          onClickZoom={false}
                          onRangeChange={(start, end) =>
                            handleRangeChangeRendered(start, end, part)
                          }
                        />
                      )}
                    </div>
                  ) : part.type === "reference" ? (
                    <button
                      key={i}
                      className="text-green-600 hover:text-green-800 cursor-pointer underline ml-2"
                      onClick={() => handleReferenceClick(part.filePath)}
                    >
                      Reference
                    </button>
                  ) : null
                )}
              </div>
            ))}

            {addVisualModal && (
              <ModalComponent
                isHeading={false}
                onClose={() => setAddVisualModal(false)}
                modalData={
                  <>
                    <div
                      className={`flex flex-col rounded-xl ${
                        visualsAddMethod === "existing" ? "h-[65vh]" : ""
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-3 -mt-1 border-b border-[#00ffcc]/60 pb-1">
                          Add to Visuals
                        </h2>

                        <div className="flex bg-gray-700 rounded-xl justify-center p-1 mb-2">
                          <button
                            onClick={() => setVisualsAddMethod("new")}
                            className={`flex-1 text-[14px] rounded-xl py-2 text-center transition-colors duration-200 text-white ${
                              visualsAddMethod === "new"
                                ? "border-2 border-[#00ffcc]"
                                : "hover:bg-gray-600"
                            }`}
                          >
                            Add to New Visuals
                          </button>

                          <button
                            onClick={() => setVisualsAddMethod("existing")}
                            className={`flex-1 text-[14px] rounded-xl py-2 text-center transition-colors duration-200 text-white ${
                              visualsAddMethod === "existing"
                                ? "border-2 border-[#00ffcc]"
                                : "hover:bg-gray-600"
                            }`}
                          >
                            Add to Existing Visuals
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col overflow-hidden p-2">
                        {visualsAddMethod === "new" ? (
                          <div className="overflow-y-auto">
                            <TextInput
                              value={visualName}
                              onChange={(e) => setVisualsName(e.target.value)}
                              placeholder={"Enter name"}
                              error={visualNameError}
                            />
                          </div>
                        ) : (
                          <>
                            <div className="flex-shrink-0 mb-2">
                              <TextInput
                                placeholder={"Search...."}
                                value={searchQuery ?? ""}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>

                            <div className="flex-1 overflow-y-auto">
                              <Table
                                labels={["id", "name", "created On"]}
                                tableData={filteredVisuals}
                                redirectTo={(row) => setVisualsRow(row)}
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex-shrink-0 flex justify-center">
                        <NextButton label="Submit" onClick={handleAddVisuals} />
                      </div>
                    </div>
                  </>
                }
              />
            )}

            {popupData && (
              <ModalComponent
                isHeading={false}
                modalData={
                  <>
                    <div className="flex justify-end mx-12 my-2">
                      <NextButton
                        label="Add to visuals"
                        onClick={() => setAddVisualModal(true)}
                      />
                    </div>

                    {popupDataError ? (
                      <div className=" text-center p-4">{popupDataError}</div>
                    ) : (
                      popupData &&
                      popupData != null && (
                        <LineChart
                          data={popupData}
                          onClickZoom={false}
                          onRangeChange={handleRangeChange}
                        />
                      )
                    )}
                  </>
                }
                onClose={() => setPopupData(null)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

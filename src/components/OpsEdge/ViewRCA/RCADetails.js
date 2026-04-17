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

  const unmarshalPlotData = (plot) => {
    if (!plot) return { x: [], y: [] };

    // Case 1: Marshalled (DynamoDB JSON)
    const mData = plot.M || plot;
    if (mData.x?.L && mData.y?.L) {
      return {
        x: mData.x.L.map(item => item.S || item.N || item.BOOL || ""),
        y: mData.y.L.map(item => parseFloat(item.N || item.S || 0))
      };
    }

    // Case 2: Unmarshalled (Standard JSON)
    if (Array.isArray(plot.x) && Array.isArray(plot.y)) {
      return { x: plot.x, y: plot.y };
    }

    return { x: [], y: [] };
  };

  const generateTitleBlockHTML = (rcaid, date, equip) => {
    return `
    <div style="margin: 24px 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #f8fafc; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', system-ui, sans-serif; font-size: 13px;">
            <thead>
                <tr style="background: #f1f5f9; border-bottom: 2px solid #e2e8f0;">
                    <th style="padding: 12px 16px; text-align: left; color: #475569; font-weight: 700; width: 35%;">REPORT GENERATED</th>
                    <th style="padding: 12px 16px; text-align: left; color: #475569; font-weight: 700;">RCA REFERENCE ID</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 14px 16px; color: #1e293b; font-weight: 500; border-right: 1px solid #f1f5f9;">${date}</td>
                    <td style="padding: 14px 16px; color: #1e293b; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12px;">${rcaid}</td>
                </tr>
            </tbody>
        </table>
    </div>
    `;
  };

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w-]+/g, '')    // Remove all non-word chars
      .replace(/--+/g, '-');      // Replace multiple - with single -
  };

  const parseAndAddHTML = (markdown, rcaId, date, equipmentId, availablePlotNames = []) => {
    const lines = markdown.trim().split("\n");
    let htmlOutput = [];
    let startProcessing = false;
    let inList = false;

    const replaceBoldWithLinks = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
            const cleanP1 = p1.trim();
            const normalizedParam = cleanP1.toLowerCase().replace(/_/g, ' ').trim();
            const paramWords = normalizedParam.split(/\s+/).filter(w => w.length > 1);

            // 1. Try Exact Match first
            let matchedPlotName = availablePlotNames.find(name => {
                const normalizedPlot = name.toLowerCase().replace(/_/g, ' ').replace(/\svs\stime$/, '').trim();
                return normalizedPlot === normalizedParam || name.toLowerCase() === cleanP1.toLowerCase().replace(/\s/g, '_');
            });

            // 2. Fallback: Keyword-based Scoring (for mismatched names like 'Steam Flow 2' -> 'sh_2')
            if (!matchedPlotName) {
                let bestScore = 0;
                availablePlotNames.forEach(name => {
                    const normalizedPlot = name.toLowerCase().replace(/_/g, ' ').replace(/\svs\stime$/, '').trim();
                    const plotWords = normalizedPlot.split(/\s+/).filter(w => w.length > 1);
                    
                    // Count overlapping keywords
                    let score = 0;
                    paramWords.forEach(pw => {
                        if (plotWords.includes(pw)) score += 2; // Exact word match
                        else if (plotWords.some(plw => plw.includes(pw) || pw.includes(plw))) score += 1; // Partial match
                    });

                    if (score > bestScore) {
                        bestScore = score;
                        matchedPlotName = name;
                    }
                });
                
                // Only use the match if it has a decent score relative to param length
                if (bestScore < 1) matchedPlotName = null;
            }

            if (matchedPlotName) {
                // Use a standard span with a class for global click handling
                return `<span class="plot-popup-trigger" data-plot-name="${matchedPlotName}" style="color:#2563eb; background:#eff6ff; padding:2px 6px; border-radius:4px; border:1px solid #dbeafe; text-decoration:none; cursor:pointer; font-weight:bold; display:inline-block; margin:0 2px;">${p1}</span>`;
            }
            return `<b style="color:#1e40af;">${p1}</b>`;
        });
    };

    const highlightImportant = (text) => {
        // Regex for Dates (YYYY-MM-DD) and Time (HH:MM:SS)
        let processed = text.replace(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/g, '<span style="background:#fff7ed; color:#9a3412; padding:2px 4px; border-radius:4px; font-weight:600; border:1px solid #ffedd5;">$1</span>');
        processed = processed.replace(/(\d{4}-\d{2}-\d{2})/g, '<span style="background:#f0fdf4; color:#166534; padding:2px 4px; border-radius:4px; font-weight:600; border:1px solid #dcfce7;">$1</span>');
        return processed;
    };

    let inTable = false;
    let tableLines = [];

    const renderTable = (rows) => {
        if (rows.length < 2) return "";
        const headers = rows[0].split("|").filter(s => s.trim()).map(s => s.trim());
        const dataRows = rows.slice(2).map(row => row.split("|").filter(s => s.trim()).map(s => s.trim()));

        return `
        <div style="margin: 24px 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
            <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', system-ui, sans-serif; font-size: 14px;">
                <thead>
                    <tr style="background: #f1f5f9; border-bottom: 2px solid #e2e8f0;">
                        ${headers.map(h => `<th style="padding: 14px 16px; text-align: left; color: #475569; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 12px;">${h}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${dataRows.map((row, idx) => `
                        <tr style="${idx % 2 === 0 ? "background: white;" : "background: #f8fafc;"} border-bottom: 1px solid #f1f5f9;">
                            ${row.map(cell => `<td style="padding: 14px 16px; color: #334155; line-height: 1.5;">${highlightImportant(replaceBoldWithLinks(cell))}</td>`).join("")}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
        `;
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (!line) {
            if (inList) {
                htmlOutput.push("</ul>");
                inList = false;
            }
            if (inTable) {
                htmlOutput.push(renderTable(tableLines));
                tableLines = [];
                inTable = false;
            }
            continue;
        }

        if (line.startsWith("|")) {
            if (inList) { htmlOutput.push("</ul>"); inList = false; }
            inTable = true;
            tableLines.push(line);
            continue;
        } else if (inTable) {
            htmlOutput.push(renderTable(tableLines));
            tableLines = [];
            inTable = false;
        }

        if (line.startsWith("# ")) {
            if (inList) { htmlOutput.push("</ul>"); inList = false; }
            htmlOutput.push(`<h1 style="text-align:left; color:#1d4ed8; margin-bottom:24px; font-size:30px; font-weight:900;">${line.slice(2).trim()}</h1>`);
            startProcessing = true;
            continue;
        }

        if (!startProcessing) startProcessing = true;

        if (startProcessing) {
            const isListItem = line.startsWith("- ") || line.startsWith("* ");

            if (isListItem) {
                if (!inList) {
                    htmlOutput.push('<ul style="margin-bottom: 1.25rem; display: flex; flex-direction: column; align-items: flex-start; list-style-position: inside; padding: 0;">');
                    inList = true;
                }
                let cleanItem = replaceBoldWithLinks(line.slice(1).trim());
                cleanItem = highlightImportant(cleanItem);
                htmlOutput.push(`<li style="margin-bottom: 0.8rem; color:#334155; text-align: left; width: 100%; border-bottom: 1px dashed #f1f5f9; padding-bottom: 10px; font-size:18px; line-height:1.6;">${cleanItem}</li>`);
            } else {
                if (inList) {
                    htmlOutput.push("</ul>");
                    inList = false;
                }

                if (line.startsWith("### ")) {
                    htmlOutput.push(`<h3 style="color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px; margin-top:32px; margin-bottom:18px; font-size:22px; text-align:left; font-weight:700;">${line.slice(4).trim()}</h3>`);
                } else if (line.startsWith("## ")) {
                    htmlOutput.push(`<h2 style="color:#1e40af; border-bottom:2px solid #e2e8f0; padding-bottom:8px; margin-top:40px; margin-bottom:22px; font-size:26px; text-align:left; font-weight:800;">${line.slice(3).trim()}</h2>`);
                } else {
                    let htmlLine = replaceBoldWithLinks(line);
                    htmlLine = highlightImportant(htmlLine);
                    htmlLine = htmlLine.replace(/\|\|(.*?)\|\|/g, '<span style="color:red; font-weight:bold;">$1</span>');
                    htmlOutput.push(`<p style="margin-bottom:1.75rem; font-size:18px; color:#334155; line-height:1.8; text-align:left;">${htmlLine}</p>`);
                }
            }
        }
    }

    if (inTable) htmlOutput.push(renderTable(tableLines));
    if (inList) htmlOutput.push("</ul>");

    const titleBlockHTML = generateTitleBlockHTML(rcaId, date, equipmentId);
    return `
        <div class="report-body" style="background: #fafaf9; padding: 0 10px;">
            ${data.rcaId ? titleBlockHTML : ""}
            ${htmlOutput.join("\n")}
        </div>
    `;
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
    // Collect plot names from data.anomaly (view_rca) OR data.anomalies[] (generate_rca)
    let plotNames = [];
    if (data?.anomaly?.plots) {
      plotNames = Object.keys(data.anomaly.plots);
    } else if (data?.anomalies?.length > 0) {
      const allPlots = new Set();
      data.anomalies.forEach(a => {
        if (a.plots) Object.keys(a.plots).forEach(k => allPlots.add(k));
      });
      plotNames = [...allPlots];
    }
    const htmlResponse = parseAndAddHTML(
      data.rcaData,
      data.rcaId,
      data.date,
      data.equipmentId,
      plotNames
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

    // Global click handler for plot popups
    const handleGlobalClick = (e) => {
        const trigger = e.target.closest('.plot-popup-trigger');
        if (trigger) {
            const plotName = trigger.getAttribute('data-plot-name');
            const displayText = trigger.innerText;
            handleParameterPlotClick(plotName, displayText);
        }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
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

  const handleParameterPlotClick = (plotName, displayText) => {
      // Support both data.anomaly.plots (view_rca) and data.anomalies[].plots (generate_rca)
      let rawData = null;
      if (data?.anomaly?.plots?.[plotName]) {
          rawData = data.anomaly.plots[plotName];
      } else if (data?.anomalies?.length > 0) {
          for (const anomaly of data.anomalies) {
              if (anomaly.plots?.[plotName]) {
                  rawData = anomaly.plots[plotName];
                  break;
              }
          }
      }

      if (!rawData) {
          showError("Plot data not available for this parameter");
          return;
      }
      
      const plotData = unmarshalPlotData(rawData);
      
      const chartData = {
          title: displayText,
          labels: plotData.x,
          datasets: [
            {
              label: displayText,
              data: plotData.y,
            }
          ],
          xLabel: "Time",
          yLabel: "Value"
      };

      setPopupData(chartData);
      setPopupDataError("");
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
    // Disabled fetching to resolve Network Error as Visuals are "Coming Soon"
    /*
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
    */
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
    let visualId =
      visualsAddMethod === "existing" ? visualsRow?.["visual Id"] : "";
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
        <div className="relative bg-slate-50/50 -m-6 p-10 min-h-full scroll-smooth">
          <div className="max-w-[850px] mx-auto bg-white p-16 rounded-2xl shadow-xl border border-slate-200 min-h-[1000px]">
            <div className="flex justify-center items-center mb-6 relative">
              <h2 className="text-2xl font-bold text-center text-blue-600 mb-2 border-b-2 border-slate-100 pb-2 w-full">
                Early Event Investigation Report
              </h2>

              <div className="absolute -top-4 -right-4 flex space-x-2 p-2">
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-full bg-slate-50 hover:bg-white shadow-sm transition-all"
                  title="Download PDF"
                  disabled={loadingReportCompilation}
                >
                  <ArrowDownTrayIcon
                    className={`h-5 w-5 transition-colors duration-200 ${loadingReportCompilation
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-500 hover:text-blue-600 cursor-pointer"
                      }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-slate-50 hover:bg-white shadow-sm transition-all"
                  title="Share PDF"
                  disabled={loadingReportCompilation}
                >
                  <ShareIcon
                    className={`h-5 w-5 transition-colors duration-200 ${loadingReportCompilation
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-500 hover:text-blue-600 cursor-pointer"
                      }`}
                  />
                </button>
              </div>
            </div>

            {data?.fullTimelinePlot && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4 text-slate-700 text-center uppercase tracking-wider">
                  Timeline Overview
                </h3>
                <div className="flex justify-center bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-inner">
                  <img
                    src={`data:image/png;base64,${data.fullTimelinePlot}`}
                    alt="Full Timeline Plot"
                    className="max-w-full h-auto rounded-lg shadow-md ring-1 ring-slate-200"
                  />
                </div>
              </div>
            )}

            <div className="rca-content-container">
              {content.map((block) => (
                <div key={block.key} className="mb-4">
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
            </div>

            {popupData && (
              <ModalComponent
                isHeading={false}
                modalData={
                  <>
                    {popupDataError ? (
                      <div className="text-center p-4 text-red-500">{popupDataError}</div>
                    ) : (
                      popupData && popupData != null && (
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

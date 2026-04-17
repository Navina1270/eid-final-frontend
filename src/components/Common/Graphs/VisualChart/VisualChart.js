// "use client";
// import { formatDateTimeChart } from "@/utils/dateTime";
// import dynamic from "next/dynamic";
// import React from "react";

// const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
// const VisualChart = ({ data, onRangeChange, onToggleVisibility }) => {
//   const axisSpacing = 0.04;
//   const totalSpace = axisSpacing * (data.length - 0.75);

//   const layout = {
//     paper_bgcolor: "#334155",
//     plot_bgcolor: "#334155",
//     font: { color: "#cbd5e1" },
//     xaxis: {
//       title: "Time",
//       automargin: true,
//       domain: [totalSpace, 1],
//       gridcolor: "#475569",
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

//  data.forEach((signal, index) => {
//   const axisName = index === 0 ? "yaxis" : `yaxis${index + 1}`;
//   const isVisible = signal.visible !== false;

//   layout[axisName] = {
//     title: isVisible ? signal.name : "",
//     side: "left",
//     overlaying: index === 0 ? undefined : "y",
//     position: index * axisSpacing,
//     automargin: true,

//     showline: isVisible,
//     linecolor: signal.line?.color || "#cbd5e1",
//     linewidth: 1,
//     ticks: isVisible ? "outside" : "",
//     ticklen: isVisible ? 8 : 0,
//     tickwidth: isVisible ? 2 : 0,
//     tickcolor: signal.line?.color || "#cbd5e1",
//     showticklabels: isVisible,

//     showgrid: isVisible,
//     gridcolor: signal.line?.color || "#475569",
//     zeroline: false,
//   };
// });
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

//   const handleRelayout = (eventData) => {
//     if (eventData["xaxis.range[0]"] && eventData["xaxis.range[1]"]) {
//       const startTime = eventData["xaxis.range[0]"];
//       const endTime = eventData["xaxis.range[1]"];
//       if (onRangeChange)
//         onRangeChange(
//           formatDateTimeChart(startTime),
//           formatDateTimeChart(endTime)
//         );
//     }

//     if (eventData["xaxis.autorange"] === true) {
//       if (onRangeChange) onRangeChange("FULL_RANGE", "FULL_RANGE");
//     }
//   };

//   return (
//     <Plot
//       data={data.map((trace) => ({
//         ...trace,
//         visible: trace.visible === false ? "legendonly" : true,
//       }))}
//       layout={layout}
//       config={config}
//       useResizeHandler
//       style={{ width: "100%", height: "100%" }}
//       onInitialized={(figure, graphDiv) => {
//         graphDiv.on("plotly_relayout", handleRelayout);
//       }}
//       onLegendClick={(e) => {
//         if (onToggleVisibility) {
//           onToggleVisibility(e.fullData[e.curveNumber].name);
//         }
//       }}
//     />
//   );
// };

// export default VisualChart;

"use client";
import {
  getOverlayLayout,
  getSingleLayout,
  getStackedLayout,
} from "@/utils/chartUtils";
import { formatDateTimeChart } from "@/utils/dateTime";
import dynamic from "next/dynamic";
import React from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const VisualChart = ({
  data,
  onRangeChange,
  onToggleVisibility,
  layoutMode = "overlay",
}) => {
  const layout =
    layoutMode === "single"
      ? getSingleLayout(data)
      : layoutMode === "stacked"
      ? getStackedLayout(data)
      : getOverlayLayout(data);

  const config = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: [
      "zoom",
      "pan2d",
      "select2d",
      "lasso2d",
      "resetScale2d",
      "hoverClosestCartesian",
      "hoverCompareCartesian",
      "toggleSpikelines",
      "toImage",
    ],
    modeBarButtonsToAdd: ["zoomIn2d", "zoomOut2d", "autoScale2d"],
  };

  const handleRelayout = (eventData) => {
    if (eventData["xaxis.range[0]"] && eventData["xaxis.range[1]"]) {
      const startTime = eventData["xaxis.range[0]"];
      const endTime = eventData["xaxis.range[1]"];
      onRangeChange?.(
        formatDateTimeChart(startTime),
        formatDateTimeChart(endTime)
      );
    }

    if (eventData["xaxis.autorange"] === true) {
      onRangeChange?.("FULL_RANGE", "FULL_RANGE");
    }
  };

  return (
    <Plot
      data={data.map((trace, index) => ({
        ...trace,
        yaxis:
          layoutMode === "single"
            ? "y"
            : layoutMode === "stacked"
            ? index === 0
              ? "y"
              : `y${index + 1}`
            : index === 0
            ? "y"
            : `y${index + 1}`,
        visible: trace.visible === false ? "legendonly" : true,

        // ✅ Show tag name + color square + value in hover
        hovertemplate: `<span style="color:${
          trace.line?.color || "#cbd5e1"
        }">▉</span> ${trace.name} : %{y}<extra></extra>`,
      }))}
      layout={layout}
      config={config}
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
      onInitialized={(figure, graphDiv) => {
        graphDiv.on("plotly_relayout", handleRelayout);
      }}
      onLegendClick={(e) => {
        onToggleVisibility?.(e.fullData[e.curveNumber].name);
        return false;
      }}
    />
  );
};

export default VisualChart;

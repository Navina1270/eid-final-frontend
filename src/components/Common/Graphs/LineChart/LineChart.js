"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { formatDateTimeChart } from "@/utils/dateTime";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const LineChart = ({ data, onClickZoom = true, onRangeChange }) => {
  const [open, setOpen] = useState(false);
  const plotRef = useRef(null);

  const colors = [
    "#06b6d4",
    "#3b82f6",
    "#facc15",
    "#f87171",
    "#34d399",
    "#fbbf24",
    "#a78bfa",
    "#10b981",
    "#f97316",
    "#e879f9",
    "#60a5fa",
    "#14b8a6",
    "#f59e0b",
    "#0ea5e9",
    "#f43f5e",
    "#84cc16",
    "#22c55e",
    "#ef4444",
    "#c084fc",
    "#f472b6",
    "#2dd4bf",
    "#fb923c",
    "#93c5fd",
    "#fcd34d",
  ];

  const allTraces = [];
  const hasData = data?.datasets && data.datasets.length > 0;

  data.datasets.forEach((ds, idx) => {
    const groupName = `${ds.label}-${idx}`;

    allTraces.push({
      x: data.labels,
      y: ds.data.map((v) => (isNaN(v) ? null : v)),
      name: ds.label,
      type: "scatter",
      mode: "lines",
      line: { color: colors[idx % colors.length], width: 2 },
      legendgroup: groupName,
    });

    if (ds.minThreshold !== undefined) {
      allTraces.push({
        x: data.labels,
        y: data.labels.map(() => ds.minThreshold),
        type: "scatter",
        mode: "lines",
        line: { color: colors[idx % colors.length], width: 1.5, dash: "dash" },
        legendgroup: groupName,
        showlegend: false,
      });
    }

    if (ds.maxThreshold !== undefined) {
      allTraces.push({
        x: data.labels,
        y: data.labels.map(() => ds.maxThreshold),
        type: "scatter",
        mode: "lines",
        line: { color: colors[idx % colors.length], width: 1.5, dash: "dash" },
        legendgroup: groupName,
        showlegend: false,
      });
    }

    if (ds.scatter) {
      allTraces.push({
        x: ds.scatter.labels,
        y: ds.scatter.data,
        name: ds.scatter.legend || "",
        mode: "markers",
        marker: { color: "rgba(255, 219, 88, 0.5)", size: 6 },
        type: "scatter",
        showlegend: true,
      });
    }
  });

  const getYRange = () => {
    const allValues = data.datasets.flatMap((ds) => {
      const values = ds.data.filter((v) => v !== null && !isNaN(v));
      if (ds.minThreshold !== undefined) values.push(ds.minThreshold);
      if (ds.maxThreshold !== undefined) values.push(ds.maxThreshold);
      return values;
    });
    return [Math.min(...allValues), Math.max(...allValues)];
  };

  const createHighlightTraces = (highlightData, fillColor, groupName) => {
    if (!highlightData?.ranges?.length) return [];
    const [yMin, yMax] = getYRange();
    return highlightData.ranges.map((range, idx) => ({
      x: [range[0], range[1], range[1], range[0], range[0]],
      y: [yMin, yMin, yMax, yMax, yMin],
      type: "scatter",
      mode: "lines",
      fill: "toself",
      fillcolor: fillColor,
      line: { width: 0 },
      name: highlightData.legend,
      showlegend: idx === 0,
      legendgroup: groupName,
    }));
  };

  allTraces.push(
    ...createHighlightTraces(
      data.anomalyHighlight,
      data.anomalyHighlight?.color || "rgba(255,0,0,0.5)",
      "anomaly"
    ),
    ...createHighlightTraces(
      data.startupHighlight,
      "rgba(255,165,0,0.3)",
      "startup"
    ),
    ...createHighlightTraces(
      data.shutdownHighlight,
      "rgba(255,165,0,0.3)",
      "shutdown"
    ),
    ...createHighlightTraces(
      data.downtimeHighlight,
      "rgba(128,128,128,0.3)",
      "downtime"
    )
  );

  const layout = {
    title: { text: data.title, font: { size: 14, color: "#1e293b" } },
    paper_bgcolor: "#ffffff",
    plot_bgcolor: "#ffffff",
    font: { color: "#475569" },
    legend: {
      orientation: "h",
      x: 0.5,
      xanchor: "center",
      y: -0.35,
      yanchor: "top",
    },
    margin: { t: 25, b: 40, l: 40, r: 25 },
    dragmode: "zoom",
    xaxis: {
      title: { text: data.xLabel, font: { size: 12, color: "#475569" } },
      showgrid: true,
      gridcolor: "#f1f5f9",
      zeroline: false,
      tickfont: { color: "#64748b" },
    },
    yaxis: {
      title: { text: data.yLabel, font: { size: 12, color: "#475569" } },
      showgrid: true,
      gridcolor: "#f1f5f9",
      zeroline: false,
      tickfont: { color: "#64748b" },
    },
  };

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
      if (onRangeChange)
        onRangeChange(
          formatDateTimeChart(startTime),
          formatDateTimeChart(endTime)
        );
    }

    if (eventData["xaxis.autorange"] === true) {
      if (onRangeChange) onRangeChange("FULL_RANGE", "FULL_RANGE");
    }
  };

  const chart = (
    <Plot
      ref={plotRef}
      data={allTraces}
      layout={layout}
      config={config}
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
      onInitialized={(figure, graphDiv) => {
        graphDiv.on("plotly_relayout", handleRelayout);
      }}
    />
  );

  return (
    <>
      <div
        onClick={onClickZoom ? () => setOpen(true) : null}
        className={`bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all ${onClickZoom ? "cursor-pointer" : "cursor-default"
          }`}
      >
        <div className="h-60 relative">
          {!hasData ? (
            <div
              className="flex flex-col h-full"
              style={{ fontFamily: '"Open Sans", verdana, arial, sans-serif' }}
            >
              <h3 className="text-sm font-medium mt-1 mb-2 text-center text-slate-800">
                {data.title}
              </h3>

              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm font-semibold text-slate-400">No Data Available</p>
              </div>
            </div>
          ) : (
            chart
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl w-full max-w-5xl relative shadow-2xl border border-slate-200">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              {data.label || data.title}
            </h2>
            <div className="h-[500px] w-full relative">{chart}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LineChart;

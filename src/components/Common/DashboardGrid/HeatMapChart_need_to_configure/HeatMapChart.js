"use client";
import React from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
const HeatMapChart = ({data}) => {

  return (
    <div className="bg-slate-800 rounded-xl p-1 shadow-lg">
      <Plot
        data={[
          {
            z: data.matrix,
            x: data.xTicks,
            y: data.yTicks,
            type: "heatmap",
            colorscale: "Plasma",
            showscale: true,
            text: data.matrix.map((row) => row.map((val) => val.toString())),
            texttemplate: "%{text}",
            textfont: {
              color: "white",
              size: 12,
            },
            hoverongaps: false,
            hoverinfo: "x+y+z",
            colorbar: {
              tickfont: {
                color: "white",
              },
            },
          },
        ]}
        layout={{
          title: "Dynamic Heatmap",
          xaxis: {
            title: {
              text: data.xLabel,
              font: { size: 14, color: "#fff" },
            },
            tickfont: { size: 8, color: "#fff" },

          },
          yaxis: {
            title: {
              text: data.yLabel,
              font: { size: 14, color: "#fff" },
            },
            tickfont: { size: 8, color: "#fff" },
            tickangle: -90,
          },
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          margin: { t: 50, l: 50, b: 50, r: 50 },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default React.memo(HeatMapChart);
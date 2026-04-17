"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@mui/material/styles";

Chart.register(ArcElement, Tooltip, Legend);

const DraggableDonutChart = ({ data }) => {
  const theme = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme.palette.mode);
  const [key, setKey] = useState(0);

  // re-render on theme change
  useEffect(() => {
    setCurrentTheme(theme.palette.mode);
    setKey((prev) => prev + 1);
  }, [theme.palette.mode]);

  const colour = currentTheme === "dark" ? "#fff" : "#000";

  // clone incoming datasets so we can safely add cutout/hover colors
  const predefinedColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
  ];
  const hoverColors = ["#FF4365", "#1E90FF", "#FFD700", "#2EAFAF", "#7744CC"];

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((ds, i) => ({
      ...ds,
      // if parent hasn’t provided an array of background colors, fill them
      backgroundColor: ds.backgroundColor
        ? ds.backgroundColor
        : ds.data.map(
            (_, idx) => predefinedColors[idx % predefinedColors.length]
          ),
      hoverBackgroundColor: ds.hoverBackgroundColor
        ? ds.hoverBackgroundColor
        : ds.data.map((_, idx) => hoverColors[idx % hoverColors.length]),
      cutout: "30%",
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: { color: colour },
      },
      title: {
        display: !!data.title,
        text: data.title,
        position: "bottom",
        font: { weight: "bold" },
        color: colour,
      },
      datalabels: {
        display: true,
        color: colour,
        font: { weight: "bold" },
        formatter: (v) => v.toLocaleString(),
      },
    },
  };

  // Optional center text (you can customize or remove)
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.save();
      const fontSize = height / 18;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = colour;

      ctx.font = `${fontSize}px sans-serif`;
      // ctx.fillText("Distribution", width / 2, height / 2);
      ctx.restore();
    },
  };

  return (
    <Doughnut
      key={key}
      data={chartData}
      options={options}
      plugins={[centerTextPlugin]}
    />
  );
};

export default DraggableDonutChart;

"use client";

import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@mui/material/styles";

Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data }) => {
  const theme = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme.palette.mode);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setCurrentTheme(theme.palette.mode);
    setKey((prevKey) => prevKey + 1); 
  }, [theme.palette.mode, data.avgCostPerWO]);

  const colour = currentTheme === "dark" ? "#fff" : "#000";

  const predefinedColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const hoverColors = ["#FF4365", "#1E90FF", "#FFD700", "#2EAFAF", "#7744CC"];

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.values.map((_, index) => predefinedColors[index % predefinedColors.length]),
        hoverBackgroundColor: data.values.map((_, index) => hoverColors[index % hoverColors.length]),
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: data.title,
        position: "bottom",
        font: {
          weight: "bold",
        },
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      },
      datalabels: {
        display: true,
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
        font: {
          weight: 'bold',
        },
        formatter: (value) => value.toLocaleString(), 
      },
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.save();
      const fontSize = height / 15;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const text1 = `${data.avgCostPerWO}$`;
      const text2 = "Avg. Cost";
      const text3 = "per workorder";
      const x = width / 2;
      const y = height / 2;

      ctx.fillStyle = colour;

      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillText(text1, x, y - 35);
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillText(text2, x, y - 20);
      ctx.fillText(text3, x, y - 5);
      ctx.restore();
    },
  };

  return (
    <Doughnut key={key} data={chartData} options={options} plugins={[centerTextPlugin]} />
  );
};

export default DonutChart;

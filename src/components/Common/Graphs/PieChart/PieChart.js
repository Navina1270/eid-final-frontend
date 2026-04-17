"use client";

import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@mui/material/styles";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({data}) => {
  const theme = useTheme();

  console.log("PieChart data:", data);
  if (!data || !data.labels || !data.datasets) {
    return <div>No data available</div>;
  }

  const predefinedColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const hoverColors = ["#FF4365", "#1E90FF", "#FFD700", "#2EAFAF", "#7744CC"];

  // const chartData = {
  //   labels: data.labels,
  //   datasets: [
  //     {
  //       data: data.data,
  //       backgroundColor: data.data.map((_, index) => predefinedColors[index % predefinedColors.length]),
  //       hoverBackgroundColor: data.data.map((_, index) => hoverColors[index % hoverColors.length]),
  //     },
  //   ],
  // };

    const chartData = {
      labels: data.labels,
      datasets: data.datasets, // <-- use parent’s datasets
    };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
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
    }
  };

  return (
    <Pie data={chartData} options={options} />
  );
};

export default PieChart;

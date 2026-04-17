"use client";

import { PolarArea } from "react-chartjs-2";
import { Chart, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@mui/material/styles";

Chart.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = ({data}) => {
  const theme = useTheme();

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
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return (
    // <div style={{ width: "50%" }}>
      <PolarArea data={data} options={options} />
      // </div>
  );
};

export default PolarAreaChart;

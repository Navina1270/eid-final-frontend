// "use client";

// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// const DraggableBarChart = ({ data }) => {
//   console.log("BarChart data:", data);

//   if (!data || !data.labels || !data.datasets) {
//     return <div>No data available</div>;
//   }

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: "bottom",
//       },
//       title: {
//         display: !!data.title,
//         text: data.title,
//         position: "top",
//         font: {
//           weight: "bold",
//         },
//         color: "#000",
//       },
//       datalabels: {
//         display: true,
//         color: "#000",
//         font: {
//           weight: "bold",
//         },
//         formatter: (value) => value.toLocaleString(),
//       },
//     },
//   };

//   const chartData = {
//     labels: data.labels,
//     datasets: data.datasets, // use parent’s datasets directly
//   };

//   return <Bar data={chartData} options={options} />;
// };

// export default DraggableBarChart;


"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DraggableBarChart = ({ data }) => {
  if (!data || !data.labels || !data.datasets) {
    return <div>No data available</div>;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allow full height resize
    plugins: {
      legend: { display: true, position: "bottom" },
      title: {
        display: !!data.title,
        text: data.title,
        position: "top",
        font: { weight: "bold" },
        color: "#000",
      },
      datalabels: {
        display: true,
        color: "#000",
        font: { weight: "bold" },
        formatter: (value) => value.toLocaleString(),
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: data.datasets,
  };

  return (
    // 🔑 make the wrapper fill the parent grid cell
    <div className="w-full h-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DraggableBarChart;

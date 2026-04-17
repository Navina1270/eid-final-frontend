// pages/index.tsx or wherever you want to show this
"use client";
import DashboardGrid from "@/components/Common/DashboardGrid/DashboardGrid";
import { useState } from "react";

export default function Test() {
//   const [responseData, setResponseData] = useState([
//     {
//       // id: "2",
//       type: "bar",
//       title: "Order by Order Type",
//       labels: ["PM01", "PM04", "PM06"],
//       datasets: [
//         {
//           label: "Sales",
//           data: [64, 30, 16],
//         },
//       ],
//     },

//     {
//       type: "line",
//       title: "Sales vs Revenue",
//       labels: ["Jan", "Feb", "Mar"],
//       datasets: [
//         {
//           label: "Sales",
//           data: [30, 50, 70],
//         },
//         {
//           label: "Revenue",
//           data: [40, 60, 80],
//         },
//       ],
//     },
//     {
//       id: "3",
//       title: "Monthly Report",
//       type: "table",
//       content: {
//         headers: ["Month", "Sales", "Profit"],
//         rows: [
//           ["Jan", 1000, 300],
//           ["Feb", 1200, 350],
//           ["Mar", 900, 280],
//         ],
//       },
//     },
//   ]);

    const [responseData, setResponseData] = useState([
      {
        type: "gauge",
        title: "Completion Rate Total",
        value: 60.0,
        maxValue: 100,
        unit: "%",
        label: "Completion Rate",
      },

      {
        type: "bar",
        title: "Top 10 Equipment by Work Order Count",
        labels: [
          "0001",
          "0002",
          "0001B",
          "0001",
          "0002",
          "0002",
          "0050B",
          "0005A/B",
        ],
        datasets: [
          {
            label: "WorkOrderCount",
            data: [70, 22, 6, 6, 20, 20, 10, 10],
            backgroundColor: "#FF6384",
          },
          {
            label: "WorkOrderCount Completed",
            data: [50, 12, 30, 50, 20, 10, 0, 10],
            backgroundColor: "#36A2EB",
          },
        ],
      },
      {
        type: "pie",
        title: "Work Order Priority Distribution",
        labels: [
          "Norm-Sch within 10 D",
          "Normal",
          "Med-Sch within 10day",
          "Urg.-Start W/in 48Hr",
          "Emerg.-Start Immed.",
          "Low-Sch within 30day",
          "Urgent",
          "Long Range Planning",
        ],
        datasets: [
          {
            label: "Count Distribution",
            data: [41, 27, 15, 10, 8, 4, 3, 2],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C9CBCF",
              "#8E5EA2",
            ],
          },
        ],
      },
      {
        type: "line",
        title: "Sales vs Revenue",
        labels: ["Jan", "Feb", "Mar"],
        datasets: [
          {
            label: "Sales",
            data: [30, 50, 70],
            // borderColor: "#36A2EB",
            backgroundColor: "#36A2EB",
          },
          {
            label: "Revenue",
            data: [40, 60, 80],
            backgroundColor: "#FFCE56",
            // borderColor: "#FFCE56",
          },
        ],
      },
      {
        type: "doughnut",
        title: "Maintenance Activity Type Distribution",
        labels: [
          "01B",
          "01A",
          "06A",
          "4MA",
          "01C",
          "4PC",
          "4DG",
          "4SC",

        ],
        datasets: [
          {
            label: "Count Distribution",
            data: [26, 24, 16, 11, 10, 7, 4, 4],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C9CBCF",
              "#8E5EA2",
    
            ],
          },
        ],
      },
    ]); // Start with an empty array

 
  return (
    <div className="p-1">
      <DashboardGrid initialItems={responseData} />
    </div>
  );
}

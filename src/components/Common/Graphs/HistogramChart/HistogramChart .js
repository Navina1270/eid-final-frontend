// 'use client';

// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// const computeFDBins = (values) => {
//   if (!values || values.length < 2) {
//     throw new Error("At least two values are required.");
//   }

//   const sorted = [...values].sort((a, b) => a - b);
//   const n = sorted.length;

//   // Helper percentile function
//   const percentile = (arr, percent) => {
//     const rank = (percent / 100) * (arr.length - 1);
//     const lower = Math.floor(rank);
//     const upper = Math.ceil(rank);

//     if (lower === upper) return arr[lower];
//     const weight = rank - lower;
//     return arr[lower] * (1 - weight) + arr[upper] * weight;
//   };

//   const q1 = percentile(sorted, 25);
//   const q3 = percentile(sorted, 75);
//   const iqr = q3 - q1;

//   if (iqr === 0) return 1; // flat data

//   const binWidth = (2 * iqr) / Math.cbrt(n);
//   const range = sorted[n - 1] - sorted[0];

//   return Math.max(1, Math.ceil(range / binWidth));
// };

// const createHistogram = (values) => {
//   const min = Math.min(...values);
//   const max = Math.max(...values);

//   const numBins = computeFDBins(values); 

//   const binSize = Math.ceil((max - min + 1) / numBins);

//   const bins = new Array(numBins).fill(0);
//   const labels = [];

//   for (let i = 0; i < numBins; i++) {
//     const binStart = (min + i * binSize).toFixed(1);
//     const binEnd = (binStart + binSize - 1).toFixed(1);
//     labels.push(`${binStart}-${binEnd}`);
//   }

//   values.forEach((value) => {
//     let index = Math.floor((value - min) / binSize);
//     if (index >= numBins) index = numBins - 1; 
//     bins[index]++;
//   });

//   return { labels, counts: bins };
// };

// const HistogramChart = ({ data, binSize = 10, darkMode = true }) => {
//   const { labels, counts } = createHistogram(data.data, binSize);

//   const generateColor = () => `hsl(${Math.random() * 360}, 60%, 60%)`;

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: 'Frequency',
//         data: counts,
//         backgroundColor: generateColor(),
//         borderColor: darkMode ? '#f1f5f9' : '#1e293b',
//         borderWidth: 1,
//         borderRadius: 0,
//         barPercentage: 1.0,
//         categoryPercentage: 1.0,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       datalabels: {
//         display: true,
//         color: darkMode ? '#f1f5f9' : '#1e293b',
//         font: { weight: 'bold' },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: data.xLabel,
//           color: darkMode ? '#f1f5f9' : '#1e293b',
//         },
//         ticks: {
//           color: darkMode ? '#f1f5f9' : '#1e293b',
//           font: { weight: 'bold' },
//         },
//         grid: {
//           color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: data.yLabel,
//           color: darkMode ? '#f1f5f9' : '#1e293b',
//         },
//         ticks: {
//           color: darkMode ? '#f1f5f9' : '#1e293b',
//         },
//         grid: {
//           color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
//         },
//       },
//     },
//   };

//   return (
//     <div className={`p-4 rounded-xl shadow-md w-full h-96 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// };

// export default React.memo(HistogramChart)


'use client';

import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// ✅ Computes optimal bin count using Freedman–Diaconis rule with cap
const computeFDBins = (values, maxBins = 100) => {
  if (!values || values.length < 2) return 1;

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  const percentile = (arr, percent) => {
    const rank = (percent / 100) * (arr.length - 1);
    const lower = Math.floor(rank);
    const upper = Math.ceil(rank);
    if (lower === upper) return arr[lower];
    const weight = rank - lower;
    return arr[lower] * (1 - weight) + arr[upper] * weight;
  };

  const q1 = percentile(sorted, 25);
  const q3 = percentile(sorted, 75);
  const iqr = q3 - q1;

  if (iqr === 0) return 1;

  const binWidth = (2 * iqr) / Math.cbrt(n);
  const range = sorted[n - 1] - sorted[0];
  const estimatedBins = Math.ceil(range / binWidth);

  return Math.min(Math.max(1, estimatedBins), maxBins);
};

// ✅ Creates histogram bins and counts safely
const createHistogram = (values, binSize = null) => {
  if (!values || values.length === 0) return { labels: [], counts: [] };

  const min = Math.min(...values);
  const max = Math.max(...values);
  const safeBinSize = binSize || Math.max(1, Math.ceil((max - min + 1) / computeFDBins(values)));
  const numBins = Math.ceil((max - min + 1) / safeBinSize);

  const bins = new Array(numBins).fill(0);
  const labels = [];

  for (let i = 0; i < numBins; i++) {
    const binStart = (min + i * safeBinSize).toFixed(1);
    const binEnd = (parseFloat(binStart) + safeBinSize - 1).toFixed(1);
    labels.push(`${binStart}-${binEnd}`);
  }

  values.forEach((value) => {
    let index = Math.floor((value - min) / safeBinSize);
    if (index >= numBins) index = numBins - 1;
    bins[index]++;
  });

  return { labels, counts: bins };
};

const HistogramChart = ({ data, binSize = null, darkMode = true }) => {
  const histogram = useMemo(() => {
    try {
      return createHistogram(data?.data || [], binSize);
    } catch (e) {
      console.error('Error creating histogram:', e);
      return { labels: [], counts: [] };
    }
  }, [data?.data, binSize]);

  const generateColor = () => `hsl(${Math.random() * 360}, 60%, 60%)`;

  const chartData = {
    labels: histogram.labels,
    datasets: [
      {
        label: 'Frequency',
        data: histogram.counts,
        backgroundColor: generateColor(),
        borderColor: darkMode ? '#f1f5f9' : '#1e293b',
        borderWidth: 1,
        borderRadius: 0,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        display: true,
        color: darkMode ? '#f1f5f9' : '#1e293b',
        font: { weight: 'bold' },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: data?.xLabel || 'X Axis',
          color: darkMode ? '#f1f5f9' : '#1e293b',
        },
        ticks: {
          color: darkMode ? '#f1f5f9' : '#1e293b',
          font: { weight: 'bold' },
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        },
      },
      y: {
        title: {
          display: true,
          text: data?.yLabel || 'Count',
          color: darkMode ? '#f1f5f9' : '#1e293b',
        },
        ticks: {
          color: darkMode ? '#f1f5f9' : '#1e293b',
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        },
      },
    },
  };

  return (
    <div className={`p-4 rounded-xl shadow-md w-full h-96 ${darkMode ? 'bg-slate-700' : 'bg-white'}`}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default React.memo(HistogramChart);

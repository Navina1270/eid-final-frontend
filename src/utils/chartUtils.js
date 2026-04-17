// export const getOverlayLayout = (data) => {
//   const axisSpacing = 0.04;
//   const totalSpace = axisSpacing * (data.length - 0.75);

//   // Check if all signals are hidden
//   const allHidden = data.every((signal) => signal.visible === false);

//   const layout = {
//     paper_bgcolor: "#334155",
//     plot_bgcolor: "#334155",
//     font: { color: "#cbd5e1" },
//     xaxis: {
//       title: "Time",
//       automargin: true,
//       domain: [totalSpace, 1],
//       anchor: `y${data.length}`,
//       showline: true,
//       linecolor: "#475569",

//       // ✅ Show vertical gridlines only when at least one tag visible
//       showgrid: !allHidden,
//       gridcolor: !allHidden ? "#475569" : "transparent",

//       zeroline: false,
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

//   data.forEach((signal, index) => {
//     const axisName = index === 0 ? "yaxis" : `yaxis${index + 1}`;
//     const isVisible = signal.visible !== false;

//     layout[axisName] = {
//       title: isVisible ? signal.name : "",
//       side: "left",
//       overlaying: index === 0 ? undefined : "y",
//       position: index * axisSpacing,
//       automargin: true,

//       showline: isVisible,
//       linecolor: signal.line?.color || "#cbd5e1",
//       linewidth: 1,
//       ticks: isVisible ? "outside" : "",
//       ticklen: isVisible ? 8 : 0,
//       tickwidth: isVisible ? 2 : 0,
//       tickcolor: signal.line?.color || "#cbd5e1",
//       showticklabels: isVisible,

//       // ❌ No horizontal gridlines
//       showgrid: false,
//       gridcolor: "transparent",
//       zeroline: false,
//     };
//   });

//   return layout;
// };

// export const getSingleLayout = (data) => {
//   const signal = data[0];

//   const isVisible = signal?.visible !== false;

//   const layout = {
//     paper_bgcolor: "#334155",
//     plot_bgcolor: "#334155",
//     font: { color: "#cbd5e1" },

//     xaxis: {
//       title: "Time",
//       automargin: true,
//       domain: [0, 1],
//       anchor: "y",
//       showline: true,
//       linecolor: "#475569",
//       showgrid: isVisible,
//       gridcolor: isVisible ? "#475569" : "transparent",
//       zeroline: false,
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

//   layout["yaxis"] = {
//     title: "", // keep blank title if hidden
//     side: "left",
//     showline: true, // always show axis line
//     linecolor: "#cbd5e1", // axis line color
//     linewidth: 1,
//     ticks: "outside", // always show tick marks
//     ticklen: 8,
//     tickwidth: 2,
//     tickcolor: "#cbd5e1",
//     showticklabels: true, // always show range labels
//     showgrid: false, // no horizontal grid lines
//     zeroline: false,
//     range: signal?.range || undefined, // optional, keeps range if provided
//   };

//   return layout;
// };

// export const getStackedLayout = (data) => {
//   const numSignals = data.length;
//   const gap = 0.02; // spacing between stacked plots
//   const domainHeight = (1 - gap * (numSignals - 1)) / numSignals;

//   const layout = {
//     paper_bgcolor: "#334155",
//     plot_bgcolor: "#334155",
//     font: { color: "#cbd5e1" },
//     xaxis: {
//       title: "Time",
//       automargin: true,
//       domain: [0, 1],
//       gridcolor: "#475569",
//       anchor: `y${numSignals}`, // bottom-most y-axis
//     },
//     legend: {
//       orientation: "h",
//       x: 0.5,
//       xanchor: "center",
//       y: -0.05,
//       yanchor: "top",
//     },
//     margin: { t: 25, b: 40, l: 45, r: 35 },
//     dragmode: "zoom",
//     shapes: [], // background bands
//   };

//   data.forEach((signal, index) => {
//     const axisName = index === 0 ? "yaxis" : `yaxis${index + 1}`;

//     // Compute vertical domain with gap
//     const domainStart = 1 - (index + 1) * domainHeight - index * gap;
//     const domainEnd = 1 - index * domainHeight - index * gap;
//     const isVisible = signal.visible !== false;

//     // 🎨 Add alternating gray background bands
//     if (index % 2 === 0) {
//       layout.shapes.push({
//         type: "rect",
//         xref: "paper",
//         yref: "paper",
//         x0: 0,
//         x1: 1,
//         y0: domainStart,
//         y1: domainEnd,
//         fillcolor: "rgba(120, 120, 120, 0.15)", // soft gray overlay
//         line: { width: 0 },
//         layer: "below",
//       });
//     }

//     // 📊 Configure each Y-axis panel
//     layout[axisName] = {
//       title: isVisible ? signal.name : "",
//       side: "left",
//       showline: true,
//       linecolor: signal.line?.color || "#cbd5e1",
//       linewidth: 1,
//       ticks: isVisible ? "outside" : "",
//       ticklen: isVisible ? 8 : 0,
//       tickwidth: 2,
//       tickcolor: signal.line?.color || "#cbd5e1",
//       showticklabels: isVisible,
//       showgrid: true,
//       gridcolor: "#475569",
//       zeroline: false,
//       domain: [domainStart, domainEnd],
//       anchor: index === numSignals - 1 ? "x" : undefined,
//     };
//   });

//   return layout;
// };

export const getSingleLayout = (data) => {
  const signal = data[0];
  const isVisible = signal?.visible !== false;

  const layout = {
    paper_bgcolor: "#334155",
    plot_bgcolor: "#334155",
    font: { color: "#cbd5e1" },

    xaxis: {
      title: "Time",
      automargin: true,
      domain: [0, 1],
      anchor: "y",
      showline: true,
      linecolor: "#475569",
      showgrid: isVisible,
      gridcolor: isVisible ? "#475569" : "transparent",
      zeroline: false,

      // ✅ Match overlay layout vertical hover line
      showspikes: true,
      spikemode: "across",
      spikesnap: "cursor",
      spikecolor: "rgba(255,255,255,0.5)", // semi-transparent white
      spikethickness: 1, // thinner line
      spikedash: "dash", // dashed
      spikevalign: "bottom", // timestamp at bottom
    },

    yaxis: {
      title: "",
      side: "left",
      showline: true,
      linecolor: "#cbd5e1",
      linewidth: 1,
      ticks: "outside",
      ticklen: 8,
      tickwidth: 2,
      tickcolor: "#cbd5e1",
      showticklabels: true,
      showgrid: false,
      zeroline: false,
      range: signal?.range || undefined,
    },

    legend: { visible: false }, // hide legend

    margin: { t: 25, b: 40, l: 40, r: 25 },
    dragmode: "zoom",
    hovermode: "x", // hover along x-axis
    hoverlabel: {
      namelength: 0, // remove tag names
    },
  };

  return layout;
};

export const getOverlayLayout = (data) => {
  const axisSpacing = 0.04;
  const totalSpace = axisSpacing * (data.length - 0.75);

  const allHidden = data.every((signal) => signal.visible === false);

  const layout = {
    paper_bgcolor: "#334155",
    plot_bgcolor: "#334155",
    font: { color: "#cbd5e1" },
    xaxis: {
      title: "Time",
      automargin: true,
      domain: [totalSpace, 1],
      anchor: `y${data.length}`,
      showline: true,
      linecolor: "#475569",
      showgrid: !allHidden,
      gridcolor: !allHidden ? "#475569" : "transparent",
      zeroline: false,

      // ✅ Vertical hover line
      showspikes: true,
      spikemode: "across",
      spikesnap: "cursor",
      spikecolor: "rgba(255,255,255,0.5)", // white with opacity
      spikethickness: 1, // thinner line
      spikedash: "dash", // dashed line
      spikevalign: "bottom", // timestamp at bottom
    },
    legend: {
      orientation: "h",
      x: 0.5,
      xanchor: "center",
      y: -0.05,
      yanchor: "top",
      visible: false, // hide legend if desired
    },
    margin: { t: 25, b: 40, l: 40, r: 25 },
    dragmode: "zoom",
    hovermode: "x", // hover along x-axis
    hoverlabel: { namelength: 0 }, // remove tag names
  };

  // Add multiple y-axes
  data.forEach((signal, index) => {
    const axisName = index === 0 ? "yaxis" : `yaxis${index + 1}`;
    const isVisible = signal.visible !== false;

    layout[axisName] = {
      title: isVisible ? "" : "", // keep title blank
      side: "left",
      overlaying: index === 0 ? undefined : "y",
      position: index * axisSpacing,
      automargin: true,

      showline: isVisible,
      linecolor: signal.line?.color || "#cbd5e1",
      linewidth: 1,
      ticks: isVisible ? "outside" : "",
      ticklen: isVisible ? 8 : 0,
      tickwidth: isVisible ? 2 : 0,
      tickcolor: signal.line?.color || "#cbd5e1",
      showticklabels: isVisible,

      showgrid: false,
      gridcolor: "transparent",
      zeroline: false,
      range: signal?.range || undefined,
    };
  });

  return layout;
};

export const getStackedLayout = (data) => {
  const numSignals = data.length;
  const gap = 0.02; // spacing between stacked plots
  const domainHeight = (1 - gap * (numSignals - 1)) / numSignals;

  const layout = {
    paper_bgcolor: "#334155",
    plot_bgcolor: "#334155",
    font: { color: "#cbd5e1" },

    xaxis: {
      title: "Time",
      automargin: true,
      domain: [0, 1],
      anchor: `y${numSignals}`,
      showline: true,
      linecolor: "#475569",
      gridcolor: "#475569",
      zeroline: false,

      // ✅ Same vertical hover line style as overlay layout
      showspikes: true,
      spikemode: "across",
      spikesnap: "cursor",
      spikecolor: "rgba(255,255,255,0.5)", // white with opacity
      spikethickness: 1, // thinner line
      spikedash: "dash", // dashed line
      spikevalign: "bottom", // timestamp at bottom
    },

    // ✅ Keep hover consistent
    hovermode: "x",
    hoverlabel: { namelength: 0 },

    legend: { visible: false },
    margin: { t: 25, b: 40, l: 45, r: 35 },
    dragmode: "zoom",
    shapes: [],
  };

  data.forEach((signal, index) => {
    const axisName = index === 0 ? "yaxis" : `yaxis${index + 1}`;
    const domainStart = 1 - (index + 1) * domainHeight - index * gap;
    const domainEnd = 1 - index * domainHeight - index * gap;
    const isVisible = signal.visible !== false;

    // Alternating background bands
    if (index % 2 === 0) {
      layout.shapes.push({
        type: "rect",
        xref: "paper",
        yref: "paper",
        x0: 0,
        x1: 1,
        y0: domainStart,
        y1: domainEnd,
        fillcolor: "rgba(120,120,120,0.15)",
        line: { width: 0 },
        layer: "below",
      });
    }

    layout[axisName] = {
      title: "",
      side: "left",
      showline: true,
      linecolor: signal.line?.color || "#cbd5e1",
      linewidth: 1,
      ticks: isVisible ? "outside" : "",
      ticklen: isVisible ? 8 : 0,
      tickwidth: 2,
      tickcolor: signal.line?.color || "#cbd5e1",
      showticklabels: isVisible,
      showgrid: true,
      gridcolor: "#475569",
      zeroline: false,
      domain: [domainStart, domainEnd],
      anchor: index === numSignals - 1 ? "x" : undefined,
    };
  });

  return layout;
};

export const visualResponse = {
  statusCode: 200,
  message: "Visuals List fetched successfully...!",
  data: [
    {
      id: "111",
      name: "LP Compressor",
      createdOn: "",
    },
    {
      id: "222",
      name: "LP Compressor",
      createdOn: "",
    },
  ],
};

export const visualChartResponse = {
  statusCode: 200,
  visualId: "VisualId",
  visualName: "Visual Name",
  message: "Visual fetched successfully...!",
  data: [
    {
      tagGraph: [
        {
          x: [1, 2, 3, 4],
          y: [50000, 200000, 350000, 420000],
          // type: "scatter",
          mode: "lines",
          name: "Pressure",
          yaxis: "y", // main axis
          line: { color: "teal" },
        },
        {
          x: [1, 2, 3, 4],
          y: [0.5, 1.5, 2.5, 3.8],
          // type: "scatter",
          mode: "lines",
          name: "Flow",
          yaxis: "y2", // second axis
          line: { color: "dodgerblue" },
        },
        {
          x: [1, 2, 3, 4],
          y: [200, 400, 800, 1000],
          // type: "scatter",
          mode: "lines",
          name: "Volume",
          yaxis: "y3", // third axis
          line: { color: "purple" },
        },
      ],
    },
    {
      tagTable: [
        {
          Name: "Pressure",
          Description: "420000",
        },
        {
          Name: "Flow",
          Description: "3.8",
        },
        {
          Name: "Volume",
          Description: "1000",
        },
      ],
    },
  ],
};

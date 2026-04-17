// import {
//   BarElement,
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
// } from "chart.js";
// import { useEffect, useState } from "react";
// import GridLayout from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// import TableCard from "../TableCard/TableCard";
// import DraggableBarChart from "./DraggableBarChart/DraggableBarChart";
// import DraggablePieChart from "./DraggablePieChart/DraggablePieChart";
// import DraggableLineChart from "./DraggableLineChart/DraggableLineChart";
// import DraggableDonutChart from "./DraggableDonutChart/DraggableDonutChart";
// import DraggableGauge from "../DashboardGrid/DraggableGauge/DraggableGauge";
// export default function DashboardGrid({ initialItems = [] }) {
//   const [items, setItems] = useState(initialItems);
//   const [layout, setLayout] = useState([]);

//   useEffect(() => {
//     const saved = localStorage.getItem("dashboard");
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       console.log("Loaded from localStorage:", parsed);
//       setItems(parsed.items || []);
//       setLayout(parsed.layout || []);
//     } else {
//       console.log("Using initialItems:", initialItems);
//       const initialLayout = initialItems.map((item, index) => ({
//         i: item.id || index.toString(),
//         x: (index * 3) % 12,
//         y: Math.floor(index / 3),
//         w: 3,
//         h: 3,
//       }));
//       setLayout(initialLayout);
//     }
//   }, [initialItems]);

//   useEffect(() => {
//     console.log("Final items:", items);
//     console.log("Final layout:", layout);
//   }, [items, layout]);

//   const saveLayout = () => {
//     const data = { items, layout };
//     localStorage.setItem("dashboard", JSON.stringify(data));
//     alert("Layout saved!");
//   };

//   const exportLayout = () => {
//     const data = { items, layout };
//     const blob = new Blob([JSON.stringify(data, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "dashboard-layout.json";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Function to remove an item and its layout
//   const removeItem = (id) => {
//     console.log("Removing item with id:", id);
//     const newItems = items.filter((item) => (item.id || "") !== id);
//     const newLayout = layout.filter((l) => l.i !== id);
//     setItems(newItems);
//     setLayout(newLayout);
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4 flex gap-4">
//         <button
//           onClick={saveLayout}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Save Layout
//         </button>
//         <button
//           onClick={exportLayout}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Export as JSON
//         </button>
//       </div>

//       <GridLayout
//         className="layout"
//         layout={layout}
//         onLayoutChange={(newLayout) => setLayout(newLayout)}
//         cols={12}
//         rowHeight={100}
//         width={1500}
//         isDraggable
//         isResizable
//       >
//         {items.map((item, index) => {
//           const id = item.id || index.toString();
//           return (
//             <div
//               key={id}
//               className="bg-white dark:bg-gray-800 rounded shadow p-4 relative"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => removeItem(id)}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
//                 title="Remove"
//               >
//                 &times;
//               </button>

//               <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
//                 {item.title}
//               </h2>

//               {item.type === "bar" && (
//                 <DraggableBarChart
//                   data={{
//                     labels: item.labels,
//                     datasets: item.datasets.map((ds, idx) => ({
//                       label: ds.label,
//                       data: ds.data,
//                       backgroundColor:
//                         ds.backgroundColor || getRandomColor(idx),
//                     })),
//                   }}
//                   legend={true}
//                   label={true}
//                 />
//               )}

//               {item.type === "line" && (
//                 <DraggableLineChart
//                   data={{
//                     labels: item.labels,
//                     datasets: item.datasets.map((ds, idx) => ({
//                       label: ds.label,
//                       data: ds.data,
//                       borderColor: ds.backgroundColor,
//                       backgroundColor: ds.backgroundColor || "rgba(0,0,0,0.05)",
//                       // fill:  true,
//                     })),
//                   }}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                   }}
//                 />
//               )}

//               {item.type === "table" && <TableCard content={item.content} />}
//               {item.type === "pie" && (
//                 <DraggablePieChart
//                   data={{
//                     labels: item.labels,
//                     datasets: item.datasets.map((ds, idx) => ({
//                       label: ds.label,
//                       data: ds.data,
//                       backgroundColor:
//                         ds.backgroundColor || getRandomColor(idx),
//                     })),
//                   }}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                   }}
//                 />
//               )}

//               {item.type === "doughnut" && (
//                 <DraggableDonutChart
//                   data={{
//                     labels: item.labels,
//                     title: item.title,
//                     datasets: item.datasets.map((ds, idx) => ({
//                       label: ds.label,
//                       data: ds.data,
//                       backgroundColor:
//                         ds.backgroundColor || getRandomColor(idx),
//                     })),
//                   }}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                   }}
//                 />
//               )}

//               {item.type === "gauge" && (
//                 <DraggableGauge
//                   // type="semicircle"
//                   value={item.value}
//                   maxValue={item.maxValue || 100}
//                   unit={item.unit || "%"}
//                   label={item.label || item.title || "Gauge"}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </GridLayout>
//     </div>
//   );
// }

// // Helper for random colors
// function getRandomColor(index) {

//   console.log("Getting color for index:", index);
//   const colors = [
//     "rgba(75,192,192,0.6)",
//     "rgba(153,102,255,0.6)",
//     "rgba(255,159,64,0.6)",
//     "rgba(255,99,132,0.6)",
//     "rgba(54,162,235,0.6)",
//   ];
//   return colors[index % colors.length];
// }


"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DraggableBarChart from "./DraggableBarChart/DraggableBarChart";
import DraggableLineChart from "./DraggableLineChart/DraggableLineChart";
import DraggablePieChart from "./DraggablePieChart/DraggablePieChart";
import DraggableDonutChart from "../DashboardGrid/DraggableDonutChart/DraggableDonutChart";
import DraggableGauge from "../DashboardGrid/DraggableGauge/DraggableGauge";
import ModalComponent from "../ModalComponent/ModalComponent";
// import TableCard from "../TableCard/TableCard";
// import { FolderIcon, RectangleGroupIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon,PencilIcon, } from "@heroicons/react/24/solid";
export default function DashboardGrid({ initialItems = [] }) {
  const [items, setItems] = useState(initialItems);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("dashboard");
    if (saved) {
      const parsed = JSON.parse(saved);
      setItems(parsed.items || []);
      setLayout(parsed.layout || []);
    } else {
      setLayout(
        initialItems.map((item, idx) => ({
          i: item.id || idx.toString(),
          x: (idx * 3) % 12,
          y: Math.floor(idx / 3),
          w: 3,
          h: 3,
        }))
      );
    }
  }, [initialItems]);

  const addItem = (type) => {
    console.log("Adding new item of type:", type);
    const id = `item-${Date.now()}`;

    // const result = initialItems.find((item) => item.type == type);
    const result = initialItems.find((item) => item.type === type) || {
      type,
    };

    const newItem = {
      id,
      ...result,
    };
    console.log("newItem============:", newItem);
    setItems((prev) => [...prev, newItem]);
    // setLayout((prev) => [...prev, { i: id, x: 0, y: Infinity, w: 3, h: 3 }]);
    setLayout((prev) => [
      ...prev,
      {
        i: id,
        x: 0,
        y: Infinity,
        w: type == "heading" ? 10 : 3, // 👈 full width
        h: type == "heading" ? 1 : 3, // shorter height
      },
    ]);
  };

  // const onDrop = (layout, layoutItem, _event) => {
  //   // type comes from the dataTransfer payload
  //   const type = _event.dataTransfer.getData("chart/type");
  //   if (type) addItem(type);
  // };

  const onDrop = (currentLayout, layoutItem, event) => {
    const type = event.dataTransfer.getData("chart/type");
    if (!type) return;

    const id = `item-${Date.now()}`;
    const base = initialItems.find((it) => it.type === type) || { type };

    const newItem = { id, ...base };

    // use layoutItem.x / layoutItem.y coming from react-grid-layout
    const newLayout = {
      i: id,
      x: layoutItem.x,
      y: layoutItem.y,
      w: type === "heading" ? 10 : 3,
      h: type === "heading" ? 1 : 3,
    };

    setItems((prev) => [...prev, newItem]);
    setLayout((prev) => [...prev, newLayout]);
  };


  // Simple draggable tile for the palette
  const DraggableTile = ({ type }) => (
    <div
      className="p-1 mb-2 bg-gray-200 dark:bg-gray-700 rounded cursor-move text-center"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("chart/type", type)}
    >
      {type.toUpperCase()}
    </div>
  );

  const saveLayout = () => {
    const data = { items, layout };
    localStorage.setItem("dashboard", JSON.stringify(data));
    alert("Layout saved!");
  };

  // --- add this inside DashboardGrid() ---
  const removeItem = (id) => {

    console.log("Removing item with id:", id);
    setItems((prev) => prev.filter((it) => it.id !== id));
    setLayout((prev) => prev.filter((l) => l.i !== id));
  };

  const exportLayout = () => {
    const data = { items, layout };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-layout.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openSettings = (item) => {
    console.log("Opening settings for item:", item);
    // if (!item) {
    //   console.error("openSettings called with null item");
    //   return;
    // }
    setSelectedItem(item);
    setSettingsOpen(true);
  };
  const closeSettings = () => setSettingsOpen(false);

  const [formData, setFormData] = useState({
    dataSource: "",
    asset: "",
    tag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex w-full">
      {/* ===== Left: Grid Area ===== */}

      <div className="flex-1">
        {/* <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={90}
          width={1200}
          isDroppable
          droppingItem={{ i: "new", w: 3, h: 3 }}
          onDrop={onDrop}
          onLayoutChange={(l) => setLayout(l)}
          draggableCancel=".settings-button" // 👈 prevent drag on these elements
        > */}
         <GridLayout
  className="layout"
  layout={layout}
  cols={12}
  rowHeight={90}
  width={1200}
  isDroppable
  droppingItem={{ i: "preview", w: 3, h: 3 }}
  onDrop={onDrop}
  onLayoutChange={(l) => setLayout(l)}
  draggableCancel=".settings-button"
>

          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded  p-1"
            >
              {item.type != 'heading' && <button
                onClick={() => openSettings(item)}
                className="settings-button absolute top-2 right-2 z-30
                   text-gray-500 hover:text-blue-600 mr-4"
                title="Settings"
              >
                <Cog6ToothIcon className="h-6 w-6 " />
              </button>}
              {/* 🗑 remove button */}
              <button
                onClick={() => removeItem(item.id)}
                className="settings-button absolute top-2 right-2 z-30 text-red-600 font-bold  hover:text-red-600"
                title="Delete"
              >
                ✕
              </button>
              <h2 className="text-lg font-semibold mb-1 mr-4">{item.title}</h2>
              {/* Render chart component here based on item.type */}
              <div className="text-sm text-gray-500">
                {/* [{item.type} chart] */}
                {item.type === "bar" && (
                  <DraggableBarChart
                    data={{
                      labels: item.labels,
                      datasets: item.datasets.map((ds, idx) => ({
                        label: ds.label,
                        data: ds.data,
                        backgroundColor:
                          ds.backgroundColor || getRandomColor(idx),
                      })),
                    }}
                    legend={true}
                    label={true}
                  />
                )}
                {item.type === "line" && (
                  <DraggableLineChart
                    data={{
                      labels: item.labels,
                      datasets: item.datasets.map((ds, idx) => ({
                        label: ds.label,
                        data: ds.data,
                        borderColor: ds.backgroundColor,
                        backgroundColor:
                          ds.backgroundColor || "rgba(0,0,0,0.05)",
                        // fill:  true,
                      })),
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                )}

                {item.type === "pie" && (
                  <DraggablePieChart
                    data={{
                      labels: item.labels,
                      datasets: item.datasets.map((ds, idx) => ({
                        label: ds.label,
                        data: ds.data,
                        backgroundColor:
                          ds.backgroundColor || getRandomColor(idx),
                      })),
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                )}

                {item.type === "doughnut" && (
                  <DraggableDonutChart
                    data={{
                      labels: item.labels,
                      title: item.title,
                      datasets: item.datasets.map((ds, idx) => ({
                        label: ds.label,
                        data: ds.data,
                        backgroundColor:
                          ds.backgroundColor || getRandomColor(idx),
                      })),
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                )}

                {item.type === "gauge" && (
                  <DraggableGauge
                    // type="semicircle"
                    value={item.value}
                    maxValue={item.maxValue || 100}
                    unit={item.unit || "%"}
                    label={item.label || item.title || "Gauge"}
                  />
                )}

                {item.type === "heading" && (
                  <div
                    className="flex items-center justify-between w-full h-full px-4 py-1   // 👈 smaller vertical padding
                   text-white rounded"
                  >
                    <select
                      className="ml-4 rounded bg-white text-gray-800 px-2 py-1 text-sm border border-gray-300 w-md"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select option
                      </option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </select>
                  </div>
                )}

                {/* {item.type === "heading" && (
                  <div
                    className=" px-1 py-1 
                   rounded"
                  >
                      <select
                        className=" rounded px-2 py-1 border border-gray-300"
                        name="options"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select option
                        </option>
                        <option value="option1" selected>
                          Raw Mill
                        </option>
                        <option value="option2">Oil Mill</option>
                      </select>
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </GridLayout>
      </div>

      {/* ===== Right: Draggable Palette ===== */}
      <div className="w-48 p-2  border-l border-gray-300  dark:border-gray-600">
        <div className="mb-2 flex gap-2">
          <button
            onClick={saveLayout}
            className="bg-blue-500 text-white p-1  rounded"
          >
            Save Layout
          </button>
          {/* <button
            onClick={exportLayout}
            className="bg-green-500 text-white rounded"
          >
            Export as JSON
          </button> */}
        </div>
        <h3 className="font-bold mb-3 text-white">Add Widget</h3>
        <DraggableTile type="bar" />
        <DraggableTile type="line" />
        <DraggableTile type="pie" />
        <DraggableTile type="doughnut" />
        <DraggableTile type="gauge" />
        <h3 className="font-bold mb-3 text-white">Add Attribute</h3>
        <DraggableTile type="heading" /> {/* 👈 NEW */}
        {/* <DraggableTile type="table" /> */}
      </div>
      {settingsOpen && (
        <ModalComponent
          heading="Cog Settings"
          modalData={
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              {/* Data Source */}
              <div>
                <label
                  htmlFor="dataSource"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Data source
                </label>
                <input
                  type="text"
                  id="dataSource"
                  name="dataSource"
                  value={formData.dataSource}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600
                     dark:bg-gray-800 dark:text-gray-100
                     focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter data source"
                />
              </div>

              {/* Asset */}
              <div>
                <label
                  htmlFor="asset"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Asset
                </label>
                <input
                  type="text"
                  id="asset"
                  name="asset"
                  value={formData.asset}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600
                     dark:bg-gray-800 dark:text-gray-100
                     focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter asset"
                />
              </div>

              {/* Tag */}
              <div>
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Tag
                </label>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600
                     dark:bg-gray-800 dark:text-gray-100
                     focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter tag"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700
                     text-gray-700 dark:text-gray-200 hover:bg-gray-300
                     dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white
                     hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          }
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
}
function getRandomColor(index) {

  console.log("Getting color for index:", index);
  const colors = [
    "rgba(75,192,192,0.6)",
    "rgba(153,102,255,0.6)",
    "rgba(255,159,64,0.6)",
    "rgba(255,99,132,0.6)",
    "rgba(54,162,235,0.6)",
  ];
  return colors[index % colors.length];
}
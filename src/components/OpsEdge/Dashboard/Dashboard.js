"use client";

import React, { useRef, useState, useEffect, use } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import Table from "@/components/Common/Table/Table";
import { useRouter } from "next/navigation";
import {
  getAnamolyList,
  getInsights,
  getPlotForInsights,
  getPlotForRCA,
} from "@/services/dashboardServices";
import { set } from "date-fns";
import { showError } from "@/utils/toastUtils";
import { clearAuthStorage } from "@/utils/authUtils";
import { Line } from "react-chartjs-2";
import LineChart from "@/components/Common/Graphs/LineChart/LineChart";
import { subDays, format } from "date-fns";
import DateRangeInput from "@/components/Common/Form/DateRangeInput";
import SelectInput from "@/components/Common/Form/SelectInput";
import { CircularProgress } from "@mui/material";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { formatDateTimeChart } from "@/utils/dateTime";

const ExpandedOverlay = ({ rect, children, onEnter, onLeave }) => {
  if (!rect) return null;
  if (typeof document === "undefined") return null;
  const offset = 12;

  let left = rect.right + offset;
  const maxWidth = Math.min(520, window.innerWidth - 32);
  if (left + maxWidth > window.innerWidth) {
    left = rect.left - offset - maxWidth;
    if (left < 0) left = 0;
  }

  let top = rect.top;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          position: "fixed",
          left,
          top,
          width: maxWidth,
          zIndex: 9999,
          backgroundColor: "#ffffff",
          backdropFilter: "blur(4px)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e2e8f0",
          borderRadius: "1rem",
        }}
        className="text-slate-800 p-5"
      >
        {children}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [cardRect, setCardRect] = useState(null);
  const hideTimer = useRef(null);
  const cardRefs = useRef([]);
  const [anamolyData, setAnamolyData] = useState();
  const [anamolyDataError, setAnamolyDataError] = useState("");
  const [insights, setInsights] = useState();
  const [insightsError, setInsightsError] = useState("");
  const [chartLoading, setChartLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [chartDataError, setChartDataError] = useState("");
  const now = new Date();
  const savedFrom =
    typeof window !== "undefined" ? sessionStorage.getItem("fromDate") : null;
  const savedTo =
    typeof window !== "undefined" ? sessionStorage.getItem("toDate") : null;
  const savedEquipment =
    typeof window !== "undefined" ? sessionStorage.getItem("equipment") : null;
  // const equipmentOptions = [
  //   { label: "HP Compressor", value: "B32K0001" },
  //   { label: "LP Compressor", value: "B32K0002" },
  // ];

    const equipmentOptions = [
      { value: "C001#EQ001", label: "Boiler" },
    ];
  const defaultFrom = savedFrom || "2025-05-01";
  const defaultTo = savedTo || format(now, "yyyy-MM-dd");
  const isSavedEquipmentValid = equipmentOptions.some(
    (opt) => opt.value === savedEquipment
  );
  const defaultEquipment = isSavedEquipmentValid
    ? savedEquipment
    : equipmentOptions[0].value;

  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate, setToDate] = useState(defaultTo);
  const [equipment, setEquipment] = useState(defaultEquipment);
  const [tempFrom, setTempFrom] = useState(defaultFrom);
  const [tempTo, setTempTo] = useState(defaultTo);
  const [tempEquipment, setTempEquipment] = useState(defaultEquipment);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);

  //     const insightsData = await getInsights();
  //     console.log("Insights data:", insightsData);
  //     if (insightsData.statusCode == 401 || insightsData.statusCode == 403) {
  //       setInsightsError("");
  //       showError(insightsData.message || "Invalid token or access denied");
  //       setInsights(null);
  //       clearAuthStorage(router);
  //     } else if (insightsData.statusCode && insightsData.statusCode !== 200) {
  //       setInsightsError(insightsData.message || "Failed to fetch insights");
  //       // showError(insightsData.message || "Failed to fetch insights");
  //       setInsights(null);
  //     } else {
  //       setInsights(insightsData.data);
  //       setInsightsError("");
  //     }

  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      setChartLoading(true);

      await fetchAnomalyList(
        formatDateTimeChart(fromDate),
        formatDateTimeChart(toDate)
      );

      await fetchChart(
        formatDateTimeChart(fromDate),
        formatDateTimeChart(toDate)
      );

      setChartLoading(false);
    };
    fetchChartData();
  }, [equipment, fromDate, toDate]);

  const fetchAnomalyList = async (start, end) => {
    const anamolyList = await getAnamolyList(equipment, start, end);
    console.log("Anamoly data:", anamolyList);
    if (anamolyList.statusCode == 401 || anamolyList.statusCode == 403) {
      setAnamolyDataError("");
      showError(anamolyList.message || "Invalid token or access denied");
      setAnamolyData(null);
      clearAuthStorage(router);
    } else if (anamolyList.statusCode && anamolyList.statusCode !== 200) {
      setAnamolyDataError(
        anamolyList.message || "Failed to fetch anamoly list"
      );
      // showError(anamolyList.message || "Failed to fetch anamoly list");
      setAnamolyData(null);
    } else {
      setAnamolyData(anamolyList.data);
      setAnamolyDataError("");
    }
  };

  const fetchChart = async (start, end) => {
    const chartData = await getPlotForInsights(equipment, start, end);
    if (chartData.statusCode == 401 || chartData.statusCode == 403) {
      setChartDataError("");
      showError(chartData.message || "Invalid token or access denied");
      setChartData(null);
      clearAuthStorage(router);
    } else if (chartData.statusCode && chartData.statusCode !== 200) {
      setChartDataError(chartData.message || "Failed to fetch plot for insights");
      showError(chartData.message || "Failed to fetch plot for insights");
      setChartData(null);
    } else {
      // Inject specific highlights for Boiler Efficiency if present
      if (chartData.title === "Day-Wise Boiler Efficiency") {
        const anomalyDates = [
          "2025-05-25", "2025-05-26", "2025-05-28", "2025-05-30", "2025-05-31",
          "2025-06-01", "2025-06-13", "2025-06-14", "2025-06-16", "2025-06-17",
          "2025-06-18", "2025-06-19", "2025-06-20", "2025-06-24", "2025-08-21"
        ];
        
        const manualRanges = anomalyDates.map(date => [
          `${date} 00:00:00`,
          `${date} 23:59:59`
        ]);

        chartData.anomalyHighlight = {
          ranges: [
            ...(chartData.anomalyHighlight?.ranges || []),
            ...manualRanges
          ],
          legend: "Anomaly",
          color: "rgba(153, 27, 27, 0.6)" // Bold dark red highlight
        };
      }
      
      setChartData(chartData);
      setChartDataError("");
    }
    console.log("Plot Data", chartData);
  };

  const handleApply = () => {
    const isTempValid = equipmentOptions.some(
      (opt) => opt.value === tempEquipment
    );
    const finalEquipment = isTempValid
      ? tempEquipment
      : equipmentOptions[0].value;

    setFromDate(tempFrom);
    setToDate(tempTo);
    setEquipment(finalEquipment);
    sessionStorage.setItem("fromDate", tempFrom);
    sessionStorage.setItem("toDate", tempTo);
    sessionStorage.setItem("equipment", finalEquipment);
  };

  const dashboardCards = [
    {
      icon: "⚙️",
      title: "1.Health & Performance ",
      text: "The HP Compressor (B32-GS-HQ0-K0001) is experiencing significant deviations in multiple pressure parameters, while the LP Compressor (B32-GS-HR0-K0002) is showing a deviation in motor outboard bearing vibration. Overall system health scores remain at 100.0 for both compressors, but attention is required due to these deviations.",
    },
    {
      icon: "🤖",
      title: "2. Recent Time Series Deviation ",
      text: "HP Compressor (B32-GS-HQ0-K0001): Multiple pressure parameters have deviated from their normal operating ranges, including suction pressure, inlet pressure, and outlet pressure for both K-0001A and K-0001B. LP Compressor (B32-GS-HR0-K0002): The motor outboard bearing vibration (B32RHIC0002B.PV) has deviated by -15.40% from its reference mean.",
    },
    {
      icon: "📈",
      title: "3. RCA",
      text: "HP Compressor: RCA indicates a system-wide pressure increase, primarily originating from B32-K-0001A (HP Compressor A). This is affecting both HP Compressor A and B, with all pressure readings showing significant deviations. LP Compressor: RCA suggests an issue with the outboard bearing of the LP Compressor (K0002) motor, as evidenced by increased vibration and correlations with other compressor performance indicators.",
    },
    {
      icon: "🚨",
      title: "4. Notification",
      text: 'A new notification (38568362) has been created for the HP Compressor (B32-GS-HQ0-K0001) on 2025-08-07, reporting high vibration with pressure and flow deviations. The notification status is "ORAS" (Open, Released, and Assigned).',
    },
    {
      icon: "📊",
      title: "5. Material Availability",
      text: "List of materials with availability status",
    },
    {
      icon: "🔧",
      title: "6. Historical WO",
      text: "There are 6 historical work orders associated with the HP Compressor (B32-GS-HQ0-K0001): 11612884, 60621651, 11430976, 11434939, 11444856, and 11457046.",
    },
  ];

  const goToInsight = (equipmentId, anomalyId) => {
    setLoading(true);
    router.push(
      `/opsedge/insight?equipmentId=${equipmentId}&&anamolyId=${anomalyId}`
    );
  };

  const goToInsightViaRow = (row) => {
    setLoading(true);
    console.log("Row clicked", row);
    const qs = new URLSearchParams({
      equipmentId: row.equipment || "C001#EQ001",
      anomalyId: row["anomaly id"] || "",
      anomalyTime: row["Start Time"] || ""
    }).toString();
    
    router.push(`/opsedge/insight?${qs}`);
  };

  const showOverlayFor = (idx) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    const el = cardRefs.current[idx];
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCardRect(r);
    setHoveredIdx(idx);
  };

  const scheduleHide = (delay = 120) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setHoveredIdx(null);
      setCardRect(null);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const onRangeChange = (start, end) => {
    if (start === "FULL_RANGE") {
      fetchChart(formatDateTimeChart(tempFrom), formatDateTimeChart(tempTo));
      fetchAnomalyList(
        formatDateTimeChart(tempFrom),
        formatDateTimeChart(tempTo)
      );
    } else {
      fetchChart(start, end);
      fetchAnomalyList(start, end);
    }
  };
  return (
    <>
      {loading && <RippleLoader />}
      {!loading && (
        <>
          <div className="w-full h-[calc(100vh-112px)] bg-slate-50  flex gap-4 ">
            <div className="w-full  flex flex-col gap-4">
              {/* <div className="grid grid-cols-3 gap-4 flex-1 h-[30%]">
                {dashboardCards.map((item, idx) => {
                  const preview = item.list ? item.list.join(", ") : (item.text ?? "");
                  const isHovered = hoveredIdx === idx;

                  return (
                    <motion.div
                      key={idx}
                      ref={(el) => (cardRefs.current[idx] = el)}
                      onMouseEnter={() => showOverlayFor(idx)}
                      onMouseLeave={() => scheduleHide()}
                      whileHover={{ scale: 1.03 }}
                      className="bg-slate-800 p-3 rounded-xl shadow-lg ring-2 ring-[#00ffcc]/40 flex flex-col cursor-pointer h-full overflow-hidden"
                      style={{ zIndex: isHovered ? 50 : 1 }}
                    >
                      <div className="flex items-center ">
                        <span className="text-xl">{item.icon}</span>
                        <h3 className="text-md font-bold text-[#00ffcc] font-mono">{item.title}</h3>
                      </div>

                      <div className="text-sm text-gray-200 font-mono break-words flex-1">
                        {preview}
                      </div>
                    </motion.div>

                  );
                })}
              </div> */}

              <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 overflow-y-auto custom-scrollbar relative isolate h-[100%]">
                <div className="relative w-full border-b border-slate-100 pb-4 mb-6 -mt-1 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                      Machine Learning <span className="text-blue-600">Output</span>
                    </h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5 uppercase tracking-wider">Live Anomaly Analysis</p>
                  </div>
 
                  <div className="flex items-center gap-3 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100">
                    <DateRangeInput
                      fromValue={tempFrom}
                      toValue={tempTo}
                      onFromChange={setTempFrom}
                      onToChange={setTempTo}
                    />
                    <div className="h-6 w-px bg-slate-200 mx-1" />
                    <SelectInput
                      options={equipmentOptions}
                      value={tempEquipment}
                      onChange={(e) => setTempEquipment(e.target.value)}
                    />
                    <button
                      onClick={handleApply}
                      disabled={chartLoading}
                      className="ml-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-100 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                      title="Apply Filters"
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {chartLoading && (
                    <div className="flex flex-col justify-center items-center min-h-[150px] space-y-2">
                      <CircularProgress
                        size={28}
                        thickness={4}
                        color="inherit"
                      />
                      <span className="text-sm text-gray-500 mt-1">
                        Loading chart...
                      </span>
                    </div>
                  )}
                  {!chartLoading && chartDataError && (
                    <div className="text-red-500 text-sm">{chartDataError}</div>
                  )}
                  {!chartLoading && !chartDataError && chartData && (
                    <LineChart
                      data={chartData}
                      onClickZoom={false}
                      onRangeChange={onRangeChange}
                    />
                  )}
                  {anamolyDataError ? (
                    <div className=" text-center p-4 text-red-500">
                      {anamolyDataError}
                    </div>
                  ) : (
                    anamolyData &&
                    anamolyData != null && (
                      <Table
                        tableData={anamolyData}
                        redirectTo={goToInsightViaRow}
                        labels={[
                          "anomaly id",
                          "equipment",
                          "Start Time",
                          "End Time",
                          "Remark",
                          "rca status",
                        ]}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* <div className="w-1/3 flex flex-col bg-slate-800 p-2 rounded-xl shadow-lg ring-2 ring-[#00ffcc]/40 overflow-hidden">
              <img src="/images/thumbsup.gif" alt="Aivee Bot" className="w-55 h-80 mb-2 mx-auto" />
              <div className="flex flex-wrap gap-4 mb-2 justify-center">
                {insightsError ? (
                  <div className=" text-center p-4">
                    {insightsError}
                  </div>
                ) : insights && insights != null && (
                  <>
                    {insights.equipments.map((eq, i) => (
                      <div
                        key={i}
                        onClick={() => goToInsight(eq.equipmentId, eq.anomalyId)}
                        className={`p-2 rounded-lg text-center min-w-[150px] cursor-pointer transition-transform duration-200
                                    ${eq.isCritical
                            ? "bg-red-600 text-white hover:bg-red-700 hover:scale-[1.05] shadow-lg"
                            : "bg-slate-600 text-cyan-400 hover:bg-slate-500 hover:scale-[1.05] shadow-lg"
                          }`}
                      >
                        <h4 className="text-md font-bold h-[8vh] flex items-center justify-center">
                          {eq.title}
                        </h4>
                        <p className="text-sm font-extrabold">
                          Score: {eq.score}
                          </p>
                      </div>
                    ))}
                    <p className="text-center text-md text-gray-300 mb-4 leading-snug">
                      🚨 Plant telemetry shows anomalies in compressors.
                      <br />
                      Please click on a compressor above to launch the investigation.
                    </p>
                  </>
                )}
              </div>
            </div> */}
          </div>

          <ExpandedOverlay
            rect={cardRect}
            onEnter={() => {
              if (hideTimer.current) {
                clearTimeout(hideTimer.current);
                hideTimer.current = null;
              }
            }}
            onLeave={() => scheduleHide(80)}
          >
            {hoveredIdx != null && (
              <div>
                <div className="flex items-start gap-3 mb-3 font-mono">
                  <div className="text-2xl">
                    {dashboardCards[hoveredIdx].icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-600">
                      {dashboardCards[hoveredIdx].title}
                    </h3>
                    <div className="text-xs text-slate-600 mt-1">
                      {dashboardCards[hoveredIdx].list ? (
                        <ul className="list-disc ml-5 space-y-1">
                          {dashboardCards[hoveredIdx].list.map((li, i) => (
                            <li key={i}>{li}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{dashboardCards[hoveredIdx].text}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ExpandedOverlay>
        </>
      )}
    </>
  );
};

export default Dashboard;

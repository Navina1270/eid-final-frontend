"use client";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import Table from "@/components/Common/Table/Table";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SystemFacts from "../SystemFacts/SystemFacts";
import { getInsightDetails, enterRCA, getPlotForRCA } from "@/services/dashboardServices";
import { showError, showSuccess, showWarning } from "@/utils/toastUtils";
import { clearAuthStorage } from "@/utils/authUtils";
import CheckboxInput from "@/components/Common/Form/CheckboxInput";
import NextButton from "@/components/Common/Form/NextButton";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import TextInput from "@/components/Common/Form/TextInput";
import { addVisuals, getVisualsList } from "@/services/visualsServices";
import SelectInput from "@/components/Common/Form/SelectInput";
import BackButton from "@/components/Common/Form/BackButton";
import LineChart from "@/components/Common/Graphs/LineChart/LineChart";
const data = {
  equipmentId: "EQ001",
  anomolyId: "001",
  name: "Discharge Pressure Analysis",
  summary:
    "This report analyzes the discharge pressure at location P1000-UTL-AMINE. The actual range slightly exceeds the operational range, with a maximum of 10.32 and a deviation of 21.00% from the mean value.",
  data: [
    {
      Parameter: "discharge pressure",
      Location: "P1000-UTL-AMINE",
      "Reference Value": "7.69 - 10.12",
      "Actual Range": "7.1 - 10.32",
      Description:
        "The max is 10.32, the mean is 8.99, the standard deviation is 0.54, and this feature is 21.00% deviated from the mean (0.32).",
    },
    {
      Parameter: "discharge pressure",
      Location: "P1000-UTL-AMINE",
      "Reference Value": "7.69 - 10.12",
      "Actual Range": "7.1 - 10.32",
      Description:
        "For discharge pressure, the min is 7.1, the max is 10.32, the mean is 8.99, the standard deviation is 0.54, and this feature is 21.00% deviated from the mean (0.32).",
    },
    {
      Parameter: "discharge pressure",
      Location: "P1000-UTL-AMINE",
      "Reference Value": "7.69 - 10.12",
      "Actual Range": "7.1 - 10.32",
      Description:
        "For discharge pressure, the min is 7.1, the max is 10.32, the mean is 8.99, the standard deviation is 0.54, and this feature is 21.00% deviated from the mean (0.32).",
    },
  ],
};

const FACTS = [
  "RCA can reduce equipment downtime by up to 50%, allowing your system to recover faster and operate more reliably.",
  "Always validate compressor logs weekly. It prevents costly failures and ensures optimal performance.",
  "Our AI models analyze over 1 million datapoints in seconds, finding issues that human eyes might miss.",
  "Early warnings from RCA prevent unplanned outages. Stay ahead of failures before they happen.",
  "Predictive maintenance based on RCA insights can cut repair costs by 30% and increase equipment lifespan.",
  "Using historical RCA data helps prevent recurring problems, ensuring long-term system stability and performance.",
];

// const visualsList = [
//   { name: "Project Alpha", "created on": "2025-09-20" },
//   { name: "Project Beta", "created on": "2025-09-18" },
//   { name: "Project Gamma", "created on": "2025-09-15" },
//   { name: "Project Delta", "created on": "2025-09-10" },
//   { name: "Project Epsilon", "created on": "2025-09-05" },
// ];

const PLOTTABLE_BOILER_TAGS = [
  "Feed_water_Economizer_inlet_temperature",
  "Feed_water_Economizer_outlet_temperature",
  "Main_steam_outlet_temperature_1",
  "Main_steam_outlet_temperature_2",
  "Steam_Temperature_at_attemptator_outlet",
  "Superheater_1_inlet_Temperature",
  "Steam_drum_level_transmitter",
  "Steam_drum_pressure",
  "Attemperator",
  "Main_steam_outlet_line_pressure1",
  "Main_steam_outlet_line_pressure2",
  "Steam_flow_to_Deaerator",
  "Boiler_Blow_down_flow_meter",
  "Main_steam_flow_1",
  "Main_steam_flow_2",
  "Bed_temperature_Compartment_1A",
  "Bed_temperature_Compartment_1B",
  "Bed_temperature_Compartment_2A",
  "Bed_temperature_Compartment_2B",
  "Furnace_pressure_1",
  "Furnace_pressure_2",
  "Furnace_Temperature",
  "FD_air_flow_FI_401",
  "FD_air_pressure_compartment_1",
  "FD_air_pressure_compartment_2",
  "SA_air_flow",
  "Flue_gas_pressure_at_SH_1",
  "Flue_gas_pressure_at_SH_2",
  "Flue_gas_Temperature_at_SH_1",
  "Flue_gas_Temperature_at_SH_2",
  "Evaporator_2_temperature",
  "Flue_gas_pressure_at_Evaporator_1_inlet",
  "Flue_gas_pressure_at_Evaporator_2_inlet",
  "SA_air_pressure",
  "Flue_gas_Temperature_at_Evaporator_1_inlet",
  "Flue_gas_Temperature_at_Evaporator_3_inlet",
  "Preseperator_temp",
  "ID_fan_suction_flue_gas_pressure",
  "ID_fan_temperature",
  "Spent_wash_Brix",
  "Instrument_air_pressure"
];

const InsightParameters = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const equipmentId = searchParams.get("equipmentId");
  const anomalyId = searchParams.get("anomalyId") || searchParams.get("anamolyId"); // fallback for old links
  const anomalyTime = searchParams.get("anomalyTime");

  const [visualsList, setVisualsList] = useState([]);
  const [insightDetails, setinsightDetails] = useState();
  const [insightDetailsError, setinsightDetailsError] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [openModalVisuals, setOpenModalVisuals] = useState(false);
  const [visualsAddMethod, setVisualsAddMethod] = useState("new");
  const [visualName, setVisualsName] = useState("");
  const [visualNameError, setVisualNameError] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [visualsRow, setVisualsRow] = useState(null);

  // Trend popup state
  const [trendModal, setTrendModal] = useState(false);
  const [trendData, setTrendData] = useState(null);
  const [trendLoading, setTrendLoading] = useState(false);
  const [trendError, setTrendError] = useState("");

  const handleTagIdClick = async (tagId) => {
    setTrendModal(true);
    setTrendData(null);
    setTrendError("");
    setTrendLoading(true);

    if (!equipmentId || !tagId) {
      setTrendError("Missing Equipment ID or Tag ID. Please try again.");
      setTrendLoading(false);
      return;
    }

    // Determine time range
    let startTime = "";
    let endTime = "";

    if (anomalyTime && !isNaN(new Date(anomalyTime).getTime())) {
      // Build time window: day before anomalyTime to day of
      const d = new Date(anomalyTime);
      const before = new Date(d);
      before.setDate(before.getDate() - 1);
      const pad = (n) => String(n).padStart(2, "0");
      startTime = `${before.getFullYear()}-${pad(before.getMonth() + 1)}-${pad(before.getDate())} 00:00:00`;
      endTime = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} 23:59:59`;
    } else {
      // Fallback: Last 24 hours if anomalyTime is missing or invalid
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const pad = (n) => String(n).padStart(2, "0");
      const formatDate = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      startTime = formatDate(yesterday);
      endTime = formatDate(now);
      console.log("No valid anomalyTime found, using fallback range:", { startTime, endTime });
    }

    try {
      const normalizedTagId = tagId.trim().replace(/\s+/g, "_");
      console.log(`Original TagId: "${tagId}", Normalized: "${normalizedTagId}"`);
      
      const res = await getPlotForRCA([normalizedTagId], equipmentId, startTime, endTime, "line");
      if (res?.statusCode === 401 || res?.statusCode === 403) {
        showError(res.message || "Session expired");
        clearAuthStorage(router);
        setTrendModal(false);
      } else if (res?.statusCode && res.statusCode !== 200) {
        setTrendError(res.message || "Failed to load trend data");
      } else if (res?.message && !res?.data) {
        setTrendError(res.message || "Service temporarily unavailable. Please try again.");
      } else {
        setTrendData(res?.data || null);
        if (!res?.data) setTrendError("No trend data available for this parameter.");
      }
    } catch (e) {
      console.error("Trend plot error:", e);
      setTrendError("Failed to load trend. Please try again.");
    } finally {
      setTrendLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const insightDetails = await getInsightDetails(equipmentId, anomalyId, anomalyTime);
      console.log("Insight details data:", insightDetails);
      if (
        insightDetails.statusCode == 401 ||
        insightDetails.statusCode == 403
      ) {
        setinsightDetailsError("");
        showError(insightDetails.message);
        setinsightDetails(null);
        clearAuthStorage(router);
      } else if (
        insightDetails.statusCode &&
        insightDetails.statusCode !== 200
      ) {
        setinsightDetailsError(insightDetails.message);
        showError(insightDetails.message);
        setinsightDetails(null);
      } else {
        setinsightDetails(insightDetails.data);
        setinsightDetailsError("");
      }
      setLoading(false);
    };

    // const fetchVisualsList = async () => {
    //   const visualListResponse = await getVisualsList();
    //   if (visualListResponse.statusCode === 200) {
    //     setVisualsList(visualListResponse?.data);
    //   } else if (
    //     visualListResponse.statusCode == 401 ||
    //     visualListResponse.statusCode == 403
    //   ) {
    //     showError(
    //       visualListResponse.message || "Invalid token or access denied"
    //     );
    //     clearAuthStorage(router);
    //   } else {
    //     showError(visualListResponse.message || "Something went wrong");
    //   }
    // };
    fetchData();
    // fetchVisualsList();
  }, []);

  const handleClickYes = (anomalyId) => {
    setLoading(true);
    router.push(`/opsedge/view_rca?anomalyId=${anomalyId}`);
  };

  const handleClickNo = () => {
    setLoading(true);
    router.push("/opsedge/home");
  };

  const handleCheckboxChange = (param) => {
    setSelectedRows((prev) =>
      prev.includes(param) ? prev.filter((p) => p !== param) : [...prev, param]
    );
  };

  const handleVisualsClick = () => {
    setOpenModalVisuals(true);
    const parameters = selectedRows.map((row) => row.tagId);
    console.log("Selected Rows:", selectedRows);
  };

  const filteredVisuals = useMemo(() => {
    if (!visualsList) return [];
    if (!searchQuery) return visualsList;
    return visualsList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, visualsList]);

  const handleAddVisuals = async () => {
    if (visualsAddMethod === "new" && visualName.trim() === "") {
      setVisualNameError("Please enter dashboard name");
      return;
    } else {
      setVisualNameError("");
    }

    let type = visualsAddMethod;
    let name = visualsAddMethod === "existing" ? visualsRow?.name : visualName;
    let visualId =
      visualsAddMethod === "existing" ? visualsRow?.["visual Id"] : "";
    let tagId = selectedRows;

    const addVisualsResponse = await addVisuals(
      type,
      name,
      visualId,
      equipmentId,
      tagId
    );
    if (addVisualsResponse.statusCode === 200) {
      const redirectVisualId =
        visualsAddMethod === "existing"
          ? visualId
          : addVisualsResponse.visualId;
      console.log("🔗 Redirecting to:", redirectVisualId);
      const redirectURL = `/opsedge/visuals/charts?visualId=${redirectVisualId}`;
      window.open(redirectURL, "_blank");
      setOpenModalVisuals(false);
    } else if (addVisualsResponse === 401 || addVisualsResponse === 403) {
      showError(addVisualsResponse.message || "Invalid token or access denied");
      clearAuthStorage(router);
    } else {
      showError(addVisualsResponse.message || "Something went wrong...");
    }
  };
  return (
    <>
      {loading && <RippleLoader />}
      <div className="w-full h-[calc(100vh-112px)] bg-slate-50 text-slate-800 p-4 flex gap-4">
        <div className="w-2/3 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 justify-center overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Anomaly <span className="text-blue-600">Details</span>
            </h2>
          </div>
          {insightDetailsError ? (
            <div className=" text-center p-4 text-red-500 font-medium">{insightDetailsError}</div>
          ) : (
            insightDetails &&
            insightDetails != null && (
              <>
                <Table
                  valueWrap={true}
                  tableData={insightDetails.Data.map((row, index) => ({
                    _originalTagId: row.tagId,
                    id: `${row.Parameter || index}-${index}`,
                    tagId: row.tagId || "0",
                    "Reference Value": (row["Reference Value"] || row["Reference Range"] || row["Operation Range"]) ?? "0",
                    "Actual Value": row["Actual Value"] ?? "0",
                  }))}
                  labels={[
                    "tagId",
                    "Reference Value",
                    "Actual Value",
                  ]}
                  renderers={{
                    tagId: (val) => {
                      const normalized = val.trim().replace(/\s+/g, "_");
                      const isPlottable = PLOTTABLE_BOILER_TAGS.includes(normalized);
                      
                      return isPlottable ? (
                        <span
                          className="text-blue-600 hover:underline cursor-pointer font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagIdClick(val);
                          }}
                        >
                          {val}
                        </span>
                      ) : (
                        <span className="text-slate-800/90">{val}</span>
                      );
                    },
                  }}
                  redirectTo={(mappedRow) => handleCheckboxChange(mappedRow._originalTagId)}
                />
              </>
            )
          )}
        </div>

        <div className="w-1/3 flex flex-col bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          {!insightDetailsError && (
            <>
              <img
                src="/images/thumbsup.gif"
                alt="Aivee Bot"
                className="w-55 h-80 mb-4 mx-auto"
              />

              <div className="text-center text-md mt-6 mb-2 leading-snug">
                {insightDetails?.Data && insightDetails?.Data?.length > 0 ? (
                  <>
                    📢 Do you want to generate RCA???
                  </>
                ) : (
                  <>
                    No deviations were detected for this equipment, <br /> So
                    RCA cannot be performed.
                  </>
                )}
              </div>

              {insightDetails?.Data && insightDetails?.Data?.length > 0 && (
                <div className="flex gap-4 justify-center mt-auto mb-2">
                  <NextButton label="Yes" onClick={() => handleClickYes(insightDetails.anomalyId)} px={10}/>
                  <BackButton label="No" onClick={handleClickNo}/>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {openModalVisuals && (
        <ModalComponent
          isHeading={false}
          onClose={() => setOpenModalVisuals(false)}
          modalData={
            <div
              className={`flex flex-col rounded-xl ${visualsAddMethod === "existing" ? "h-[65vh]" : ""
                }`}
            >
              <div className="flex-shrink-0">
                <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-3 -mt-1 border-b border-[#00ffcc]/60 pb-1">
                  Add to Visuals
                </h2>

                <div className="flex bg-gray-700 rounded-xl justify-center p-1 mb-2">
                  <button
                    onClick={() => setVisualsAddMethod("new")}
                    className={`flex-1 text-[14px] rounded-xl py-2 text-center transition-colors duration-200 text-white ${visualsAddMethod === "new"
                      ? "border-2 border-[#00ffcc]"
                      : "hover:bg-gray-600"
                      }`}
                  >
                    Add to New Visuals
                  </button>

                  <button
                    onClick={() => setVisualsAddMethod("existing")}
                    className={`flex-1 text-[14px] rounded-xl py-2 text-center transition-colors duration-200 text-white ${visualsAddMethod === "existing"
                      ? "border-2 border-[#00ffcc]"
                      : "hover:bg-gray-600"
                      }`}
                  >
                    Add to Existing Visuals
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden p-2">
                {visualsAddMethod === "new" ? (
                  <div className="overflow-y-auto">
                    <TextInput
                      value={visualName}
                      onChange={(e) => setVisualsName(e.target.value)}
                      placeholder={"Enter name"}
                      error={visualNameError}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex-shrink-0 mb-2">
                      <TextInput
                        placeholder={"Search...."}
                        value={searchQuery ?? ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <Table
                        labels={[
                          "visual Id",
                          "name",
                          "equipment",
                          "created On",
                        ]}
                        tableData={filteredVisuals}
                        redirectTo={(row) => setVisualsRow(row)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex-shrink-0 flex justify-center">
                <NextButton label="Submit" onClick={handleAddVisuals} />
              </div>
            </div>
          }
        />
      )}

      {/* Trend Chart Modal */}
      {trendModal && (
        <ModalComponent
          isHeading={false}
          onClose={() => { setTrendModal(false); setTrendData(null); setTrendError(""); }}
          modalData={
            <div className="flex flex-col" style={{ minWidth: "600px", minHeight: "350px" }}>
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                📈 Parameter Trend
              </h2>
              {trendLoading ? (
                <div className="flex flex-1 items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                  <span className="ml-3 text-slate-500">Loading trend data...</span>
                </div>
              ) : trendError ? (
                <div className="flex flex-1 items-center justify-center py-12">
                  <p className="text-red-500 font-medium text-center">{trendError}</p>
                </div>
              ) : trendData ? (
                <div className="w-full">
                  <LineChart data={trendData} />
                </div>
              ) : null}
            </div>
          }
        />
      )}
    </>
  );
};

export default InsightParameters;

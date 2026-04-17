"use client";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import Table from "@/components/Common/Table/Table";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SystemFacts from "../SystemFacts/SystemFacts";
import { getInsightDetails } from "@/services/dashboardServices";
import { showError } from "@/utils/toastUtils";
import { clearAuthStorage } from "@/utils/authUtils";
import CheckboxInput from "@/components/Common/Form/CheckboxInput";
import NextButton from "@/components/Common/Form/NextButton";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import TextInput from "@/components/Common/Form/TextInput";
import { addVisuals, getVisualsList } from "@/services/visualsServices";
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
      "Operation Range": "7.69 - 10.12",
      "Actual Range": "7.1 - 10.32",
      Description:
        "The max is 10.32, the mean is 8.99, the standard deviation is 0.54, and this feature is 21.00% deviated from the mean (0.32).",
    },
    {
      Parameter: "discharge pressure",
      Location: "P1000-UTL-AMINE",
      "Operation Range": "7.69 - 10.12",
      "Actual Range": "7.1 - 10.32",
      Description:
        "For discharge pressure, the min is 7.1, the max is 10.32, the mean is 8.99, the standard deviation is 0.54, and this feature is 21.00% deviated from the mean (0.32).",
    },
    {
      Parameter: "discharge pressure",
      Location: "P1000-UTL-AMINE",
      "Operation Range": "7.69 - 10.12",
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

const InsightParameters = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const equipmentId = searchParams.get("equipmentId");
  const anomalyId = searchParams.get("anamolyId");

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const insightDetails = await getInsightDetails(equipmentId, anomalyId);
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

    const fetchVisualsList = async () => {
      const visualListResponse = await getVisualsList();
      if (visualListResponse.statusCode === 200) {
        setVisualsList(visualListResponse?.data);
      } else if (
        visualListResponse.statusCode == 401 ||
        visualListResponse.statusCode == 403
      ) {
        showError(
          visualListResponse.message || "Invalid token or access denied"
        );
        clearAuthStorage(router);
      } else {
        showError(visualListResponse.message || "Something went wrong");
      }
    };
    fetchData();
    fetchVisualsList();
  }, []);

  const handleClickYes = (anamolyId) => {
    setLoading(true);
    router.push(`/opsedge/view_rca?anamolyId=${anamolyId}`);
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
    let visualId = visualsAddMethod === "existing" ? visualsRow?.id : "";
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
      <div className="w-full h-[calc(100vh-112px)] bg-gray-900 text-gray-300 flex gap-4">
        <div className="w-2/3 bg-slate-800 rounded-xl shadow-lg ring-2 ring-[#00ffcc]/40 p-6 justify-center overflow-y-auto custom-scrollbar">
          <h2 className="text-xl -mt-4 font-bold text-center text-[#00ffcc] mb-3 border-b border-[#00ffcc]/60 pb-1">
            Anomaly Details
          </h2>
          {insightDetailsError ? (
            <div className=" text-center p-4">{insightDetailsError}</div>
          ) : (
            insightDetails &&
            insightDetails != null && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-md font-semibold">Summary</h2>
                  <NextButton
                    onClick={handleVisualsClick}
                    label="Add to visuals"
                  />
                </div>

                <p className="text-sm mb-4">{insightDetails.Summary}</p>
                <Table
                  valueWrap={false}
                  tableData={insightDetails.Data.map((row, index) => ({
                    id: `${row.Parameter}-${index}`,
                    Select: (
                      <CheckboxInput
                        checked={selectedRows.includes(row.tagId)}
                        onChange={() => handleCheckboxChange(row.tagId)}
                      />
                    ),
                    Location: row.Location,
                    Parameter: row.Parameter,
                    Description: row.Description,
                    Remarks: row.Remarks,
                  }))}
                  labels={[
                    "Select",
                    "Location",
                    "Parameter",
                    "Description",
                    "Remarks",
                  ]}
                />
              </>
            )
          )}
        </div>

        <div className="w-1/3 flex flex-col bg-slate-800 p-4 rounded-xl shadow-lg ring-2 ring-[#00ffcc]/40 overflow-hidden">
          {!insightDetailsError && (
            <>
              <img
                src="/images/thumbsup.gif"
                alt="Aivee Bot"
                className="w-55 h-80 mb-4 mx-auto"
              />

              <p className="text-center text-md mt-6 mb-4 leading-snug">
                {insightDetails?.Data &&
                insightDetails?.Data?.length > 0 > 0 ? (
                  <>
                    🚨 Trigger Root ?Cause Analysis (RCA) for the detected
                    anomaly? <br />
                    Proceed with detailed investigation workflow?
                  </>
                ) : (
                  <>
                    No deviations were detected for this equipment, <br /> So
                    RCA cannot be performed.
                  </>
                )}
              </p>

              <div className="flex gap-4 justify-center mt-auto">
                <button
                  onClick={() => handleClickYes(insightDetails.anomalyId)}
                  className={`p-2 rounded-lg border flex items-center justify-center transition-all duration-200
                            ${
                              loading || !insightDetails?.Data?.length
                                ? "bg-gray-600 border-gray-400 cursor-not-allowed"
                                : "bg-slate-900/50 border-[#00ffcc] "
                            }`}
                  disabled={loading || !insightDetails?.Data?.length}
                >
                  <CheckCircleIcon className="w-7 h-7 text-green-400" />
                </button>

                <button
                  onClick={handleClickNo}
                  className="p-2 rounded-lg border border-[#00ffcc] bg-slate-900/50 hover:bg-red-500/20 hover:border-red-400 transition-all duration-200 flex items-center justify-center"
                  disabled={loading}
                >
                  <XCircleIcon className="w-7 h-7 text-red-400" />
                </button>
              </div>
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
              className={`flex flex-col rounded-xl ${
                visualsAddMethod === "existing" ? "h-[65vh]" : ""
              }`}
            >
              <div className="flex-shrink-0">
                <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-3 -mt-1 border-b border-[#00ffcc]/60 pb-1">
                  Add to Visuals
                </h2>

                <div className="flex bg-gray-700 rounded-xl justify-center p-1 mb-2">
                  <button
                    onClick={() => setVisualsAddMethod("new")}
                    className={`flex-1 text-[14px] rounded-xl py-2 text-center transition-colors duration-200 text-white ${
                      visualsAddMethod === "new"
                        ? "border-2 border-[#00ffcc]"
                        : "hover:bg-gray-600"
                    }`}
                  >
                    Add to New Visuals
                  </button>

                  <button
                    onClick={() => setVisualsAddMethod("existing")}
                    className={`flex-1 text-[14px] rounded-xl py-2 text-center transition-colors duration-200 text-white ${
                      visualsAddMethod === "existing"
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
                        labels={["id", "name", "created On"]}
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
    </>
  );
};

export default InsightParameters;

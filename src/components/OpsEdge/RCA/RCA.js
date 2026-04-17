"use client";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import Table from "@/components/Common/Table/Table";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NextButton from "@/components/Common/Form/NextButton";
import { getRCAList, viewRCA } from "@/services/dashboardServices";
import { showError } from "@/utils/toastUtils";
import RCADetails from "../ViewRCA/RCADetails";
import { clearAuthStorage } from "@/utils/authUtils";

export default function RCA() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setShowModalDetails(false);
  }
  const [isNotificationCreated, setIsNotificationCreated] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [rcaList, setRCAList] = useState();
  const [rcaListError, setRCAListError] = useState("");
  const [viewRCADetails, setViewRCADetails] = useState();
  const [viewRCADetailsError, setViewRcaDetailsError] = useState("");
  const [row, setRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const rcaResponse = await getRCAList(1, 10);
      console.log("RCA List response:", rcaResponse);
      
      if (rcaResponse.statusCode == 401 || rcaResponse.statusCode == 403) {
        setRCAListError("");
        showError(rcaResponse.message || "Invalid token or access denied");
        setRCAList(null);
        clearAuthStorage(router);
      } else if (rcaResponse.statusCode && rcaResponse.statusCode !== 200) {
        setRCAListError(rcaResponse.message || "Failed to fetch RCA list");
        showError(rcaResponse.message || "Failed to fetch RCA list");
        setRCAList(null);
      } else if (rcaResponse.notificationStatus) {
        // Map the fields from the new API structure to match table labels
        const mappedList = rcaResponse.notificationStatus.map((item, index) => {
          // Reconstruct the full ID if item.rcaId is just the parent prefix
          // Format expected: RCA_TIMESTAMP_SUFFIX_YYYY-MM-DD_HHMMSS
          const datePart = item.dateTime ? item.dateTime.split(' ')[0] : '';
          const timePart = item.dateTime ? item.dateTime.split(' ')[1]?.replace(/:/g, '') || '000000' : '000000';
          
          const fullId = (item.rcaId && item.rcaId.includes(datePart)) 
            ? item.rcaId 
            : `${item.rcaId}_${datePart}_${timePart}`;

          return {
            ...item,
            "rca id": fullId,
            "anomaly id": item.anomalyId,
            "Date & Time": item.dateTime,
            "Notifications": item.notificationStatus,
            "Equipment Name": item.equipmentName || "N/A" 
          };
        });
        
        setRCAList({
          ...rcaResponse,
          notificationStatus: mappedList
        });
        setRCAListError("");
      } else {
        setRCAList(null);
      };
      setLoading(false);
    }
    fetchData();
  }, []);


  const tableData = {
    notificationStatus: [
      {
        id: "2123",
        "Equipment Name": "HP Compressor",
        "Date & Time": "03/26/2025 05:33PM",
        Notifications: "Generated",
      },
      {
        id: 2,
        "Equipment Name": "LP Compressor",
        "Date & Time": "03/26/2025 05:33PM",
        Notifications: "Not Generated",
      },
      {
        id: 3,
        "Equipment Name": "HP Compressor",
        "Date & Time": "03/26/2025 05:33PM",
        Notifications: "Generated",
      },
      {
        id: 4,
        "Equipment Name": "LP Compressor",
        "Date & Time": "03/26/2025 05:33PM",
        Notifications: "Not Generated",
      },
      {
        id: 5,
        "Equipment Name": "HP Compressor",
        "Date & Time": "03/26/2025 05:33PM",
        Notifications: "Generated",
      },
    ],
  }

  // const data = {
  //   "rcaId": "RCA001",
  //   "summary": "A significant deviation was observed in the high-pressure compressor system (B32-GS-HQ0-K0001), affecting\nmultiple parameters including output pressure, suction flow, and vibration levels. The compressor's health score\ndropped to 50.75, indicating a severe operational issue. Immediate troubleshooting efforts were initiated, focusing\non potential blockages, sensor calibrations, and mechanical inspections. The root cause analysis revealed a complex\ninterplay of factors contributing to the deviation. Mechanical issues, including seal wear and potential shaft sleeve\nproblems, were identified as primary concerns. Operational procedures, particularly during startup and nitrogen\npurging, were found to be inadequate. Material-related factors such as possible gas input contamination and\nlubricant specification errors were also noted. Furthermore, sensor calibration drift and environmental factors like\ntemperature fluctuations and cooling water supply issues were recognized as contributing elements. The\ninvestigation also highlighted human factors, including insufficient adherence to operating procedures and\npotential gaps in training and communication between shifts. This comprehensive analysis underscores the need\nfor a multifaceted approach to resolve the compressor system's operational challenges and prevent future\noccurrences.",
  //   "rcaPlot": "S3Link",
  //   "troubleshooting": {
  //     "tagID": [
  //       "B32PI0039A.PV.1",
  //       "B32PDI0084.PV",
  //       "B32JI0003.PV.1",
  //       "B32FI0075.PV",
  //       "B32PI0039C.PV",
  //       "B32PI0039B.PV",
  //       "B32PI0039A.PV",
  //       "B32JI0003.PV",
  //       "B32RHIC0003B.PV"
  //     ],
  //     "parameter": [
  //       "Compressor K-0001A Outlet Pressure",
  //       "Compressor K-0001B Suction Strainer Differential Pressure",
  //       "Compressor K-0001A Vibration",
  //       "Compressor K-0001B Suction Flow",
  //       "Compressor K-0001A Outlet Pressure",
  //       "Compressor K-0001A Outlet Pressure",
  //       "Compressor K-0001A Outlet Pressure",
  //       "Compressor K-0001A Vibration",
  //       "Compressor High Pressure Vibration Control Manual Output"
  //     ],
  //     "troubleshootingSteps": [
  //       [
  //         "Check for blockages in the discharge line",
  //         "Verify the discharge valve is fully open",
  //         "Inspect for any leaks in the discharge piping",
  //         "Calibrate the pressure sensor",
  //         "Check for any process changes affecting discharge pressure"
  //       ],
  //       [
  //         "Inspect the suction strainer for clogging",
  //         "Clean or replace the strainer if necessary",
  //         "Check for any upstream contamination sources",
  //         "Verify the differential pressure sensor calibration",
  //         "Inspect the suction piping for any restrictions"
  //       ],
  //       [
  //         "Check for unit misalignment and realign if necessary",
  //         "Inspect the rotor for unbalance or damage",
  //         "Examine the bearings for abnormalities",
  //         "Verify the coupling integrity",
  //         "Check for any rubbing between static and dynamic parts"
  //       ],
  //       [
  //         "Verify the suction valve is fully open",
  //         "Check for any restrictions in the suction line",
  //         "Calibrate the flow meter",
  //         "Inspect for any leaks in the suction piping",
  //         "Verify the compressor's operating conditions are within design parameters"
  //       ],
  //       [
  //         "Check for blockages in the discharge line",
  //         "Verify the discharge valve is fully open",
  //         "Inspect for any leaks in the discharge piping",
  //         "Calibrate the pressure sensor",
  //         "Check for any process changes affecting discharge pressure"
  //       ],
  //       [
  //         "Check for blockages in the discharge line",
  //         "Verify the discharge valve is fully open",
  //         "Inspect for any leaks in the discharge piping",
  //         "Calibrate the pressure sensor",
  //         "Check for any process changes affecting discharge pressure"
  //       ],
  //       [
  //         "Check for blockages in the discharge line",
  //         "Verify the discharge valve is fully open",
  //         "Inspect for any leaks in the discharge piping",
  //         "Calibrate the pressure sensor",
  //         "Check for any process changes affecting discharge pressure"
  //       ],
  //       [
  //         "Check for unit misalignment and realign if necessary",
  //         "Inspect the rotor for unbalance or damage",
  //         "Examine the bearings for abnormalities",
  //         "Verify the coupling integrity",
  //         "Check for any rubbing between static and dynamic parts"
  //       ],
  //       [
  //         "Verify the manual output settings",
  //         "Check the high-pressure vibration control system",
  //         "Inspect the vibration sensors for proper functioning",
  //         "Calibrate the control system if necessary",
  //         "Examine the compressor for any abnormal vibrations"
  //       ]
  //     ]
  //   }
  // }

  const openDetailsModal = async (row) => {
    // try {
    //   setRow(row);
    //   setLoading(true);
    //   console.log("Redirecting to RCA for:", row);

    //   if (row && row["Notifications"] === "Not Generated") {
    //     setIsNotificationCreated(false);
    //   } else {
    //     setIsNotificationCreated(true);
    //   }

    //   const rcaDetails = await viewRCA(row["rca id"]);
    //   console.log("Insight details data:", rcaDetails);

    //   if (rcaDetails.statusCode === 401 || rcaDetails.statusCode === 403) {
    //     setViewRcaDetailsError("Invalid token or access denied");
    //     showError(rcaDetails.message || "Invalid token or access denied");
    //     setViewRCADetails(null);
    //     clearAuthStorage(router)
    //   } else if (rcaDetails.statusCode && rcaDetails.statusCode !== 200) {
    //     setViewRcaDetailsError(rcaDetails.message || "Failed to fetch anomaly list");
    //     showError(rcaDetails.message || "Failed to fetch anomaly list");
    //     setViewRCADetails(null);
    //   } else {
    //     setViewRcaDetailsError("");
    //     setViewRCADetails(rcaDetails.data);
    //   }

    //   setShowModalDetails(true);
    // } catch (error) {
    //   console.error("Error fetching RCA details:", error);
    //   // showError("Something went wrong while fetching RCA details.");
    // } finally {
    //   setLoading(false);
    // }

    const rawId = row.rcaId || row["rca id"];
    
    setLoading(true);
    router.push(`/opsedge/view_rca?rcaId=${rawId}`);
  };


  const redirectToNotification = () => {
    import("@/utils/toastUtils").then((module) => {
      module.showWarning("Coming soon...");
    });
  }

  return (
    <>
      {loading && (
        <RippleLoader />
      )}
      {!loading && (
        <>
          {showModalDetails && viewRCADetails && (
            <ModalComponent
              isHeading={false}
              modalData={
                <>
                  {viewRCADetailsError ? (
                    <div className=" text-center p-4">
                      {viewRCADetailsError}
                    </div>
                  ) : viewRCADetails && viewRCADetails != null && (
                    <>
                      <RCADetails data={viewRCADetails} />
                      {!isNotificationCreated && (
                        <div className="sticky bg-white bottom-0 border-t pt-2 flex justify-center gap-6 items-center">
                          <span className="text-[18px] font-semibold text-slate-800">
                            Do you want to create notification?
                          </span>
                          <NextButton
                            label="Create Notification"
                            onClick={redirectToNotification}
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              }
              onClose={closeModal}
            />
          )}

          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl  font-bold text-center text-blue-600 pb-1 w-full">
              RCA List
            </h2>
          </div>

          <div className="bg-[#fafaf9] p-6 rounded-xl shadow-lg border border-slate-200 overflow-y-auto custom-scrollbar relative isolate h-[calc(100vh-160px)]">
            {rcaListError ? (
              <div className=" text-center p-4 text-slate-600 font-medium">
                {rcaListError}
              </div>
            ) : rcaList && rcaList != null && (
            <Table
              tableData={rcaList.notificationStatus}
              redirectTo={openDetailsModal}
              labels={["rca id", "anomaly id","Equipment Name", "Date & Time","Notifications"]}
              visibleRows={10}
            />
          )}
          </div>
        </>
      )}
    </>
  );
}

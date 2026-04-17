"use client";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader3D from "../Dashboard/Loader3D";
import SystemFacts from "../SystemFacts/SystemFacts";
import EditWorkOrder from "./EditWorkOrder";
import WorkOrderDetails from "./WorkOrderDetails";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  createWorkOder,
  generateWorkOrder,
} from "@/services/dashboardServices";
import { showError, showSuccess } from "@/utils/toastUtils";

const flipVariants = {
  enter: {
    rotateY: 90,
    opacity: 0,
    transition: { duration: 0.3 },
  },
  center: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const ViewWorkOrder = () => {
  const searchParams = useSearchParams();
  const notificationNumber = searchParams.get("notificationNumber");

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [generating, setGenerating] = useState(true);
  const router = useRouter();
  const [workOrderDetails, setWorkOrderDetails] = useState();
  const [workOrderDetailsError, setWorkOrderDetailsError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setGenerating(true);

      const workOrderDetails = await generateWorkOrder(notificationNumber);
      console.log("Insight details data:", workOrderDetails);
      if (
        workOrderDetails.statusCode == 401 ||
        workOrderDetails.statusCode == 403
      ) {
        setWorkOrderDetailsError("");
        showError(workOrderDetails.message || "Invalid token or access denied");
        setWorkOrderDetails(null);
        router.push("/login");
      } else if (
        workOrderDetails.statusCode &&
        workOrderDetails.statusCode !== 200
      ) {
        setWorkOrderDetailsError(
          workOrderDetails.message || "Failed to fetch anamoly list"
        );
        showError(workOrderDetails.message || "Failed to fetch anamoly list");
        setWorkOrderDetails(null);
      } else {
        setWorkOrderDetails(workOrderDetails.data);
        setWorkOrderDetailsError("");
      }
      setGenerating(false);
    };
    fetchData();
  }, []);

  console.log("Notification Number:", notificationNumber);

  const data = {
    headerData: [
      {
        endDate: "2025-08-20",
        equipmentDescription: "High-Pressure Compressor",
        equipmentNumber: "B32-GS-HQ0-K0001",
        functionalLocation: "Plant-01/Area-03/Unit-07",
        functionalLocationDescription: "Main compressor unit in area 3",
        orderDate: "2025-08-10",
        orderDescription: "Urgent compressor inspection",
        orderNumber: "WO-20250810-00123",
        orderType: "Maintenance",
        plannerGroup: "Mechanical Maintenance",
        priority: "High",
        startDate: "2025-08-11",
      },
    ],
    componentsData: [
      {
        materialDescription: "Compressor Oil Filter",
        materialNumber: "MAT-00234",
        quantity: "4",
        reservationNo: "RSV-20250811-001",
        storageLocation: "Warehouse-1",
        systemCondition: "Good",
      },
    ],
    costsData: [
      {
        assembly: "Assembly-1",
        costCenter: "CC-1001",
        costcenterDescription: "Compressor Maintenance",
        estimatedCosts: "$1500",
        settlementReceiver: "Maintenance Dept",
      },
    ],
    operationsData: [
      {
        controlKey: "PM01",
        duration: "8h",
        mainWorkcenter: "Compressor Maintenance Team",
        operationDescription: "Replace oil filter and inspect",
        operationNo: "0010",
        plannedManpower: "2",
      },
      {
        controlKey: "PM01",
        duration: "8h",
        mainWorkcenter: "Compressor Maintenance Team",
        operationDescription: "Replace oil filter and inspect",
        operationNo: "0010",
        plannedManpower: "2",
      },
    ],
    notificationDate: "2025-08-10",
    notificationNumber: "NTF-20250810-00123",
    orderDescription: "Urgent compressor inspection",
    orderNumber: "WO-20250810-00123",
    orderStatus: "Open",
    reportedBy: "John Doe",
  };

  const updateWorkOrderDetails = (workOderDetailsUpdated) => {
    setWorkOrderDetails(workOderDetailsUpdated);
  };

  const handleClickYes = async () => {
    setLoading(true);
    router.push(`/opsedge/home`);

    setLoading(true);
    const createWorkOrderResponse = await createWorkOder(workOrderDetails);
    console.log("Insight details data:", createWorkOrderResponse);
    if (
      createWorkOrderResponse.statusCode == 401 ||
      createWorkOrderResponse.statusCode == 403
    ) {
      showError(
        createWorkOrderResponse.message || "Invalid token or access denied"
      );
      router.push("/login");
    } else if (
      createWorkOrderResponse.statusCode &&
      createWorkOrderResponse.statusCode !== 200
    ) {
      showError(
        createWorkOrderResponse.message || "Failed to fetch anamoly list"
      );
    } else {
      showSuccess(
        createWorkOrderResponse.message || "Notification created successfully"
      );
      router.push(`/opsedge/home`);
    }
  };

  const handleClickNo = () => {
    setLoading(true);
    router.push("/opsedge/workorder");
  };

  const handleClickEdit = () => {
    setEdit(true);
  };

  return (
    <>
      {loading && (
        <RippleLoader />
      )}
      <div className="w-full h-[calc(100vh-112px)] bg-gray-900 text-gray-300 flex gap-4">
        <div className="w-2/3 bg-slate-800 rounded-xl shadow-lg ring-2 ring-[#00ffcc]/40 p-6 justify-center overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={generating ? "loading" : edit ? "edit" : "details"}
              variants={flipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {generating ? (
                <Loader3D />
              ) : (
                <>
                  {edit ? (
                    <EditWorkOrder
                      updateWorkOrderDetails={updateWorkOrderDetails}
                      initialData={workOrderDetails?.workorderDetails}
                    />
                  ) : (
                    <>
                      {workOrderDetailsError ? (
                        <div className=" text-center p-4">
                          {workOrderDetailsError}
                        </div>
                      ) : (
                        workOrderDetails &&
                        workOrderDetails != null && (
                          <WorkOrderDetails
                            data={workOrderDetails?.workorderDetails}
                          />
                        )
                      )}
                    </>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-1/3 flex flex-col bg-slate-800 p-4 rounded-xl shadow-lg ring-2 ring-[#00ffcc]/40 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={
                generating
                  ? "right-loading"
                  : edit
                  ? "right-edit"
                  : "right-details"
              }
              variants={flipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: "preserve-3d" }}
            >
              {generating ? (
                <>
                  <img
                    src="/images/working.gif"
                    alt="Aivee Bot"
                    className="w-80 h-70 mb-6 mx-auto"
                  />
                  <SystemFacts />
                </>
              ) : (
                <>
                  <img
                    src="/images/thumbsup.gif"
                    alt="Aivee Bot"
                    className="w-55 h-80 mb-4 mx-auto"
                  />

                  <div className="text-center text-md mt-6 mb-4 leading-snug">
                    {!edit ? (
                      <>
                        🚨 Ready to create a Work Order for this issue?
                        <br />
                        Or would you like to&nbsp;
                        <button
                          onClick={handleClickEdit}
                          className="underline text-[#00ffcc] hover:text-[#00ddb1] transition-colors duration-200"
                          type="button"
                        >
                          review and edit details
                        </button>
                        &nbsp;before proceeding?
                      </>
                    ) : (
                      <>✅ You can create the Work Order now.</>
                    )}
                  </div>

                  <div className="flex gap-4 justify-center mt-auto">
                    <button
                      onClick={handleClickYes}
                      className="p-2 rounded-lg border border-[#00ffcc] bg-slate-900/50 hover:bg-green-500/20 hover:border-green-400 transition-all duration-200 flex items-center justify-center"
                      disabled={loading}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default ViewWorkOrder;

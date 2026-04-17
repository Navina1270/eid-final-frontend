"use client";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loader3D from "../Dashboard/Loader3D";
import SystemFacts from "../SystemFacts/SystemFacts";
import EditNotification from "./EditNotification";
import NotificationDetails from "./NotificationDetails";

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

import { useSearchParams } from "next/navigation";
import {
  createNotification,
  generateNotification,
} from "@/services/dashboardServices";
import { showError, showSuccess } from "@/utils/toastUtils";
import { clearAuthStorage } from "@/utils/authUtils";
const ViewNotification = () => {
  const searchParams = useSearchParams();
  const rcaId = searchParams.get("rcaId");

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const [generating, setGenerating] = useState(true);

  const [notificationDetails, setNotificationDetails] = useState();
  const [notificationDetailsError, setNotificationDetailsError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setGenerating(true);

      const notificationDetails = await generateNotification(rcaId, "");
      console.log("Insight details data:", notificationDetails);
      if (
        notificationDetails.statusCode == 401 ||
        notificationDetails.statusCode == 403
      ) {
        setNotificationDetailsError("");
        showError(
          notificationDetails.message || "Invalid token or access denied"
        );
        setNotificationDetails(null);
        clearAuthStorage(router);
      } else if (
        notificationDetails.statusCode &&
        notificationDetails.statusCode !== 200
      ) {
        setNotificationDetailsError(
          notificationDetails.message || "Failed to fetch anamoly list"
        );
        showError(
          notificationDetails.message || "Failed to fetch anamoly list"
        );
        setNotificationDetails(null);
      } else {
        setNotificationDetails(notificationDetails.data);
        setNotificationDetailsError("");
      }
      setGenerating(false);
    };
    if (rcaId != null) {
      fetchData();
    }
  }, []);

  const data = {
    equipment: "B32-GS-HQ0-K0001",
    equipmentDescription: "High-Pressure Compressor",
    functionalLocation: "Plant-01/Area-03/Unit-07",
    functionalLocationDescription: "Main compressor unit in area 3",
    longText:
      "The compressor has shown unusual vibration levels and pressure drops over the last 24 hours. Immediate inspection recommended.",
    mainWorkCenter: "Compressor Maintenance Team",
    notificationDate: "2025-08-10",
    notificationNumber: "NTF-20250810-00123",
    notificationStatus: "Hi",
    notificationType: "Breakdown",
    plannerGroup: "Mechanical Maintenance",
    priority: "High",
    reportedBy: "John Doe",
    requiredStart: "2025-08-11",
    requiredEnd: "2025-08-20",
    shortText: "Urgent compressor issue needs inspection",
  };

  const updateNotificationDetails = (NotificationDetailsUpdated) => {
    setNotificationDetails({ notificationDetails: NotificationDetailsUpdated });
  };

  const handleClickYes = async (notificationNumber) => {
    setLoading(true);
    const createNotificationResponse = await createNotification(
      notificationDetails?.notificationDetails
    );
    console.log("Insight details data:", createNotificationResponse);
    if (
      createNotificationResponse.statusCode == 401 ||
      createNotificationResponse.statusCode == 403
    ) {
      showError(
        createNotificationResponse.message || "Invalid token or access denied"
      );
      clearAuthStorage(router);
    } else if (
      createNotificationResponse.statusCode &&
      createNotificationResponse.statusCode !== 200
    ) {
      showError(
        createNotificationResponse.message || "Failed to fetch anamoly list"
      );
      setLoading(false);
    } else {
      showSuccess(
        createNotificationResponse.message ||
        "Notification created successfully"
      );
      router.push(
        `/opsedge/view_workorder?notificationNumber=${notificationNumber}`
      );
    }
  };

  const getNotificationDetails = (notificationDetails) => {
    setNotificationDetails({ notificationDetails: notificationDetails });
  };

  const handleClickNo = () => {
    setLoading(true);
    router.push("/opsedge/notification");
  };

  const handleClickEdit = () => {
    setEdit(true);
  };

  return (
    <>
      {loading && <RippleLoader />}
      {!loading && (
        <div className="w-full h-[calc(100vh-112px)] text-gray-300 flex gap-4 perspective-1000">
          <div className="w-2/3 h-full bg-slate-800 rounded-xl shadow-lg ring-2 ring-[#00ffcc]/40 p-6 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  generating && rcaId != null
                    ? "loading"
                    : edit || rcaId == null
                      ? "edit"
                      : "details"
                }
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {generating && rcaId != null ? (
                  <Loader3D />
                ) : edit || rcaId == null ? (
                  <EditNotification
                    rcaId={rcaId}
                    initialData={
                      rcaId == null
                        ? {}
                        : notificationDetails.notificationDetails
                    }
                    getNotificationDetails={getNotificationDetails}
                    updateNotificationDetails={updateNotificationDetails}
                    setLoading={setLoading}
                  />
                ) : (
                  <>
                    {notificationDetailsError ? (
                      <div className=" text-center p-4">
                        {notificationDetailsError}
                      </div>
                    ) : (
                      notificationDetails &&
                      notificationDetails != null && (
                        <NotificationDetails
                          data={notificationDetails.notificationDetails}
                        />
                      )
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-1/3 flex flex-col bg-slate-800 p-4 rounded-xl shadow-lg ring-2 ring-[#00ffcc]/40 overflow-hidden">
            {!notificationDetailsError && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={
                    generating && rcaId != null
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
                  {generating && rcaId != null ? (
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
                        {!edit && rcaId != null ? (
                          <>
                            🚨 Ready to create a Notification for this issue?
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
                        ) : notificationDetails?.notificationDetails
                          ?.notificationNumber ? (
                          <>✅ You can create the notification now.</>
                        ) : (
                          <>
                            Before continuing, provide a short text and click
                            Create to generate the notification
                          </>
                        )}
                      </div>
                      <div className="flex gap-4 justify-center mt-auto">
                        {notificationDetails?.notificationDetails
                          ?.notificationNumber && (
                            <button
                              onClick={() =>
                                handleClickYes(
                                  notificationDetails?.notificationDetails?.notificationNumber
                                )
                              }
                              className="p-2 rounded-lg border border-[#00ffcc] bg-slate-900/50 hover:bg-green-500/20 hover:border-green-400 transition-all duration-200 flex items-center justify-center"
                              disabled={loading}
                            >
                              <CheckCircleIcon className="w-7 h-7 text-green-400" />
                            </button>
                          )}
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewNotification;

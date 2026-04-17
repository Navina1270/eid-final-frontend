"use client";
import NextButton from "@/components/Common/Form/NextButton";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import Table from "@/components/Common/Table/Table";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { getNotificationList, viewNotification } from "@/services/dashboardServices";
import { showError } from "@/utils/toastUtils";
import NotificationDetails from "../ViewNotification/NotificationDetails";
import { clearAuthStorage } from "@/utils/authUtils";

const Notification = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const closeModal = () => {
    setShowModalDetails(false);
  }
  const [isWorkOrderCreated, setIsWorkOrderCreated] = useState(false);
  const [notificationList, setNotificationList] = useState();
  const [notificationListError, setNotificationListError] = useState("");
  const [viewNotificationDetails, setViewNotificationDetails] = useState();
  const [viewNotificationDetailsError, setViewNotificationDetailsError] = useState("");
  const [row, setRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const notificationList = await getNotificationList();
      console.log("Notification List data:", notificationList);
      if (notificationList.statusCode == 401 || notificationList.statusCode == 403) {
        setNotificationListError("");
        showError(notificationList.message || "Invalid token or access denied");
        setNotificationList(null);
        clearAuthStorage(router)
      } else if (notificationList.statusCode && notificationList.statusCode !== 200) {
        setNotificationListError(notificationList.message || "Failed to fetch notification list");
        showError(notificationList.message || "Failed to fetch notification list");
        setNotificationList(null);
      } else {
        setNotificationList(notificationList);
        setNotificationListError("");
      };
      setLoading(false);
    }
    fetchData();
  }, []);


  const data1 = {
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
        startDate: "2025-08-11"
      }
    ],
    componentsData: [
      {
        materialDescription: "Compressor Oil Filter",
        materialNumber: "MAT-00234",
        quantity: "4",
        reservationNo: "RSV-20250811-001",
        storageLocation: "Warehouse-1",
        systemCondition: "Good"
      }
    ],
    costsData: [
      {
        assembly: "Assembly-1",
        costCenter: "CC-1001",
        costcenterDescription: "Compressor Maintenance",
        estimatedCosts: "$1500",
        settlementReceiver: "Maintenance Dept"
      }
    ],
    operationsData: [
      {
        controlKey: "PM01",
        duration: "8h",
        mainWorkcenter: "Compressor Maintenance Team",
        operationDescription: "Replace oil filter and inspect",
        operationNo: "0010",
        plannedManpower: "2"
      },
      {
        controlKey: "PM01",
        duration: "8h",
        mainWorkcenter: "Compressor Maintenance Team",
        operationDescription: "Replace oil filter and inspect",
        operationNo: "0010",
        plannedManpower: "2"
      }
    ],
    notificationDate: "2025-08-10",
    notificationNumber: "NTF-20250810-00123",
    orderDescription: "Urgent compressor inspection",
    orderNumber: "WO-20250810-00123",
    orderStatus: "Open",
    reportedBy: "John Doe"
  };

  const openDetailsModal = async (row) => {
    try {
      setRow(row);
      setLoading(true);
      console.log("Redirecting to Notification for:", row);

      if (row && row["Work Order"] === "Not Generated") {
        setIsWorkOrderCreated(false);
      } else {
        setIsWorkOrderCreated(true);
      }

      const notificationDetails = await viewNotification(row["Notification Number"]);
      console.log("!!! details data:", notificationDetails);

      if (notificationDetails.statusCode === 401 || notificationDetails.statusCode === 403) {
        setViewNotificationDetailsError("Invalid token or access denied");
        showError(notificationDetails.message || "Invalid token or access denied");
        setViewNotificationDetails(null);
        clearAuthStorage(router)
      } else if (notificationDetails.statusCode && notificationDetails.statusCode !== 200) {
        setViewNotificationDetailsError(notificationDetails.message || "Failed to fetch notification details");
        showError(notificationDetails.message || "Failed to fetch notification details");
        setViewNotificationDetails(null);
      } else {
        setViewNotificationDetailsError("");
        setViewNotificationDetails(notificationDetails.notificationDetails);
      }

      setShowModalDetails(true);
    } catch (error) {
      console.error("Error fetching Notification details:", error);
      // showError("Something went wrong while fetching Notification details.");
    } finally {
      setLoading(false);
    }
  };


  const redirectToWorkorder = () => {
    setLoading(true);
    router.push(`/opsedge/view_workorder?notificationNumber=${row["Notification Number"]}`);
  }


  return (
    <>
      {loading && (
        <RippleLoader />
      )}

      {showModalDetails && viewNotificationDetails && (
        <ModalComponent
          isHeading={false}
          modalData={
            <>
              {viewNotificationDetailsError ? (
                <div className=" text-center p-4">
                  {viewNotificationDetailsError}
                </div>
              ) : viewNotificationDetails && viewNotificationDetails != null && (
                <>
                  <NotificationDetails data={viewNotificationDetails} />
                  {!isWorkOrderCreated && (
                    <div className="sticky bg-slate-800 bottom-0 border-t pt-2 flex justify-center gap-6 items-center">
                      <span className="text-[18px] font-semibold ">
                        Do you want to create Work Order?
                      </span>
                      <NextButton
                        label="Create Work Order"
                        onClick={redirectToWorkorder}
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
      <div className=" bg-gray-900 rounded-xl text-white">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-green-800 px-5 py-2 rounded-full text-sm font-semibold text-green-300 shadow-sm border border-green-500">
              <CheckCircleIcon className="h-5 w-5 stroke-green-300" />
              <span>Closed - {notificationList?.closed}</span>
            </div>

            <div className="flex items-center gap-2 bg-yellow-800 px-5 py-2 rounded-full text-sm font-semibold text-yellow-300 shadow-sm border border-yellow-500">
              <ClockIcon className="h-5 w-5 stroke-yellow-300" />
              <span>Open - {notificationList?.open}</span>
            </div>
          </div>


          <div className="ml-auto">
            <NextButton
              label="Add New"
              onClick={() => {
                setLoading(true);
                router.push("/opsedge/view_notification")
              }}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl  font-bold text-center text-[#00ffcc] pb-1 w-full">
            Notification List
          </h2>
        </div>
        {notificationListError ? (
          <div className=" text-center p-4">
            {notificationListError}
          </div>
        ) : notificationList && notificationList != null && (
          <Table
            tableData={notificationList.data}
            redirectTo={openDetailsModal}
            labels={["Notification Number", "Equipment", "Maintenance Type", "Priority", "Notification Date", "Status", "Work Order"]}
            visibleRows={10}
          />
        )}
      </div>


    </>
  );

};

export default Notification;

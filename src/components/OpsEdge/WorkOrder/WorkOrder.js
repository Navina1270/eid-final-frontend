"use client";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import Table from "@/components/Common/Table/Table";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import WorkOrderDetails from "../ViewWorkOrder/WorkOrderDetails";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import { getWorkOrderList, saveWorkOrderStatus, viewWorkOrder } from "@/services/dashboardServices";
import { showError, showSuccess } from "@/utils/toastUtils";
import { clearAuthStorage } from "@/utils/authUtils";

export default function WorkOrder() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [workOrderList, setWorkOrderList] = useState();
  const [workOrderListError, setWorkOrderListError] = useState("");
  const [viewWorkOrderDetails, setViewWorkOrderDetails] = useState();
  const [viewWorkOrderDetailsError, setViewWorkOrderDetailsError] = useState("");
  const [row, setRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const workOrderList = await getWorkOrderList();
      console.log("Notification List data:", workOrderList);
      if (workOrderList.statusCode == 401 || workOrderList.statusCode == 403) {
        setWorkOrderListError("");
        showError(workOrderList.message || "Invalid token or access denied");
        setWorkOrderList(null);
        clearAuthStorage(router)
      } else if (workOrderList.statusCode && workOrderList.statusCode !== 200) {
        setWorkOrderListError(workOrderList.message || "Failed to fetch anamoly list");
        showError(workOrderList.message || "Failed to fetch anamoly list");
        setWorkOrderList(null);
      } else {
        setWorkOrderList(workOrderList.data);
        setWorkOrderListError("");
      };
      setLoading(false);
    }
    fetchData();
  }, []);

  const closeModal = () => {
    setShowModal(false)
  }


  const tableData = [
    {
      "id": 1,
      "Equipment Name": "HP Compressor",
      "Maintenance Type": "Preventive",
      Priority: "High",
      Status: "In Progress",
    },
    {
      "id": 2,
      "Equipment Name": "LP Compressor",
      "Maintenance Type": "Corrective",
      Priority: "Medium",
      Status: "Completed",
    },
    {
      "id": 3,
      "Equipment Name": "LP Compressor",
      "Maintenance Type": "Predictive",
      Priority: "Low",
      Status: "Schedule",
    },
    {
      "id": 4,
      "Equipment Name": "HP Compressor",
      "Maintenance Type": "Emergency",
      Priority: "High",
      Status: "Pending Approval",
    },
  ];

  const data = {
    headerdata: [
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
    componentsdata: [
      {
        materialDescription: "Compressor Oil Filter",
        materialNumber: "MAT-00234",
        quantity: "4",
        reservationNo: "RSV-20250811-001",
        storageLocation: "Warehouse-1",
        systemCondition: "Good"
      }
    ],
    costsdata: [
      {
        assembly: "Assembly-1",
        costCenter: "CC-1001",
        costcenterDescription: "Compressor Maintenance",
        estimatedCosts: "$1500",
        settlementReceiver: "Maintenance Dept"
      }
    ],
    operationsdata: [
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
    workorderdetails:
    {
      notificationDate: "2025-08-10",
      notificationNumber: "NTF-20250810-00123",
      orderDescription: "Urgent compressor inspection",
      orderNumber: "WO-20250810-00123",
      orderStatus: "Open",
      reportedBy: "John Doe}"
    }
  }

  const save = async (status) => {

    console.log("Status", status)
    const workOrderStatus = await saveWorkOrderStatus(row["Order Number"], row["Notification Number"], status)
    console.log("workOrderStatus", workOrderStatus)
    if (workOrderStatus.statusCode === 401 || workOrderStatus.statusCode === 403) {
      showError(workOrderStatus.message || "Invalid token or access denied");
    } else if (workOrderStatus.statusCode && workOrderStatus.statusCode !== 200) {
      showError(workOrderStatus.message || "Failed to fetch anomaly list");
    } else {
      showSuccess(workOrderStatus.message || "Status saved successfully");

    }
  }
  const openDetailsModal = async (row) => {
    try {
      setRow(row);
      setLoading(true);
      console.log("Redirecting to RCA for:", row);

      const workOrderDetails = await viewWorkOrder(row["Order Number"], row["Notification Number"]);
      console.log("Insight details data:", workOrderDetails);

      if (workOrderDetails.statusCode === 401 || workOrderDetails.statusCode === 403) {
        setViewWorkOrderDetailsError("Invalid token or access denied");
        showError(workOrderDetails.message || "Invalid token or access denied");
        setViewWorkOrderDetails(null);
      } else if (workOrderDetails.statusCode && workOrderDetails.statusCode !== 200) {
        setViewWorkOrderDetailsError(workOrderDetails.message || "Failed to fetch anomaly list");
        showError(workOrderDetails.message || "Failed to fetch anomaly list");
        setViewWorkOrderDetails(null);
      } else {
        setViewWorkOrderDetailsError("");
        setViewWorkOrderDetails(workOrderDetails?.data);
      }

      setShowModal(true);
    } catch (error) {
      console.error("Error fetching RCA details:", error);
      // showError("Something went wrong while fetching RCA details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <RippleLoader />
      )
      }

      {showModal && (
        <ModalComponent
          isHeading={false}
          modalData={
            <>
              {viewWorkOrderDetailsError ? (
                <div className=" text-center p-4">
                  {viewWorkOrderDetailsError}
                </div>
              ) : viewWorkOrderDetails && viewWorkOrderDetails != null && (
                <WorkOrderDetails data={viewWorkOrderDetails} isStatus={true} save={save} />
              )}
            </>
          }
          onClose={closeModal}
        />
      )
      }
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl  font-bold text-center text-[#00ffcc] pb-1 w-full">
          WorkOrder List
        </h2>
      </div>
      {
        workOrderListError ? (
          <div className="text-center p-4">
            {workOrderListError}
          </div>
        ) : workOrderList && workOrderList != null && (
          <Table
            tableData={workOrderList}
            redirectTo={openDetailsModal}
            labels={["Order Number", "Notification Number", "Equipment", "Maintenance Type", "Priority", "Order Date", "Status"]}
            visibleRows={10}
          />
        )
      }
    </>
  );
}

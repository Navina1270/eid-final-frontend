"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAnamolyList } from "@/services/dashboardServices";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import Table from "@/components/Common/Table/Table";
import { showError } from "@/utils/toastUtils";

export default function AnomalyList() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [anomalyData, setAnomalyData] = useState([]);
  const [error, setError] = useState("");

  const fetchAnomalies = async () => {
    setLoading(true);
    // Using the dates requested by the user
    const startTime = "2025-05-01 00:00:00";
    const endTime = "2025-06-13 23:59:59";
    
    try {
      const response = await getAnamolyList(null, startTime, endTime);
      console.log("Anomaly List response:", response);

      if (response.statusCode === 200) {
        setAnomalyData(response.data || []);
        setError("");
      } else {
        setError(response.message || "Failed to fetch anomalies");
        showError(response.message || "Failed to fetch anomalies");
      }
    } catch (err) {
      console.error("Error fetching anomalies:", err);
      setError("An unexpected error occurred");
      showError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  const handleRowClick = (row) => {
    // Navigate to Insight details for this anomaly
    const qs = new URLSearchParams({
      equipmentId: row.equipment || "C001#EQ001",
      anomalyId: row["anomaly id"] || "",
      anomalyTime: row["Start Time"] || ""
    }).toString();
    
    router.push(`/opsedge/insight?${qs}`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {loading && <RippleLoader />}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Anomaly List
        </h2>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          Period: <span className="font-semibold">May - June 13, 2025</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 overflow-hidden">
        {error ? (
          <div className="text-center py-10 text-slate-500 font-medium italic">
            {error}
          </div>
        ) : (
          <Table
            tableData={anomalyData}
            labels={["anomaly id", "equipment", "Start Time", "rca status", "Remark"]}
            redirectTo={handleRowClick}
            visibleRows={10}
          />
        )}
      </div>
      
      <div className="mt-4 flex gap-4">
        <button 
           onClick={fetchAnomalies}
           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md font-medium"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}

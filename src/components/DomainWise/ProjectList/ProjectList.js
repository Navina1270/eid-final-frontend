"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProjectList } from "@/services/projectServices";
import { toast, Toaster } from "sonner";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import NextButton from "@/components/Common/Form/NextButton";
import Table from "@/components/Common/Table/Table";
import { showError } from "@/utils/toastUtils";
import { clearAuthStorage } from "@/utils/authUtils";

export default function ProjectList() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [projectListData, setProjectListData] = useState([]);

  const handleAddProject = () => {
    setLoading(true);
    router.push("/domainwise/create_project");
  };

  const fetchProjectList = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await getProjectList(accessToken);
      if (response.statusCode === 200) {
        setProjectListData(response?.data);
      } else {
        showError(response.message);
        clearAuthStorage(router);
      }
    } catch (error) {
      console.error("Failed to fetch project list:", error);
      showError("Something went wrong. Please try again.");
      clearAuthStorage(router);
    }
  };

  useEffect(() => {
    // fetchProjectList(); // Disabling API call as per user request
    router.replace("/opsedge/flow_diagram");
  }, [router]);

  return (
    <>
      {loading && (
        <RippleLoader />
      )}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f87171",
            border: "1px solid #22d3ee",
            justifyContent: "center",
          },
        }}
      />

      <div className="px-8 py-2 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
            Create Project
          </h2>
          <NextButton onClick={handleAddProject} label="Add Project" />
        </div>
        <Table
          tableData={projectListData}
          labels={[
            "name",
            "description",
            "kg URL",
            "creation Date",
            "last Updated",
          ]}
        />
      </div>
    </>
  );
}

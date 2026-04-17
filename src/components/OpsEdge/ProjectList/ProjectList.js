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
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";

export default function ProjectList() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [projectListData, setProjectListData] = useState([]);
const[showModalDetails,setShowModalDetails]=useState(false);
const [selectedRowName, setSelectedRowName] = useState("");
  const handleAddProject = () => {
    setLoading(true);
    router.push("/opsedge/create_project");
  };

  const fetchProjectList = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await getProjectList(accessToken);
      if (response.statusCode === 200) {
        // setProjectListData(response?.data);
              const projectList = response?.data || [];

              // Get the default project name from localStorage
              const defaultProject = localStorage.getItem("defaultProject");
                      if(defaultProject == null){
                        localStorage.setItem(
                            "defaultProject",
                            response?.data[0]?.name
                          )
                          window.location.reload()

                      }
        console.log("Default Project from localStorage:", defaultProject);
              // Map over project list to append label
              const updatedList = projectList.map((project) => ({
                ...project,
                "is Default":
                  project.name == defaultProject ? (
                    <img
                      src="/logo/check.png"
                      alt="check Icon"
                      className="inline-block mr-2 w-6 h-6"
                    />
                  ) : (
                    ""
                  ),
              }));

              console.log("Updated Project List:", updatedList);
              setProjectListData(updatedList);
              // setSelectedRowName(defaultProject)

      } else {
        showError(response.message || "Failed to load project list.");
        setProjectListData([]);
      }
    } catch (error) {
      console.error("Failed to fetch project list:", error);
      showError("Something went wrong while loading projects.");
      setProjectListData([]);
    }
  };

  useEffect(() => {
    // fetchProjectList(); // Disabling API call as per user request
    router.replace("/opsedge/flow_diagram");
  }, [router]);

    const openDetailsModal = async (row) => {
      try {
        // setLoading(true);
         console.log("Row data:", row);
        setSelectedRowName(row.name);
        setShowModalDetails(true);
      } catch (error) {
        console.error("Error fetching Project details:", error);
        // showError("Something went wrong while fetching Notification details.");
      } finally {
        setLoading(false);
      }
    };

      const closeModal = () => {
        setShowModalDetails(false);
      };

      const selectProject = (choice) => {
        if (choice == "Yes") {
          localStorage.setItem("defaultProject", selectedRowName);
          // setSelectedRowName(selectedRowName);
          toast.success("Default Project Set Successfully");
          fetchProjectList();
        }
        setShowModalDetails(false);
      };

  return (
    <>
      {loading && <RippleLoader />}
      {showModalDetails && (
        <ModalComponent
          heading={"Set Default Project"}
          modalData={
            <>
              <div className="sticky bg-slate-800 bottom-0 border-t pt-2 flex justify-center gap-6 items-center">
                <h2 className="text-[18px] font-semibold ">
                  Do you want to set{" "}
                  <span className="text-[#00ffcc] text-2xl">{selectedRowName} </span> as
                  a default Project?
                </h2>
              </div>
              <div className="text-center p-4">
                <button onClick={() => selectProject("Yes")}>
                  <img
                    src="/logo/check.png"
                    alt="check Icon"
                    className="inline-block mr-2 w-8 h-8"
                  />
                </button>
                <button onClick={closeModal}>
                  <img
                    src="/logo/cancel.png"
                    alt="check Icon"
                    className="inline-block mr-2 w-8 h-8"
                  />
                </button>
              </div>
            </>
          }
          onClose={closeModal}
        />
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
        {/* <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
            Create Project
          </h2>
          </div> */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl  font-bold text-center text-[#00ffcc] pb-1 ">
            Project List
          </h2>
          <NextButton onClick={handleAddProject} label="Add Project" />
        </div>
        <Table
          tableData={projectListData}
          redirectTo={openDetailsModal}
          labels={[
            "name",
            "description",
            "kg URL",
            "creation Date",
            "last Updated",
            "is Default",
          ]}
        />
      </div>
    </>
  );
}

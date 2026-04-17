"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Common/Table/Table";
import { useRouter } from "next/navigation";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import { getVisualsList } from "@/services/visualsServices";
import { showError } from "@/utils/toastUtils";
import { clearAuthStorage } from "@/utils/authUtils";

const Visuals = () => {
  const [loading, setLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [visualsList, setVisualList] = useState([]);
  const router = useRouter();

  const redirectToVisualChart = (row) => {
    console.log("Tag clicked from visuals=============>", row);
    const redirectURL = `/opsedge/visuals/charts?visualId=${row.id}`;
    // router.push(`/opsedge/visuals/charts?visualId=${row.id}`);
    window.open(redirectURL, "_blank");
  };

  useEffect(() => {
    const fetchVisualsList = async () => {
      setLoading(true);
      const visualListResponse = await getVisualsList();
      if (visualListResponse.statusCode === 200) {
        setLoading(false);
        console.log(
          "Visual list fetched successfully=======================>",
          visualListResponse.data
        );
        setVisualList(visualListResponse.data);
      } else if (
        visualListResponse.statusCode === 403 ||
        visualListResponse.statusCode === 401
      ) {
        showError(
          visualListResponse.message || "Invalid token or access denied"
        );
        clearAuthStorage(router);
      } else {
        setLoading(false);
        console.log(
          "Failed to fetch visuals list=================>",
          visualListResponse``
        );
      }
    };
    fetchVisualsList();
  }, []);

  return (
    <>
      {loading && <RippleLoader></RippleLoader>}
      {!loading && (
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl  font-bold text-center text-[#00ffcc] pb-1 w-full">
              Visuals
            </h2>
          </div>
          <Table tableData={visualsList} redirectTo={redirectToVisualChart} />
        </div>
      )}
    </>
  );
};

export default Visuals;

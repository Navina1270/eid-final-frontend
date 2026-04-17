"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import NextButton from "@/components/Common/Form/NextButton";
import { useRouter, useSearchParams } from "next/navigation";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import Table from "@/components/Common/Table/Table";
import { format } from "date-fns";
import {
  addVisuals,
  deleteSelectedTag,
  getTagList,
  getVisualsDetails,
} from "@/services/visualsServices";
import { showError, showSuccess, showWarning } from "@/utils/toastUtils";
import {
  EyeIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import CheckboxInput from "@/components/Common/Form/CheckboxInput";
import TextInput from "@/components/Common/Form/TextInput";
import DateRangeInput from "@/components/Common/Form/DateRangeInput";
import { formatDateTimeChart } from "@/utils/dateTime";
import VisualChart from "@/components/Common/Graphs/VisualChart/VisualChart";
import { CircularProgress } from "@mui/material";
import { clearAuthStorage } from "@/utils/authUtils";

const ViewVisuals = () => {
  const searchParams = useSearchParams();
  const visualId = searchParams.get("visualId");
  const now = new Date();
  const savedFrom =
    typeof window !== "undefined" ? sessionStorage.getItem("fromDate") : null;

  const savedTo =
    typeof window !== "undefined" ? sessionStorage.getItem("toDate") : null;

  const savedEquimentAndTagId =
    typeof window !== "undefined"
      ? sessionStorage.getItem(`visualId${visualId}`)
      : null;

  const defaultFrom = savedFrom || format(new Date("2024-06-01"), "yyyy-MM-dd");
  const defaultTo = savedTo || format(now, "yyyy-MM-dd");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingSelectedTagList, setLoadingSelectedTagList] = useState(false);
  const [resetTags, setResetTags] = useState(false);
  const [dashboardName, setDashboardName] = useState("");
  const [visualsAddMethod, setVisualsAddMethod] = useState("existing");
  const [tagListModalOpen, setTagListModalOpen] = useState(false);
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [filteredTagList, setFilteredTagList] = useState([]);
  const [newTags, setNewTags] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [visualChartData, setVisualChartData] = useState([]);
  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate, setToDate] = useState(defaultTo);
  const [equipmentId, setEquipmentId] = useState(
    JSON.parse(savedEquimentAndTagId || "{}")?.equipmentId ?? ""
  );
  const [tagId, setTagId] = useState(
    JSON.parse(savedEquimentAndTagId || "{}")?.tagId ?? []
  );
  const [tagTableData, setTagTableData] = useState([]);

  const router = useRouter();

  const searchTags = (e) => {
    const value = e.target.value || "";
    setSearchInput(value);

    if (!value) {
      setFilteredTagList(tagList || []);
      return;
    }
    const lowerValue = value.toLowerCase();

    const searchWords = lowerValue.split(/\s+/).filter(Boolean);

    const filtered = (tagList || []).filter((tag) => {
      const description = (tag?.["tag Description"] ?? "")
        .toString()
        .toLowerCase();
      const id = (tag?.["tag Id"] ?? "").toString().toLowerCase();

      const searchableText = `${description} ${id}`;

      return searchWords.every((word) => searchableText.includes(word));
    });

    setFilteredTagList(filtered);
  };

  const handleCheckboxChange = (tagId) => {
    setNewTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  useEffect(() => {
    const updatedList = tagTableData.map((tag) => ({
      "": (
        <EyeIcon
          className={`w-5 h-5 cursor-pointer hover:scale-110 transition-transform ${
            visualChartData.find((d) => d.name === tag.Name)?.visible === false
              ? "text-gray-400"
              : "text-green-400"
          }`}
          onClick={() => toggleTraceVisibility(tag.Name)}
        />
      ),
      ...tag,
      Remove: (
        <TrashIcon
          className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors hover:scale-110"
          onClick={() => removeSelectedTag(tag)}
        />
      ),
    }));
    setSelectedTagList(updatedList);
  }, [visualChartData, tagTableData]);

  const fetchVisualsData = async (start, end) => {
    const visualsDataResponse = await getVisualsDetails(
      visualId,
      start,
      end,
      equipmentId,
      tagId
    );
    if (visualsDataResponse.statusCode === 200) {
      console.log(
        "Visuals data=========================>",
        visualsDataResponse
      );
      // setVisualChartData(
      //   visualsDataResponse?.data[0]?.tagGraph.map((trace) => ({
      //     ...trace,
      //     visible: true,
      //   }))
      // );

      const newTraces = visualsDataResponse?.data[0]?.tagGraph || [];

      // Preserve visibility from previous state
      setVisualChartData((prevData) =>
        newTraces.map((trace) => {
          const existing = prevData.find((t) => t.name === trace.name);
          return {
            ...trace,
            visible: existing?.visible ?? true,
          };
        })
      );

      setTagTableData(visualsDataResponse?.data[1]?.tagTable || []);

      // updateSelectedTagList(visualsDataResponse?.data[1]?.tagTable);
      setTagId(visualsDataResponse?.tagId);
      setEquipmentId(visualsDataResponse?.equipmentId);
      setDashboardName(visualsDataResponse?.dashboardName);
      sessionStorage.setItem(
        `visualId${visualId}`,
        JSON.stringify({
          tagId: visualsDataResponse.tagId,
          equipmentId: visualsDataResponse.equipmentId,
        })
      );
    } else if (
      visualsDataResponse.statusCode == 401 ||
      visualsDataResponse.statusCode == 403
    ) {
      showError(
        visualsDataResponse.message || "Invalid token or access denied"
      );
      clearAuthStorage(router);
    } else {
      showError(visualsDataResponse?.message || "Something went wrong...");
    }
  };

  const fetchTagList = async () => {
    const tagListResponse = await getTagList(visualId);
    if (tagListResponse.statusCode === 200) {
      console.log(
        "Tag list fetched successfully==============>",
        tagListResponse
      );
      setTagList(tagListResponse.data[0]?.tagList);
      setFilteredTagList(tagListResponse.data[0]?.tagList);
    } else if (
      tagListResponse.statusCode === 401 ||
      tagListResponse.statusCode === 403
    ) {
      showError(tagListResponse.message || "Invalid token or access denied");
      clearAuthStorage(router);
    } else {
      showError(tagListResponse.message || "Something went wrong...");
    }
  };

  const removeSelectedTag = async (tag) => {
    const { Name: removedTagId } = tag;
    console.log("Removing selected tag===========>:", removedTagId);
    const deletedTagResponse = await deleteSelectedTag(visualId, [
      removedTagId,
    ]);
    if (deletedTagResponse.statusCode === 200) {
      showSuccess(deletedTagResponse?.message);
      setEquipmentId("");
      setTagId([]);
      setResetTags(true);
    } else if (
      deletedTagResponse.statusCode === 401 ||
      deletedTagResponse.statusCode === 403
    ) {
      showError(deletedTagResponse.message || "Invalid token or access denied");
      clearAuthStorage(router);
    } else {
      showError(deletedTagResponse.message || "Something went wrong...");
    }
  };

  const addNewVisuals = async () => {
    console.log("Existing and new added tag ids=================>", [
      ...tagId,
      ...newTags,
    ]);

    if (!newTags || newTags.length === 0) {
      showWarning("Select atleast one visual tag to proceed ");
      return;
    }

    const updatedTags = [...tagId, ...newTags];
    const addedTagsResponse = await addVisuals(
      visualsAddMethod,
      dashboardName,
      visualId,
      equipmentId,
      updatedTags
    );

    if (addedTagsResponse.statusCode === 200) {
      showSuccess(addedTagsResponse.message);
      setNewTags([]);
      setEquipmentId("");
      setTagId([]);
      setResetTags(true);
      setTagListModalOpen(false);
    } else if (
      addedTagsResponse.statusCode === 401 ||
      addedTagsResponse.statusCode === 403
    ) {
      showError(addedTagsResponse.message || "Invalid token or access denied");
      clearAuthStorage(router);
    } else {
      showError(addedTagsResponse.message || "Failed to add new visual tag");
    }
  };
  useEffect(() => {
    const init = async () => {
      console.log("Getting visual chart data for visual id", visualId);
      if (visualId !== null) {
        setIsLoading(true);
        await fetchVisualsData(
          formatDateTimeChart(fromDate),
          formatDateTimeChart(toDate)
        );
        await fetchTagList();
        setIsLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const updateTags = async () => {
      if (resetTags) {
        setLoadingSelectedTagList(true);
        await fetchVisualsData(
          formatDateTimeChart(fromDate),
          formatDateTimeChart(toDate)
        );
        await fetchTagList();
        setResetTags(false);
        setLoadingSelectedTagList(false);
      }
    };
    updateTags();
  }, [resetTags]);

  const applyDates = useCallback(async () => {
    const formattedFrom = formatDateTimeChart(fromDate);
    const formattedTo = formatDateTimeChart(toDate);

    const prevFrom = sessionStorage.getItem("fromDate");
    const prevTo = sessionStorage.getItem("toDate");

    if (prevFrom === formattedFrom && prevTo === formattedTo) {
      console.log(
        "Dates unchanged, skipped fetching visuals details==========>"
      );
      return;
    }

    sessionStorage.setItem("fromDate", formattedFrom);
    sessionStorage.setItem("toDate", formattedTo);

    await fetchVisualsData(formattedFrom, formattedTo);
  }, [fromDate, toDate]);

  const onRangeChange = (start, end) => {
    if (start === "FULL_RANGE") {
      fetchVisualsData(
        formatDateTimeChart(fromDate),
        formatDateTimeChart(toDate)
      );
    } else {
      fetchVisualsData(start, end);
    }
  };

  const toggleTraceVisibility = (tagName) => {
    setVisualChartData((prevData) =>
      prevData.map((trace) =>
        trace.name === tagName ? { ...trace, visible: !trace.visible } : trace
      )
    );
  };

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between m-3">
          {dashboardName ? (
            <h2 className="text-xl font-bold text-center text-[#00ffcc] pb-1">
              {dashboardName.toUpperCase()}
            </h2>
          ) : (
            // Placeholder to keep layout stable with opacity zero
            <div className="text-xl font-bold text-center pb-1 opacity-0">
              DUMMY_DASHBOARD
            </div>
          )}
          <div className="flex justify-center gap-2">
            <DateRangeInput
              fromValue={fromDate}
              toValue={toDate}
              onFromChange={setFromDate}
              onToChange={setToDate}
            />
            <button
              onClick={applyDates}
              className={`rounded-lg transition p-1 border border-gray-300 hover:scale-115 text-gray-300 cursor-pointer`}
            >
              <PaperAirplaneIcon className="w-7 h-5" />
            </button>
          </div>
          <NextButton
            onClick={() => setTagListModalOpen(!tagListModalOpen)}
            label="Add Data +"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center min-h-[150px] space-y-2">
            <CircularProgress size={28} thickness={4} color="inherit" />
            <span className="text-sm text-gray-500 mt-1">Loading chart...</span>
          </div>
        ) : (
          <>
            <div className="w-full h-[70vh]">
              <VisualChart
                data={visualChartData}
                onRangeChange={onRangeChange}
                onToggleVisibility={toggleTraceVisibility}
              />
            </div>
            {loadingSelectedTagList ? (
              <div className="flex flex-col justify-center items-center min-h-[150px] space-y-2">
                <CircularProgress size={28} thickness={4} color="inherit" />
                <span className="text-sm text-gray-500 mt-1">
                  Updating selected tag list...
                </span>
              </div>
            ) : (
              <div className="w-full mt-4">
                <Table tableData={selectedTagList} />
              </div>
            )}
          </>
        )}
      </div>

      {tagListModalOpen && (
        <ModalComponent
          isHeading={false}
          modalData={
            <div className="flex flex-col rounded-xl h-[65vh]">
              <div className="flex-shrink-0">
                <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-3 -mt-1 border-b border-[#00ffcc]/60 pb-1">
                  Add to visuals
                </h2>
              </div>

              <div className="flex-shrink-0 mb-2">
                <TextInput
                  onChange={searchTags}
                  value={searchInput}
                  placeholder={"Enter tag id"}
                />
              </div>

              <div className="flex-1 flex flex-col overflow-hidden p-2">
                <div className="flex-1 overflow-y-auto">
                  <Table
                    tableData={filteredTagList.map((tag) => ({
                      SELECT: (
                        <CheckboxInput
                          className="w-5 h-5 cursor-pointer"
                          checked={newTags.includes(tag["tag Id"])}
                          onChange={() => handleCheckboxChange(tag["tag Id"])}
                        />
                      ),
                      ...tag,
                    }))}
                  />
                </div>
              </div>

              <div className="flex-shrink-0 flex justify-center">
                <NextButton label="Submit" onClick={addNewVisuals} />
              </div>
            </div>
          }
          onClose={() => {
            setTagListModalOpen(false);
            setSearchInput("");
            setFilteredTagList(tagList);
          }}
        />
      )}
    </>
  );
};

export default ViewVisuals;

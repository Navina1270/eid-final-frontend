import React, { useState } from "react";
import BackButton from "@/components/Common/Form/BackButton";
import NextButton from "@/components/Common/Form/NextButton";
import SelectInput from "@/components/Common/Form/SelectInput";
import TextInput from "@/components/Common/Form/TextInput";
import CodeEditor from "./CodeEditor";
import OsiPi from "./TimeSeries/OsiPi";
import HoneywellPhd from "./TimeSeries/HoneywellPhd";
import AspenIp121 from "./TimeSeries/AspenIp121";

const TimeseriesAdd = ({existingTimeseries = [], handleConnectorData,closeModal }) => {
  const [method, setMethod] = useState("configure");
  const [sourceType, setSourceType] = useState("");


  const handleNext = (data) => {
    const updatedTimeseries = [...existingTimeseries, data];
    handleConnectorData({ timeseries: updatedTimeseries });
    closeModal();
  };

  return (
    <div className="min-h-[320px]">
      <div className="flex gap-2 border-1 border-[#45556C] rounded-4xl mb-4 w-fit ml-145">
        <button
          onClick={() => setMethod("configure")}
          className={`px-4 py-2 text-[14px] rounded-3xl ${
            method === "configure" ? "border-1 border-blue-400" : "text-white"
          }`}
        >
          Configure
        </button>

        <button
          onClick={() => setMethod("code")}
          className={`px-4 py-2 text-[14px] rounded-3xl ${
            method === "code" ? "border-1 border-blue-400 " : "text-white"
          }`}
        >
          Code
        </button>
      </div>

      {method === "configure" ? (
        <div>
          <div className="w-full">
            <SelectInput
              label="Select Source"
              options={[
                { value: "OSI PI", label: "OSI PI" },
                { value: "Honeywell PHD", label: "Honeywell PHD" },
                { value: "Aspen IP21", label: "Aspen IP21" },
              ]}
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value)}
            />
          </div>


          {sourceType === "OSI PI" && <OsiPi addOsiPi={handleNext} />}
          {sourceType === "Honeywell PHD" && <HoneywellPhd addHoneywellPhd={handleNext} />}
          {sourceType === "Aspen IP21" && <AspenIp121 addAspenIp121={handleNext} />}


        </div>
      ) : (
        <div>
          <CodeEditor />

          <div className="flex justify-center mb-4 mt-4">
            <NextButton onClick={handleNext} label="Submit" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeseriesAdd;

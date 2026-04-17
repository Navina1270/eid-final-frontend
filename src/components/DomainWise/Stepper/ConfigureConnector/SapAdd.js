"use client";
import React, { useState, useEffect, useRef } from "react";
import BackButton from "@/components/Common/Form/BackButton";
import NextButton from "@/components/Common/Form/NextButton";
import SelectInput from "@/components/Common/Form/SelectInput";
import TextInput from "@/components/Common/Form/TextInput";
import CodeEditor from "./ConnectorCodeEditor";
import OnPremS4Hana from "./Sap/OnPremS4Hana";
import CloudS4Hana from "./Sap/CloudS4Hana";

const SapAdd = ({ existingSAP=[],handleConnectorData ,closeModal}) => {
  const configureRef = useRef(null);
  const [method, setMethod] = useState("configure");
  const [sourceType, setSourceType] = useState("");
  const [configureHeight, setConfigureHeight] = useState("300px");

  useEffect(() => {
    if (!configureRef.current) return;

    const updateHeight = () => {
      const height = configureRef.current.offsetHeight;
      setConfigureHeight(height);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(configureRef.current);
    updateHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, [method, sourceType]);


  const handleNext = (data) => {
    const updatedSAP = [...existingSAP, data];
    handleConnectorData({ sap: updatedSAP });
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
        <div ref={configureRef} className="space-y-4">
          <SelectInput
            label="Select Source"
            options={[
              { value: "S4 HANA on prem", label: "S4 HANA on prem" },
              { value: "S4 HANA cloud", label: "S4 HANA cloud" },
            ]}
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
          />

        
          {sourceType === "S4 HANA on prem" && <OnPremS4Hana addS4HanaOnPrem={handleNext} />}
          {sourceType === "S4 HANA cloud" && <CloudS4Hana addS4HanaCloud={handleNext} />}

          
        </div>
      ) : (
        <div>
          <div className="p-3">
            <CodeEditor height={configureHeight} />
          </div>
          <div className="flex justify-center mb-4 mt-4">
            <NextButton onClick={handleNext} label="Submit" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SapAdd;

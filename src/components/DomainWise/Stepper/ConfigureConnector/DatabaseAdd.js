"use client";
import React, { useState } from "react";
import BackButton from "@/components/Common/Form/BackButton";
import NextButton from "@/components/Common/Form/NextButton";
import SelectInput from "@/components/Common/Form/SelectInput";
import TextInput from "@/components/Common/Form/TextInput";
import CodeEditor from "./ConnectorCodeEditor";
import { useEffect, useRef } from "react";
import MySQL from "./Database/MySQL";
import PostgreSQL from "./Database/PostgreSQL";
import MicrosoftSQLServer from "./Database/MicrosoftSQLServer";
import OracleDB from "./Database/OracleDB";
import SnowFlake from "./Database/SnowFlake";
import MongoDB from "./Database/MongoDB";

const DatabaseAdd = ({
  handleConnectorData,
  existingDatabase = [],
  closeModal,
}) => {
  const [method, setMethod] = useState("configure");
  const [sourceType, setSourceType] = useState("");
  const configureRef = useRef(null);
  const [configureHeight, setConfigureHeight] = useState(300);
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
    console.log(data);
    const updatedDatabase = [...existingDatabase, data];
    handleConnectorData({ database: updatedDatabase });
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
              { value: "MySQL", label: "MySQL" },
              { value: "PostgreSQL", label: "PostgreSQL" },
              { value: "Microsoft SQL Server", label: "Microsoft SQL Server" },
              { value: "Oracle DB", label: "Oracle DB" },
              { value: "Snowflake", label: "Snowflake" },
              { value: "MongoDB", label: "MongoDB" },
            ]}
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
          />

          {sourceType === "MySQL" && <MySQL addMySQLData={handleNext} />}
          {sourceType === "PostgreSQL" && <PostgreSQL addPostgreSQLData={handleNext} />}
          {sourceType === "Microsoft SQL Server" &&  <MicrosoftSQLServer addMicrosoftSQLServerData={handleNext} />}
          {sourceType === "Oracle DB" && <OracleDB addOracleDBData={handleNext} />}
          {sourceType === "Snowflake" && <SnowFlake addSnowFlakeData={handleNext} />}
          {sourceType === "MongoDB" && <MongoDB addMongoDBData={handleNext} />}
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

export default DatabaseAdd;

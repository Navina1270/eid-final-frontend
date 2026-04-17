import React, { useState } from "react";
import NextButton from "@/components/Common/Form/NextButton";
import SelectInput from "@/components/Common/Form/SelectInput";
import CodeEditor from "./CodeEditor";
import Ftp from "./File/Ftp";
import Sftp from "./File/Sftp";
import Local from "./File/Local";
import OneDrive from "./File/OneDrive";
import SharePoint from "./File/SharePoint";

const FileAdd = ({ existingFiles = [], handleConnectorData, closeModal }) => {
  const [method, setMethod] = useState("configure");
  const [type, setType] = useState("");

  const handleNext = (data) => {
    const updatedFiles = [...existingFiles, data];
    handleConnectorData({ files: updatedFiles });
    closeModal();
  };


  return (
    <div className="min-h-[320px] max-h-[380px] overflow-x-hidden overflow-y-auto w-full custom-scrollbar -mr-2">
      <div className="flex gap-2 border-1 border-[#45556C] rounded-4xl mb-4 ml-145">
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
                { value: "FTP", label: "FTP" },
                { value: "SFTP", label: "SFTP" },
                { value: "Local", label: "Local" },
                { value: "OneDrive", label: "OneDrive" },
                { value: "SharePoint", label: "SharePoint" },
              ]}
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>

          {type === "FTP" && <Ftp addFtp={handleNext} closeModal={closeModal} />}
          {type === "SFTP" && <Sftp addSftp={handleNext} />}
          {type === "Local" && <Local addLocal={handleNext} />}
          {type === "OneDrive" && <OneDrive addOneDrive={handleNext} />}
          {type === "SharePoint" && <SharePoint addSharePoint={handleNext} />}
        </div>
      ) : (
        <div>
          <CodeEditor />

          <div className="flex justify-center mb-4 mt-4">
            <NextButton onClick={handleNext} label="Submit" />
          </div>
        </div>
      )}
      <style jsx>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 9999px;
          }
        `}
      </style>
    </div>
  );
};

export default FileAdd;

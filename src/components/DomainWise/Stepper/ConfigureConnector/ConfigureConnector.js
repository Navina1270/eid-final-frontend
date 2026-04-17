"use client";
import React, { useState } from "react";
import { LinkIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import ConnectorWidget from "./ConnectorWidget";
import BackButton from "@/components/Common/Form/BackButton";
import NextButton from "@/components/Common/Form/NextButton";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import ConnectorDatabaseLink from "./DatabaseLink";
import ConnectorFileLink from "./FileLink";
import ConnectorTimeseriesLink from "./TimeseriesLink ";
import ConnectorSapLink from "./SapLink";
import FileAdd from "./FileAdd";
import TimeseriesAdd from "./TimeseriesAdd ";
import SapAdd from "./SapAdd";
import DatabaseAdd from "./DatabaseAdd";

const ConfigureConnector = ({ onNext, onBack }) => {
  
  const [showModalSAPAdd, setShowModalSAPAdd] = useState(false);
  const [showModalDatabaseAdd, setShowModalDatabaseAdd] = useState(false);
  const [showModalDatabaseLink, setShowModalDatabaseLink] = useState(false);
  const [showModalSAPLink, setShowModalSAPLink] = useState(false);
  const [showModalFileAdd, setShowModalFileAdd] = useState(false);
  const [showModalFileLink, setShowModalFileLink] = useState(false);
  const [showModalTimeseriesAdd, setShowModalTimeseriesAdd] = useState(false);
  const [showModalTimeseriesLink, setShowModalTimeseriesLink] = useState(false);


  const [allConfigureData, setAllConfigureData] = useState({
    files: [],
    timeseries: [],
    sap: [],
    database: [],
  });

  const handleConnectorData = (newConnectorData) => {
    const key = Object.keys(newConnectorData)[0];
    const data = newConnectorData[key];
    setAllConfigureData((prev) => ({
      ...prev,
      [key]: data,
    }));
    console.log(allConfigureData);
  };

  const handleNext = () => {
    onNext(allConfigureData);
  };

  
  const handleClick = (heading) => {
    if (typeof heading !== "string") {
      console.error("handleClick expected a string, got:", heading);
      return;
    }

    if (heading.includes("SAPAdd")) {
      setShowModalSAPAdd(true);
    } else if (heading.includes("DatabaseLink")) {
      setShowModalDatabaseLink(true);
    } else if (heading.includes("Database")) {
      setShowModalDatabaseAdd(true);
    } else if (heading.includes("SAPLink")) {
      setShowModalSAPLink(true);
    } else if (heading.includes("FilesAdd")) {
      setShowModalFileAdd(true);
    } else if (heading.includes("FilesLink")) {
      setShowModalFileLink(true);
    } else if (heading.includes("TimeseriesLink")) {
      setShowModalTimeseriesLink(true);
    } else if (heading.includes("TimeseriesAdd")) {
      setShowModalTimeseriesAdd(true);
    }
  };
  const closeModalFileAdd = () => setShowModalFileAdd(false);
  const closeModalFileLink = () => setShowModalFileLink(false);
  const closeModalTimeseriesAdd = () => setShowModalTimeseriesAdd(false);
  const closeModalTimeseriesLink = () => setShowModalTimeseriesLink(false);
  const closeSAPAdd = () => setShowModalSAPAdd(false);
 const closeModalDatabaseAdd = () => setShowModalDatabaseAdd(false);



  return (
    <div className="space-y-4">
      <h2 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
        Connector Configuration
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <ConnectorWidget
          logo="/logo/files.png"
          title="Files"
          LeftIcon={LinkIcon}
          RightIcon={PlusCircleIcon}
          onLeftIconClick={() => handleClick("FilesLink")}
          onRightIconClick={() => handleClick("FilesAdd")}
        />
        <ConnectorWidget
          logo="/logo/timeseries.png"
          title="Timeseries"
          LeftIcon={LinkIcon}
          RightIcon={PlusCircleIcon}
          onLeftIconClick={() => {
            handleClick("TimeseriesLink");
          }}
          onRightIconClick={() => {
            handleClick("TimeseriesAdd");
          }}
        />
        <ConnectorWidget
          logo="/logo/sap.png"
          title="SAP"
          LeftIcon={LinkIcon}
          RightIcon={PlusCircleIcon}
          onLeftIconClick={() => handleClick("SAPLink")}
          onRightIconClick={() => handleClick("SAPAdd")}
        />
        <ConnectorWidget
          logo="/logo/database.png"
          title="Database"
          LeftIcon={LinkIcon}
          RightIcon={PlusCircleIcon}
          onLeftIconClick={() => handleClick("DatabaseLink")}
          onRightIconClick={() => handleClick("Database")}
        />
      </div>

      <div className="flex justify-between">
        <BackButton onClick={onBack} />
        <NextButton onClick={handleNext} />
      </div>

      {showModalSAPAdd && (
        <ModalComponent
          heading="SAP"
          modalData={
            <SapAdd handleConnectorData={handleConnectorData} existingSAP={allConfigureData.sap} closeModal={closeSAPAdd} />
          }
          onClose={() => setShowModalSAPAdd(false)}
        />
      )}

      {showModalSAPLink && (
        <ModalComponent
          heading="Link"
          modalData={<ConnectorSapLink />}
          onClose={() => setShowModalSAPLink(false)}
        />
      )}


      {showModalDatabaseAdd && (
        <ModalComponent
          heading="Database"
          modalData={
            <DatabaseAdd handleConnectorData={handleConnectorData} existingDatabase={allConfigureData.database} closeModal={closeModalDatabaseAdd} />
          }
          onClose={() => setShowModalDatabaseAdd(false)}
        />
      )}
      

      {showModalDatabaseLink && (
        <ModalComponent
          heading="Link"
          modalData={<ConnectorDatabaseLink />}
          onClose={() => setShowModalDatabaseLink(false)}
        />
      )}

      

      {showModalFileAdd && (
        <ModalComponent
          heading={"Files"}
          modalData={
            <FileAdd
              existingFiles={allConfigureData.files}
              handleConnectorData={handleConnectorData}
              closeModal={closeModalFileAdd}
            />
          }
          onClose={closeModalFileAdd}
        />
      )}

      {showModalFileLink && (
        <ModalComponent
          heading={"Link"}
          modalData={<ConnectorFileLink />}
          onClose={closeModalFileLink}
        />
      )}

      {showModalTimeseriesAdd && (
        <ModalComponent
          heading={"Timeseries"}
          modalData={
            <TimeseriesAdd handleConnectorData={handleConnectorData} existingTimeseries={allConfigureData.timeseries} closeModal={closeModalTimeseriesAdd}   />
          }
          onClose={closeModalTimeseriesAdd}
        />
      )}


      {showModalTimeseriesLink && (
        <ModalComponent
          heading={"Link"}
          modalData={<ConnectorTimeseriesLink />}
          onClose={closeModalTimeseriesLink}
        />
      )}
    </div>
  );
};

export default ConfigureConnector;

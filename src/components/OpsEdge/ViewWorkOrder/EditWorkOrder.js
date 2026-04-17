"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Tab, Tabs } from "@mui/material";
import DateTimeInput from "@/components/Common/Form/DateTimeInput";
import TextInput from "@/components/Common/Form/TextInput";
import Operations from "./Operations";
import Components from "./Components";
import Costs from "./Costs";
import HeaderData from "./HeaderData";
import { formatForDateTimeLocal } from "@/utils/dateTime";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EditWorkOrder = ({ updateWorkOrderDetails, initialData }) => {
  const [formData, setFormData] = React.useState(initialData);

  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => setTabValue(newValue);

  const updateHeaderField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      headerData: [{ ...prev.headerData[0], [field]: value }],
    }));
  };

  const updateOperations = (newOperations) => {
    setFormData((prev) => ({ ...prev, operationsData: newOperations }));
  };

  const updateComponents = (newComponents) => {
    setFormData((prev) => ({ ...prev, componentsData: newComponents }));
  };

  const updateCosts = (newCosts) => {
    setFormData((prev) => ({ ...prev, costsData: newCosts }));
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      workOrderDetails: {
        ...prev.workOrderDetails,
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting full work order data:", formData);
  };

  useEffect(() => {
    updateWorkOrderDetails({ workorderDetails: formData });
  }, [formData]);

  return (
    <>
      <h2 className="text-xl -mt-4 font-bold text-center text-[#00ffcc] mb-4 border-b border-[#00ffcc]/60 pb-1">
        Work Details Details
      </h2>

      <div className="rounded-lg">
        <div className="w-full grid grid-cols-12 gap-4 ">
          <div className="col-span-4">
            <TextInput
              placeholder="Reported By"
              isEdit={true}
              value={`${localStorage.getItem(
                "firstName"
              )} ${localStorage.getItem("lastName")}`}
              // onChange={(e) => updateField("reportedBy", e.target.value)}
            />
            <br />
            <DateTimeInput
              label="Notification Date"
              value={formatForDateTimeLocal(
                formData.workOrderDetails.notificationDate
              )}
              onChange={(e) => updateField("notificationDate", e.target.value)}
            />
          </div>

          <div className="col-span-8">
            <TextInput
              placeholder="Order Description"
              rows={3}
              value={formData.workOrderDetails.orderDescription}
              onChange={(e) => updateField("orderDescription", e.target.value)}
            />
          </div>

          <div className="col-span-4 md:col-span-4">
            <TextInput
              placeholder="Order Status"
              value={formData.workOrderDetails.orderStatus}
              onChange={(e) => updateField("orderStatus", e.target.value)}
            />
          </div>

          <div className="col-span-4 md:col-span-4">
            <TextInput
              placeholder="Order Number"
              value={formData.workOrderDetails.orderNumber}
              onChange={(e) => updateField("orderNumber", e.target.value)}
            />
          </div>

          <div className="col-span-4 md:col-span-4">
            <TextInput
              placeholder="Notification Number"
              value={formData.workOrderDetails.notificationNumber}
              onChange={(e) =>
                updateField("notificationNumber", e.target.value)
              }
            />
          </div>
        </div>

        <div className="w-full">
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="work order tabs"
            TabIndicatorProps={{ style: { backgroundColor: "#D1D5DB" } }}
            sx={{
              "& .MuiTab-root": {
                color: "#D1D5DB",
                "&.Mui-selected": {
                  color: "#D1D5DB",
                },
              },
            }}
          >
            <Tab label="Header Data" {...a11yProps(0)} />
            <Tab label="Operations" {...a11yProps(1)} />
            <Tab label="Components" {...a11yProps(2)} />
            <Tab label="Costs" {...a11yProps(3)} />
          </Tabs>

          <CustomTabPanel value={tabValue} index={0}>
            <HeaderData
              header={formData.headerData[0]}
              updateHeaderField={updateHeaderField}
              next={() => setTabValue(1)}
            />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <Operations
              operations={formData.operationsData}
              setOperations={updateOperations}
              next={() => setTabValue(2)}
              prev={() => setTabValue(0)}
            />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2}>
            <Components
              components={formData.componentsData}
              setComponents={updateComponents}
              next={() => setTabValue(3)}
              prev={() => setTabValue(1)}
            />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={3}>
            <Costs
              costs={formData.costsData}
              setCosts={updateCosts}
              prev={() => setTabValue(2)}
              submit={handleSubmit}
            />
          </CustomTabPanel>
        </div>
      </div>
    </>
  );
};

export default EditWorkOrder;

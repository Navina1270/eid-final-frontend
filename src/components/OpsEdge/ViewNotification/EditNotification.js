"use client";

import React, { useEffect, useState } from "react";
import DateTimeInput from "@/components/Common/Form/DateTimeInput";
import SelectInput from "@/components/Common/Form/SelectInput";
import TextInput from "@/components/Common/Form/TextInput";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { formatForDateTimeLocal } from "@/utils/dateTime";
import { generateNotification } from "@/services/dashboardServices";
import NextButton from "@/components/Common/Form/NextButton";

const EditNotification = ({
  initialData,
  rcaId,
  getNotificationDetails,
  updateNotificationDetails,
  setLoading,
}) => {
  const [formData, setFormData] = useState(() => ({
    reportedBy: initialData.reportedBy || "",
    notificationDate: initialData.notificationDate || "",
    notificationStatus: initialData.notificationStatus || "",
    notificationShortText: initialData.notificationShortText || "",
    notificationLongText: initialData.notificationLongText || "",
    notificationNumber: initialData.notificationNumber || "",
    notificationType: initialData.notificationType || "",
    priority: initialData.priority || "",
    requiredStart: initialData.requiredStart || "",
    requiredEnd: initialData.requiredEnd || "",
    equipmentNumber: initialData.equipmentNumber || "",
    equipmentDescription: initialData.equipmentDescription || "",
    plannerGroup: initialData.plannerGroup || "",
    mainWorkCenter: initialData.mainWorkCenter || "",
    functionalLocation: initialData.functionalLocation || "",
    functionalLocationDescription:
      initialData.functionalLocationDescription || "",
  }));
  const [reportedBy, setReportedBy] = useState("");

  useEffect(() => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    setFormData((prev) => ({
      ...prev,
      reportedBy: userId,
      notificationDate: formatForDateTimeLocal(new Date()),
    }));
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleGenerateNotification = async () => {
    // setLoading(true);
    const response = await generateNotification(
      "",
      formData.notificationShortText
    );

    const newDetails = response?.data?.notificationDetails || {};
    console.log("API response:", newDetails);
    setFormData(newDetails);
    getNotificationDetails(newDetails);
    // setLoading(false);
  };

  useEffect(() => {
    updateNotificationDetails(formData);
  }, [formData]);

  useEffect(() => {
    const name = `${localStorage.getItem("firstName")} ${localStorage.getItem(
      "lastName"
    )}`;
    setReportedBy(name);
  }, []);

  return (
    <>
      <h2 className="text-xl -mt-4  font-bold text-center text-[#00ffcc] mb-4 border-b border-[#00ffcc]/60 pb-1">
        Notification Details
      </h2>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <TextInput
            isEdit={true}
            placeholder="Reported By"
            value={reportedBy}
            // onChange={(e) => handleChange("reportedBy", e.target.value)}
          />
        </div>
        <div className="col-span-4">
          <DateTimeInput
            label="Notification Date"
            value={formatForDateTimeLocal(formData.notificationDate)}
            onChange={(date) => handleDateChange("notificationDate", date)}
          />
        </div>
        <div className="col-span-4">
          <TextInput
            placeholder="Notification Status"
            value={formData.notificationStatus}
            onChange={(e) => handleChange("notificationStatus", e.target.value)}
          />
        </div>

        <div className="col-span-12">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <TextInput
                placeholder="Notification Summary"
                value={formData.notificationShortText}
                onChange={(e) => {
                  handleChange("notificationShortText", e.target.value);
                }}
                // rows={2}
              />
            </div>

            {rcaId === null && (
              <NextButton
                disabled={!formData.notificationShortText}
                onClick={() => {
                  console.log("Send:", formData.notificationShortText);
                  handleGenerateNotification();
                }}
                label={
                  <div className="flex justify-center items-center gap-2">
                    <p>Create</p>
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </div>
                }
              />
            )}
          </div>
        </div>
        <div className="col-span-12">
          <TextInput
            placeholder="Detailed Description"
            value={formData.notificationLongText}
            onChange={(e) =>
              handleChange("notificationLongText", e.target.value)
            }
            rows={3}
          />
        </div>

        <div className="col-span-4">
          <TextInput
            isEdit={true}
            placeholder="Notification Number"
            value={formData.notificationNumber}
            onChange={(e) => handleChange("notificationNumber", e.target.value)}
          />
        </div>
        <div className="col-span-4">
          <TextInput
            placeholder="Notification Type"
            value={formData.notificationType}
            onChange={(e) => handleChange("notificationType", e.target.value)}
          />
        </div>
        <div className="col-span-4">
          <TextInput
            placeholder="Priority"
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          />
        </div>

        <div className="col-span-4">
          <DateTimeInput
            label="Start Date"
            value={formatForDateTimeLocal(formData.requiredStart)}
            onChange={(date) => handleDateChange("requiredStart", date)}
          />
        </div>
        <div className="col-span-4">
          <DateTimeInput
            label="End Date"
            value={formatForDateTimeLocal(formData.requiredEnd)}
            onChange={(date) => handleDateChange("requiredEnd", date)}
          />
        </div>

        <div className="col-span-4">
          <TextInput
            placeholder="Equipment"
            value={formData.equipmentNumber}
            onChange={(e) => handleChange("equipmentNumber", e.target.value)}
          />
        </div>
        <div className="col-span-6">
          <TextInput
            placeholder="Equipment Description"
            value={formData.equipmentDescription}
            onChange={(e) =>
              handleChange("equipmentDescription", e.target.value)
            }
          />
        </div>
        <div className="col-span-6">
          <TextInput
            placeholder="Planner Group"
            value={formData.plannerGroup}
            onChange={(e) => handleChange("plannerGroup", e.target.value)}
          />
        </div>
        <div className="col-span-6">
          <TextInput
            placeholder="Main Work Center"
            value={formData.mainWorkCenter}
            onChange={(e) => handleChange("mainWorkCenter", e.target.value)}
          />
        </div>

        <div className="col-span-6">
          <TextInput
            placeholder="Functional Location"
            value={formData.functionalLocation}
            onChange={(e) => handleChange("functionalLocation", e.target.value)}
          />
        </div>
        <div className="col-span-12">
          <TextInput
            placeholder="Functional Location Description"
            value={formData.functionalLocationDescription}
            onChange={(e) =>
              handleChange("functionalLocationDescription", e.target.value)
            }
          />
        </div>
      </div>
    </>
  );
};

export default EditNotification;

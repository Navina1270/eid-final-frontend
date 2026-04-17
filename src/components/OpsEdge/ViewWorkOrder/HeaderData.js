"use client";
import React, { useState, useRef } from "react";
import TextInput from "@/components/Common/Form/TextInput";
import DateTimeInput from "@/components/Common/Form/DateTimeInput";
import NextButton from "@/components/Common/Form/NextButton";
import SelectInput from "@/components/Common/Form/SelectInput";
import { formatForDateTimeLocal } from "@/utils/dateTime";

const HeaderData = ({ header, updateHeaderField, next }) => {

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-6 md:col-span-4">
        <TextInput
          placeholder="Order Type"
          value={header?.orderType || ""}
          onChange={(e) => updateHeaderField("orderType", e.target.value)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <TextInput
          placeholder="Order Number"
          value={header?.orderNumber || ""}
          onChange={(e) => updateHeaderField("orderNumber", e.target.value)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <TextInput
          placeholder="Order Description"
          value={header?.orderDescription || ""}
          onChange={(e) => updateHeaderField("orderDescription", e.target.value)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <DateTimeInput
          label="Order Date"
          value={formatForDateTimeLocal(header?.orderDate || null)}
          onChange={(date) => updateHeaderField("orderDate", date)}
        />
      </div>

      <div className="col-span-6 md:col-span-4 ">
        <TextInput
          placeholder="Equipment Number"
          value={header?.equipmentNumber || ""}
          onChange={(e) => updateHeaderField("equipmentNumber", e.target.value)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <TextInput
          placeholder="Equipment Description"
          value={header?.equipmentDescription || ""}
          onChange={(e) => updateHeaderField("equipmentDescription", e.target.value)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <TextInput
          placeholder="Functional Location"
          value={header?.functionalLocation || ""}
          onChange={(e) => updateHeaderField("functionalLocation", e.target.value)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <TextInput
          placeholder="Functional Description"
          value={header?.functionalLocationDescription || ""}
          onChange={(e) => updateHeaderField("functionalLocationDescription", e.target.value)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <DateTimeInput
          label="Start Date"
          value={formatForDateTimeLocal(header?.startDate || null)}
          onChange={(date) => updateHeaderField("startDate", date)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <DateTimeInput
          label="End Date"
          value={formatForDateTimeLocal(header?.endDate || null)}
          onChange={(date) => updateHeaderField("endDate", date)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <TextInput
          placeholder="Planner Group"
          value={header?.plannerGroup || ""}
          onChange={(e) => updateHeaderField("plannerGroup", e.target.value)}
        />
      </div>

      <div className="col-span-6 md:col-span-4">
        <TextInput
          placeholder="Priority"
          value={header?.priority || ""}
          onChange={(e) => updateHeaderField("priority", e.target.value)}
        />
      </div>

      <div className="col-span-12 flex justify-end ">
        <NextButton
          label="Next"
          onClick={() => next()}
        />
      </div>
    </div>

  );
};

export default HeaderData;

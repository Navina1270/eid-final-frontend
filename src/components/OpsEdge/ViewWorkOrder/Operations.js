"use client";
import React from "react";
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import TextInput from "@/components/Common/Form/TextInput";
import NextButton from "@/components/Common/Form/NextButton";

const Operations = ({ operations, setOperations, next, prev }) => {
  const handleInputChange = (id, field, value) => {
    const updated = operations.map(op =>
      op.id === id ? { ...op, [field]: value } : op
    );
    setOperations(updated);
  };

  const addOperation = () => {
    setOperations([
      ...operations,
      {
        id: Date.now(),
        operationNo: "",
        operationDescription: "",
        mainWorkcenter: "",
        duration: "",
        controlKey: "",
        plannedManpower: ""
      }
    ]);
  };

  const removeOperation = (id) => {
    setOperations(operations.filter(op => op.id !== id));
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {operations.map((operation, idx) => (
        <React.Fragment key={`${operation.id}-${idx}`}>
          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Operation Number"
              value={operation.operationNo ?? ""}
              onChange={(e) => handleInputChange(operation.id, "operationNo", e.target.value)}
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Operation Description"
              value={operation.operationDescription ?? ""}
              onChange={(e) => handleInputChange(operation.id, "operationDescription", e.target.value)}
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Main Work Center"
              value={operation.mainWorkcenter ?? ""}
              onChange={(e) => handleInputChange(operation.id, "mainWorkcenter", e.target.value)}
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Duration"
              value={operation.duration ?? ""}
              onChange={(e) => handleInputChange(operation.id, "duration", e.target.value)}
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Control Key"
              value={operation.controlKey ?? ""}
              onChange={(e) => handleInputChange(operation.id, "controlKey", e.target.value)}
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Planned Manpower"
              value={operation.plannedManpower ?? ""}
              onChange={(e) => handleInputChange(operation.id, "plannedManpower", e.target.value)}
            />
          </div>

          <div className="col-span-1 md:col-span-12 border-b border-gray-600 -mt-4 py-3 flex justify-end items-start">
            {idx === operations.length - 1 ? (
              <button
                onClick={addOperation}
                className="text-teal-500 hover:text-teal-600"
              >
                <PlusCircleIcon className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={() => removeOperation(operation.id)}
                className="text-red-500 hover:text-red-600"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        </React.Fragment>
      ))}

      <div className="col-span-12 flex justify-between">
        <NextButton label="Previous" onClick={prev} />
        <NextButton label="Next" onClick={next} />
      </div>
    </div>
  );
};

export default Operations;

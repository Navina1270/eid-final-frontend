"use client";
import React, { useState } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

import TextInput from "@/components/Common/Form/TextInput";
import NextButton from "@/components/Common/Form/NextButton";

const Components = ({ components, setComponents, next, prev }) => {
  const [localComponents, setLocalComponents] = useState(() => {
    if (components.length > 0) {
      return components.map((c) => ({
        ...c,
        id: c.id || Date.now() + Math.random(), // ensure unique ID
      }));
    }

    return [
      {
        id: Date.now(),
        materialNumber: "",
        materialDescription: "",
        quantity: "",
        storageLocation: "",
        reservationNo: "",
        systemCondition: "",
      },
    ];
  });

  React.useEffect(() => {
    setComponents(localComponents);
  }, [localComponents]);

  const addComponent = () => {
    setLocalComponents([
      ...localComponents,
      {
        id: Date.now(),
        materialNumber: "",
        materialDescription: "",
        quantity: "",
        storageLocation: "",
        reservationNo: "",
        systemCondition: "",
      },
    ]);
  };

  const removeComponent = (id) => {
    setLocalComponents(localComponents.filter((c) => c.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setLocalComponents(
      localComponents.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {localComponents.map((component, idx) => (
        <React.Fragment key={component.id}>
          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Material Number"
              value={component.materialNumber}
              onChange={(e) =>
                handleInputChange(
                  component.id,
                  "materialNumber",
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Material Description"
              value={component.materialDescription}
              onChange={(e) =>
                handleInputChange(
                  component.id,
                  "materialDescription",
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Quantity"
              value={component.quantity}
              onChange={(e) =>
                handleInputChange(component.id, "quantity", e.target.value)
              }
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Storage Location"
              value={component.storageLocation}
              onChange={(e) =>
                handleInputChange(
                  component.id,
                  "storageLocation",
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="Reservation Number"
              value={component.reservationNo}
              onChange={(e) =>
                handleInputChange(component.id, "reservationNo", e.target.value)
              }
            />
          </div>

          <div className="col-span-4 md:col-span-4 flex flex-col justify-center">
            <TextInput
              placeholder="System Condition"
              value={component.systemCondition}
              onChange={(e) =>
                handleInputChange(
                  component.id,
                  "systemCondition",
                  e.target.value
                )
              }
            />
          </div>

          <div className="col-span-1 md:col-span-12 border-b border-gray-600 -mt-4 py-3 flex justify-end items-start">
            {idx === localComponents.length - 1 ? (
              <button
                onClick={addComponent}
                className="text-teal-500 hover:text-teal-600"
              >
                <PlusCircleIcon className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={() => removeComponent(component.id)}
                className="text-red-500 hover:text-red-600"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        </React.Fragment>
      ))}

      <div className="col-span-12 flex justify-between mt-4">
        <NextButton label="Previous" onClick={prev} />
        <NextButton label="Next" onClick={next} />
      </div>
    </div>
  );
};

export default Components;

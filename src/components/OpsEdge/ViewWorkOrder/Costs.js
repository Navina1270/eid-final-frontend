"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import TextInput from "@/components/Common/Form/TextInput";
import NextButton from "@/components/Common/Form/NextButton";

const Costs = ({ costs, setCosts, prev, submit }) => {
  const [localCosts, setLocalCosts] = useState(
    costs.length > 0 ? costs : [{ assembly: "", costCenter: "", costcenterDescription: "", estimatedCosts: "", settlementReceiver: "" }]
  );

  React.useEffect(() => {
    setCosts(localCosts);
  }, [localCosts]);

  const updateCostField = (field, value) => {
    const updated = [...localCosts];
    updated[0] = { ...updated[0], [field]: value };
    setLocalCosts(updated);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <TextInput
          placeholder="Assembly"
          value={localCosts[0]?.assembly || ""}
          onChange={(e) => updateCostField("assembly", e.target.value)}
        />
      </div>
      <div className="col-span-6">
        <TextInput
          placeholder="Cost Center"
          value={localCosts[0]?.costCenter || ""}
          onChange={(e) => updateCostField("costCenter",  e.target.value)}
        />
      </div>
      <div className="col-span-6">
        <TextInput
          placeholder="Costcenter Description"
          value={localCosts[0]?.costcenterDescription || ""}
          onChange={(e) => updateCostField("costcenterDescription",  e.target.value)}
        />
      </div>
      <div className="col-span-6">
        <TextInput
          placeholder="Estimated Costs"
          value={localCosts[0]?.estimatedCosts || ""}
          onChange={(e) => updateCostField("estimatedCosts",  e.target.value)}
        />
      </div>
      <div className="col-span-6">
        <TextInput
          placeholder="Settlement Receiver"
          value={localCosts[0]?.settlementReceiver || ""}
          onChange={(e) => updateCostField("settlementReceiver", e.target.value)}
        />
      </div>

      <div className="col-span-12 flex justify-between mt-4">
        <NextButton label="Previous" onClick={prev} />
        {/* <NextButton label="Submit" onClick={submit} /> */}
      </div>
    </div>
  );
}

export default Costs;

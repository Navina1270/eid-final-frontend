import React, { useId, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid"; // <-- Heroicons import

const SelectInput = ({
  options = [],
  onChange,
  value,
  error,
  label = "Select an option",
  isEdit,
  isInline = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const selectId = useId();

  return (
    <div className="flex flex-col w-full relative">
      <label htmlFor={selectId} className="text-xs text-slate-500 mb-1 pl-1">
        {label}
      </label>

      <div className="relative">
        <select
          disabled={isEdit}
          id={selectId}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${isInline ? "pl-2" : "p-2"} pr-8 rounded-lg bg-slate-700 border 
            ${error ? "border-red-500" : "border-slate-600"}
            text-white focus:outline-none appearance-none`}
        >
          <option value="" disabled hidden></option>
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
          <ChevronDownIcon className="h-5 w-5" />
        </span>
      </div>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;

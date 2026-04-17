import React, { useId, useState } from "react";

const DateTimeInput = ({ label, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = useId();


  return (
    <>
      <style>
        {`
          input.datetime-input::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
        `}
      </style>

      <div className="relative w-full">
        <label
          htmlFor={inputId}
          className={`absolute left-1 transition-all duration-200 pointer-events-none
            ${isFocused || value
              ? "text-xs -top-2 text-slate-500"
              : "text-xs -top-2 text-slate-500"
            }`}
        >
          {label}
        </label>

        <input
          id={inputId}
          type="datetime-local"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`datetime-input w-full p-1.5 rounded-lg bg-slate-700 border
            ${error ? "border-red-500" : "border-slate-600"}
            text-white focus:outline-none focus:ring-2 focus:ring-cyan-400`}
        />

        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    </>
  );
};

export default DateTimeInput;

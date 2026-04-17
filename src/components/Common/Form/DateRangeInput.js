'use client';
import React, { useId, useState } from "react";

const DateRangeInput = ({ fromValue, toValue, onFromChange, onToChange, errors = {} }) => {
  const fromId = useId();
  const toId = useId();
  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);

  return (
    <>
      <style>
        {`
          input.date-input::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
        `}
      </style>

      <div className="flex items-center gap-3 w-full">
        <div className="flex flex-col w-full relative">
          <label htmlFor={fromId} className="text-xs text-slate-500 mb-1 pl-1">
            From
          </label>
          <input
            id={fromId}
            type="date"
            value={fromValue}
            onChange={(e) => onFromChange(e.target.value)}
            onFocus={() => setFromFocused(true)}
            onBlur={() => setFromFocused(false)}
            className={`date-input w-full p-2 rounded-lg bg-slate-700 border
              ${errors.from ? "border-red-500" : "border-slate-600"}
              text-white focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {errors.from && <p className="text-red-400 text-xs mt-1">{errors.from}</p>}
        </div>

        <span className="text-slate-400 text-lg font-bold select-none mt-5">-</span>

        <div className="flex flex-col w-full relative">
          <label htmlFor={toId} className="text-xs text-slate-500 mb-1 pl-1">
            To
          </label>
          <input
            id={toId}
            type="date"
            value={toValue}
            onChange={(e) => onToChange(e.target.value)}
            onFocus={() => setToFocused(true)}
            onBlur={() => setToFocused(false)}
            className={`date-input w-full p-2 rounded-lg bg-slate-700 border
              ${errors.to ? "border-red-500" : "border-slate-600"}
              text-white focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {errors.to && <p className="text-red-400 text-xs mt-1">{errors.to}</p>}
        </div>
      </div>
    </>
  );
};

export default DateRangeInput;

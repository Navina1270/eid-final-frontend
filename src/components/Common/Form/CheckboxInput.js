import React from "react";

const CheckboxInput = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="peer hidden"
    />
    <span className="w-5 h-5 inline-flex items-center justify-center border-2 border-cyan-400 rounded-sm bg-transparent peer-checked:bg-cyan-400 peer-checked:text-slate-900 text-transparent transition duration-200">
      ✔
    </span>
    <span>{label}</span>
  </label>
);

export default CheckboxInput;

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useEffect, useId, useState } from "react";

const TextInput = ({
  value,
  onChange,
  error,
  placeholder,
  rows = 1,
  isPassword = false,
  isEdit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : "text";
  const inputId = useId();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      input.no-password-toggle::-ms-reveal,
      input.no-password-toggle::-ms-clear {
        display: none;
      }
      input.no-password-toggle::-webkit-credentials-auto-fill-button,
      input.no-password-toggle::-webkit-password-toggle-button {
        visibility: hidden;
        pointer-events: none;
        position: absolute;
        right: 0;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative w-full">
      {rows === 1 ? (
        <>
          <label
            htmlFor={inputId}
            className={`absolute left-1 transition-all duration-200 pointer-events-none
              ${
                isFocused || value
                  ? "text-xs -top-2 text-blue-600 bg-white px-1.5"
                  : "text-slate-500 top-2 px-1.5"
              }`}
          >
            {placeholder}
          </label>

          <input
            disabled={isEdit}
            id={inputId}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete={isPassword ? "new-password" : undefined}
            className={`w-full p-1.5 rounded-lg bg-white border 
              ${error ? "border-red-500" : "border-slate-200"}
              text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                isPassword ? "no-password-toggle" : ""
              }`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-slate-400"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </>
      ) : (
        <>
          <label
            htmlFor={inputId}
            className={`absolute left-1 transition-all duration-200  pointer-events-none
              ${
                isFocused || value
                  ? "text-xs -top-2 text-blue-600 bg-white px-1.5"
                  : "text-slate-500 top-2 px-1.5"
              }`}
          >
            {placeholder}
          </label>

          <textarea
            id={inputId}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            className={`w-full p-1.5 rounded-lg bg-white border
              ${error ? "border-red-500" : "border-slate-200"}
              text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none custom-scrollbar`}
          />
        </>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;

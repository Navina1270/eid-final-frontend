import React, { useState } from "react";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import CheckboxInput from "@/components/Common/Form/CheckboxInput";
import SelectInput from "@/components/Common/Form/SelectInput";
import DateTimeInput from "@/components/Common/Form/DateTimeInput";
import BackButton from "@/components/Common/Form/BackButton";
import NextButton from "@/components/Common/Form/NextButton";

const ConfigureModel = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({ file: null, startDate: "" });
  const [checkedItems, setCheckedItems] = useState({});
  const [frequency, setFrequency] = useState("");
  // const [fileURLError, setFileURLError] = useState(false);
  // const [fileURLHelpText, setFileURLHelpText] = useState("");

  // const [errors, setErrors] = useState({
  //   file: "",
  //   validationTests: "",
  //   frequency: "",
  //   startDate: "",
  // });

  const handleCheckboxChange = (label) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // const validate = () => {
  //   const newErrors = {
  //     file: "",
  //     validationTests: "",
  //     frequency: "",
  //     startDate: "",
  //   };

  //   let isValid = true;

  //   if (!formData.file) {
  //     newErrors.file = "Please upload a model file.";
  //     isValid = false;
  //   }

  //   const anyChecked = Object.values(checkedItems).some((checked) => checked);
  //   if (!anyChecked) {
  //     newErrors.validationTests = "Please select at least one test.";
  //     isValid = false;
  //   }

  //   if (!frequency) {
  //     newErrors.frequency = "Please select a frequency.";
  //     isValid = false;
  //   }

  //   if (!formData.startDate) {
  //     newErrors.startDate = "Please select a start date.";
  //     isValid = false;
  //   }

  //   setErrors(newErrors);
  //   return isValid;
  // };

  const handleNext = () => {
    // if (validate()) {

    const formdata = {
      modelFile: formData.file?.name,
      tests: Object.keys(checkedItems),
      frequency,
      startDate: formData.startDate.split("T")[0],
    };
    console.log(formdata);
    onNext(formdata);

    // }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
        Configure Model <span className=" text-[18px]">(Optional)</span>
      </h2>

      <div className="grid grid-cols-12 gap-4 text-left text-sm text-slate-300">
        <div className="col-span-4 pt-2">Upload Model File</div>
        <div className="col-span-7">
          <input
            required
            name="file"
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData({ ...formData, file });
              // setFileURLError(false);
            }}
            className="w-full border border-slate-600 rounded bg-slate-900  file:bg-slate-700 file:border-0 file:rounded file:px-4 file:py-2 file:text-white file:cursor-pointer"
          />

          {/* {fileURLError && (
            <p className="text-sm text-red-500 mt-1">{fileURLHelpText}</p>
          )} */}

          {/* {errors.file && (
            <p className="text-sm text-red-500 mt-1 m-auto">{errors.file}</p>
          )} */}
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <a
            href="/assets/sampleFile.xlsx"
            download
            title="Download Sample File"
          >
            <ArrowDownTrayIcon className="w-5 h-5 text-cyan-400 hover:text-lime-400 cursor-pointer" />
          </a>
        </div>

        <div className="col-span-4 pt-2">Select Validation Tests</div>
        <div className="col-span-8 grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            "Concept Drift",
            "Data drift",
            "Latency & Inference Time",
            "Usage",
            "LIME Test",
            "Health Score",
            "Data Quality",
            "Inference Consistency",
            "Memory & Compute",
            "Compliance & Regulatory",
          ].map((label) => (
            <CheckboxInput
              key={label}
              label={label}
              checked={!!checkedItems[label]}
              onChange={() => handleCheckboxChange(label)}
            />
          ))}
          {/* {errors.validationTests && (
            <p className="text-sm text-red-500 mt-1 m-auto">
              {errors.validationTests}
            </p>
          )} */}
        </div>

        <div className="col-span-4 pt-2">Frequency</div>
        <div className="col-span-8">
          <SelectInput
            options={[
              { value: "Daily", label: "Daily" },
              { value: "Weekly", label: "Weekly" },
              { value: "Monthly", label: "Monthly" },
            ]}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            label="Select Frequency"
          />
          {/* {errors.frequency && (
            <p className="text-sm text-red-500 mt-1 m-auto">
              {errors.frequency}
            </p>
          )} */}
        </div>

        <div className="col-span-4 pt-2">Start Date</div>
        <div className="col-span-8">
          <DateTimeInput
            value={formData.startDate}
            onChange={(e) => {
              console.log("onChange argument:", e);
              setFormData({ ...formData, startDate: e.target?.value ?? e });
            }}
          />

          {/* {errors.startDate && (
            <p className="text-sm  text-red-500 mt-1 m-auto">
              {errors.startDate}
            </p>
          )}
           */}
        </div>
      </div>

      <div className="flex justify-between">
        <BackButton onClick={onBack} />
        <NextButton label="Submit" onClick={handleNext} />
      </div>
    </div>
  );
};

export default ConfigureModel;


import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const Local = ({ addLocal }) => {
  const [errorLocal, setErrorLocal] = useState({});
  const [formDataLocal, setFormDataLocal] = useState({
    paths: [{ sourcePath: "", destination: "" }],
  });

  const handleformDataLocal = () => {
    const errorsLocal = {};
    let hasError = false;

    formDataLocal.paths.forEach((path, index) => {
      if (!path.sourcePath.trim()) {
        errorsLocal[`sourcePathError${index}`] = "Source Path is required";
        hasError = true;
      }
      if (!path.destination.trim()) {
        errorsLocal[`destinationError${index}`] = "Destination is required";
        hasError = true;
      }
    });

    setErrorLocal(errorsLocal);

    if (!hasError) {
      addLocal({ type: "Local", ...formDataLocal });
      setFormDataLocal({
        paths: [{ sourcePath: "", destination: "" }],
      });
    }
  };

  return (
    <>
      {formDataLocal.paths.map((path, index) => (
        <div key={index} className="mt-4 mb-2">
          <div className="grid grid-cols-[360px_300px_50px] gap-4 items-center">
            <TextInput
              value={path.sourcePath}
              onChange={(e) => {
                const updatedPaths = [...formDataLocal.paths];
                updatedPaths[index].sourcePath = e.target.value;
                setFormDataLocal({
                  ...formDataLocal,
                  paths: updatedPaths,
                });
              }}
              placeholder="Enter Source Path"
              className=""
              error={errorLocal[`sourcePathError${index}`]}
            />

            <TextInput
              value={path.destination}
              onChange={(e) => {
                const updatedPaths = [...formDataLocal.paths];
                updatedPaths[index].destination = e.target.value;
                setFormDataLocal({
                  ...formDataLocal,
                  paths: updatedPaths,
                });
              }}
              placeholder="Enter Destination"
              className=""
              error={errorLocal[`destinationError${index}`]}
            />

            <div className="flex gap-2 -ml-2">
              <button
                type="button"
                className="text-green-500 font-bold text-xl"
                onClick={() =>
                  setFormDataLocal({
                    ...formDataLocal,
                    paths: [
                      ...formDataLocal.paths,
                      { sourcePath: "", destination: "" },
                    ],
                  })
                }
              >
                <CiCirclePlus className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={formDataLocal.paths.length === 1}
                className="text-red-500 font-bold text-xl"
                onClick={() => {
                  const updatedPaths = formDataLocal.paths.filter(
                    (_, i) => i !== index
                  );
                  setFormDataLocal({
                    ...formDataLocal,
                    paths: updatedPaths,
                  });
                }}
              >
                <CiCircleMinus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center mb-4 mt-4">
        <NextButton onClick={handleformDataLocal} label="Submit" />
      </div>
    </>
  );
};

export default Local;

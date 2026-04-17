import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const OneDrive = ({addOneDrive}) => {
  const [errorOneDrive, setErrorOneDrive] = useState({});
  const [formDataOneDrive, setFormDataOneDrive] = useState({
    tenantId: "",
    clientId: "",
    clientSecret: "",
    username: "",
    paths: [
      {
        sourcePath: "",
        destination: "",
      },
    ],
  });

  const handleOneDriveData = () => {
    const errorsOneDrive = {};
    let hasError = false;

    // Validate top-level fields
    if (!formDataOneDrive.tenantId.trim()) {
      errorsOneDrive.tenantIdError = "Tenant ID is required";
      hasError = true;
    }

    if (!formDataOneDrive.clientId.trim()) {
      errorsOneDrive.clientIdError = "Client ID is required";
      hasError = true;
    }

    if (!formDataOneDrive.clientSecret.trim()) {
      errorsOneDrive.clientSecretError = "Client Secret is required";
      hasError = true;
    }

    if (!formDataOneDrive.username.trim()) {
      errorsOneDrive.usernameError = "Username is required";
      hasError = true;
    }

    // Validate dynamic paths
    formDataOneDrive.paths.forEach((path, index) => {
      if (!path.sourcePath.trim()) {
        errorsOneDrive[`sourcePathError${index}`] = "Source path is required";
        hasError = true;
      }

      if (!path.destination.trim()) {
        errorsOneDrive[`destinationError${index}`] = "Destination is required";
        hasError = true;
      }
    });

    // Set the error state
    setErrorOneDrive(errorsOneDrive);

    if (!hasError) {
      console.log(formDataOneDrive);
      addOneDrive({ type: "OneDrive", ...formDataOneDrive });
      setFormDataOneDrive({
        tenantId: "",
        clientId: "",
        clientSecret: "",
        username: "",
        paths: [{ sourcePath: "", destination: "" }],
      });
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput
          value={formDataOneDrive.username}
          onChange={(e) =>
            setFormDataOneDrive({
              ...formDataOneDrive,
              username: e.target.value,
            })
          }
          error={errorOneDrive?.usernameError}
          placeholder="Enter Username"
          className="w-[250px]"
        />
        <TextInput
          value={formDataOneDrive.tenantId}
          onChange={(e) =>
            setFormDataOneDrive({
              ...formDataOneDrive,
              tenantId: e.target.value,
            })
          }
          error={errorOneDrive?.tenantIdError}
          placeholder="Enter Tenant Id"
          className="w-[250px]"
        />
        <TextInput
          value={formDataOneDrive.clientId}
          onChange={(e) =>
            setFormDataOneDrive({
              ...formDataOneDrive,
              clientId: e.target.value,
            })
          }
          error={errorOneDrive?.clientIdError}
          placeholder="Enter Client Id"
          className="w-[250px]"
        />
        <TextInput
          isPassword={true}
          value={formDataOneDrive.clientSecret}
          onChange={(e) =>
            setFormDataOneDrive({
              ...formDataOneDrive,
              clientSecret: e.target.value,
            })
          }
          error={errorOneDrive?.clientSecretError}
          placeholder="Enter Client Secret"
          className="w-[250px]"
        />
      </div>

      {formDataOneDrive.paths.map((path, index) => (
        <div key={index} className="mt-4 mb-2">
          <div className="grid grid-cols-[360px_300px_50px] gap-4 items-center">
            <TextInput
              value={path.sourcePath}
              onChange={(e) => {
                const updatedPaths = [...formDataOneDrive.paths];
                updatedPaths[index].sourcePath = e.target.value;
                setFormDataOneDrive({
                  ...formDataOneDrive,
                  paths: updatedPaths,
                });
              }}
              placeholder="Enter Source Path"
              className=""
              error={errorOneDrive?.[`sourcePathError${index}`]}
            />
            <TextInput
              value={path.destination}
              onChange={(e) => {
                const updatedPaths = [...formDataOneDrive.paths];
                updatedPaths[index].destination = e.target.value;
                setFormDataOneDrive({
                  ...formDataOneDrive,
                  paths: updatedPaths,
                });
              }}
              placeholder="Enter Destination"
              className=""
              error={errorOneDrive?.[`destinationError${index}`]}
            />

            <div className="flex gap-2 -ml-2">
              <button
                type="button"
                className="text-green-500 font-bold text-xl"
                onClick={() =>
                  setFormDataOneDrive({
                    ...formDataOneDrive,
                    paths: [
                      ...formDataOneDrive.paths,
                      { sourcePath: "", destination: "" },
                    ],
                  })
                }
              >
                <CiCirclePlus className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={formDataOneDrive.paths.length === 1}
                className="text-red-500 font-bold text-xl"
                onClick={() => {
                  const updatedPaths = formDataOneDrive.paths.filter(
                    (_, i) => i !== index
                  );
                  setFormDataOneDrive({
                    ...formDataOneDrive,
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
        <NextButton onClick={handleOneDriveData} label="Submit" />
      </div>
    </>
  );
};

export default OneDrive;

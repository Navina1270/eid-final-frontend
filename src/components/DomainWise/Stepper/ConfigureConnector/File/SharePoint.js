import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const SharePoint = ({ addSharePoint }) => {
  const [errorSharePoint, setErrorSharePoint] = useState({});
  const [formDataSharePoint, setFormDataSharePoint] = useState({
    siteId: "",
    tenantId: "",
    clientId: "",
    clientSecret: "",
    paths: [
      {
        sourcePath: "",
        destination: "",
      },
    ],
  });

  const handleSharePointData = () => {
    const errorSharePoint = {};
    let hasError = false;

    // Validate top-level fields
    if (!formDataSharePoint.siteId?.trim()) {
      errorSharePoint.siteIdError = "Site ID is required";
      hasError = true;
    }

    if (!formDataSharePoint.tenantId?.trim()) {
      errorSharePoint.tenantIdError = "Tenant ID is required";
      hasError = true;
    }

    if (!formDataSharePoint.clientId?.trim()) {
      errorSharePoint.clientIdError = "Client ID is required";
      hasError = true;
    }

    if (!formDataSharePoint.clientSecret?.trim()) {
      errorSharePoint.clientSecretError = "Client Secret is required";
      hasError = true;
    }

    // Validate dynamic path fields
    formDataSharePoint.paths.forEach((path, index) => {
      if (!path.sourcePath?.trim()) {
        errorSharePoint[`sourcePathError${index}`] = "Source path is required";
        hasError = true;
      }

      if (!path.destination?.trim()) {
        errorSharePoint[`destinationError${index}`] = "Destination is required";
        hasError = true;
      }
    });

    // Set error state
    setErrorSharePoint(errorSharePoint);

    // If no errors, proceed
    if (!hasError) {
      console.log("Valid SharePoint data:", formDataSharePoint);
      addSharePoint({ type: "SharePoint", ...formDataSharePoint });
      setFormDataSharePoint({
        siteId: "",
        tenantId: "",
        clientId: "",
        clientSecret: "",
        paths: [
          {
            sourcePath: "",
            destination: "",
          },
        ],
      });
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput
          value={formDataSharePoint.siteId}
          onChange={(e) =>
            setFormDataSharePoint({
              ...formDataSharePoint,
              siteId: e.target.value,
            })
          }
          error={errorSharePoint?.siteIdError}
          placeholder="Enter Site ID"
          className="w-[250px]"
        />
        <TextInput
          value={formDataSharePoint.tenantId}
          onChange={(e) =>
            setFormDataSharePoint({
              ...formDataSharePoint,
              tenantId: e.target.value,
            })
          }
          error={errorSharePoint?.tenantIdError}
          placeholder="Enter Tenant ID"
          className="w-[250px]"
        />
        <TextInput
          value={formDataSharePoint.clientId}
          onChange={(e) =>
            setFormDataSharePoint({
              ...formDataSharePoint,
              clientId: e.target.value,
            })
          }
          error={errorSharePoint?.clientIdError}
          placeholder="Enter Client ID"
          className="w-[250px]"
        />
        <TextInput
          isPassword={true}
          value={formDataSharePoint.clientSecret}
          onChange={(e) =>
            setFormDataSharePoint({
              ...formDataSharePoint,
              clientSecret: e.target.value,
            })
          }
          error={errorSharePoint?.clientSecretError}
          placeholder="Enter Client Secret"
          className="w-[250px]"
        />
      </div>

      {formDataSharePoint.paths.map((path, index) => (
        <div key={index} className="mt-4 mb-2">
          <div className="grid grid-cols-[360px_300px_50px] gap-4 items-center">
            <TextInput
              value={path.sourcePath}
              onChange={(e) => {
                const updatedPaths = [...formDataSharePoint.paths];
                updatedPaths[index].sourcePath = e.target.value;
                setFormDataSharePoint({
                  ...formDataSharePoint,
                  paths: updatedPaths,
                });
              }}
              placeholder="Enter Source Path"
              error={errorSharePoint?.[`sourcePathError${index}`]}
            />
            <TextInput
              value={path.destination}
              onChange={(e) => {
                const updatedPaths = [...formDataSharePoint.paths];
                updatedPaths[index].destination = e.target.value;
                setFormDataSharePoint({
                  ...formDataSharePoint,
                  paths: updatedPaths,
                });
              }}
              placeholder="Enter Destination"
              error={errorSharePoint?.[`destinationError${index}`]}
            />
            <div className="flex gap-2 -ml-2">
              <button
                type="button"
                className="text-green-500 font-bold text-xl"
                onClick={() =>
                  setFormDataSharePoint({
                    ...formDataSharePoint,
                    paths: [
                      ...formDataSharePoint.paths,
                      { sourcePath: "", destination: "" },
                    ],
                  })
                }
              >
                <CiCirclePlus className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={formDataSharePoint.paths.length === 1}
                className="text-red-500 font-bold text-xl"
                onClick={() => {
                  const updatedPaths = formDataSharePoint.paths.filter(
                    (_, i) => i !== index
                  );
                  setFormDataSharePoint({
                    ...formDataSharePoint,
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
        <NextButton onClick={handleSharePointData} label="Submit" />
      </div>
    </>
  );
};

export default SharePoint;

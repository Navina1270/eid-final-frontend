import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const FileAddFtp = ({ addFtp }) => {
  const [errorsFtp, setErrorsFtp] = useState({});
  const [formDataFtp, setFormDataFtp] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    paths: [{ sourcePath: "", destination: "" }],
  });

  const handleFtpData = () => {
    const errorsFtp = {};
    let hasError = false;

    // Validate top-level FTP fields
    if (!formDataFtp.host.trim()) {
      errorsFtp.hostError = "Host is required";
      hasError = true;
    }

    if (formDataFtp.port === "") {
      errorsFtp.portError = "Port is required";
      hasError = true;
    } else if (isNaN(Number(formDataFtp.port))) {
      errorsFtp.portError = "Port must be a valid number";
      hasError = true;
    }

    if (!formDataFtp.username.trim()) {
      errorsFtp.usernameError = "Username is required";
      hasError = true;
    }

    if (!formDataFtp.password.trim()) {
      errorsFtp.passwordError = "Password is required";
      hasError = true;
    }

    formDataFtp.paths.forEach((path, index) => {
      if (!path.sourcePath.trim()) {
        errorsFtp[`sourcePathError${index}`] = "Source path is required";
        hasError = true;
      }

      if (!path.destination.trim()) {
        errorsFtp[`destinationError${index}`] = "Destination is required";
        hasError = true;
      }
    });

    setErrorsFtp(errorsFtp);

    if (!hasError) {
      addFtp({
        type: "FTP",
        ...formDataFtp,
        port: Number(formDataFtp.port),
      });
      setFormDataFtp({
        host: "",
        port: "",
        username: "",
        password: "",
        paths: [{ sourcePath: "", destination: "" }],
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput
          value={formDataFtp.host}
          onChange={(e) =>
            setFormDataFtp({ ...formDataFtp, host: e.target.value })
          }
          error={errorsFtp?.hostError}
          placeholder="Enter Host"
          className="w-[250px]"
        />
        <TextInput
          value={formDataFtp.port}
          onChange={(e) =>
            setFormDataFtp({ ...formDataFtp, port: e.target.value })
          }
          error={errorsFtp?.portError}
          placeholder="Enter Port"
          className="w-[250px]"
        />
        <TextInput
          value={formDataFtp.username}
          onChange={(e) =>
            setFormDataFtp({ ...formDataFtp, username: e.target.value })
          }
          error={errorsFtp?.usernameError}
          placeholder="Enter Username"
          className="w-[250px]"
        />
        <TextInput
          value={formDataFtp.password}
          onChange={(e) =>
            setFormDataFtp({ ...formDataFtp, password: e.target.value })
          }
          isPassword={true}
          error={errorsFtp?.passwordError}
          placeholder="Enter Password"
          className="w-[250px]"
        />
      </div>
      {formDataFtp.paths.map((path, index) => (
        <div key={index} className="mt-4 mb-2">
          <div className="grid grid-cols-[360px_300px_50px] gap-4 items-center">
            <TextInput
              value={path.sourcePath}
              onChange={(e) => {
                const updatedPaths = [...formDataFtp.paths];
                updatedPaths[index].sourcePath = e.target.value;
                setFormDataFtp({ ...formDataFtp, paths: updatedPaths });
              }}
              placeholder="Enter Source Path"
              className=""
              error={errorsFtp?.[`sourcePathError${index}`]}
            />

            <TextInput
              value={path.destination}
              onChange={(e) => {
                const updatedPaths = [...formDataFtp.paths];
                updatedPaths[index].destination = e.target.value;
                setFormDataFtp({ ...formDataFtp, paths: updatedPaths });
              }}
              placeholder="Enter Destination"
              className=""
              error={errorsFtp?.[`destinationError${index}`]}
            />

            <div className="flex gap-2 -ml-2">
              <button
                type="button"
                className="text-green-500 font-bold text-xl"
                onClick={() =>
                  setFormDataFtp({
                    ...formDataFtp,
                    paths: [
                      ...formDataFtp.paths,
                      { sourcePath: "", destination: "" },
                    ],
                  })
                }
              >
                <CiCirclePlus className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={formDataFtp.paths.length === 1}
                className="text-red-500 font-bold text-xl"
                onClick={() => {
                  const updatedPaths = formDataFtp.paths.filter(
                    (_, i) => i !== index
                  );
                  setFormDataFtp({
                    ...formDataFtp,
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
        <NextButton onClick={handleFtpData} label="Submit" />
      </div>
    </>
  );
};

export default FileAddFtp;

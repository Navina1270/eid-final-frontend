import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const FileAddSftp = ({ addSftp }) => {
  const [errorsSftp, setErrorsSftp] = useState({});
  const [formDataSftp, setformDataSftp] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    paths: [{ sourcePath: "", destination: "" }],
  });

  const handleSftpData = () => {
    const errorsSftp = {};
    let hasError = false;

    if (!formDataSftp.host.trim()) {
      errorsSftp.hostError = "Host is required";
      hasError = true;
    }
    if (formDataSftp.port === "") {
      errorsSftp.portError = "Port is required";
      hasError = true;
    } else if (isNaN(Number(formDataSftp.port))) {
      errorsSftp.portError = "Port must be a valid number";
      hasError = true;
    }

    if (!formDataSftp.username.trim()) {
      errorsSftp.usernameError = "Username is required";
      hasError = true;
    }

    if (!formDataSftp.password.trim()) {
      errorsSftp.passwordError = "Password is required";
      hasError = true;
    }

    formDataSftp.paths.forEach((path, index) => {
      if (!path.sourcePath.trim()) {
        errorsSftp[`sourcePathError${index}`] = "Source path is required";
        hasError = true;
      }

      if (!path.destination.trim()) {
        errorsSftp[`destinationError${index}`] = "Destination is required";
        hasError = true;
      }
    });

    setErrorsSftp(errorsSftp);

    if (!hasError) {
      console.log(formDataSftp);
      addSftp({
        type: "SFTP",
        ...formDataSftp,
        port: Number(formDataSftp.port),
      });
      setformDataSftp({
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
          value={formDataSftp.host}
          onChange={(e) =>
            setformDataSftp({ ...formDataSftp, host: e.target.value })
          }
          error={errorsSftp?.hostError}
          placeholder="Enter Host"
          className="w-[250px]"
        />
        <TextInput
          value={formDataSftp.port}
          onChange={(e) =>
            setformDataSftp({ ...formDataSftp, port: e.target.value })
          }
          error={errorsSftp?.portError}
          placeholder="Enter Port"
          className="w-[250px]"
        />
        <TextInput
          value={formDataSftp.username}
          onChange={(e) =>
            setformDataSftp({
              ...formDataSftp,
              username: e.target.value,
            })
          }
          error={errorsSftp?.usernameError}
          placeholder="Enter Username"
          className="w-[250px]"
        />
        <TextInput
          value={formDataSftp.password}
          onChange={(e) =>
            setformDataSftp({
              ...formDataSftp,
              password: e.target.value,
            })
          }
          isPassword={true}
          error={errorsSftp?.passwordError}
          placeholder="Enter Password"
          className="w-[250px]"
        />
      </div>

      {formDataSftp.paths.map((path, index) => (
        <div key={index} className="mt-4 mb-2">
          <div className="grid grid-cols-[360px_300px_50px] gap-4 items-center">
            <TextInput
              value={path.sourcePath}
              onChange={(e) => {
                const updatedPaths = [...formDataSftp.paths];
                updatedPaths[index].sourcePath = e.target.value;
                setformDataSftp({
                  ...formDataSftp,
                  paths: updatedPaths,
                });
              }}
              placeholder="Enter Source Path"
              className=""
              error={errorsSftp?.[`sourcePathError${index}`]}
            />

            <TextInput
              value={path.destination}
              onChange={(e) => {
                const updatedPaths = [...formDataSftp.paths];
                updatedPaths[index].destination = e.target.value;
                setformDataSftp({
                  ...formDataSftp,
                  paths: updatedPaths,
                });
              }}
              placeholder="Enter Destination"
              className=""
              error={errorsSftp?.[`destinationError${index}`]}
            />

            <div className="flex gap-2 -ml-2">
              <button
                type="button"
                className="text-green-500 font-bold text-xl"
                onClick={() =>
                  setformDataSftp({
                    ...formDataSftp,
                    paths: [
                      ...formDataSftp.paths,
                      { sourcePath: "", destination: "" },
                    ],
                  })
                }
              >
                <CiCirclePlus className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={formDataSftp.paths.length === 1}
                className="text-red-500 font-bold text-xl"
                onClick={() => {
                  const updatedPaths = formDataSftp.paths.filter(
                    (_, i) => i !== index
                  );
                  setformDataSftp({
                    ...formDataSftp,
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
        <NextButton onClick={handleSftpData} label="Submit" />
      </div>
    </>
  );
};

export default FileAddSftp;

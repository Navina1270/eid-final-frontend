import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";

const OracleDB = ({ addOracleDBData }) => {
  const [errorOracleDB, setErrorOracleDB] = useState({});
  const [formOracleDB, setFormOracleDB] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    servicename: "",
  });

  const handleOracleDBData = () => {
    const errors = {};
    let hasError = false;

    if (!formOracleDB.host.trim()) {
      errors.hostError = "Host is required";
      hasError = true;
    }

    if (formOracleDB.port.trim() === "") {
      errors.portError = "Port is required";
      hasError = true;
    } else if (isNaN(Number(formOracleDB.port))) {
      errors.portError = "Port must be a valid number";
      hasError = true;
    }

    if (!formOracleDB.username.trim()) {
      errors.usernameError = "Username is required";
      hasError = true;
    }

    if (!formOracleDB.password.trim()) {
      errors.passwordError = "Password is required";
      hasError = true;
    }

    if (!formOracleDB.servicename.trim()) {
      errors.servicenameError = "Service Name is required";
      hasError = true;
    }

    setErrorOracleDB(errors);
    if (!hasError) {
      addOracleDBData({
        type: "OracleDB",
        ...formOracleDB,
        port: Number(formOracleDB.port),
      });
      console.log(formOracleDB);
      setFormOracleDB({
        host: "",
        port: "",
        username: "",
        password: "",
        servicename: "",
      });

      setErrorOracleDB({});
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          value={formOracleDB.host}
          onChange={(e) =>
            setFormOracleDB({ ...formOracleDB, host: e.target.value })
          }
          placeholder="Enter Host"
          error={errorOracleDB.hostError}
        />
        <TextInput
          value={formOracleDB.port}
          onChange={(e) =>
            setFormOracleDB({ ...formOracleDB, port: e.target.value })
          }
          placeholder="Enter Port"
          error={errorOracleDB.portError}
        />
        <TextInput
          value={formOracleDB.username}
          onChange={(e) =>
            setFormOracleDB({
              ...formOracleDB,
              username: e.target.value,
            })
          }
          placeholder="Enter Username"
          error={errorOracleDB.usernameError}
        />
        <TextInput
          value={formOracleDB.password}
          onChange={(e) =>
            setFormOracleDB({
              ...formOracleDB,
              password: e.target.value,
            })
          }
          placeholder="Enter Password"
          isPassword={true}
          error={errorOracleDB.passwordError}
        />
      </div>
      <TextInput
        value={formOracleDB.servicename}
        onChange={(e) =>
          setFormOracleDB({
            ...formOracleDB,
            servicename: e.target.value,
          })
        }
        placeholder="Enter Service Name"
        error={errorOracleDB.servicenameError}
      />

      <div className="flex justify-center mb-4 mt-6">
        <NextButton onClick={handleOracleDBData} label="Submit" />
      </div>
    </>
  );
};

export default OracleDB;

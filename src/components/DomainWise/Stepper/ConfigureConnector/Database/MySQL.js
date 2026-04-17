import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";

const MySQL = ({ addMySQLData }) => {
  const [errorMySQL, setErrorMySQL] = useState({});
  const [formDataMySQL, setFormDataMySQL] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
    tables: "",
  });

  const handleMySQLData = () => {
    const errors = {};
    let hasError = false;

    if (!formDataMySQL.host.trim()) {
      errors.hostError = "Host is required";
      hasError = true;
    }

    if (formDataMySQL.port.trim() === "") {
      errors.portError = "Port is required";
      hasError = true;
    } else if (isNaN(Number(formDataMySQL.port))) {
      errors.portError = "Port must be a valid number";
      hasError = true;
    }

    if (!formDataMySQL.username.trim()) {
      errors.usernameError = "Username is required";
      hasError = true;
    }

    if (!formDataMySQL.password.trim()) {
      errors.passwordError = "Password is required";
      hasError = true;
    }

    if (!formDataMySQL.database.trim()) {
      errors.databaseError = "Database name is required";
      hasError = true;
    }

    if (!formDataMySQL.tables.trim()) {
      errors.tablesError = "Tables are required";
      hasError = true;
    }

    setErrorMySQL(errors);

    if (!hasError) {
      addMySQLData({
        type: "MySQL",
        port: Number(formDataMySQL.port),
        ...formDataMySQL,
      });
      console.log(formDataMySQL);
      setFormDataMySQL({
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
        tables: "",
      });

      setErrorMySQL({});
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 ">
        <TextInput
          value={formDataMySQL.host}
          onChange={(e) =>
            setFormDataMySQL({ ...formDataMySQL, host: e.target.value })
          }
          placeholder="Enter Host"
          error={errorMySQL.hostError}
        />
        <TextInput
          value={formDataMySQL.port}
          onChange={(e) =>
            setFormDataMySQL({ ...formDataMySQL, port: e.target.value })
          }
          placeholder="Enter Port"
          error={errorMySQL.portError}
        />
        <TextInput
          value={formDataMySQL.username}
          onChange={(e) =>
            setFormDataMySQL({ ...formDataMySQL, username: e.target.value })
          }
          placeholder="Enter Username"
          error={errorMySQL.usernameError}
        />
        <TextInput
          value={formDataMySQL.password}
          onChange={(e) =>
            setFormDataMySQL({ ...formDataMySQL, password: e.target.value })
          }
          password={true}
          placeholder="Enter Password"
          error={errorMySQL.passwordError}
        />
        <TextInput
          value={formDataMySQL.database}
          onChange={(e) =>
            setFormDataMySQL({ ...formDataMySQL, database: e.target.value })
          }
          placeholder="Enter Database"
          error={errorMySQL.databaseError}
        />
        <TextInput
          value={formDataMySQL.tables}
          onChange={(e) =>
            setFormDataMySQL({ ...formDataMySQL, tables: e.target.value })
          }
          placeholder="Enter Tables"
          error={errorMySQL.tablesError}
        />
      </div>

      <div className="flex justify-center mb-4 mt-6">
        <NextButton onClick={handleMySQLData} label="Submit" />
      </div>
    </>
  );
};

export default MySQL;

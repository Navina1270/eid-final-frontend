import React, { useState } from "react";
import TextInput from "@/components/Common/Form/TextInput";
import NextButton from "@/components/Common/Form/NextButton";

const MicrosoftSQLServer = ({ addMicrosoftSQLServerData }) => {
  const [errorMicrosoftSQLServer, setErrorMicrosoftSQLServer] = useState({});
  const [formMicrosoftSQLServer, setFormMicrosoftSQLServer] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
    tables: "",
  });

  const handleNext = () => {
    const errors = {};
    let hasError = false;

    if (!formMicrosoftSQLServer.host.trim()) {
      errors.hostError = "Host is required";
      hasError = true;
    }

    if (formMicrosoftSQLServer.port.trim() === "") {
      errors.portError = "Port is required";
      hasError = true;
    } else if (isNaN(Number(formMicrosoftSQLServer.port))) {
      errors.portError = "Port must be a valid number";
      hasError = true;
    }

    if (!formMicrosoftSQLServer.username.trim()) {
      errors.usernameError = "Username is required";
      hasError = true;
    }

    if (!formMicrosoftSQLServer.password.trim()) {
      errors.passwordError = "Password is required";
      hasError = true;
    }

    if (!formMicrosoftSQLServer.database.trim()) {
      errors.databaseError = "Database is required";
      hasError = true;
    }

    if (!formMicrosoftSQLServer.tables.trim()) {
      errors.tablesError = "Tables are required";
      hasError = true;
    }

    setErrorMicrosoftSQLServer(errors);

    if (!hasError) {
      addMicrosoftSQLServerData({
        type: "Microsoft SQL Server",
        ...formMicrosoftSQLServer,
        port: Number(formMicrosoftSQLServer.port),
      });
      console.log(formMicrosoftSQLServer);
      setFormMicrosoftSQLServer({
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
        tables: "",
      });

      setErrorMicrosoftSQLServer({});
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          value={formMicrosoftSQLServer.host}
          onChange={(e) =>
            setFormMicrosoftSQLServer({
              ...formMicrosoftSQLServer,
              host: e.target.value,
            })
          }
          error={errorMicrosoftSQLServer.hostError}
          placeholder="Enter Host"
        />
        <TextInput
          value={formMicrosoftSQLServer.port}
          onChange={(e) =>
            setFormMicrosoftSQLServer({
              ...formMicrosoftSQLServer,
              port: e.target.value,
            })
          }
          error={errorMicrosoftSQLServer.portError}
          placeholder="Enter Port"
        />
        <TextInput
          value={formMicrosoftSQLServer.username}
          onChange={(e) =>
            setFormMicrosoftSQLServer({
              ...formMicrosoftSQLServer,
              username: e.target.value,
            })
          }
          error={errorMicrosoftSQLServer.usernameError}
          placeholder="Enter Username"
        />
        <TextInput
          value={formMicrosoftSQLServer.password}
          onChange={(e) =>
            setFormMicrosoftSQLServer({
              ...formMicrosoftSQLServer,
              password: e.target.value,
            })
          }
          isPassword={true}
          error={errorMicrosoftSQLServer.passwordError}
          placeholder="Enter Password"
        />
        <TextInput
          value={formMicrosoftSQLServer.database}
          onChange={(e) =>
            setFormMicrosoftSQLServer({
              ...formMicrosoftSQLServer,
              database: e.target.value,
            })
          }
          error={errorMicrosoftSQLServer.databaseError}
          placeholder="Enter Database"
        />
        <TextInput
          value={formMicrosoftSQLServer.tables}
          onChange={(e) =>
            setFormMicrosoftSQLServer({
              ...formMicrosoftSQLServer,
              tables: e.target.value,
            })
          }
          error={errorMicrosoftSQLServer.tablesError}
          placeholder="Enter Tables"
        />
      </div>

      <div className="flex justify-center mb-4 mt-6">
        <NextButton onClick={handleNext} label="Submit" />
      </div>
    </>
  );
};

export default MicrosoftSQLServer;

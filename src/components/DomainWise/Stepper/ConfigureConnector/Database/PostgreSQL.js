import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";

const PostgreSQL = ({ addPostgreSQLData }) => {
  const [errorPostgreSQL, setErrorPostgreSQL] = useState({});
  const [formPostgreSQL, setFormDatAPostgreSQL] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
    tables: "",
  });

  const handlePostgreSQLData = () => {
    const errors = {};
    let hasError = false;

    if (!formPostgreSQL.host.trim()) {
      errors.hostError = "Host is required";
      hasError = true;
    }

    if (formPostgreSQL.port.trim() === "") {
      errors.portError = "Port is required";
      hasError = true;
    } else if (isNaN(Number(formPostgreSQL.port))) {
      errors.portError = "Port must be a valid number";
      hasError = true;
    }

    if (!formPostgreSQL.username.trim()) {
      errors.usernameError = "Username is required";
      hasError = true;
    }

    if (!formPostgreSQL.password.trim()) {
      errors.passwordError = "Password is required";
      hasError = true;
    }

    if (!formPostgreSQL.database.trim()) {
      errors.databaseError = "Database name is required";
      hasError = true;
    }

    if (!formPostgreSQL.tables.trim()) {
      errors.tablesError = "Tables are required";
      hasError = true;
    }

    setErrorPostgreSQL(errors);

    if (!hasError) {
      addPostgreSQLData({
        type: "PostgreSQL",
        ...formPostgreSQL,
        port: Number(formPostgreSQL.port),
      });
      console.log(formPostgreSQL);
      setFormDatAPostgreSQL({
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
        tables: "",
      });

      setErrorPostgreSQL({});
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          value={formPostgreSQL.host}
          onChange={(e) =>
            setFormDatAPostgreSQL({
              ...formPostgreSQL,
              host: e.target.value,
            })
          }
          placeholder="Enter Host"
          error={errorPostgreSQL.hostError}
        />
        <TextInput
          value={formPostgreSQL.port}
          onChange={(e) =>
            setFormDatAPostgreSQL({
              ...formPostgreSQL,
              port: e.target.value,
            })
          }
          placeholder="Enter Port"
          error={errorPostgreSQL.portError}
        />
        <TextInput
          value={formPostgreSQL.username}
          onChange={(e) =>
            setFormDatAPostgreSQL({
              ...formPostgreSQL,
              username: e.target.value,
            })
          }
          placeholder="Enter Username"
          error={errorPostgreSQL.usernameError}
        />
        <TextInput
          value={formPostgreSQL.password}
          onChange={(e) =>
            setFormDatAPostgreSQL({
              ...formPostgreSQL,
              password: e.target.value,
            })
          }
          isPassword={true}
          placeholder="Enter Password"
          error={errorPostgreSQL.passwordError}
        />
        <TextInput
          value={formPostgreSQL.database}
          onChange={(e) =>
            setFormDatAPostgreSQL({
              ...formPostgreSQL,
              database: e.target.value,
            })
          }
          placeholder="Enter Database"
          error={errorPostgreSQL.databaseError}
        />
        <TextInput
          value={formPostgreSQL.tables}
          onChange={(e) =>
            setFormDatAPostgreSQL({
              ...formPostgreSQL,
              tables: e.target.value,
            })
          }
          placeholder="Enter Tables"
          error={errorPostgreSQL.tablesError}
        />
      </div>

      <div className="flex justify-center mb-4 mt-6">
        <NextButton onClick={handlePostgreSQLData} label="Submit" />
      </div>
    </>
  );
};

export default PostgreSQL;

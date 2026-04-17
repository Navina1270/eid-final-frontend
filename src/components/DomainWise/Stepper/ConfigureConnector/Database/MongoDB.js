import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";

const MongoDB = ({ addMongoDBData }) => {
  const [formMongoDB, setFormMongoDB] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
  });

  const [errorMongoDB, setErrorMongoDB] = useState({});

  const handleMongoDBSubmit = () => {
    const errors = {};
    let hasError = false;

    if (!formMongoDB.host.trim()) {
      errors.hostError = "Host is required";
      hasError = true;
    }

    if (formMongoDB.port.trim() === "") {
      errors.portError = "Port is required";
      hasError = true;
    } else if (isNaN(Number(formMongoDB.port))) {
      errors.portError = "Port must be a valid number";
      hasError = true;
    }

    if (!formMongoDB.username.trim()) {
      errors.usernameError = "Username is required";
      hasError = true;
    }

    if (!formMongoDB.password.trim()) {
      errors.passwordError = "Password is required";
      hasError = true;
    }

    if (!formMongoDB.database.trim()) {
      errors.databaseError = "Database is required";
      hasError = true;
    }

    setErrorMongoDB(errors);

    if (!hasError) {
      addMongoDBData({
        type: "MongoDB",
        ...formMongoDB,
        port: Number(formMongoDB.port),
      });
      console.log(formMongoDB);

      setFormMongoDB({
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
      });

      setErrorMongoDB({});
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          value={formMongoDB.host}
          onChange={(e) =>
            setFormMongoDB({ ...formMongoDB, host: e.target.value })
          }
          placeholder="Enter Host"
          error={errorMongoDB.hostError}
        />
        <TextInput
          value={formMongoDB.port}
          onChange={(e) =>
            setFormMongoDB({ ...formMongoDB, port: e.target.value })
          }
          placeholder="Enter Port"
          error={errorMongoDB.portError}
        />
        <TextInput
          value={formMongoDB.username}
          onChange={(e) =>
            setFormMongoDB({ ...formMongoDB, username: e.target.value })
          }
          placeholder="Enter Username"
          error={errorMongoDB.usernameError}
        />
        <TextInput
          value={formMongoDB.password}
          onChange={(e) =>
            setFormMongoDB({ ...formMongoDB, password: e.target.value })
          }
          placeholder="Enter Password"
          isPassword={true}
          error={errorMongoDB.passwordError}
        />
      </div>

      <TextInput
        value={formMongoDB.database}
        onChange={(e) =>
          setFormMongoDB({ ...formMongoDB, database: e.target.value })
        }
        placeholder="Enter Database"
        error={errorMongoDB.databaseError}
      />

      <div className="flex justify-center mb-4 mt-6">
        <NextButton onClick={handleMongoDBSubmit} label="Submit" />
      </div>
    </>
  );
};

export default MongoDB;

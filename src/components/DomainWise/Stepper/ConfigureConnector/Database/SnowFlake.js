import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";

const SnowFlake = ({ addSnowFlakeData }) => {
  const [formSnowflake, setFormSnowflake] = useState({
    account: "",
    username: "",
    password: "",
    warehouse: "",
    database: "",
    schema: "",
    role: "",
    region: "",
  });

  const [errorSnowflake, setErrorSnowflake] = useState({});

  const handleSnowflakeSubmit = () => {
    const errors = {};
    let hasError = false;

    if (!formSnowflake.account.trim()) {
      errors.accountError = "Account is required";
      hasError = true;
    }

    if (!formSnowflake.username.trim()) {
      errors.usernameError = "Username is required";
      hasError = true;
    }

    if (!formSnowflake.password.trim()) {
      errors.passwordError = "Password is required";
      hasError = true;
    }

    if (!formSnowflake.warehouse.trim()) {
      errors.warehouseError = "Warehouse is required";
      hasError = true;
    }

    if (!formSnowflake.database.trim()) {
      errors.databaseError = "Database is required";
      hasError = true;
    }

    if (!formSnowflake.schema.trim()) {
      errors.schemaError = "Schema is required";
      hasError = true;
    }

    if (!formSnowflake.role.trim()) {
      errors.roleError = "Role is required";
      hasError = true;
    }

    if (!formSnowflake.region.trim()) {
      errors.regionError = "Region is required";
      hasError = true;
    }

    setErrorSnowflake(errors);

    if (!hasError) {
      addSnowFlakeData({ type: "Snowflake", ...formSnowflake });
      console.log(formSnowflake);

      setFormSnowflake({
        account: "",
        username: "",
        password: "",
        warehouse: "",
        database: "",
        schema: "",
        role: "",
        region: "",
      });

      setErrorSnowflake({});
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          value={formSnowflake.account}
          onChange={(e) =>
            setFormSnowflake({ ...formSnowflake, account: e.target.value })
          }
          placeholder="Enter Account"
          error={errorSnowflake.accountError}
        />
        <TextInput
          value={formSnowflake.username}
          onChange={(e) =>
            setFormSnowflake({ ...formSnowflake, username: e.target.value })
          }
          placeholder="Enter Username"
          error={errorSnowflake.usernameError}
        />
        <TextInput
          value={formSnowflake.password}
          onChange={(e) =>
            setFormSnowflake({ ...formSnowflake, password: e.target.value })
          }
          placeholder="Enter Password"
          isPassword={true}
          error={errorSnowflake.passwordError}
        />
        <TextInput
          value={formSnowflake.warehouse}
          onChange={(e) =>
            setFormSnowflake({ ...formSnowflake, warehouse: e.target.value })
          }
          placeholder="Enter Warehouse"
          error={errorSnowflake.warehouseError}
        />
        <TextInput
          value={formSnowflake.database}
          onChange={(e) =>
            setFormSnowflake({ ...formSnowflake, database: e.target.value })
          }
          placeholder="Enter Database"
          error={errorSnowflake.databaseError}
        />
        <TextInput
          value={formSnowflake.schema}
          onChange={(e) =>
            setFormSnowflake({ ...formSnowflake, schema: e.target.value })
          }
          placeholder="Enter Schema"
          error={errorSnowflake.schemaError}
        />
        <TextInput
          value={formSnowflake.role}
          onChange={(e) =>
            setFormSnowflake({ ...formSnowflake, role: e.target.value })
          }
          placeholder="Enter Role"
          error={errorSnowflake.roleError}
        />
        <TextInput
          value={formSnowflake.region}
          onChange={(e) =>
            setFormSnowflake({ ...formSnowflake, region: e.target.value })
          }
          placeholder="Enter Region"
          error={errorSnowflake.regionError}
        />
      </div>

      <div className="flex justify-center mb-4 mt-6">
        <NextButton onClick={handleSnowflakeSubmit} label="Submit" />
      </div>
    </>
  );
};

export default SnowFlake;

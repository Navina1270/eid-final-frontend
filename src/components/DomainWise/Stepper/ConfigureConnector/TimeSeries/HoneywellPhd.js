import React, { useState } from "react";
import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";

const HoneywellPhd = ({ addHoneywellPhd }) => {
  const [errorHoneywellPhd, setErrorHoneywellPhd] = useState({});
  const [formDataHoneywellPhd, setFormDataHoneywellPhd] = useState({
    host: "",
    port: "",
    dsn: "",
    username: "",
    password: "",
  });

  const handleHoneyWellData = () => {
    const errors = {};
    let hasError = false;

    if (!formDataHoneywellPhd.username.trim()) {
      errors.username = "Username is required";
      hasError = true;
    }

    if (!formDataHoneywellPhd.password.trim()) {
      errors.password = "Password is required";
      hasError = true;
    }

    if (!formDataHoneywellPhd.host.trim()) {
      errors.host = "Host is required";
      hasError = true;
    }
    if (formDataHoneywellPhd.port.trim() === "") {
      errors.portError = "Port is required";
      hasError = true;
    } else if (isNaN(Number(formDataHoneywellPhd.port))) {
      errors.portError = "Port must be a valid number";
      hasError = true;
    }
    if (!formDataHoneywellPhd.dsn.trim()) {
      errors.dsn = "DSN is required";
      hasError = true;
    }

    setErrorHoneywellPhd(errors);

    if (!hasError) {
      addHoneywellPhd({ type: "Honeywell PHD", ...formDataHoneywellPhd });
      console.log(formDataHoneywellPhd);
      setFormDataHoneywellPhd({
        host: "",
        port: "",
        dsn: "",
        username: "",
        password: "",
      });
      setErrorHoneywellPhd({});
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput
          value={formDataHoneywellPhd.host}
          onChange={(e) =>
            setFormDataHoneywellPhd({
              ...formDataHoneywellPhd,
              host: e.target.value,
            })
          }
          error={errorHoneywellPhd.host}
          placeholder="Enter Host"
          className="w-[250px]"
        />
        <TextInput
          value={formDataHoneywellPhd.port}
          onChange={(e) =>
            setFormDataHoneywellPhd({
              ...formDataHoneywellPhd,
              port: e.target.value,
            })
          }
          error={errorHoneywellPhd.port}
          placeholder="Enter Port"
          className="w-[250px]"
        />
        <TextInput
          value={formDataHoneywellPhd.username}
          onChange={(e) =>
            setFormDataHoneywellPhd({
              ...formDataHoneywellPhd,
              username: e.target.value,
            })
          }
          error={errorHoneywellPhd.username}
          placeholder="Enter Username"
          className="w-[250px]"
        />
        <TextInput
          value={formDataHoneywellPhd.password}
          onChange={(e) =>
            setFormDataHoneywellPhd({
              ...formDataHoneywellPhd,
              password: e.target.value,
            })
          }
          isPassword={true}
          error={errorHoneywellPhd.password}
          placeholder="Enter Password"
          className="w-[250px]"
        />
        <TextInput
          value={formDataHoneywellPhd.dsn}
          onChange={(e) =>
            setFormDataHoneywellPhd({
              ...formDataHoneywellPhd,
              dsn: e.target.value,
            })
          }
          error={errorHoneywellPhd.dsn}
          placeholder="Enter DSN"
          className="w-[250px]"
        />
      </div>

      <div className="flex justify-center mb-4 mt-4">
        <NextButton onClick={handleHoneyWellData} label="Submit" />
      </div>
    </>
  );
};

export default HoneywellPhd;

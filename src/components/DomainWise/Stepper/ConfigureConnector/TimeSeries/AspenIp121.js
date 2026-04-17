import React, { useState } from "react";
import TextInput from "@/components/Common/Form/TextInput";
import NextButton from "@/components/Common/Form/NextButton";

const AspenIp121 = ({ addAspenIp121 }) => {
  const [formDataAspenIp121, setFormDataAspenIp121] = useState({
    host: "",
    port: "",
    dsn: "",
    username: "",
    password: "",
  });

  const [errorDataAspenIp121, setErrorDataAspenIp121] = useState({});

  const handleSubmit = () => {
    const errors = {};
    let hasError = false;

    if (!formDataAspenIp121.host?.trim()) {
      errors.hostError = "Host is required";
      hasError = true;
    }

    if (formDataAspenIp121.port.trim() === "") {
      errors.portError = "Port is required";
      hasError = true;
    } else if (isNaN(Number(formDataAspenIp121.port))) {
      errors.portError = "Port must be a valid number";
      hasError = true;
    }

    if (!formDataAspenIp121.username?.trim()) {
      errors.usernameError = "Username is required";
      hasError = true;
    }

    if (!formDataAspenIp121.password?.trim()) {
      errors.passwordError = "Password is required";
      hasError = true;
    }

    if (!formDataAspenIp121.dsn?.trim()) {
      errors.dsnError = "DSN is required";
      hasError = true;
    }

    setErrorDataAspenIp121(errors);
    if (!hasError) {
      addAspenIp121({ type: "Aspen IP.21", ...formDataAspenIp121 });
      console.log(formDataAspenIp121);

      setFormDataAspenIp121({
        host: "",
        port: "",
        dsn: "",
        username: "",
        password: "",
      });

      setErrorDataAspenIp121({});
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput
          value={formDataAspenIp121.host}
          onChange={(e) =>
            setFormDataAspenIp121({
              ...formDataAspenIp121,
              host: e.target.value,
            })
          }
          error={errorDataAspenIp121.hostError}
          placeholder="Enter Host"
          className="w-[250px]"
        />
        <TextInput
          value={formDataAspenIp121.port}
          onChange={(e) =>
            setFormDataAspenIp121({
              ...formDataAspenIp121,
              port: e.target.value,
            })
          }
          error={errorDataAspenIp121.portError}
          placeholder="Enter Port"
          className="w-[250px]"
        />
        <TextInput
          value={formDataAspenIp121.username}
          onChange={(e) =>
            setFormDataAspenIp121({
              ...formDataAspenIp121,
              username: e.target.value,
            })
          }
          error={errorDataAspenIp121.usernameError}
          placeholder="Enter Username"
          className="w-[250px]"
        />
        <TextInput
          value={formDataAspenIp121.password}
          onChange={(e) =>
            setFormDataAspenIp121({
              ...formDataAspenIp121,
              password: e.target.value,
            })
          }
          error={errorDataAspenIp121.passwordError}
          placeholder="Enter Password"
          isPassword={true}
          className="w-[250px]"
        />
        <TextInput
          value={formDataAspenIp121.dsn}
          onChange={(e) =>
            setFormDataAspenIp121({
              ...formDataAspenIp121,
              dsn: e.target.value,
            })
          }
          error={errorDataAspenIp121.dsnError}
          placeholder="Enter DSN"
          className="w-[250px]"
        />
      </div>

      <div className="flex justify-center mb-4 mt-4">
        <NextButton onClick={handleSubmit} label="Submit" />
      </div>
    </>
  );
};

export default AspenIp121;

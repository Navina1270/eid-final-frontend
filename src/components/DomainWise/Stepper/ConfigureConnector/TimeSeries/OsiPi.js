import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";

const OsiPi = ({ addOsiPi }) => {
  const [errorsOsiPi, setErrorsOsiPi] = useState({});
  const [formDataOsiPi, setFormDataOsiPi] = useState({
    username: "",
    password: "",
    pIWebApiUrl: "",
  });

  const handleOsiPiData = () => {
    const errorsOsiPi = {};
    let hasError = false;

    if (!formDataOsiPi.username.trim()) {
      errorsOsiPi.usernameError = "Username is required";
      hasError = true;
    }

    if (!formDataOsiPi.password.trim()) {
      errorsOsiPi.passwordError = "Password is required";
      hasError = true;
    }

    if (!formDataOsiPi.pIWebApiUrl.trim()) {
      errorsOsiPi.pIWebApiUrlError = "PI Web API URL is required";
      hasError = true;
    }

    setErrorsOsiPi(errorsOsiPi);
    if (!hasError) {
      addOsiPi({ type: "OSI PI", ...formDataOsiPi });
      console.log(formDataOsiPi);
      setFormDataOsiPi({
        username: "",
        password: "",
        pIWebApiUrl: "",
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput
          value={formDataOsiPi.username}
          onChange={(e) =>
            setFormDataOsiPi({
              ...formDataOsiPi,
              username: e.target.value,
            })
          }
          error={errorsOsiPi.usernameError}
          placeholder="Enter Username"
          className="w-[250px]"
        />
        <TextInput
          value={formDataOsiPi.password}
          onChange={(e) =>
            setFormDataOsiPi({
              ...formDataOsiPi,
              password: e.target.value,
            })
          }
          isPassword={true}
          error={errorsOsiPi.passwordError}
          placeholder="Enter Password"
          className="w-[250px]"
        />
        <TextInput
          value={formDataOsiPi.pIWebApiUrl}
          onChange={(e) =>
            setFormDataOsiPi({
              ...formDataOsiPi,
              pIWebApiUrl: e.target.value,
            })
          }
          error={errorsOsiPi.pIWebApiUrlError}
          placeholder="Enter PI Web API URL"
          className="w-[250px]"
        />
      </div>

      <div className="flex justify-center mb-4 mt-4">
        <NextButton onClick={handleOsiPiData} label="Submit" />
      </div>
    </>
  );
};

export default OsiPi;

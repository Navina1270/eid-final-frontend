import React, { useState } from "react";
import TextInput from "@/components/Common/Form/TextInput";
import NextButton from "@/components/Common/Form/NextButton";

const OnPremS4Hana = ({ addS4HanaOnPrem }) => {
  const [formDataS4HANAonprem, setFormDataS4HANAonprem] = useState({
    username: "",
    password: "",
    ODatabaseURL: "",
  });

  const [errorS4HANAonprem, setErrorS4HANAonprem] = useState({});

  const handleS4HanaOnPremData = () => {
    const errors = {};
    let hasError = false;

    if (!formDataS4HANAonprem.username.trim()) {
      errors.usernameError = "Username is required";
      hasError = true;
    }

    if (!formDataS4HANAonprem.password.trim()) {
      errors.passwordError = "Password is required";
      hasError = true;
    }

    if (!formDataS4HANAonprem.ODatabaseURL.trim()) {
      errors.ODatabaseURLError = "Database URL is required";
      hasError = true;
    }

    setErrorS4HANAonprem(errors);

    if (!hasError) {
      addS4HanaOnPrem({ type: "S4HANA On-Prem", ...formDataS4HANAonprem });
      setFormDataS4HANAonprem({
        username: "",
        password: "",
        ODatabaseURL: "",
      });
      setErrorS4HANAonprem({});
    }
  };

  return (
    <>
      <div className="space-y-4">
        <TextInput
          value={formDataS4HANAonprem.username}
          onChange={(e) =>
            setFormDataS4HANAonprem({
              ...formDataS4HANAonprem,
              username: e.target.value,
            })
          }
          error={errorS4HANAonprem.usernameError}
          placeholder="Enter Username"
        />
        <TextInput
          value={formDataS4HANAonprem.password}
          onChange={(e) =>
            setFormDataS4HANAonprem({
              ...formDataS4HANAonprem,
              password: e.target.value,
            })
          }
          error={errorS4HANAonprem.passwordError}
          placeholder="Enter Password"
          isPassword={true}
        />
        <TextInput
          value={formDataS4HANAonprem.ODatabaseURL}
          onChange={(e) =>
            setFormDataS4HANAonprem({
              ...formDataS4HANAonprem,
              ODatabaseURL: e.target.value,
            })
          }
          error={errorS4HANAonprem.ODatabaseURLError}
          placeholder="Enter Database URL"
        />

        <div className="flex justify-center mb-4 mt-4">
          <NextButton onClick={handleS4HanaOnPremData} label="Submit" />
        </div>
      </div>
    </>
  );
};

export default OnPremS4Hana;

import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";

const CloudS4Hana = ({ addS4HanaCloud }) => {
  const [errorS4HANAcloud, setErrorS4HANAcloud] = useState({});
  const [formDataS4HANAcloud, setFormDataS4HANAcloud] = useState({
    endpointURL: "",
    clientID: "",
    clientSecret: "",
    username: "",
    password: "",
    tokenURL: "",
    scope: "",
  });

  const handleS4HanaCloudData = () => {
    const errors = {};
    let hasError = false;

    if (!formDataS4HANAcloud.username.trim()) {
      errors.usernameError = "Username is required";
      hasError = true;
    }

    if (!formDataS4HANAcloud.password.trim()) {
      errors.passwordError = "Password is required";
      hasError = true;
    }

    if (!formDataS4HANAcloud.endpointURL.trim()) {
      errors.endpointURLError = "Endpoint URL is required";
      hasError = true;
    }

    if (!formDataS4HANAcloud.clientID.trim()) {
      errors.clientIDError = "Client ID is required";
      hasError = true;
    }

    if (!formDataS4HANAcloud.clientSecret.trim()) {
      errors.clientSecretError = "Client Secret is required";
      hasError = true;
    }

    if (!formDataS4HANAcloud.tokenURL.trim()) {
      errors.tokenURLError = "Token URL is required";
      hasError = true;
    }

    if (!formDataS4HANAcloud.scope.trim()) {
      errors.scopeError = "Scope is required";
      hasError = true;
    }

    setErrorS4HANAcloud(errors);

    if (!hasError) {
      addS4HanaCloud({ type: "S4HANA Cloud", ...formDataS4HANAcloud });

      // Reset form after successful submit
      setFormDataS4HANAcloud({
        endpointURL: "",
        clientID: "",
        clientSecret: "",
        username: "",
        password: "",
        tokenURL: "",
        scope: "",
      });

      setErrorS4HANAcloud({});
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          value={formDataS4HANAcloud.username}
          onChange={(e) =>
            setFormDataS4HANAcloud({
              ...formDataS4HANAcloud,
              username: e.target.value,
            })
          }
          error={errorS4HANAcloud.usernameError}
          placeholder="Enter Username"
        />
        <TextInput
          value={formDataS4HANAcloud.password}
          onChange={(e) =>
            setFormDataS4HANAcloud({
              ...formDataS4HANAcloud,
              password: e.target.value,
            })
          }
          error={errorS4HANAcloud.passwordError}
          placeholder="Enter Password"
        />
        <TextInput
          value={formDataS4HANAcloud.endpointURL}
          onChange={(e) =>
            setFormDataS4HANAcloud({
              ...formDataS4HANAcloud,
              endpointURL: e.target.value,
            })
          }
          error={errorS4HANAcloud.endpointURLError}
          placeholder="Enter Endpoint URL"
        />
        <TextInput
          value={formDataS4HANAcloud.clientID}
          onChange={(e) =>
            setFormDataS4HANAcloud({
              ...formDataS4HANAcloud,
              clientID: e.target.value,
            })
          }
          error={errorS4HANAcloud.clientIDError}
          placeholder="Enter Client ID"
        />
        <TextInput
          value={formDataS4HANAcloud.clientSecret}
          onChange={(e) =>
            setFormDataS4HANAcloud({
              ...formDataS4HANAcloud,
              clientSecret: e.target.value,
            })
          }
          error={errorS4HANAcloud.clientSecretError}
          placeholder="Enter Client Secret"
        />
        <TextInput
          value={formDataS4HANAcloud.tokenURL}
          onChange={(e) =>
            setFormDataS4HANAcloud({
              ...formDataS4HANAcloud,
              tokenURL: e.target.value,
            })
          }
          error={errorS4HANAcloud.tokenURLError}
          placeholder="Enter Token URL"
        />
      </div>

      <TextInput
        value={formDataS4HANAcloud.scope}
        onChange={(e) =>
          setFormDataS4HANAcloud({
            ...formDataS4HANAcloud,
            scope: e.target.value,
          })
        }
        error={errorS4HANAcloud.scopeError}
        placeholder="Enter Scope"
      />

      <div className="flex justify-center mb-4 mt-4">
        <NextButton onClick={handleS4HanaCloudData} label="Submit" />
      </div>
    </>
  );
};

export default CloudS4Hana;

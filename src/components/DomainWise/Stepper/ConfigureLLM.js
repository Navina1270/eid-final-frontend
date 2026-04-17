"use client";

import BackButton from "@/components/Common/Form/BackButton";
import NextButton from "@/components/Common/Form/NextButton";
import SelectInput from "@/components/Common/Form/SelectInput";
import TextInput from "@/components/Common/Form/TextInput";
import { getModelList } from "@/services/projectServices";
import { clearAuthStorage } from "@/utils/authUtils";
import { showError } from "@/utils/toastUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConfigureLLM = ({ onNext, onBack }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [model, setModel] = useState("");
  const [allModel, setAllModel] = useState([]);
  const [modelError, setModelError] = useState("");

  const [accessKeyId, setAccessKeyId] = useState("");
  const [accessKeyIdError, setAccessKeyIdError] = useState("");

  const [secretAccessKeyId, setSecretAccessKeyId] = useState("");
  const [secretAccessKeyIdError, setSecretAccessKeyIdError] = useState("");

  const [others, setOthers] = useState("");
  const [othersError, setOthersError] = useState("");


  const router= useRouter()

  const handleNext = () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError("Name is required");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!model.trim()) {
      setModelError("Model is required");
      hasError = true;
    } else {
      setModelError("");
    }

    if (!accessKeyId.trim()) {
      setAccessKeyIdError("Access Key ID is required");
      hasError = true;
    } else {
      setAccessKeyIdError("");
    }

    if (!secretAccessKeyId.trim()) {
      setSecretAccessKeyIdError("Secret Access Key ID is required");
      hasError = true;
    } else {
      setSecretAccessKeyIdError("");
    }

    if (!others.trim()) {
      setOthersError("This field is required");
      hasError = true;
    } else {
      setOthersError("");
    }

    if (hasError) return;

    const formData = {
      name,
      model,
      accessKeyId,
      secretAccessKeyId,
      others,
    };

    console.log("LLM Config Form Data:", formData);
    onNext(formData);
  };

  const fetchModelList = async () => {
    const token = localStorage.getItem("token");
      const response = await getModelList(token);
      if (response?.statusCode === 200) {
        setAllModel(response?.data);
        console.log(response.data);
      } else{
         showError(response.message || "Something went wrong")
        
        clearAuthStorage(router)
      }
    } 
  

  useEffect(() => {
    fetchModelList();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl  bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
        LLM Configuration
      </h2>

      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
        placeholder="Enter Name"
      />

      <SelectInput
        label="Select Your Model"
        options={allModel}
        value={model}
        onChange={(e) => setModel(e.target.value)}
        error={modelError}
      />
      <TextInput
        isPassword
        value={accessKeyId}
        onChange={(e) => setAccessKeyId(e.target.value)}
        error={accessKeyIdError}
        placeholder={`Enter ${model} Access Key ID`}
      />

      <TextInput
        isPassword
        value={secretAccessKeyId}
        onChange={(e) => setSecretAccessKeyId(e.target.value)}
        error={secretAccessKeyIdError}
        placeholder="Enter Secret Access Key ID"
      />
      <TextInput
        value={others}
        onChange={(e) => setOthers(e.target.value)}
        error={othersError}
        placeholder="Enter Other Details"
      />

      <div className="flex justify-between">
        <BackButton onClick={onBack} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  )
}

export default ConfigureLLM;

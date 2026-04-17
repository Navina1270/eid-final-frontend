"use client";

import React, { useEffect, useState } from "react";
import BackButton from "@/components/Common/Form/BackButton";
import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import SelectInput from "@/components/Common/Form/SelectInput";
import { getKnowledgeGraphList } from "@/services/projectServices";
import { useRouter } from "next/navigation";
import { clearAuthStorage } from "@/utils/authUtils";
import { showError } from "@/utils/toastUtils";

const ConfigureKnowledgeGraph = ({ onNext, onBack }) => {
  const [graphType, setGraphType] = useState("");
  const [allKg, setAllKg] = useState([]);
  const [name, setName] = useState("");
  const [uri, setUri] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleNext = () => {
    const newErrors = {};

    if (!graphType) newErrors.graphType = "Please select a knowledge graph";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!uri.trim()) newErrors.uri = "URI is required";
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = { graphType, name, uri, username, password };
    console.log("Knowledge Graph Config Form Data:", formData);
    onNext(formData);
  };

  // const graphOptions = [
  //   { value: "neo4j", label: "Neo4j" },
  //   { value: "aws_neptune", label: "AWS Neptune" },
  //   { value: "amazon_kendra", label: "Amazon Kendra" },
  //   // Add more options as needed
  // ];

  useEffect(() => {
    const fetchKgList = async () => {
      const token = localStorage.getItem("token");
      const response = await getKnowledgeGraphList(token);
      if (response.statusCode === 200) {
        setAllKg(response?.data);
      } else {
        showError(response.message || "Something went wrong");
        clearAuthStorage(router);
      }
    };
    fetchKgList();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
        Knowledge Graph Configuration
      </h2>

      <div className="flex space-x-4">
        <SelectInput
          label="Select Knowledge graph"
          options={allKg}
          value={graphType}
          onChange={(e) => setGraphType(e.target.value)}
          error={errors.graphType}
          placeholder="Select Knowledge Graph"
        />

        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="Enter Name"
        />
      </div>

      <TextInput
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        error={errors.uri}
        placeholder="Enter URI"
      />

      <TextInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
        placeholder="Enter Username"
      />

      <TextInput
        isPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="Password"
      />

      <div className="flex justify-between">
        <BackButton onClick={onBack} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
};

export default ConfigureKnowledgeGraph;

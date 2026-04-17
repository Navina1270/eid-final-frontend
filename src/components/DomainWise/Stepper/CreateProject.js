import BackButton from "@/components/Common/Form/BackButton";
import NextButton from "@/components/Common/Form/NextButton";
import TextInput from "@/components/Common/Form/TextInput";
import React, { useState } from "react";

const CreateProject = ({ onBack, onNext }) => {
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
  });
  const [errorProject, setErrorProject] = useState({});

  const handleNext = () => {
    const errors = {};
    let hasError = false;

    if (!projectDetails.name.trim()) {
      errors.nameError = "Project is required";
      hasError = true;
    }

    if (!projectDetails.description.trim()) {
      errors.descriptionError = "Project description is required";
      hasError = true;
    }

    setErrorProject(errors);
    if (!hasError) {
      console.log("Create Project Form Data:", projectDetails);
      onNext(projectDetails);
    }
  };

  return (
    <div className="space-y-4 text-white">
      <h2 className=" flex justify-between items-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
        Create Project
      </h2>

      <TextInput
        value={projectDetails.name}
        onChange={(e) =>
          setProjectDetails((PrevDetails) => ({
            ...PrevDetails,
            name: e.target.value,
          }))
        }
        error={errorProject.nameError}
        placeholder="Enter Project Name"
      />

      <TextInput
        value={projectDetails.description}
        onChange={(e) => {
          setProjectDetails((PrevDetails) => ({
            ...PrevDetails,
            description: e.target.value,
          }));
        }}
        error={errorProject.descriptionError}
        placeholder="Enter Project Description"
        rows={3}
      />

      <div className="flex justify-between">
        <BackButton onClick={onBack} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
};

export default CreateProject;




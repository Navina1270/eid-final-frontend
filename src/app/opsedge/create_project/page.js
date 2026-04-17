"use client";

import Stepper from "@/components/DomainWise/Stepper/Stepper";
import { addProject } from "@/services/projectServices";

const Page = () => {
  const onFinish = async (projectData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await addProject(token, projectData);
      if(response.status===201){
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Stepper onFinish={onFinish} />;
};

export default Page;

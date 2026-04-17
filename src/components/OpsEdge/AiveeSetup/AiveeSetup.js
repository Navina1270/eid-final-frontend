"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CreateWOLoader from "./CreateWOLoader";
import Insight from "./Insight";
import InsightParameters from "./InsightParameters";
import NotificationLoader from "./NotificationLoader";
import NotificationView from "./NotificationView";
import RCALoader from "./RCALoader";
import WorkOrder from "./WorkOrder";

export default function AiveeSetup() {

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ? parseInt(searchParams.get("id")) : 0;
  const receivedStep = searchParams.get("step") ? parseInt(searchParams.get("step")) : 0;

  
  const router = useRouter();
  const [response, setResponse] = useState(null);
  const [step, setStep] = useState(receivedStep);



  const handleClick = (answer) => {
    // setIsInsight(false);
    setResponse(answer);
    if (answer == "Yes") {
      setStep(1);
    } else {
      router.push("/opsedge/home");
      setStep(0);
      console.log("Skipping RCA generation...");
    }
  };

  const generateRCA = (answer) => {
    // Logic to generate RCA
    if (answer === "Yes") {
      setStep(2);
      console.log("Generating RCA...");
    } else {
      router.push("/opsedge/home");
      console.log("Skipping RCA generation...");
    }
  };

  const handleRCALoaderClick = (answer) => {
    if (answer == "Yes") {
      setStep(3);
    } else {
      router.push("/opsedge/rca");
      console.log("Skipping RCA generation...");
    }
  }



  const handleNotificationClick = (answer) => {
    if (answer == "Yes") {
      setStep(4);
      console.log("Creating notification...");
    } else {
      router.push("/opsedge/rca");
      setStep(0);
      console.log("Skipping notification creation...");
    }
  }

  const handleNotificationViewClick = (answer) => {
    if (answer == "Yes") {
      setTimeout(() => {
        console.log("Notification viewed");
        setStep(5);
      }, 3000);

      console.log("Skipping notification view...");
    } else if (answer == "No_success") {
      router.push("/opsedge/notification");

    } else {
      router.push("/opsedge/rca");
    }
  }

  const handleWorkOrder = (answer) => {
    if (answer == "Yes") {
      console.log("Creating Work Order...");
      // Logic to create Work Order
      setStep(6);
    } else {
      console.log("Skipping Work Order creation...");
      router.push("/opsedge/notification");
    }
  };

  const handleWorkOrderCreate = (answer) => {
    if (answer == "Yes") {
      console.log("Work Order created successfully");
      // Logic to handle successful Work Order creation
      // router.push("/opsedge/workorder");
    } else {
      console.log("Work Order creation skipped");
      router.push("/opsedge/notification");
    }
  }

  return (
      <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        {step == 0 && <Insight handleClick={handleClick} />}
        {step == 1 && <InsightParameters generateRCA={generateRCA} />}
        {step == 2 && <RCALoader handleClick={handleRCALoaderClick} />}
        {step == 3 && (
          <NotificationLoader handleClick={handleNotificationClick} />
        )}
        {step == 4 && (
          <NotificationView handleClick={handleNotificationViewClick} />
        )}
        {step == 5 && <CreateWOLoader handleClick={handleWorkOrder} />}

        {step == 6 && <WorkOrder handleClick={handleWorkOrderCreate} />}
      </div>
  );
}


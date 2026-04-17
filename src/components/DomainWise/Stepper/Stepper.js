"use client";
import {
  BoltIcon,
  ServerStackIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ConfigureConnector from "./ConfigureConnector/ConfigureConnector";
import ConfigureKG from "./ConfigureKG";
import ConfigureLLM from "./ConfigureLLM";
import ConfigureModel from "./ConfigureModel";
import CreateProject from "./CreateProject";
import Logs from "./Logs";

const STEPS = [
  { label: "Create Project", icon: BoltIcon },
  { label: "Configure LLM", icon: ServerStackIcon },
  { label: "Configure KG", icon: ShieldCheckIcon },
  { label: "Configure Connector", icon: RocketLaunchIcon },
  { label: "Configure Model", icon: ShieldCheckIcon },
  { label: "Logs", icon: RocketLaunchIcon },
];

export default function Stepper({ onFinish }) {
  const [step, setStep] = useState(0);
  const [allData, setAllData] = useState({});

  const handleAllProjectData = (stepKey, data) => {
    setAllData((prevData) => ({
      ...prevData,
      [stepKey]: data,
    }));
  };

  return (
    <div className="pl-8 pr-8 pt-8 text-white flex flex-col items-center ">
      <div className="grid grid-cols-[repeat(11,_minmax(0,_1fr))] gap-0 w-full max-w-5xl items-center mb-12">
        {STEPS.map((s, i) => {
          const active = i === step;
          const done = i < step;

          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center col-span-1 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: active ? 1.3 : done ? 1.1 : 1,
                  }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className={`rounded-full border-4 p-3 ${
                    done
                      ? "border-lime-400"
                      : active
                      ? "border-cyan-400 animate-pulse"
                      : "border-gray-700"
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </motion.div>
                <span className="mt-2 text-sm text-center text-slate-400 whitespace-nowrap">
                  {s.label}
                </span>
              </div>

              {i !== STEPS.length - 1 && (
                <div className="col-span-1 relative h-1">
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-700 rounded" />
                  <motion.div
                    className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-cyan-400 to-lime-400 rounded"
                    initial={{ width: 0 }}
                    animate={{
                      width: step > i ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="w-full max-w-6xl flex gap-10 items-center">
        <motion.div
          key={step}
          className="w-3/4 bg-slate-800 p-4 rounded-xl shadow-lg ring-2 ring-slate-700"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === 0 && (
            <CreateProject
              onNext={(data) => {
                console.log("Received from Create Project:", data);
                handleAllProjectData("project", data);
                setStep((s) => s + 1);
              }}
              onBack={() => setStep((s) => Math.max(s - 1, 0))}
            />
          )}
          {step === 1 && (
            <ConfigureLLM
              onNext={(data) => {
                handleAllProjectData("llmConfig", data);
                setStep((s) => s + 1);
              }}
              onBack={() => setStep((s) => Math.max(s - 1, 0))}
            />
          )}
          {step === 2 && (
            <ConfigureKG
              onNext={(data) => {
                handleAllProjectData("knowledgeGraph", data);
                setStep((s) => s + 1);
              }}
              onBack={() => setStep((s) => Math.max(s - 1, 0))}
            />
          )}
          {step === 3 && (
            <ConfigureConnector
              onNext={(data) => {
                setStep((s) => s + 1);
                handleAllProjectData("connectors", data);
              }}
              onBack={() => setStep((s) => Math.max(s - 1, 0))}
            />
          )}
          {step === 4 && (
            <ConfigureModel
              onNext={(data) => {
                setStep((s) => s + 1);
                handleAllProjectData("modelValidation", data);
                onFinish(allData);
              }}
              onBack={() => setStep((s) => Math.max(s - 1, 0))}
            />
          )}
          {step === 5 && (
            <Logs onBack={() => setStep((s) => Math.max(s - 1, 0))} />
          )}
        </motion.div>

        <motion.img
          src="/images/Aivee.gif"
          alt="AI Illustration"
          className="w-1/4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

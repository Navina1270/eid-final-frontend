"use client";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import { useEffect, useState } from "react";
import SystemFacts from "../SystemFacts/SystemFacts";
export default function RCALoader({handleClick}) {
  const [engageText, setEngageText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const engagingMessages = [
    "Analyzing sensor data...",
    "Finalizing RCA documentation...",
    "Cross-checking system logs...",
    "Calibrating model outputs...",
    "Correlating failure patterns...",
    "Preparing visualization...",
    "Compiling root cause insights...",
  ];


  
  
  const modalData = (
    <div className=" max-w-2xl mx-auto  ">
    
      <div className="flex flex-1">
        {/* Right Side - Robot GIF */}
        <div className="flex w-1/2 ">
          <img
            src="/images/working.gif"
            alt="RCA Processing Robot"
            className=" rounded-lg shadow-xl"
          />
        </div>
        {/* Left Side - Loader and Text */}
        <div className=" flex flex-col items-center p-2  ">
          {/*  */}

          {/* Header */}
          <div className="flex items-center justify-center mb-4">
            <span className="text-green-400 text-2xl mr-2">✅</span>
            <h2 className="text-xl font-semibold">
              {"RCA Created Successfully...!"}
            </h2>
          </div>

          <p className="text-center text-sm text-gray-300 mb-6">
            {
              "Your Root Cause Analysis is ready. You can now view, download, or share the RCA report."
            }
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center flex-wrap gap-4 mb-6">
            <button onClick={() => window.open("/opsedge/home", "_blank")}>
              <img
                src="/logo/eye.png"
                alt="View"
                className="inline-block mr-2 w-8 h-8"
              />
            </button>
            <button onClick={() => window.open("/opsedge/home", "_blank")}>
              <img
                src="/logo/pdf.png"
                alt="Download Icon"
                className="inline-block mr-2 w-8 h-8"
              />
            </button>
            <button onClick={() => window.open("/opsedge/home", "_blank")}>
              <img
                src="/logo/share.png"
                alt="Download Icon"
                className="inline-block mr-2 w-8 h-8"
              />
            </button>
            {/* <button onClick={() => window.open("/opsedge/home", "_blank")}>
              <img
                src="/logo/cross.png"
                alt="Download Icon"
                className="inline-block mr-2 w-8 h-8"
              />
            </button> */}
          </div>

          {/* Notification Prompt */}
          <div className="flex flex-col items-center mt-4 space-y-3">
            <p className="text-sm text-gray-300">
              Do you want to create a notification for this RCA?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleClick("Yes")}
                // className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                <img
                  src="/logo/check.png"
                  alt="check Icon"
                  className="inline-block mr-2 w-8 h-8"
                />
              </button>
              <button
                onClick={() => handleClick("No")}
                // className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                <img
                  src="/logo/cancel.png"
                  alt="decline Icon"
                  className="inline-block mr-2 w-8 h-8"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="p-4">
    //   <h2 className="text-lg font-bold mb-2">RCA Generation in Progress</h2>
    //     <p className="text-sm text-gray-500">
    //         The RCA generation process is currently underway. Please wait while we analyze the data and generate insights.
    //     </p>
    // </div>
  );
  

  useEffect(() => {
    // Show modal after RCA generation
    setTimeout(() => {
        
        setShowModal(true);
    }, 5000);
  }, []);

  // Auto-rotate engageText
  useEffect(() => {
    let engageIndex = 0;
    setEngageText(engagingMessages[0]);

    const engageInterval = setInterval(() => {
      engageIndex = (engageIndex + 1) % engagingMessages.length;
      setEngageText(engagingMessages[engageIndex]);
    }, 4000);



    return () => {
      clearInterval(engageInterval);
    };
  }, []);

  return (
    <div
      className="h-screen w-full flex flex-col "
      //   className="h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat"
      //   style={{ backgroundImage: "url('/images/working.gif')" }}
    >
      {/* Main Content */}
      <div className="flex flex-1 space-x-2 p-2">
        {/* Right Side - Robot GIF */}
        <div className="flex w-3/5">
          <img
            src="/images/working.gif"
            alt="RCA Processing Robot"
            className=" rounded-lg shadow-xl"
          />
        </div>
        {/* Left Side - Loader and Text */}
        <div className=" flex flex-col items-start p-4 space-y-2 w-2/5">
          {/* <div className="flex items-center space-x-4">
            <div className="w-20 h-20 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
            <span className="text-xl text-green-300">{engageText}</span>
          </div>
          <p className="text-xl text-gray-300">
            Hey, I am working on RCA generation, It is in progress... Please
            wait a few minutes.
          </p> */}
          <div className="flex items-center space-x-4">
            <div className="h-70">
              <img
                src={"/images/Aivee_timer.gif"}
                alt="Loader"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-xl text-green-300">{engageText}</span>
          </div>
          <div className="max-w-xl w-full bg-gradient-to-br from-blue-800 via-blue-900 to-black rounded-xl p-4 shadow-2xl border border-cyan-500 text-white font-sans  animate-fade-in">
            {/* Header */}
            <div className="flex items-center space-x-3">
              <span className="text-yellow-400 text-xl">⚡</span>
              <h2 className="text-lg font-bold tracking-wide">
                {"Notification System Engaged!"}
              </h2>
            </div>

            {/* Status Message */}
            <div className="text-sm text-gray-200 leading-relaxed">
              <p>{"Were generating your notification now..."}</p>
              <p className="mt-1">
                <span className="text-green-400 font-semibold">
                  {"Hold the line!"}
                </span>{" "}
                {"Estimated time: a few moments."}
              </p>
            </div>

            {/* Tip */}
            <div className="flex items-start space-x-2 bg-black bg-opacity-30 p-2 rounded-md border border-cyan-500 mt-2 animate-pulse">
              <span className="text-blue-300 text-lg">🔍</span>
              <p className="text-xs text-gray-300">
                {
                  "While you wait, scan through system tips to sharpen your edge."
                }
              </p>
            </div>
          </div>

          {/* Fun Fact Widget - Gaming Style */}
          {/* Fun Fact Testimonial Card */}
          <div className="max-w-xl w-full bg-gradient-to-br from-blue-800 via-blue-900 to-black rounded-xl p-4 shadow-2xl border border-cyan-500 text-white font-sans  animate-fade-in">
            {/* Icon + Title */}

            <SystemFacts />

            {/* Neon Border Glow */}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalComponent
          heading={"RCA Created Successfully...!"}
          modalData={modalData}
          onClose={closeModal}
        />
      )}
    </div>
  );
}



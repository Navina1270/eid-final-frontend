"use client";
import { useEffect, useState } from "react";
import SystemFacts from "../SystemFacts/SystemFacts";
export default function NotificationLoader({handleClick}) {
  const [engageText, setEngageText] = useState("");
  const engagingMessages = [
    "Analyzing sensor data...",
    "Finalizing RCA documentation...",
    "Cross-checking system logs...",
    "Calibrating model outputs...",
    "Correlating failure patterns...",
    "Preparing visualization...",
    "Compiling root cause insights...",
  ];


  useEffect(() => {
    // Show modal after RCA generation
    setTimeout(() => {
        handleClick("Yes");
        // setShowModal(true);
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
    >
      {/* Main Content */}
      <div className="flex flex-1 space-x-2 p-2">
        {/* Right Side - Robot GIF */}
        <div className="flex h-screen">
          <img
            src="/images/notify.png"
            alt="RCA Processing Robot"
            // className=" w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>
        {/* Left Side - Loader and Text */}
        <div className=" flex flex-col items-start p-6 space-y-2">
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
          <h3 className="text-xl text-gray-300 ml-5">
            ⚡ Alert: Notification System Engaged! <br></br>
            <ol>
              <li>Were generating your notification now...</li>
              <li>Hold the line! Estimated time: a few moments.</li>
              <li>
                
                🔍 While you wait, scan through system tips to sharpen your
                edge.
              </li>
            </ol>
          </h3>
          {/* Fun Fact Testimonial Card */}
          <div className="w-full max-w-xl mt-4 p-6 rounded-lg border border-[#00ffcc]  shadow-2xl backdrop-blur-sm text-white absolute bottom-6 right-6 overflow-hidden">
            {/* Icon + Title */}

            <SystemFacts />

          </div>
        </div>
      </div>

    </div>
  );
}

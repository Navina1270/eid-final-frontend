"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import TextTyping from "./TextTyping";

// Animation Variants
const imageVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const dialogueBoxVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.5, duration: 0.4 },
  },
};

function AiveeTalkingBox({ message, buttons = [], keyTrigger = "" }) {
  const [typingDone, setTypingDone] = useState(false);
  const [typingStart, setTypingStart] = useState(false);

  useEffect(() => {
    setTypingDone(false);
    setTypingStart(false);

    const timer = setTimeout(() => {
      setTypingStart(true);
    }, 1900);

    return () => clearTimeout(timer);
  }, [keyTrigger]);

  return (
    <div className="flex items-start relative mb-4 ">
      {/* Aivee Image */}
      <motion.div
        className="relative w-[400px] h-[400px] shrink-0 mt-18"
        variants={imageVariant}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/images/Aivee_showing.png"
          alt="Aivee"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Bubble + Dialogue Container */}
      <div className="relative -ml-30 mt-1 flex justify-center">
        {/* Dialogue Box */}
        <motion.div
          className="relative text-white px-10 py-5 w-[400px] min-h-[205px] flex flex-col bg-[#0B0F1F] rounded-[400px] shadow-lg"
          variants={dialogueBoxVariant}
          initial="hidden"
          animate="visible"
          style={{
            backgroundColor: "#0B1732 ",
            borderRadius: "80% / 80%",
            clipPath: "ellipse(80% 80% at 70% 70%)",
          }}
        >
          {/* Tail */}
          <div className="absolute -bottom-[15px] -left-[20px] w-0 h-0
            border-l-[40px] border-l-transparent
            border-r-[40px] border-r-transparent
            border-t-[100px] border-t-[#0B1732] rotate-[45deg] skew-x-[10deg]" />
          {/* Typing Message */}
          <div className="mt-4">
            {typingStart && (
              <TextTyping
                text={message}
                onTypingEnd={() => setTypingDone(true)}
                keyTrigger={keyTrigger}
              />
            )}
          </div>

          {/* Buttons */}
          {typingDone && buttons.length > 0 && (
            <div className="mt-7 w-full flex justify-center items-center gap-3 mb-3">
              {buttons.map(({ label, onClick, variant = "default" }, idx) => {
                const base = "px-2 py-1 rounded text-white text-md";
                const styles =
                  variant === "green"
                    ? `${base} bg-[#076D21] hover:bg-[#005E18]`
                    : variant === "red"
                      ? `${base} bg-red-600 hover:bg-red-700`
                      : `${base} bg-gray-600 hover:bg-gray-700`;


                return (
                  <button key={idx} onClick={onClick} className={styles}>
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AiveeTalkingBox;
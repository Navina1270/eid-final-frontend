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

const bubbleTailVariants = (delay) => ({
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.3 },
  },
});

const dialogueBoxVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.5, duration: 0.4 },
  },
};

function AiveeThinkingBox({ message, buttons = [], keyTrigger = "" }) {
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
    <div className="flex items-start relative mb-4">
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
      <div className="relative -ml-10 mr-2 mt-6 flex justify-center">
        {/* Bubble Tail */}
        <div className="absolute -left-20 -bottom-4 flex flex-col">
          <motion.div
            className="w-[38px] h-[38px] bg-[#06ACEF] rounded-full ml-10 mt-2"
            variants={bubbleTailVariants(1.2)}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="w-[28px] h-[28px] bg-[#06ACEF] rounded-full ml-4 mt-2"
            variants={bubbleTailVariants(0.9)}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="w-[16px] h-[16px] bg-[#06ACEF] rounded-full -ml-1 mt-2"
            variants={bubbleTailVariants(0.6)}
            initial="hidden"
            animate="visible"
          />
        </div>

        {/* Cloud Bubble Dialogue Box */}
        <motion.div
          className="relative w-[400px] h-[185px] flex items-center justify-center focus:outline-none"
          tabIndex={-1} // prevent accidental focus
          variants={dialogueBoxVariant}
          initial="hidden"
          animate="visible"
        >

          {/* Cloud Circles */}
          <div className="absolute w-full h-full ml-10">
            <div className="absolute bg-[#06ACEF] rounded-full w-[180px] h-[180px] -top-12 left-1"></div>
            <div className="absolute bg-[#06ACEF] rounded-full w-[150px] h-[150px] -top-15 left-26"></div>
            <div className="absolute bg-[#06ACEF] rounded-full w-[200px] h-[200px] -top-10 left-35"></div>
            <div className="absolute bg-[#06ACEF] rounded-full w-[160px] h-[160px] top-10 left-50"></div>
            <div className="absolute bg-[#06ACEF] rounded-full w-[150px] h-[150px] top-13 -left-5"></div>
            <div className="absolute bg-[#06ACEF] rounded-full w-[180px] h-[180px] top-15 right-40"></div>

          </div>

          {/* Text Container on Top */}
          <div className="relative z-10 px-4 py-5 text-white w-full -translate-x-[10px] -translate-y-[25px] mt-8">
            {typingStart && (
              <TextTyping
                text={message}
                onTypingEnd={() => setTypingDone(true)}
                keyTrigger={keyTrigger}
              />
            )}

            {typingDone && buttons.length > 0 && (
              <div className="mt-5 w-full flex justify-center items-center gap-3">
                {buttons.map(({ label, onClick, variant = "default" }, idx) => {
                  const base = "px-2 py-1 rounded text-white text-md";
                  const styles =
                    variant === "green"
                      ? `${base} bg-green-700 hover:bg-green-900`
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AiveeThinkingBox;

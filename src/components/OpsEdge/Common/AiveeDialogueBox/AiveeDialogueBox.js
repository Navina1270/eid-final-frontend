"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TypingText from "./TypingText";
import { motion } from "framer-motion";

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

function AiveeDialogueBox({ message, buttons = [], keyTrigger = "" }) {
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
      <div className="relative -ml-10 mt-6 flex justify-center">
        {/* Bubble Tail */}
        <div className="absolute left-[-85px] top-[100px] flex flex-col pointer-events-none">
          <motion.div
            className="w-[38px] h-[38px] bg-[#0B0F1F] rounded-full ml-10 mt-2"
            variants={bubbleTailVariants(1.2)}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="w-[28px] h-[28px] bg-[#0B0F1F] rounded-full ml-4 mt-2"
            variants={bubbleTailVariants(0.9)}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="w-[16px] h-[16px] bg-[#0B0F1F] rounded-full -ml-1 mt-2"
            variants={bubbleTailVariants(0.6)}
            initial="hidden"
            animate="visible"
          />
        </div>

        {/* Dialogue Box */}
        <motion.div
          className="relative text-white px-10 py-5 w-[400px] min-h-[185px] flex flex-col "
          variants={dialogueBoxVariant}
          initial="hidden"
          animate="visible"
          style={{
            backgroundColor: "#0B0F1F",            
            borderRadius: "80% / 80%",
            clipPath: "ellipse(80% 80% at 60% 60%)",
          }}
        >
          <div className="mt-4">
            {typingStart && (
              <TypingText
                text={message}
                onTypingEnd={() => setTypingDone(true)}
                keyTrigger={keyTrigger}
              />
            )}
          </div>

          {typingDone && buttons.length > 0 && (
            <div className="mt-5 w-full flex justify-center items-center gap-3 mb-3">
              {buttons.map(({ label, onClick, variant = "default" }, idx) => {
                const base = "px-2 py-1 rounded text-white text-md";
                const styles =
                  variant === "green"
                    ? `${base} bg-green-600 hover:bg-green-700`
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

export default AiveeDialogueBox;












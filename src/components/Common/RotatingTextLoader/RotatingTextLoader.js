"use client";
import React, { useEffect, useState } from "react";

const RotatingTextLoader = ({
  text = "Generating",
  size = 120,
  sentences = [],
}) => {
  const [currentSentence, setCurrentSentence] = useState("");

  useEffect(() => {
    if (sentences.length > 0) {
      setCurrentSentence(sentences[sentences.length - 1]);
    }
  }, [sentences]);
  return (
    <>
      <div className="loader-container">
        <div className="loader-wrapper" style={{ width: `${size}px`, height: `${size}px` }}>
          {text.split("").map((char, index) => (
            <span
              key={index}
              className="loader-letter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
          <div className="loader"></div>
        </div>
        <div className="loader-sentence">{currentSentence}</div>
      </div>

      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .loader-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Inter", sans-serif;
          font-size: 1em;
          font-weight: 300;
          color: #1e293b;
          border-radius: 50%;
          background-color: transparent;
          user-select: none;
        }

        .loader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background-color: transparent;
          animation: loader-rotate 2s linear infinite;
          z-index: 0;
        }

        @keyframes loader-rotate {
  0% {
    transform: rotate(90deg);
    box-shadow:
      0 5px 10px 0 #fff inset,
      0 10px 15px 0 #00ffcc inset,
      0 30px 30px 0 #0d9488 inset;
  }
  50% {
    transform: rotate(270deg);
    box-shadow:
      0 5px 10px 0 #fff inset,
      0 10px 5px 0 #00e6b8 inset,   
      0 20px 30px 0 #14b8a6 inset; 
  }
  100% {
    transform: rotate(450deg);
    box-shadow:
      0 5px 10px 0 #fff inset,
      0 10px 15px 0 #00ffcc inset,
      0 30px 30px 0 #0d9488 inset;
  }
}

        .loader-letter {
          display: inline-block;
          opacity: 0.4;
          transform: translateY(0);
          animation: loader-letter-anim 2s infinite;
          z-index: 1;
          border-radius: 50ch;
          border: none;
        }

        @keyframes loader-letter-anim {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1.15);
          }
          40% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }

        .loader-sentence {
          margin-top: 20px;
          font-family: "Inter", sans-serif;
          font-size: 1em;
          color: #1e293b;
          opacity: 0;
          animation: fadeIn 0.5s forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default RotatingTextLoader;
"use client";

import React, { useEffect, useState } from "react";

function TextTyping({ text = "", speed = 100, onTypingEnd, keyTrigger }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showDots, setShowDots] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setShowDots(true);

    let currentIndex = 0;

    // Step 1: Show dots for 2 seconds
    const dotsTimer = setTimeout(() => {
      setShowDots(false);

      // Step 2: Start typing
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          if (onTypingEnd) onTypingEnd();
        }
      }, speed);
    }, 2000); // 2s delay before typing

    return () => {
      clearTimeout(dotsTimer);
    };
  }, [text, speed, keyTrigger]);

  return (
    <div className="text-center px-8 mt-2 text-xl leading-snug whitespace-pre-wrap text-white">
      {showDots ? (
        <div className="flex justify-center gap-2 items-enter h-10 mt-15">
          <span className="w-3 h-3 bg-slate-400 rounded-full animate-bounce [animation-delay:0s]"></span>
          <span className="w-3 h-3 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-3 h-3 bg-slate-200 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>
      ) : (
        <p>{displayedText}</p>
      )}
    </div>
  );
}

export default TextTyping;

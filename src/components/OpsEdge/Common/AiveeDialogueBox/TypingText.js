"use client";

import React, { useEffect, useState } from "react";

function TypingText({ text = "", speed = 100, onTypingEnd, keyTrigger }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let currentIndex = 0;

    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        if (onTypingEnd) onTypingEnd();
      }
    };

    const interval = setInterval(type, speed);

    return () => clearInterval(interval);
  }, [text, speed, keyTrigger]);

  return (
    <p className="text-center pr-8 pl-8 mt-2 text-xl leading-snug whitespace-pre-wrap">
      {displayedText}
    </p>
  );
}

export default TypingText;















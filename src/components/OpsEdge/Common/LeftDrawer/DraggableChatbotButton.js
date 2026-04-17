"use client";

import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

const DraggableChatbotButton = ({ onClick }) => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setPosition({
      x: window.innerWidth - 100,
      y: window.innerHeight - 100,
    });
  }, []);

  if (!mounted) return null;

  return (
    <Rnd
      size={{ width: 65, height: 65 }}
      position={position}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      bounds="window"
      enableResizing={false}
      dragHandleClassName="drag-handle"
    >
      {/* Drag handle wrapper */}
      <div className="drag-handle w-full h-full rounded-full">
        {/* Actual button */}
        <button
          onClick={onClick}
          className="w-full h-full cursor-pointer bg-gradient-to-r from-cyan-400 to-lime-400 p-[2px] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
            <img src="/images/thinking.gif" alt="Logo" className="h-15" />
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .drag-handle { animation: breathe 2.5s ease-in-out infinite; }
      `}</style>
    </Rnd>
  );
};

export default DraggableChatbotButton;

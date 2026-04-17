import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LogViewer = ({ realtimeLogs, generating }) => {
  const logsEndRef = useRef(null);

  // Auto-scroll on new log
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [realtimeLogs]);

  return (
    <div
      className="bg-white text-slate-700 p-4 text-sm h-full overflow-y-auto rounded-md border border-slate-200 shadow-inner custom-scrollbar font-mono"
    >
      {realtimeLogs.map((log, i) => {
        const isLast = i === realtimeLogs.length - 1 && generating;

        return (
          <div key={i} className="relative overflow-hidden">
            {`>> ${log}`}
            {isLast && (
              <motion.div
                className="absolute top-0 left-0 h-full w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59,130,246,0.1), transparent)",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </div>
        );
      })}

      {/* Always scroll to bottom */}
      <div ref={logsEndRef} />
    </div>
  );
};

export default LogViewer;

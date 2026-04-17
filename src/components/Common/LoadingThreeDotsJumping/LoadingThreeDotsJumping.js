// "use client";

// import { motion } from "framer-motion";

// function LoadingThreeDotsJumping() {
//     const dotVariants = {
//         jump: {
//             y: -10,
//             transition: {
//                 duration: 0.6,
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 ease: "easeInOut",
//             },
//         },
//     };

//     return (
//         <motion.div
//             animate="jump"
//             transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
//             className="flex gap-1.5 items-center justify-start p-1.5"
//         >
//             <motion.div className="w-2.5 h-2.5 rounded-full bg-cyan-400" variants={dotVariants} />
//             <motion.div className="w-2.5 h-2.5 rounded-full bg-cyan-400" variants={dotVariants} />
//             <motion.div className="w-2.5 h-2.5 rounded-full bg-cyan-400" variants={dotVariants} />
//         </motion.div>
//     );
// }

// export default LoadingThreeDotsJumping;




import React, { useState, useEffect } from "react";

// Status messages array
const loadingMessages = [
  "🤖 AIVEE is processing your query...",
  "🔍 Searching knowledge base...",
  "📂 Organizing relevant files...",
  "📑 Filtering important details...",
  "🧠 Analyzing information...",
  "🧮 Running calculations...",
  "🔧 Refining response...",
  "⚙️ Compiling insights...",
  "✨ Adding finishing touches...",
  "✅ Preparing answer!",
];

const LoadingMessages = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-gray-400 italic animate-pulse font-mono">
      {loadingMessages[index]}
    </div>
  );
};

export default LoadingMessages;

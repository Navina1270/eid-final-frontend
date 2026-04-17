"use client";
import { useEffect, useState } from "react";

const FACTS = [
  {
    icon: "⚙️",
    title: "Maintenance Bot",
    text: "RCA can reduce equipment downtime by up to 50%, allowing your system to recover faster and operate more reliably.",
  },
  {
    icon: "📊",
    title: "Log Analyzer",
    text: "Always validate compressor logs weekly. Its a simple step that prevents costly failures and ensures optimal performance.",
  },
  {
    icon: "🤖",
    title: "AI Engine",
    text: "Our AI models analyze over 1 million datapoints in seconds, finding issues that human eyes might miss.",
  },
  {
    icon: "🚨",
    title: "Alert System",
    text: "Early warnings from RCA prevent unplanned outages. Stay ahead of failures before they happen.",
  },
  {
    icon: "🔧",
    title: "Predictive Maintainer",
    text: "Predictive maintenance based on RCA insights can cut repair costs by 30% and increase equipment lifespan.",
  },
  {
    icon: "📈",
    title: "System Insight",
    text: "Using historical RCA data helps prevent recurring problems, ensuring long-term system stability and performance.",
  },
];

const SystemFacts = () => {
  const [funFactIndex, setFunFactIndex] = useState(0);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setFunFactIndex((prev) => (prev + 1) % FACTS.length);
    }, 6000);

    return () => {
      clearInterval(factInterval);
    };
  }, []);

  const showPrevFact = () => {
    setFunFactIndex((prev) => (prev - 1 + FACTS.length) % FACTS.length);
  };

  const showNextFact = () => {
    setFunFactIndex((prev) => (prev + 1) % FACTS.length);
  };

  return (
    <>
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-3xl">{FACTS[funFactIndex].icon}</span>
        <h3 className="text-lg font-bold text-blue-600">
          {FACTS[funFactIndex].title}
        </h3>
      </div>

      <p className="text-sm font-mono leading-relaxed italic text-slate-500">
        “{FACTS[funFactIndex].text}”
      </p>

      <div className="flex justify-end mt-4 space-x-3">
        <button
          onClick={showPrevFact}
          className="px-3 py-1 text-xs font-semibold border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition duration-300 ease-in-out"
        >
          ◀ Prev
        </button>
        <button
          onClick={showNextFact}
          className="px-3 py-1 text-xs font-semibold border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition duration-300 ease-in-out"
        >
          Next ▶
        </button>
      </div>
    </>
  );
};

export default SystemFacts;

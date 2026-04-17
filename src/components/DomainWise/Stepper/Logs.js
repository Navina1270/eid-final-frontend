import BackButton from '@/components/Common/Form/BackButton';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
const randomLogs = [
    "🚀 Starting AI Engine...",
    "🔍 Initializing LLM pipeline...",
    "📦 Loading knowledge graph...",
    "🔗 Connecting to external APIs...",
    "✅ Configuration loaded successfully.",
    "🧠 Fine-tuning model weights...",
    "📡 Sending requests to vector DB...",
    "⚙️ Deploying containerized services...",
    "🎉 All systems operational!",
    "📁 Saving logs to /var/logs/aivee.log...",
    "🔄 Heartbeat received.",
];

const Logs = ({ onBack }) => {
    const [logs, setLogs] = useState([]);
    const logsEndRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setLogs((prevLogs) => [...prevLogs, randomLogs[index % randomLogs.length]]);
            index++;
            // if (index >= 20) clearInterval(interval);

            if(index >= 15){
                clearInterval(interval);
                router.push('/opsedge/flow_diagram'); // Redirect to Home after logs complete
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleNext = () => {
        onNext();
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
                Logs
            </h2>

            <div
                className="bg-black text-green-400 p-4 text-sm h-full overflow-y-auto rounded-md border border-slate-700 shadow-inner scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-black"
                style={{
                    scrollbarColor: '#b9b9b9 black', 
                    scrollbarWidth: 'thin',          
                }}
            >
                {logs.map((log, i) => (
                    <div key={i}>{`> ${log}`}</div>
                ))}
                <div ref={logsEndRef} />
            </div>


            <div className="flex justify-between">
                <BackButton onClick={onBack} />
                {/* <NextButton onClick={handleNext} /> */}
            </div>
        </div>
    );
};

export default Logs;

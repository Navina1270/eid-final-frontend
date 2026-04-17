"use client";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import {
    CheckCircleIcon,
    PaperAirplaneIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader3D from "../Dashboard/Loader3D";
import SystemFacts from "../SystemFacts/SystemFacts";
import { motion, AnimatePresence } from "framer-motion";
import RCA from "../RCA/RCA";
import RCADetails from "./RCADetails";
import { enterRCA, generateRCA, viewRCA } from "@/services/dashboardServices";
import { showError } from "@/utils/toastUtils";
import { clearAuthStorage } from "@/utils/authUtils";
import LogViewer from "@/components/Common/LogViewer/LogViewer";
import TickButton from "@/components/Common/Form/TickButton";
import CrossButton from "@/components/Common/Form/CrossButton";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import RotatingTextLoader from "@/components/Common/RotatingTextLoader/RotatingTextLoader";
import NextButton from "@/components/Common/Form/NextButton";
import BackButton from "@/components/Common/Form/BackButton";

const flipVariants = {
    enter: {
        rotateY: 90,
        opacity: 0,
        transition: { duration: 0.3 },
    },
    center: {
        rotateY: 0,
        opacity: 1,
        transition: { duration: 0.4 },
    },
    exit: {
        rotateY: -90,
        opacity: 0,
        transition: { duration: 0.3 },
    },
};

const ViewRCA = () => {
    const searchParams = useSearchParams();
    const anamolyId = searchParams.get("anomalyId") || searchParams.get("anamolyId");
    const rcaId = searchParams.get("rcaId");
    const method = searchParams.get("method");

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [generating, setGenerating] = useState(false);
    const [logs, setLogs] = useState([]);
    const [edit, setEdit] = useState(false);
    const [rcaDetails, setRcaDetails] = useState();
    const [rcaDetailsError, setRcaDetailsError] = useState("");
    const [input, setInput] = useState("");
    const [step, setStep] = useState(1);
    const [feedbackType, setFeedbackType] = useState("");

    const fetchRCA = async () => {
        try {
            setLoading(true);
            const rcaDetails = await viewRCA(rcaId);

            if (rcaDetails.statusCode === 401 || rcaDetails.statusCode === 403) {
                setRcaDetailsError("");
                showError(rcaDetails.message || "Invalid token or access denied");
                setRcaDetails(null);
                clearAuthStorage(router);
            } else if (rcaDetails.statusCode && rcaDetails.statusCode !== 200) {
                setRcaDetailsError(rcaDetails.message || "Failed to fetch RCA data");
                showError(rcaDetails.message || "Failed to fetch RCA data");
                setRcaDetails(null);
            } else {
                setRcaDetails({
                    ...rcaDetails.data,
                    date: rcaDetails.data.dateTime,
                    rcaId: rcaDetails.data.rcaId,
                    equipmentId: rcaDetails.data.anomaly?.equipmentId || ""
                });
                setRcaDetailsError("");
            }
        } catch (err) {
            setRcaDetailsError("Error fetching RCA data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchEnterRCA = async () => {
        try {
            setGenerating(true);
            setLogs(["Analyzing anomaly data...", "Generating Root Cause Analysis..."]);

            const response = await enterRCA(anamolyId);

            if (response.statusCode === 401 || response.statusCode === 403) {
                showError(response.message || "Invalid token or access denied");
                setRcaDetails(null);
                clearAuthStorage(router);
            } else if (response.statusCode && response.statusCode !== 200) {
                setRcaDetailsError(response.message || "Failed to generate RCA");
                showError(response.message || "Failed to generate RCA");
                setRcaDetails(null);
            } else {
                const rcaData = response?.data;
                setRcaDetails({
                    ...rcaData,
                    rcaId: rcaData?.parentRcaId,
                    rcaData: rcaData?.rcaData,
                    date: rcaData?.date,
                    fullTimelinePlot: rcaData?.fullTimelinePlot,
                    totalAnomalies: rcaData?.totalAnomalies,
                    anomalies: rcaData?.anomalies,
                    equipmentId: rcaData?.anomaly?.equipmentId || "",
                });
                setRcaDetailsError("");
            }
        } catch (err) {
            console.error("fetchEnterRCA error:", err);
            setRcaDetailsError("Error generating RCA");
        } finally {
            setGenerating(false);
            setLogs([]);
        }
    };

    const startSSE = async ({
        rcaData = "",
        rcaId = "",
        equipmentId = "",
        date = "",
        threadId = "",
    }) => {
        let reader;
        let isCancelled = false;

        try {
            setGenerating(true);

            const response = await generateRCA(
                input,
                anamolyId,
                rcaData,
                rcaId,
                equipmentId,
                date,
                feedbackType,
                step,
                method,
                threadId
            );

            if (!response.body) {
                throw new Error("No response body");
            }

            reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done || isCancelled) break;

                buffer += decoder.decode(value, { stream: true });
                const events = buffer.split("\n\n");
                buffer = events.pop() || "";

                for (const event of events) {
                    if (event.startsWith("data:")) {
                        const msg = event.replace("data:", "").trim();
                        setLogs((prev) => [...prev, msg]);
                    } else if (event.startsWith("event: final")) {
                        const dataLine = event.split("\n")[1]?.replace("data:", "").trim();
                        if (dataLine) {
                            const data = JSON.parse(dataLine);
                            setRcaDetails(data.data);
                        }
                    } else if (event.startsWith("event: end")) {
                        setGenerating(false);
                        setLogs([]);
                        setEdit(false);
                    } else if (event.startsWith("event: error")) {
                        const errorMsg = event.split("\n")[1]?.replace("data:", "").trim();
                        setLogs((prev) => [...prev, `Error: ${errorMsg}`]);
                        isCancelled = true;
                        if (reader) reader.cancel().catch(() => { });
                    }
                }
            }
        } catch (err) {
            console.error("⚠️ SSE Fetch Error:", err);
            setGenerating(false);
        }

        return () => {
            isCancelled = true;
            if (reader) reader.cancel().catch(() => { });
        };
    };

    useEffect(() => {
        if (anamolyId) {
            fetchEnterRCA();
        } else if (rcaId) {
            fetchRCA();
        }
    }, [anamolyId, rcaId]);

    const handleClickYes = (rcaId) => {
        setLoading(true);
        router.push(`/opsedge/view_notification?rcaId=${rcaId}`);
    };

    const handleRegenerate = () => {
        let cleanup;
        startSSE({
            rcaData: rcaDetails.rcaData,
            rcaId: rcaDetails.rcaId,
            equipmentId: rcaDetails.equipmentId,
            date: rcaDetails.date,
            threadId: rcaDetails.threadId,
        }).then((fn) => {
            cleanup = fn;
        });

        setInput("");
        return () => {
            if (cleanup) cleanup();
        };
    };

    const handleClickNo = () => {
        setLoading(true);
        router.push("/opsedge/rca");
    };

    const handleClickEdit = () => {
        setEdit(true);
    };

    const regenerateWithPositiveFeedback = () => {
        setStep((prev) => prev + 1);
        setFeedbackType("correct");
        handleRegenerate()
    }

    const regenerateWithNegativeFeedback = () => {
        setStep((prev) => prev + 1);
        setFeedbackType("irrelevant");
        handleRegenerate()
    }
    const goBackStep = () => {
        setStep((prev) => prev - 1);
        setFeedbackType("");
        handleRegenerate()
    }

    const regenerateWithPrompt = () => {
        setFeedbackType("reevaluate");
        handleRegenerate()
    }

    return (
        <>
            {loading && <RippleLoader />}
            <div className="w-full h-[calc(100vh-112px)] bg-slate-100 text-slate-700 flex gap-4">
                <div className="w-3/4 bg-[#fafaf9] rounded-xl shadow-2xl border border-slate-200 p-10 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={generating ? "loading" : "details"}
                            variants={flipVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="h-full w-full"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {generating ? (
                                <div className="flex flex-col h-full">
                                    <RotatingTextLoader sentences={logs} />
                                </div>
                            ) : (
                                <>
                                    {rcaDetailsError ? (
                                        <div className=" text-center p-4 text-slate-600 font-medium">{rcaDetailsError}</div>
                                    ) : (
                                        rcaDetails &&
                                        rcaDetails != null &&
                                        <RCADetails data={rcaDetails} />
                                    )}
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="w-1/4 flex flex-col bg-white border border-slate-200 p-4 rounded-xl shadow-md overflow-hidden">
                    {!rcaDetailsError && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={generating ? "right-loading" : "right-details"}
                                variants={flipVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {generating ? (
                                    <>
                                        <img
                                            src="/images/working.gif"
                                            alt="Aivee Bot"
                                            className="w-80 h-70 mb-6 mx-auto"
                                        />
                                        <SystemFacts />
                                    </>
                                ) : edit ? (
                                    <>
                                        <img
                                            src="/images/thumbsup.gif"
                                            alt="Aivee Bot"
                                            className="w-55 h-80 mb-4 mx-auto"
                                        />
                                        <p className="text-center text-md text-slate-600 mt-6 mb-2 leading-snug font-medium">
                                            📢 Please give me the prompt to re-evaluate
                                        </p>
                                        <div className="max-w-4xl mx-auto flex items-center gap-2 mb-2">
                                            <textarea
                                                className="flex-1 bg-white border border-slate-200 text-slate-800 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400 resize-none custom-scrollbar"
                                                placeholder="Type your message..."
                                                rows={2}
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    !e.shiftKey &&
                                                    regenerateWithPrompt
                                                }
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="flex gap-4 justify-center mt-auto">
                                            <TickButton onClick={regenerateWithPrompt} disabled={loading} />
                                            <CrossButton onClick={() => setEdit(false)} disabled={loading} />
                                        </div>
                                    </>
                                ) : rcaDetails?.rcaId ? (
                                    <>
                                        <img
                                            src="/images/thumbsup.gif"
                                            alt="Aivee Bot"
                                            className="w-55 h-80 mb-4 mx-auto"
                                        />

                                        <p className="text-center text-xl text-emerald-600 mt-6 mb-4 leading-snug font-bold">
                                            ✅ RCA Report generated securely and successfully.
                                        </p>
                                        
                                        {method === "auto" && (
                                            <p className="text-center text-md text-slate-600 mb-4 leading-snug">
                                                Would you like to&nbsp;
                                                <button
                                                    onClick={handleClickEdit}
                                                    className="underline text-blue-600 hover:text-blue-800 font-bold transition-colors duration-200"
                                                    type="button"
                                                >
                                                    regenerate using a prompt
                                                </button>
                                                &nbsp;instead?
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    (
                                        <>
                                            <img
                                                src="/images/thumbsup.gif"
                                                alt="Aivee Bot"
                                                className="w-55 h-80 mb-4 mx-auto"
                                            />

                                            <p className="text-center text-md text-slate-600 mt-6 mb-2 leading-snug">
                                                ✨ Please review the document and decide whether to <span className="text-emerald-600 font-bold">accept</span>, <span className="text-rose-600 font-bold">reject</span>, or <span className="text-amber-600 font-bold">re-evaluate.</span>
                                            </p>

                                            <div className="flex gap-4 justify-center mt-auto mb-2">
                                                <NextButton label="Revaluate" onClick={handleClickEdit} px={3} />
                                                <NextButton label="Accept" onClick={regenerateWithPositiveFeedback} px={3} />
                                            </div>

                                            <div className="flex gap-4 justify-center mt-auto">
                                                <BackButton label="Back" onClick={goBackStep} />
                                                <BackButton label="Reject" onClick={regenerateWithNegativeFeedback} />
                                            </div>
                                        </>
                                    )
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewRCA;

"use client";
import { Cog8ToothIcon, CpuChipIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import ApplicationCard from "./ApplicationCard";

const Applications = () => {
    const router = useRouter();

    return (
        <div className="px-8 py-2 text-white">
            <h2 className="text-3xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
                Applications
            </h2>

            <div className="mb-6">
                {/* <h3 className="text-2xl text-cyan-400 mb-4">Plant GPT</h3> */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ApplicationCard
                        title="Plant GPT"
                        description="AI-powered assistant for plant automation, monitoring, and optimization."
                        icon={CpuChipIcon}
                        onClick={() => router.push("/plant-gpt")}
                    />
                </div>
            </div>

            <div>
                <h3 className="text-2xl text-cyan-400 mb-4">Maintenance Management</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ApplicationCard
                        title="OpsEdge"
                        description="Operational intelligence and edge analytics platform for plant performance."
                        icon={WrenchScrewdriverIcon}
                        // onClick={() => router.push("/opsedge/home")}
                        onClick={() => window.open("/opsedge/home", "_blank")}

                    />
                    <ApplicationCard
                        title="AI LCM"
                        description="Lifecycle management of AI models deployed across operations."
                        icon={Cog8ToothIcon}
                        onClick={() => router.push("/ai-lcm")}
                    />
                </div>
            </div>

            
        </div>
    );
};

export default Applications;

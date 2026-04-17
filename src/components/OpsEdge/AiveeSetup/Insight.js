
import { Cog8ToothIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import ApplicationCard from '../Common/ApplicationCard/ApplicationCard';
import SystemFacts from "../SystemFacts/SystemFacts";

const Insight = ({handleClick}) => {
  return (
    <>
      <div className="w-1/1  flex flex-col items-center  p-20">
        <h3 className="text-2xl text-cyan-400 mb-4">Maintenance Management</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <ApplicationCard
            title="HP Compressor"
            bgroundColor="bg-slate-800"
            bghoverColor="bg-slate-700"
            score="75"
            icon={WrenchScrewdriverIcon}
            onClick={() => window.open("/opsedge/home", "_blank")}
          />
          <ApplicationCard
            title="LP Compressor"
            bgroundColor="bg-red-500"
            bghoverColor="bg-red-600"
            score="85"
            icon={Cog8ToothIcon}
            onClick={() => router.push("/ai-lcm")}
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">
          Do you want to Validate LP Compressor?
        </h2>
        <div className="space-x-4 mb-6">
          <button
            onClick={() => handleClick("Yes")}
          >
            <img
              src="/logo/check.png"
              alt="check Icon"
              className="inline-block mr-2 w-8 h-8"
            />
          </button>
          <button
            onClick={() => handleClick("No")}
          >
            <img
              src="/logo/cancel.png"
              alt="check Icon"
              className="inline-block mr-2 w-8 h-8"
            />
          </button>
        </div>
        <div className="w-full max-w-xl mt-4 p-6 rounded-lg border border-[#00ffcc]  shadow-2xl backdrop-blur-sm text-white absolute bottom-6 left-6 overflow-hidden">
          <SystemFacts />
        </div>
       
      </div>
      <div className="w-1/2  flex items-center justify-center ">
      
        <img
          src="/images/thumbsup.gif"
          alt="Setup GIF"
          className="max-h-[80%]"
        />
      </div>
    </>
  );
}

export default Insight
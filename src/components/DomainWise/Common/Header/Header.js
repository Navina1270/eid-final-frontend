import { clearAuthStorage } from "@/utils/authUtils";
import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Header = () => {

  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    setUserName(`${firstName} ${lastName}`.trim());
  }, []);
  const redirectToInsight = () => {
    router.push("/opsedge/flow_diagram");
  };
  return (
    <>
      <header className="w-full h-16 fixed top-0 left-0 z-50 bg-white/10 backdrop-blur-md border-b border-slate-600 flex items-center justify-between px-6 text-white">
        <div className="flex items-center gap-2">
          <Image
            src="/logo/domainwise_logo_preview.png"
            width={200}
            height={100}
            alt="Logo"
            className="h-15 w-auto cursor-pointer"
            onClick={() => redirectToInsight()}
          />
          {/* <h2 className="absolute ml-15 transform -translate-x-1/2 text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-lime-400 text-transparent bg-clip-text">
            DomainWise
          </h2> */}
        </div>

        {/* <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-lime-400 text-transparent bg-clip-text">
          DomainWise
        </h2> */}

        <div className="flex items-center gap-4">
          <span className="text-slate-300 text-md">{userName ? `Welcome, ${userName}` : "Welcome"}</span>
          <PowerIcon
            className="w-6 h-6 text-slate-300 hover:text-cyan-400 cursor-pointer transition"
            title="Logout"
            onClick={() => {
              clearAuthStorage(router)
              // localStorage.clear();
              window.location.href = "/login";
            }}
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-lime-400"></div>
      </header>
    </>
  );
};

export default Header;

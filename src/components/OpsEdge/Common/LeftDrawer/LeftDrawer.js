"use client";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { FolderIcon, RectangleGroupIcon } from "@heroicons/react/24/outline";
import { showWarning } from "@/utils/toastUtils";

import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon,
  CubeTransparentIcon,
  PresentationChartLineIcon,
  CommandLineIcon
} from "@heroicons/react/24/outline";
import Footer from "../Footer/Footer";
import { Toaster } from "sonner";
import ChatbotPopup from "@/components/DomainWise/Chatbot/ChatbotPopup";
import DraggableChatbotButton from "./DraggableChatbotButton";

const LeftDrawer = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const [role, setRole] = useState(null); // ✅ store role in state

  useEffect(() => {
    // ✅ runs only in browser
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const navItems = [
    {
      label: "Home",
      icon: <HomeIcon className="w-5 h-5" />,
      paths: [
        "/opsedge/flow_diagram",
        "/opsedge/home",
        "/opsedge/insight",
        "/opsedge/view_rca",
        "/opsedge/view_notification",
        "/opsedge/view_workorder",
      ],
    },
    {
      label: "RCA",
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
      paths: ["/opsedge/rca"],
    },
    {
      label: "Knowledge Graph",
      icon: <CubeTransparentIcon className="w-5 h-5" />,
      paths: ["/opsedge/view_kg"],
    },
    {
      label: "Symbolic AI",
      icon: <PuzzlePieceIcon className="w-5 h-5" />,
      paths: ["/opsedge/symbolic_ai"],
    },
    {
      label: "Build Model",
      icon: <CommandLineIcon className="w-5 h-5" />,
      paths: ["/opsedge/model"],
    },
    {
      label: "Notifications",
      icon: <BellIcon className="w-5 h-5" />,
      paths: ["/opsedge/notification"],
    },
    {
      label: "Work Order",
      icon: <WrenchScrewdriverIcon className="w-5 h-5" />,
      paths: ["/opsedge/workorder"],
    },
    {
      label: "Visuals",
      icon: <PresentationChartLineIcon className="w-5 h-5" />,
      paths: ["/opsedge/visuals", "/opsedge/visuals/charts"],
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      {loading && <RippleLoader />}
      <div className="flex pt-16 ">
        <aside className="w-64 bg-white border-r border-slate-200 shadow-md p-6 flex flex-col gap-6 fixed top-12 bottom-0 left-0">
          <nav className="flex flex-col space-y-4 text-lg text-slate-500">
            {navItems.map(({ label, icon, paths }) => {
              const isActive = paths.includes(pathname);
              return (
                <div key={label} className="w-full">
                  <a
                    onClick={() => {
                      if (["Notifications", "Work Order", "Visuals"].includes(label)) {
                        showWarning("Coming soon...");
                        return;
                      }
                      if (paths && paths.length > 0) {
                        setLoading(true);
                        router.push(paths[0]);
                      }
                    }}
                    className={`flex items-center gap-3 transition-colors ${
                      isActive
                        ? "text-blue-600 font-semibold"
                        : `text-slate-500 ${
                            ["Home", "RCA", "Knowledge Graph"].includes(label)
                              ? "hover:text-blue-500"
                              : ""
                          }`
                    } ${
                      paths && paths.length > 0
                        ? "cursor-pointer"
                        : "cursor-default"
                    }`}
                  >
                    {icon}
                    {label}
                  </a>
                </div>
              );
            })}
          </nav>
        </aside>
        <Toaster position="top-center" richColors />
        <main className="ml-64 flex-1 p-4 mb-5">{children}</main>

        <div className="p-[2px] rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 w-[65px] h-[65px] fixed bottom-6 right-6 z-40 mb-4 animate-breathe hover:scale-110 transition-transform duration-300 shadow-lg">
          <button
            onClick={() => setChatbotOpen((prev) => !prev)}
            className="w-full h-full cursor-pointer bg-white rounded-full text-slate-800 flex items-center justify-center"
          >
            <img src="/images/thinking.gif" alt="Logo" className="h-15" />
          </button>
        </div>
        {/* <DraggableChatbotButton onClick={() => setChatbotOpen((prev) => !prev)} /> */}

        <style jsx>{`
          @keyframes breathe {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.85;
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
            }
          }
          // .animate-breathe {
          //   animation: breathe 2.5s ease-in-out infinite;
          // }
        `}</style>
        <Footer />
      </div>
      <ChatbotPopup open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
};

export default LeftDrawer;

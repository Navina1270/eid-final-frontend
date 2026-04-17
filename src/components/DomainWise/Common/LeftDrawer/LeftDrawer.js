"use client";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import { FolderIcon, RectangleGroupIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster } from "sonner";
import Header from "../Header/Header";
import Footer from "@/components/OpsEdge/Common/Footer/Footer";

const LeftDrawer = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  console.log("pathname==========", pathname);
  const navItems = [
    {
      label: "Projects",
      icon: <FolderIcon className="w-5 h-5" />,
      paths: ["/domainwise/project_list", "/domainwise/create_project"],
    },
    {
      label: "User Management",
      icon: <RectangleGroupIcon className="w-5 h-5" />,
      paths: ["/domainwise/user_management"],
    },
    {
      label: "Build Model",
      icon: <CommandLineIcon className="w-5 h-5" />,
      paths: ["/domainwise/model"],
    },
    // {
    //   label: "Aivee",
    //   icon: <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />,
    //   paths: ["/domainwise/aivee"],
    // },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      {loading && (
        <RippleLoader />
      )}
      <div className="flex pt-16 ">
        <aside className="w-64 bg-slate-800 border-r border-slate-700 shadow-lg p-6 flex flex-col gap-6 fixed top-16 bottom-0 left-0">
          <nav className="flex flex-col space-y-4 text-lg text-slate-400">
            {navItems.map(({ label, icon, paths }) => {
              const isActive = paths.includes(pathname);
              return (
                <a
                  key={label}
                  onClick={() => {
                    router.push(paths[0]); // Always go to the primary path
                  }}
                  className={`cursor-pointer flex items-center gap-3 transition-colors ${
                    isActive
                      ? "text-cyan-400 font-semibold"
                      : "hover:text-cyan-400 hover:scale-101"
                  }`}
                >
                  {icon}
                  {label}
                </a>
              );
            })}
          </nav>
        </aside>
        <Toaster position="top-center" richColors />
        <main className="ml-64 flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default LeftDrawer;

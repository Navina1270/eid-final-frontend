"use client"
import React, { useState, useEffect } from "react";
import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clearAuthStorage } from "@/utils/authUtils";
const Header = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    setUserName(`${firstName} ${lastName}`.trim());
  }, []);

  const redirectToInsight = () => {
    router.push("/opsedge/insight");
  }
  return (
    <>
      <header className="w-full h-16 fixed top-0 left-0 z-50 bg-white shadow-sm border-b border-slate-200 flex items-center justify-between px-6 text-slate-800">
        <div className="flex items-center gap-2">
          <Image
            src="/logo/domainwise_logo_preview.png"
            width={240}
            height={120}
            alt="Logo"
            className="h-14 w-auto cursor-pointer"
            onClick={() => redirectToInsight()}
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-600 text-md">{userName ? `Welcome, ${userName}` : "Welcome"}</span>
          <PowerIcon
            className="w-6 h-6 text-slate-500 hover:text-red-500 cursor-pointer transition"
            title="Logout"
            onClick={() => {
              clearAuthStorage(router)
              window.location.href = "/login";
            }}
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-400 to-emerald-400"></div>
      </header>
    </>
  );
};

export default Header;

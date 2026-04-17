'use client';

import BackButton from "@/components/Common/Form/BackButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [userPresent, setUserPresent] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUserPresent(!!username);
  }, []);

  const renderHomePage = () => {
    router.push(userPresent ? "/opsedge/insight" : "/");
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-white text-center px-4" style={{ backgroundImage: `url('/images/404_background.jpg')` }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-800 z-0"></div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center">
        <Image
          src="/images/error.gif"
          height={500}
          width={500}
          alt="Error illustration"
        />

        <h1 className="text-2xl sm:text-3xl mt-6 text-slate-200 mb-5">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </h1>

        <BackButton
          onClick={renderHomePage}
          label="Go Back Home"
        />
      </div>
    </div>
  );
}

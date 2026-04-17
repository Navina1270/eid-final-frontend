"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";
import Image from "next/image";

export default function Welcome() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const renderLoginPage = () => {
    setTransitioning(true);
    setTimeout(() => {
      router.push("/login");
    }, 700);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white ">
      <AnimatePresence>
        {!transitioning && (
          <motion.div
            className="absolute inset-0 z-10"
            key="page-content"
            initial={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {loading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-t-transparent border-cyan-400"></div>
              </div>
            )}

            <ParticlesBackground />

            <header className="absolute top-0 left-0 z-20 w-full flex items-center justify-between px-8 py-5 bg-transparent pointer-events-auto">
              <Image src="/images/tai_logo_color.png" alt="Logo" className="h-12" height={200} width={200} />
              <button
                onClick={renderLoginPage}
                className="mt-4 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 px-8 py-2 text-lg font-medium text-slate-900 hover:scale-105 transition-transform duration-300 shadow-xl"
              >
                Sign In
              </button>
            </header>

            <main className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
              <div className="mb-6">
                <Image
                  src="/images/Aivee.gif"
                  alt="Chatbot"
                  className="h-60 animate-float mx-auto"
                  height={200}
                  width={200}
                />
              </div>

              <h1 className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent drop-shadow-md mb-4">
                Welcome to AI PlantOps
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10">
                An intelligent assistant to help you navigate your digital
                journey. Start exploring the smarter way to manage your domains.
              </p>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

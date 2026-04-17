"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "../Form/TextInput";
import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";
import { setNewPassword } from "@/services/authServices";
import { showError, showSuccess } from "@/utils/toastUtils";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";

const RippleLoader = dynamic(() => import("../RippleLoader/RippleLoader"), { ssr: false });

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const [passwordDetails, setPasswordDetails] = useState({
    email: "",
    tempPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState({});

  const router = useRouter();

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasError = false;

    // Email validation
    if (!validateEmail(passwordDetails.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    // Temporary password check
    if (!passwordDetails.tempPassword) {
      newErrors.tempPassword = "Temporary password is required.";
      hasError = true;
    }

    // Password validation (first failed rule only)
    if (passwordDetails.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters.";
      hasError = true;
    } else if (!/[A-Z]/.test(passwordDetails.newPassword)) {
      newErrors.newPassword =
        "Password must include at least one uppercase letter.";
      hasError = true;
    } else if (!/[0-9]/.test(passwordDetails.newPassword)) {
      newErrors.newPassword = "Password must include at least one number.";
      hasError = true;
    } else if (!/[!@#$%^&*]/.test(passwordDetails.newPassword)) {
      newErrors.newPassword =
        "Password must include at least one special character.";
      hasError = true;
    }

    // Confirm password match
    if (passwordDetails.newPassword !== passwordDetails.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
      hasError = true;
    }

    setPasswordError(newErrors);

    if (!hasError) {
      const response = await setNewPassword(passwordDetails);
      console.log("111111111111111111111", response)
      if (response.statusCode == 200) {
        showSuccess(response.message);
        console.log("Password reset successful:", passwordDetails);
        router.push("/login");
      } else {
        console.log("Calling showError with message:", response?.message);
        showError(response.message || "Something went wrong Please try again");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading && (
        <RippleLoader />
      )}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden flex items-center justify-center">

        <Toaster position="top-center" richColors />

        <ParticlesBackground />
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-md bg-slate-800 rounded-2xl shadow-2xl border-2 border-slate-700 p-6 w-md">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/Aivee.gif"
                alt="logo"
                width={200}
                height={200}
              />
            </div>

            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-lime-400 text-transparent bg-clip-text">
              Set New Password
            </h2>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <TextInput
                value={passwordDetails.email}
                onChange={(e) =>
                  setPasswordDetails((prevDetails) => ({
                    ...prevDetails,
                    email: e.target.value,
                  }))
                }
                error={passwordError.email}
                placeholder="Enter Email"
              />

              <TextInput
                value={passwordDetails.tempPassword}
                onChange={(e) =>
                  setPasswordDetails((prevDetails) => ({
                    ...prevDetails,
                    tempPassword: e.target.value,
                  }))
                }
                isPassword={true}
                error={passwordError.tempPassword}
                placeholder="Enter Temporary Password"
              />
              <TextInput
                value={passwordDetails.newPassword}
                onChange={(e) =>
                  setPasswordDetails((prevDetails) => ({
                    ...prevDetails,
                    newPassword: e.target.value,
                  }))
                }
                isPassword={true}
                error={passwordError.newPassword}
                placeholder="Enter New Password"
              />
              <TextInput
                value={passwordDetails.confirmNewPassword}
                onChange={(e) =>
                  setPasswordDetails((prevDetails) => ({
                    ...prevDetails,
                    confirmNewPassword: e.target.value,
                  }))
                }
                isPassword={true}
                error={passwordError.confirmNewPassword}
                placeholder="Confirm New Password"
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full p-[1.5px] rounded-lg bg-gradient-to-r from-lime-400 to-cyan-400 transition-all"
              >
                <button
                  type="submit"
                  className="w-full px-5 py-2.5 bg-slate-800 hover:bg-gradient-to-r from-lime-400 to-cyan-400 hover:text-slate-900 text-white rounded-lg font-semibold tracking-wide transition-all"
                >
                  Set New Password
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ResetPassword;

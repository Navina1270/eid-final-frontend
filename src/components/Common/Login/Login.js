"use client";
import {
  forgetPassword,
  login,
  otpConfirmation,
} from "@/services/authServices"; // Adjust the import path as necessary
import { showError, showSuccess } from "@/utils/toastUtils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Messages from "../../../config/messages.json";
import TextInput from "../Form/TextInput";
import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";
import RippleLoader from "../RippleLoader/RippleLoader";
// Login component for user authentication
export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailHelpText, setEmailHelpText] = useState("");
  const [passwordHelpText, setPasswordHelpText] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyEmailHelpText, setVerifyEmailHelpText] = useState("");

  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [resetPasswordScreen, setResetPasswordScreen] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpHelpText, setOtpHelpText] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordHelpText, setConfirmPasswordHelpText] = useState("");

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Email validation
    if (!email) {
      setEmailHelpText("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailHelpText("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailHelpText("");
    }

    // Password validation (show only first applicable error)
    if (!password) {
      setPasswordHelpText("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordHelpText("Password must be at least 8 characters.");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordHelpText(
        "Password must include at least one uppercase letter."
      );
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordHelpText("Password must include at least one number.");
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordHelpText(
        "Password must include at least one special character."
      );
      isValid = false;
    } else {
      setPasswordHelpText("");
    }

    if (isValid) {
      setLoading(true);

      var loginResponse = await login(email, password);

      console.log("Login Response:", loginResponse);

      // Support both nested { data: {...} } and flat response formats
      const loginData = loginResponse?.data ?? loginResponse;

      if (loginData.statusCode == 200) {
        localStorage.setItem("userId", loginData.userId);
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("firstName", loginData.firstName);
        localStorage.setItem("lastName", loginData.lastName);
        localStorage.setItem("role", loginData.role);

        if (loginData.role == "admin" || loginData.role == "user") {
          router.push("/opsedge/flow_diagram");
          console.log(
            `=======loginData.role ${loginData.role}=======`,
            loginData.role
          );
        } else {
          showError(Messages.SOMETHING_WRONG, {
            duration: 4000,
            className: "bg-slate-800 text-white border border-cyan-500",
          });
          setLoading(false);
        }
      } else {
        setLoading(false);
        showError(loginData.message, {
          duration: 4000,
          className: "bg-slate-800 text-white border border-cyan-500",
        });
      }
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Email validation
    console.log("verify Email", verifyEmail);
    if (!verifyEmail) {
      setVerifyEmailHelpText("Email is required.");
      isValid = false;
    } else if (!validateEmail(verifyEmail)) {
      setVerifyEmailHelpText("Please enter a valid email address.");
      isValid = false;
    } else {
      setVerifyEmailHelpText("");
    }

    console.log("isValid===>", isValid);

    if (isValid) {
      showSuccess(
        "OTP sent to Registered Email " + verifyEmail || "Something went wrong"
      );
      const forgetPasswordResponse = await forgetPassword(verifyEmail);

      setTimeout(() => {
        // closeModal()
        setShowOtpScreen(false);
        setResetPasswordScreen(true);
      }, 4000);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!password) {
      setPasswordHelpText("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordHelpText("Password must be at least 8 characters.");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordHelpText(
        "Password must include at least one uppercase letter."
      );
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordHelpText("Password must include at least one number.");
      isValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordHelpText(
        "Password must include at least one special character."
      );
      isValid = false;
    } else {
      setPasswordHelpText("");
    }

    if (password != confirmPassword) {
      setConfirmPasswordHelpText("Password & Confirm Password must be same.");

      isValid = false;
    }

    console.log(email, otp, password, confirmPassword);

    if (isValid) {
      setLoading(true);
      var otpResponse = await otpConfirmation(
        verifyEmail,
        otp,
        password,
        confirmPassword
      );
      if (otpResponse.statusCode === 200) {
        showSuccess(otpResponse.message);
        setLoading(false);
        setIsLogin(true);
        setShowOtpScreen(false);
        setResetPasswordScreen(false);
      } else {
        showError(otpResponse?.message || "Failed to change the password");
        setLoading(false);
        setIsLogin(true);
        setShowOtpScreen(false);
        setResetPasswordScreen(false);
      }

      console.log("otpResponse Response:", otpResponse);
    }
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      router.push("/opsedge/flow_diagram");
    }
    setLoading(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 overflow-hidden flex items-center justify-center">
      {loading && <RippleLoader />}
      <Toaster position="top-center" richColors />
      <ParticlesBackground />
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {isLogin ? (
          <div className="max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 w-md">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/Aivee.gif"
                alt="logo"
                width={200}
                height={200}
              />
            </div>

            <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
              {"Sign In to Your Account"}
            </h2>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailHelpText}
                placeholder="Enter Email"
              />

              <TextInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordHelpText}
                placeholder="Enter Password"
                isPassword={true}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full pt-4"
              >
                <button
                  type="submit"
                  className="w-full cursor-pointer px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold tracking-wide shadow-md transition-all"
                >
                  Sign In
                </button>
              </motion.div>
            </form>

            <p className="text-sm text-slate-500 text-center mt-4">
              Forgot Password?{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => {
                  setIsLogin(false);
                  setShowOtpScreen(true);
                  setResetPasswordScreen(false);
                }}
              >
                Reset here
              </span>
            </p>
          </div>
        ) : (
          <div className="max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 w-md">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/Aivee.gif"
                alt="logo"
                width={200}
                height={200}
              />
            </div>

            <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
              {"Enter Email to Reset Password"}
            </h2>

            {showOtpScreen && (
              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <TextInput
                  value={verifyEmail}
                  onChange={(e) => setVerifyEmail(e.target.value)}
                  error={verifyEmailHelpText}
                  placeholder="Enter Email"
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full pt-4"
                >
                  <button
                    type="submit"
                    className="w-full cursor-pointer px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold tracking-wide shadow-md transition-all"
                  >
                    Generate OTP
                  </button>
                </motion.div>
              </form>
            )}

            {resetPasswordScreen && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <TextInput
                  value={verifyEmail}
                  onChange={(e) => setVerifyEmail(e.target.value)}
                  error={emailHelpText}
                  placeholder="Enter email"
                />
                <TextInput
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  error={otpHelpText}
                  placeholder="Enter OTP"
                />
                <TextInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordHelpText}
                  placeholder="Enter New Password"
                  isPassword={true}
                />
                <TextInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPasswordHelpText}
                  placeholder="Confirm New Password"
                  isPassword={true}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full p-[1.5px] rounded-lg bg-gradient-to-r from-lime-400 to-cyan-400 transition-all"
                >
                  <button
                    type="submit"
                    className="w-full cursor-pointer px-5 py-2.5 bg-slate-800 hover:bg-gradient-to-r from-lime-400 to-cyan-400 hover:text-slate-900 text-white rounded-lg font-semibold tracking-wide transition-all"
                    onClick={() => setShowOtpScreen(false)}
                  >
                    Update Password
                  </button>
                </motion.div>
              </form>
            )}

            <p className="text-sm text-slate-400 text-center mt-4">
              Already User?{" "}
              <span
                className="text-cyan-300 hover:underline cursor-pointer"
                onClick={() => {
                  setShowOtpScreen(false);
                  setResetPasswordScreen(false);
                  setIsLogin(true);
                  router.push("/login");
                }}
              >
                Sign In
              </span>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

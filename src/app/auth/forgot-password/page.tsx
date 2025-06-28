"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { auth } from "@/app/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Password reset email sent. Check your inbox and follow the instructions to reset your password."
      );
    } catch (err: unknown) {
      console.error("Password reset error:", err);
      const firebaseError = err as { code?: string };

      // Handle specific Firebase errors
      switch (firebaseError.code) {
        case "auth/user-not-found":
          setError(
            "No account found with this email address. Please check your email or sign up."
          );
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.");
          break;
        default:
          setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white justify-start items-center w-full min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-start items-start max-w-md w-full px-4 sm:px-0 sm:max-w-lg lg:max-w-xl">
        <div className="flex justify-between items-start w-full mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
          <div>
            <h1 className="text-black pt-2 underline text-center sm:text-left text-3xl font-medium">
              Reset Password
            </h1>
          </div>
          <div className="flex gap-4 items-center justify-center sm:justify-end w-full sm:w-auto">
            <div>
              <Image
                src="/img/logo.png"
                alt="Nike Logo"
                className="w-12 h-auto sm:w-14 lg:w-16"
                width={100}
                height={100}
                priority
              />
            </div>
            <div>
              <Image
                src="/img/air-jordan-logo.png"
                alt="Air Jordan Logo"
                className="w-8 h-auto sm:w-10 lg:w-12"
                width={100}
                height={100}
                priority
              />
            </div>
          </div>
        </div>

        {message && (
          <div className="text-green-700 mb-4 p-3 bg-green-50 border border-green-200 rounded w-full text-sm sm:text-base">
            {message}
          </div>
        )}

        {error && (
          <div className="text-red-500 mb-4 p-3 bg-red-50 border border-red-200 rounded w-full text-sm sm:text-base">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="text-black w-full flex flex-col justify-center items-center py-4 mb-4">
            <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-medium">
              Forgot your password?
            </h2>
            <p className="text-center mt-2 text-gray-600 text-base font-normal">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          </div>

          {/* Email */}
          <div className="py-2 w-full">
            <input
              className="border rounded border-black w-full h-[50px] sm:h-[55px] lg:h-[60px] px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base text-black"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Terms */}
          <div className="py-4 w-full">
            <p className="text-gray-500 text-center text-xs sm:text-sm font-normal">
              By continuing, you agree to Nike&apos;s{" "}
              <span className="underline cursor-pointer hover:text-black">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className="underline cursor-pointer hover:text-black">
                Privacy Policy
              </span>
              .
            </p>
          </div>

          {/* Reset Password Button */}
          <div className="w-full mb-4">
            <button
              className="bg-black text-white w-full py-3 sm:py-4 lg:py-5 rounded-3xl hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-base font-medium"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full py-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
            <button
              type="button"
              onClick={() => router.push("/auth/Login")}
              className="text-gray-600 hover:underline hover:text-black text-base font-medium text-center flex-1"
            >
              Back to Sign In
            </button>

            <button
              type="button"
              onClick={() => router.push("/auth/Signup")}
              className="text-gray-600 hover:underline hover:text-black text-base font-medium text-center flex-1"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

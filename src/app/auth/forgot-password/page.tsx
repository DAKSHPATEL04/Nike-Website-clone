// app/auth/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase";
import Image from "next/image";

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

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      setError(
        "Failed to send reset email. Please check the email address and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white items-center justify-start w-full min-h-screen pt-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start w-full max-w-md">
        {/* Nike Logo Header */}
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="text-black underline text-2xl sm:text-3xl font-medium">
            Reset Password
          </h1>
          <div className="flex gap-3 sm:gap-4 items-center">
            <Image
              src="/img/logo.png"
              alt="Nike Logo"
              className="w-10 sm:w-12 h-auto"
              width={100}
              height={100}
              priority
            />
            <Image
              src="/img/air-jordan-logo.png"
              alt="Air Jordan Logo"
              className="w-7 sm:w-8 h-auto"
              width={100}
              height={100}
              priority
            />
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded w-full text-sm sm:text-base">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded w-full text-sm sm:text-base">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 h-12 sm:h-[50px] border border-black rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 text-white bg-black rounded-3xl hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 w-full text-center">
          <button
            onClick={() => router.push("/auth/Login")}
            className="text-gray-600 hover:underline hover:text-black text-sm sm:text-base"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

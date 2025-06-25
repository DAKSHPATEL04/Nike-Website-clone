// app/auth/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

import { useRouter } from "next/navigation";
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

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/auth/Login")}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

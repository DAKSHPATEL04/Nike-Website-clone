"use client";

import { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!email.trim()) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log("Successfully signed in!");
      router.push("/");
    } catch (error: any) {
      console.error("Authentication failed:", error);

      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/user-not-found":
          setError(
            "No account found with this email address. Please check your email or sign up."
          );
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled. Please contact support.");
          break;
        case "auth/invalid-credential":
          setError(
            "Invalid email or password. Please check your credentials and try again."
          );
          break;
        default:
          setError(
            "Login failed. Please check your credentials and try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  const handleGoogleSignIn = async () => {
    // You can implement Google Sign-In here if needed
    console.log("Google Sign-In not implemented yet");
  };

  return (
    <div className="flex flex-col bg-white justify-start items-center w-full min-h-screen pt-8">
      <div className="flex flex-col justify-start items-start max-w-md w-full px-4">
        <div className="flex justify-between items-start w-full mb-6">
          <div>
            <h1
              className="text-black pt-2 underline"
              style={{
                fontFamily: "poppins",
                fontSize: "30px",
                fontWeight: "500",
              }}
            >
              Sign In
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <Image
                src="/img/logo.png"
                alt="Nike Logo"
                className="w-12 h-auto"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/img/air-jordan-logo.png"
                alt="Air Jordan Logo"
                className="w-8 h-auto"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 mb-4 p-3 bg-red-50 border border-red-200 rounded w-full">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div
            className="text-black w-full flex flex-col justify-center items-center py-4 mb-4"
            style={{
              fontFamily: "poppins",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            <h2 className="text-center">Welcome back to Nike</h2>
            <div
              className="flex justify-center mt-4"
              style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              <button
                type="button"
                onClick={() => router.push("/auth/Signup")}
                className="text-gray-600 hover:underline"
              >
                Don&apos;t have an account? Join Us
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="py-2 w-full">
            <input
              className="border rounded border-black w-full h-[50px] px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              style={{ fontFamily: "poppins", color: "black" }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative py-2 w-full">
            <input
              className="border rounded border-black w-full h-[50px] px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              style={{ fontFamily: "poppins", color: "black" }}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none hover:text-black"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <VisibilityOffIcon className="text-black" />
              ) : (
                <RemoveRedEyeIcon className="text-black" />
              )}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center py-4 w-full">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
              />
              <label
                htmlFor="rememberMe"
                className="text-gray-600 cursor-pointer"
                style={{
                  fontFamily: "poppins",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Keep me signed in
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-gray-600 hover:underline hover:text-black"
              style={{
                fontFamily: "poppins",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              Forgotten your password?
            </button>
          </div>

          {/* Terms */}
          <div className="py-4 w-full">
            <p
              className="text-gray-500 text-center"
              style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontWeight: "400",
              }}
            >
              By logging in, you agree to Nike&apos;s{" "}
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

          {/* Sign In Button */}
          <div className="w-full mb-4">
            <button
              className="bg-black text-white w-full py-3 rounded-3xl hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: "500",
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full py-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span
              className="flex-shrink mx-4 text-gray-400"
              style={{ fontFamily: "poppins", fontSize: "14px" }}
            >
              OR
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign In Button (Optional) */}
          <div className="w-full text-black">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 border-2 border-gray-300 rounded-3xl hover:border-gray-400 transition-colors duration-200 flex items-center justify-center gap-3"
              style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

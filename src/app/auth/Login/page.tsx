"use client";

import { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "../../firebase";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Successfully signed in!");
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
      console.error("Authentication failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col bg-white justify-start items-center w-full h-screen pt-8">
      <div className="flex flex-col justify-start items-start w-[400px]">
        <div className="flex flex-1/2 justify-start items-start">
          <div>
            <h1
              className="text-black pt-2 underline"
              style={{
                fontFamily: "poppins",
                fontSize: "30px",
                fontWeight: "500",
              }}
            >
              Login
            </h1>
          </div>
          <div className="pl-45 pt-20">
            <div className="flex w-[120px] gap-4  ">
              <div className="pt-4 ">
                <img src="/img/logo.png" alt="Nike Logo" />
              </div>
              <div>
                <img src="/img/air-jordan-logo.png" alt="Air Jordan Logo" />
              </div>
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full">
          <div
            className="text-black w-full flex flex-col justify-center items-center py-7 relative"
            style={{
              fontFamily: "poppins",
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            <h1>Enter your email & password to join us or sign in.</h1>
            <div
              className="flex absolute top-18 right-11"
              style={{
                fontFamily: "poppins",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              {" "}
              <button onClick={() => router.push("/auth/Signup")}>
                {" "}
                <span className="text-gray-600 hover:underline ">
                  Back To Signup
                </span>
              </button>
            </div>
          </div>

          <div className="py-2 w-full">
            <input
              className="border rounded border-black w-full h-[50px] px-4"
              style={{ fontFamily: "poppins", color: "black" }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative py-2 w-full">
            <input
              className="border rounded border-black w-full h-[50px] px-4 pr-10"
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <VisibilityOffIcon className="text-black" />
              ) : (
                <RemoveRedEyeIcon className="text-black" />
              )}
            </button>
          </div>

          <div className="py-4 w-full">
            <p
              className="text-gray-500"
              style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <a href="/auth/forgot-password" className="hover:underline">
                Forgotten your password?
              </a>
            </p>
          </div>

          <div className="w-full">
            <button
              className="bg-black text-white w-full py-3 rounded-3xl hover:bg-gray-500 transition-colors"
              style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: "500",
              }}
              type="submit"
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

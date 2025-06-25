"use client";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { app, auth } from "../../firebase";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "@/context/AuthContext";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col bg-white justify-start items-center w-full h-screen pt-8 ">
      <div className="flex flex-col justify-start items-start">
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
              Signup
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
            className="text-black w-[450px] flex flex-col justify-center items-center py-7"
            style={{
              fontFamily: "poppins",
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            <h1>Enter your email & password to join us or sign in.</h1>
            <div
              className="flex absolute top-60 right-202"
              style={{
                fontFamily: "poppins",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              {" "}
              <button onClick={() => router.push("/auth/Login")}>
                {" "}
                <span className="text-gray-600 hover:underline ">
                  {" "}
                  Go to Login
                </span>
              </button>
            </div>
          </div>
          <div className="py-2 relative">
            <input
              className="border rounded border-black w-full h-[50px] px-4"
              style={{ fontFamily: "poppins", color: "black" }}
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="py-2 relative">
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
            >
              {showPassword ? (
                <VisibilityOffIcon className="text-black" />
              ) : (
                <RemoveRedEyeIcon className="text-black" />
              )}
            </button>
          </div>
          <div className="py-12 w-[380]">
            <p
              className="text-gray-500"
              style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              By continuing, I agree to Nike's{" "}
              <span className="underline">Privacy Policy</span> and{" "}
              <span className="underline">Terms of Use.</span>
            </p>
          </div>
          <div className="pl-78">
            <button
              className="bg-black text-white px-5 py-2 rounded-3xl hover:bg-gray-500"
              style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: "500",
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Createing Account..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

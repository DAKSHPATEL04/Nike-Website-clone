"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name");
      setLoading(false);
      return;
    }

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user profile to Firestore
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email,
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log("User account created and profile saved successfully");
      router.push("/");
    } catch (error: any) {
      console.error("Signup error:", error);
      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/email-already-in-use":
          setError(
            "This email is already registered. Please use a different email or try logging in."
          );
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Please choose a stronger password.");
          break;
        default:
          setError(
            error.message ||
              "An error occurred during signup. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col bg-white justify-start items-center w-full min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-start items-start w-full max-w-md">
        <div className="flex justify-between items-start w-full mb-6">
          <div>
            <h1 className="text-black pt-2 underline text-2xl sm:text-3xl font-medium">
              Sign Up
            </h1>
          </div>
          <div className="flex gap-3 sm:gap-4 items-center">
            <div>
              <Image
                src="/img/logo.png"
                alt="Nike Logo"
                className="w-10 sm:w-12 h-auto"
                width={100}
                height={100}
                priority
              />
            </div>
            <div>
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
        </div>

        {error && (
          <div className="text-red-500 mb-4 p-3 bg-red-50 border border-red-200 rounded w-full text-sm sm:text-base">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="text-black w-full flex flex-col justify-center items-center py-4 mb-4">
            <h2 className="text-center text-lg sm:text-xl font-medium">
              Join us and start your journey
            </h2>
            <div className="flex justify-center mt-4 text-sm sm:text-base font-normal">
              <button
                type="button"
                onClick={() => router.push("/auth/Login")}
                className="text-gray-600 hover:underline"
                suppressHydrationWarning={true}
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>

          {/* First Name */}
          <div className="py-2 relative">
            <input
              className="border rounded border-black w-full h-12 sm:h-[50px] px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              style={{ color: "black" }}
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </div>

          {/* Last Name */}
          <div className="py-2 relative">
            <input
              className="border rounded border-black w-full h-12 sm:h-[50px] px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              style={{ color: "black" }}
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </div>

          {/* Email */}
          <div className="py-2 relative">
            <input
              className="border rounded border-black w-full h-12 sm:h-[50px] px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              style={{ color: "black" }}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {/* Password */}
          <div className="py-2 relative">
            <input
              className="border rounded border-black w-full h-12 sm:h-[50px] px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              style={{ color: "black" }}
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none hover:text-black"
            >
              {showPassword ? (
                <VisibilityOffIcon className="text-black" />
              ) : (
                <RemoveRedEyeIcon className="text-black" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="py-2 relative">
            <input
              className="border rounded border-black w-full h-12 sm:h-[50px] px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              style={{ color: "black" }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none hover:text-black"
            >
              {showConfirmPassword ? (
                <VisibilityOffIcon className="text-black" />
              ) : (
                <RemoveRedEyeIcon className="text-black" />
              )}
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="py-4 sm:py-6">
            <p className="text-gray-500 text-center text-xs sm:text-sm">
              By creating an account, I agree to Nike&apos;s{" "}
              <span className="underline cursor-pointer hover:text-black">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="underline cursor-pointer hover:text-black">
                Terms of Use.
              </span>
            </p>
          </div>

          {/* Submit Button */}
          <div className="w-full">
            <button
              className="bg-black text-white w-full py-3 rounded-3xl hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Join Us"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

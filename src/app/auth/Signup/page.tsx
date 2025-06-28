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

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please enter your first and last name");
      setLoading(false);
      return;
    }

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user profile to Firestore
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email,
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      router.push("/");
    } catch (error: unknown) {
      console.error("Signup error:", error);
      let errorMessage = "An error occurred during signup. Please try again.";

      if (error instanceof Error && "code" in error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "This email is already registered. Please use a different email or try logging in.";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
          case "auth/weak-password":
            errorMessage =
              "Password is too weak. Please choose a stronger password.";
            break;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col bg-white justify-start items-center w-full min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-start items-start max-w-md w-full px-4 sm:px-0 sm:max-w-lg lg:max-w-xl">
        <div className="flex justify-between items-start w-full mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
          <div>
            <h1 className="text-black pt-2 underline text-center sm:text-left text-3xl font-medium">
              Sign Up
            </h1>
          </div>
          <div className="flex gap-4 items-center justify-center sm:justify-end w-full sm:w-auto">
            <Image
              src="/img/logo.png"
              alt="Nike Logo"
              className="w-12 h-auto sm:w-14 lg:w-16"
              width={100}
              height={100}
              priority
            />
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

        {error && (
          <div className="text-red-500 mb-4 p-3 bg-red-50 border border-red-200 rounded w-full text-sm sm:text-base">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="text-black w-full flex flex-col justify-center items-center py-4 mb-4 text-xl font-medium">
            <h2 className="text-center text-lg sm:text-xl lg:text-2xl">
              Join us and start your journey
            </h2>
            <div className="flex justify-center mt-4 text-base font-normal">
              <button
                type="button"
                onClick={() => router.push("/auth/Login")}
                className="text-gray-600 hover:underline text-sm sm:text-base text-center"
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>

          {/* First Name and Last Name */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="py-2 relative flex-1">
              <input
                className="border rounded border-black w-full h-[50px] sm:h-[55px] lg:h-[60px] px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                style={{ color: "black" }}
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleInputChange}
                value={formData.firstName}
                required
              />
            </div>

            <div className="py-2 relative flex-1">
              <input
                className="border rounded border-black w-full h-[50px] sm:h-[55px] lg:h-[60px] px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                style={{ color: "black" }}
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleInputChange}
                value={formData.lastName}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="py-2 relative">
            <input
              className="border rounded border-black w-full h-[50px] sm:h-[55px] lg:h-[60px] px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
              style={{ color: "black" }}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </div>

          {/* Password */}
          <div className="py-2 relative">
            <input
              className="border rounded border-black w-full h-[50px] sm:h-[55px] lg:h-[60px] px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
              style={{ color: "black" }}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none hover:text-black"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <VisibilityOffIcon className="text-black text-xl sm:text-2xl" />
              ) : (
                <RemoveRedEyeIcon className="text-black text-xl sm:text-2xl" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="py-2 relative">
            <input
              className="border rounded border-black w-full h-[50px] sm:h-[55px] lg:h-[60px] px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
              style={{ color: "black" }}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none hover:text-black"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <VisibilityOffIcon className="text-black text-xl sm:text-2xl" />
              ) : (
                <RemoveRedEyeIcon className="text-black text-xl sm:text-2xl" />
              )}
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="py-6">
            <p className="text-gray-500 text-center text-xs sm:text-sm text-[14px] font-normal">
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
              className="bg-black text-white w-full py-3 sm:py-4 lg:py-5 rounded-3xl hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base lg:text-lg text-[16px] font-medium"
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

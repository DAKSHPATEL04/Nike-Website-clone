"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Email = ({ children }: any) => {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const handeleSubmit = (e: any) => {
    e.preventDefault();
    route.push("/auth/password");
  };
  return (
    <div className="flex flex-col  bg-white justify-start  items-center  w-full h-screen ">
      <div className="flex flex-col justify-start items-start ">
        <div className="flex  w-[120px] gap-4  ">
          <div className="pt-4">
            <img src="/img/logo.png" alt="" />
          </div>
          <div>
            <img src="/img/air-jordan-logo.png" alt="" />
          </div>
        </div>
        <form action="" onSubmit={handeleSubmit}>
          <div
            className=" text-black w-[450px] flex flex-col justify-center items-center py-7"
            style={{
              fontFamily: "poppins",
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            <h1>Enter your email to join us or sign in.</h1>
          </div>
          <div>
            <input
              className="border rounded border-black w-[400px] h-[50px] px-4  "
              style={{ fontFamily: "poppins", color: "black" }}
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
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
              className="bg-black text-white px-5 py-2 rounded-3xl hover:bg-gray-500 "
              style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;

"use client";

import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useRouter } from "next/navigation";

const Password = () => {
  const [password, setPassword] = useState("");
  const route = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    route.push("/");
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
        <form action="" onSubmit={handleSubmit}>
          <div
            className=" text-black w-[450px] flex flex-col justify-center items-center py-7"
            style={{
              fontFamily: "poppins",
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            <h1>Enter your password to join us or sign in.</h1>
            {/* <a href="#">
            <span className="underline text-gray-300">Edit</span>
          </a> */}
          </div>
          <div className="releative">
            <input
              className="border rounded border-black w-[400px] h-[50px] px-4  "
              style={{ fontFamily: "poppins", color: "black" }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <RemoveRedEyeIcon className="absolute left-225 bottom-109 text-black" />
          </div>
          <div className="py-4 w-[380]">
            <p
              className="text-gray-500"
              style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <a href="">
                {" "}
                <span className="underline cursor-pointer">
                  Forgotten your password?
                </span>
              </a>
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
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Password;

"use client";
import { Trio } from "ldrs/react";
import "ldrs/react/Trio.css";

const Spiner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen fixed ">
      <Trio size="70" speed="1" color="#ffffff" />
    </div>
  );
};

export default Spiner;

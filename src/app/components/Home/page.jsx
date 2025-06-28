"use client";

import Image from "next/image";

const HomePage = () => {
  return (
    <>
      {/* Sale Banner */}
      <div className="flex flex-col py-3 justify-center items-center z-50 text-black bg-[#f5f5f5] px-4">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-base md:text-lg font-medium">
            New Styles On Sale: Up To 40% Off
          </h1>
          <p className="underline text-xs md:text-sm font-medium">
            <span>Shop All Our New Markdowns</span>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex bg-white justify-center items-center w-full min-h-screen py-8 md:py-0">
        <div className="flex flex-col justify-center items-center w-full px-4 md:w-[80%]">
          {/* Hero Image - Responsive with priority loading */}
          <div className="w-full max-w-[800px]">
            <Image
              src="/img/nike-just-do-it.png"
              alt="Faith Kipyegon Nike Collection"
              width={2000}
              height={1000}
              className="w-full h-auto"
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          {/* Hero Content */}
          <div className="text-black flex flex-col justify-center items-center text-center mt-4 md:mt-8">
            <h3 className="font-bold text-sm md:text-base">Breaking4</h3>

            {/* Main Headlines - Responsive font sizes */}
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2 md:mt-4">
              <span className="block">FAITH KIPYEGON</span>
              <span className="block">COLLECTION</span>
            </h1>

            {/* Description - Responsive width */}
            <p className="w-full md:w-[80%] lg:w-[500px] text-sm md:text-base mt-3 md:mt-4 px-2 md:px-0">
              Inspired by the woman daring to break the 4-minute mile barrier,
              her collection features running shoes and apparel built for speed.
            </p>

            {/* Shop Button - Responsive padding */}
            <button className="bg-black text-white px-6 py-2 md:px-8 md:py-3 mt-4 md:mt-6 rounded-3xl text-sm md:text-base hover:bg-gray-800 transition-colors">
              Shop
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

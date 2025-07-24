"use client";
import Image from "next/image";

const HomePage = () => {
  return (
    <>
      {/* Sale Banner */}
      <div className="flex flex-col py-3 md:py-4 justify-center items-center z-50 text-black bg-[#f5f5f5] px-4 lg:px-8">
        <div className="flex flex-col justify-center items-center text-center max-w-2xl">
          <h1 className="text-sm md:text-lg lg:text-xl font-medium">
            New Styles On Sale: Up To 40% Off
          </h1>
          <p className="underline text-xs md:text-base font-medium mt-1">
            <span>Shop All Our New Markdowns</span>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex bg-white justify-center items-center w-full min-h-screen py-4 lg:py-0">
        <div className="flex flex-col justify-center items-center w-full px-4 lg:w-[65%] xl:w-[55%] 2xl:w-[50%] max-w-screen-2xl">
          {/* Hero Image */}
          <div className="w-screen h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
            <img
              src="/img/nike-just-do-it.jpg"
              alt="Nike Just Do It - Faith Kipyegon Collection"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30"></div>

            {/* Hero Content */}
            <div className="absolute top-12 left-12 md:top-16 md:left-16 lg:top-20 lg:left-20 z-10 max-w-[calc(100vw-6rem)] lg:max-w-[600px]">
              <div className="text-white text-sm md:text-base font-medium mb-4 lg:mb-5 tracking-wide">
                Nike Football
              </div>

              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.85] md:leading-[0.9] mb-5 lg:mb-6 xl:mb-8 uppercase tracking-tight lg:tracking-[-2px] max-w-[600px]">
                INTRODUCING
                <br />
                SCARY GOOD
                <br />
                PACK
              </h1>

              <p className="text-white text-sm md:text-base lg:text-lg mb-6 lg:mb-8 xl:mb-10 max-w-[400px] lg:max-w-[500px] leading-relaxed">
                Terrify the opposition with boots that bring precision, speed,
                and touch.
              </p>

              <button className="bg-white text-black px-6 py-3 lg:px-8 lg:py-4 border-none rounded-full md:rounded-3xl text-sm md:text-base lg:text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95">
                Shop
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-black flex flex-col justify-center items-center text-center mt-4 lg:mt-6 xl:mt-8 px-4 lg:px-6">
            <h3 className="font-bold text-lg md:text-xl lg:text-2xl tracking-wide mb-2">
              Breaking4
            </h3>

            {/* Main Headlines */}
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[70px] w-full max-w-[350px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] leading-tight lg:leading-normal">
              FAITH KIPYEGON
            </h1>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[70px] w-full max-w-[350px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] leading-tight lg:leading-normal">
              COLLECTION
            </h1>

            {/* Description */}
            <p className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px] text-sm md:text-base lg:text-lg mt-3 md:mt-4 lg:mt-5 text-gray-600 leading-relaxed">
              Inspired by the woman daring to break the 4-minute mile barrier,
              her collection features running shoes and apparel built for speed.
            </p>

            {/* Shop Button */}
            <button
              className="bg-black text-white px-6 py-3 lg:px-8 lg:py-4 mt-5 md:mt-6 lg:mt-8 rounded-3xl text-sm md:text-base lg:text-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
              aria-label="Shop Faith Kipyegon Collection"
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

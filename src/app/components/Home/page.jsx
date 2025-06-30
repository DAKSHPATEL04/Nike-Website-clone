"use client";
import Image from "next/image";

const HomePage = () => {
  return (
    <>
      {/* Sale Banner - Responsive */}
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

      {/* Hero Section - Responsive */}
      <div className="flex bg-white justify-center items-center w-full min-h-[calc(100vh-70px)] md:min-h-screen py-8 md:py-0">
        <div className="flex flex-col justify-center items-center w-full px-4 md:w-[55%]  max-w-screen-2xl">
          {/* Responsive Image with optimized Next.js Image */}
          <div className="w-full max-w-[2000px] aspect-video relative">
            <Image
              src="/img/nike-just-do-it.png"
              alt="Nike Just Do It - Faith Kipyegon Collection"
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 10px) 80vw, 2000px"
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Content Section */}
          <div className="text-black flex flex-col justify-center items-center text-center mt-4 md:mt-8 px-2">
            <h3 className="font-bold text-lg md:text-xl tracking-wide">
              Breaking4
            </h3>

            {/* Responsive Headlines */}
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] leading-tight md:leading-normal">
              FAITH KIPYEGON
            </h1>
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] leading-tight md:leading-normal">
              COLLECTION
            </h1>

            {/* Responsive Paragraph */}
            <p className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] text-sm md:text-base mt-2 md:mt-4 text-gray-700">
              Inspired by the woman daring to break the 4-minute mile barrier,
              her collection features running shoes and apparel built for speed.
            </p>

            {/* Shop Button */}
            <button
              className="bg-black text-white px-6 py-3 md:py-2 mt-4 md:mt-6 rounded-3xl text-sm md:text-base hover:bg-gray-800 transition-colors duration-300 active:scale-95"
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

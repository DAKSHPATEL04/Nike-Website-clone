"use client";
import Image from "next/image";

const TheLatest = () => {
  return (
    <div className="bg-white w-full py-16 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="w-full flex justify-start py-2 px-4 md:px-12">
          <h1 className="text-black text-xl md:text-2xl font-medium">
            The Latest
          </h1>
        </div>

        {/* Featured Cards Container */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 justify-center items-center mt-4">
          {/* First Featured Card */}
          <div className="relative w-full lg:w-1/2 aspect-[4/5] md:aspect-[7/5] group">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <Image
                src="/img/the-letest-one.png"
                alt="Faith Kipyegon vs. The 4-Minute Mile"
                fill
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 md:left-12 md:bottom-12 w-[80%] md:w-[390px]">
              <h3 className="font-medium mb-2 text-white">Breaking4</h3>
              <h2 className="text-white text-lg md:text-xl font-normal">
                Faith Kipyegon vs. The 4-Minute Mile On June 26th
              </h2>
              <div className="py-3 md:py-4">
                <button className="bg-white text-black rounded-3xl px-4 py-2 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors">
                  Mark Your Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Second Featured Card */}
          <div className="relative w-full lg:w-1/2 aspect-[4/5] md:aspect-[7/5] group mt-4 lg:mt-0">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <Image
                src="/img/the-letest-two.png"
                alt="Nike X NorBlack NorWhite Collaboration"
                fill
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 md:left-12 md:bottom-12 w-[80%] md:w-[390px]">
              <h2 className="text-white text-lg md:text-xl font-normal">
                Nike X NorBlack NorWhite
              </h2>
              <div className="py-3 md:py-4">
                <button className="bg-white text-black rounded-3xl px-4 py-2 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors">
                  Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheLatest;

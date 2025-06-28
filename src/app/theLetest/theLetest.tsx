"use client";
import Image from "next/image";

const TheLatest = () => {
  return (
    <div className="flex bg-white justify-center items-center w-full py-12 md:py-32 px-4">
      <div className="flex flex-col justify-center w-full items-center max-w-screen-2xl">
        {/* Title Section */}
        <div className="w-full flex justify-start py-2 px-4 md:px-12">
          <h1 className="text-black text-xl md:text-2xl font-medium">
            The Latest
          </h1>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col lg:flex-row text-white gap-4 md:gap-6 justify-center items-center w-full">
          {/* Card 1 */}
          <div className="relative w-full lg:w-1/2 aspect-[4/5] md:aspect-[7/5] group">
            <Image
              src="/img/the-letest-one.png"
              alt="Faith Kipyegon vs. The 4-Minute Mile"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
              quality={85}
              priority={false}
            />
            <div className="absolute bottom-4 left-4 md:left-8 md:bottom-8 flex flex-col justify-start items-start p-4 md:p-0">
              <h3 className="font-medium mb-1 md:mb-2">Breaking4</h3>
              <h2 className="w-full max-w-[390px] text-sm md:text-base lg:text-xl font-normal">
                Faith Kipyegon vs. The 4-Minute Mile On June 26th
              </h2>
              <div className="py-2 md:py-4">
                <button className="bg-white text-black rounded-3xl px-3 md:px-4 py-1 md:py-[7px] text-sm md:text-base font-medium hover:bg-gray-100 transition-colors">
                  Mark Your Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative w-full lg:w-1/2 aspect-[4/5] md:aspect-[7/5] group">
            <Image
              src="/img/the-letest-two.png"
              alt="Nike X NorBlack NorWhite"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
              quality={85}
              priority={false}
            />
            <div className="absolute bottom-4 left-4 md:left-8 md:bottom-8 flex flex-col justify-start items-start p-4 md:p-0">
              <h2 className="w-full max-w-[390px] text-sm md:text-base lg:text-xl font-normal">
                Nike X NorBlack NorWhite
              </h2>
              <div className="py-2 md:py-4">
                <button className="bg-white text-black rounded-3xl px-3 md:px-4 py-1 md:py-[7px] text-sm md:text-base font-medium hover:bg-gray-100 transition-colors">
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

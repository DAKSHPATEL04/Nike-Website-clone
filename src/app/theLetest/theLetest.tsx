"use client";
import Image from "next/image";

const TheLatest = () => {
  return (
    <div className="flex bg-white justify-center items-center w-full py-12 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="flex flex-col justify-center w-full items-center max-w-screen-2xl">
        {/* Title Section */}
        <div className="w-full flex justify-start py-2 px-4 sm:px-8 lg:px-12 mb-4 md:mb-6">
          <h1 className="text-black text-xl sm:text-2xl font-medium tracking-tight">
            The Latest
          </h1>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
          {/* Card 1 */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[7/5] group overflow-hidden rounded-lg">
            <Image
              src="/img/the-letest-one.png"
              alt="Faith Kipyegon running at breaking4 event"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              quality={90}
              priority={false}
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 md:p-8">
              <div className="max-w-[390px]">
                <h3 className="font-medium text-white text-sm sm:text-base md:text-lg mb-1 md:mb-2">
                  Breaking4
                </h3>
                <h2 className="text-white text-base sm:text-lg md:text-xl font-normal mb-2 sm:mb-3">
                  Faith Kipyegon vs. The 4-Minute Mile On June 26th
                </h2>
                <button
                  className="bg-white text-black rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-gray-100 transition-all duration-200 active:scale-95"
                  aria-label="Mark your calendar for June 26th event"
                >
                  Mark Your Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[7/5] group overflow-hidden rounded-lg">
            <Image
              src="/img/the-letest-two.png"
              alt="Nike X NorBlack NorWhite collaboration collection"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              quality={90}
              priority={false}
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 md:p-8">
              <div className="max-w-[390px]">
                <h2 className="text-white text-base sm:text-lg md:text-xl font-normal mb-2 sm:mb-3">
                  Nike X NorBlack NorWhite
                </h2>
                <button
                  className="bg-white text-black rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-medium hover:bg-gray-100 transition-all duration-200 active:scale-95"
                  aria-label="Shop Nike X NorBlack NorWhite collection"
                >
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

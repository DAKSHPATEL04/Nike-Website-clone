"use client";
import Image from "next/image";

const Featured = () => {
  return (
    <div className="flex bg-white justify-center items-center w-full py-10 px-4 sm:px-6">
      <div className="flex flex-col justify-center w-full items-center max-w-screen-2xl">
        {/* Title Section */}
        <div className="w-full flex justify-start py-2 px-4 sm:px-8 lg:px-[110px]">
          <h1 className="text-black text-xl sm:text-2xl font-medium">
            Featured
          </h1>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1300px]">
          {/* Item 1 */}
          <div className="group">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/img/summer.png"
                alt="Cool For The Summer collection"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
              />
            </div>
            <div className="py-6 md:py-9">
              <button className="text-base sm:text-lg md:text-xl font-normal hover:text-gray-600 transition-colors cursor-pointer">
                Cool For The Summer
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="group">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/img/runing.png"
                alt="Retro Running collection"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
              />
            </div>
            <div className="py-6 md:py-9">
              <button className="text-base sm:text-lg md:text-xl font-normal hover:text-gray-600 transition-colors cursor-pointer">
                Retro Running
              </button>
            </div>
          </div>

          {/* Item 3 */}
          <div className="group">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/img/genral.png"
                alt="Field General collection"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
              />
            </div>
            <div className="py-6 md:py-9">
              <button className="text-base sm:text-lg md:text-xl font-normal hover:text-gray-600 transition-colors cursor-pointer">
                Field General
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

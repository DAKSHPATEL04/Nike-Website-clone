"use client";
import Image from "next/image";

const Featured = () => {
  return (
    <div className="bg-white w-full text-black py-8 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Title */}
        <div className="w-full flex justify-start py-2 px-2 ">
          <h1 className="text-black text-xl   md:text-2xl  font-medium">
            Featured
          </h1>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-[1300px] mx-auto">
          {/* First Featured Item */}
          <div className="group">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/img/summer.png"
                alt="Cool For The Summer Collection"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="py-4 md:py-9">
              <button className="text-lg md:text-xl font-normal cursor-pointer hover:underline">
                Cool For The Summer
              </button>
            </div>
          </div>

          {/* Second Featured Item */}
          <div className="group">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/img/runing.png"
                alt="Retro Running Collection"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="py-4 md:py-9">
              <button className="text-lg md:text-xl font-normal cursor-pointer hover:underline">
                Retro Running
              </button>
            </div>
          </div>

          {/* Third Featured Item */}
          <div className="group">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/img/genral.png"
                alt="Field General Collection"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="py-4 md:py-9">
              <button className="text-lg md:text-xl font-normal cursor-pointer hover:underline">
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

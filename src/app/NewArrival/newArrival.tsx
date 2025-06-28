"use client";
import Image from "next/image";

const NewArrival = () => {
  return (
    <div className="bg-white w-full py-8 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-2xl mx-auto">
        {/* Heading */}
        <div className="w-full flex justify-start px-4 sm:px-8 ">
          <h1 className="text-black text-xl md:text-2xl font-medium">
            Don&apos;t Miss
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full max-w-[1400px] text-black gap-6 justify-center items-center mt-4">
          <div className="text-center w-full">
            {/* Hero Image */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <Image
                src="/img/new.png"
                alt="Women's Air Jordan Collection"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Subheading */}
            <h3 className="pt-6 md:pt-9 font-medium text-base md:text-lg">
              Women&apos;s Air Jordan Collection
            </h3>

            {/* Main Heading with Custom Font */}
            <h1
              className="font-black text-4xl sm:text-5xl md:text-6xl my-4 md:my-5"
              style={{
                fontWeight: 900,
              }}
            >
              SHOW &apos;EM UP
            </h1>

            {/* Description */}
            <p className="font-poppins text-sm md:text-base max-w-[90%] sm:max-w-[80%] md:max-w-[600px] mx-auto">
              Crafted for your flyest self, the new Air Jordan Collection brings
              iconic prints and elevated cuts.
            </p>

            {/* CTA Button */}
            <div className="py-4 md:py-5">
              <button className="bg-black text-white py-2 px-6 rounded-3xl text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">
                Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;

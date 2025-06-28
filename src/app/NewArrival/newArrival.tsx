"use client";
import Image from "next/image";

const NewArrival = () => {
  return (
    <div className="flex bg-white justify-center items-center w-full py-8 md:py-10 px-4 sm:px-6">
      <div className="flex flex-col justify-center w-full items-center max-w-screen-2xl">
        {/* Heading */}
        <div className="w-full flex justify-start px-4 sm:px-8 lg:px-[59px] mb-4 md:mb-6">
          <h1 className="text-black text-xl sm:text-2xl font-medium">
            Don&apos;t Miss
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full text-black gap-6 justify-center items-center">
          <div className="text-center w-full max-w-[1400px]">
            {/* Responsive Image */}
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
              <Image
                src="/img/new.png"
                alt="Women's Air Jordan Collection - Show 'Em Up"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
                quality={90}
                priority
              />
            </div>

            {/* Subheading */}
            <h3 className="pt-6 md:pt-9 font-medium text-base sm:text-lg md:text-xl">
              Women&apos;s Air Jordan Collection
            </h3>

            {/* Main Heading */}
            <h1 className="font-black text-4xl sm:text-5xl md:text-6xl my-4 md:my-5">
              SHOW &apos;EM UP
            </h1>

            {/* Description */}
            <p className="font-poppins text-sm sm:text-base max-w-[90%] sm:max-w-[80%] md:max-w-[600px] mx-auto">
              Crafted for your flyest self, the new Air Jordan Collection brings
              iconic prints and elevated cuts.
            </p>

            {/* CTA Button */}
            <div className="py-4 md:py-5">
              <button className="bg-black text-white py-2 px-6 rounded-3xl text-sm font-medium hover:bg-gray-800 transition-colors duration-200 active:scale-95">
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

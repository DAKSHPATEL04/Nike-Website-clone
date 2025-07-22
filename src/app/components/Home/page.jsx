"use client";
import Image from "next/image";

const HomePage = () => {
  return (
    <>
      {/* Sale Banner - Enhanced Responsive */}
      <div className="flex flex-col py-2 sm:py-3 md:py-4 justify-center items-center z-50 text-black bg-[#f5f5f5] px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center text-center max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-tight sm:leading-normal">
            New Styles On Sale: Up To 40% Off
          </h1>
          <p className="underline text-xs sm:text-sm md:text-base font-medium mt-1 sm:mt-0">
            <span>Shop All Our New Markdowns</span>
          </p>
        </div>
      </div>

      {/* Hero Section - Enhanced Responsive */}
      <div className="flex bg-white justify-center items-center w-full min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-70px)] md:min-h-screen py-4 sm:py-6 md:py-8 lg:py-0">
        <div className="flex flex-col justify-center items-center w-full px-2 sm:px-4 md:px-6 lg:w-[65%] xl:w-[55%] 2xl:w-[50%] max-w-screen-2xl">
          {/* Responsive Image with optimized Next.js Image */}
          <div
            className="w-screen h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen relative"
            style={{
              width: "100vw",
              height: "100vh",
              position: "relative",
              background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
              overflow: "hidden",
            }}
          >
            <img
              src="/img/nike-just-do-it.jpg"
              alt="Nike Just Do It - Faith Kipyegon Collection"
              className="w-full h-full object-cover object-center sm:object-top md:object-center"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />

            <div
              className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30 sm:bg-gradient-to-r md:bg-gradient-to-br"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
              }}
            ></div>

            <div
              className="absolute top-4 left-4 sm:top-8 sm:left-8 md:top-12 md:left-12 lg:top-16 lg:left-16 xl:top-20 xl:left-20 z-10 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] md:max-w-[calc(100vw-6rem)] lg:max-w-[600px]"
              style={{
                position: "absolute",
                top: "80px",
                left: "80px",
                zIndex: 10,
              }}
            >
              <div
                className="text-white text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 md:mb-4 lg:mb-5 tracking-wide sm:tracking-wider"
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 500,
                  marginBottom: "20px",
                  letterSpacing: "1px",
                }}
              >
                Nike Football
              </div>
              <h1
                className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-[0.8] sm:leading-[0.85] md:leading-[0.9] mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 uppercase tracking-tight sm:tracking-tighter md:tracking-[-1px] lg:tracking-[-2px]"
                style={{
                  color: "white",
                  fontSize: "72px",
                  fontWeight: 900,
                  lineHeight: 0.9,
                  marginBottom: "30px",
                  textTransform: "uppercase",
                  letterSpacing: "-2px",
                  maxWidth: "600px",
                  marginLeft: "20px",
                }}
              >
                INTRODUCING
                <br />
                SCARY GOOD
                <br />
                PACK
              </h1>
              <p
                className="text-white text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] leading-relaxed sm:leading-normal md:leading-relaxed"
                style={{
                  color: "white",
                  fontSize: "18px",
                  marginBottom: "40px",
                  maxWidth: "500px",
                  lineHeight: 1.5,
                }}
              >
                Terrify the opposition with boots that bring precision, speed,
                and touch.
              </p>
              <button
                className="bg-white text-black px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-7 lg:py-3.5 xl:px-8 xl:py-4 border-none rounded-full sm:rounded-2xl md:rounded-3xl text-xs sm:text-sm md:text-base lg:text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95"
                style={{
                  background: "white",
                  color: "black",
                  padding: "15px 30px",
                  border: "none",
                  borderRadius: "25px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Shop
              </button>
            </div>
          </div>

          {/* Content Section - Enhanced Responsive */}
          <div className="text-black flex flex-col justify-center items-center text-center mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8 px-1 sm:px-2 md:px-4 lg:px-6">
            <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide sm:tracking-wider mb-1 sm:mb-2">
              Breaking4
            </h3>

            {/* Enhanced Responsive Headlines */}
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[70px] w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] leading-tight sm:leading-tight md:leading-normal lg:leading-normal xl:leading-tight">
              FAITH KIPYEGON
            </h1>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[70px] w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] leading-tight sm:leading-tight md:leading-normal lg:leading-normal xl:leading-tight">
              COLLECTION
            </h1>

            {/* Enhanced Responsive Paragraph */}
            <p className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px] text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-5 text-gray-600 sm:text-gray-700 leading-relaxed sm:leading-normal md:leading-relaxed">
              Inspired by the woman daring to break the 4-minute mile barrier,
              her collection features running shoes and apparel built for speed.
            </p>

            {/* Enhanced Shop Button */}
            <button
              className="bg-black text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-7 lg:py-3.5 xl:px-8 xl:py-4 mt-3 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-8 rounded-2xl sm:rounded-3xl text-xs sm:text-sm md:text-base lg:text-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
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

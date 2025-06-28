"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ShopBySports } from "../data/ShopBySport";
import Image from "next/image";

interface Product {
  _id: string;
  product_name: string;
  product_image: string;
  product_data: {
    prize: number;
    descrption: string;
    rating: number;
    is_new: boolean;
  };
}

const ShopBySport = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const products = ShopBySports;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) scrollRight(); // Swipe left
    if (touchStart - touchEnd < -50) scrollLeft(); // Swipe right
  };

  // Check if image is from external source
  const isExternalImage = (url: string) => {
    return url.startsWith("http") && !url.includes("localhost");
  };

  return (
    <div className="flex flex-col items-center py-6 md:py-10 lg:py-12 bg-white w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1400px] relative">
        {/* Title and navigation buttons */}
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h2 className="text-black text-lg sm:text-xl md:text-2xl font-medium">
            Shop By Sport
          </h2>

          <div className="hidden sm:flex space-x-2">
            <button
              onClick={scrollLeft}
              className="bg-[#e5e5e5] text-black rounded-full hover:bg-gray-300 transition-colors w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ArrowBackIosNewIcon className="text-base md:text-lg" />
            </button>
            <button
              onClick={scrollRight}
              className="bg-[#e5e5e5] text-black rounded-full hover:bg-gray-300 transition-colors w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              aria-label="Next slide"
            >
              <ArrowForwardIosIcon className="text-base md:text-lg" />
            </button>
          </div>
        </div>

        {/* Carousel container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide gap-3 sm:gap-4 w-full py-3 md:py-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="relative flex-shrink-0"
              style={{
                scrollSnapAlign: "start",
                width: "240px",
                minWidth: "240px",
              }}
            >
              <Link href={`/components/MainPage`} className="block">
                <div className="rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-52 sm:h-60 md:h-72 lg:h-80 flex items-center justify-center bg-gray-50">
                    {isExternalImage(product.product_image) ? (
                      <img
                        src={product.product_image}
                        alt={product.product_name}
                        className="h-full w-auto object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <Image
                        src={product.product_image}
                        alt={product.product_name}
                        width={420}
                        height={420}
                        className="h-full w-auto object-contain"
                      />
                    )}
                  </div>
                  <div className="absolute bottom-4 left-3 sm:bottom-6 sm:left-4 md:bottom-8 md:left-6 lg:bottom-10 lg:left-8 bg-white py-1 px-2 sm:py-1 sm:px-3 md:py-[5px] md:px-4 text-black rounded-3xl text-xs sm:text-sm md:text-base font-medium">
                    <button>{product.product_data.descrption}</button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex sm:hidden justify-center space-x-3 mt-3">
          <button
            onClick={scrollLeft}
            className="bg-[#e5e5e5] text-black rounded-full hover:bg-gray-300 transition-colors w-8 h-8 flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ArrowBackIosNewIcon className="text-base" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-[#e5e5e5] text-black rounded-full hover:bg-gray-300 transition-colors w-8 h-8 flex items-center justify-center"
            aria-label="Next slide"
          >
            <ArrowForwardIosIcon className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopBySport;

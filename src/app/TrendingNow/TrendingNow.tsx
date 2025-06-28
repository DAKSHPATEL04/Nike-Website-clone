"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { TrendingNow } from "../data/TrendingNow";
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

const TrendingNowComponent = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const products = TrendingNow;

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

  const isExternalImage = (url: string) => {
    return url.startsWith("http") && !url.includes("localhost");
  };

  return (
    <div className="flex flex-col items-center py-8 md:py-12 bg-white w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-8xl relative">
        {/* Title and navigation buttons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black text-xl md:text-2xl font-medium">
            Trending Now
          </h2>

          <div className="hidden sm:flex space-x-2">
            <button
              onClick={scrollLeft}
              className="bg-[#e5e5e5] text-black rounded-full hover:bg-gray-300 transition-colors w-10 h-10 flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ArrowBackIosNewIcon className="text-lg" />
            </button>
            <button
              onClick={scrollRight}
              className="bg-[#e5e5e5] text-black rounded-full hover:bg-gray-300 transition-colors w-10 h-10 flex items-center justify-center"
              aria-label="Next slide"
            >
              <ArrowForwardIosIcon className="text-lg" />
            </button>
          </div>
        </div>

        {/* Carousel container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 w-full py-4"
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
              className="flex-shrink-0"
              style={{
                scrollSnapAlign: "start",
                width: "280px",
                minWidth: "280px",
              }}
            >
              <Link href={`/components/MainPage`} className="block">
                <div className="rounded-lg">
                  <div className="h-72 md:h-96 flex items-center justify-center bg-gray-50">
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
                        width={440}
                        height={440}
                        className="h-full w-auto object-contain"
                      />
                    )}
                  </div>
                  <div className="mt-3 space-y-1">
                    <h1 className="text-sm md:text-base font-medium text-black">
                      {product.product_name}
                    </h1>
                    <h2 className="text-sm md:text-base font-medium text-gray-600">
                      {product.product_data.descrption}
                    </h2>
                    <h2 className="text-sm md:text-base font-medium text-black">
                      MRP : ₹{product.product_data.prize.toLocaleString()}
                    </h2>
                    {product.product_data.is_new && (
                      <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded mt-1">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex sm:hidden justify-center space-x-4 mt-4">
          <button
            onClick={scrollLeft}
            className="bg-[#e5e5e5] text-black rounded-full hover:bg-gray-300 transition-colors w-10 h-10 flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ArrowBackIosNewIcon className="text-lg" />
          </button>
          <button
            onClick={scrollRight}
            className="bg-[#e5e5e5] text-black rounded-full hover:bg-gray-300 transition-colors w-10 h-10 flex items-center justify-center"
            aria-label="Next slide"
          >
            <ArrowForwardIosIcon className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingNowComponent;

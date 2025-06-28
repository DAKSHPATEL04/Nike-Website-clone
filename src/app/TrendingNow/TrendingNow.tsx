"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { TrendingNow } from "../data/TrendingNow";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Since we're using local data, we don't need the fetch effect
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

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      scrollRight(); // Swipe left
    }

    if (touchStart - touchEnd < -50) {
      scrollLeft(); // Swipe right
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center py-12 bg-[#f5f5f5] w-full">
        <div className="w-full max-w-6xl px-8">
          <h2 className="text-3xl font-bold mb-8 text-black font-poppins text-left">
            Trending Now
          </h2>
        </div>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 bg-[#f5f5f5] w-full">
        <div className="w-full max-w-6xl px-8">
          <h2 className="text-3xl font-bold mb-8 text-black font-poppins text-left">
            Trending Now
          </h2>
        </div>
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-12 bg-[#ffffff] w-full">
      <div className="w-full max-w-8xl px-8 relative">
        {/* Title and navigation buttons in the same row */}
        <div className="flex justify-between items-center mb-2">
          <h2
            className="text-black"
            style={{
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            Trending Now
          </h2>

          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              className="bg-[#e5e5e5] text-black text-xl p-6 rounded-full hover:bg-gray-700 transition-colors w-10 h-10 flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ArrowBackIosNewIcon />
            </button>
            <button
              onClick={scrollRight}
              className="bg-[#e5e5e5] text-black text-xl p-6 rounded-full hover:bg-gray-700 transition-colors w-10 h-10 flex items-center justify-center"
              aria-label="Next slide"
            >
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 w-full py-4"
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
                width: "440px",
              }}
            >
              <Link href={`/components/MainPage`}>
                <div className="rounded-lg ">
                  <div className="h-120 flex items-center justify-center">
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div
                    className="text-black"
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    <h1 className="  mt-2">{product.product_name}</h1>
                  </div>
                  <div
                    className="text-gray-600"
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    <h2>{product.product_data.descrption}</h2>
                  </div>
                  <div
                    className="text-black"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    <h2>MRP : ₹{product.product_data.prize}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingNowComponent;

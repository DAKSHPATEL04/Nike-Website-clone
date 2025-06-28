"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
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

const ShopNow = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://react-trainee-api.onrender.com/get/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center py-8 md:py-12 bg-white w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1400px]">
          <h2 className="text-black text-xl md:text-2xl font-medium mb-4">
            Shop by Icons
          </h2>
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-8 md:py-12 bg-white w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1400px]">
          <h2 className="text-black text-xl md:text-2xl font-medium mb-4">
            Shop by Icons
          </h2>
          <p className="text-red-500 text-center py-8">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 md:py-12 bg-white w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1400px]">
          <h2 className="text-black text-xl md:text-2xl font-medium mb-4">
            Shop by Icons
          </h2>
          <p className="text-center py-8">No products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 md:py-12 bg-white w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1400px] relative">
        {/* Title and navigation buttons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black text-xl md:text-2xl font-medium">
            Shop by Icons
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

        {/* Horizontal scroll container */}
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
              className="flex-shrink-0"
              style={{
                scrollSnapAlign: "start",
                width: "280px",
                minWidth: "280px",
              }}
            >
              <Link
                href={`/components/MainPage?id=${product._id}`}
                className="block"
              >
                <div className="rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-md">
                  <div className="h-60 md:h-72 lg:h-80 flex items-center justify-center bg-gray-50 p-4">
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
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex sm:hidden justify-center space-x-3 mt-4">
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

export default ShopNow;

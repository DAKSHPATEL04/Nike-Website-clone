"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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

  if (loading) {
    return (
      <div className="flex flex-col items-center py-12 bg-[#f5f5f5] w-full">
        <div className="w-full max-w-6xl px-8">
          <h2 className="text-3xl font-bold mb-8 text-black font-poppins text-left">
            Shop by Icons
          </h2>
        </div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-12 bg-[#f5f5f5] w-full">
        <div className="w-full max-w-6xl px-8">
          <h2 className="text-3xl font-bold mb-8 text-black font-poppins text-left">
            Shop by Icons
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
            Shop by Icons
          </h2>
        </div>
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-12 bg-[#ffffff] w-full">
      <div className="w-full max-w-[1400px] px-8 relative">
        {/* Title and navigation buttons in the same row */}
        <div className="flex justify-between items-center mb-2 ">
          <h2
            className="text-black "
            style={{
              fontSize: "25px",
              fontWeight: "500",
            }}
          >
            Shop by Icons
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
          className="flex overflow-x-auto scrollbar-hide  gap-4 w-full py-4"
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
              className="flex-shrink-0 "
              style={{
                scrollSnapAlign: "start",
                width: "420px",
              }}
            >
              <Link href={`/components/MainPage`}>
                <div className="rounded-lg hover:scale-105 transition-transform duration-300 ">
                  <div className="h-110 flex items-center justify-center">
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="h-full w-auto object-contain"
                    />
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

export default ShopNow;

"use client";

import { Product } from "@/types/MainPage";
import React, { useState } from "react";
import Spiner from "../../Spiner";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteProduct } from "@/services/productApi";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useProductsHook } from "@/hooks/productsHook";
import { useSearch } from "@/context/searchContex";
import { Box, Modal, Typography } from "@mui/material";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import Navbar from "@/shared/Navbar";
import Image from "next/image";

const MainPage = () => {
  const queryClient = useQueryClient();

  // Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);
  const [minRating, setMinRating] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [sortBy, setSortBy] = useState("");

  // Accordion states for filter sections
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    newArrival: true,
  });

  // Modal state
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const { data = { products: [] }, isLoading } = useProductsHook();
  const { searchQuery } = useSearch();

  // Check if image is from external source
  const isExternalImage = (url: string) => {
    return url.startsWith("http");
  };

  // Toggle accordion sections
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  // Filter logic
  const filteredProducts = data.products
    .filter((product: Product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product: Product) => {
      const price = parseFloat(product.product_data.prize.toString());
      const createdAt = new Date(product.product_data.createdAt);
      const now = new Date();
      const daysSinceCreated =
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const isNew = daysSinceCreated <= 30;

      const withinMin = minPrice ? price >= parseFloat(minPrice) : true;
      const withinMax = maxPrice ? price <= parseFloat(maxPrice) : true;
      const matchesNew = onlyNew ? isNew : true;
      const matchesRating = minRating
        ? product.product_data.rating >= parseInt(minRating)
        : true;

      return withinMin && withinMax && matchesNew && matchesRating;
    });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return (
          parseFloat(a.product_data.prize) - parseFloat(b.product_data.prize)
        );
      case "price-high-low":
        return (
          parseFloat(b.product_data.prize) - parseFloat(a.product_data.prize)
        );
      case "newest":
        return (
          new Date(b.product_data.createdAt).getTime() -
          new Date(a.product_data.createdAt).getTime()
        );
      case "rating":
        return b.product_data.rating - a.product_data.rating;
      default:
        return 0;
    }
  });

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 400,
    bgcolor: "white",
    borderRadius: "10px",
    boxShadow: 24,
    border: "1px solid #e5e5e5",
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleDeleteProduct = async (selectedProductId: any) => {
    if (selectedProductId) {
      try {
        await DeleteProduct({ id: selectedProductId });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      } catch (error) {
        console.error("delete product error", error);
      } finally {
        setSelectedProductId(null);
      }
    }
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setOnlyNew(false);
    setMinRating("");
    setSortBy("");
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spiner />
        </div>
      ) : (
        <div className="bg-white text-black min-h-screen flex flex-col lg:flex-row">
          {/* Mobile Filter Button */}
          <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <FilterAltOutlinedIcon className="text-black" />
              <span className="font-medium">Filters</span>
            </button>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black cursor-pointer text-sm"
              >
                <option value="">Sort By</option>
                <option value="newest">Newest</option>
                <option value="price-high-low">Price: High-Low</option>
                <option value="price-low-high">Price: Low-High</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Filter Sidebar */}
          <div
            className={`fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-64px)] w-72 bg-white z-40 lg:z-auto shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out transform ${
              showFilters
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            } ${hideSidebar ? "lg:hidden" : ""}`}
          >
            <div className="p-4 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
                >
                  <CloseIcon className="text-gray-600" />
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-4 border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("price")}
                  className="flex justify-between items-center w-full py-2 text-left"
                >
                  <span className="font-medium text-sm text-black">
                    Shop By Price
                  </span>
                  {expandedSections.price ? (
                    <KeyboardArrowUpIcon className="text-gray-600" />
                  ) : (
                    <KeyboardArrowDownIcon className="text-gray-600" />
                  )}
                </button>
                {expandedSections.price && (
                  <div className="mt-2 space-y-2">
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">
                        Min Price (₹)
                      </label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">
                        Max Price (₹)
                      </label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="50000"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Rating Filter */}
              <div className="mb-4 border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("rating")}
                  className="flex justify-between items-center w-full py-2 text-left"
                >
                  <span className="font-medium text-sm text-black">Rating</span>
                  {expandedSections.rating ? (
                    <KeyboardArrowUpIcon className="text-gray-600" />
                  ) : (
                    <KeyboardArrowDownIcon className="text-gray-600" />
                  )}
                </button>
                {expandedSections.rating && (
                  <div className="mt-2">
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(e.target.value)}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">All Ratings</option>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                          {r} Star{r > 1 && "s"} & Up
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* New Arrival Filter */}
              <div className="mb-4 border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection("newArrival")}
                  className="flex justify-between items-center w-full py-2 text-left"
                >
                  <span className="font-medium text-sm text-black">
                    New Arrivals
                  </span>
                  {expandedSections.newArrival ? (
                    <KeyboardArrowUpIcon className="text-gray-600" />
                  ) : (
                    <KeyboardArrowDownIcon className="text-gray-600" />
                  )}
                </button>
                {expandedSections.newArrival && (
                  <div className="mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onlyNew}
                        onChange={(e) => setOnlyNew(e.target.checked)}
                        className="w-4 h-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <span className="text-xs text-gray-700">
                        New Arrivals Only
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="w-full bg-black text-white py-2 text-sm rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Overlay */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 overflow-x-hidden">
            <div className="p-4">
              {/* Breadcrumb and Title - Desktop */}
              <div className="hidden lg:block mb-6">
                <nav className="text-sm text-gray-600 mb-2">
                  <span>Shoes</span> / <span>Nike Dunk</span>
                </nav>
                <div className="flex justify-between items-center">
                  <h1 className="text-xl md:text-2xl font-bold text-black">
                    Men&apos;s Nike Dunk Shoes ({sortedProducts.length})
                  </h1>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHideSidebar(!hideSidebar)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <TuneOutlinedIcon className="text-gray-600" />
                      <span className="font-medium">
                        {hideSidebar ? "Show" : "Hide"} Filters
                      </span>
                    </button>
                    <div className="flex items-center gap-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                      >
                        <option value="">Sort By</option>
                        <option value="newest">Newest</option>
                        <option value="price-high-low">Price: High-Low</option>
                        <option value="price-low-high">Price: Low-High</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-gray-100 px-3 py-1.5 rounded-full">
                  <span className="text-xs font-medium">Lifestyle</span>
                </div>
                <div className="bg-gray-100 px-3 py-1.5 rounded-full">
                  <span className="text-xs font-medium">Skateboarding</span>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {sortedProducts.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <h2 className="text-lg font-semibold text-gray-600">
                      No Products Found
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                      Try adjusting your filters or search criteria
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  sortedProducts.map((product: Product) => (
                    <div
                      key={product._id}
                      className="group relative hover:shadow-md transition-shadow rounded-lg"
                    >
                      <div className="relative">
                        {/* Product Image */}
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <Link href={`/products/${product._id}`}>
                            {isExternalImage(product.product_image) ? (
                              <img
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            ) : (
                              <Image
                                src={product.product_image}
                                alt={product.product_name}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </Link>
                        </div>

                        {/* Action Buttons - Top Right */}
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Link
                            href={`/components/RegistrationForm/${product._id}`}
                            className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            title="Edit"
                          >
                            <EditIcon className="text-gray-700 text-sm" />
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedProductId(product._id);
                            }}
                            className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            title="Delete"
                          >
                            <DeleteIcon className="text-gray-700 text-sm" />
                          </button>
                        </div>

                        {/* Product Info */}
                        <div className="p-2">
                          <Link href={`/products/${product._id}`}>
                            <h3 className="font-medium text-black text-xs sm:text-sm line-clamp-1">
                              {product.product_name}
                            </h3>
                            <p className="text-gray-600 text-xs mt-1">
                              Men&apos;s Shoes • 1 Colour
                            </p>
                            <div className="mt-1 flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`${
                                      i < product.product_data.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    } text-xs`}
                                  />
                                ))}
                              </div>
                              <span className="text-black font-semibold text-xs sm:text-sm ml-auto">
                                ₹{product.product_data.prize}
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!selectedProductId}
        onClose={() => setSelectedProductId(null)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="delete-modal-title"
            variant="h6"
            component="h2"
            className="text-black"
          >
            Confirm Delete
          </Typography>
          <Typography
            id="delete-modal-description"
            sx={{ mt: 2 }}
            className="text-gray-700 text-sm"
          >
            Are you sure you want to delete this product? This action cannot be
            undone.
          </Typography>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedProductId(null)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              onClick={() => handleDeleteProduct(selectedProductId)}
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MainPage;

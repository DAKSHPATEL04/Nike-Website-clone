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
import { prodectsHook } from "@/hooks/productsHook";
import { useSearch } from "@/context/searchContex";
import { Box, Modal, Typography } from "@mui/material";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const MainPage = () => {
  const queryClient = useQueryClient();

  // Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);
  const [minRating, setMinRating] = useState("");
  const [showFilters, setShowFilters] = useState(false);
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

  const { data = { products: [] }, isLoading } = prodectsHook();
  const { searchQuery } = useSearch();

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
    width: 400,
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
      {isLoading ? (
        <Spiner />
      ) : (
        <div>
          <div className="flex bg-white min-h-screen relative">
            {/* Filter Sidebar */}
            <div
              className={`fixed left-0 top-0 h-full text-black bg-white z-50 shadow-lg transform transition-transform duration-300 ${
                showFilters ? "translate-x-0" : "-translate-x-full"
              } w-80 overflow-y-auto`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-black">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <CloseIcon className="text-gray-600" />
                  </button>
                </div>

                {/* Price Filter */}
                <div className="mb-6 border-b border-gray-200 pb-4">
                  <button
                    onClick={() => toggleSection("price")}
                    className="flex justify-between items-center w-full py-2 text-left"
                  >
                    <span className="font-medium text-black">
                      Shop By Price
                    </span>
                    {expandedSections.price ? (
                      <KeyboardArrowUpIcon className="text-gray-600" />
                    ) : (
                      <KeyboardArrowDownIcon className="text-gray-600" />
                    )}
                  </button>
                  {expandedSections.price && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                          Min Price (₹)
                        </label>
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                          Max Price (₹)
                        </label>
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="50000"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Rating Filter */}
                <div className="mb-6 border-b border-gray-200 pb-4">
                  <button
                    onClick={() => toggleSection("rating")}
                    className="flex justify-between items-center w-full py-2 text-left"
                  >
                    <span className="font-medium text-black">Rating</span>
                    {expandedSections.rating ? (
                      <KeyboardArrowUpIcon className="text-gray-600" />
                    ) : (
                      <KeyboardArrowDownIcon className="text-gray-600" />
                    )}
                  </button>
                  {expandedSections.rating && (
                    <div className="mt-4">
                      <select
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                <div className="mb-6 border-b border-gray-200 pb-4">
                  <button
                    onClick={() => toggleSection("newArrival")}
                    className="flex justify-between items-center w-full py-2 text-left"
                  >
                    <span className="font-medium text-black">New Arrivals</span>
                    {expandedSections.newArrival ? (
                      <KeyboardArrowUpIcon className="text-gray-600" />
                    ) : (
                      <KeyboardArrowDownIcon className="text-gray-600" />
                    )}
                  </button>
                  {expandedSections.newArrival && (
                    <div className="mt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={onlyNew}
                          onChange={(e) => setOnlyNew(e.target.checked)}
                          className="w-4 h-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">
                          New Arrivals Only
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Reset Filters Button */}
                <button
                  onClick={resetFilters}
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Overlay */}
            {showFilters && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setShowFilters(false)}
              />
            )}

            {/* Main Content */}
            <div
              className={`flex-1 transition-all duration-300 ${
                showFilters ? "ml-80 pl-6" : "ml-0"
              } relative z-40  bg-white `}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col py-3 justify-center items-center z-40 text-black  bg-[#f5f5f5]  ">
                  <div className="flex flex-col justify-center items-center">
                    <h1
                      className=""
                      style={{
                        fontFamily: "poppins",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      New Styles On Sale: Up To 40% Off
                    </h1>
                    <p
                      className="underline"
                      style={{
                        fontFamily: "poppins",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      <span>Shop All Our New Markdowns</span>
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <nav className="text-sm text-gray-600 mb-2">
                    <span>Shoes</span> / <span>Nike Dunk</span>
                  </nav>
                  <h1 className="text-2xl font-bold text-black mb-4">
                    Men's Nike Dunk Shoes ({sortedProducts.length})
                  </h1>

                  {/* Controls */}
                  <div className="flex justify-end items-center gap-3 text-black ">
                    <button
                      onClick={() => setShowFilters(true)}
                      className="flex  items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium">Show Filters</span>
                      <TuneOutlinedIcon className="text-gray-600" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Sort By</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                      >
                        <option value="">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="price-high-low">Price: High-Low</option>
                        <option value="price-low-high">Price: Low-High</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <h2 className="text-xl font-semibold text-gray-600">
                        No Products Found
                      </h2>
                      <p className="text-gray-500 mt-2">
                        Try adjusting your filters or search criteria
                      </p>
                    </div>
                  ) : (
                    sortedProducts.map((product: Product) => (
                      <div key={product._id} className="group cursor-pointer">
                        <Link href={`/products/${product._id}`}>
                          <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            {/* Product Image */}
                            <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                              <img
                                src={product.product_image}
                                alt={product.product_name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                              <h3 className="font-medium text-black mb-1 text-sm">
                                {product.product_name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                {product.product_data.descrption}
                              </p>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-black font-semibold">
                                  MRP : ₹{product.product_data.prize}
                                </span>
                                {product.product_data.is_new && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from(
                                  { length: product.product_data.rating },
                                  (_, i) => (
                                    <StarIcon
                                      key={i}
                                      className="text-yellow-400 text-sm"
                                    />
                                  )
                                )}
                                <span className="text-gray-500 text-xs ml-1">
                                  ({product.product_data.rating})
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>

                        {/* Action Buttons */}
                        <div className="flex justify-center items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Link
                            href={`/components/RegistrationForm/${product._id}`}
                          >
                            <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                              <EditIcon className="text-sm" />
                            </button>
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedProductId(product._id);
                            }}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <DeleteIcon className="text-sm" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
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
            className="text-gray-700"
          >
            Are you sure you want to delete this product? This action cannot be
            undone.
          </Typography>
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedProductId(null)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
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

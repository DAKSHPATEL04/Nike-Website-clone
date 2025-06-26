"use client";

import { Product } from "@/types/MainPage";
import React, { useState } from "react";
import Spiner from "../Spiner";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteProduct } from "@/services/productApi";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useProductsHook } from "@/hooks/productsHook";
import { useSearch } from "@/context/searchContex";
import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";

const MainPage = () => {
  const queryClient = useQueryClient();

  // Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);
  const [minRating, setMinRating] = useState("");

  // Modal state
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const { data = { products: [] }, isLoading } = useProductsHook();
  const { searchQuery } = useSearch();

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
      // const matchesNew = onlyNew ? isNew : true;
      const matchesRating = minRating
        ? product.product_data.rating >= parseInt(minRating)
        : true;

      return withinMin && withinMax && matchesRating;
    });

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    borderRadius: "10px",
    boxShadow: 24,
    colors: "white",
    border: "2px solid white",
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleDeleteProduct = async (selectedProductId: any) => {
    {
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
    }
  };

  return (
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <div className="flex justify-between px-4 mt-3  ">
          {/* LEFT: Product Cards */}
          <div
            className="w-full lg:w-[72%] p-6"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "thin",
              scrollbarColor: "black white",
              height: "79vh",
              border: "2px solid white",
              borderRadius: "10px 0 0 0",
              boxShadow:
                "0 -4px 8px 0 rgba(0, 0, 0, 0.2), 0 -6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.length === 0 ? (
                <h1 className="text-2xl font-semibold text-black">
                  No Products Found
                </h1>
              ) : (
                filteredProducts.map((product: Product) => (
                  <div
                    key={product._id}
                    className="w-full border bg-white shadow-lg p-6 rounded-xl hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex justify-end mb-4">
                      {product.product_data.is_new && (
                        <p className=" bg-black text-white   border-black border p-[5px] text-[10px] rounded-full font-medium ">
                          New
                        </p>
                      )}
                    </div>
                    <h1 className="text-xl font-semibold mb-4 text-center text-black">
                      {product.product_name}
                    </h1>

                    <div className="flex justify-center mb-4">
                      <Image
                        src={product.product_image}
                        alt={product.product_name}
                        className="w-[250px] h-[250px] object-cover rounded-md"
                        width={250}
                        height={250}
                      />
                    </div>
                    <div className="text-sm space-y-2 text-gray-800">
                      <p>
                        <strong>Price:</strong> ${product.product_data.prize}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {product.product_data.descrption}
                      </p>
                      <p className="flex items-center gap-1">
                        <strong>Rating:</strong>{" "}
                        {Array.from(
                          { length: product.product_data.rating },
                          (_, i) => (
                            <StarIcon key={i} className="text-yellow-500 " />
                          )
                        )}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-4 mt-4">
                      <Link
                        href={`/components/RegistrationForm/${product._id}`}
                      >
                        <EditIcon className="text-green-500 border-2 rounded hover:text-green-600" />
                      </Link>
                      <button onClick={() => setSelectedProductId(product._id)}>
                        <DeleteIcon className="text-red-500 border-2 rounded hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: Filter Sidebar */}
          <aside className="w-full ml-21 lg:w-[25%]  shadow-lg rounded-xl p-6 h-fit sticky top-20 border-2">
            <h2 className="text-xl font-bold mb-4 text-white">Filters</h2>

            <div className="mb-4">
              <label className="text-sm font-medium text-white">
                Min Price
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="0"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-white">
                Max Price
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="1000"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-white">
                Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
              >
                <option className="text-black" value="">
                  Any
                </option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option className="text-black" key={r} value={r}>
                    {r} Star{r > 1 && "s"} & Up
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlyNew}
                onChange={(e) => setOnlyNew(e.target.checked)}
                className="w-5 h-5"
              />
              <label className="text-sm font-medium text-white">
                New Arrival
              </label>
            </div> */}

            <button
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setOnlyNew(false);
                setMinRating("");
              }}
              className="mt-2 text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md"
            >
              Reset Filters
            </button>
          </aside>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      <Modal
        open={!!selectedProductId}
        onClose={() => setSelectedProductId(null)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={style}>
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography id="delete-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this product?
          </Typography>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => handleDeleteProduct(selectedProductId)}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              onClick={() => setSelectedProductId(null)}
            >
              No
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MainPage;

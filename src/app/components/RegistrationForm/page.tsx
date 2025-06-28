"use client";

import Spiner from "@/app/Spiner";
import { useProductsHook } from "@/hooks/productsHook";
import Navbar from "@/shared/Navbar";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const RegistrationForm = () => {
  const { id } = useParams();
  const editId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productRating, setProductRating] = useState("");
  const [productImage, setProductImage] = useState("");
  const [newProduct, setNewProduct] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const { data = { products: [] }, isLoading: isFetching } = useProductsHook();
  const products = data.products;

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductRating("");
    setProductImage("");
    setNewProduct(true);
  };

  useEffect(() => {
    if (!editId) {
      setIsLoading(false);
      return;
    }

    const product = products.find((product: any) => product._id === editId);
    if (product) {
      setProductName(product.product_name);
      setProductImage(product.product_image);
      setProductPrice(product.product_data.prize);
      setProductDescription(product.product_data.descrption);
      setProductRating(product.product_data.rating);
      setNewProduct(product.product_data.is_new ?? true);
    }
    setIsLoading(false);
  }, [editId, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !productName ||
      !productPrice ||
      !productDescription ||
      !productRating ||
      !productImage
    ) {
      alert("Please fill all required fields");
      return;
    }

    const product = {
      product_name: productName,
      product_id: editId,
      product_image: productImage,
      product_data: {
        prize: productPrice,
        descrption: productDescription,
        rating: productRating,
        is_new: newProduct.toString(),
      },
    };

    try {
      setIsLoading(true);
      const res = await fetch(
        editId
          ? "https://react-trainee-api.onrender.com/update/product"
          : "https://react-trainee-api.onrender.com/create/product",
        {
          method: editId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit product");
      }

      alert(
        editId ? "Product updated successfully" : "Product added successfully"
      );
      if (!editId) resetForm();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/");
    } catch (error) {
      console.error("Submit error", error);
      alert("Failed to submit product");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spiner />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-white text-black min-h-screen pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 pt-8">
            {/* Form Section */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
                <h1 className="text-2xl font-bold text-black mb-6">
                  {editId ? "Edit Product" : "Add New Product"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name*
                      </label>
                      <input
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        placeholder="Nike Air Max"
                        required
                      />
                    </div>

                    {/* Product Price */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹)*
                      </label>
                      <input
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        placeholder="7999"
                        required
                      />
                    </div>

                    {/* Product Description */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description*
                      </label>
                      <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        placeholder="Product features and details"
                        required
                      />
                    </div>

                    {/* Product Image */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL*
                      </label>
                      <input
                        value={productImage}
                        onChange={(e) => setProductImage(e.target.value)}
                        type="url"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>

                    {/* Product Rating */}
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating (1-5)*
                      </label>
                      <input
                        value={productRating}
                        onChange={(e) => setProductRating(e.target.value)}
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                        placeholder="4.5"
                        required
                      />
                    </div>

                    {/* New Product */}
                    <div className="col-span-2 sm:col-span-1 flex items-end">
                      <div className="flex items-center h-10">
                        <input
                          id="new-product"
                          type="checkbox"
                          checked={newProduct}
                          onChange={(e) => setNewProduct(e.target.checked)}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label
                          htmlFor="new-product"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Mark as New Arrival
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400"
                    >
                      {isLoading
                        ? "Processing..."
                        : editId
                        ? "Update Product"
                        : "Add Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Preview Section */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm sticky top-8">
                <h2 className="text-xl font-bold text-black mb-6">
                  Product Preview
                </h2>

                {productImage ? (
                  <div className="space-y-6">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={productImage}
                        alt="Product preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/img/placeholder-product.jpg";
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {productName || "Product Name"}
                      </h3>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`${
                                i < Math.floor(Number(productRating) || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              } h-4 w-4`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {productRating || "0"} stars
                        </span>
                      </div>
                      <p className="text-lg font-bold text-black">
                        ₹{productPrice || "0"}
                      </p>
                      {newProduct && (
                        <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                          New Arrival
                        </span>
                      )}
                      <p className="text-sm text-gray-600">
                        {productDescription ||
                          "Product description will appear here"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      Image preview will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default RegistrationForm;

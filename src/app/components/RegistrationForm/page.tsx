"use client";

import Spiner from "@/app/Spiner";
import { useProductsHook } from "@/hooks/productsHook";
import Navbar from "@/shared/Navbar";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Variation {
  // _id: string;
  color_name: string;
  color_code: string;
  variation_images: string[];
  main_image: string;
  stock_quantity: number;
  size_availability: {
    size: string;
    stock: number;
    price_adjustment: number;
  }[];
}

const RegistrationForm = () => {
  const { id } = useParams();
  const editId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const queryClient = useQueryClient();

  // Main product fields
  const [productName, setProductName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(true);

  // Variations
  const [variations, setVariations] = useState<Variation[]>([]);
  const [currentVariation, setCurrentVariation] = useState<Variation>({
    // _id: "",
    color_name: "",
    color_code: "#000000",
    variation_images: [""],
    main_image: "",
    stock_quantity: 0,
    size_availability: [],
  });
  const [currentSize, setCurrentSize] = useState({
    size: "",
    stock: 0,
    price_adjustment: 0,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "variations">("details");

  const { data = { products: [] }, isLoading: isFetching } = useProductsHook();
  const products = data.products;

  // Helper functions
  const isVideoUrl = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  const resetForm = () => {
    setProductName("");
    setBasePrice("");
    setDescription("");
    setRating("");
    setMainImage("");
    setCategory("");
    setBrand("");
    setModelNumber("");
    setAvailableSizes([]);
    setTags([]);
    setIsFeatured(false);
    setIsNew(true);
    setVariations([]);
  };

  // Load product data for editing
  useEffect(() => {
    if (!editId) {
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://next-cart-api.vercel.app/get/product/${editId}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const product = await response.json();

        setProductName(product.product_name);
        setMainImage(product.product_image);
        setBasePrice(product.base_price.toString());
        setDescription(product.product_data.description);
        setRating(product.product_data.rating.toString());
        setIsNew(product.product_data.is_new);
        setCategory(product.product_data.category);
        setBrand(product.product_data.brand);
        setModelNumber(product.product_data.model_number);
        setAvailableSizes(product.available_sizes || []);
        setTags(product.tags || []);
        setIsFeatured(product.is_featured);

        // Fetch variations if they exist
        if (product.product_sub_images && product.product_sub_images.length > 0) {
          const variationsRes = await fetch(
            `https://next-cart-api.vercel.app/get/variations/${editId}`
          );
          if (variationsRes.ok) {
            const variationsData = await variationsRes.json();
            setVariations(variationsData.variations);
          }
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [editId]);

  // Variation handlers
  const handleVariationChange = (field: keyof Variation, value: any) => {
    setCurrentVariation(prev => ({ ...prev, [field]: value }));
  };

  const handleVariationImageChange = (index: number, value: string) => {
    const updatedImages = [...currentVariation.variation_images];
    updatedImages[index] = value;
    setCurrentVariation(prev => ({ ...prev, variation_images: updatedImages }));
  };

  const addVariationImage = () => {
    if (currentVariation.variation_images.length < 9) {
      setCurrentVariation(prev => ({
        ...prev,
        variation_images: [...prev.variation_images, ""]
      }));
    }
  };

  const removeVariationImage = (index: number) => {
    setCurrentVariation(prev => ({
      ...prev,
      variation_images: prev.variation_images.filter((_, i) => i !== index)
    }));
  };

  const addSizeToVariation = () => {
    if (currentSize.size && availableSizes.includes(currentSize.size)) {
      setCurrentVariation(prev => ({
        ...prev,
        size_availability: [...prev.size_availability, currentSize]
      }));
      setCurrentSize({ size: "", stock: 0, price_adjustment: 0 });
    }
  };

  const removeSizeFromVariation = (index: number) => {
    setCurrentVariation(prev => ({
      ...prev,
      size_availability: prev.size_availability.filter((_, i) => i !== index)
    }));
  };

  const addVariation = () => {
    if (
      currentVariation.color_name &&
      currentVariation.color_code &&
      currentVariation.main_image
    ) {
      setVariations(prev => [...prev, currentVariation]);
      setCurrentVariation({
        // _id: "",
        color_name: "",
        color_code: "#000000",
        variation_images: [""],
        main_image: "",
        stock_quantity: 0,
        size_availability: [],
      });
    }
  };

  const removeVariation = (index: number) => {
    setVariations(prev => prev.filter((_, i) => i !== index));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !productName ||
      !basePrice ||
      !description ||
      !rating ||
      !mainImage ||
      !category ||
      !brand
    ) {
      alert("Please fill all required fields");
      return;
    }

    const productData = {
      product_name: productName,
      product_image: mainImage,
      product_sub_images: variations.map(v => v.variation_images),
      product_data: {
        price: parseFloat(basePrice),
        description,
        rating: parseFloat(rating),
        is_new: isNew,
        brand,
        category,
        model_number: modelNumber,
      },
      // _id: editId,
      base_price: parseFloat(basePrice),
      available_sizes: availableSizes,
      tags,
      is_featured: isFeatured,
      variations: editId ? undefined : variations, // Only send new variations for creation
    };

    try {
      setSubmitLoading(true);
      const apiUrl = editId
        ? "https://next-cart-api.vercel.app/update/product"
        : "https://next-cart-api.vercel.app/create/product";

      const method = editId ? "PUT" : "POST";

      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit product");
      }

      const result = await response.json();
      console.log("Success:", result);

      // If creating new product with variations, link them
      if (!editId && variations.length > 0) {
        await Promise.all(
          variations.map(variation =>
            fetch("https://next-cart-api.vercel.app/add/variation", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...variation,
                product_id: result._id,
              }),
            })
          )
        );
      }

      alert(editId ? "Product updated successfully" : "Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/");
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "An error occurred");
    } finally {
      setSubmitLoading(false);
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

                <div className="flex border-b mb-6">
                  <button
                    type="button"
                    className={`py-2 px-4 font-medium ${activeTab === "details" ? "text-black border-b-2 border-black" : "text-gray-500"}`}
                    onClick={() => setActiveTab("details")}
                  >
                    Product Details
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-4 font-medium ${activeTab === "variations" ? "text-black border-b-2 border-black" : "text-gray-500"}`}
                    onClick={() => setActiveTab("variations")}
                  >
                    Variations
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === "details" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="col-span-2">
                        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Product Name*
                            </label>
                            <input
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Base Price (₹)*
                              </label>
                              <input
                                value={basePrice}
                                onChange={(e) => setBasePrice(e.target.value)}
                                type="number"
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rating (1-5)*
                              </label>
                              <input
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                type="number"
                                min="1"
                                max="5"
                                step="0.1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description*
                            </label>
                            <textarea
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="col-span-2">
                        <h3 className="text-lg font-medium mb-4">Product Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Brand*
                            </label>
                            <input
                              value={brand}
                              onChange={(e) => setBrand(e.target.value)}
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category*
                            </label>
                            <input
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Model Number
                            </label>
                            <input
                              value={modelNumber}
                              onChange={(e) => setModelNumber(e.target.value)}
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Available Sizes (comma separated)
                            </label>
                            <input
                              value={availableSizes.join(",")}
                              onChange={(e) => setAvailableSizes(e.target.value.split(",").map(s => s.trim()))}
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                              placeholder="S,M,L,XL"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Media */}
                      <div className="col-span-2">
                        <h3 className="text-lg font-medium mb-4">Media</h3>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Main Image URL*
                          </label>
                          <input
                            value={mainImage}
                            onChange={(e) => setMainImage(e.target.value)}
                            type="url"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            required
                          />
                        </div>
                      </div>

                      {/* Tags & Options */}
                      <div className="col-span-2">
                        <h3 className="text-lg font-medium mb-4">Options</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Tags (comma separated)
                            </label>
                            <input
                              value={tags.join(",")}
                              onChange={(e) => setTags(e.target.value.split(",").map(t => t.trim()))}
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                              placeholder="men,shoes,sports"
                            />
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <input
                                id="new-product"
                                type="checkbox"
                                checked={isNew}
                                onChange={(e) => setIsNew(e.target.checked)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label
                                htmlFor="new-product"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                New Arrival
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="featured-product"
                                type="checkbox"
                                checked={isFeatured}
                                onChange={(e) => setIsFeatured(e.target.checked)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label
                                htmlFor="featured-product"
                                className="ml-2 block text-sm text-gray-700"
                              >
                                Featured
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Product Variations</h3>

                      {/* Current Variations */}
                      {variations.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-medium">Existing Variations</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {variations.map((variation, index) => (
                              <div key={index} className="border p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{variation.color_name}</p>
                                    <div className="flex items-center mt-1">
                                      <div
                                        className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                                        style={{ backgroundColor: variation.color_code }}
                                      />
                                      <span className="text-sm text-gray-600">
                                        {variation.color_code}
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeVariation(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    Remove
                                  </button>
                                </div>
                                {variation.size_availability.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-sm font-medium">Sizes:</p>
                                    <ul className="text-sm text-gray-600">
                                      {variation.size_availability.map((size, i) => (
                                        <li key={i}>
                                          {size.size} (Stock: {size.stock}, +₹{size.price_adjustment})
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add New Variation */}
                      <div className="space-y-4 border-t pt-4">
                        <h4 className="font-medium">Add New Variation</h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Color Name*
                            </label>
                            <input
                              value={currentVariation.color_name}
                              onChange={(e) => handleVariationChange("color_name", e.target.value)}
                              type="text"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Color Code*
                            </label>
                            <div className="flex items-center">
                              <input
                                value={currentVariation.color_code}
                                onChange={(e) => handleVariationChange("color_code", e.target.value)}
                                type="color"
                                className="h-10 w-10 rounded cursor-pointer mr-2"
                              />
                              <input
                                value={currentVariation.color_code}
                                onChange={(e) => handleVariationChange("color_code", e.target.value)}
                                type="text"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Main Variation Image URL*
                          </label>
                          <input
                            value={currentVariation.main_image}
                            onChange={(e) => handleVariationChange("main_image", e.target.value)}
                            type="url"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Images (max 9)
                          </label>
                          <div className="space-y-2">
                            {currentVariation.variation_images.map((img, index) => (
                              <div key={index} className="flex gap-2">
                                <div className="flex-1">
                                  <input
                                    value={img}
                                    onChange={(e) => handleVariationImageChange(index, e.target.value)}
                                    type="url"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                                  />
                                </div>
                                {currentVariation.variation_images.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeVariationImage(index)}
                                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            ))}
                            {currentVariation.variation_images.length < 9 && (
                              <button
                                type="button"
                                onClick={addVariationImage}
                                className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                              >
                                + Add Image
                              </button>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Size Availability
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            <select
                              value={currentSize.size}
                              onChange={(e) => setCurrentSize(prev => ({ ...prev, size: e.target.value }))}
                              className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            >
                              <option value="">Select Size</option>
                              {availableSizes.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              min="0"
                              value={currentSize.stock}
                              onChange={(e) => setCurrentSize(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                              placeholder="Stock"
                              className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            />
                            <input
                              type="number"
                              min="0"
                              value={currentSize.price_adjustment}
                              onChange={(e) => setCurrentSize(prev => ({ ...prev, price_adjustment: parseFloat(e.target.value) || 0 }))}
                              placeholder="Price Adj."
                              className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={addSizeToVariation}
                            disabled={!currentSize.size}
                            className="mt-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
                          >
                            Add Size
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={addVariation}
                          disabled={
                            !currentVariation.color_name ||
                            !currentVariation.color_code ||
                            !currentVariation.main_image
                          }
                          className="w-full bg-gray-100 hover:bg-gray-200 text-black py-2 px-4 rounded-md disabled:opacity-50"
                        >
                          Add Variation
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Navigation and Submit */}
                  <div className="flex justify-between pt-4">
                    {activeTab === "variations" ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab("details")}
                        className="bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300"
                      >
                        ← Back to Details
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveTab("variations")}
                        className="bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300"
                      >
                        Manage Variations →
                      </button>
                    )}

                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 font-medium disabled:bg-gray-400"
                    >
                      {submitLoading
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

                {mainImage ? (
                  <div className="space-y-6">
                    {/* Main Image Preview */}
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {isVideoUrl(mainImage) ? (
                        <video
                          src={mainImage}
                          className="w-full h-full object-contain"
                          controls
                        />
                      ) : (
                        <img
                          src={mainImage}
                          alt="Product preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/img/placeholder-product.jpg";
                          }}
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {productName || "Product Name"}
                      </h3>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`${i < Math.floor(Number(rating) || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                                } h-4 w-4`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {rating || "0"} stars
                        </span>
                      </div>
                      <p className="text-lg font-bold text-black">
                        ₹{basePrice || "0"}
                        {variations.length > 0 && " (Base Price)"}
                      </p>
                      <div className="flex gap-2">
                        {isNew && (
                          <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                            New Arrival
                          </span>
                        )}
                        {isFeatured && (
                          <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {description || "Product description will appear here"}
                      </p>
                    </div>

                    {/* Variations Preview */}
                    {variations.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium">Available Variations</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {variations.map((variation, index) => (
                            <div key={index} className="border p-3 rounded-lg">
                              <div className="flex items-center mb-2">
                                <div
                                  className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                                  style={{ backgroundColor: variation.color_code }}
                                />
                                <span className="font-medium">{variation.color_name}</span>
                              </div>
                              <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                                {variation.main_image && (
                                  isVideoUrl(variation.main_image) ? (
                                    <video
                                      src={variation.main_image}
                                      className="w-full h-full object-cover"
                                      controls
                                    />
                                  ) : (
                                    <img
                                      src={variation.main_image}
                                      alt={`${variation.color_name} variation`}
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/img/placeholder-product.jpg";
                                      }}
                                    />
                                  )
                                )}
                              </div>
                              {variation.size_availability.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium">Sizes:</p>
                                  <ul className="text-sm text-gray-600">
                                    {variation.size_availability.map((size, i) => (
                                      <li key={i}>
                                        {size.size}: ₹{parseFloat(basePrice || "0") + size.price_adjustment}
                                        (Stock: {size.stock})
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
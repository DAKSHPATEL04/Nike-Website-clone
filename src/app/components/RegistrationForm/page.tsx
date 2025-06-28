"use client";

import Spinner from "../../Spiner";
import { useProductsHook } from "@/hooks/productsHook";
import Navbar from "@/shared/Navbar";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  _id: string;
  product_name: string;
  product_image: string;
  product_data: {
    prize: string;
    descrption: string;
    rating: string;
    is_new: boolean;
  };
}

interface ProductFormData {
  product_name: string;
  product_image: string;
  product_data: {
    prize: string;
    descrption: string;
    rating: string;
    is_new: boolean;
  };
}

const RegistrationForm = () => {
  const { id } = useParams();
  const editId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<ProductFormData>({
    product_name: "",
    product_image: "",
    product_data: {
      prize: "",
      descrption: "",
      rating: "",
      is_new: true,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data = { products: [] }, isLoading: isFetching } = useProductsHook();
  const products: Product[] = data.products;

  const resetForm = () => {
    setFormData({
      product_name: "",
      product_image: "",
      product_data: {
        prize: "",
        descrption: "",
        rating: "",
        is_new: true,
      },
    });
  };

  useEffect(() => {
    if (!editId) {
      setIsLoading(false);
      return;
    }

    const product = products.find((product) => product._id === editId);
    if (product) {
      setFormData({
        product_name: product.product_name,
        product_image: product.product_image,
        product_data: {
          prize: product.product_data.prize,
          descrption: product.product_data.descrption,
          rating: product.product_data.rating,
          is_new: product.product_data.is_new ?? true,
        },
      });
    }
    setIsLoading(false);
  }, [editId, products]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name in formData.product_data) {
      setFormData((prev) => ({
        ...prev,
        product_data: {
          ...prev.product_data,
          [name]: name === "is_new" ? !prev.product_data.is_new : value,
        },
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      product_data: {
        ...prev.product_data,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.product_name ||
      !formData.product_data.prize ||
      !formData.product_data.descrption ||
      !formData.product_data.rating ||
      !formData.product_image
    ) {
      alert("Please fill all required fields");
      return;
    }

    const productPayload = {
      product_name: formData.product_name,
      product_id: editId,
      product_image: formData.product_image,
      product_data: {
        prize: formData.product_data.prize,
        descrption: formData.product_data.descrption,
        rating: formData.product_data.rating,
        is_new: formData.product_data.is_new.toString(),
      },
    };

    try {
      setIsSubmitting(true);
      const endpoint = editId
        ? "https://react-trainee-api.onrender.com/update/product"
        : "https://react-trainee-api.onrender.com/create/product";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productPayload),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${editId ? "update" : "create"} product: ${
            response.statusText
          }`
        );
      }

      alert(`Product ${editId ? "updated" : "created"} successfully!`);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (!editId) resetForm();
      router.push("/");
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        `Failed to ${editId ? "update" : "create"} product. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
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
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleInputChange}
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
                        name="prize"
                        value={formData.product_data.prize}
                        onChange={handleInputChange}
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
                        name="descrption"
                        value={formData.product_data.descrption}
                        onChange={handleInputChange}
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
                        name="product_image"
                        value={formData.product_image}
                        onChange={handleInputChange}
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
                        name="rating"
                        value={formData.product_data.rating}
                        onChange={handleInputChange}
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
                          id="is_new"
                          name="is_new"
                          type="checkbox"
                          checked={formData.product_data.is_new}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label
                          htmlFor="is_new"
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
                      disabled={isSubmitting}
                      className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400"
                    >
                      {isSubmitting
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

                {formData.product_image ? (
                  <div className="space-y-6">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                      <Image
                        src={formData.product_image}
                        alt="Product preview"
                        fill
                        className="object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/img/placeholder-product.jpg";
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {formData.product_name || "Product Name"}
                      </h3>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`${
                                i <
                                Math.floor(
                                  Number(formData.product_data.rating) || 0
                                )
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              } h-4 w-4`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {formData.product_data.rating || "0"} stars
                        </span>
                      </div>
                      <p className="text-lg font-bold text-black">
                        ₹{formData.product_data.prize || "0"}
                      </p>
                      {formData.product_data.is_new && (
                        <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                          New Arrival
                        </span>
                      )}
                      <p className="text-sm text-gray-600">
                        {formData.product_data.descrption ||
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

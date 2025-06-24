"use client";

import Spiner from "@/app/Spiner";
import { prodectsHook } from "@/hooks/productsHook";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const { data = { products: [] }, isLoading: isFetching } = prodectsHook();
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
      const result = await res.json();
      console.log(result);

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
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  return isFetching || isLoading ? (
    <Spiner />
  ) : (
    <div className="flex-1/2 flex justify-center items-center gap-25">
      <div className="max-w-8xl max-sm:max-w-lg mx-5 p-6 mt-5 my-4 border-2 rounded">
        <h1 className="text-white text-2xl font-bold mb-6">
          {editId ? "EDIT PRODUCT" : "ADD PRODUCT"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Inputs */}
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Product Name:
              </label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                className="bg-transparent w-full text-white text-sm px-4 py-3 rounded-md border-2"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Product Price:
              </label>
              <input
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                type="text"
                className="bg-transparent w-full text-white text-sm px-4 py-3 rounded-md border-2"
                placeholder="Enter product price"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Product Description:
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                rows={4}
                className="bg-transparent w-full text-white text-sm px-4 py-3 rounded-md border-2"
                placeholder="Enter description"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Product Image:
              </label>
              <input
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                type="text"
                className="bg-transparent w-full text-white text-sm px-4 py-3 rounded-md border-2"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Product Rating:
              </label>
              <input
                value={productRating}
                onChange={(e) => setProductRating(e.target.value)}
                type="number"
                className="bg-transparent w-full text-white text-sm px-4 py-3 rounded-md border-2"
                placeholder="Enter rating"
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Product Status (New):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newProduct}
                  onChange={(e) => setNewProduct(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-white">{newProduct ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="mx-auto block min-w-32 py-3 px-6 text-sm font-medium tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {editId ? "UPDATE" : "ADD"}
            </button>
          </div>
        </form>
      </div>

      {productImage && (
        <div>
          <img
            src={productImage}
            alt="Preview"
            className="w-100 h-100 mt-4 rounded-md object-cover border"
          />
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;

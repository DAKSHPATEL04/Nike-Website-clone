import axios from "axios";
import { API_END_POINT } from "../utils/constants";

export const AllProducts = async () => {
  try {
    const res = await fetch(
      "https://next-cart-api.vercel.app/get/products",
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("get all product data error", error);
  }
};

export const DeleteProduct = async ({ id }: { id: string }) => {
  try {
    const res = await fetch(
      `https://next-cart-api.vercel.app/delete/product/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log("res", res);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("delete product error", error);
  }
};

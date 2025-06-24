import axios from "axios";
import { API_END_POINT } from "../utils/constants";

export const AllProducts = async () => {
  try {
    const res = await fetch(
      "https://react-trainee-api.onrender.com/get/products",
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
      `https://react-trainee-api.onrender.com/delete/product/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("delete product error", error);
  }
};

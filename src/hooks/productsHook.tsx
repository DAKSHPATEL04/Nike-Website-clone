import { AllProducts } from "@/services/productApi";
import { useQuery } from "@tanstack/react-query";

export const useProductsHook = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: AllProducts,
    staleTime: Infinity,
  });
};

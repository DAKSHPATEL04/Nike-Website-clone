import { AllProducts } from "@/services/productApi";
import { useQuery } from "@tanstack/react-query";

export const prodectsHook = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: AllProducts,
    staleTime: Infinity,
  });
};

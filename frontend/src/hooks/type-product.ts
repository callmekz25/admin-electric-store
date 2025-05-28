import { getTypesProduct } from "@/services/type-productService";
import { useQuery } from "@tanstack/react-query";

export const useGetTypesProduct = () => {
  return useQuery({
    queryKey: ["types-product"],
    queryFn: getTypesProduct,
  });
};

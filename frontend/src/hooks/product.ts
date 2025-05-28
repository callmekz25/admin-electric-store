import type IProductSearchRequest from "@/interfaces/product/product-filter-request.interface";
import { getProductById, getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (filter: IProductSearchRequest) => {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => getProducts(filter),
  });
};
export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

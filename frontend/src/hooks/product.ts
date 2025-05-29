import type IProductSearchRequest from "@/interfaces/product/product-filter-request.interface";
import type IProductRequest from "@/interfaces/product/product-request.interface";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

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
export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: (request: IProductRequest) => updateProduct(request),
  });
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: (request: IProductRequest) => addProduct(request),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteProduct(id),
  });
};

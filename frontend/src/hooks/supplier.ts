import type ISupplierFilterRequest from "@/interfaces/supplier/supplier-filter-request.interface";
import type ISupplier from "@/interfaces/supplier/supplier.interface";
import {
  addSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier,
} from "@/services/supplierService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetSuppliers = (filter: ISupplierFilterRequest) => {
  return useQuery({
    queryKey: ["suppliers", filter],
    queryFn: () => getSuppliers(filter),
  });
};

export const useAddSupplier = () => {
  return useMutation({
    mutationFn: (request: ISupplier) => addSupplier(request),
  });
};

export const useUpdateSupplier = () => {
  return useMutation({
    mutationFn: (request: ISupplier) => updateSupplier(request),
  });
};
export const useDeleteSupplier = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteSupplier(id),
  });
};

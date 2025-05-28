import type ISupplierFilterRequest from "@/interfaces/supplier/supplier-filter-request.interface";
import { getSuppliers } from "@/services/supplierService";
import { useQuery } from "@tanstack/react-query";

export const useGetSuppliers = (filter: ISupplierFilterRequest) => {
  return useQuery({
    queryKey: ["suppliers", filter],
    queryFn: () => getSuppliers(filter),
  });
};

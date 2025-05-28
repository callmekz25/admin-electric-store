import { getSuppliers } from "@/services/supplierService";
import { useQuery } from "@tanstack/react-query";

export const useGetSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
  });
};

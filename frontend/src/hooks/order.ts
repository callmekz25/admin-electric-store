import type IOrderFilterRequest from "@/interfaces/order/order-filter-request.interface";
import { getOrderById, getOrders } from "@/services/orderService";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = (filter: IOrderFilterRequest) => {
  return useQuery({
    queryKey: ["orders", filter],
    queryFn: () => getOrders(filter),
  });
};

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
};

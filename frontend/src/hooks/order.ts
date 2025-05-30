import type IOrderFilterRequest from "@/interfaces/order/order-filter-request.interface";
import type IOrderView from "@/interfaces/order/order-view.interface";
import {
  addOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "@/services/orderService";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useAddOrder = () => {
  return useMutation({
    mutationFn: (request: IOrderView) => addOrder(request),
  });
};
export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: (request: IOrderView) => updateOrder(request),
  });
};

export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteOrder(id),
  });
};

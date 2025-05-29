import type IOrderDetailFilterRequest from "@/interfaces/order/order-detail-filter-request";
import type IOrderDetail from "@/interfaces/order/order-detail.interface";
import {
  addOrderDetail,
  getOrdersDetail,
  updatOrderDetail,
} from "@/services/orderDetailService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetOrdersDetail = (filter: IOrderDetailFilterRequest) => {
  return useQuery({
    queryKey: ["orders-detail", filter],
    queryFn: () => getOrdersDetail(filter),
  });
};
export const useAddOrderDetail = () => {
  return useMutation({
    mutationFn: (request: IOrderDetail) => addOrderDetail(request),
  });
};

export const useUpdateOrderDetail = () => {
  return useMutation({
    mutationFn: (request: IOrderDetail) => updatOrderDetail(request),
  });
};

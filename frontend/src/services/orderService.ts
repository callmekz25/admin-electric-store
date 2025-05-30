import httpRequest from "@/config/axios.config";
import type IOrderFilterRequest from "@/interfaces/order/order-filter-request.interface";
import type IOrderView from "@/interfaces/order/order-view.interface";
import { format } from "date-fns";
const url = "/hoa-don";
export const getOrders = async (filter: IOrderFilterRequest) => {
  try {
    const query = filter
      ? {
          hd: filter.hd,
          nl: filter.nl ? format(filter.nl, "yyyy-MM-dd") : undefined,
          ngayg: filter.ngayg ? format(filter.ngayg, "yyyy-MM-dd") : undefined,
          noig: filter.noig,
          httt: filter.httt,
        }
      : "";

    const { data } = await httpRequest.get(`${url}`, {
      params: query,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (id: string) => {
  try {
    const { data } = await httpRequest.get(`${url}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addOrder = async (request: IOrderView) => {
  try {
    const { data } = await httpRequest.post(`${url}`, request);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateOrder = async (request: IOrderView) => {
  try {
    const { data } = await httpRequest.put(`${url}/${request.MaHD}`, request);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteOrder = async (id: string) => {
  try {
    const { data } = await httpRequest.delete(`${url}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

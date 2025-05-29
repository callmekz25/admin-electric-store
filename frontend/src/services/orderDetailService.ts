import httpRequest from "@/config/axios.config";
import type IOrderDetailFilterRequest from "@/interfaces/order/order-detail-filter-request";
import type IOrderDetail from "@/interfaces/order/order-detail.interface";

const url = "/chi-tiet-hoa-don";
export const getOrdersDetail = async (filter: IOrderDetailFilterRequest) => {
  try {
    const query = {
      hd: filter?.hd,
      sp: filter?.sp,
      sl: filter?.sl,
      g: filter?.g,
    };
    const { data } = await httpRequest.get(`${url}`, {
      params: query,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addOrderDetail = async (request: IOrderDetail) => {
  try {
    const { data } = await httpRequest.post(`${url}`, request);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updatOrderDetail = async (request: IOrderDetail) => {
  try {
    const { data } = await httpRequest.put(`${url}/${request.MaHD}`, request);
    return data;
  } catch (error) {
    console.log(error);
  }
};

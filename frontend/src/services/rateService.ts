import httpRequest from "@/config/axios.config";
import type IRateFilterRequest from "@/interfaces/rate/rate-filter-request";
import type IRate from "@/interfaces/rate/rate.interface";

const url = "danh-gia";
export const getRates = async (filter: IRateFilterRequest) => {
  try {
    const request = {
      dg: filter?.dg,
      sp: filter?.sp,
      tk: filter?.tk,
      s: filter?.s,
      bl: filter?.bl,
      ndg: filter?.ndg,
    };
    const { data } = await httpRequest.get(`${url}`, {
      params: request,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addRate = async (request: IRate) => {
  try {
    const { data } = await httpRequest.post(`${url}`, request);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRate = async (request: IRate) => {
  try {
    const { data } = await httpRequest.put(`${url}/${request.MaDG}`, request);
    return data;
  } catch (error) {
    console.log(error);
  }
};

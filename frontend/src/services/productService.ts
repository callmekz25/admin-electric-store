import httpRequest from "@/config/axios.config";
import type IProductSearchRequest from "@/interfaces/product/product-filter-request.interface";
import type IProductRequest from "@/interfaces/product/product-request.interface";

const url = "/san-pham";
export const getProducts = async (filter: IProductSearchRequest) => {
  try {
    const query = filter
      ? {
          msp: filter?.msp,
          t: filter.t,
          ctsp: filter.ctsp,
          mgg: filter.mgg,
          sl: filter.sl,
          g: filter.g,
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
export const getProductById = async (id: string) => {
  try {
    const { data } = await httpRequest.get(`${url}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (request: IProductRequest) => {
  try {
    const { data } = await httpRequest.post(`${url}`, request);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = async (request: IProductRequest) => {
  try {
    const { data } = await httpRequest.put(`${url}/${request.MaSP}`, request);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (id: string) => {
  try {
    const { data } = await httpRequest.delete(`${url}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

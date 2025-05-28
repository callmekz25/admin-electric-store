import httpRequest from "@/config/axios.config";
import type IProductSearchRequest from "@/interfaces/product/product-filter-request.interface";

const url = "/san-pham";
export const getProducts = async (filter: IProductSearchRequest) => {
  try {
    const query = filter
      ? {
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

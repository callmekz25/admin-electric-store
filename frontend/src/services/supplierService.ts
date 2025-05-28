import httpRequest from "@/config/axios.config";
import type ISupplierFilterRequest from "@/interfaces/supplier/supplier-filter-request.interface";
import type ISupplier from "@/interfaces/supplier/supplier.interface";

const url = "/nha-cung-cap";
export const getSuppliers = async (filter: ISupplierFilterRequest) => {
  try {
    const query = filter
      ? {
          t: filter.t,
          dc: filter.dc,
          sdt: filter.sdt,
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

export const addSupplier = async (request: ISupplier) => {
  try {
    const { data } = await httpRequest.post(`${url}`, request);
    return data;
  } catch (error) {
    console.log(error);
  }
};

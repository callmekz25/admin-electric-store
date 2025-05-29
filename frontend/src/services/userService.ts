import httpRequest from "@/config/axios.config";
import type IUserFilterRequest from "@/interfaces/user/user-filter-request";
import type IUser from "@/interfaces/user/user.interface";
import { format } from "date-fns";
const url = "/tai-khoan";
export const getUsers = async (filter: IUserFilterRequest) => {
  try {
    const query = filter
      ? {
          ns: filter.ns ? format(filter.ns, "yyyy-MM-dd") : undefined,
          ht: filter.ht,
          gt: filter.gt,
          e: filter.e,
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
export const updateUser = async (request: IUser) => {
  try {
    const { data } = await httpRequest.put(`${url}/${request.MaTK}`, {
      ...request,
      NgaySinh: format(request.NgaySinh, "yyyy-MM-dd"),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (request: IUser) => {
  try {
    const { data } = await httpRequest.post(`${url}`, {
      ...request,
      NgaySinh: format(request.NgaySinh, "yyyy-MM-dd"),
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (id: string) => {
  try {
    const { data } = await httpRequest.delete(`${url}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

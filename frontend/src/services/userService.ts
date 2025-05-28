import httpRequest from "@/config/axios.config";
import type IUserFilterRequest from "@/interfaces/user/user-filter-request";
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

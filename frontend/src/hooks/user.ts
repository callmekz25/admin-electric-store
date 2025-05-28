import type IUserFilterRequest from "@/interfaces/user/user-filter-request";
import { getUsers } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (filter: IUserFilterRequest) => {
  return useQuery({
    queryKey: ["users", filter],
    queryFn: () => getUsers(filter),
  });
};

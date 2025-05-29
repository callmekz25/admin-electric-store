import type IUserFilterRequest from "@/interfaces/user/user-filter-request";
import type IUser from "@/interfaces/user/user.interface";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@/services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUsers = (filter: IUserFilterRequest) => {
  return useQuery({
    queryKey: ["users", filter],
    queryFn: () => getUsers(filter),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (request: IUser) => updateUser(request),
  });
};

export const useAddUser = () => {
  return useMutation({
    mutationFn: (request: IUser) => addUser(request),
  });
};
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteUser(id),
  });
};

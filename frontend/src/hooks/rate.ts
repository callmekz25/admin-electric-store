import type IRateFilterRequest from "@/interfaces/rate/rate-filter-request";
import type IRate from "@/interfaces/rate/rate.interface";
import {
  addRate,
  deleteRate,
  getRates,
  updateRate,
} from "@/services/rateService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetRates = (filter: IRateFilterRequest) => {
  return useQuery({
    queryKey: ["rates", filter],
    queryFn: () => getRates(filter),
  });
};
export const useAddRate = () => {
  return useMutation({
    mutationFn: (request: IRate) => addRate(request),
  });
};
export const useUpdateRate = () => {
  return useMutation({
    mutationFn: (request: IRate) => updateRate(request),
  });
};

export const useDeleteRate = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteRate(id),
  });
};

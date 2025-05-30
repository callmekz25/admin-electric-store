import type IRateFilterRequest from "@/interfaces/rate/rate-filter-request";
import type IRate from "@/interfaces/rate/rate.interface";
import { addRate, getRates } from "@/services/rateService";
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

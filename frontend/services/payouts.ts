import { IResponse, ISorted } from "@/types/common";
import { IInitiatePayout, IPayouts, IPayoutsFilters } from "@/types/payouts";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { ObjectToParams } from "@/utils/params";

export function useGetAllPayouts(data: Partial<IPayoutsFilters>) {
  const params = ObjectToParams({ ...data });
  return useQuery<IResponse<ISorted<IPayouts>>>({
    queryKey: ["payouts", Object.values(data).join(",")],
    queryFn: async () => axiosInstance.get(`/payouts?${params}`),
  });
}

export function InitiatePayouts(data: IInitiatePayout) {
  return axiosInstance.post("/payouts/initiate", data);
}

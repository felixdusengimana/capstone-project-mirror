import { IResponse, ISorted } from "@/types/common";
import { IInitiatePayout, IPayouts, IPayoutsFilters } from "@/types/payouts";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { ObjectToParams } from "@/utils/params";

export function useGetAllPayouts(
  data: Partial<IPayoutsFilters>,
  enabled = true,
  pageSize = 10,
  pageNumber = 1
) {
  const params = ObjectToParams({ ...data, pageNumber, pageSize });
  return useQuery<IResponse<ISorted<IPayouts>>>({
    queryKey: ["payouts", Object.values(data).join(","), pageNumber, pageSize],
    queryFn: async () => axiosInstance.get(`/payouts?${params}`),
    enabled,
  });
}

export function InitiatePayouts(data: IInitiatePayout) {
  return axiosInstance.post("/payouts/initiate", data);
}

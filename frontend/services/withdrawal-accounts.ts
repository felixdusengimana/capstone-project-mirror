import { IResponse } from "@/types/common";
import {
  IWithdrawAccount,
  IWithdrawalAccount,
} from "@/types/withdrawal-accounts";
import axiosInstance from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export function useGetWithdrawAccounts({
  enabled = true,
}: {
  enabled?: boolean;
}) {
  return useQuery<IResponse<IWithdrawalAccount[]>>({
    queryKey: ["withdrawal-accounts"],
    queryFn: async () => axiosInstance.get("/withdrawal-accounts"),
    enabled: enabled,
  });
}

export function CreateWithdrawAccount(data: IWithdrawAccount) {
  return axiosInstance.post("/withdrawal-accounts", data);
}

export function UpdateWithdrawAccount({
  id,
  data,
}: {
  id: number;
  data: Partial<IWithdrawAccount>;
}) {
  return axiosInstance.patch(`/withdrawal-accounts/${id}`, data);
}

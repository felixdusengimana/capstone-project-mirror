import { IResponse } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { ECurrency } from "@/types";
import { IWallet } from "@/types/wallet";

export function useGetWallet(
  { currency }: { currency: ECurrency } = { currency: ECurrency.RWF }
) {
  return useQuery<IResponse<IWallet>>({
    queryKey: ["payouts", "balance"],
    queryFn: async () => axiosInstance.get(`wallets/${currency}`),
  });
}

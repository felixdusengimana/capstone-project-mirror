import { IResponse } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { ECurrency } from "@/types";
import { IWallet } from "@/types/wallet";

export function useGetWallet({ currency }: { currency: ECurrency }) {
  return useQuery<IResponse<IWallet>>({
    queryKey: ["wallet", "balance", currency],
    queryFn: async () => axiosInstance.get(`wallets/${currency}`),
    enabled: !!currency,
  });
}

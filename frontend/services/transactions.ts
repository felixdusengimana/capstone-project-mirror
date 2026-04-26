import { IResponse, ISorted } from "@/types/common";
import { ITransaction, ITransactionFilter } from "@/types/transaction";
import { ObjectToParams } from "@/utils/params";
import axiosInstance from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { EStatus } from "@/types";

export function useGetTransactions({
  pageNumber = 0,
  pageSize = 10,
  ...rest
}: Partial<ITransactionFilter>) {
  const params = ObjectToParams({ pageNumber, pageSize, ...rest });
  return useQuery<IResponse<ISorted<ITransaction>>>({
    queryKey: [
      "transactions",
      Object.values(rest).join(","),
      pageNumber,
      pageSize,
    ],
    queryFn: async () => axiosInstance.get(`/transactions?${params}`),
  });
}

export function useGetTransactionByReference(
  reference: string,
  paymentStatus: EStatus,
  refetchInterval?: number,
) {
  return useQuery<EStatus>({
    queryKey: ["transaction", reference],
    queryFn: async () => axiosInstance.get(`/transactions/${reference}/status-only`),
    enabled: Boolean(reference) && paymentStatus == EStatus.PENDING,
    refetchOnWindowFocus: false,
    ...(refetchInterval?{
      refetchInterval: (refetchInterval as number) * 1000,
    }:{})
  });
}

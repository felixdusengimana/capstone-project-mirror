import { IResponse, ISorted } from "@/types/common";
import { ITransaction, ITransactionFilter } from "@/types/transaction";
import { ObjectToParams } from "@/utils/params";
import axiosInstance from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export function useGetTransactions({
  pageNumber = 0,
  pageSize = 10,
  ...rest
}: Partial<ITransactionFilter>) {
  const params = ObjectToParams({ pageNumber, pageSize, ...rest });
  return useQuery<IResponse<ISorted<ITransaction>>>({
    queryKey: ["creators", Object.values(rest).join(","), pageNumber, pageSize],
    queryFn: async () => axiosInstance.get(`/users/creators?${params}`),
  });
}

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { IResponse } from "@/types/common";
import { IIndustry } from "@/types/resources";

export function useGetAllIndustries({ enabled = true }: { enabled?: boolean }) {
  return useQuery<IResponse<IIndustry[]>>({
    queryKey: ["industries"],
    queryFn: async () => axiosInstance.get("/resources/industries"),
    enabled: enabled,
  });
}

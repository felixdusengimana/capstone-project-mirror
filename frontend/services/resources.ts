import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export function useGetAllIndustries({ enabled = true }: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["industries"],
    queryFn: async () => axiosInstance.get("/resources/industries"),
    enabled: enabled,
  });
}

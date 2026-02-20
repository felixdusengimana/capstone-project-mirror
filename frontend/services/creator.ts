import { IResponse } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { ICreatorDashboard } from "@/types/creator";

export function useGetCreatorDashboard({
  enabled = true,
}: {
  enabled?: boolean;
}) {
  return useQuery<IResponse<ICreatorDashboard>>({
    queryKey: ["dashboard"],
    queryFn: async () => axiosInstance.get("/users/creators/dashboard"),
    enabled: enabled,
  });
}

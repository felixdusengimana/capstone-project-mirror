import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { IResponse } from "@/types/common";
import { IBank, ICountry, IIndustry } from "@/types/resources";

export interface IUsernameAvailability {
  available: boolean;
  suggestions: string[];
}

export function useCheckUsername(username: string, enabled: boolean) {
  return useQuery<IResponse<IUsernameAvailability>>({
    queryKey: ["username-availability", username],
    queryFn: async () =>
      axiosInstance.get(
        `/resources/username-availability?username=${encodeURIComponent(username)}`
      ),
    enabled,
    staleTime: 60_000,
  });
}

export function useGetAllIndustries({ enabled = true }: { enabled?: boolean }) {
  return useQuery<IResponse<IIndustry[]>>({
    queryKey: ["industries"],
    queryFn: async () => axiosInstance.get("/resources/industries"),
    enabled: enabled,
  });
}

export function useGetAllCountries({ enabled = true }: { enabled?: boolean }) {
  return useQuery<IResponse<ICountry[]>>({
    queryKey: ["countries"],
    queryFn: async () => axiosInstance.get("/resources/countries"),
    enabled: enabled,
  });
}

export function useGetAllBanks({ enabled = true }: { enabled?: boolean }) {
  return useQuery<IResponse<IBank[]>>({
    queryKey: ["banks"],
    queryFn: async () => axiosInstance.get("/resources/banks"),
    enabled: enabled,
  });
}

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { IResponse } from "@/types/common";
import {
  IBank,
  IBankDto,
  ICountry,
  ICountryDto,
  IIndustry,
  IIndustryDto,
} from "@/types/resources";

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

export function CreateIndustry(data: IIndustryDto) {
  return axiosInstance.post("/resources/industries", data);
}

export function UpdateIndustry(id: number, data: IIndustryDto) {
  return axiosInstance.put(`/resources/industries/${id}`, data);
}

export function DeactivateIndustry(id: number) {
  return axiosInstance.delete(`/resources/industries/${id}`);
}

/* ===================== Countries ===================== */

export function CreateCountry(data: ICountryDto) {
  return axiosInstance.post("/resources/countries", data);
}

export function UpdateCountry(id: number, data: ICountryDto) {
  return axiosInstance.put(`/resources/countries/${id}`, data);
}

export function DeactivateCountry(id: number) {
  return axiosInstance.delete(`/resources/countries/${id}`);
}

/* ===================== Banks ===================== */

export function CreateBank(data: IBankDto) {
  return axiosInstance.post("/resources/banks", data);
}

export function UpdateBank(id: number, data: IBankDto) {
  return axiosInstance.put(`/resources/banks/${id}`, data);
}

export function DeactivateBank(id: number) {
  return axiosInstance.delete(`/resources/banks/${id}`);
}

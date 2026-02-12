import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { IResponse, ISorted } from "@/types/common";
import { ICreateUser, ICreatorFilter, IUser } from "@/types/user";
import { ObjectToParams } from "@/utils/params";

export function useGetMe() {
  return useQuery<IResponse<IUser>>({
    queryKey: ["users"],
    queryFn: async () => axiosInstance.get("/users/profile"),
  });
}
export function GetAllUser() {
  return axiosInstance.get("/users");
}

export function GetUser(id: string) {
  return axiosInstance.get(`/users/${id}`);
}

export function UpdateUser(data: Partial<ICreateUser>) {
  return axiosInstance.put(`/users/profile`, data);
}

export function UploadProfileImage(data: FormData) {
  return axiosInstance.post(`/users/profile/image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function useGetCreators({
  name,
  pageNumber = 1,
  pageSize = 10,
}: Partial<ICreatorFilter>) {
  const params = ObjectToParams({ name, pageNumber, pageSize });
  return useQuery<IResponse<ISorted<IUser>>>({
    queryKey: ["creators", name, pageNumber, pageSize],
    queryFn: async () => axiosInstance.get(`/users/creators?${params}`),
  });
}

export function useGetCreator(id: string) {
  return useQuery<IResponse<IUser>>({
    queryKey: ["creator", id],
    queryFn: async () => axiosInstance.get(`/users/creators/${id}`),
  });
}

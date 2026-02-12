import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { IResponse } from "@/types/common";
import { ICreateUser, IUser } from "@/types/user";

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

import axiosInstance from "./axiosInstance";

export function GetAllUser() {
  return axiosInstance.get("/users");
}

export function GetUser(id: string) {
  return axiosInstance.get(`/users/${id}`);
}

export function UpdateUser(data: any) {
  return axiosInstance.put(`/users/profile`, data);
}

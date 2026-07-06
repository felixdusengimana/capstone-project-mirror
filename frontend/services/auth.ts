import { IRegisterInputs } from "@/types/auth";
import axiosInstance from "./axiosInstance";

export function Register(data: IRegisterInputs) {
  return axiosInstance.post("/auth/signup", data);
}

export function Login(data: IRegisterInputs) {
  return axiosInstance.post("/auth/login", data);
}

export function Logout() {
  return axiosInstance.post("/auth/logout");
}

export function InitiateResetPassword(email: string) {
  return axiosInstance.post("/auth/password-reset/initiate", { email });
}

export function ResetPassword(data: { password: string; token: string }) {
  return axiosInstance.post("/auth/password-reset", data);
}

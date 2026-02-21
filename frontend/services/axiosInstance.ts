import { getCookie } from "@/utils/cookie";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // get accessToken from cookie
    const accessToken = getCookie("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    const endpoint = error?.response?.config.url;
    if (error?.response?.status === 401 && !endpoint.includes("auth")) {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error?.response?.data);
  }
);

export default axiosInstance;

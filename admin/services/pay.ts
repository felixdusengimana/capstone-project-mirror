import { Tip } from "@/types/pay";
import axiosInstance from "./axiosInstance";

export function InitiateTransaction(data: Tip) {
  return axiosInstance.post("/transactions/initiate", data);
}

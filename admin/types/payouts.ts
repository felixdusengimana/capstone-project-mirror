import { z } from "zod";
import { EChannel, ECurrency, EStatus } from ".";

export interface IPayouts {
  id: string;
  amount: number;
  currency: ECurrency;
  paymentChannel: EChannel;
  paymentStatus: EStatus;
  transactionReference: string;
  createdAt: string;
  processedAt: string;
  creatorName: string;
  creatorUserName: string;
}

export interface IPayoutsFilters {
  creatorTag: string;
  paymentStatus: EStatus;
  currency: ECurrency;
  pageNumber: number;
  pageSize: number;
}

export const payout = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
    })
    .min(10, "Amount must be greater than 10"),
  paymentChannel: z.nativeEnum(EChannel, {
    required_error: "Payment channel is required",
    invalid_type_error: "Pleas select payment channel",
  }),
  currency: z.nativeEnum(ECurrency, {
    required_error: "Currency is required",
    invalid_type_error: "Pleas select Currency",
  }),
});

export type IInitiatePayout = z.infer<typeof payout> & {
  otp: string;
};

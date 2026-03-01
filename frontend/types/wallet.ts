import { z } from "zod";
import { ECurrency } from ".";

export interface IWallet {
  balance: number;
  currency: ECurrency;
}

export const withdrawAccountPhone = z.object({
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^[0-9]*$/, "Invalid phone number"),
});

export type IWithdrawAccountPhone = z.infer<typeof withdrawAccountPhone>;

export const withdrawAccountWithBank = z.object({
  bankName: z.string({
    required_error: "Bank name is required",
  }),
  accountName: z.string({
    required_error: "Account name is required",
  }),
  accountNumber: z.string({
    required_error: "Account number is required",
  }),
});

export type IWithdrawAccountWithBank = z.infer<typeof withdrawAccountWithBank>;

export type IWithdrawAccount = IWithdrawAccountPhone & IWithdrawAccountWithBank;

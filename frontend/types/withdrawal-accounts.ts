import { z } from "zod";
import { IBank } from "./resources";
import { EChannel } from ".";

export const withdrawAccountPhone = z.object({
  accountNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, "Phone number must be at least 10 characters")
    .max(10, "Phone number must be at most 10 characters")
    .regex(/^[0-9]*$/, "Invalid phone number"),
});

export type IWithdrawAccountPhone = z.infer<typeof withdrawAccountPhone>;

export const withdrawAccountWithBank = z.object({
  bankCode: z.string({
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

export interface IWithdrawalAccount {
  id: number;
  accountNumber: string;
  accountName: string;
  accountType: EChannel;
  bank: IBank;
}

export type IWithdrawAccount = IWithdrawAccountWithBank & {
  accountType: EChannel;
};

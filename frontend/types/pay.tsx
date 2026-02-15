import { z } from "zod";

export const tip = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
    })
    .min(1, "Amount must be greater than 0"),
  creatorUserName: z.string({
    required_error: "Creator username is required",
  }),
  donorUserName: z.string({
    required_error: "Donor username is required",
  }),
  currency: z.string({
    required_error: "Currency is required",
  }),
  paymentProvider: z.string({
    required_error: "Payment provider is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
  note: z.string({
    required_error: "Note is required",
  }),
});

export type Tip = z.infer<typeof tip>;

import { z } from "zod";

export const tip = z.object({
  amount: z
    .number({
      required_error: "🙏🏾 Your generosity means so much. Show your support with some gift.",
    })
    .min(100, "🙏🏾 Your generosity means a lot! 500 RWF or more is a great way to show your support"),
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
    required_error: "😊 The person you are gifting would really love to know your name",
  }),
  email: z
    .string({
      required_error: "Email is required",
    }).optional(),
  note: z.string({
    required_error: "🫶🏾 A little message goes a long way in showing how you feel",
  }),
});

export const tipSchemaPhone = z.object({
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(1, "Invalid phone number")
})
  

export type TipSchemaPhoneType = z.infer<typeof tipSchemaPhone>;
export type Tip = z.infer<typeof tip> & z.infer<typeof tipSchemaPhone>;

interface Customer {
  name: string;
  email: string;
  phone_number: string;
}

export interface TransactionData {
  amount: number;
  charge_response_code: string;
  charge_response_message: string;
  charged_amount: number;
  created_at: string;
  currency: string;
  customer: Customer;
  flw_ref: string;
  redirectstatus: string | undefined;
  status: string;
  transaction_id: number;
  tx_ref: string;
}

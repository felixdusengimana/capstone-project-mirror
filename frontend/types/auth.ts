import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100, {
      message: "Password must be at most 100 characters long",
    })
    .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
      message:
        "Password must contain at least one number, one uppercase letter, and one lowercase letter",
    }),
});

export type IRegisterInputs = z.infer<typeof registerSchema>;

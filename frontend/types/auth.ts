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

export const initiateResetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
});

export const resetPasswordSchema = z
  .object({
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
    password2: z.string({
      required_error: "Password confirmation is required",
    }),
    token: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

export type IResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
export type IInitiateResetPasswordInputs = z.infer<
  typeof initiateResetPasswordSchema
>;
export type IRegisterInputs = z.infer<typeof registerSchema>;

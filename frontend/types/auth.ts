import { z } from "zod";

const blockedEmailDomains = new Set([
  // disposable providers
  "yopmail.com",
  "mailinator.com",
  "mailinator.net",
  "mailinator.org",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.org",
  "tempmail.com",
  "temp-mail.org",
  "temp-mail.io",
  "throwawaymail.com",
  "trashmail.com",
  "trashmail.net",
  "dispostable.com",
  "maildrop.cc",
  "mailnesia.com",
  "sharklasers.com",
  "getnada.com",
  "fakemail.net",
  "fakeinbox.com",
  "emailondeck.com",
  "moakt.com",
  "mintemail.com",
  "mytemp.email",
  "tempmail.plus",
  "tempmail.dev",
  "discard.email",
  "disposablemail.com",

  // test / fake domains
  "example.com",
  "test.com",
  "test.org",
  "localhost",
  "fake.com",

  // aliasing services (optional)
  "simplelogin.io",
  "anonaddy.com",
]);

const isProduction = process.env.NODE_ENV === "production";

const getEmailDomain = (email: string) =>
  email.trim().toLowerCase().split("@")[1];

const isBlockedEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;

  // In dev: allow everything (optional behavior)
  if (!isProduction) return false;

  return blockedEmailDomains.has(domain);
};

const productionEmailSchema = z
  .string({ required_error: "Email is required" })
  .email("Invalid email format")
  .refine((email) => !isBlockedEmail(email), {
    message: "Please use a valid email address (temporary emails not allowed)",
  });

const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must be at most 100 characters long")
  .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message:
      "Password must contain at least one number, one uppercase letter, and one lowercase letter",
  });

export const registerSchema = z.object({
  email: productionEmailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: productionEmailSchema,
  password: passwordSchema,
});

export const initiateResetPasswordSchema = z.object({
  email: productionEmailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
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
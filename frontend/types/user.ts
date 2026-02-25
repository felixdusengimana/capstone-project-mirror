import { z } from "zod";
import { EApprovalStatus } from ".";

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  bio: string;
  countryName: string;
  industryName: string;
  socialLinks: ISocialLink[];
  verified: boolean;
}

export interface IApprovalData {
  creatorId: string;
  approvalStatus: EApprovalStatus;
}

export interface ICreatorFilter {
  name: string;
  pageNumber: number;
  pageSize: number;
}

export const step0 = z.object({
  otp: z
    .string({
      required_error: "OTP is required",
    })
    .min(6, "OTP must be 6 characters"),
});

export const step1 = z.object({
  image: z.string({
    required_error: "Image is required",
  }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters"),
  bio: z
    .string({
      required_error: "Bio is required",
    })
    .min(10, "Bio must be at least 10 characters"),
  // profileImageUrl: z.string().url("Invalid URL"),
});

export const step2 = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});

export const step3 = z.object({
  industryCode: z.string({
    required_error: "Industry is required",
  }),
  countryIsoCode: z.string({
    required_error: "Country is required",
  }),
});

export const step4 = z.object({
  socialLinks: z.array(
    z.object({
      platform: z.string({
        required_error: "Platform is required",
      }),
      link: z.string({
        required_error: "URL is required",
      }),
    })
  ),
});

export interface ISocialLink {
  platform: string;
  link: string;
}

export type ICreateUser = z.infer<typeof step0> &
  z.infer<typeof step1> &
  z.infer<typeof step2> &
  z.infer<typeof step3> &
  z.infer<typeof step4>;

export const updateUser = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").optional(),
    bio: z.string().min(10, "Bio must be at least 10 characters").optional(),
    profileImageUrl: z.string().url("Invalid URL").optional(),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .optional(),
    email: z.string().email("Invalid email").optional(),
    countryIsoCode: z.string().optional(),
    industryCode: z.string().optional(),
  })
  .merge(step4);

export type IUpdateUser = z.infer<typeof updateUser>;

"use client";
import Button from "@/components/atoms/Button";

import Icon, { IconNames } from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import Progress from "@/components/atoms/Progress";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";
import { useRouter, useSearchParams } from "next/navigation";

import countriesFlags from "@/data/countries.json";
import { useGetAllCountries, useGetAllIndustries } from "@/services/resources";
import { useEffect, useState } from "react";
import { supportedSocials } from "@/utils/socials";
import { ICountry } from "@/types/resources";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  EOtpTypes,
  UpdateUser,
  UploadProfileImage,
  useGetMe,
  VerifyOTP,
} from "@/services/users";
import {
  ICreateUser,
  step0,
  step1,
  step2,
  step3,
  validateLinks,
} from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OTPInput from "@/components/molecules/OTPInput";
import { convertEmail } from "@/utils/convertEmail";
import { getCookie, setCookie } from "@/utils/cookie";
import ImageCrop from "@/components/organisms/ImageCrop";
import ImageCropProvider from "@/providers/ImageCropProvider";
import {
  extractDomainFromURL,
} from "@/utils/URL";

export default function Join() {
  const STEPS = 5;
  const OTP_LENGTH = 6;
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const cookieStep = getCookie("pesatoneMiddleMan");
  const queryClient = useQueryClient();

  const { data: industries, isLoading: isLoadingIndustries } =
    useGetAllIndustries({
      enabled: step === "3",
    });

  const { data: countries, isLoading: isLoadingCountries } = useGetAllCountries(
    {
      enabled: step === "3",
    }
  );

  const { data: user, isPending: isGettingUser } = useGetMe();

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [renderPage, setRenderPage] = useState(false);

  const navigate = () => {
    if (parseInt(step!) === STEPS) {
      setCookie("pesatoneMiddleMan", "true", 7200);
      router.replace("/dashboard");
    } else {
      const nextStep = parseInt(step!) + 1;
      setCookie("pesatoneMiddleMan", String(nextStep), 7200);
      router.replace(`/join?step=${nextStep}`);
    }
  };

  const { mutate, isPending } = useMutation({
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      toast.success("Profile updated successfully!", { id: "update-profile" });
      navigate();
    },
    onError(error) {
      toast.error(error.message ?? "Profile update failed!", {
        id: "update-profile",
      });
    },
    mutationFn: UpdateUser,
  });

  const { mutate: verifyOTP } = useMutation({
    onSuccess() {
      toast.success("OTP verified successfully!", { id: "update-profile" });
      navigate();
    },
    onError(error) {
      toast.error(error.message ?? "OTP verification failed!", {
        id: "update-profile",
      });
    },
    mutationFn: VerifyOTP,
  });

  const { mutateAsync: updateProfilePicAsync, isPending: isUploadingProfilePic } = useMutation({
    mutationFn: UploadProfileImage,
    onSuccess: () => {
      toast.success("Profile picture updated successfully", {
        id: "update-profile",
      });
    },
    onError: () => {
      toast.error("Error updating Profile picture", {
        id: "update-profile",
      });
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<ICreateUser>({
    resolver: zodResolver(
      step === "1"
        ? step0
        : step === "2"
        ? step1
        : step === "3"
        ? step2
        : step === "4"
        ? step3
        : validateLinks
    ),
    defaultValues: {
      socialLinks: [{ platform: "", link: "" }],
    },
  });

  const onSubmit = async (data: Partial<ICreateUser>) => {
    if (step === "1") {
      if (!data.otp) {
        return toast.error("OTP is required!", { id: "update-profile" });
      }

      toast.loading("Verifying OTP...", { id: "update-profile" });
      verifyOTP({
        otp: data.otp!,
        otpType: EOtpTypes.EMAIL_VERIFICATION,
      });

      return;
    }

    if (step === "2" && !watch("image") && !user?.data?.profileImageUrl) {
      return toast.error("Profile image is required to continue", {
        id: "update-profile",
      });
    }

    if (!isDirty) {
      return navigate();
    }

    toast.loading("Updating profile...", { id: "update-profile" });
    if (profilePhoto && step === "2") {
      const profileImageData = new FormData();
      profileImageData.append("image", profilePhoto);
      await updateProfilePicAsync(profileImageData);
    }

    const socialLinks = data.socialLinks;

    mutate({
      ...data,
      ...(socialLinks && { socialLinks }),
      ...(data.username && { username: String(data.username).trim() }),
    });
  };

  useEffect(() => {
    const c = Number(cookieStep);
    const currentStep = Number(step);

    if (Number.isNaN(c)) {
      router.replace("/login");
    }

    if (
      !step ||
      String(parseInt(step)) != step ||
      parseInt(step) < 1 ||
      parseInt(step) > STEPS
    ) {
      return router.back();
    }

    // Never move users backwards due to stale cookie state.
    // If URL step is ahead, promote cookie to keep progress monotonic.
    if (!Number.isNaN(c) && currentStep > c) {
      setCookie("pesatoneMiddleMan", String(currentStep), 7200);
    }

    // If user manually goes to a lower step, send them forward to latest progress.
    if (!Number.isNaN(c) && currentStep < c) {
      router.replace(`/join?step=${c}`);
      return;
    }

    setRenderPage(true);

    reset({
      bio: user?.data?.bio,
      name: user?.data?.name,
      username: user?.data?.username,
      countryIsoCode: user?.data?.countryName,
      industryCode: user?.data?.industryName,
      socialLinks:
        user?.data?.socialLinks && user?.data?.socialLinks.length > 0
          ? user?.data?.socialLinks
          : [{ platform: "", link: "" }],
      image: user?.data?.profileImageUrl,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.data, isGettingUser, step]);

  const handleOTP = (otp: string) => {
    setValue("otp", otp);
    if (otp.length === OTP_LENGTH && Boolean(otp)) {
      handleSubmit(onSubmit)();
    }
  };

  if (!renderPage) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-7 lg:p-0 text-gray-700 justify-between h-full"
    >
      <div className="w-full pb-5 lg:pb-[100px]">
        <Progress active={parseInt(step!)} total={STEPS} />
        {step === "1" ? (
          <>
            <h1 className="text-[#374151] text-4xl font-mono mt-[30px]">
              Verify email{" "}
            </h1>
            <p className="text-[#8A8A8B] mt-2">
              Enter OTP code sent to{" "}
              <span className="text-gray-700 font-normal">
                {convertEmail(user?.data.email!)}
              </span>
            </p>
            <div className="mt-10">
              <OTPInput
                otpType={EOtpTypes.EMAIL_VERIFICATION}
                error={errors.otp?.message}
                onChange={handleOTP}
              />
            </div>
          </>
        ) : step === "2" ? (
          <>
            <h1 className="text-[#374151] text-4xl font-mono mt-[30px]">
              Tell Us About You, Craft Your Identity&quot;
            </h1>
            <p className="text-[#8A8A8B] mt-2 max-w-[500px]">
              Complete your to let others know who you are and what you&apos;re
              passionate about
            </p>
            <div className="flex flex-col lg:flex-row justify-between gap-10 items-center mt-10">
              <ImageCropProvider>
                <ImageCrop
                  error={errors.image?.message}
                  defaultImage={user?.data.profileImageUrl ?? ""}
                  avatarSize="xl"
                  callbackOnDone={(avatar) => {
                    if (avatar) {
                      setProfilePhoto(avatar);
                      setValue("image", avatar.name, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }
                  }}
                />
              </ImageCropProvider>
              <div className="flex flex-col gap-4 flex-grow max-w-[438px]">
                <Input
                  label="Your name"
                  placeholder="Eg: John Doanne"
                  disabled={isPending}
                  error={errors.name?.message}
                  value={watch("name")}
                  onChange={(e) =>
                    setValue("name", e.target.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
                <TextArea
                  label="Bio"
                  disabled={isPending}
                  placeholder="I love to make people laugh"
                  value={watch("bio")}
                  error={errors.bio?.message}
                  onChange={(e) =>
                    setValue("bio", e.target.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
              </div>
            </div>
          </>
        ) : step === "3" ? (
          <>
            <h1 className="text-[#374151] text-4xl font-mono mt-[30px]">
              Find Your Identity in the Community&quot;
            </h1>
            <p className="text-[#8A8A8B] mt-2 max-w-[500px]">
              Personalize your presence by choosing a user tag that resonates
              with you.
            </p>
            <Input
              label="PesaTag"
              disabled={isPending}
              className="mt-10"
              placeholder="username"
              value={watch("username")}
              left={
                <div className="flex items-center gap-0.5">
                  <Icon name="alt" />
                  <p className="text-[#475569]">Pesatone.com/</p>
                </div>
              }
              onChange={(e) =>
                setValue("username", e.target.value.trim(), {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              error={errors.username?.message}
            />
          </>
        ) : step === "4" ? (
          <>
            <h1 className="text-[#374151] text-4xl font-mono mt-[30px]">
              Discover Your World, Tailored to You&quot;
            </h1>
            <p className="text-[#8A8A8B] mt-2 max-w-[500px]">
              Let’s personalize your experience based on your country and
              interests.
            </p>

            <Select
              className="mt-12 mb-3"
              disabled={isPending}
              isLoading={isLoadingIndustries}
              label="Industry"
              placeholder="Select your industry"
              error={errors.industryCode?.message}
              onChange={(e) =>
                setValue("industryCode", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              value={watch("industryCode")}
            >
              {industries?.data.map((industry) => (
                <option key={industry.id} value={industry.code}>
                  {industry.name}
                </option>
              ))}
            </Select>
            <Select
              label="Country"
              disabled={isPending}
              placeholder="Select your country"
              error={errors.countryIsoCode?.message}
              isLoading={isLoadingCountries}
              onChange={(e) => {
                setValue("countryIsoCode", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              value={watch("countryIsoCode")}
            >
              {countries?.data.map((country: ICountry) => (
                <option key={country.id} value={country.isoCode}>
                  {
                    (
                      countriesFlags as unknown as {
                        code: string;
                        flag: string;
                      }[]
                    ).find((f) => f.code == country.countryCode)?.flag
                  }{" "}
                  {country.name}
                </option>
              ))}
            </Select>
          </>
        ) : step === "5" ? (
          <>
            <h1 className="text-[#374151] text-4xl font-mono mt-[30px]">
              Share Your World, Connect Your Networks
            </h1>
            <p className="text-[#8A8A8B] mt-2">
              Link your social profiles to effortlessly share your journey and
              connect with friends
            </p>
            <div className="flex flex-col gap-2 mt-10">
              {watch("socialLinks")?.map((link, index) => {
                const domain = extractDomainFromURL(link.link);
                const socialMedia =
                  Boolean(domain) && String(domain).split(".")[0];
                const isIcon = Boolean(socialMedia)
                  ? supportedSocials.includes(String(socialMedia))
                  : false;
                const isTwitter = domain === "twitter";
                return (
                  <div key={index} className="flex items-center">
                    <Input
                      error={
                        errors?.socialLinks?.message ||
                        errors?.socialLinks?.[index]?.link?.message
                      }
                      label="Social Media Link"
                      className="flex-grow"
                      value={link.link}
                      onChange={(e) => {
                        const newLinks = [...watch("socialLinks")];
                        const inDomain = extractDomainFromURL(e.target.value);
                        const inSocialMedia =
                          Boolean(inDomain) && String(inDomain).split(".")[0];
                        const others =
                          Boolean(inSocialMedia) &&
                          !supportedSocials.includes(String(inSocialMedia));

                        newLinks[index] = {
                          link: e.target.value,
                          platform:
                            inDomain === "twitter"
                              ? "X"
                              : others
                              ? "OTHERS"
                              : String(inSocialMedia)?.toLocaleUpperCase(),
                        };
                        setValue("socialLinks", newLinks, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                      left={
                        <div className="mr-2">
                          <Icon
                            width={20}
                            height={20}
                            name={
                              isTwitter
                                ? "x"
                                : isIcon
                                ? (socialMedia as IconNames)
                                : "alt"
                            }
                          />
                        </div>
                      }
                      right={
                        watch("socialLinks").length > 1 ? (
                          <button
                            className="bg-red-200 -mr-4 p-4 block border border-red-400 rounded-r-xl"
                            onClick={() => {
                              const newLinks = [...watch("socialLinks")];
                              newLinks.splice(index, 1);
                              setValue("socialLinks", newLinks, {
                                shouldDirty: true,
                                shouldValidate: true,
                              });
                            }}
                            type="button"
                          >
                            <Icon name="trash" fill="#ff1515" />
                          </button>
                        ) : null
                      }
                    />
                  </div>
                );
              })}
            </div>
            <Button
              className="flex mt-4 items-center gap-2"
              disabled={isPending}
              outline={true}
              onClick={() =>
                setValue("socialLinks", [
                  ...watch("socialLinks"),
                  { platform: "", link: "" },
                ])
              }
              type="button"
            >
              <Icon name="add" /> <p>Add new link</p>
            </Button>
          </>
        ) : null}
      </div>

      <div className="sticky bottom-0 p-6 bg-white flex items-center flex-wrap justify-between border-t border-gray-200">
        <div>
          {parseInt(step!) > 2 && (
            <Button
              type="button"
              disabled={isPending || isUploadingProfilePic}
              outline={true}
              onClick={() => {
                if (step === "1") {
                  router.back();
                } else {
                  const currStep = parseInt(step!) - 1;
                  setCookie("pesatoneMiddleMan", String(currStep), 7200);
                  router.replace(`/join?step=${currStep}`);
                }
              }}
            >
              Back
            </Button>
          )}
        </div>

        <Button
          isLoading={isPending || isUploadingProfilePic}
          disabled={
            isPending
            || isUploadingProfilePic
            || (step === "2" && !watch("image") && !user?.data?.profileImageUrl)
          }
          className="px-[72px]"
        >
          Next
        </Button>
      </div>
    </form>
  );
}

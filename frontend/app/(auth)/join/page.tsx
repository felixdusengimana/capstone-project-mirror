"use client";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

import Icon, { IconNames } from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import Progress from "@/components/atoms/Progress";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import countriesFlags from "@/data/countries.json";
import { useGetAllCountries, useGetAllIndustries } from "@/services/resources";
import { useEffect, useState } from "react";
import { extractDomainFromURL } from "@/utils/URL";
import { supportedSocials } from "@/utils/socials";
import { ICountry } from "@/types/resources";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateUser, useGetMe } from "@/services/users";
import { ICreateUser, step1, step2, step3, step4 } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Join() {
  const STEPS = 4;
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

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

  const { mutate, isPending } = useMutation({
    onSuccess() {
      toast.success("Profile updated successfully!", { id: "update-profile" });
      if (parseInt(step!) === STEPS) router.push("/dashboard");
      else router.replace(`/join?step=${parseInt(step!) + 1}`);
    },
    onError(error) {
      toast.error(error.message ?? "Profile update failed!", {
        id: "update-profile",
      });
    },
    mutationFn: UpdateUser,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ICreateUser>({
    resolver: zodResolver(
      step === "1" ? step1 : step === "2" ? step2 : step === "3" ? step3 : step4
    ),
  });

  const onSubmit = (data: Partial<ICreateUser>) => {
    toast.loading("Updating profile...", { id: "update-profile" });
    const socialLinks = data.socialLinks?.filter((link) => link.link);
    mutate({
      ...data,
      ...(socialLinks && { socialLinks }),
      ...(data.username && { username: String(data.username).trim() }),
    });
  };

  useEffect(() => {
    if (
      !step ||
      String(parseInt(step)) != step ||
      parseInt(step) < 1 ||
      parseInt(step) > STEPS
    ) {
      return router.back();
    }

    reset({
      bio: user?.data?.bio,
      name: user?.data?.name,
      username: user?.data?.username,
      socialLinks: [{ platform: "", link: "" }],
      // countryIsoCode: user?.data?.countryIsoCode,
      // industryCode: user?.data?.industryCode,
      // socialLinks: user?.data?.socialLinks,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.data, isGettingUser]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-7 lg:p-0 text-gray-700 justify-between h-full"
    >
      <p className="text-right font-light text-lg text-gray-500">
        Already have an account,{" "}
        <Link href={"/login"} className="font-medium underline">
          Login
        </Link>
      </p>

      <div className="w-full pb-5 lg:pb-[100px]">
        <Progress active={parseInt(step!)} total={STEPS} />
        {step === "1" ? (
          <>
            <h1 className="text-[#374151] text-4xl font-mono mt-[30px]">
              Tell Us About You, Craft Your Identity&quot;
            </h1>
            <p className="text-[#8A8A8B] mt-2 max-w-[500px]">
              Complete your to let others know who you are and what you&apos;re
              passionate about
            </p>
            <div className="flex flex-col lg:flex-row justify-between gap-10 items-center mt-10">
              <div className="max-w-[307px] flex flex-col items-center justify-center">
                <Avatar src="" size="sxl" />
                <label htmlFor="upload-profile-photo">
                  <div className="mt-6 text-xlfont-normal rounded-full border border-gray-200 flex gap-1 px-4 py-3">
                    <Icon name="camera" />
                    <p>Upload Profile</p>
                  </div>
                </label>

                <input
                  type="file"
                  accept=".png;.jpg;.jpeg"
                  hidden
                  id="upload-profile-photo"
                />
              </div>
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
        ) : step === "2" ? (
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
                setValue("username", e.target.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              error={errors.username?.message}
            />
          </>
        ) : step === "3" ? (
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
        ) : step === "4" ? (
          <>
            <h1 className="text-[#374151] text-4xl font-mono mt-[30px]">
              Share Your World, Connect Your Networks
            </h1>
            <p className="text-[#8A8A8B] mt-2">
              Link your social profiles to effortlessly share your journey and
              connect with friends
            </p>
            <div className="flex flex-col gap-2 mt-10">
              {watch("socialLinks").map((link, index) => {
                const domain = extractDomainFromURL(link.link);
                const socialMedia =
                  Boolean(domain) && String(domain).split(".")[0];
                const isIcon = Boolean(socialMedia)
                  ? supportedSocials.includes(String(socialMedia))
                  : false;
                return (
                  <div key={index} className="flex items-center">
                    <Input
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
                            inSocialMedia === "twitter"
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
                            name={isIcon ? (socialMedia as IconNames) : "alt"}
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
        <Button
          type="button"
          disabled={isPending}
          outline={true}
          onClick={() => {
            if (step === "1") {
              router.back();
            } else {
              router.replace(`/join?step=${parseInt(step!) - 1}`);
            }
          }}
        >
          Back
        </Button>
        <Button isLoading={isPending} className="px-[72px]">
          Next
        </Button>
      </div>
    </form>
  );
}

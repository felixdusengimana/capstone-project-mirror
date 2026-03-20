"use client";
import Button from "@/components/atoms/Button";
import Icon, { IconNames } from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import dynamic from "next/dynamic";
const DeleteAccount = dynamic(
  () => import("@/components/organisms/DeleteAccount"),
  { ssr: false }
);

const VerifyPhoneModal = dynamic(
  () => import("@/components/molecules/VerifyPhoneModal"),
  { ssr: false }
);
const WithdrawOptions = dynamic(
  () => import("@/components/organisms/WithdrawOptions"),
  { ssr: false }
);

import ImageCrop from "@/components/organisms/ImageCrop";
import ImageCropProvider from "@/providers/ImageCropProvider";
import { UpdateUser, UploadProfileImage, useGetMe } from "@/services/users";
import { IUpdateUser, updateUser } from "@/types/user";
import { supportedSocials } from "@/utils/socials";
import {
  extractDomainFromURL,
  getURLPathName,
  removeProtocol,
} from "@/utils/URL";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function UserSettings() {
  const { data: usr, isLoading } = useGetMe();
  const [openPhoneModal, setOpenPhoneModal] = useState(false);
  const queryClient = useQueryClient();
  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IUpdateUser>({
    resolver: zodResolver(updateUser),
    defaultValues: {
      bio: usr?.data?.bio,
      email: usr?.data?.email,
      name: usr?.data?.name,
      phoneNumber: usr?.data?.phoneNumber,
      socialLinks: usr?.data?.socialLinks,
      profileImageUrl: usr?.data?.profileImageUrl,
    },
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: UpdateUser,
    onSuccess: (data) => {
      reset(data?.data);
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      toast.success("Profile updated successfully", {
        id: "updatingProfile",
      });
    },
    onError: (error) => {
      toast.error(error?.message ?? "Error updating Profile", {
        id: "updatingProfile",
      });
    },
  });

  const { mutate: updateProfilePic, isPending: isUpdatingPic } = useMutation({
    mutationFn: UploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      toast.success("Profile picture updated successfully", {
        id: "updatingProfile",
      });
    },
    onError: () => {
      toast.error("Error updating Profile picture", {
        id: "updatingProfile",
      });
    },
  });

  const isUserLoading = isLoading || isUpdating || isUpdatingPic;

  useEffect(() => {
    if (!isLoading) {
      reset(usr?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleChange = (name: keyof IUpdateUser, value: string) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data: IUpdateUser) => {
    toast.loading("updating profile information", {
      id: "updatingProfile",
    });

    const socialLinks = data.socialLinks;
    updateProfile({ ...data, socialLinks });
  };

  return (
    <div className="min-h-full w-full dashboard-padding text-black pb-10">
      <h1 className="text-4xl font-sans font-bold text-[#1A1A1A]">Settings</h1>
      <form
        id="profile-settings"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[900px] bg-white px-10 lg:px-[67px] py-[55px] w-full rounded-lg mt-8 flex flex-wrap gap-28 justify-between items-start"
      >
        <ImageCropProvider>
          <ImageCrop
            defaultImage={usr?.data?.profileImageUrl ?? ""}
            callbackOnDone={async (avatar) => {
              if (avatar) {
                toast.loading("updating profile information", {
                  id: "updatingProfile",
                });
                const data = new FormData();
                data.append("image", avatar);
                updateProfilePic(data);
              }
            }}
          />
        </ImageCropProvider>
        <div className="flex flex-grow flex-col gap-4">
          <Input
            label="Your name"
            value={watch("name")}
            disabled={isUserLoading}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name?.message}
          />
          <TextArea
            label="Bio"
            disabled={isUserLoading}
            onChange={(e) => handleChange("bio", e.target.value)}
            value={watch("bio")}
            error={errors.bio?.message}
          />
          <Input label="Email" value={usr?.data.email} disabled />
          <Input
            label="Phone"
            value={watch("phoneNumber")}
            disabled={isUserLoading}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            error={errors.phoneNumber?.message}
          />
          {!usr?.data.phoneNumberVerified && usr?.data.phoneNumber ? (
            <p className="-mt-4">
              <VerifyPhoneModal initialOpen={openPhoneModal} />
            </p>
          ) : null}

          <Button
            isLoading={isUpdating}
            disabled={isUpdatingPic || !isDirty}
            size="sm"
            className="w-fit ml-auto"
          >
            Save
          </Button>
        </div>
      </form>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[900px] bg-white px-10 lg:px-[67px] py-[55px] w-full rounded-lg mt-8 flex flex-wrap gap-y-2 gap-x-[107px] justify-between items-start"
      >
        <p className="flex-grow font-medium text-lg text-gray-600">
          Social Links
        </p>
        <div className="flex-grow">
          <div className="flex flex-col gap-4  max-w-full min-w-full lg:min-w-[486px]">
            {watch("socialLinks")?.map((link, index) => {
              const domain = extractDomainFromURL(link.link!);
              const socialMedia =
                Boolean(domain) && String(domain).split(".")[0];
              const isIcon = Boolean(socialMedia)
                ? supportedSocials.includes(String(socialMedia))
                : false;
              const isTwitter = domain === "twitter";
              return (
                <div key={index} className="flex items-center">
                  <Input
                    label={`Social Media Link ${index + 1}`}
                    className="flex-grow"
                    value={link.link}
                    error={
                      errors?.socialLinks?.message ||
                      errors?.socialLinks?.[index]?.link?.message
                    }
                    onChange={(e) => {
                      const newLinks = [...(watch("socialLinks") ?? [])];
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
                      watch("socialLinks")?.length > 1 ? (
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
            disabled={isUpdating}
            outline={true}
            onClick={() =>
              setValue(
                "socialLinks",
                [...watch("socialLinks"), { platform: "", link: "" }],
                {
                  shouldDirty: false,
                }
              )
            }
            type="button"
          >
            <Icon name="add" /> <p>Add new link</p>
          </Button>

          <Button
            isLoading={isUpdating}
            disabled={isUpdatingPic || !isDirty}
            size="sm"
            className="w-fit mt-5 ml-auto"
          >
            Save
          </Button>
        </div>
      </form>
      <div id="withdrawal-options">
        <WithdrawOptions />
      </div>
      <div
        id="delete-account"
        className="max-w-[900px] mb-10 bg-white px-10 lg:px-[67px] py-[55px] w-full rounded-lg mt-8 flex flex-wrap gap-y-5 gap-x-[107px] justify-between items-start"
      >
        <div className="max-w-[413px]">
          <h1 className="font-medium text-gray-600 text-lg">Delete account</h1>
          <p className="font-normal text-gray-400 text-base">
            Your account, along with all associated data will be permanently
            deleted and cannot be restored.
          </p>
        </div>
        <DeleteAccount pesaTag={usr?.data?.username} />
      </div>
    </div>
  );
}

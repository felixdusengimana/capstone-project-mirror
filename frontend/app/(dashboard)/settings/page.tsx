"use client";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";

import Icon, { IconNames } from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import { UpdateUser, useGetMe } from "@/services/users";
import { IUpdateUser, updateUser } from "@/types/user";
import { debounce } from "@/utils/debounce";
import { supportedSocials } from "@/utils/socials";
import { extractDomainFromURL } from "@/utils/URL";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function UserSettings() {
  const { data: usr, isLoading } = useGetMe();

  const {
    reset,
    setValue,
    watch,
    formState: { dirtyFields, errors },
  } = useForm<IUpdateUser>({
    resolver: zodResolver(updateUser),
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: UpdateUser,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

  const isUserLoading = isLoading || isUpdating;

  useEffect(() => {
    if (!isLoading) {
      reset(usr?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const debouncedUpdateProfile = () => {
    console.log({ dirtyFields });
    if (Object.keys(dirtyFields).length === 0) return;
    const dirty = Object.keys(dirtyFields).reduce(
      // @ts-ignore
      (acc, key) => ({ ...acc, [key]: watch(key) }),
      {}
    );

    console.log({ "calling updateProfile": dirty });
    // submit the form
    updateProfile(dirty);
  };

  useEffect(
    () => {
      debouncedUpdateProfile();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dirtyFields]
  );

  return (
    <div className="min-h-full w-full dashboard-padding text-black pb-10">
      <h1 className="text-4xl font-sans font-bold text-[#1A1A1A]">Settings</h1>
      <div className="max-w-[900px] bg-white px-[67px] py-[55px] w-full rounded-lg mt-8 flex gap-28 justify-between items-start">
        <div className="max-w-[307px]">
          <label htmlFor="upload-profile-photo">
            <Avatar src={usr?.data?.profileImageUrl ?? ""} size="2xl" />
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
            disabled={isUserLoading}
          />
        </div>
        <div className="flex flex-grow flex-col gap-4">
          <Input
            label="Your name"
            value={watch("name")}
            disabled={isUserLoading}
            onChange={(e) => {
              setValue("name", e.target.value, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            error={errors.name?.message}
          />
          <TextArea
            label="Bio"
            disabled={isUserLoading}
            onChange={(e) => {
              setValue("bio", e.target.value, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            value={watch("bio")}
            error={errors.bio?.message}
          ></TextArea>
          <Input label="Email" value={usr?.data.email} disabled />
          <Input
            label="Phone"
            value={watch("phoneNumber")}
            disabled={isUserLoading}
            onChange={(e) => {
              setValue("phoneNumber", e.target.value, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            error={errors.phoneNumber?.message}
          />
        </div>
      </div>

      <div className="max-w-[900px] bg-white px-[67px] py-[55px] w-full rounded-lg mt-8 flex gap-[107px] justify-between items-start">
        <p className="flex-grow font-medium text-lg text-gray-600">
          Social Links
        </p>
        <div className="flex flex-col gap-4 min-w-[486px]">
          {watch("socialLinks")?.map((link, index) => {
            const domain = extractDomainFromURL(link.link!);
            const socialMedia = Boolean(domain) && String(domain).split(".")[0];
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
      </div>

      <div className="max-w-[900px] mb-10 bg-white px-[67px] py-[55px] w-full rounded-lg mt-8 flex gap-[107px] justify-between items-start">
        <div className="max-w-[413px]">
          <h1 className="font-medium text-gray-600 text-lg">Delete account</h1>
          <p className="font-normal text-gray-400 text-base">
            Your account, along with all associated data will be permanently
            deleted and cannot be restored.
          </p>
        </div>
        <Button variant="danger-reverse">Delete my account</Button>
      </div>
    </div>
  );
}

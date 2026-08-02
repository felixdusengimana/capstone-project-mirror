"use client";
import React from "react";
const ShareProfile = dynamic(
  () => import("@/components/molecules/ShareProfile"),
  { ssr: false }
);
import Profile from "./Profile";
import CardIcon from "./CardIcon";
import dynamic from "next/dynamic";
import { useGetMe } from "@/services/users";
import { IconNames } from "../atoms/Icon";
import { useTranslations } from "next-intl";

export default function DashboardProfile() {
  const t = useTranslations("dashboard");
  const { data: profile, isPending: isFetchingUser } = useGetMe();

  return (
    <div className="w-full flex flex-col gap-10 bg-white mt-8 px-6 py-7 rounded-lg">
      <div className="flex justify-between ">
        <Profile
          isUserLoading={isFetchingUser}
          user={{
            name: profile?.data.name ?? "",
            photo: profile?.data.profileImageUrl ?? "",
            username: profile?.data.username ?? "",
          }}
          verified={profile?.data.verified}
        />
        <ShareProfile profile={profile?.data} />
      </div>
      <div className="flex justify-between items-center">
        <div className="max-w-[476px]">
          <h3 className="text-sm text-gray-400 uppercase">{t("bio")}</h3>
          <p className="text-[#475569] mt-0.5">
            {profile?.data.bio ?? t("noBio")}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          {profile?.data.socialLinks?.map((link, index) => (
            <CardIcon
              key={index}
              link={link.link}
              icon={(link.platform.toLocaleLowerCase() as IconNames) ?? "alt"}
              className="bg-gray-50 border border-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import CreatorSearchModal from "@/components/molecules/CreatorSearchModal";
import Profile from "@/components/molecules/Profile";
import React from "react";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("dashboard");
  return (
    <div className="min-h-full w-full dashboard-padding text-black pb-10">
      <h1 className="text-4xl font-sans font-bold text-[#1A1A1A]">{t("creators")}</h1>
      <CreatorSearchModal
        className="min-w-[900px] rounded-lg bg-[#fff] text-black"
        placeholderClassName="text-gray-600"
        stroke="#4B5563"
      />

      <div className="max-w-[900px] bg-white px-[67px] py-[55px] w-full rounded-lg mt-8">
        <p className="font-medium text-4xl text-gray-700 mb-4">
          {t("suggestedCreators")}
        </p>

        <div className="grid grid-cols-2 justify-between  gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 bg-white p-4 max-w-[406px] rounded-lg"
            >
              <Profile
                user={{
                  name: "Nziranziza Rafael",
                  photo: "/profiles/profile3.png",
                  username: "rafael",
                }}
              />
              <p className="text-gray-500 text-sm mt-2">
                {t("sampleBio")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

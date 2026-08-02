"use client";

import DownloadApp from "../molecules/DownloadApp";
import CreatorSearchModal from "../molecules/CreatorSearchModal";
import Trusties from "../molecules/Trusties";
import { useTranslations } from "next-intl";

export default function Intro() {
  const t = useTranslations("home");
  return (
    <div className="intro">
      <div className="page-padding">
        <div className="pt-28 max-w-[722px]">
          <h1 className="heading font-mono text-white md:text-left text-center">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-[#8A8A8B] max-w-[535px] mt-5 mb-10 md:text-left text-center">
            {t("heroDescription")}
          </p>

          <CreatorSearchModal className="max-w-full md:max-w-[502px]" />

          <div className="hidden md:block">
            <Trusties />
            <div className="flex gap-6 mt-6 flex-wrap">
              <DownloadApp os="android" className="flex-grow  max-w-[202px]" />
              <DownloadApp
                os="ios"
                className="px-[42px] flex-grow max-w-[202px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/home-bg.png"
        className="block md:hidden w-full h-full"
        alt={t("homeImageAlt")}
      />
    </div>
  );
}

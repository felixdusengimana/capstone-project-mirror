"use client";

import Headline from "@/components/atoms/Headline";
import DownloadApp from "../molecules/DownloadApp";
import CreatorSearchModal from "../molecules/CreatorSearchModal";
import Trusties from "../molecules/Trusties";

export default function Intro() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 page-padding">
      <div className="mt-40 max-w-[722px]">
        <Headline className="heading leading-[79.47px]">
          Search and gift your favorite creators
        </Headline>
        <p className="text-xl text-[#8A8A8B] max-w-[535px] mt-5 mb-10">
          A place where fans show gratitude to the African content creators they
          love!
        </p>

        <CreatorSearchModal className="min-w-[300px] md:min-w-[502px]" />
        <Trusties />
        <div className="flex gap-2 lg:gap-6 mt-6 flex-wrap">
          <DownloadApp os="android" className="flex-grow  max-w-[202px]" />
          <DownloadApp
            os="ios"
            className="lg:px-[42px] flex-grow max-w-[202px]"
          />
        </div>
      </div>
      <div className="h-full w-full hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="./home-bg.png" alt="" className="w-full h-full" />
      </div>
    </div>
  );
}

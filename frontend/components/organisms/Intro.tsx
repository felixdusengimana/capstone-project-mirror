"use client";

import Headline from "@/components/atoms/Headline";
import DownloadApp from "../molecules/DownloadApp";
import CreatorSearchModal from "../molecules/CreatorSearchModal";
import Trusties from "../molecules/Trusties";

export default function Intro() {
  return (
    <div className="grid grid-cols-2 pl-[252px]">
      <div className="mt-40">
        <Headline className="text-[64px] leading-[79.47px]">
          Search and gift your favorite creators
        </Headline>
        <p className="text-xl text-[#8A8A8B] max-w-[535px] mt-5 mb-10">
          A place where fans show gratitude to the African content creators they
          love!
        </p>

        <CreatorSearchModal className="min-w-[502px]" />
        <Trusties />
        <div className="flex gap-6 mt-6">
          <DownloadApp os="android" />
          <DownloadApp os="ios" className="px-[42px]" />
        </div>
      </div>
      <div className="h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="./home-bg.png" alt="" className="w-full h-full" />
      </div>
    </div>
  );
}

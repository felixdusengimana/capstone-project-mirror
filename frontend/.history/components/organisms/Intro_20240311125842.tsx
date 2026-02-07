"use client";

import Headline from "@/components/atoms/Headline";
import Search from "@/components/molecules/Search";
import DownloadApp from "../molecules/DownloadApp";

export default function Intro() {
  return (
    <div className="grid grid-cols-2 pl-[252px]">
      <div className="mt-40">
        <Headline className="text-[64px] leading-[79.47px]">
          Search and gift your favorite creators
        </Headline>
        <p className="text-xl text-gray-600 max-w-[535px]">
          A place where fans show gratitude to the African content creators they
          love!
        </p>
        <Search className="max-w-[502px] mt-10" />

        <p className="text-gray-600 mt-24 text-base">
          Trusted Users <br />
          Rated 4.5 by 700K+ Customers
        </p>
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

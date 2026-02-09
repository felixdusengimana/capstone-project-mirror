"use client";

import DownloadApp from "../molecules/DownloadApp";
import CreatorSearchModal from "../molecules/CreatorSearchModal";
import Trusties from "../molecules/Trusties";

export default function Intro() {
  return (
    <div className="intro">
      <div className="page-padding">
        <div className="pt-28 max-w-[722px]">
          <h1 className="heading font-mono text-white leading-[79.47px]">
            Search and gift your favorite creators
          </h1>
          <p className="text-xl text-[#8A8A8B] max-w-[535px] mt-5 mb-10">
            A place where fans show gratitude to the African content creators
            they love!
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
      </div>
    </div>
  );
}

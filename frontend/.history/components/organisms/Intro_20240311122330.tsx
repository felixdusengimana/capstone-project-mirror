"use client";

import Headline from "@/components/atoms/Headline";
import Search from "@/components/molecules/Search";

export default function Intro() {
  return (
    <div className="grid grid-cols-2 page-padding">
      <div>
        <Headline className="text-[64px]">
          Search and gift your favorite creators
        </Headline>
        <p className="text-xl text-gray-600 max-w-[535px]">
          A place where fans show gratitude to the African content creators they
          love!
        </p>
        <Search
          className="max-w-[502px] mt-10"
          onSearch={(value) => {
            console.log({ value });
          }}
        />
      </div>
      <div>k</div>
    </div>
  );
}

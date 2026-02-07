import Headline from "@/components/atoms/Headline";
import Search from "@/components/molecules/Search";
import Navbar from "@/components/organisms/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="py-[73px]">
      <Navbar />

      <div className="grid grid-cols-2 page-padding">
        <div>
          <Headline className="text-[64px]">
            Search and gift your favorite creators
          </Headline>
          <p className="text-xl text-gray-600 max-w-[535px]">
            A place where fans show gratitude to the African content creators
            they love!
          </p>
          <Search
            onSearch={(value) => {
              console.log({ value });
            }}
          />
        </div>
        <div>k</div>
      </div>
    </div>
  );
}

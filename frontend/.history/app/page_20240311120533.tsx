import Headline from "@/components/atoms/Headline";
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
          <p className="text-xl">
            A place where fans show gratitude to the African content creators
            they love!
          </p>
        </div>
        <div>k</div>
      </div>
    </div>
  );
}

import Headline from "@/components/atoms/Headline";
import Navbar from "@/components/organisms/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="py-[73px]">
      <Navbar />

      <div className="flex page-padding">
        <div>
          <Headline className="text-[64px]">
            Search and gift your favorite creators
          </Headline>
        </div>
        <div>k</div>
      </div>
    </div>
  );
}

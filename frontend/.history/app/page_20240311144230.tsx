import Headline from "@/components/atoms/Headline";
import Intro from "@/components/organisms/Intro";
import Navbar from "@/components/organisms/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="py-[73px]">
      <Navbar />
      <Intro />
      <div>
        <h5 className="uppercase text-gray-600">features</h5>
        <Headline className="max-w-[503px] text-4xl">
          Unleash Your Influence with Our Exclusive Features
        </Headline>
      </div>
    </div>
  );
}

import Headline from "@/components/atoms/Headline";
import Intro from "@/components/organisms/Intro";
import Navbar from "@/components/organisms/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="py-[73px]">
      <Navbar />
      <Intro />
      <div className="mt-24">
        <div className="max-w-[503px] mx-auto text-center">
          <h5 className="uppercase text-gray-600 mb-4">features</h5>
          <Headline className="text-4xl text-center">
            Unleash Your Influence with Our Exclusive Features
          </Headline>
        </div>
      </div>
    </div>
  );
}

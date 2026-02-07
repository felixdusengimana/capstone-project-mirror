import Headline from "@/components/atoms/Headline";
import Card from "@/components/molecules/Card";
import Intro from "@/components/organisms/Intro";
import Navbar from "@/components/organisms/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="py-[73px]">
      <Navbar />
      <Intro />
      <div className="mt-24 page-padding">
        <div className="max-w-[503px] mx-auto text-center">
          <h5 className="uppercase text-gray-600 mb-4">features</h5>
          <Headline className="text-4xl text-center">
            Unleash Your Influence with Our Exclusive Features
          </Headline>
        </div>
        <div className="grid grid-cols-3 gap-[18px]">
          <Card title="Secure Transactions" icon="secure">
            Pesatone employs advanced encryption for secure transactions,
            safeguarding you and your fans
          </Card>
        </div>
      </div>
    </div>
  );
}

import Headline from "@/components/atoms/Headline";
import Card from "@/components/molecules/Card";
import Intro from "@/components/organisms/Intro";
import Navbar from "@/components/organisms/Navbar";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="py-[73px]">
      <Navbar />
      <Intro />
      <section className="mt-24 page-padding">
        <div className="max-w-[503px] mx-auto text-center">
          <h5 className="uppercase text-gray-600 mb-4">features</h5>
          <Headline className="text-4xl text-center">
            Unleash Your Influence with Our Exclusive Features
          </Headline>
        </div>
        <div className="grid grid-cols-3 gap-[18px] mt-12">
          <Card title="Secure Transactions" icon="secure">
            Pesatone employs advanced encryption for secure transactions,
            safeguarding you and your fans
          </Card>
          <Card title="Direct Engagement" icon="fast">
            Connect instantly with followers through Pesatone&apos;s
            user-friendly interface, fostering community and stronger
            relationships
          </Card>
          <Card title="Transparent Earnings" icon="dollar">
            Gain clear insight into earnings with Pesatone, easily tracking tips
            and donations for effective financial management
          </Card>
        </div>
      </section>

      <section className="mt-24 page-padding">
        <div className="max-w-[543px] mx-auto text-center">
          <h5 className="uppercase text-gray-600 mb-4">BENEFITS</h5>
          <Headline className="text-4xl text-center">
            Experience the Benefits: Pesatone for Fans and Creators
          </Headline>
        </div>
        <div className="grid grid-cols-2 gap-[18px] mt-12">
          <div>
            <Image alt="Profile 1" src={"./profiles/profile1.png"} />
            <Image alt="Profile 1" src={"./profiles/profile4.png"} />
            <Image alt="Profile 1" src={"./profiles/profile3.png"} />
            <Image alt="Profile 1" src={"./profiles/profile4.png"} />
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
}

import Avatar from "@/components/atoms/Avatar";
import Headline from "@/components/atoms/Headline";
import Card from "@/components/molecules/Card";
import CardIcon from "@/components/molecules/CardIcon";
import SmallCard from "@/components/molecules/SmallCard";
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
          <div className="grid grid-cols-2 w-fit">
            <Avatar
              alt="Profile 1"
              src="/profiles/profile4.png"
              size="2xl"
              circle={false}
              className="ml-[-20px]"
            />
            <Avatar
              alt="Profile 2"
              src={"/profiles/profile3.png"}
              size="2xl"
              circle={false}
              className="mt-[36px]"
            />
            <Avatar
              alt="Profile 3"
              src={"/profiles/profile2.png"}
              size="2xl"
              circle={false}
              className="ml-[-20px]"
            />
            <Avatar
              alt="Profile 4"
              src={"/profiles/profile1.png"}
              size="2xl"
              circle={false}
              className="mt-[36px]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h5 className="uppercase text-gray-600 mb-6">For Fans</h5>
            <div className="flex flex-col gap-4">
              <SmallCard icon="check" title="Direct Interaction">
                Engage directly with your favorite influencers, fostering a
                closer connection and deeper relationship
              </SmallCard>
              <SmallCard icon="check" title="Support Your Favorites">
                Show your appreciation and support for the creators you love by
                tipping them through Pesatone
              </SmallCard>
              <SmallCard icon="check" title="Exclusive Access ">
                Gain access to exclusive perks and rewards as a loyal fan of
                your favorite influencers.
              </SmallCard>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[18px]  mt-12">
          <div className="flex flex-col justify-center">
            <h5 className="uppercase text-gray-600 mb-6">For creators</h5>
            <div className="flex flex-col gap-4">
              <SmallCard icon="check" title="Monetize Your Passion">
                Turn your passion into profit by receiving tips and donations
                from your loyal fanbase
              </SmallCard>
              <SmallCard icon="check" title="Direct Fan Engagement">
                Connect directly with your fans in a meaningful way, building a
                loyal and supportive community
              </SmallCard>
              <SmallCard icon="check" title="Transparent Earnings">
                Gain full visibility into your earnings and track your financial
                progress over time
              </SmallCard>
            </div>
          </div>
          <div className="grid grid-cols-2 ml-auto w-fit">
            <Avatar
              alt="Profile 1"
              src="/profiles/profile4.png"
              size="2xl"
              circle={false}
              className="ml-[-20px]"
            />
            <Avatar
              alt="Profile 2"
              src={"/profiles/profile3.png"}
              size="2xl"
              circle={false}
              className="mt-[36px]"
            />
            <Avatar
              alt="Profile 3"
              src={"/profiles/profile2.png"}
              size="2xl"
              circle={false}
              className="ml-[-20px]"
            />
            <Avatar
              alt="Profile 4"
              src={"/profiles/profile1.png"}
              size="2xl"
              circle={false}
              className="mt-[36px]"
            />
          </div>
        </div>
      </section>

      <section className="mt-24 page-padding">
        <div className="grid grid-cols-4 grid-rows-3 min-h-[862px]">
          <div className="bg-[url('/creator-bg.png')] bg-cover bg-no-repeat row-span-2 bg-red-400 rounded-lg">
            jj
          </div>
        </div>
      </section>
    </div>
  );
}

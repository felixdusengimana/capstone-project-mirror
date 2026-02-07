import Avatar from "@/components/atoms/Avatar";
import Headline from "@/components/atoms/Headline";
import Icon from "@/components/atoms/Icon";
import Card from "@/components/molecules/Card";
import CardIcon from "@/components/molecules/CardIcon";
import Search from "@/components/molecules/Search";
import SmallCard from "@/components/molecules/SmallCard";
import Transaction from "@/components/molecules/Transaction";
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
        <div className="grid grid-cols-4 grid-rows-3 min-h-[862px] gap-6">
          <div className="bg-[url('/creator-bg.png')] bg-cover bg-no-repeat row-span-2 bg-transparent rounded-[32px] px-6 flex items-center justify-center">
            <Search className="border-2 border-r-[#ffffff79] " />
          </div>
          <div className="col-span-2">
            <Card
              title={
                <p className="max-w-[374px]">
                  Give your Audience an easy way to Say thanks.
                </p>
              }
              icon="user"
              className="max-w-full"
            >
              Create and share your art. Connect with fans. Receive direct tips.
            </Card>
          </div>
          <Card
            title={
              <p className="text-[40px] leading-[49px]">
                Connect, Engage and Earn
              </p>
            }
          >
            {""}
          </Card>
          <div className="col-span-2">
            <Card
              className="max-w-full"
              title={
                <p className="w-full text-center max-w-[277px] text-[30px] mx-auto">
                  Instantly Send and Receive funds
                </p>
              }
            >
              <div className="max-w-[316px] flex justify-center mx-auto relative">
                <Transaction
                  className="absolute z-40"
                  currency="RWF"
                  status="completed"
                  date={"Dec 9, 2022"}
                  user={{
                    name: "Dianne Russell",
                    photo: "/profiles/profile1.png",
                  }}
                  amount={35000}
                />
                <Transaction
                  className="absolute top-1 max-w-[277px] z-30 bg-[#66666E]"
                  currency="RWF"
                  status="completed"
                  date={"Dec 9, 2022"}
                  user={{
                    name: "Dianne Russell",
                    photo: "/profiles/profile1.png",
                  }}
                  amount={35000}
                />
                <Transaction
                  className="absolute top-[1.5px] max-w-[251px] z-20 bg-[#404045]"
                  currency="RWF"
                  status="completed"
                  date={"Dec 9, 2022"}
                  user={{
                    name: "Dianne Russell",
                    photo: "/profiles/profile1.png",
                  }}
                  amount={35000}
                />
                <Transaction
                  className="absolute top-3 max-w-[205px] z-10 bg-[#3B3B40]"
                  currency="RWF"
                  status="completed"
                  date={"Dec 9, 2022"}
                  user={{
                    name: "Dianne Russell",
                    photo: "/profiles/profile1.png",
                  }}
                  amount={35000}
                />
              </div>
            </Card>
          </div>

          <div className="bg-[url('/sent-bg.png')] bg-cover bg-no-repeat row-span-2 bg-transparent rounded-[32px] px-6 flex items-center justify-center">
            <button className="border-2 relative border-white w-[100px] h-[100px] rounded-full flex items-center justify-center  backdrop-blur-xl">
              <Icon name="send" />
              <Icon
                name="transaction-status"
                className="absolute bottom-0 right-0"
              />
            </button>
          </div>

          <Card
            title={
              <p className="max-w-[374px]">
                Search and tip your favorite creators
              </p>
            }
            icon="user"
            className="max-w-full"
          >
            Follow, engage, and tip your beloved creators. Make a difference
            today!
          </Card>
          <Card
            title={
              <p className="text-[40px] leading-[49px]">
                Connect, Engage and Earn
              </p>
            }
          >
            {""}
          </Card>
        </div>
      </section>
    </div>
  );
}

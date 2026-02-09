import Avatar from "@/components/atoms/Avatar";
import Icon from "@/components/atoms/Icon";
import Card from "@/components/molecules/Card";
import CreatorSearchModal from "@/components/molecules/CreatorSearchModal";
import DownloadApp from "@/components/molecules/DownloadApp";
import SmallCard from "@/components/molecules/SmallCard";
import Transaction from "@/components/molecules/Transaction";
import Footer from "@/components/organisms/Footer";
import Intro from "@/components/organisms/Intro";
import Navbar from "@/components/organisms/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="py-12 md:py-14 lg:py-[73px]">
      <Navbar />
      <Intro />
      <section className="pt-24 page-padding">
        <div className="max-w-[503px] mx-auto text-center">
          <h5 className="uppercase text-[#8A8A8B] mb-4">features</h5>
          <h1 className="text-4xl font-mono text-center text-white">
            Unleash Your Influence with Our Exclusive Features
          </h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[18px] mt-12">
          <Card glow title="Secure Transactions" icon="secure">
            Pesatone employs advanced encryption for secure transactions,
            safeguarding you and your fans
          </Card>
          <Card glow title="Direct Engagement" icon="fast">
            Connect instantly with followers through Pesatone&apos;s
            user-friendly interface, fostering community and stronger
            relationships
          </Card>
          <Card glow title="Transparent Earnings" icon="dollar">
            Gain clear insight into earnings with Pesatone, easily tracking tips
            and donations for effective financial management
          </Card>
        </div>
      </section>

      <section className="pt-20 page-padding">
        <div className="max-w-[543px] mx-auto text-center">
          <h5 className="uppercase text-[#8A8A8B] mb-4">BENEFITS</h5>
          <h1 className="text-4xl font-mono text-center text-white">
            Experience the Benefits: Pesatone for Fans and Creators
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] mt-12">
          <div className="hidden lg:grid grid-cols-2 w-fit">
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
            <h5 className="uppercase text-[#8A8A8B] mb-6">For Fans</h5>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]  mt-12">
          <div className="flex flex-col justify-center">
            <h5 className="uppercase text-[#8A8A8B] mb-6">For creators</h5>
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
          <div className="hidden lg:grid grid-cols-2 ml-auto w-fit">
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

      <section className="pt-24 page-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-5 md:grid-rows-5 lg:grid-rows-3 min-h-[862px] gap-6">
          <div className="hidden lg:flex bg-[url('/creator-bg.png')] bg-cover bg-no-repeat row-span-2 bg-transparent rounded-[32px] px-6 items-center justify-center">
            <CreatorSearchModal className="border-2 border-r-[#ffffff79] w-[252px]" />
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
              containerClassName="h-full"
              className="max-w-full"
              title={
                <p className="w-full text-center max-w-[277px] text-[30px] mx-auto">
                  Instantly Send and Receive funds
                </p>
              }
            >
              <div className="max-w-[316px] flex justify-center mx-auto relative">
                <Transaction
                  className="absolute z-40 bg-white"
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

          <div className="bg-[url('/sent-bg.png')] bg-cover bg-no-repeat row-span-2 bg-transparent rounded-[32px] px-6 lg:flex hidden  items-center justify-center">
            <button className="border-2 relative border-white w-[100px] h-[100px] rounded-full flex items-center justify-center  backdrop-blur-xl">
              <Icon name="send" />
              <Icon
                name="transaction-status"
                className="absolute bottom-0 right-0"
              />
            </button>
          </div>

          <div className="col-span-2">
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
          </div>
          <Card
            title={
              <p className="text-[40px] leading-[49px]">
                Tip to your favorite creator
              </p>
            }
          >
            {""}
          </Card>
        </div>
      </section>

      <section className="p-8 lg:pt-24 page-padding">
        <div className="bg-[url('/lines-bg.png')] bg-cover bg-no-repeat row-span-2 bg-transparent min-h-[450px] rounded-[32px] px-6 flex flex-col gap-[53px] items-center justify-center">
          <h1 className="max-w-[767px] font-mono text-white text-[47px] text-center">
            Empowering African Influencers, One Tip at a Time.
          </h1>
          <div className="flex flex-wrap gap-6">
            <DownloadApp os="android" className="bg-black border-black" />
            <DownloadApp os="ios" className="bg-black border-black" />
          </div>
        </div>
      </section>

      <div className="pt-40">
        <Footer />
      </div>
    </div>
  );
}

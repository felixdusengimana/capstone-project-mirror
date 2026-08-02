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
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("home");
  return (
    <div className="py-12 md:py-14 lg:py-[73px]">
      <Navbar />
      <Intro />
      <section className="pt-24 page-padding">
        <div className="max-w-[503px] mx-auto text-center">
          <h5 className="uppercase text-[#8A8A8B] mb-4">{t("featuresLabel")}</h5>
          <h1 className="text-4xl font-mono text-center text-white">
            {t("featuresTitle")}
          </h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[18px] mt-12">
          <Card glow title={t("secureTitle")} icon="secure">
            {t("secureDescription")}
          </Card>
          <Card glow title={t("engagementTitle")} icon="fast">
            {t("engagementDescription")}
          </Card>
          <Card glow title={t("earningsTitle")} icon="dollar">
            {t("earningsDescription")}
          </Card>
        </div>
      </section>

      <section className="pt-20 page-padding">
        <div className="max-w-[543px] mx-auto text-center">
          <h5 className="uppercase text-[#8A8A8B] mb-4">{t("benefitsLabel")}</h5>
          <h1 className="text-4xl font-mono text-center text-white">
            {t("benefitsTitle")}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] mt-12">
          <div className="grid grid-cols-2 w-fit mx-auto lg:mx-0">
            <Avatar
              alt={t("profileAlt", {number: 1})}
              src="/profiles/profile4.png"
              size="2xl"
              circle={false}
              className="ml-[-20px]  bg-transparent"
            />
            <Avatar
              alt={t("profileAlt", {number: 2})}
              src={"/profiles/profile3.png"}
              size="2xl"
              circle={false}
              className="mt-[36px]  bg-transparent"
            />
            <Avatar
              alt={t("profileAlt", {number: 3})}
              src={"/profiles/profile2.png"}
              size="2xl"
              circle={false}
              className="ml-[-20px]  bg-transparent"
            />
            <Avatar
              alt={t("profileAlt", {number: 4})}
              src={"/profiles/profile1.png"}
              size="2xl"
              circle={false}
              className="mt-[36px]  bg-transparent"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h5 className="uppercase text-[#8A8A8B] mb-6">{t("forFans")}</h5>
            <div className="flex flex-col gap-4">
              <SmallCard icon="check" title={t("fanDirectTitle")}>
                {t("fanDirectDescription")}
              </SmallCard>
              <SmallCard icon="check" title={t("fanSupportTitle")}>
                {t("fanSupportDescription")}
              </SmallCard>
              <SmallCard icon="check" title={t("fanAccessTitle")}>
                {t("fanAccessDescription")}
              </SmallCard>
            </div>
          </div>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 gap-[18px]  mt-12">
          <div className="flex flex-col justify-center">
            <h5 className="uppercase text-[#8A8A8B] mb-6">{t("forCreators")}</h5>
            <div className="flex flex-col gap-4">
              <SmallCard icon="check" title={t("creatorMonetizeTitle")}>
                {t("creatorMonetizeDescription")}
              </SmallCard>
              <SmallCard icon="check" title={t("creatorEngageTitle")}>
                {t("creatorEngageDescription")}
              </SmallCard>
              <SmallCard icon="check" title={t("creatorEarningsTitle")}>
                {t("creatorEarningsDescription")}
              </SmallCard>
            </div>
          </div>
          <div className="grid grid-cols-2 mr-auto lg:mr-0 ml-auto w-fit">
            <Avatar
              alt={t("profileAlt", {number: 5})}
              src="/profiles/profile5.png"
              size="2xl"
              circle={false}
              className="ml-[-20px] bg-transparent"
            />
            <Avatar
              alt={t("profileAlt", {number: 8})}
              src={"/profiles/profile8.png"}
              size="2xl"
              circle={false}
              className="mt-[36px]  bg-transparent"
            />
            <Avatar
              alt={t("profileAlt", {number: 6})}
              src={"/profiles/profile6.png"}
              size="2xl"
              circle={false}
              className="ml-[-20px]  bg-transparent"
            />

            <Avatar
              alt={t("profileAlt", {number: 7})}
              src={"/profiles/profile7.png"}
              size="2xl"
              circle={false}
              className="mt-[36px]  bg-transparent"
            />
          </div>
        </div>
      </section>

      <section className="pt-24 page-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-7 md:grid-rows-5 lg:grid-rows-3 min-h-[862px] gap-x-0 lg:gap-x-6 gap-y-6">
          <div className="w-full flex bg-[url('/creator-bg.png')] bg-cover bg-no-repeat row-span-2 bg-transparent rounded-[32px] px-6 items-center justify-center">
            <CreatorSearchModal className="border-2 border-r-[#ffffff79] w-[252px]" />
          </div>
          <div className="col-span-2">
            <Card
              title={
                <p className="max-w-[374px]">
                  {t("easyThanksTitle")}
                </p>
              }
              icon="user"
              className="max-w-full"
            >
              {t("easyThanksDescription")}
            </Card>
          </div>
          <Card
            title={
              <p className="text-[40px] leading-[49px]">
                {t("connectEarn")}
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
                  {t("sendReceive")}
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

          <div className="bg-[url('/sent-bg.png')] bg-cover bg-no-repeat row-span-2 bg-transparent rounded-[32px] px-6 flex items-center justify-center">
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
                  {t("findCreatorsTitle")}
                </p>
              }
              icon="user"
              className="max-w-full"
            >
              {t("findCreatorsDescription")}
            </Card>
          </div>
          <Card
            title={
              <p className="text-[40px] leading-[49px]">
                {t("giftFavorite")}
              </p>
            }
          >
            {""}
          </Card>
        </div>
      </section>

      <section className="lg:pt-24 page-padding">
        <div className="bg-[url('/lines-bg.png')] w-full bg-cover bg-no-repeat row-span-2 bg-transparent min-h-[450px] py-5 rounded-[32px] px-6 flex flex-col gap-[53px] items-center justify-center">
          <h1 className="max-w-[767px] font-mono text-white text-[47px] text-center">
            {t("closing")}
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

import Button from "@/components/atoms/Button";

import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import CardIcon from "@/components/molecules/CardIcon";
import CreatorDashboard from "@/components/molecules/CreatorDashboard";
import Profile from "@/components/molecules/Profile";
import SupporterDialog from "@/components/molecules/SupporterDialog";
import dynamic from "next/dynamic";
const ShareProfile = dynamic(
  () => import("@/components/molecules/ShareProfile"),
  { ssr: false }
);
export default function CreatorDashboardPage() {
  return (
    <div className="min-h-full w-full dashboard-padding text-black pb-32 ">
      <h1 className="text-4xl font-sans font-bold text-[#1A1A1A]">Dashboard</h1>

      <div className="w-full flex flex-col gap-10 bg-white mt-8 px-6 py-7 rounded-lg">
        <div className="flex justify-between ">
          <Profile
            user={{
              name: "Nziranziza Rafael",
              photo: "/profiles/profile1.png",
              username: "Rafael02",
            }}
            verified={true}
          />
          <ShareProfile />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="max-w-[476px]">
            <h3 className="text-sm text-gray-400 uppercase">Bio</h3>
            <p className="text-[#475569] mt-0.5">
              Hey, I&apos;m Rafael a product designer on a mission to create
              tech magic! I whip up interfaces that people adore and sprinkle
              pixel-perfect details everywhere
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <CardIcon
              icon="instagram"
              className="bg-gray-50 border border-gray-200"
            />
            <CardIcon
              icon="snapchat"
              className="bg-gray-50 border border-gray-200"
            />
            <CardIcon
              icon="tiktok"
              className="bg-gray-50 border border-gray-200"
            />
            <CardIcon
              icon="x"
              className="bg-gray-50 border border-gray-200"
              fill="#4B5563"
              stroke="#4B5563"
              width={20}
              height={20}
            />
            <CardIcon
              icon="more-horizontal"
              className="bg-gray-50 border border-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <CreatorDashboard />
      </div>

      <div className="font-medium text-base text-gray-700 flex justify-between mt-12 mb-4">
        <p>Supporters</p>
      </div>

      <div className="bg-white rounded-lg py-6 mb-10">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 pb-6">
          <Input
            className="max-w-[323px]"
            left={
              <Icon
                name="search"
                width={16}
                height={16}
                stroke="#4B5563"
                className="mr-2"
              />
            }
            placeholder="Search"
          />
          <Button
            outline
            className="text-[#475569] font-medium flex gap-1 items-center"
          >
            Last 30 days
            <Icon name="arrow-down" />
          </Button>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            className={`w-full px-6 p-4 ${
              i !== 4 ? "border-b border-gray-100" : ""
            }`}
            key={i}
          >
            <SupporterDialog
              trigger={
                <div
                  key={i}
                  className={`w-full flex justify-between items-center`}
                >
                  <Profile
                    user={{
                      name: "Nziranziza Rafael",
                      photo: "/profiles/profile1.png",
                      date: "Dec 9, 2022",
                    }}
                  />

                  <h3 className="text-gray-800 font-medium text-sm">
                    <span className="text-[#838AA2] font-normal">RWF</span>{" "}
                    35,000
                  </h3>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import CardIcon from "@/components/molecules/CardIcon";
import Profile from "@/components/molecules/Profile";
import React from "react";

export default function page() {
  return (
    <div className="min-h-full w-full dashboard-padding text-black pb-10">
      <div className="w-full flex justify-between gap-10 items-center">
        <div>
          <p className="text-gray-500 text-sm font-medium">10 Supporters</p>
          <h3 className=" text-gray-600 text-2xl font-medium">RWF 50,000</h3>
        </div>
        <Button className="flex gap-0.5 items-center">
          <Icon name="cash-out" />
          <p className="font-medium text-sm text-white">Withdraw</p>
        </Button>
      </div>

      <div className="w-full flex justify-between gap-10 items-center mt-10">
        {/* Money Earned */}
        <div className="flex-grow bg-white p-8 rounded-lg">
          <CardIcon icon="coins" className="bg-gray-50" />
          <h3 className="font-medium text-sm text-gray-400 mt-6">
            Money Earned
          </h3>
          <h1 className="text-gray-800 font-medium text-4xl mt-4">
            <span className="font-normal text-base text-gray-400">RWF</span>{" "}
            200,000
          </h1>
        </div>

        {/* Payouts */}
        <div className="flex-grow bg-white p-8 rounded-lg">
          <CardIcon icon="inbox-out" className="bg-gray-50" />
          <h3 className="font-medium text-sm text-gray-400 mt-6">Payouts</h3>
          <h1 className="text-gray-800 font-medium text-4xl mt-4">
            <span className="font-normal text-base text-gray-400">RWF</span>{" "}
            50,000
          </h1>
        </div>
      </div>

      <div className="font-medium text-base text-gray-700 flex justify-between mt-12 mb-4">
        <p>Transaction history</p>
        <p>See all</p>
      </div>

      <div className="bg-white rounded-lg p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex justify-between items-center p-4 ${
              i !== 4 ? "border-b border-gray-100" : ""
            }`}
          >
            <Profile
              user={{
                name: "Nziranziza Rafael",
                photo: "/profiles/profile1.png",
                date: "Dec 9, 2022",
              }}
            />

            <h3 className="text-gray-800 font-medium text-sm">
              <span className="text-[#838AA2] font-normal">RWF</span> 35,000
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

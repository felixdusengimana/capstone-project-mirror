import Button from "@/components/atoms/Button";

import Icon from "@/components/atoms/Icon";
import Pill from "@/components/atoms/Pill";
import dynamic from "next/dynamic";
const WithdrawForm = dynamic(
  () => import("@/components/molecules/WithdrawForm"),
  { ssr: false }
);

export default function page() {
  const data = [
    {
      date: "15 January 2024",
      amount: 150000,
      status: "success",
    },
    {
      date: "15 January 2024",
      amount: 150000,
      status: "pending",
    },
    {
      date: "15 January 2024",
      amount: 150000,
      status: "pending",
    },
    {
      date: "15 January 2024",
      amount: 150000,
      status: "success",
    },
    {
      date: "15 January 2024",
      amount: 150000,
      status: "success",
    },
  ];
  return (
    <div className="min-h-full w-full dashboard-padding text-black pb-10">
      <h1 className="text-4xl font-sans font-bold text-[#1A1A1A]">Payouts</h1>

      <div className="w-full flex justify-between gap-10 items-center bg-white mt-8 px-6 py-7 rounded-lg">
        <div>
          <p className="text-gray-400 text-sm font-medium">
            Outstanding balance
          </p>
          <h3 className=" text-gray-800 font-medium text-4xl flex items-center gap-2 mt-4">
            <span className="font-normal text-base text-gray-400">RWF</span>{" "}
            150,000
          </h3>
        </div>
        <WithdrawForm />
      </div>

      <div className="bg-white px-[67px] py-[55px] w-full rounded-lg mt-8">
        <p className="font-medium text-base text-gray-700 mb-4">
          Payouts History
        </p>
        <div className="grid grid-cols-3 border-b border-gray-100 py-[11px]">
          <p className="text-gray-400 text-sm font-normal pl-2">Date</p>
          <p className="text-gray-400 text-sm font-normal pl-2">Amount</p>
          <p className="text-gray-400 text-sm font-normal pl-2">Status</p>
        </div>
        {data.map((item, index) => (
          <div className="grid grid-cols-3 py-[11px]" key={index}>
            <p className="text-gray-600 font-normal text-sm pl-2">
              {item.date}
            </p>
            <p className="text-gray-600 font-normal text-sm pl-2">
              {item.amount}
            </p>
            <Pill
              variant={item.status == "success" ? "success" : "warning"}
              className="py-1 capitalize"
              bordered
            >
              {item.status}
            </Pill>
          </div>
        ))}
      </div>
    </div>
  );
}

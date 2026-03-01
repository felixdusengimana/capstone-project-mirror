"use client";
import Pill from "@/components/atoms/Pill";
import { useGetAllPayouts } from "@/services/payouts";
import { useGetMe } from "@/services/users";
import { useGetWallet } from "@/services/wallet";
import { EStatus } from "@/types";
import { IPayoutsFilters } from "@/types/payouts";
import dynamic from "next/dynamic";
import { useState } from "react";
const WithdrawForm = dynamic(
  () => import("@/components/molecules/WithdrawForm"),
  { ssr: false }
);

export default function PayoutsPage() {
  const { data: creator } = useGetMe();
  const [filters, setFilters] = useState<Partial<IPayoutsFilters>>({
    pageNumber: 1,
    pageSize: 10,
  });
  const { data: wallet, isLoading: walletLoading } = useGetWallet();

  const { data: payouts } = useGetAllPayouts(filters);

  return (
    <>
      <div className="min-h-full w-full dashboard-padding text-black pb-10">
        <h1 className="text-4xl font-sans font-bold text-[#1A1A1A]">Payouts</h1>

        <div className="w-full flex justify-between gap-10 items-center bg-white mt-8 px-6 py-7 rounded-lg">
          <div>
            <p className="text-gray-400 text-sm font-medium">
              Outstanding balance
            </p>
            {walletLoading ? (
              <div className="animate-pulse h-8 w-24 bg-gray-200 rounded-lg mt-4"></div>
            ) : (
              <h3 className=" text-gray-800 font-medium text-4xl flex items-center gap-2 mt-4">
                <span className="font-normal text-base text-gray-400">
                  {wallet?.data?.currency}
                </span>{" "}
                {wallet?.data.balance.toLocaleString()}
              </h3>
            )}
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
          {payouts?.data.results && payouts?.data.results.length <= 0 && (
            <div className="mt-2">No payouts data found</div>
          )}
          {payouts?.data.results?.map((item, index) => (
            <div className="grid grid-cols-3 py-[11px]" key={index}>
              <p className="text-gray-600 font-normal text-sm pl-2">
                {new Date(item.createdAt).toLocaleDateString() +
                  " " +
                  new Date(item.createdAt).toLocaleTimeString()}
              </p>
              <p className="text-gray-600 font-normal text-sm pl-2">
                {item.amount}
              </p>
              <Pill
                variant={
                  item.paymentStatus === EStatus.SUCCESSFUL
                    ? "success"
                    : "warning"
                }
                className="py-1 capitalize"
                bordered
              >
                {item.paymentStatus}
              </Pill>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

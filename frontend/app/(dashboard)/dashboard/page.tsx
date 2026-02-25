"use client";
import Button from "@/components/atoms/Button";

import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import CreatorDashboard from "@/components/molecules/CreatorDashboard";
import DashboardProfile from "@/components/molecules/DashboardProfile";
import Profile from "@/components/molecules/Profile";
import SupporterDialog from "@/components/molecules/SupporterDialog";
import { useGetTransactions } from "@/services/transactions";
import { ITransactionFilter } from "@/types/transaction";
import { useState } from "react";

export default function CreatorDashboardPage() {
  const [filters, setFilters] = useState<Partial<ITransactionFilter>>({
    pageNumber: 1,
    pageSize: 10,
  });
  const { data: userTransactions, isLoading } = useGetTransactions({});
  return (
    <div className="min-h-full w-full dashboard-padding text-black pb-32 ">
      <h1 className="text-4xl font-sans font-bold text-[#1A1A1A]">Dashboard</h1>
      <DashboardProfile />
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
        {userTransactions?.data?.results?.map((transaction, i) => (
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
                    {transaction.amount.toString()}
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

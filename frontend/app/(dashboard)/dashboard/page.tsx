"use client";
import Button from "@/components/atoms/Button";

import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import CreatorDashboard from "@/components/molecules/CreatorDashboard";
import DashboardProfile from "@/components/molecules/DashboardProfile";
import DateRagePicker from "@/components/molecules/DateRagePicker";
import Pagination from "@/components/molecules/Pagination";
import Profile from "@/components/molecules/Profile";
import SupporterDialog from "@/components/molecules/SupporterDialog";
import { useGetTransactions } from "@/services/transactions";
import { ITransactionFilter } from "@/types/transaction";
import { useState } from "react";

export default function CreatorDashboardPage() {
  const [filters, setFilters] = useState<Partial<ITransactionFilter>>({
    pageNumber: 1,
    pageSize: 10,
    donorName: "",
  });
  const { data: userTransactions, isPending } = useGetTransactions(filters);
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
            onChange={(e) => {
              setFilters({ ...filters, donorName: e.target.value });
            }}
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
          {/* <Button
            outline
            className="text-[#475569] font-medium flex gap-1 items-center"
          >
            Last 30 days
            <Icon name="arrow-down" />
          </Button> */}
          <DateRagePicker />
        </div>
        {isPending ? (
          <div className="text-gray-700 px-6">Loading</div>
        ) : userTransactions?.data?.results &&
          userTransactions?.data?.results.length <= 0 ? (
          <div className="text-gray-700 px-6">No information found</div>
        ) : (
          <>
            {userTransactions?.data?.results?.map((transaction, i) => (
              <div
                className={`w-full px-6 p-4 ${
                  i !== 4 ? "border-b border-gray-100" : ""
                }`}
                key={i}
              >
                <SupporterDialog
                  transaction={transaction}
                  referenceId={transaction.transactionReference}
                  trigger={
                    <div
                      key={i}
                      className={`w-full flex justify-between items-center`}
                    >
                      <Profile
                        user={{
                          name: transaction.donorName,
                          photo: "",
                          date:
                            new Date(transaction.paidAt).toLocaleDateString() +
                            " " +
                            new Date(transaction.paidAt).toLocaleTimeString(),
                        }}
                      />

                      <h3 className="text-gray-800 font-medium text-sm">
                        <span className="text-[#838AA2] font-normal">
                          {transaction.currency}
                        </span>{" "}
                        {transaction.amount.toLocaleString()}
                      </h3>
                    </div>
                  }
                />
              </div>
            ))}
            <div>
              {(userTransactions?.data?.totalPages ?? 0) > 1 && (
                <div className="py-8">
                  <Pagination
                    currentPage={userTransactions?.data.pageNumber ?? 0}
                    total={userTransactions?.data?.totalPages ?? 0}
                    onPageChange={(page) =>
                      setFilters({ ...filters, pageNumber: page })
                    }
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

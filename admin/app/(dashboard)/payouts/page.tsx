"use client";
import Avatar from "@/components/atoms/Avatar";
import Pill from "@/components/atoms/Pill";
import Select from "@/components/atoms/Select";
import CreatorDialog from "@/components/molecules/CreatorDialog";
import { CustomTable } from "@/components/molecules/CustomTable";
import DateRagePicker from "@/components/molecules/DateRagePicker";
import SearchInput from "@/components/molecules/SearchInput";
import Tab from "@/components/molecules/Tab";
import { useGetAllPayouts } from "@/services/payouts";
import { useGetAllCountries } from "@/services/resources";
import { EStatus } from "@/types";
import { IPayouts } from "@/types/payouts";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PayoutsDashboard() {
  const searchParams = useSearchParams();
  const { data } = useGetAllPayouts({
    pageSize: 10,
    pageNumber: 1,
    // startDate: "2024-04-26",
    // endDate: "2024-04-26",
  });

  const [filters, setFilters] = useState({} as Record<string, string>);
  const status = searchParams.get("status");
  const { data: countries, isPending } = useGetAllCountries({});

  const columnHelper = createColumnHelper<IPayouts>();

  const [columns] = useState(() => [
    columnHelper.accessor("amount", {
      id: "name",
      cell: (info) => (
        <CreatorDialog
          userId="1"
          trigger={
            <div className="flex gap-2 items-center">
              <Avatar src="/profiles/profile1.png" />
              <div className="flex flex-col justify-start items-start">
                <span className="font-medium text-sm block">
                  {info.getValue()}
                </span>
                <span className="font-normal text-gray-400 text-xs block">
                  ---
                </span>
              </div>
            </div>
          }
        />
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Creator</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("amount", {
      id: "amount",
      cell: (info) => (
        <span className="font-normal text-sm">
          {info.getValue().toLocaleString()}
        </span>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Amount</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("createdAt", {
      id: "createdAt",
      cell: (info) => (
        <span className="font-normal text-sm">{info.getValue()}</span>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Date</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("currency", {
      id: "country",
      cell: (info) => (
        <span className="font-normal text-sm">{info.getValue()}</span>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Currency</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("paymentStatus", {
      id: "paymentStatus",
      cell: (info) => (
        <Pill
          variant={
            info.getValue() === EStatus.SUCCESSFUL ? "success" : "warning"
          }
          className="py-1 capitalize"
          bordered
        >
          {info.getValue()}
        </Pill>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Status</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("transactionReference", {
      id: "id",
      cell: (info) => (
        <span className="font-normal text-sm">{info.getValue()}</span>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">
          Transaction Ref.
        </span>
      ),
      footer: (info) => info.column.id,
    }),
  ]);

  const table = useReactTable({
    columns,
    data: data?.data.results ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-gray-200">
      <div className="w-full max-w-[1124px] mx-auto py-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 ">Payouts</h1>
          <DateRagePicker />
        </div>
        <div className="w-full  bg-white  rounded-lg">
          <div className="mt-12 mb-4 px-4 flex justify-between py-8">
            <div>
              <p className="font-normal text-base text-gray-700 flex justify-between">
                Search
              </p>
              <SearchInput className="bg-gray-50 border border-gray-200 rounded-md w-[257px] py-2 px-4" />
            </div>

            <div>
              <Select
                isLoading={isPending}
                label="Country"
                className="w-[257px]"
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
                value={filters.country || "all"}
              >
                <option value="all">All</option>
                {countries?.data.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <Tab
            tabs={[
              {
                label: (
                  <Link href={"/ad?status=all"} className="flex gap-2">
                    All clients{" "}
                    <p className="border border-[#E5E9F0] text-[#6B7280] px-2 py-0.5 rounded-full">
                      200
                    </p>
                  </Link>
                ),
                active: status === "all" || !status,
              },
              {
                label: <Link href="/ad?status=approved">Approved</Link>,
                active: status === "approved",
              },
              {
                label: <Link href="/ad?status=rejected">Rejected</Link>,
                active: status === "rejected",
              },
            ]}
          />
          <CustomTable
            table={table}
            loading={isPending}
            pagination={{
              currentPage: 2,
              onPageChange: () => {},
              perPage: 10,
              total: 1000,
            }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";
import Avatar from "@/components/atoms/Avatar";
import CreatorDialog from "@/components/molecules/CreatorDialog";
import { CustomTable } from "@/components/molecules/CustomTable";
import DateRagePicker from "@/components/molecules/DateRagePicker";
import SearchInput from "@/components/molecules/SearchInput";
import Tab from "@/components/molecules/Tab";
import { useGetTransactions } from "@/services/transactions";
import { ITransaction, ITransactionFilter } from "@/types/transaction";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function TransactionsDashboard() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Partial<ITransactionFilter>>({
    pageNumber: 1,
    pageSize: 10,
  });

  const { data, isPending } = useGetTransactions(filters);

  const status = searchParams.get("status");

  const columnHelper = createColumnHelper<ITransaction>();

  const [columns] = useState(() => [
    columnHelper.accessor("donorName", {
      id: "sender",
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <Avatar src="/profiles/profile1.png" />
          <div className="flex flex-col justify-start items-start">
            <span className="font-medium text-sm block">{info.getValue()}</span>
          </div>
        </div>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Sender</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("amount", {
      id: "creator",
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

    columnHelper.accessor("transactionFee", {
      id: "transactionFee",
      cell: (info) => (
        <span className="font-normal text-sm">{info.getValue()}</span>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">
          Transaction fees
        </span>
      ),
      footer: (info) => info.column.id,
    }),

    // columnHelper.accessor("", {
    //   id: "attachment",
    //   cell: (info) => (
    //     <span className="font-normal text-sm">{info.getValue()}</span>
    //   ),
    //   header: () => (
    //     <span className="text-gray-500 font-medium text-xs">Date</span>
    //   ),
    //   footer: (info) => info.column.id,
    // }),

    columnHelper.accessor("transactionFee", {
      id: "id",
      cell: (info) => (
        <span className="font-normal text-sm">{info.getValue()}</span>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">
          Transaction Ref
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
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Transactions
          </h1>
          <DateRagePicker />
        </div>
        <div className="w-full  bg-white  rounded-lg">
          <div className="mt-12 mb-4 px-4 flex justify-between py-8">
            <div>
              <p className="font-normal text-base text-gray-700 flex justify-between">
                Search
              </p>
              <SearchInput
                placeholder="Search donor name"
                onSearch={(e) =>
                  setFilters({ ...filters, pageNumber: 1, donorName: e })
                }
                className="bg-gray-50 border border-gray-200 rounded-md w-[257px] py-2 px-4"
              />
            </div>
          </div>
          <Tab
            tabs={[
              {
                label: (
                  <Link href={"?status=all"} className="flex gap-2">
                    All clients{" "}
                    {/* <p className="border border-[#E5E9F0] text-[#6B7280] px-2 py-0.5 rounded-full">
                      200
                    </p> */}
                  </Link>
                ),
                active: status === "all" || !status,
              },
              {
                label: <Link href="?status=approved">Approved</Link>,
                active: status === "approved",
              },
              {
                label: <Link href="?status=rejected">Rejected</Link>,
                active: status === "rejected",
              },
            ]}
          />
          <CustomTable
            loading={isPending}
            table={table}
            pagination={{
              currentPage: data?.data.pageNumber ?? 0,
              onPageChange: (page) =>
                setFilters({ ...filters, pageSize: page }),
              perPage: 10,
              total: data?.data.totalPages ?? 0,
            }}
          />
        </div>
      </div>
    </div>
  );
}

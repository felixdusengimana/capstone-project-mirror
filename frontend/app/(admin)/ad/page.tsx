"use client";
import Avatar from "@/components/atoms/Avatar";
import Icon from "@/components/atoms/Icon";
import { CustomTable } from "@/components/molecules/CustomTable";
import SearchInput from "@/components/molecules/SearchInput";
import Tab from "@/components/molecules/Tab";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export default function AdminDashboard() {
  const columnHelper = createColumnHelper<{
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    country: string;
    attachment: string;
  }>();

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <Avatar src="/profiles/profile1.png" />
          <span className="font-medium text-sm">{info.getValue()}</span>
        </div>
      ),
      header: () => <span>Full Name</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("email", {
      id: "email",
      cell: (info) => (
        <span className="font-normal text-sm">{info.getValue()}</span>
      ),
      header: () => <span>Email</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("phoneNumber", {
      id: "phoneNumber",
      cell: (info) => (
        <span className="font-normal text-sm">{info.getValue()}</span>
      ),
      header: () => <span>Phone</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("country", {
      id: "country",
      cell: (info) => (
        <span className="font-normal text-sm">{info.getValue()}</span>
      ),
      header: () => <span>Country</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("attachment", {
      id: "attachment",
      cell: (info) => (
        <a className="flex gap-1 text-[#00B7FE] hover:underline">
          <Icon name="attachment" />
          <span className="font-normal text-sm">{info.getValue()}</span>
        </a>
      ),
      header: () => <span>Attachement</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <button className="bg-[#34D399] px-4 py-2 font-medium text-sm text-white rounded-[4px]">
            Approve
          </button>
          <button className="bg-white px-4 py-2 font-medium text-sm text-gray-500 rounded-[4px] border border-[#E5E9F0]">
            Reject
          </button>
          <button className="bg-white px-4 py-2 font-medium text-sm text-white rounded-lg border border-[#E5E9F0]">
            <Icon name="more-horizontal" />
          </button>
        </div>
      ),
      header: () => <span>Actions</span>,
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    columns,
    data: [
      {
        id: "1",
        name: "Brooklyn Simmons",
        email: "wenzlaff@mac.com",
        phoneNumber: "(316) 555-0116",
        country: "Rwanda",
        attachment: "ID_Proof.pdf",
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-gray-200">
      <div className="w-full max-w-[1124px] mx-auto bg-white py-4 rounded-lg">
        {/* <SearchInput /> */}
        <Tab
          tabs={[
            {
              label: (
                <div className="flex gap-2">
                  All clients{" "}
                  <p className="border border-[#E5E9F0] text-[#6B7280] px-2 py-0.5 rounded-full">
                    200
                  </p>
                </div>
              ),
              // active: true,
            },
            {
              label: <p>Approved</p>,
              // active: true,
            },
            {
              label: <p>Rejected</p>,
              active: true,
            },
          ]}
        />
        <CustomTable table={table} />
      </div>
    </div>
  );
}

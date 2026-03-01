"use client";
import Avatar from "@/components/atoms/Avatar";
import Icon from "@/components/atoms/Icon";
import Select from "@/components/atoms/Select";
import ChangeCreatorStatus from "@/components/molecules/ChangeCreatorStatus";
import CreatorDialog from "@/components/molecules/CreatorDialog";
import { CustomTable } from "@/components/molecules/CustomTable";
import DateRagePicker from "@/components/molecules/DateRagePicker";
import SearchInput from "@/components/molecules/SearchInput";
import Tab from "@/components/molecules/Tab";
import { useGetAllCountries } from "@/services/resources";
import { useGetCreators, useGetMe } from "@/services/users";
import { EApprovalStatus } from "@/types";
import { ICreatorFilter, IUser } from "@/types/user";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Partial<ICreatorFilter>>({
    pageNumber: 1,
    pageSize: 10,
    name: "",
  });
  const { data: creators, isLoading, isRefetching } = useGetCreators(filters);

  const isLoadingCreators = isRefetching || isLoading;

  const status = searchParams.get("status");
  const { data: user } = useGetMe();
  const { data: countries, isPending } = useGetAllCountries({
    enabled: Boolean(user?.data.id),
  });

  const columnHelper = createColumnHelper<IUser>();

  const [columns] = useState(() => [
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => (
        <CreatorDialog
          userId={info.row.original.id}
          trigger={
            <div className="flex gap-2 items-center">
              <Avatar src={info.row.original.profileImageUrl ?? ""} />
              <span className="font-medium text-sm text-gray-500">
                {info.getValue()}
              </span>
            </div>
          }
        />
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Fund Name</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("email", {
      id: "email",
      cell: (info) => (
        <span className="font-normal text-sm text-gray-500">
          {info.getValue()}
        </span>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Email</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("phoneNumber", {
      id: "phoneNumber",
      cell: (info) => (
        <span className="font-normal text-sm text-gray-500">
          {info.getValue()}
        </span>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Phone</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("countryName", {
      id: "country",
      cell: (info) => (
        <span className="font-normal text-sm text-gray-500">
          {info.getValue()}
        </span>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Country</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("bio", {
      id: "attachment",
      cell: (info) => (
        <a className="flex gap-1 text-[#00B7FE] hover:underline">
          <Icon name="attachment" />
          <span className="font-normal text-sm text-gray-500">
            {info.getValue()}
          </span>
        </a>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Attachement</span>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <ChangeCreatorStatus
            trigger={
              <button className="bg-[#34D399] px-4 py-2 font-medium text-sm text-white rounded-[4px]">
                Approve
              </button>
            }
            newStatus={EApprovalStatus.APPROVED}
            userId={info.getValue()}
          />
          <ChangeCreatorStatus
            trigger={
              <button className="bg-white px-4 py-2 font-medium text-sm text-gray-500 rounded-[4px] border border-[#E5E9F0]">
                Reject
              </button>
            }
            newStatus={EApprovalStatus.REJECTED}
            userId={info.getValue()}
          />

          <button className="bg-white px-4 py-2 font-medium text-sm text-white rounded-lg border border-[#E5E9F0]">
            <Icon name="more-horizontal" />
          </button>
        </div>
      ),
      header: () => (
        <span className="text-gray-500 font-medium text-xs">Actions</span>
      ),
      footer: (info) => info.column.id,
    }),
  ]);

  const table = useReactTable({
    columns,
    data: creators?.data?.results ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full px-10 bg-gray-200">
      <div className="w-full max-w-[1124px] mx-auto py-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Howdy, {user?.data.name || ""}. 👋🏽
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
                onSearch={(query) => setFilters({ ...filters, name: query })}
                className="bg-gray-50 border border-gray-200 rounded-md w-[257px] py-2 px-4"
              />
            </div>

            <div>
              <Select
                isLoading={isPending}
                label="Country"
                className="w-[257px]"
                // onChange={(e) =>
                // setFilters({ ...filters, country: e.target.value })
                // }
                // value={filters.country || "all"}
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
                  <Link href={"?status=all"} className="flex gap-2">
                    All clients{" "}
                    <p className="border border-[#E5E9F0] text-[#6B7280] px-2 py-0.5 rounded-full">
                      200
                    </p>
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
            table={table}
            loading={isLoadingCreators}
            pagination={{
              currentPage: filters.pageNumber ?? 0,
              onPageChange: (page) => {
                setFilters({ ...filters, pageNumber: page });
              },
              perPage: filters?.pageSize ?? 0,
              total: creators?.data?.totalPages ?? 1000,
            }}
          />
        </div>
      </div>
    </div>
  );
}

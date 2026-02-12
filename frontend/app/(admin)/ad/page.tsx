"use client";
import { CustomTable } from "@/components/molecules/CustomTable";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function AdminDashboard() {
  const columnHelper = createColumnHelper<{
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  }>();

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
      header: () => <span>Fund Name</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("email", {
      id: "email",
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
      header: () => <span>Email</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("phoneNumber", {
      id: "phoneNumber",
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
      header: () => <span>Phone</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
      header: () => <span>Country</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
      ),
      header: () => <span>Attachement</span>,
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => (
        <span className="font-medium text-sm">{info.getValue()}</span>
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
        name: "John Doe",
        email: "",
        phoneNumber: "",
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full bg-gray-200">
      <div className="w-full max-w-[1124px] mx-auto">
        <CustomTable table={table} />
      </div>
    </div>
  );
}

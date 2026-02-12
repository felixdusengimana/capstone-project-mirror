import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { ComponentProps } from "react";
import Pagination, { PaginationProps } from "./Pagination";

export interface CustomTableProps<Tdata> {
  table: Table<Tdata>;
  loading?: boolean;
  pagination?: PaginationProps;
  checkBoxCol?: keyof Tdata;
  error?: string;
}

const Table = ({ children, className, ...props }: ComponentProps<"table">) => {
  return (
    <div className="rounded-xl overflow-auto md:overflow-hidden w-full border border-t-0">
      <table {...props} className={`w-full ${className}`}>
        {children}
      </table>
    </div>
  );
};

const THead = ({ children, className, ...props }: ComponentProps<"thead">) => {
  return (
    <thead {...props} className={`text-left capitalize ${className}`}>
      {children}
    </thead>
  );
};

const TBody = ({ children, className, ...props }: ComponentProps<"tbody">) => {
  return (
    <tbody {...props} className={`${className}`}>
      {children}
    </tbody>
  );
};

const Td = ({ children, className, ...props }: ComponentProps<"td">) => {
  return (
    <td
      {...props}
      className={`first:pl-4 last:pr-4 py-5 text-sm text-gray-900  ${className}`}
    >
      {children}
    </td>
  );
};

const Th = ({ children, className, ...props }: ComponentProps<"th">) => {
  return (
    <th
      {...props}
      className={`font-medium first:pl-4 py-4 bg-[#F6F6F6] text-xs text-gray-400 capitalize last:pr-6 ${className}`}
    >
      {children}
    </th>
  );
};

const Tr = ({ children, className, ...props }: ComponentProps<"tr">) => {
  return (
    <tr
      {...props}
      className={`border-b last:border-b-0 hover:bg-secondary-200 ${className}`}
    >
      {children}
    </tr>
  );
};

const CustomTable = <TData,>({
  table,
  loading = false,
  pagination,
  checkBoxCol,
  ...props
}: CustomTableProps<TData>) => {
  return (
    <div {...props}>
      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup, i) => (
            <Tr key={headerGroup.id + i + "-hrow"}>
              {headerGroup.headers.map((header, j) =>
                checkBoxCol && checkBoxCol === header.id ? (
                  <Th
                    data-colid="checkbox"
                    className="w-[3rem]"
                    key={header.id + i + j + "-hcell"}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ) : (
                  <Th data-colid="data" key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                )
              )}
            </Tr>
          ))}
        </THead>
        <TBody>
          {loading ? (
            <>
              {Array.from({ length: 3 }).map((_, key) => (
                <Tr
                  key={"row" + key + "-loading"}
                  className="hover:bg-transparent"
                >
                  {Array.from({
                    length: table.getVisibleFlatColumns().length,
                  }).map((_, colKey) => (
                    <Td key={colKey}>
                      <div className="h-2 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
                    </Td>
                  ))}
                </Tr>
              ))}
            </>
          ) : (
            <>
              {table.getRowModel().rows.length <= 0 ? (
                <Tr key={"no-data-row"} className="hover:bg-inherit">
                  <Td
                    colSpan={table.getAllColumns().length}
                    className="capitalize text-center text-xs"
                  >
                    data is empty
                  </Td>
                </Tr>
              ) : (
                <>
                  {table.getRowModel().rows.map((row, i) => (
                    <Tr key={row.id + i + "-drow"}>
                      {row.getVisibleCells().map((cell, j) =>
                        checkBoxCol && checkBoxCol === cell.column.id ? (
                          <Td
                            className="w-[3rem]"
                            key={cell.id + i + j + "-dcell"}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        ) : (
                          <Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        )
                      )}
                    </Tr>
                  ))}
                </>
              )}
            </>
          )}
        </TBody>
      </Table>
      {pagination?.total && !loading ? (
        <Pagination {...pagination!} loading={loading} />
      ) : null}
    </div>
  );
};

export { Table, TBody, Tr, Td, Th, THead, CustomTable };

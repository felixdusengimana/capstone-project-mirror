import Icon from "../atoms/Icon";

export interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function Pagination({
  total,
  perPage,
  currentPage,
  onPageChange,
  loading,
}: PaginationProps) {
  return (
    <div className="text-black w-full py-8 px-6 flex justify-between items-center">
      <button
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        disabled={loading || currentPage === 1}
        className="bg-gray-50 border border-gray-200 text-[#0000008A] font-normal rounded-md px-4 py-2 text-sm flex"
      >
        <Icon name="chevron-left" />
        Previous
      </button>
      <p className="text-[#0000008A] font-normal text-sm">
        {/* elements like 1–50 of 2,619 */}
        {(currentPage * perPage - perPage + 1).toLocaleString()}-
        {(currentPage * perPage > total
          ? total
          : currentPage * perPage
        ).toLocaleString()}{" "}
        of {total.toLocaleString()}
      </p>
      <button
        onClick={() => {
          if (currentPage < Math.ceil(total / perPage))
            onPageChange(currentPage + 1);
        }}
        disabled={loading || currentPage === Math.ceil(total / perPage)}
        className="bg-gray-50 border border-gray-200 text-[#0000008A] font-normal rounded-md px-4 py-2 text-sm flex"
      >
        Next
        <div className="rotate-180">
          <Icon name="chevron-left" />
        </div>
      </button>
    </div>
  );
}

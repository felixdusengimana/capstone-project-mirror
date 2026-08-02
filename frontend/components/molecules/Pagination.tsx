import Icon from "../atoms/Icon";
import { useTranslations } from "next-intl";

export interface PaginationProps {
  total: number;
  perPage?: number;
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
  const t = useTranslations("components");
  return (
    <div className="text-black w-full flex justify-between items-center">
      <button
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        disabled={loading || currentPage === 1}
        className="bg-gray-50 border  disabled:cursor-not-allowed border-gray-200 text-[#0000008A] disabled:bg-slate-300 font-normal rounded-md px-4 py-2 text-sm flex"
      >
        <Icon name="chevron-left" />
        {t("previous")}
      </button>
      <p className="text-[#0000008A] font-normal text-sm">
        {t("pageOf", {current: currentPage, total})}
      </p>
      <button
        onClick={() => {
          if (currentPage < total) onPageChange(currentPage + 1);
        }}
        disabled={loading || currentPage + 1 > total}
        className="bg-gray-50 border disabled:cursor-not-allowed border-gray-200 text-[#0000008A] disabled:bg-slate-300 font-normal rounded-md px-4 py-2 text-sm flex"
      >
        {t("photoNext")}
        <div className="rotate-180">
          <Icon name="chevron-left" />
        </div>
      </button>
    </div>
  );
}

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
  return <div>Pagination</div>;
}

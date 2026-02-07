import { ComponentProps } from "react";

interface SearchProps extends ComponentProps<"div"> {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
}
export default function Search() {
  return <div>Search</div>;
}

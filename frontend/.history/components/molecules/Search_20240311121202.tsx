"use client";
import { ComponentProps } from "react";
import Icon from "../atoms/Icon";

interface SearchProps extends ComponentProps<"div"> {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
}
export default function Search({
  placeholder = "Search for creators",
  onSearch,
  onClear,
  ...props
}: SearchProps) {
  return (
    <div {...props}>
      <Icon name="search" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full "
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
}

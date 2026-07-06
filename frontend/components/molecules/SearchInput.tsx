"use client";
import { ComponentProps, useEffect, useState } from "react";
import Icon from "../atoms/Icon";

interface SearchInputProps extends ComponentProps<"label"> {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
}
export default function SearchInput({
  placeholder = "Search for creators",
  onSearch,
  onClear,
  ...props
}: SearchInputProps) {
  const [query, setQuery] = useState("");

  // return value after 300ms
  useEffect(
    () => {
      const timer = setTimeout(() => {
        onSearch?.(query);
      }, 300);
      return () => clearTimeout(timer);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  return (
    <label
      {...props}
      className={`flex border-b border-gray-100 w-full px-5 py-4 gap-4 ${props.className}`}
    >
      <Icon
        name="search"
        onClick={() => onSearch?.(query)}
        width={24}
        height={25}
        stroke="#000"
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full text-black text-left placeholder:font-medium placeholder:text-lg placeholder:text-gray-400 bg-transparent outline-none"
      />
    </label>
  );
}

"use client";
import { ComponentProps, useEffect, useState } from "react";
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
    <div
      {...props}
      className={`flex bg-[#2C2C3033] px-5 py-4 gap-4 rounded-full`}
    >
      <Icon name="search" onClick={() => onSearch?.(query)} />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full text-white bg-transparent outline-none"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

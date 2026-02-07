import { ComponentProps } from "react";

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
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border-2 border-gray-300 rounded-md p-3"
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <button
        onClick={() => onClear?.()}
        className="bg-gray-300 text-white rounded-md p-3"
      >
        Clear
      </button>
    </div>
  );
}

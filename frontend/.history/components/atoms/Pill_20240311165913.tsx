import { ComponentProps } from "react";

interface PillProps extends ComponentProps<"div"> {
  variant?: "primary" | "secondary" | "tertiary";
}
export default function Pill({ variant, ...rest }: PillProps) {
  return (
    <div
      {...rest}
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        variant === "primary"
          ? "bg-[#F2F2F3] text-[#2A2F4E]"
          : variant === "secondary"
          ? "bg-[#2A2F4E] text-white"
          : "bg-[#F2F2F3] text-[#2A2F4E] border border-[#F2F2F3]"
      } ${rest.className}`}
    >
      {rest.children}
    </div>
  );
}

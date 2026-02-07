import { ComponentProps } from "react";

interface PillProps extends ComponentProps<"div"> {
  variant?: "success" | "warning" | "error";
}
export default function Pill({ variant, ...rest }: PillProps) {
  return (
    <div
      {...rest}
      className={`px-4 py-1 rounded-full text-xs font-medium ${
        variant === "success"
          ? "bg-[#E7F7EE] text-[#34A853]"
          : variant === "warning"
          ? "bg-[#FFF4E5] text-[#F9A825]"
          : "bg-[#FCE8E6] text-[#EA4335]"
      } ${rest.className}`}
    >
      {rest.children}
    </div>
  );
}

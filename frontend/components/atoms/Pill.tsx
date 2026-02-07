import { ComponentProps } from "react";

interface PillProps extends ComponentProps<"div"> {
  variant?: "success" | "warning" | "error";
  bordered?: boolean;
}
export default function Pill({ variant, bordered, ...rest }: PillProps) {
  return (
    <div
      {...rest}
      className={`px-2 py-[1.5px] rounded-full text-xs font-normal  w-fit ${
        variant === "success"
          ? "bg-[#EFFCF3] text-[#22C45E] border-[#22C45E]"
          : variant === "warning"
          ? "bg-[#FFF4E5] text-[#F9A825] border-[#F9A825]"
          : "bg-[#FCE8E6] text-[#EA4335] border-[#EA4335]"
      } 
      ${bordered ? "border" : ""}
      ${rest.className}`}
    >
      {rest.children}
    </div>
  );
}

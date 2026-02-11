import { ComponentProps } from "react";

interface ProgressProps extends ComponentProps<"progress"> {
  active: number;
  total: number;
}
export default function Progress({ active, total, ...props }: ProgressProps) {
  return (
    <div className="w-full flex gap-2 rounded-full justify-between h-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-full rounded-full ${
            i < active ? "bg-[#3B82F6]" : "bg-[#E5E7EB]"
          }`}
          style={{ width: `${100 / total}%` }}
        />
      ))}
    </div>
  );
}

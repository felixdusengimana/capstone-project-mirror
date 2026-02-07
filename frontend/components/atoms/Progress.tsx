import { ComponentProps } from "react";

interface ProgressProps extends ComponentProps<"progress"> {
  percentage: number;
}
export default function Progress({ percentage, ...props }: ProgressProps) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-1.5">
      <div
        className="bg-gray-800 h-1.5 rounded-full"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}

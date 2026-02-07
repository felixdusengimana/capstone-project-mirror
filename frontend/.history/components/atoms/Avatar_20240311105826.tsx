/* eslint-disable @next/next/no-img-element */
import { ComponentProps } from "react";

interface AvatarProps extends ComponentProps<"div"> {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  circle?: boolean;
  bordered?: boolean;
  fallBackText?: string;
}
export default function Avatar({ ...props }: AvatarProps) {
  const { src, alt, size = "sm", circle = true, bordered, ...rest } = props;

  return (
    <div {...rest} className={`${rest.className}`}>
      {
        <img
          src={src}
          alt={alt}
          className={`rounded-full ${circle ? "rounded-full" : "rounded"} ${
            bordered ? "border-2 border-white" : ""
          } ${
            size === "sm"
              ? "w-10 h-10"
              : size === "md"
              ? "w-12 h-12"
              : size === "lg"
              ? "w-16 h-16"
              : size === "xl"
              ? "w-[150px] h-[150px]"
              : size === "2xl"
              ? "w-[202px] h-[202px]"
              : ""
          }`}
        />
      }
    </div>
  );
}

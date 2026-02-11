"use client";
import { ComponentProps } from "react";
import Icon from "./Icon";
import Image from "next/image";

interface AvatarProps extends ComponentProps<"div"> {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "sxl";
  circle?: boolean;
  bordered?: boolean;
  fallBackText?: string;
}
export default function Avatar({ ...props }: AvatarProps) {
  const {
    src,
    alt,
    size = "sm",
    circle = true,
    fallBackText,
    bordered,
    className,
    ...rest
  } = props;

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    sxl: "w-[120px] h-[120px]",
    xl: "w-[150px] h-[150px]",
    "2xl": "lg:w-[202px] lg:h-[202px] w-[143.98px] h-[143.98px]",
  };

  return (
    <div
      {...rest}
      className={`${src ? "bg-transparent" : "bg-gray-100"} ${
        circle ? "rounded-full" : "rounded"
      } ${bordered ? "border-2 border-white" : ""} ${
        sizeClasses[size]
      } flex items-center justify-center overflow-hidden relative ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          // loading="eager"
          // loader={({ src }) => src}
          fill={true}
          className={`w-full h-full object-cover`}
        />
      ) : fallBackText ? (
        fallBackText
      ) : (
        <Icon name="user" />
      )}
    </div>
  );
}

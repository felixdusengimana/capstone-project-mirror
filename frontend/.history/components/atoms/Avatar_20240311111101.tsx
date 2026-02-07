/* eslint-disable @next/next/no-img-element */
import { ComponentProps } from "react";
import Icon from "./Icon";

interface AvatarProps extends ComponentProps<"div"> {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
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
    ...rest
  } = props;

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-[150px] h-[150px]",
    "2xl": "w-[202px] h-[202px]",
  };

  return (
    <div
      {...rest}
      className={`bg-gray-100 ${circle ? "rounded-full" : "rounded"} ${
        bordered ? "border-2 border-white" : ""
      } ${sizeClasses[size]} ${
        rest.className
      } flex items-center justify-center overflow-hidden`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full ${sizeClasses[size]} object-cover`}
        />
      ) : fallBackText ? (
        fallBackText
      ) : (
        <Icon name="user" />
      )}
    </div>
  );
}

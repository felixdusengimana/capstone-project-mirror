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

  return (
    <div {...rest} className={`bg-gray-100 ${rest.className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`rounded-full object-cover ${
            circle ? "rounded-full" : "rounded"
          } ${bordered ? "border-2 border-white" : ""} `}
        />
      ) : fallBackText ? (
        fallBackText
      ) : (
        <Icon name="user" />
      )}
    </div>
  );
}

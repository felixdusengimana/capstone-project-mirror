"use client";
import { ComponentProps, useState, useEffect } from "react";
import Icon from "./Icon";

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

  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    // Reset loading and error state when src changes
    setImageLoading(true);
    setImageError(false);
  }, [src]);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    sxl: "w-[120px] h-[120px]",
    xl: "w-[150px] h-[150px]",
    "2xl": "lg:w-[202px] lg:h-[202px] w-[143.98px] h-[143.98px]",
  };

  const generateRandomColor = () => {
    // color blackish and whitish should be avoided
    const colors = [
      "#FFB8B8",
      "#FFD3B8",
      "#FFF4B8",
      "#D3FFB8",
      "#B8FFD3",
      "#B8FFF4",
      "#B8D3FF",
      "#B8B8FF",
      "#D3B8FF",
      "#F4B8FF",
      "#FFB8F4",
      "#FFB8D3",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      {...rest}
      className={`${imageLoading ? "bg-gray-200" : ""} ${
        circle ? "rounded-full" : "rounded"
      } ${bordered ? "border-2 border-white" : ""} ${
        sizeClasses[size]
      } flex items-center text-black justify-center overflow-hidden relative ${className}`}
      style={{
        background: !src && fallBackText ? generateRandomColor() : "none",
      }}
    >
      {!imageError && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          className={`w-full h-full object-cover`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
        />
      ) : fallBackText ? (
        fallBackText
      ) : (
        <Icon name="user" />
      )}
    </div>
  );
}

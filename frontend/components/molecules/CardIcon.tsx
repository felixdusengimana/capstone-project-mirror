"use client";

import { ComponentProps } from "react";
import Icon, { IconNames } from "../atoms/Icon";

interface CardIconProps extends ComponentProps<"svg"> {
  icon: IconNames;
  hovered?: boolean;
  onClick?: () => void;
}
export default function CardIcon({
  icon,
  hovered,
  className,
  onClick,
  children,
  ...rest
}: CardIconProps) {
  return (
    <div
      className={`relative z-10 w-fit h-fit`}
      onClick={() => {
        onClick?.();
      }}
    >
      <div
        className={`w-16 h-16 ${
          hovered ? "animated-icon" : ""
        } rounded-[11px] bg-[#1A1A1C] flex items-center justify-center ${className}`}
      >
        <Icon {...rest} name={icon} />
      </div>
    </div>
  );
}

import React, { ComponentProps } from "react";
import Icon, { IconNames } from "../atoms/Icon";

interface CardIconProps extends ComponentProps<"div"> {
  icon: IconNames;
}
export default function CardIcon({
  icon,
  className,
  children,
  ...rest
}: CardIconProps) {
  return (
    <div
      {...rest}
      className={`w-16 min-w-[64px] h-16 rounded-[11px] bg-[#1A1A1C] flex items-center justify-center ${className}`}
    >
      <Icon name={icon} />
    </div>
  );
}

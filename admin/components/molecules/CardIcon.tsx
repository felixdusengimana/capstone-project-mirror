"use client";

import { ComponentProps } from "react";
import Icon, { IconNames } from "../atoms/Icon";

interface CardIconProps extends ComponentProps<"svg"> {
  icon: IconNames;
  hovered?: boolean;
  onClick?: () => void;
  link?: string;
}
export default function CardIcon({
  icon,
  hovered,
  className,
  onClick,
  children,
  link,
  ...rest
}: CardIconProps) {
  return !link ? (
    <button
      className={`relative z-10 w-fit h-fit`}
      onClick={() => {
        onClick?.();
      }}
      title={`Click to go to creator ${
        String(icon) == "others" ? "link" : `${icon} profile`
      } `}
    >
      <div
        className={`w-16 h-16 ${
          hovered ? "animated-icon" : ""
        } rounded-[11px] bg-[#1A1A1C] flex items-center justify-center ${className}`}
      >
        <Icon {...rest} name={icon} />
      </div>
    </button>
  ) : (
    <a
      href={link ?? "#"}
      target="_blank"
      className={`relative z-10 w-fit h-fit`}
      title={`Click to go to creator ${
        String(icon) == "others" ? "link" : `${icon} profile`
      } `}
    >
      <div
        className={`w-16 h-16 ${
          hovered ? "animated-icon" : ""
        } rounded-[11px] bg-[#1A1A1C] flex items-center justify-center ${className}`}
      >
        <Icon {...rest} name={icon} />
      </div>
    </a>
  );
}

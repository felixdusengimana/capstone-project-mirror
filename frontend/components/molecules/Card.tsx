"use client";
import { MouseEvent, ReactNode, useState } from "react";
import { IconNames } from "../atoms/Icon";
import CardIcon from "./CardIcon";

interface CardProps {
  icon?: IconNames;
  title?: ReactNode | string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  glow?: boolean;
}

export default function Card({ ...props }: CardProps) {
  const { icon, title, glow, containerClassName, ...rest } = props;
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const xPercent = (clientX - left) / width;
    const yPercent = (clientY - top) / height;

    let newLocation: string;
    if (xPercent <= 0.25) {
      newLocation = "to left";
    } else if (xPercent >= 0.75) {
      newLocation = "to right";
    } else if (yPercent <= 0.25) {
      newLocation = "to top";
    } else if (yPercent >= 0.75) {
      newLocation = "to bottom";
    } else {
      newLocation = "to right"; // Default
    }

    setHovered(true);
    document.documentElement.style.setProperty(
      "--animated-card-direction",
      newLocation
    );
  };

  return (
    <div
      onMouseMove={glow ? handleMouseMove : () => {}}
      onMouseLeave={() => setHovered(false)}
      className={`bg-[#171719] ${
        glow
          ? "animated-card"
          : "transition-all duration-150 hover:bg-[#232326]"
      } relative h-full w-full cursor-pointer p-8 rounded-[23px] ${containerClassName}`}
    >
      {icon && <CardIcon hovered={hovered} icon={icon} />}
      <h1 className="text-2xl text-white font-mono font-normal mt-6 w-full">
        {title}
      </h1>
      <div
        className={`text-[#8A8A8B] font-normal text-xl mt-4 max-w-[333px] ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  );
}

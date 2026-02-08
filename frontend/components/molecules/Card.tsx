import { ComponentProps, ReactNode } from "react";
import { IconNames } from "../atoms/Icon";
import Headline from "../atoms/Headline";
import CardIcon from "./CardIcon";

interface CardProps {
  icon?: IconNames;
  title?: ReactNode | string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export default function Card({ ...props }: CardProps) {
  const { icon, title, containerClassName, ...rest } = props;
  return (
    <div
      className={`bg-[#171719] p-8 rounded-[23px] w-full  ${containerClassName}`}
    >
      {icon && <CardIcon icon={icon} />}
      <Headline className="text-2xl font-normal mt-6 w-full">{title}</Headline>
      <div
        className={`text-[#8A8A8B] font-normal text-xl mt-4 max-w-[333px] ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  );
}

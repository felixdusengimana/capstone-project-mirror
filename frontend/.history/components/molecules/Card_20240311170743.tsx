import { ComponentProps, ReactNode } from "react";
import { IconNames } from "../atoms/Icon";
import Headline from "../atoms/Headline";
import CardIcon from "./CardIcon";

interface CardProps {
  icon?: IconNames;
  title?: ReactNode | string;
  className?: string;
  children: ReactNode;
}

export default function Card({ ...props }: CardProps) {
  const { icon, title, ...rest } = props;
  return (
    <div className={`bg-[#171719] p-8 rounded-[23px]`}>
      {icon && <CardIcon icon={icon} />}
      <Headline className="text-2xl font-normal mt-6 w-full">{title}</Headline>
      <div
        className={`text-gray-600 font-normal text-xl mt-4 max-w-[333px] ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  );
}

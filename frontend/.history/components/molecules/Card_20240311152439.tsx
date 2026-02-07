import { ComponentProps, ReactNode } from "react";
import Icon, { IconNames } from "../atoms/Icon";
import Headline from "../atoms/Headline";

interface CardProps extends ComponentProps<"div"> {
  icon?: IconNames;
  title?: string;
}

export default function Card({ ...props }: CardProps) {
  const { icon, title, ...rest } = props;
  return (
    <div {...rest} className={`bg-[#171719] p-8 rounded-[23px]`}>
      {icon && (
        <div className="w-16 h-16 rounded-[11px] bg-[#1A1A1C] flex items-center justify-center">
          <Icon name={icon} />
        </div>
      )}
      <Headline className="text-2xl font-normal mt-6">{title}</Headline>
      <p
        className={`text-gray-600 font-normal text-xl mt-4 max-w-[333px] ${props.className}`}
      >
        {props.children}
      </p>
    </div>
  );
}

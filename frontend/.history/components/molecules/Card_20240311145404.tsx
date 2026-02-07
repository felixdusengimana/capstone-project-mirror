import { ComponentProps, ReactNode } from "react";
import Icon, { IconNames } from "../atoms/Icon";

interface CardProps extends ComponentProps<"div"> {
  icon?: IconNames;
  title: ReactNode;
  description: ReactNode;
}

export default function Card({ ...props }: CardProps) {
  const { icon, ...rest } = props;
  return (
    <div {...rest}>
      {icon && (
        <div className="w-16 h-16 rounded-[11px] bg-[#1A1A1C]">
          <Icon name={icon} />
        </div>
      )}
    </div>
  );
}

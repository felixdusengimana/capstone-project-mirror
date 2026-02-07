import { ComponentProps } from "react";
import Icon, { IconNames } from "../atoms/Icon";

interface CardProps extends ComponentProps<"div"> {
  icon?: IconNames;
}

export default function Card({ ...props }: CardProps) {
  const { icon, ...rest } = props;
  return (
    <div {...rest}>
      {icon && (
        <div className="w-16 h-16 rounded-[11px]">
          <Icon name={icon} />
        </div>
      )}
    </div>
  );
}

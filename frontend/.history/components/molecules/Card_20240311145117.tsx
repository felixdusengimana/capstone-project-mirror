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
        <div className="">
          <Icon name={icon} />
        </div>
      )}
    </div>
  );
}

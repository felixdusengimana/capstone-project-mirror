import { ComponentProps } from "react";
import { IconNames } from "../atoms/Icon";

interface CardProps extends ComponentProps<"div"> {
  icon?: IconNames;
}

export default function Card({ ...props }: CardProps) {
  const { icon, ...rest } = props;
  return <div {...rest}>Card</div>;
}

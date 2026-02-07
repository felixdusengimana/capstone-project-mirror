import { ComponentProps } from "react";
import { IconNames } from "../atoms/Icon";

interface CardProps extends ComponentProps<"div"> {
  icon?: IconNames;
}

export default function Card() {
  return <div>Card</div>;
}

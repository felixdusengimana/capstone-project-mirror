import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export default function Button({ ...props }: ButtonProps) {
  return <div>Button</div>;
}

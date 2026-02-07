import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export default function Button({ ...props }: ButtonProps) {
  return <button {...props}>Button</button>;
}

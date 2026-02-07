import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export default function Button({ ...props }: ButtonProps) {
  return <button {...props}>{props.children}</button>;
}

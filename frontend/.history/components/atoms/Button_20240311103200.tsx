import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "dark" | "white" | "blurred";
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
}

export default function Button({ ...props }: ButtonProps) {
  return (
    <button {...props} className={` ${props.className}`}>
      {props.children}
    </button>
  );
}

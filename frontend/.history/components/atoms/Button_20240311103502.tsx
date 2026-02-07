import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "dark" | "white" | "blurred";
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
}

export default function Button({ ...props }: ButtonProps) {
  const { variant = "dark", size = "md", bordered = false } = props;

  const variantClasses = {
    dark: "bg-black text-white",
    white: "bg-white text-black",
    blurred: "bg-blurred text-white",
  };

  const sizeClasses = {
    sm: "px-2 py-1",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  return (
    <button {...props} className={` ${props.className}`}>
      {props.children}
    </button>
  );
}

import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "dark" | "white" | "blurred" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
  outline?: boolean;
}

export default function Button({ ...props }: ButtonProps) {
  const {
    variant = "dark",
    size = "md",
    bordered = false,
    outline = false,
  } = props;

  const variantClasses = {
    dark: "bg-black text-white",
    white: "bg-white text-black",
    secondary: "bg-secondary text-white",
    blurred: "bg-blurred text-white",
    danger: "bg-red-600 text-white",
  };

  const sizeClasses = {
    sm: "px-2 py-1",
    md: "px-8 py-4",
    lg: "px-6 py-3",
  };

  const borderClasses = bordered ? "border border-black" : "";

  return (
    <button
      {...props}
      className={`text-xl font-normal rounded-full ${
        outline ? "border border-gray-200" : variantClasses[variant]
      } ${sizeClasses[size]} ${borderClasses} ${props.className}`}
    >
      {props.children}
    </button>
  );
}

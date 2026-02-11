import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?:
    | "dark"
    | "white"
    | "blurred"
    | "secondary"
    | "danger"
    | "danger-reverse"
    | "gray"
    | "success"
    | "none";
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
    disabled,
  } = props;

  const variantClasses = {
    dark: "bg-black text-white",
    white: "bg-white text-black",
    secondary: "bg-secondary text-white",
    blurred: "bg-blurred text-white",
    danger: "bg-red-600 text-white",
    "danger-reverse": "bg-red-50 text-red-600",
    gray: "bg-gray-200 text-[#4B5563]",
    success: "bg-[#ECFDF5] text-green-600",
    none: "",
  };

  const sizeClasses = {
    sm: "lg:px-2 px-1",
    md: "lg:px-8 px-6 px-4 lg:py-4 py-2",
    lg: "lg:px-6 px-4 lg:py-3 py-2",
  };

  const borderClasses = bordered ? "border border-black" : "";

  return (
    <button
      {...props}
      className={`lg:text-xl md:text-lg text-base font-normal rounded-full ${
        outline ? "border border-gray-200" : variantClasses[variant]
      } ${sizeClasses[size]} ${borderClasses} ${props.className} ${
        disabled ? "opacity-65 cursor-not-allowed" : ""
      }`}
    >
      {props.children}
    </button>
  );
}

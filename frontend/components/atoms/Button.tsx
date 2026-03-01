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
  isLoading?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    variant = "dark",
    size = "md",
    bordered = false,
    outline = false,
    isLoading,
    disabled,
    ...rest
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
  const isDisabled = isLoading || disabled;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={`flex items-center justify-center gap-1 lg:text-xl md:text-lg text-base font-normal rounded-full ${
        outline ? "border border-gray-200" : variantClasses[variant]
      } ${sizeClasses[size]} ${borderClasses} ${props.className} ${
        isDisabled ? "opacity-65 cursor-not-allowed" : ""
      }`}
    >
      {isLoading && (
        <div className="w-3 h-3 rounded-full border border-t-0 border-gray-200 animate-spin"></div>
      )}
      {props.children}
    </button>
  );
}

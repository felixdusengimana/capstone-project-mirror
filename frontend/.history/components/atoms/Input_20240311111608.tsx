import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
}

export default function Input({ ...props }: InputProps) {
  return (
    <div>
      <input {...props} className={`${props.className}`} />
    </div>
  );
}

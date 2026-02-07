import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
}

export default function Input({ ...props }: InputProps) {
  const { label } = props;
  return (
    <div>
      <input {...props} className={`${props.className}`} />
    </div>
  );
}

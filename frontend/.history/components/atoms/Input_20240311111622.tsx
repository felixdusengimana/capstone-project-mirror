import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
}

export default function Input({ ...props }: InputProps) {
  const { label } = props;
  return (
    <div>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input {...props} className={`${props.className}`} />
    </div>
  );
}

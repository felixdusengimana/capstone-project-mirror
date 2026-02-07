import { ComponentProps, useId } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
}

export default function Input({ ...props }: InputProps) {
  const { label } = props;
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={props.id ?? id}>{label}</label>}
      <input {...props} className={`${props.className}`} id={props.id ?? id} />
    </div>
  );
}

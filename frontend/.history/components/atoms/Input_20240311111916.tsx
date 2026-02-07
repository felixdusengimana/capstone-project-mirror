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
      <input
        {...props}
        className={`bg-slate-50 py-[13px] px-4 border border-slate-400 ${props.className}`}
        id={props.id ?? id}
      />
    </div>
  );
}

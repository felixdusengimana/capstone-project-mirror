"use client";
import { ComponentProps, ReactNode, useId, useState } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  labelStyle?: string;
  left?: ReactNode;
  right?: ReactNode;
}

export default function Input({ value, onChange, ...props }: InputProps) {
  const { label, labelStyle, left, right } = props;
  const [localValue, setLocalValue] = useState(value || "");
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`${props.className}`}>
      {label && (
        <label
          className={`text-[#64748A] text-sm font-normal mb-1 ${labelStyle}`}
          htmlFor={props.id ?? id}
        >
          {label}
        </label>
      )}
      <div
        className={`w-full flex items-center px-4 bg-slate-50 border rounded-xl  border-[#E5E9F0]`}
      >
        {left && <>{left}</>}
        <input
          {...props}
          value={localValue}
          onChange={handleChange}
          className={`outline-none w-full py-[13px] bg-slate-50 text-black`}
          id={props.id ?? id}
        />
        {right && <>{right}</>}
      </div>
    </div>
  );
}

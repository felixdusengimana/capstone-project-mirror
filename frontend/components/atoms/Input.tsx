"use client";
import { ComponentProps, ReactNode, useId, useState } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  labelStyle?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Input({ ...props }: InputProps) {
  const { label, labelStyle, leftIcon } = props;
  const [value, setValue] = useState(props.value ?? "");
  const id = useId();

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
        {leftIcon && <>{leftIcon}</>}
        <input
          {...props}
          value={value}
          defaultValue={props.defaultValue ?? props.value}
          onChange={(e) => setValue(e.target.value)}
          className={`outline-none w-full py-[13px] bg-slate-50 text-black`}
          id={props.id ?? id}
        />
        {props.rightIcon && <>{props.rightIcon}</>}
      </div>
    </div>
  );
}

"use client";
import { ComponentProps, ReactNode, useEffect, useId, useState } from "react";
import Icon from "./Icon";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  labelStyle?: string;
  left?: ReactNode;
  right?: ReactNode;
}

export default function Input({ value, onChange, ...props }: InputProps) {
  const { label, labelStyle, left, right, type = "text" } = props;
  const [localValue, setLocalValue] = useState("");
  const isPassword = props.type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unFormatted =
      type === "number"
        ? e.target.value.replace(/[^0-9]/g, "")
        : e.target.value;
    const formatted =
      type === "number" && Boolean(e.target.value)
        ? Number(unFormatted).toLocaleString()
        : unFormatted;
    setLocalValue(formatted);
    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: unFormatted,
        },
      });
    }
  };

  useEffect(() => {
    setLocalValue(
      (type === "number" ? value?.toLocaleString() : String(value ?? "")) || ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
          type={
            isPassword && showPassword
              ? "text"
              : type === "number"
              ? "text"
              : type
          }
          value={localValue}
          onChange={handleChange}
          className={`outline-none w-full py-[13px] bg-slate-50 text-black`}
          id={props.id ?? id}
        />
        {right ||
          (isPassword && (
            <div className="flex items-center gap-2">
              {right}
              {isPassword && (
                <Icon
                  name="eye"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

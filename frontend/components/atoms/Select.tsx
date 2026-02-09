import { ComponentProps, ReactNode, useId } from "react";
import Icon from "./Icon";

export interface IOption {
  value: string;
  label: string | ReactNode;
}
interface SelectProps extends ComponentProps<"select"> {
  label?: string;
  labelStyle?: string;
  left?: ReactNode;
  placeholder?: string;
}

export default function Select({ value, onChange, ...props }: SelectProps) {
  const { label, labelStyle, left, placeholder } = props;
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
        {left && <>{left}</>}
        <select
          {...props}
          className={`appearance-none outline-none w-full py-[13px] bg-slate-50 text-black`}
          id={props.id ?? id}
          value={value}
          onChange={onChange}
        >
          {placeholder && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {props.children}
        </select>
        <Icon name="dropdown" />
      </div>
    </div>
  );
}

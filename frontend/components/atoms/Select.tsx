"use client";
import { ComponentProps, ReactNode, useId } from "react";
import Icon from "./Icon";
import { useTranslations } from "next-intl";
import { getValidationMessageKey } from "@/i18n/validation";

export interface IOption {
  value: string;
  label: string | ReactNode;
}
interface SelectProps extends ComponentProps<"select"> {
  label?: string;
  labelStyle?: string;
  left?: ReactNode;
  placeholder?: string;
  isLoading?: boolean;
  error?: string | JSX.Element;
}

export default function Select(props: SelectProps) {
  const validation = useTranslations("validation");
  const {
    label,
    labelStyle,
    left,
    placeholder,
    isLoading,
    disabled,
    onChange,
    value = "",
    error,
    ...rest
  } = props;
  const id = useId();
  const validationKey =
    typeof error === "string" ? getValidationMessageKey(error) : undefined;
  const localizedError = validationKey ? validation(validationKey) : error;
  const isDisabled = disabled || isLoading;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        className={`w-full flex items-center px-4 ${
          localizedError ? "border-red-400 bg-red-50" : "border-[#E5E9F0] bg-slate-50"
        } ${isDisabled ? "bg-slate-300" : ""} border rounded-xl`}
      >
        {left && <>{left}</>}
        <select
          disabled={isDisabled}
          {...rest}
          className={`appearance-none outline-none w-full py-[13px] text-black disabled:bg-slate-300  ${
            localizedError ? "border-red-400 bg-red-50" : "bg-slate-50 "
          }`}
          id={props.id ?? id}
          value={value}
          onChange={handleChange}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {props.children}
        </select>
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border border-t border-white  border-t-gray-900 "></div>
        ) : (
          <Icon name="dropdown" />
        )}
      </div>
      {Boolean(localizedError) &&
        (typeof localizedError === "string" ? (
          <p className="text-red-500 text-sm mt-1">{localizedError}</p>
        ) : (
          localizedError
        ))}
    </div>
  );
}

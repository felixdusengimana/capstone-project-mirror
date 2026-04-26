import { ComponentProps, useId } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label?: string;
  labelStyle?: string;
  error?: string | JSX.Element;
}

export default function TextArea({ ...props }: TextAreaProps) {
  const { label, labelStyle, error } = props;
  const id = useId();

  return (
    <div>
      {label && (
        <label
          className={`text-[#64748A] text-sm font-normal mb-1 ${labelStyle}`}
          htmlFor={props.id ?? id}
        >
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={`py-[13px] min-h-[102px] px-4 border text-black outline-none w-full rounded-xl ${
          error ? "border-orange-300 bg-slate-50" : "border-[#E5E9F0] bg-slate-50 "
        } ${props.className}`}
        id={props.id ?? id}
      />
      {Boolean(error) &&
        (typeof error === "string" ? (
          <p className="text-orange-400 text-sm mt-1">{error}</p>
        ) : (
          error
        ))}
    </div>
  );
}

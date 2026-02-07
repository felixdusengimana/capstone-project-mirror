import { ComponentProps, useId } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label?: string;
  labelStyle?: string;
}

export default function TextArea({ ...props }: TextAreaProps) {
  const { label, labelStyle } = props;
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
        className={`bg-slate-50 py-[13px] min-h-[102px] px-4 border border-[#E5E9F0] text-black outline-none w-full rounded-xl ${props.className}`}
        id={props.id ?? id}
      />
    </div>
  );
}

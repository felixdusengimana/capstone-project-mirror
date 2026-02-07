import { ComponentProps } from "react";

interface HeadlineProps extends ComponentProps<"h1"> {}

export default function Headline({
  className = "text-white",
  ...props
}: HeadlineProps) {
  return <div className={`font-mono ${className}`}>{props.children}</div>;
}

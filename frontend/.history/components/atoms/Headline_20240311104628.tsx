import { ComponentProps } from "react";

interface HeadlineProps extends ComponentProps<"h1"> {}

export default function Headline({ ...props }: HeadlineProps) {
  return <div className="font-mono">{}</div>;
}

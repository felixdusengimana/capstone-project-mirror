import { ComponentProps } from "react";

interface PillProps extends ComponentProps<"div"> {
  variant?: "primary" | "secondary" | "tertiary";
}
export default function Pill() {
  return <div>Pill</div>;
}

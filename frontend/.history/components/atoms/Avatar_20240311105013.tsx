import { ComponentProps } from "react";

interface AvatarProps extends ComponentProps<"div"> {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  circle?: boolean;
}
export default function Avatar() {
  return <div>Avatar</div>;
}

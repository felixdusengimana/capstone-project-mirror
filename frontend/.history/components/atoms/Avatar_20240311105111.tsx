import { ComponentProps } from "react";

interface AvatarProps extends ComponentProps<"div"> {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  circle?: boolean;
  bordered?: boolean;
}
export default function Avatar({ ...props }: AvatarProps) {
  const { src, alt, size, circle = true, bordered, ...rest } = props;

  return <div>Avatar</div>;
}

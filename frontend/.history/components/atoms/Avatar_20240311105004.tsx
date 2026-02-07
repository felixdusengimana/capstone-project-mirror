import { ComponentProps } from "react";

interface AvatarProps extends ComponentProps<"div"> {
  src: string;
  alt?: string;
}
export default function Avatar() {
  return <div>Avatar</div>;
}

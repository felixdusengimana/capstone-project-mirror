import { ComponentProps } from "react";
import { IconNames } from "../atoms/Icon";
import CardIcon from "./CardIcon";

interface SmallCardProps extends ComponentProps<"div"> {
  icon: IconNames;
  title: string;
}

export default function SmallCard({ ...props }: SmallCardProps) {
  return (
    <div className="flex gap-6">
      <CardIcon icon={props.icon} />
      <p className="text-gray-600 font-normal text-xl">
        <span className="text-white font-mono">{props.title} </span>
        {props.children}
      </p>
    </div>
  );
}

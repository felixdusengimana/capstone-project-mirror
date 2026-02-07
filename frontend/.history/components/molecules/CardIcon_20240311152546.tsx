import React from "react";
import Icon, { IconNames } from "../atoms/Icon";

export default function CardIcon({ icon }: { icon: IconNames }) {
  return (
    <div className="w-16 h-16 rounded-[11px] bg-[#1A1A1C] flex items-center justify-center">
      <Icon name={icon} />
    </div>
  );
}

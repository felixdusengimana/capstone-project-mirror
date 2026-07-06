import React from "react";
import Icon from "../atoms/Icon";

export default function DateRagePicker() {
  return (
    <div className="bg-gray-50 border border-white text-[#0000008A] font-normal items-center gap-2 cursor-pointer rounded-md px-4 py-2 text-sm flex">
      <Icon name="calendar" />
      <p>Sept 1 - Sept 14</p>
    </div>
  );
}

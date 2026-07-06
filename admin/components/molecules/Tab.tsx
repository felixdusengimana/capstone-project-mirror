import React, { ReactNode } from "react";

interface ITab {
  active?: boolean;
  label: string | ReactNode;
  value?: string;
}

interface TabProps {
  tabs: ITab[];
  onClick?: (tab: ITab, index?: number) => void;
}

export default function Tab({ tabs = [], onClick }: TabProps) {
  return (
    <div className="flex px-3 border-b border-[#E5E9F0]">
      {tabs.map((tab, i) => (
        <button
          // onClick={() => {
          //   onClick?.(tab, i);
          // }}
          key={i}
          className={`${
            tab.active
              ? "text-black border border-b-2 -mb-[1px] border-b-white"
              : "text-[#9CA3AF] border-b-0"
          } cursor-pointer p-3 rounded-t-lg font-medium text-sm bg-white`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

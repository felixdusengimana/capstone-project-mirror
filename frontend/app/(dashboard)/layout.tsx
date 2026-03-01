"use client";
import { IconNames } from "@/components/atoms/Icon";
import Sidebar from "@/components/organisms/Sidebar";
import { ReactNode, useState } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  const links = [
    {
      label: "Home",
      icon: "dashboard",
      href: "/dashboard",
    },
    {
      label: "Payouts",
      icon: "payouts",
      href: "/payouts",
    },
    // {
    //   label: "Supporters",
    //   icon: "flash",
    //   href: "/supporters",
    // },
    {
      label: "Settings",
      icon: "settings",
      href: "/settings",
    },
  ] as { label: string; icon: IconNames; href: string }[];

  return (
    <div className="zoom h-screen flex bg-white relative">
      <div className={`bg-white sticky top-0 h-screen`}>
        <Sidebar links={links} />
      </div>
      <div className="flex-grow bg-[#F0F2F7] overflow-auto pt-[112px]">
        {children}
      </div>
    </div>
  );
}

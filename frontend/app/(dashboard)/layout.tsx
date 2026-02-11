"use client";
import { IconNames } from "@/components/atoms/Icon";
import Sidebar from "@/components/organisms/Sidebar";
import { ReactNode, useState } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

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
    <div className="h-screen flex bg-white relative">
      <div
        className={`bg-white ${
          showSidebar ? "block" : "hidden"
        } absolute lg:relative lg:block`}
      >
        <Sidebar links={links} />
      </div>
      <div className="flex-grow bg-[#F0F2F7] overflow-auto pt-0 lg:pt-[112px]">
        {/* <div className="lg:hidden py-4">
          <Button onClick={() => setShowSidebar(!showSidebar)}>
            Open Sidebar
          </Button>
        </div> */}
        {children}
      </div>
    </div>
  );
}

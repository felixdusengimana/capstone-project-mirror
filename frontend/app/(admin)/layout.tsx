"use client";
import { IconNames } from "@/components/atoms/Icon";
import Sidebar from "@/components/organisms/Sidebar";
import { ReactNode, Suspense, useState } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const links = [
    {
      label: "Home",
      icon: "dashboard",
      href: "/ad",
    },
    {
      label: "Transactions",
      icon: "transactions",
      href: "/ad/transactions",
    },
    // {
    //   label: "Supporters",
    //   icon: "flash",
    //   href: "/supporters",
    // },
    {
      label: "Payouts",
      icon: "payouts",
      href: "/ad/payouts",
    },
  ] as { label: string; icon: IconNames; href: string }[];

  return (
    <div className="h-screen flex bg-white relative">
      <div
        className={`bg-white ${
          showSidebar ? "block" : "hidden"
        } absolute lg:relative lg:block`}
      >
        <Sidebar links={links} isAdmin />
      </div>
      <Suspense>{children}</Suspense>
    </div>
  );
}

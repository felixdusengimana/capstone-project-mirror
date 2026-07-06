"use client";
import { IconNames } from "@/components/atoms/Icon";
import Sidebar from "@/components/organisms/Sidebar";
import { ReactNode, Suspense } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  const links = [
    {
      label: "Home",
      icon: "dashboard",
      href: "/dashboard",
    },
    {
      label: "Transactions",
      icon: "transactions",
      href: "/transactions",
    },
    // {
    //   label: "Supporters",
    //   icon: "flash",
    //   href: "/supporters",
    // },
    {
      label: "Payouts",
      icon: "payouts",
      href: "/payouts",
    },
    {
      label: "Configurations",
      icon: "settings",
      href: "/configurations",
    },
  ] as { label: string; icon: IconNames; href: string }[];

  return (
    <div className="min-h-screen flex bg-white relative">
      <div className={`bg-white sticky top-0 h-screen`}>
        <Sidebar links={links} />
      </div>
      <Suspense>{children}</Suspense>
    </div>
  );
}

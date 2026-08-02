"use client";
import { IconNames } from "@/components/atoms/Icon";
import AdminNavbar from "@/components/organisms/AdminNavbar";
import Sidebar from "@/components/organisms/Sidebar";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("dashboard");
  const links = [
    {
      label: t("home"),
      icon: "dashboard",
      href: "/dashboard",
    },
    {
      label: t("payouts"),
      icon: "payouts",
      href: "/payouts",
    },
    // {
    //   label: "Supporters",
    //   icon: "flash",
    //   href: "/supporters",
    // },
    {
      label: t("settings"),
      icon: "settings",
      href: "/settings",
    },
  ] as { label: string; icon: IconNames; href: string }[];

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white relative">
      <div className={`bg-white sticky top-0 hidden md:block`}>
        <Sidebar links={links} />
      </div>
      <div className="md:hidden">
        <AdminNavbar links={links} />
      </div>
      <div className="flex-grow bg-[#F0F2F7] overflow-auto pt-4 px-3 md:px-0 md:pt-[112px]">
        {children}
      </div>
    </div>
  );
}

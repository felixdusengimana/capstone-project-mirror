"use client";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import Profile from "../molecules/Profile";
import Icon, { IconNames } from "../atoms/Icon";
import Link from "next/link";

interface SidebarProps extends ComponentProps<"div"> {}

export default function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();
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
    {
      label: "Supporters",
      icon: "flash",
      href: "/supporters",
    },
    {
      label: "Settings",
      icon: "settings",
      href: "/settings",
    },
  ] as { label: string; icon: IconNames; href: string }[];

  return (
    <div
      {...props}
      className={`w-[393px] pt-[112px] pl-[91px] pr-[78px] border-r border-gray-300 overflow-hidden ${className}`}
    >
      <Profile
        user={{
          name: "Nziranziza Rafael",
          photo: "/profiles/profile1.png",
          username: "Rafael02",
        }}
      />

      <div className="mt-20">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 text-base py-2.5 px-4 rounded-lg ${
              pathname === link.href
                ? "bg-[#F5F7FF] text-gray-600 font-medium"
                : "text-[#64748A] font-normal"
            }`}
          >
            <Icon
              name={link.icon}
              fill={pathname === link.href ? "#4B5563" : "#6B7280"}
              stroke={pathname === link.href ? "#4B5563" : "#6B7280"}
            />
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

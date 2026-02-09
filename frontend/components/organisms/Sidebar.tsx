"use client";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import Profile from "../molecules/Profile";
import Icon, { IconNames } from "../atoms/Icon";
import Link from "next/link";
import Image from "next/image";
import Button from "../atoms/Button";
import dynamic from "next/dynamic";
const VerifyAccount = dynamic(
  () => import("@/components/molecules/VerifyAccount"),
  { ssr: false }
);

interface SidebarProps extends ComponentProps<"div"> {
  links: { label: string; icon: IconNames; href: string }[];
  isAdmin?: boolean;
}

export default function Sidebar({
  className,
  links = [],
  isAdmin,
  ...props
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      {...props}
      className={`w-[393px] pt-[64px] pl-[72px] pr-[71px] border-r border-gray-300 overflow-x-hidden h-full flex flex-col justify-between pb-6 ${className}`}
    >
      <div>
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

      {!isAdmin && (
        <div className="flex flex-col mt-[96px] mb-[76px] gap-[15px] items-center justify-center bg-gray-50 border border-gray-200 px-[39px] py-[31px] rounded-lg">
          <Image alt="" src="/dance.svg" width={204} height={130} />
          <p className="text-center text-[#475569] text-sm font-normal">
            Verify your account now to unlock exclusive benefits!
          </p>
          <VerifyAccount />
        </div>
      )}

      <div>
        <Button
          onClick={() => {
            window.location.href = "/login";
          }}
          outline
          className="text-gray-900 flex gap-1 items-center"
        >
          <Icon name="logout" />
          <p>Logout</p>
        </Button>
      </div>
    </div>
  );
}

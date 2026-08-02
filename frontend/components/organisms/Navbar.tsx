"use client";
import Button from "../atoms/Button";
import Link from "next/link";
import Logo from "../molecules/Logo";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../molecules/LanguageSwitcher";
// import { useAuth } from "@/hooks/useAuth";
// import { Fragment, useEffect, useState } from "react";
// import Icon, { IconNames } from "../atoms/Icon";
// import { useRouter } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("navigation");
  // const isLoggedIn = false;
  // const [linkOpen, setLinkOpen] = useState(false);
  // const [isAnimating, setIsAnimating] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   if (linkOpen) {
  //     setIsAnimating(true);
  //   } else {
  //     const timer = setTimeout(() => setIsAnimating(false), 300);
  //     return () => clearTimeout(timer);
  //   }
  // }, [linkOpen]);

  // const links = [
  //   {
  //     label: "Home",
  //     href: "/",
  //   },
  //   {
  //     label: "Signup Free",
  //     href: "/sign-up",
  //   },
  //   {
  //     label: "Login",
  //     href: "/login",
  //   },
  // ] as { label: string; href: string }[];

  return (
    <div className="relative">
      <div className="page-padding w-full flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-3 md:gap-6">
          <LanguageSwitcher className="hidden md:flex" />
          {/* Hamburger toggler — commented out for mobile, links shown directly instead */}
          {/* <Icon
            fill="#fff"
            name={linkOpen ? "close" : "hamburger-menu2"}
            className={`md:hidden cursor-pointer`}
            onClick={() => setLinkOpen(!linkOpen)}
          /> */}

          {/* Mobile: plain text links */}
          <Link href={"/login"} className="md:hidden text-white font-normal text-base">
            {t("login")}
          </Link>
          <Link href={"/sign-up"} className="md:hidden text-white font-normal text-base">
            {t("join")}
          </Link>

          {/* Desktop: button styles */}
          <Link href={"/login"} className="hidden md:block">
            <Button variant="secondary">{t("login")}</Button>
          </Link>
          <Link href={"/sign-up"} className="hidden md:block">
            <Button variant="white" className="font-semibold">
              {t("signUpFree")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Dropdown menu — commented out, links shown directly above instead */}
      {/* {(linkOpen || isAnimating) && (
        <div
          className={`absolute px-4 py-4 bg-[var(--bg)] w-full z-50 flex flex-col justify-center
              transition-opacity duration-300 ease-in-out
              ${linkOpen ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`transition-transform duration-300 ease-in-out
                   ${linkOpen ? "translate-y-0" : "-translate-y-10"}`}
          >
            {links.map((link) => (
              <p
                key={link.label}
                onClick={() => {
                  router.push(link.href);
                  setLinkOpen(false);
                }}
                className="flex items-center cursor-pointer gap-2 py-2 font-sans font-semibold text-lg"
              >
                <span className="text-white">{link.label}</span>
              </p>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

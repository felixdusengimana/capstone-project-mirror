"use client";
import Button from "../atoms/Button";
import Link from "next/link";
import Logo from "../molecules/Logo";
import { useAuth } from "@/hooks/useAuth";
import { Fragment, useEffect, useState } from "react";
import Icon, { IconNames } from "../atoms/Icon";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const isLoggedIn = false;
  const [linkOpen, setLinkOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (linkOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [linkOpen]);

  const links = [
    {
      label: "Home",
      icon: "dashboard",
      href: "/",
    },
    {
      label: "Login",
      icon: "inbox-out",
      href: "/login",
    },
    {
      label: "Register",
      icon: "user-star",
      href: "/sign-up",
    },
  ] as { label: string; icon: IconNames; href: string }[];

  return (
    <div className="page-padding w-full flex justify-between items-center">
      <Logo />

      <div className="flex items-center gap-6">
        <Icon
          stroke="#FFF"
          name="hamburger-menu"
          className={`md:hidden cursor-pointer ${linkOpen ? "hidden" : ""}`}
          onClick={() => setLinkOpen(true)}
        />
        {(linkOpen || isAnimating) && (
          <div
            className={`fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col justify-center
                      transition-opacity duration-300 ease-in-out
                      ${linkOpen ? "opacity-100" : "opacity-0"}`}
          >
            <div onClick={() => setLinkOpen(false)}>
              <Icon
                name="close"
                className="absolute top-4 right-4"
                width={40}
                height={40}
              />
            </div>
            <div
              className={`mx-auto transition-transform duration-300 ease-in-out
                           ${linkOpen ? "translate-y-0" : "-translate-y-10"}`}
            >
              {links.map((link) => (
                <p
                  key={link.label}
                  onClick={() => {
                    router.push(link.href);
                    setLinkOpen(false);
                  }}
                  className="flex items-center cursor-pointer gap-2 py-2"
                >
                  <Icon name={link.icon} />
                  <span className="text-black">{link.label}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        <Link href={"/login"} className="hidden md:block">
          <Button variant="secondary">Login</Button>
        </Link>
        <Link href={"/sign-up"} className="hidden md:block">
          <Button variant="white" className="font-semibold">
            Sign up free
          </Button>
        </Link>
      </div>
    </div>
  );
}

import React, { ComponentProps, useState, useEffect } from "react";
import Icon, { IconNames } from "../atoms/Icon";
import Logo from "../molecules/Logo";
import { useRouter } from "next/navigation";

interface Navbar extends ComponentProps<"div"> {
  links: { label: string; icon: IconNames; href: string }[];
}

export default function AdminNavbar({ links }: Navbar) {
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

  return (
    <div className="px-4 py-5 flex justify-between">
      <Logo type="dark" />
      <Icon name="hamburger-menu" onClick={() => setLinkOpen(true)} />
      {(linkOpen || isAnimating) && (
        <div
          className={`fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col justify-center
                      transition-opacity duration-300 ease-in-out
                      ${linkOpen ? "opacity-100" : "opacity-0"}`}
        >
          <Icon
            name="close"
            className="absolute top-4 right-4"
            width={40}
            height={40}
            onClick={() => setLinkOpen(false)}
          />
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
    </div>
  );
}

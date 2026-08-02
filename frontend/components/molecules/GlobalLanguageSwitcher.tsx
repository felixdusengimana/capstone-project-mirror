"use client";

import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const routesWithNavbar = new Set(["/", "/privacy-policy", "/terms-of-use"]);

export default function GlobalLanguageSwitcher() {
  const pathname = usePathname();
  const isRenderedInNavbar = routesWithNavbar.has(pathname);

  return (
    <LanguageSwitcher
      className={isRenderedInNavbar ? "md:hidden" : ""}
      floating
    />
  );
}

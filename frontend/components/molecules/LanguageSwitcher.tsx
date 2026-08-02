"use client";

import { AppLocale, localeCookie, locales } from "@/i18n/config";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

const localeFlags: Record<AppLocale, string> = {
  en: "🇬🇧",
  rw: "🇷🇼",
  fr: "🇫🇷",
};

interface LanguageSwitcherProps {
  className?: string;
  floating?: boolean;
}

export default function LanguageSwitcher({
  className = "",
  floating = false,
}: LanguageSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function changeLanguage(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as AppLocale;
    document.cookie = `${localeCookie}=${nextLocale};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.lang = nextLocale;
    startTransition(() => router.refresh());
  }

  return (
    <label
      className={`${
        floating ? "fixed right-4 top-4" : "relative"
      } z-[100] flex items-center rounded-full border border-white/20 bg-[#171719]/95 px-4 py-3 text-sm text-white shadow-lg backdrop-blur-md ${className}`}
    >
      <span className="sr-only">{t("label")}</span>
      <select
        aria-label={t("label")}
        className="cursor-pointer bg-transparent font-medium text-white outline-none disabled:opacity-60"
        disabled={isPending}
        onChange={changeLanguage}
        value={locale}
      >
        {locales.map((item) => (
          <option className="bg-[#171719] text-white" key={item} value={item}>
            {localeFlags[item]} {t(item)}
          </option>
        ))}
      </select>
    </label>
  );
}

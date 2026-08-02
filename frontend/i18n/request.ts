import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isAppLocale, localeCookie } from "./config";

export default getRequestConfig(async () => {
  const storedLocale = cookies().get(localeCookie)?.value;
  const locale = isAppLocale(storedLocale) ? storedLocale : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Africa/Kigali",
  };
});

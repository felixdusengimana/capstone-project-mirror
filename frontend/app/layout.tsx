import type { Metadata } from "next";
import { Righteous, Outfit, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import Provider from "./provider";
import GlobalLanguageSwitcher from "@/components/molecules/GlobalLanguageSwitcher";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const righteous = Righteous({
  subsets: ["latin"],
  variable: "--font-righteous",
  weight: "400",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: "400" });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {title: t("title"), description: t("description")};
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${outfit.variable} ${inter.variable} ${righteous.variable} font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Africa/Kigali">
          <Toaster />
          <GlobalLanguageSwitcher />
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

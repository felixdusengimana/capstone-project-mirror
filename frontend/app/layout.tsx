import type { Metadata } from "next";
import { Righteous, Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const righteous = Righteous({
  subsets: ["latin"],
  variable: "--font-righteous",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pesatone - Search and gift your favorite creators",
  description:
    "A place where fans show gratitude to the African content creators they love!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${righteous.variable} font-sans`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

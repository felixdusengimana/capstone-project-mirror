import type { Metadata } from "next";
import { Righteous, Outfit, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Provider from "./provider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const righteous = Righteous({
  subsets: ["latin"],
  variable: "--font-righteous",
  weight: "400",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: "400" });

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${outfit.variable} ${inter.variable} ${righteous.variable} font-sans`}>
        <Toaster />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

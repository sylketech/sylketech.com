import type { ReactNode } from "react";
import "./globals.css";
import { cn } from "@/lib/cn";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sylketech.com"),
  title: {
    default: "Sylke Technologies",
    template: "%s - Sylke Technologies",
  },
  description: "Free and open source building blocks for secure, privacy-first web applications.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={cn(inter.variable, "antialiased")}>
      <body>
        <div className="isolate">{children}</div>
      </body>
    </html>
  );
}

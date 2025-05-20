import type { ReactNode } from "react";
import "./globals.css";
import { cn } from "@/lib/cn";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: "Sylke Technologies",
    template: "%s - Sylke Technologies",
  },
  description: "Free and open source building blocks for secure, privacy-first web applications.",
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: "Sylke Technologies",
    description: "Free and open source building blocks for secure, privacy-first web applications.",
    siteName: "Sylke Technologies",
  },
  appleWebApp: {
    title: "Sylke Technologies",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={cn(instrumentSans.variable, "antialiased")}>
      <body>
        <div className="isolate">{children}</div>
      </body>
    </html>
  );
}

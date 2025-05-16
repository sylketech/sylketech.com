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
  metadataBase: new URL("https://sylketech.com"),
  title: {
    default: "Sylke Technologies",
    template: "%s - Sylke Technologies",
  },
  description: "Free and open source building blocks for secure, privacy-first web applications.",
  openGraph: {
    type: "website",
    url: "https://sylketech.com",
    title: "Sylke Technologies",
    description: "Free and open source building blocks for secure, privacy-first web applications.",
    siteName: "Sylke Technologies",
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

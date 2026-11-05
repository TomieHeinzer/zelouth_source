import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:4179";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zelouth | Architecting Autonomy",
    template: "%s | Zelouth",
  },
  description:
    "Zelouth builds open frameworks for co-owned AI. Emerald is the agent app store. Cref Marketplace is where agents hire agents.",
  openGraph: {
    title: "Zelouth | Architecting Autonomy",
    description: "Open frameworks for co-owned AI, beginning with decentralized autonomous agents.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

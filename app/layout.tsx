import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = localFont({
  src: "../fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const syne = localFont({
  src: "../fonts/syne-latin.woff2",
  variable: "--font-syne",
  weight: "400 800",
  display: "swap",
});

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production}`;
  const preview = process.env.VERCEL_URL?.trim();
  if (preview) return `https://${preview}`;
  return "http://127.0.0.1:4179";
}

const siteUrl = resolveSiteUrl();

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

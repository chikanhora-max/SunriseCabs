import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sunrise-cabs.vercel.app"),
  title: { default: "SunriseCabs — Kandy, Sri Lanka", template: "%s — SunriseCabs" },
  description: "SunriseCabs — a premium Kandy mobility showcase for vehicle discovery, travel and rental enquiries across Sri Lanka.",
  keywords: ["Sunrise Cabs Kandy", "Sunrise Rent a Car Kandy", "Sri Lanka car rental", "Kandy car rental", "Wagon R rental Sri Lanka", "KDH rental Kandy", "DFSK Glory rental Sri Lanka", "Colombo airport car rental", "self drive Sri Lanka", "chauffeur Sri Lanka"],
  openGraph: { title: "SunriseCabs — Kandy, Sri Lanka", description: "A premium automotive mobility showcase for SunriseCabs.", type: "website", siteName: "SunriseCabs" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f4f4f1", colorScheme: "light", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}

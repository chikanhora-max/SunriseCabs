import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sunrise-cabs.vercel.app"),
  title: { default: "SunriseCabs — Kandy, Sri Lanka", template: "%s — SunriseCabs" },
  description: "A premium Kandy car-rental and transportation showcase with verified public Sunrise Cabs information, fleet references, rental estimates and direct contact routes.",
  keywords: ["Sunrise Cabs Kandy","Sunrise Rent a Car Kandy","Sri Lanka car rental","Kandy car rental","Wagon R rental Sri Lanka","KDH rental Kandy","DFSK Glory rental Sri Lanka","Colombo airport car rental","self drive Sri Lanka"],
  openGraph: { title: "SunriseCabs — Kandy, Sri Lanka", description: "Premium mobility across Sri Lanka, built around publicly verifiable Sunrise Cabs information.", type: "website", siteName: "SunriseCabs" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#030303", colorScheme: "dark", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sunrise-cabs.vercel.app"),
  title: { default: "SunriseCabs — Sri Lanka, Your Way", template: "%s — SunriseCabs" },
  description: "Premium self-drive cars, chauffeur transfers and island-wide rentals across Sri Lanka.",
  keywords: ["Sri Lanka car rental","Wagon R rental","KDH rental","DFSK Glory rental","Colombo airport car rental","self drive Sri Lanka"],
  openGraph: { title: "SunriseCabs", description: "Sri Lanka, your way.", type: "website", siteName: "SunriseCabs" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

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
  return <html lang="en"><body>{children}<div className="fixed bottom-5 right-5 z-[90] flex items-center gap-2"><a href="https://wa.me/94776380753" target="_blank" rel="noreferrer" aria-label="WhatsApp Sunrise Cabs" className="grid h-14 w-14 place-items-center rounded-full border border-[#25D366]/40 bg-[#25D366] text-[10px] font-black text-black shadow-[0_0_40px_rgba(37,211,102,.22)] transition hover:scale-110">WA</a><a href="/tools" aria-label="Open Sunrise Cabs trip tools" className="grid h-12 w-12 place-items-center rounded-full border border-[#f4b942]/30 bg-black/70 text-[#ffdd8a] backdrop-blur-xl transition hover:scale-110">✦</a></div></body></html>;
}

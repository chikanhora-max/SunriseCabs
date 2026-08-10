import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  return <html lang="en"><body>{children}<style>{`body{font-family:"Helvetica Neue","Neue Haas Grotesk Text Pro",Arial,sans-serif}.sunrise-site h1,.sunrise-site h2,.sunrise-site h3,.sunrise-site .manifesto-title,.sunrise-site .footer-title,.sunrise-site .footer-brand,.sunrise-site .journey-row strong,.sunrise-site .estimate-total strong,.sunrise-site .loader-mark{font-family:"Helvetica Neue","Neue Haas Grotesk Text Pro",Arial,sans-serif;font-weight:500;letter-spacing:-.075em}.sunrise-site h1 em,.sunrise-site h2 em,.sunrise-site .manifesto-title em,.sunrise-site .footer-title em,.sunrise-site .loader-mark span{font-style:italic;font-weight:400}.sunrise-site .hero-description,.sunrise-site .manifesto-copy,.sunrise-site .experience-top>p,.sunrise-site .fleet-heading>p,.sunrise-site .journey-intro p,.sunrise-site .estimate-intro p,.sunrise-site .lab-copy p{letter-spacing:-.01em}.sunrise-site .vehicle-3d{contain:layout paint}.sunrise-site button,.sunrise-site a{touch-action:manipulation}`}</style></body></html>;
}

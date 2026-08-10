"use client";

import { useMemo, useState } from "react";
import { CarFront, Gauge, Users, Luggage, ArrowUpRight, MessageCircle, ShieldCheck, Fuel, Ruler, Sparkles } from "lucide-react";

const vehicles = [
  {
    id: "wagon-r", name: "Suzuki Wagon R", status: "PUBLICLY LISTED", category: "City / self-drive", seats: 4, bags: 2,
    economy: "18–22 km/L", rate: "Rs. 8,000/day*", image: "https://cdn.patpat.lk/listing-media-files/uploads/ETW2jhekBFK0OjmxJSXMHbm1RBgnC9VNxgeECe1D.jpg?v=1773919336",
    facts: ["Compact city footprint", "Easy urban driving", "Published Sunrise rental package"],
    note: "Sunrise-specific rental information is publicly published; confirm the exact vehicle, colour, availability and final rate before booking."
  },
  {
    id: "vezel", name: "Honda Vezel", status: "PUBLICLY LISTED", category: "Hybrid SUV / self-drive", seats: 4, bags: 2,
    economy: "18–22 km/L", rate: "Rs. 11,000/day*", image: "https://cdn.patpat.lk/listing-media-files/uploads/ETW2jhekBFK0OjmxJSXMHbm1RBgnC9VNxgeECe1D.jpg?v=1773919336",
    facts: ["Hybrid SUV format", "Higher ride height", "Published Sunrise rental package"],
    note: "Use this page as a vehicle guide, not a promise of a specific registration, trim or colour. Confirm with Sunrise."
  },
  {
    id: "kdh", name: "Toyota KDH", status: "SHOWCASE / VERIFY", category: "Van / group travel", seats: 10, bags: 5,
    economy: "Quote required", rate: "Request quote", image: "https://adz.lk/wp-content/uploads/2024/03/01-11.jpg",
    facts: ["Group-friendly format", "Large luggage potential", "Useful for tours and transfers"],
    note: "KDH is included because it is relevant to the Sri Lankan rental market and Sunrise's publicly described broader fleet. Current Sunrise-specific vehicle/rate details require confirmation."
  },
  {
    id: "glory", name: "DFSK Glory", status: "SHOWCASE / VERIFY", category: "7-seat SUV", seats: 7, bags: 3,
    economy: "Quote required", rate: "Request quote", image: "https://carmarket.lk/storage/app/vehicle_images/6982514cc2e27.jpeg",
    facts: ["7-seat layout", "Family/group oriented", "SUV-style presentation"],
    note: "Showcase reference only until a current Sunrise-specific listing confirms the exact Glory variant and availability."
  }
];

export default function VehiclesPage() {
  const [selected, setSelected] = useState("wagon-r");
  const vehicle = useMemo(() => vehicles.find(v => v.id === selected)!, [selected]);
  const whatsapp = "https://wa.me/94776380753";
  return (
    <main className="min-h-screen bg-[#030303] text-[#f8f4ea]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 px-5 py-4 backdrop-blur-2xl md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-xs font-bold tracking-[.28em]">SUNRISECABS</a>
          <div className="flex gap-3"><a href="/" className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest">Home</a><a href={whatsapp} target="_blank" rel="noreferrer" className="rounded-full bg-[#f4b942] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black"><MessageCircle className="mr-1 inline h-3 w-3"/> WhatsApp</a></div>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-16 pt-24 md:px-10 md:pb-24">
        <div className="aurora-line" style={{top:"24%"}}/><div className="aurora-line" style={{top:"62%",animationDelay:"-5s"}}/>
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Vehicle library / Kandy / Sri Lanka</p>
          <h1 className="display mt-5 max-w-5xl text-6xl leading-[.88] tracking-[-.05em] md:text-9xl">Know the car.<br/><span className="sun italic">Choose the journey.</span></h1>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/45 md:text-base">An interactive reference library built around publicly documented Sunrise rental information and Sri Lankan-market vehicles. It deliberately separates verified Sunrise listings from vehicles that still require confirmation.</p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid gap-3 self-start sm:grid-cols-2 lg:grid-cols-1">{vehicles.map(v => <button key={v.id} onClick={() => setSelected(v.id)} className={`glass card rounded-3xl p-4 text-left ${selected===v.id?"gold-border glow":""}`}><div className="flex items-center gap-4"><img src={v.image} alt="" className="h-20 w-24 rounded-2xl object-cover"/><div className="min-w-0"><p className="eyebrow">{v.status}</p><h2 className="mt-1 truncate text-lg font-semibold">{v.name}</h2><p className="text-xs text-white/35">{v.category}</p></div></div></button>)}</div>

        <article className="glass overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/9] overflow-hidden bg-black"><img src={vehicle.image} alt={`${vehicle.name} reference`} className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"/><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/><div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-5"><div><p className="eyebrow">{vehicle.status}</p><h2 className="display mt-2 text-4xl md:text-6xl">{vehicle.name}</h2></div><Sparkles className="mb-2 h-6 w-6 text-[#f4b942]"/></div></div>
          <div className="grid gap-8 p-6 md:p-9">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="metric"><Users/><strong>{vehicle.seats}</strong><span>seats</span></div><div className="metric"><Luggage/><strong>{vehicle.bags}</strong><span>bags*</span></div><div className="metric"><Gauge/><strong>{vehicle.economy}</strong><span>efficiency*</span></div><div className="metric"><Fuel/><strong>{vehicle.rate}</strong><span>published*</span></div></div>
            <div><p className="eyebrow">Useful facts</p><div className="mt-4 grid gap-3 md:grid-cols-3">{vehicle.facts.map(f=><div key={f} className="rounded-2xl border border-white/10 bg-white/[.025] p-4 text-sm text-white/65">{f}</div>)}</div></div>
            <div className="rounded-2xl border border-[#f4b942]/15 bg-[#f4b942]/[.035] p-5"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#f4b942]"/><p className="text-xs leading-6 text-white/50">{vehicle.note}</p></div></div>
            <div className="flex flex-wrap gap-3"><a href={whatsapp} target="_blank" rel="noreferrer" className="rounded-full bg-[#f4b942] px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black">Ask about this vehicle <ArrowUpRight className="ml-1 inline h-4 w-4"/></a><a href="/tools" className="rounded-full border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/70">Open trip calculator</a></div>
          </div>
        </article>
      </div><p className="mx-auto mt-6 max-w-7xl text-[10px] leading-5 text-white/25">* Capacity, fuel economy, images and published prices are references and can vary by vehicle, trim, driving conditions and rental agreement. Final availability, exact vehicle, documents, deposit and price must be confirmed directly with Sunrise Cabs.</p></section>
    </main>
  );
}

'use client';

import { useMemo, useState } from 'react';

type Vehicle = { name: string; base: number; km: number; seats: number };

const vehicles: Vehicle[] = [
  { name: 'Suzuki Wagon R', base: 8000, km: 100, seats: 4 },
  { name: 'Honda Vezel', base: 11000, km: 100, seats: 5 },
  { name: 'Toyota KDH', base: 0, km: 0, seats: 9 },
  { name: 'DFSK Glory', base: 0, km: 0, seats: 7 },
];

export function RentalConfigurator() {
  const [vehicle, setVehicle] = useState(vehicles[0]);
  const [days, setDays] = useState(3);
  const [extraKm, setExtraKm] = useState(0);
  const [chauffeur, setChauffeur] = useState(false);
  const estimate = useMemo(() => {
    if (!vehicle.base) return null;
    const daily = vehicle.base * days;
    const extras = extraKm * (vehicle.name === 'Suzuki Wagon R' ? 40 : 80);
    return daily + extras;
  }, [vehicle, days, extraKm]);

  return (
    <section id="rental-configurator" className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-white backdrop-blur-xl md:p-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-xs uppercase tracking-[0.3em] text-amber-300">Build your journey</p><h2 className="mt-2 text-3xl font-semibold md:text-5xl">Rental configurator</h2></div>
        <span className="rounded-full border border-amber-300/30 px-4 py-2 text-xs text-amber-200">Estimate · confirm with SunriseCabs</span>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <label className="text-sm text-white/60">Vehicle<select value={vehicle.name} onChange={e => setVehicle(vehicles.find(v => v.name === e.target.value)!)} className="mt-2 w-full rounded-xl bg-black/70 p-3 text-white">{vehicles.map(v => <option key={v.name}>{v.name}</option>)}</select></label>
        <label className="text-sm text-white/60">Days<input type="number" min={1} max={60} value={days} onChange={e => setDays(Math.max(1, Number(e.target.value)))} className="mt-2 w-full rounded-xl bg-black/70 p-3 text-white" /></label>
        <label className="text-sm text-white/60">Extra km<input type="number" min={0} value={extraKm} onChange={e => setExtraKm(Math.max(0, Number(e.target.value)))} className="mt-2 w-full rounded-xl bg-black/70 p-3 text-white" /></label>
        <label className="flex items-end gap-3 rounded-xl bg-black/50 p-3 text-sm text-white/70"><input type="checkbox" checked={chauffeur} onChange={e => setChauffeur(e.target.checked)} /> Chauffeur request</label>
      </div>
      <div className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center">
        <div><p className="text-sm text-white/50">Indicative rental estimate</p><p className="text-4xl font-semibold text-amber-200">{estimate === null ? 'Quote required' : `Rs. ${estimate.toLocaleString()}`}</p><p className="mt-1 text-xs text-white/40">Published reference rates only. Availability, deposit, chauffeur and final price must be confirmed.</p></div>
        <a href="https://wa.me/94777810341" className="rounded-full bg-amber-200 px-6 py-3 text-center font-semibold text-black transition hover:scale-105">Continue on WhatsApp</a>
      </div>
    </section>
  );
}

export function SriLankaTripBuilder() {
  const places = ['Kandy', 'Nuwara Eliya', 'Ella', 'Galle', 'Sigiriya', 'Yala'];
  const [selected, setSelected] = useState('Kandy');
  return <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] p-6 text-white md:p-10">
    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_50%_50%,#d7a94b,transparent_35%)]" />
    <div className="relative"><p className="text-xs uppercase tracking-[0.3em] text-amber-300">Drive Sri Lanka</p><h2 className="mt-2 text-3xl font-semibold md:text-5xl">Build your route</h2><div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_.8fr]">
      <div className="relative min-h-[300px] rounded-3xl border border-amber-200/10 bg-white/[0.025] p-6"><div className="absolute left-[20%] top-[25%] h-3 w-3 rounded-full bg-amber-200 shadow-[0_0_30px_8px_rgba(251,191,36,.35)]" /><div className="absolute left-[48%] top-[48%] h-3 w-3 rounded-full bg-amber-200" /><div className="absolute left-[67%] top-[70%] h-3 w-3 rounded-full bg-amber-200" /><div className="absolute left-[20%] top-[25%] h-[55%] w-[50%] rotate-[25deg] border-l border-dashed border-amber-200/50" /><p className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.25em] text-white/30">Sri Lanka route visual</p></div>
      <div className="space-y-3">{places.map(place => <button key={place} onClick={() => setSelected(place)} className={`w-full rounded-2xl border p-4 text-left transition ${selected === place ? 'border-amber-200/50 bg-amber-200/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'}`}><span className="text-lg">{place}</span><span className="block text-xs text-white/40">Explore with SunriseCabs</span></button>)}<a href="https://wa.me/94777810341" className="block rounded-2xl bg-white py-4 text-center font-semibold text-black">Ask about this route</a></div>
    </div></div></section>;
}

export function AITravelConcierge() {
  const [open, setOpen] = useState(false);
  return <div className="fixed bottom-6 right-6 z-40"><button onClick={() => setOpen(v => !v)} aria-label="Open Sunrise travel concierge" className="h-14 w-14 rounded-full border border-amber-200/40 bg-black text-2xl shadow-[0_0_40px_rgba(251,191,36,.2)] transition hover:scale-110">✦</button>{open && <div className="absolute bottom-16 right-0 w-[min(90vw,360px)] rounded-3xl border border-white/10 bg-black/90 p-5 text-white shadow-2xl backdrop-blur-xl"><p className="text-xs uppercase tracking-[0.25em] text-amber-300">Sunrise Concierge</p><h3 className="mt-2 text-xl font-semibold">Plan your Sri Lanka drive</h3><p className="mt-2 text-sm text-white/60">Tell us your dates, group size and route. SunriseCabs can confirm the suitable vehicle, availability and final quotation.</p><a href="https://wa.me/94777810341" className="mt-5 block rounded-xl bg-amber-200 px-4 py-3 text-center font-semibold text-black">Start on WhatsApp</a></div>}</div>;
}

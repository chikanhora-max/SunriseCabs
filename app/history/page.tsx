import Link from "next/link";

const milestones = [
  { label: "Public business history", title: "Sunrise Rent a Car / Sunrise Cabs", text: "Public rental listings identify Sunrise as a Kandy-based rental and transport business, with Palitha Kaluarachchi named as the advertiser/contact on multiple listings." },
  { label: "20+ years", title: "Experience-led positioning", text: "A public Sunrise business listing describes more than two decades of experience. The site presents this as a public business claim rather than inventing a founding year." },
  { label: "Sunrise Tours", title: "Beyond the rental", text: "A public Sunrise Tours profile describes Sunrise Tours as an extension of Sunrise Rent a Car and Sunrise Cabs, with tailor-made tours, airport transfers, chauffeur-driven journeys and vehicles ranging from sedans to large buses." },
  { label: "Today", title: "A Kandy-first showcase", text: "SunriseCabs now turns the public information into a premium digital experience: fleet discovery, trip planning, transparent estimates and direct WhatsApp enquiries." },
];

export default function HistoryPage(){
  return <main className="noise min-h-screen bg-[#030303] px-5 py-10 text-white md:px-12">
    <div className="mx-auto max-w-6xl">
      <Link href="/" className="text-xs uppercase tracking-[.25em] text-[#ffdd8a]">← SunriseCabs</Link>
      <header className="py-20 md:py-28">
        <p className="eyebrow">The story / verified public record</p>
        <h1 className="display mt-5 max-w-5xl text-6xl leading-[.88] md:text-8xl">Built around <span className="sun italic">Kandy.</span></h1>
        <p className="mt-8 max-w-3xl text-sm leading-7 text-white/50 md:text-base">A restrained history page built from public business and rental listings. We do not manufacture founding dates, customer stories or achievements that cannot be verified.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {milestones.map((m,i)=><article key={m.title} className="glass card rounded-[2rem] p-8 md:p-10"><p className="eyebrow">0{i+1} / {m.label}</p><h2 className="display mt-10 text-3xl md:text-4xl">{m.title}</h2><p className="mt-5 text-sm leading-7 text-white/45">{m.text}</p></article>)}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <article className="glass rounded-[2rem] p-8 md:p-10"><p className="eyebrow">Leadership / public listing</p><h2 className="display mt-5 text-4xl md:text-5xl">Palitha <span className="sun italic">Kaluarachchi.</span></h2><p className="mt-5 text-sm leading-7 text-white/45">Palitha Kaluarachchi is named as the contact/advertiser on multiple public Sunrise rental listings, including a BMW 5 Series listing that also publishes the Sunrise email address and phone contact.</p><a className="mt-7 inline-block rounded-full bg-[#f4b942] px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-black" href="mailto:sunrisecabs1@gmail.com">Email Sunrise</a></article>
        <article className="rounded-[2rem] border border-[#f4b942]/20 bg-[#f4b942]/[.045] p-8 md:p-10"><p className="eyebrow">Claim integrity</p><h2 className="display mt-5 text-3xl">Kandy's best <span className="sun italic">without fake rankings.</span></h2><p className="mt-5 text-sm leading-7 text-white/45">SunriseCabs is positioned as a premium Kandy-focused rental showcase. We found no independent ranking that proves “Kandy's #1 rent-a-car”, so the site does not present that as an objective fact. If Sunrise has an official current #1 claim, it can be added with its source.</p></article>
      </section>

      <footer className="mt-16 border-t border-white/10 py-10 text-xs text-white/35"><Link href="/" className="text-[#ffdd8a]">Return to showcase →</Link></footer>
    </div>
  </main>;
}

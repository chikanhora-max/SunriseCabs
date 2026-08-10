import Link from "next/link";

const whatsapp = [
  ["+94 77 781 0341", "Public Sunrise rental contact", "94777810341"],
  ["+94 76 139 2811", "Public Sunrise contact route", "94761392811"],
  ["+94 76 098 5462", "Public directory contact", "94760985462"],
  ["+94 77 638 0753", "Public WhatsApp route", "94776380753"],
];

const social = [
  ["Sunrise Rentacar", "Facebook profile referenced by public Sunrise rental listings", "https://www.facebook.com/pages/Sunrise-rentacar"],
  ["Sunrise Cabs", "Facebook profile referenced by public Sunrise rental listings", "https://www.facebook.com/pages/Sunrise-cabs"],
  ["Sunrise Tours", "Facebook profile referenced by public Sunrise rental listings", "https://www.facebook.com/pages/Sunrise-tours"],
];

export default function SocialPage(){
  return <main className="noise min-h-screen bg-[#030303] px-5 py-10 text-white md:px-12">
    <div className="mx-auto max-w-6xl">
      <Link href="/" className="text-xs uppercase tracking-[.25em] text-[#ffdd8a]">← SunriseCabs</Link>
      <header className="py-20 md:py-28"><p className="eyebrow">Contact / social / WhatsApp</p><h1 className="display mt-5 text-6xl leading-[.88] md:text-8xl">Talk to <span className="sun italic">Sunrise.</span></h1><p className="mt-8 max-w-2xl text-sm leading-7 text-white/50">These are public contact routes found in Sunrise-related rental listings. Some Facebook URLs are legacy page paths; the destination may redirect or have changed, so we do not label them as verified current profiles.</p></header>

      <section className="grid gap-4 md:grid-cols-2">
        {whatsapp.map(([number,note,wa])=><a key={number} href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="glass card rounded-[2rem] p-7"><p className="eyebrow">WhatsApp / direct enquiry</p><h2 className="mt-8 text-2xl font-semibold">{number}</h2><p className="mt-2 text-sm text-white/40">{note}</p><span className="mt-7 inline-block rounded-full bg-[#25D366] px-5 py-3 text-[10px] font-black uppercase tracking-widest text-black">Open WhatsApp →</span></a>)}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {social.map(([name,note,url])=><a key={name} href={url} target="_blank" rel="noreferrer" className="glass card rounded-[2rem] p-7"><p className="eyebrow">Facebook / referenced</p><h2 className="mt-8 text-xl font-semibold">{name}</h2><p className="mt-3 text-sm leading-6 text-white/40">{note}</p><span className="mt-6 inline-block text-xs text-[#ffdd8a]">Open Facebook →</span></a>)}
      </section>

      <section className="mt-6 rounded-[2rem] border border-[#f4b942]/20 bg-[#f4b942]/[.045] p-8 md:p-10"><p className="eyebrow">Fastest path</p><h2 className="display mt-4 text-4xl md:text-5xl">Build a quote. <span className="sun italic">Send it.</span></h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">Use the rental tools to prepare your vehicle, duration, route and passenger details, then send the enquiry to Sunrise through WhatsApp. The final rate, availability and terms are confirmed by Sunrise.</p><Link href="/tools" className="mt-7 inline-block rounded-full bg-[#f4b942] px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-black">Open rental tools →</Link></section>
      <footer className="mt-16 border-t border-white/10 py-10 text-xs text-white/35"><Link href="/" className="text-[#ffdd8a]">Return to showcase →</Link></footer>
    </div>
  </main>;
}

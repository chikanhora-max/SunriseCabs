'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CarFront, Menu, MessageCircle, MoveRight, Sparkles, Users, X } from 'lucide-react';

type Vehicle = {
  id: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  economy: string;
  rate?: number;
  note: string;
  image: string;
  credit: string;
};

const fleet: Vehicle[] = [
  { id:'wagon', name:'Suzuki Wagon R', category:'CITY / SELF DRIVE', seats:4, bags:2, economy:'18–22 km/L', rate:8000, note:'Published rental reference; confirm current Sunrise availability.', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/2002-2003%20Suzuki%20Wagon%20R.jpg', credit:'Wikimedia Commons / TTTNIS — Public Domain' },
  { id:'vezel', name:'Honda Vezel', category:'HYBRID / SUV', seats:5, bags:2, economy:'Hybrid', rate:11000, note:'Sri Lankan rental-market reference; confirm exact Sunrise trim.', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/2024%20Honda%20Vezel%20e-HEV%20Z.jpg', credit:'Wikimedia Commons / TTTNIS — CC BY-SA' },
  { id:'prius', name:'Toyota Prius', category:'HYBRID / COMFORT', seats:5, bags:2, economy:'Hybrid', note:'Market showcase vehicle; Sunrise-specific availability requires confirmation.', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/TOYOTA%20Prius.jpg', credit:'Wikimedia Commons / Gnsin — GFDL' },
  { id:'aqua', name:'Toyota Aqua', category:'HYBRID / CITY', seats:5, bags:2, economy:'Hybrid', note:'Market showcase vehicle; quote required.', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/2017-2021%20Toyota%20Aqua.jpg', credit:'Wikimedia Commons / TTTNIS — CC0' },
  { id:'axio', name:'Toyota Corolla Axio', category:'SEDAN / TOURING', seats:5, bags:3, economy:'Petrol / Hybrid', note:'Sri Lankan-market showcase vehicle; quote required.', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/2006-2008%20Toyota%20Corolla%20Axio.jpg', credit:'Wikimedia Commons / TTTNIS — Public Domain' },
  { id:'kdh', name:'Toyota KDH', category:'VAN / GROUPS', seats:10, bags:5, economy:'Diesel', note:'Showcase reference; confirm exact KDH generation and Sunrise fleet status.', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Toyota%20Hiace%20KDH202L%203.0%20Commuter%20White%20-%20front.jpg', credit:'Wikimedia Commons / Ethan Llamas' },
  { id:'glory', name:'DFSK Glory', category:'7-SEAT / SUV', seats:7, bags:3, economy:'Petrol', note:'Sri Lankan-market showcase reference; Sunrise availability requires confirmation.', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mobil%20DFSK%20Glory.jpg', credit:'Wikimedia Commons / F1fans — CC BY 3.0' },
  { id:'hiace', name:'Toyota HiAce', category:'VAN / GROUPS', seats:12, bags:6, economy:'Diesel', note:'Category showcase; confirm exact configuration and availability.', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Toyota%20Hiace%20%2853664667815%29.jpg', credit:'Wikimedia Commons / crash71100 — CC0' }
];

const whatsapp = 'https://wa.me/94761392811';
const money = (n:number) => `Rs. ${n.toLocaleString('en-LK')}`;

export default function Home(){
  const [menu,setMenu]=useState(false);
  const [active,setActive]=useState('wagon');
  const [days,setDays]=useState(3);
  const [loading,setLoading]=useState(true);
  const [cursor,setCursor]=useState({x:-100,y:-100});
  const selected=useMemo(()=>fleet.find(v=>v.id===active)??fleet[0],[active]);

  useEffect(()=>{
    const timer=setTimeout(()=>setLoading(false),1100);
    const move=(e:MouseEvent)=>setCursor({x:e.clientX,y:e.clientY});
    window.addEventListener('mousemove',move,{passive:true});
    return()=>{clearTimeout(timer);window.removeEventListener('mousemove',move)};
  },[]);

  return <main className="sunrise-site min-h-screen bg-white text-black">
    {loading&&<div className="loader"><div className="loader-inner"><div className="loader-kicker">KANDY / SRI LANKA</div><div className="loader-mark">SUNRISE<span>CABS</span></div><div className="loader-line"><span/></div><div className="loader-meta">A BETTER WAY TO MOVE</div></div></div>}
    <div className="car-cursor" style={{left:cursor.x,top:cursor.y}} aria-hidden="true"/>

    <header className="site-header">
      <a href="#top" className="brand"><span className="brand-symbol">SC</span><span>SUNRISE<br/>CABS</span></a>
      <div className="header-center">KANDY / SRI LANKA / 01—08</div>
      <nav className="desktop-nav" aria-label="Primary"><a href="#fleet">Fleet</a><a href="#experience">Experience</a><a href="#journeys">Journeys</a><a href="#estimate">Estimate</a></nav>
      <a className="header-action" href={whatsapp} target="_blank" rel="noreferrer">ENQUIRE <ArrowUpRight size={14}/></a>
      <button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Open navigation">{menu?<X/>:<Menu/>}</button>
    </header>
    {menu&&<div className="mobile-panel"><a href="#fleet" onClick={()=>setMenu(false)}>Fleet</a><a href="#experience" onClick={()=>setMenu(false)}>Experience</a><a href="#journeys" onClick={()=>setMenu(false)}>Journeys</a><a href="#estimate" onClick={()=>setMenu(false)}>Estimate</a><a href={whatsapp}>WhatsApp</a></div>}

    <section id="top" className="hero">
      <div className="hero-index">01</div>
      <div className="hero-copy">
        <p className="micro">SUNRISECABS / KANDY / MOBILITY</p>
        <h1>Move<br/><em>beautifully.</em></h1>
        <p className="hero-description">A considered rent-a-car experience for journeys across Sri Lanka — presented around the vehicles, the people and the places they connect.</p>
        <div className="hero-links"><a href="#fleet">Explore the fleet <ArrowDownRight size={16}/></a><a href="#experience">How it works <ArrowDownRight size={16}/></a></div>
      </div>
      <div className="hero-image"><img src={selected.image} alt={selected.name} fetchPriority="high"/><div className="image-caption"><span>FEATURED / {selected.name}</span><span>01 / 08</span></div></div>
      <div className="hero-rail"><span>SCROLL TO EXPLORE</span><div className="rail-line"/><span>KANDY → SRI LANKA</span></div>
    </section>

    <section className="manifesto"><div className="section-index">02 / VISION</div><div className="manifesto-title">The journey<br/><em>starts here.</em></div><div className="manifesto-copy"><p>Inspired by the discipline of contemporary automotive design studios, SunriseCabs is built as a visual collection rather than a crowded booking template.</p><p>Large imagery, precise typography, quiet motion and useful information keep the customer focused on one thing: finding the right way to travel.</p></div></section>

    <section id="experience" className="experience">
      <div className="experience-top"><div><span className="section-index">03 / FEATURED VEHICLE</span><h2>Meet the<br/><em>{selected.name}.</em></h2></div><p>Beautiful vehicle photography replaces unreliable 3D assets. Every image is a real vehicle reference and the page remains fast on phones, tablets and laptops.</p></div>
      <div className="feature-grid"><div className="feature-image"><img src={selected.image} alt={selected.name} loading="lazy"/><div className="feature-credit">{selected.credit}</div></div><div className="feature-info"><span className="micro">CURRENT SELECTION</span><h3>{selected.name}</h3><p>{selected.note}</p><div className="spec-list"><div><span>PASSENGERS</span><strong>{selected.seats}</strong></div><div><span>LUGGAGE</span><strong>{selected.bags}</strong></div><div><span>CATEGORY</span><strong>{selected.category}</strong></div><div><span>EFFICIENCY</span><strong>{selected.economy}</strong></div></div><a href={whatsapp} target="_blank" rel="noreferrer" className="black-button">Ask about this vehicle <MessageCircle size={15}/></a></div></div>
    </section>

    <section id="fleet" className="fleet-section"><div className="fleet-heading"><div><span className="section-index">04 / COLLECTION</span><h2>A collection<br/><em>for every road.</em></h2></div><p>Eight vehicle references, presented individually. Select a vehicle to update the feature story and estimate.</p></div><div className="fleet-grid">{fleet.map((v,i)=><button key={v.id} className={`fleet-item ${active===v.id?'is-active':''}`} onClick={()=>setActive(v.id)}><div className="fleet-visual"><img src={v.image} alt={v.name} loading="lazy"/><span className="fleet-no">0{i+1}</span><span className="fleet-view">VIEW <MoveRight size={12}/></span></div><div className="fleet-meta"><span>{v.category}</span><h3>{v.name}</h3><div><span>{v.seats} seats</span><span>{v.bags} bags</span><span>{v.economy}</span></div></div></button>)}</div></section>

    <section id="journeys" className="journey-section"><div className="journey-intro"><span className="section-index">05 / THE JOURNEY</span><h2>Not just<br/><em>a rental.</em></h2><p>Build the website around real reasons people hire a vehicle in Sri Lanka.</p></div><div className="journey-list">{['Airport arrival','Kandy → Ella','Hotel transfer','Family touring','Corporate travel','Island-wide journey'].map((item,i)=><a href={whatsapp} target="_blank" rel="noreferrer" key={item} className="journey-row"><span>0{i+1}</span><strong>{item}</strong><span>ENQUIRE <ArrowUpRight size={15}/></span></a>)}</div></section>

    <section id="estimate" className="estimate-section"><div className="estimate-intro"><span className="section-index">06 / TRIP PREVIEW</span><h2>Make it<br/><em>real.</em></h2><p>A transparent showcase calculator. Published references are estimates only — confirm current Sunrise pricing, availability, mileage and terms directly.</p></div><div className="estimate-card"><div className="estimate-top"><span>SELECT VEHICLE</span><span>01—08</span></div><div className="estimate-pills">{fleet.map(v=><button key={v.id} className={active===v.id?'selected':''} onClick={()=>setActive(v.id)}>{v.name}</button>)}</div><div className="estimate-fields"><label>Rental period<select value={days} onChange={e=>setDays(Number(e.target.value))}>{[1,2,3,5,7,10,20,30].map(n=><option key={n} value={n}>{n} {n===1?'day':'days'}</option>)}</select></label><div><span>Selected</span><strong>{selected.name}</strong></div></div><div className="estimate-total"><span>SHOWCASE ESTIMATE</span><strong>{selected.rate?money(selected.rate*days):'QUOTE'}</strong><small>{selected.rate?`${days} × ${money(selected.rate)}/day before any package, mileage or extras.`:'Confirm Sunrise-specific pricing on WhatsApp.'}</small></div><a className="white-button" href={whatsapp} target="_blank" rel="noreferrer">Confirm availability <MessageCircle size={15}/></a></div></section>

    <section className="lab-section"><div className="lab-word">SUNRISE</div><div className="lab-copy"><span className="section-index">07 / MOTION LAB</span><h2>Quietly<br/><em>alive.</em></h2><p>Subtle background movement, image reveals, responsive hover states and a lightweight cursor create character without sacrificing speed. Motion is reduced automatically for users who prefer less animation.</p><div className="lab-tags"><span><Sparkles size={13}/> MOTION</span><span><CarFront size={13}/> VEHICLES</span><span><Users size={13}/> PEOPLE</span></div></div></section>

    <footer className="site-footer" id="contact"><div className="footer-brand">SUNRISE<br/><em>CABS</em></div><div><span className="section-index">08 / CONTACT</span><p className="footer-title">Ready when<br/><em>you are.</em></p></div><div className="footer-contact"><p>KANDY / SRI LANKA</p><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp SunriseCabs <ArrowUpRight size={15}/></a><small>Confirm vehicle, availability, rate and terms directly.</small></div><div className="credits">Vehicle imagery: Wikimedia Commons. Each image remains subject to its stated license. SunriseCabs fleet availability should be confirmed directly.</div></footer>
  </main>;
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Sun, Zap, Info, BatteryCharging, CheckCircle2, 
  ChevronRight, Smartphone, Coins, BadgeCheck, ArrowUpRight, MapPin, Lightbulb
} from "lucide-react";

export default function ThuisLadenPage() {
  const [chargingProfile, setChargingProfile] = useState<'fixed' | 'dynamic' | 'solar'>('dynamic');
  const [batteryMode, setBatteryMode] = useState<'daily' | 'trip'>('daily');

  const getPriceContext = () => {
    switch(chargingProfile) {
        case 'fixed': return { price: "€0,23 - €0,29", label: "Vast/Variabel Contract", desc: "Zekerheid, maar geen extra voordeel in de nacht." };
        case 'dynamic': return { price: "€0,15 - €0,22", label: "Dynamisch Gemiddeld", desc: "Aanzienlijk voordeliger door slim te laden in de daluren." };
        case 'solar': return { price: "€0,10*", label: "Eigen Zonnestroom", desc: "*Gemiste terugleververgoeding, maar goedkoper dan kopen." };
    }
  };

  const context = getPriceContext();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 bg-white">
      {/* Breadcrumbs */}
      <Link href="/elektrisch-laden" className="text-gray-500 mb-8 inline-flex items-center hover:text-gray-900 transition-colors text-sm font-medium">
        <ChevronRight className="rotate-180 w-4 h-4 mr-1" /> Terug naar overzicht
      </Link>
      
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
          Slim laden & Rendement
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
           Optimaliseer uw laadgedrag voor lagere kosten, een gezonde accu en een extra jaarlijkse vergoeding.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* --- KAART 1: KOSTEN OPTIMALISEREN --- */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Optimaliseer energiekosten</h2>
                <p className="text-sm text-gray-500">Bespaar door slim te timen.</p>
            </div>

            <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                <button onClick={() => setChargingProfile('fixed')} className={`flex-1 py-2 px-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${chargingProfile === 'fixed' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>VAST</button>
                <button onClick={() => setChargingProfile('dynamic')} className={`flex-1 py-2 px-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${chargingProfile === 'dynamic' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'}`}>DYNAMISCH</button>
                <button onClick={() => setChargingProfile('solar')} className={`flex-1 py-2 px-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${chargingProfile === 'solar' ? 'bg-white text-yellow-700 shadow-sm' : 'text-gray-500'}`}>ZON</button>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{context.label}</span>
                    <span className="text-lg font-bold text-gray-900">{context.price} <span className="text-xs font-normal text-gray-500">/ kWh</span></span>
                </div>
                <div className="text-right text-[11px] text-gray-500 max-w-[120px] italic">{context.desc}</div>
            </div>

            <div className="relative h-48 w-full mb-6 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                    {chargingProfile === 'fixed' && (<path d="M0,25 L100,25" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4 2" />)}
                    {chargingProfile === 'dynamic' && (
                      <><path d="M0,50 L0,40 H25 V20 H45 V35 H70 V15 H100 V50 Z" fill="#DBEAFE" opacity="0.5" /><path d="M0,40 H25 V20 H45 V35 H70 V15 H100" fill="none" stroke="#2563EB" strokeWidth="2.5" /></>
                    )}
                    {chargingProfile === 'solar' && (
                      <><path d="M0,50 L0,40 H25 V20 H45 V48 H70 V15 H100 V50 Z" fill="#FEF3C7" opacity="0.6" /><path d="M0,40 H25 V20 H45 V48 H70 V15 H100" fill="none" stroke="#CA8A04" strokeWidth="2.5" /></>
                    )}
                </svg>
                <div className="absolute bottom-1 w-full flex justify-between px-2 text-[9px] text-gray-400 font-bold uppercase"><span>Nacht</span><span>Middag</span><span>Avond</span></div>
            </div>

            <div className="mt-auto bg-blue-50 rounded-xl p-4 flex gap-3 items-start border border-blue-100">
                <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="text-[13px] text-blue-900 leading-snug font-medium">
                    Stel een timer in via uw auto of laad-paal om automatisch de goedkoopste uren te laden.
                </div>
            </div>
        </div>

        {/* --- KAART 2: BATTERIJ --- */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-6 flex justify-between items-start">
                <div><h2 className="text-xl font-bold text-gray-900 mb-1">Batterijconditie</h2><p className="text-sm text-gray-500">Verleng de levensduur.</p></div>
                <div className="text-right">
                    <span className={`text-2xl font-black block ${batteryMode === 'daily' ? 'text-green-600' : 'text-blue-600'}`}>{batteryMode === 'daily' ? '80%' : '100%'}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold">{batteryMode === 'daily' ? 'Optimaal' : 'Maximaal'}</span>
                </div>
            </div>

            <div className="mb-8 mt-4">
                <div className="relative h-12 w-full border-2 border-gray-200 rounded-xl p-1 flex items-center">
                    <div className="w-full h-full flex gap-1">
                        {[...Array(10)].map((_, i) => {
                            const isFilled = (batteryMode === 'daily' && i < 8) || (batteryMode === 'trip');
                            let colorClass = "bg-gray-100"; 
                            if (isFilled) colorClass = batteryMode === 'daily' ? "bg-green-500" : (i < 8 ? "bg-green-500" : "bg-blue-500");
                            return <div key={i} className={`flex-1 rounded-sm transition-all duration-700 ${colorClass}`}></div>;
                        })}
                    </div>
                    <div className="absolute -right-2 w-1.5 h-5 bg-gray-200 rounded-r-sm"></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 px-1"><span>0%</span><span>80%</span><span>100%</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <button onClick={() => setBatteryMode('daily')} className={`py-3 rounded-xl border-2 flex flex-col items-center transition-all ${batteryMode === 'daily' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400'}`}><span className="font-bold text-sm text-center px-1 leading-tight">Dagelijks<br/>(80%)</span></button>
                <button onClick={() => setBatteryMode('trip')} className={`py-3 rounded-xl border-2 flex flex-col items-center transition-all ${batteryMode === 'trip' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-400'}`}><span className="font-bold text-sm text-center px-1 leading-tight">Vakantie<br/>(100%)</span></button>
            </div>

            <div className="mt-auto flex gap-3 text-[13px] text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="font-medium">{batteryMode === 'daily' ? "Beperk laden tot 80% voor dagelijks gebruik om degradatie van de accucellen te voorkomen." : "Gebruik 100% alleen voor lange ritten en vertrek direct na het laden."}</p>
            </div>
        </div>

        {/* --- KAART 3: GELD VERDIENEN (ERE) - UPDATED TO MATCH YOUR NEW PAGE --- */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col border-t-4 border-t-emerald-500">
            <div className="mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Geld verdienen</h2>
                        <p className="text-sm text-gray-500">Verzilver uw CO₂-besparing.</p>
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Nieuw 2026</div>
                </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6 mb-6 text-center border border-emerald-100">
                <span className="block text-[10px] text-emerald-600 font-bold uppercase tracking-widest mb-1">Verwachte Netto Opbrengst</span>
                <div className="flex justify-center items-baseline gap-1">
                    <span className="text-5xl font-black text-emerald-700">€0,08</span>
                    <span className="text-sm font-bold text-emerald-600">/ kWh</span>
                </div>
                <div className="mt-2 text-[11px] text-emerald-600 font-medium leading-tight italic">
                   Directe cashback.
                </div>
            </div>

            <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Vergoeding voor elke geladen kWh.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-900 font-bold">
                    <BadgeCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Harde eis: MID-meter in uw paal.</span>
                </li>
            </ul>

            <Link href="/elektrisch-laden/ere-uitleg" className="mt-auto bg-slate-900 text-white text-center py-4 rounded-xl font-bold text-sm hover:bg-slate-800 transition shadow-lg">
                Hoe werkt dit systeem?
            </Link>
        </div>
      </div>
{/* Sectie: Laden zonder eigen oprit (VPA) */}
{/* Brede sectie: Laden zonder eigen oprit (VPA) */}
<section id="vpa" className="mt-12 bg-blue-50 border border-blue-100 rounded-[2.5rem] p-8 md:p-12 w-full scroll-mt-20">
  <div className="max-w-5xl">
    <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
      <MapPin className="w-3 h-3" /> Stad-oplossing (VPA)
    </div>
    
    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight italic">
      Geen eigen oprit? <span className="text-blue-600">Toch thuis laden op de stoep.</span>
    </h3>
    
    <p className="text-slate-600 mb-10 leading-relaxed text-lg max-w-3xl">
      Woont u in een gemeente als <strong>Haarlem</strong>, <strong>heemskerk</strong>, <strong>beverwijk</strong>, <strong>Haarlemmermeer</strong> of <strong>Zaandam</strong>? Dan hoeft u vaak geen eigen oprit te hebben om toch vanuit uw eigen meterkast te laden. Via een goedgekeurde rubberen mat of een officiële kabelgoottegel mag u dan de laadkabel veilig over de stoep leggen.
    </p>

    {/* Voordelen kaarten */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
      <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-blue-100 shadow-sm">
        <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <span className="block font-bold text-slate-900 text-sm">Eigen stroomprijs</span>
          <span className="text-xs text-slate-500">Bespaar fors t.o.v. de publieke laadpaal.</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-blue-100 shadow-sm">
        <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <span className="block font-bold text-slate-900 text-sm">ERE-Cashback</span>
          <span className="text-xs text-slate-500">Verzilver ook thuis uw jaarlijkse CO₂-vergoeding.</span>
        </div>
      </div>
    </div>

    {/* Het 1-2 Stappenplan */}
{/* Het 1-2 Stappenplan - Verbeterde Versie */}
{/* Het 1-2 Stappenplan - Verbeterde Versie */}
<div className="pt-10 border-t border-blue-100">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Kaart Stap 1: Inspiratie & Info */}
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 flex flex-col shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">1</div>
        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">WAAR MAG HET AL?</h4>
      </div>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">
        Gebruik het actuele overzicht van EVrijders.nl om te zien in welke gemeenten u de laadkabel veilig over de stoep mag leggen (VPA).
      </p>
      <a 
        href="https://www.evrijders.nl/dossier-vpa" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group"
      >
        Naar het VPA-overzicht 
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>

    {/* Kaart Stap 2: Actie (Aangepast!) */}
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 flex flex-col shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        {/* Kleur veranderd van grijs naar blauw om het actief te maken */}
        <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">2</div>
        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">LEES DE VOORWAARDEN</h4>
      </div>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">
        Staat uw gemeente ertussen of twijfelt u? Zoek op de website van uw gemeente voor de specifieke regels in uw wijk.
      </p>
      
      {/* OPLOSSING: Maak van het 'advies blokje' een actie knop */}
      
    </div>

  </div>
</div>
  </div>
</section>
      {/* Footer CTA */}
      <div className="text-center mt-16 bg-gray-900 rounded-3xl p-10 text-white shadow-2xl">
         <h3 className="text-2xl md:text-3xl font-bold mb-4">Bereken uw totale voordeel</h3>
         <p className="text-gray-400 mb-8 max-w-xl mx-auto">Combineer dynamische tarieven met de ERE-vergoeding voor een maximaal financieel voordeel.</p>
         
         <Link href={`/elektrisch-laden/kosten-en-besparingen?laadtype=thuis&scenario=${chargingProfile}`} 
               className="inline-flex items-center gap-3 bg-emerald-500 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-emerald-400 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20">
            <BatteryCharging className="w-6 h-6" /> Naar Besparingscalculator
        </Link>
      </div>
    </main>
  );
}
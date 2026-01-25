"use client";
import { useState } from "react";
import Link from "next/link";
import { Sun, Zap, Info, BatteryCharging, CheckCircle2, ChevronRight, Smartphone } from "lucide-react";

export default function ThuisLadenPage() {
  const [chargingProfile, setChargingProfile] = useState<'fixed' | 'dynamic' | 'solar'>('dynamic');
  const [batteryMode, setBatteryMode] = useState<'daily' | 'trip'>('daily');

  const getPriceContext = () => {
    switch(chargingProfile) {
        case 'fixed': return { price: "€0,23 - €0,29", label: "Vast/Variabel Contract", desc: "Zekerheid, maar geen extra voordeel in de nacht." };
        case 'dynamic': return { price: "€0,15 - €0,22", label: "Dynamisch Gemiddeld", desc: "Aanzienlijk voordeliger door te laden in daluren." };
        case 'solar': return { price: "€0,10*", label: "Eigen Zonnestroom", desc: "*Gemiste terugleververgoeding, maar goedkoper dan kopen." };
    }
  };

  const context = getPriceContext();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 bg-white">
      <Link href="/elektrisch-laden" className="text-gray-500 mb-8 inline-flex items-center hover:text-gray-900 transition-colors text-sm font-medium">
        <ChevronRight className="rotate-180 w-4 h-4 mr-1" /> Terug naar overzicht
      </Link>
      
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Slim laden & Accu-onderhoud
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
           Door bewust te kiezen wanneer en tot hoe ver u laadt, heeft u invloed op zowel uw maandlasten als de technische staat van uw auto.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* --- KAART 1: KOSTEN OPTIMALISEREN --- */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col">
            
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Optimaliseer uw energiekosten</h2>
                <p className="text-sm text-gray-500">Kies uw situatie om het prijsverloop te zien.</p>
            </div>

            {/* TABBS */}
            <div className="flex p-1 bg-gray-100 rounded-lg mb-6 overflow-x-auto">
                <button onClick={() => setChargingProfile('fixed')} className={`flex-1 py-2 px-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${chargingProfile === 'fixed' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Vast Tarief</button>
                <button onClick={() => setChargingProfile('dynamic')} className={`flex-1 py-2 px-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${chargingProfile === 'dynamic' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Dynamisch</button>
                <button onClick={() => setChargingProfile('solar')} className={`flex-1 py-2 px-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${chargingProfile === 'solar' ? 'bg-white text-yellow-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Met Zonnepanelen</button>
            </div>

            {/* CONTEXT */}
            <div className="flex justify-between items-center mb-4 px-2">
                <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{context.label}</span>
                    <span className="text-lg font-bold text-gray-900">{context.price} <span className="text-sm font-normal text-gray-500">/ kWh</span></span>
                </div>
                <div className="text-right text-xs text-gray-500 max-w-[150px]">{context.desc}</div>
            </div>

            {/* GRAFIEK */}
            <div className="relative h-56 w-full mb-6 mt-2">
                <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                    {chargingProfile === 'fixed' && (<path d="M0,25 L100,25" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4 2" />)}
                    {chargingProfile === 'dynamic' && (<><path d="M0,50 L0,40 H25 V20 H45 V35 H70 V15 H100 V50 Z" fill="#DBEAFE" opacity="0.5" /><path d="M0,40 H25 V20 H45 V35 H70 V15 H100" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" /></>)}
                    {chargingProfile === 'solar' && (<><path d="M0,50 L0,40 H25 V20 H45 V48 H70 V15 H100 V50 Z" fill="#FEF3C7" opacity="0.6" /><path d="M0,40 H25 V20 H45 V48 H70 V15 H100" fill="none" stroke="#CA8A04" strokeWidth="2.5" strokeLinejoin="round" /><foreignObject x="52" y="35" width="10" height="10"><Sun size={8} className="text-yellow-600 animate-pulse" /></foreignObject></>)}
                </svg>
                <div className="absolute bottom-0 w-full flex justify-between px-1 text-[10px] text-gray-400 font-medium"><span>00:00</span><span>12:00</span><span>24:00</span></div>
            </div>

            {/* AANGEPASTE INFO TEKST */}
            {chargingProfile === 'dynamic' && (
                <div className="mt-auto bg-blue-50 rounded-lg p-4 flex gap-3 items-start border border-blue-100 animate-fade-in">
                    <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 leading-relaxed">
                        <strong>Hoe werkt dit?</strong> Via uw laad-app of <strong>het menu in uw auto</strong> stelt u eenvoudig een timer in (bv. "Start om 01:00"). Zo pakt u automatisch de goedkope nachturen mee.
                    </div>
                </div>
            )}
        </div>

        {/* --- KAART 2: BATTERIJ --- */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col">
            <div className="mb-8 flex justify-between items-end">
                <div><h2 className="text-xl font-bold text-gray-900 mb-1">Batterijconditie</h2><p className="text-sm text-gray-500">Behoud maximale accucapaciteit.</p></div>
                <div className="text-right">
                    <span className={`text-3xl font-bold block ${batteryMode === 'daily' ? 'text-green-600' : 'text-blue-600'}`}>{batteryMode === 'daily' ? '80%' : '100%'}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wide font-bold">{batteryMode === 'daily' ? 'Woon-werk' : 'Vakantie'}</span>
                </div>
            </div>

            {/* ACCU VISUAL */}
            <div className="mb-8 px-4">
                <div className="relative h-14 w-full border border-gray-300 rounded-xl p-1 flex items-center">
                    <div className="w-full h-full flex gap-1">
                        {[...Array(10)].map((_, i) => {
                            const isFilled = (batteryMode === 'daily' && i < 8) || (batteryMode === 'trip');
                            let colorClass = "bg-gray-100"; 
                            if (isFilled) {
                                if (batteryMode === 'daily') colorClass = "bg-green-500";
                                else colorClass = i < 8 ? "bg-green-500" : "bg-blue-500";
                            }
                            return <div key={i} className={`flex-1 rounded-sm transition-all duration-500 ${colorClass}`}></div>;
                        })}
                    </div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-6 bg-gray-300 rounded-r-sm"></div>
                    <div className="absolute top-[-8px] left-[80%] -translate-x-1/2 flex flex-col items-center"><span className="text-[10px] font-bold text-gray-400">80%</span><div className="w-px h-2 bg-gray-300"></div></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2 px-1"><span>0%</span><span>100%</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <button onClick={() => setBatteryMode('daily')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${batteryMode === 'daily' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}><span className="font-bold text-sm">Dagelijks (80%)</span><span className="text-xs opacity-80">Aanbevolen</span></button>
                <button onClick={() => setBatteryMode('trip')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${batteryMode === 'trip' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}><span className="font-bold text-sm">Vakantie (100%)</span><span className="text-xs opacity-80">Incidenteel</span></button>
            </div>

            <div className="mt-auto flex gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p>{batteryMode === 'daily' ? "80% is ruim voldoende voor al uw dagelijkse ritten. Dit beschermt de accu tegen slijtage." : "Gebruik de volledige capaciteit alleen als u direct een lange rit gaat maken."}</p>
            </div>
        </div>
      </div>

      <div className="text-center mt-16">
         <h3 className="text-2xl font-bold mb-4 text-gray-900">Benieuwd naar de financiële impact?</h3>
         
         {/* SLIMME LINK: Geeft nu het scenario mee (fixed, dynamic, solar) */}
         <Link href={`/elektrisch-laden/kosten-en-besparingen?laadtype=thuis&scenario=${chargingProfile}`} className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-lg hover:shadow-xl">
            <BatteryCharging className="w-5 h-5" /> Bereken uw besparing
        </Link>
      </div>
    </main>
  );
}
import { Suspense } from 'react';
import Link from "next/link";
import { 
  ChevronRight, 
  MapPin, 
  BatteryCharging, 
  Clock, 
  ExternalLink, 
  Zap, 
  CreditCard, 
  Smartphone, 
  Battery 
} from "lucide-react";
import TripCalculator from "@/components/TripCalculator"; 

export default function VakantiePlannerPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Terug-link */}
      <Link href="/elektrisch-laden" className="inline-flex items-center text-blue-600 mb-8 hover:underline text-sm font-medium">
        <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Terug naar overzicht
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Vakantieplanner</h1>
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Ontdek hoe ver u komt met een elektrische occasion en bereken direct uw voordeel ten opzichte van brandstof.
        </p>
      </div>

      {/* Calculator Sectie */}
      <section className="mb-16">
        <Suspense fallback={<div className="p-20 text-center font-bold text-gray-400 animate-pulse">Route wordt berekend...</div>}>
          <TripCalculator />
        </Suspense>
      </section>

      {/* --- LAADSTRATEGIE SECTIE --- */}
      <section className="mt-24 mb-16">
        <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
                Laadstrategie & Besparing
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                Bespaar aanzienlijk op uw reiskosten door slim te kiezen waar en wanneer u laadt.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full font-bold text-[10px] uppercase w-fit mb-8 tracking-wider">Tesla</div>
                <h4 className="text-2xl font-black text-gray-900 mb-3">Universeel Superchargen</h4>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Tesla stelt steeds meer locaties open voor alle merken. Profiteer van het enorme netwerk en de hoge betrouwbaarheid. Beschikbaar via de Tesla-app; een abonnement geeft een flinke korting op de tarieven.</p>
                <div className="text-[11px] font-black text-red-600 uppercase tracking-widest">Dynamische prijs: €0,35 - €0,45 /kWh</div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full font-bold text-[10px] uppercase w-fit mb-8 tracking-wider">IONITY</div>
                <h4 className="text-2xl font-black text-gray-900 mb-3"> Premium Highway Strategy</h4>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Gebruik het IONITY Power abonnement (€11,99/mnd) om toegang te krijgen tot het scherpste snelwegtarief (350kW laders) van €0,39/kWh.</p>
                <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Van €0,79 naar €0,39 /kWh</div>
            </div>

            <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                <div className="bg-white text-emerald-600 px-4 py-1.5 rounded-full font-bold text-[10px] uppercase w-fit mb-8 tracking-wider">Frankrijk</div>
                <h4 className="text-2xl font-black text-emerald-900 mb-3">Slimme Lokale Laders</h4>
                <p className="text-emerald-800 text-sm mb-8 leading-relaxed">Zoek in landen als Frankrijk naar netwerken zoals IECharge of Electra. Deze staan vaak net iets buiten de snelweg. Met de juiste app of pas snellaad je hier al voor €0,20 - €0,40/kWh.</p>
                <div className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">prijs: ± €0,35 /kWh</div>
            </div>
        </div>
      </section>

      {/* --- TOOLS & TIPS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-8 md:p-12 text-white shadow-lg flex flex-col justify-between">
            <div>
                <h3 className="text-2xl font-black mb-4 flex items-center gap-2 italic">
                    <MapPin className="text-blue-300" /> Exacte route plannen?
                </h3>
                <p className="text-blue-100 leading-relaxed mb-8 text-base md:text-lg">
                    Onze calculator geeft een snelle indicatie. Voor de ultieme reisplanning raden wij <strong>A Better Routeplanner (ABRP)</strong> aan.
                </p>
                <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-blue-200 mb-10">
                    <span className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full"><BatteryCharging size={14}/> Nauwkeurige accu %</span>
                    <span className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full"><Clock size={14}/> Live verkeer</span>
                </div>
            </div>
            <a href="https://abetterrouteplanner.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center w-fit bg-white text-blue-700 px-10 py-5 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl gap-2 group text-lg">
                Open Routeplanner <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
            </a>
        </div>

        {/* --- HERSTELDE VAKANTIE TIPS TEKST --- */}
        <div className="md:col-span-1 bg-amber-50 rounded-[3rem] p-8 border border-amber-100 shadow-sm">
            <h3 className="text-xl font-black text-amber-900 mb-8 flex items-center gap-2 italic">
                <Zap size={22} className="fill-current" /> Vakantie Tips
            </h3>
            <ul className="space-y-8">
                <li className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl text-amber-600 shadow-sm shrink-0"><CreditCard size={20} /></div>
                    <div className="text-sm text-amber-900 leading-relaxed">
                        <strong className="block mb-1">Back-up Pas</strong>
                        Vertrouw nooit 100% op apps. Neem altijd een fysieke laadpas mee (bijv. Vattenfall of E-Flux).
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl text-amber-600 shadow-sm shrink-0"><Smartphone size={20} /></div>
                    <div className="text-sm text-amber-900 leading-relaxed">
                        <strong className="block mb-1">Tesla & Ionity App</strong>
                        Download de apps vooraf en koppel uw creditcard. Dit bespaart veel stress bij de laadpaal.
                    </div>
                </li>
                 <li className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl text-amber-600 shadow-sm shrink-0"><Battery size={20} /></div>
                    <div className="text-sm text-amber-900 leading-relaxed">
                        <strong className="block mb-1">80% Regel</strong>
                        Laad onderweg tot 80%. De laatste 20% gaat erg langzaam en is zonde van uw kostbare vakantietijd.
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </main>
  );
}
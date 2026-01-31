"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, HelpCircle, Coins, BadgeCheck, 
  ArrowRight, ShieldCheck, Zap, Info, AlertTriangle,
  Scale, CalendarClock, Gauge, Search, CheckCircle2, ArrowUpRight
} from "lucide-react";

// De data van de laadpalen
const MID_LAADPALEN = [
  { merk: "ABL", modellen: ["emH3"] },
  { merk: "Alfen", modellen: ["Eve Single Pro Line", "Eve Double Pro Line", "Eve Single S Line", "Twin", "Twin 5", "Twin 5 plus"] },
  { merk: "Autel", modellen: ["AC Ultra", "Maxi EU AC W22-C5-4G-L-M"] },
  { merk: "Bluebuilt", modellen: ["22 kW"] },
  { merk: "DIC", modellen: ["Charge Easy", "Laadzuil", "Basic laadzuil"] },
  { merk: "Easee", modellen: ["Charge Max", "Charge Pro"] },
  { merk: "Ecotap", modellen: ["Single Wallcharger", "Duo Wallcharger", "Duo Wide", "Duo Wide AC44"] },
  { merk: "Enovates", modellen: ["One", "Business", "Public", "Truck"] },
  { merk: "Eneco", modellen: ["Connectric"] },
  { merk: "Enphase", modellen: ["EV Charger 2"] },
  { merk: "Etrel", modellen: ["Inch Pro"] },
  { merk: "Evbox", modellen: ["Businessline Hub", "Businessline Satellite", "Elvi MID"] },
  { merk: "Hager", modellen: ["XVL122S", "Witty Plus"] },
  { merk: "KEBA", modellen: ["P30 C-series", "P30 X-series", "P30 company car", "P30 PV edition"] },
  { merk: "Mennekes", modellen: ["Amtron professional", "Amtron professional twincharge", "Amtron 4you"] },
  { merk: "Ohme", modellen: ["Home Pro"] },
  { merk: "Peblar", modellen: ["Business", "Home Plus"] },
  { merk: "Raedian", modellen: ["Neo", "Nex"] },
  { merk: "Shell / New Motion", modellen: ["Home advanced 2.0", "Home Geavanceerd 3.0"] },
  { merk: "Smappee", modellen: ["EV One", "EV Wall", "EV Base"] },
  { merk: "Solaredge", modellen: ["One EV Charger Pro", "se-evk22crm-01"] },
  { merk: "Tesla", modellen: ["Wall Connector 3 MID (Let op: moet de MID-versie zijn)"] },
  { merk: "Volt Time", modellen: ["Source Pro"] },
  { merk: "Wallbox", modellen: ["Em4"] },
  { merk: "Zaptec", modellen: ["Go 2", "Pro"] },
];

export default function EreUitlegPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPalen = MID_LAADPALEN.filter(item => 
    item.merk.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.modellen.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 bg-white text-slate-900">
      {/* Breadcrumbs */}
      <Link href="/elektrisch-laden" className="text-gray-500 mb-8 inline-flex items-center hover:text-gray-900 transition-colors text-sm font-medium">
        <ChevronRight className="rotate-180 w-4 h-4 mr-1" /> Terug naar overzicht
      </Link>

      {/* Hero Section */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
          <CalendarClock className="w-4 h-4" /> Nieuwe regeling vanaf 2025
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight italic">
          Geld verdienen met uw laadpaal: <span className="text-emerald-600">ERE-certificaten</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          Vanaf 1 januari 2025 kunt u de CO₂-besparing van uw laadsessies verkopen aan brandstofleveranciers. Dit levert een aantrekkelijke vergoeding op via het systeem van <strong>Emissiereductie-eenheden (ERE)</strong>.
        </p>
      </div>

      {/* Waarschuwing: Nieuwe Markt */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-16 rounded-r-2xl shadow-sm">
        <div className="flex gap-4">
          <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-900 text-lg">Let op: Een nieuwe en volatiele markt</h3>
            <p className="text-amber-800 text-sm leading-relaxed mb-3">
              De markt voor ERE-certificaten is nieuw en de prijzen kunnen sterk schommelen. De waarde is afhankelijk van vraag en aanbod. Wees dus kritisch op partijen die een hoge, vaste vergoeding garanderen over meerdere jaren.
            </p>
            <p className="font-bold text-amber-900 text-sm italic">
              Ons advies: Bind u nog niet vast aan lange contracten. U kunt laadsessies van een heel kalenderjaar tot 1 maart van het jaar daarop indienen.
            </p>
          </div>
        </div>
      </div>

      {/* Realistische cijfers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
          <Scale className="w-8 h-8 text-emerald-500 mb-4" />
          <h3 className="font-bold text-gray-900 mb-2 text-base">Indicatieve Marktwaarde</h3>
          <p className="text-sm text-gray-600">De ERE-prijs fluctueert, maar een realistische schatting is momenteel circa <strong>€0,10 per kWh</strong>. Deze prijs is al gecorrigeerd voor de Nederlandse stroommix.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
          <Coins className="w-8 h-8 text-emerald-500 mb-4" />
          <h3 className="font-bold text-gray-900 mb-2 text-base">Verwachte Netto Opbrengst</h3>
          <p className="text-sm text-gray-600">Na aftrek van een gemiddelde commissie (ca. 20%) ontvangt u netto circa <strong>€0,08 per kWh</strong>. Dit kan variëren per aanbieder.</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
          <BadgeCheck className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="font-bold text-gray-900 mb-2 text-base">De Koper</h3>
          <p className="text-sm text-gray-600">Brandstofleveranciers (zoals oliemaatschappijen) zijn wettelijk verplicht deze certificaten te kopen ter compensatie.</p>
        </div>
      </div>

      {/* MID-Meter Section */}
      <section className="mb-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Gauge className="text-emerald-400" /> De harde eis: MID-gecertificeerd
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Om de geladen stroom officieel te registreren, eist de overheid (NEa) een geijkte meting. Zonder dit bewijs worden er geen certificaten toegekend.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-emerald-500/20 p-1 rounded mt-1 text-emerald-400 font-bold text-xs italic">GOED</div>
                  <p className="text-sm"><span className="font-bold text-white">Toegestaan:</span> Een MID-gecertificeerde meter die <strong>ingebouwd</strong> is in de laadpaal.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-500/20 p-1 rounded mt-1 text-red-400 font-bold text-xs italic">FOUT</div>
                  <p className="text-sm"><span className="font-bold text-white">NIET toegestaan:</span> Een losse kWh-meter in uw meterkast of software-schattingen.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-bold mb-4">Check uw laadpaal</h4>
              <p className="text-xs text-slate-400 mb-4">
                Dit is een indicatieve lijst met modellen die vaak een MID-meter hebben. Controleer altijd de specificaties van uw eigen paal.
              </p>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Zoek op merk (bijv. Alfen)..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {filteredPalen.length > 0 ? (
                  filteredPalen.map((item) => (
                    <div key={item.merk} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">{item.merk}</div>
                      <div className="text-[11px] text-slate-300">{item.modellen.join(", ")}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">Geen resultaten gevonden...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectie: Hoe het werkt (Vervangt de berekening-bon) */}
      <section className="mb-16 bg-gradient-to-br from-slate-50 to-emerald-50/50 rounded-3xl p-8 border border-slate-100">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Linker kant: De uitleg */}
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-3 bg-emerald-100 px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              <Coins className="w-4 h-4" /> Cashback Principe
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
              Rijdt u straks voor <span className="text-emerald-600">€0,08 goedkoper</span> per kWh?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Die 8 cent klinkt misschien als een klein bedrag, maar op jaarbasis tikt het hard aan. Zie de ERE-vergoeding als een <strong>automatische korting op uw stroomtarief</strong>, simpelweg door uw auto thuis op te laden.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700">
                <div className="bg-emerald-100 p-1.5 rounded-full text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Uw stroomprijs daalt effectief aanzienlijk</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="bg-emerald-100 p-1.5 rounded-full text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Geldt voor elke geladen kWh thuis</span>
              </li>
            </ul>
          </div>

          {/* Rechter kant: Het Proces (Timeline) */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" /> In 3 stappen naar uw vergoeding:
            </h4>
            
            <div className="relative border-l-2 border-emerald-100 ml-3 pl-8 space-y-8">
              <div className="relative">
                <div className="absolute -left-[41px] bg-white border-2 border-emerald-500 w-5 h-5 rounded-full"></div>
                <h5 className="font-bold text-sm text-slate-900">1. Laden</h5>
                <p className="text-xs text-gray-500 leading-relaxed">U laadt uw auto thuis op met een MID-gecertificeerde laadpaal die uw verbruik nauwkeurig bijhoudt.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[41px] bg-white border-2 border-emerald-500 w-5 h-5 rounded-full"></div>
                <h5 className="font-bold text-sm text-slate-900">2. Registreren</h5>
                <p className="text-xs text-gray-500 leading-relaxed">U koppelt uw laadpaal aan een erkende ERE-aanbieder.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] bg-emerald-500 border-2 border-emerald-500 w-5 h-5 rounded-full"></div>
                <h5 className="font-bold text-sm text-slate-900">3. Ontvangen</h5>
                <p className="text-xs text-emerald-700 font-bold leading-relaxed">De CO₂-besparing wordt gebundeld en verkocht. Uw netto vergoeding wordt jaarlijks op uw rekening gestort.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <div className="mt-12 text-center pt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Bereken uw totale besparing</h3>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          De ERE-vergoeding is slechts één onderdeel van uw voordeel. Gebruik onze calculator om uw totale kosten te vergelijken met benzine of diesel.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
              href="/elektrisch-laden/kosten-en-besparingen" 
              className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Start de calculator <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <p className="mt-6 text-[10px] text-gray-400 italic uppercase tracking-widest">
        </p>
      </div>
      {/* Bronvermelding / Meer informatie */}
<section className="mb-16 border-t border-gray-100 pt-16">
  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
    Meer informatie & Bronnen
  </h4>
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <a 
      href="https://www.anwb.nl/auto/elektrisch-rijden/laadpalen/ere-certificaten" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200 group"
    >
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm font-bold text-blue-600">
        ANWB
      </div>
      <div>
        <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
          Dossier ERE-certificaten <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <div className="text-[11px] text-gray-500 italic">Officiële uitleg van de ANWB</div>
      </div>
    </a>

    <a 
      href="https://www.evrijders.nl/nieuws/ere-certificaten-hoe-werken-ze" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200 group"
    >
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm font-bold text-emerald-600">
        EV
      </div>
      <div>
        <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
          Hoe werken ze? <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <div className="text-[11px] text-gray-500 italic">Verdieping door EVrijders.nl</div>
      </div>
    </a>
  </div>
</section>
    </main>
  );
}
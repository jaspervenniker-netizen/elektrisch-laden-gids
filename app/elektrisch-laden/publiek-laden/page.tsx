"use client";
import Link from "next/link";
import { ChevronRight, PiggyBank, CreditCard, QrCode, Smartphone, BatteryCharging, Info, AlertTriangle, Plus, Equal, Minus, ExternalLink, CheckCircle2 } from "lucide-react";

export default function PubliekLadenPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 bg-white">
      {/* BREADCRUMB */}
      <Link href="/elektrisch-laden" className="text-gray-500 mb-8 inline-flex items-center hover:text-gray-900 transition-colors text-sm font-medium">
        <ChevronRight className="rotate-180 w-4 h-4 mr-1" /> Terug naar overzicht
      </Link>

      {/* HEADER */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
          Publiek Laden: Slimmer Laden op Straat
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
           Nederland heeft het beste laadnetwerk van Europa. Maar wist u dat de prijs voor exact dezelfde paal tot wel <span className="text-gray-900 font-bold">16 cent per kWh</span> kan verschillen, afhankelijk van hoe u betaalt?
        </p>
      </div>

      {/* --- BLOCK A: DE REKENSOM --- */}
      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-10 mb-12 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2 text-center justify-center border-b border-gray-200 pb-4">
            Hoe uw prijs is opgebouwd
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center">
            
            {/* BASIS */}
            <div className="bg-white p-5 rounded-2xl border-2 border-green-500 shadow-sm flex-1 w-full max-w-[200px]">
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest block mb-1">Direct Tarief</span>
                <span className="text-lg font-bold text-gray-900 block">Basisprijs</span>
                <div className="mt-2 flex items-center justify-center gap-1 text-green-600 font-bold text-xs">
                    <Minus size={12} /> Daluren korting
                </div>
            </div>

            <Plus className="text-gray-300 w-6 h-6 flex-shrink-0 rotate-90 lg:rotate-0" />

            {/* ROAMING */}
            <div className="bg-white p-5 rounded-2xl border border-orange-300 shadow-sm flex-1 w-full max-w-[200px]">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block mb-1">Roaming Fee</span>
                <span className="text-lg font-bold text-gray-900 block">1 - 3 cent</span>
                <p className="text-[10px] text-gray-400 mt-1">extra tarief dat de provider rekent voor roaming gebruik</p>
            </div>

            <Plus className="text-gray-300 w-6 h-6 flex-shrink-0 rotate-90 lg:rotate-0" />

            {/* PROVIDER FEES */}
            <div className="bg-white p-5 rounded-2xl border border-red-300 shadow-sm flex-1 w-full max-w-[200px]">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-1">Laadpas Fee</span>
                <span className="text-lg font-bold text-gray-900 block">Laadpas tarief</span>
                <p className="text-[10px] text-gray-400 mt-1">Vast bedrag per laadsessie of een extra prijs per kWh.</p>
            </div>

            <Equal className="text-gray-400 w-8 h-8 flex-shrink-0 rotate-90 lg:rotate-0" />

            {/* TOTAAL */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-xl flex-1 w-full max-w-[220px] text-white ring-4 ring-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Eindtotaal</span>
                <span className="text-2xl font-bold block mb-1 font-mono text-green-400">Uw Prijs</span>
                <p className="text-[10px] text-gray-400 italic">"Vaak 15% duurder."</p>
            </div>
        </div>
      </div>

      {/* --- BLOCK B: KIES UW STRATEGIE --- */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Kies uw Strategie</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

        {/* LINKER KAART: PRIJSBEWUST */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden flex flex-col hover:border-green-300 transition-all duration-300">
            <div className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-3 rounded-full"><PiggyBank className="w-6 h-6 text-green-700" /></div>
                    <h3 className="text-2xl font-bold text-gray-900">De Prijsbewuste Rijder</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    In regio <span className="font-bold">Noord-Holland, Flevoland en Utrecht</span> gelden scherpe prijsafspraken. Palen geplaatst vanaf juli 2024 zijn veel goedkoper (32-37 ct) dan oudere palen (47-52 ct). Gebruik de juiste methode om de 'kale' prijs en dalurenkorting te pakken.
                </p>
            </div>

            <div className="bg-gray-50 flex-grow p-8 pt-6 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 font-mono">Uw Lokale Toolkit</h4>
                <ul className="space-y-6">
                    {/* 1. VATTENFALL (NU BOVENAAN) */}
                    <li className="flex gap-4">
                        <div className="bg-white p-2 rounded-lg border border-gray-200 h-fit shadow-sm w-12 flex items-center justify-center shrink-0">
                            <div className="font-bold text-blue-800 text-[10px] text-center leading-tight">InCharge</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">Vattenfall InCharge Card</span>
                                <a href="https://incharge.vattenfall.nl/en/our-network/charging-card" target="_blank" rel="noopener noreferrer" className="text-blue-500"><ExternalLink size={14}/></a>
                            </div>
                            <span className="text-sm text-gray-500 block mt-1 leading-snug">
                                De 'thuispas' voor Vattenfall-palen: u betaalt het basisprijs zonder opslag. <span className="text-gray-700 italic">Voor incidenteel gebruik bij andere aanbieders betaalt u €0,35 starttarief per sessie maar geen extra kwh prijs.</span>
                            </span>
                        </div>
                    </li>
                    {/* 3. CHARGE ASSIST */}
                    <li className="flex gap-4">
                        <div className="bg-white p-2 rounded-lg border border-gray-200 h-fit shadow-sm w-12 flex justify-center shrink-0">
                            <Smartphone className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">Charge Assist App</span>
                                <a href="https://www.chargeassist.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500"><ExternalLink size={14}/></a>
                            </div>
                            <span className="text-sm text-gray-500 block mt-1 leading-snug">Ideaal voor TotalEnergies & Equans. Toont direct of de paal onder het goedkope nieuwe tarief valt.</span>
                        </div>
                    </li>
                    {/* 2. QR CODE */}
                    <li className="flex gap-4">
                        <div className="bg-white p-2 rounded-lg border border-gray-200 h-fit shadow-sm w-12 flex justify-center text-gray-700 shrink-0">
                            <QrCode size={24} />
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">Scan de QR-code</span>
                            <span className="text-sm text-gray-500 block mt-1 leading-snug">Snelste weg naar het lage tarief bij Shell/Ubitricity en de meeste nieuwe palen. U betaalt direct met uw telefoon.</span>
                        </div>
                    </li>
                    
                    
                </ul>
            </div>
        </div>

        {/* RECHTER KAART: GEMAK */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden flex flex-col hover:border-blue-300 transition-all duration-300">
            <div className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full"><CreditCard className="w-6 h-6 text-blue-700" /></div>
                    <h3 className="text-2xl font-bold text-gray-900">De Gemaksrijder</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Wilt u één pas voor alles? Kies dan een aanbieder die de marktprijs van de laadpaal 1-op-1 doorgeeft zonder extra kWh-opslag bovenop de stroomprijs.
                </p>
            </div>

            <div className="bg-gray-50 flex-grow p-8 pt-6 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 font-mono">Transparante Aanbieders</h4>
                <ul className="space-y-6 mb-8">
                    <li className="flex gap-4">
                        <div className="bg-white p-2 rounded-lg border border-gray-200 h-fit shadow-sm w-12 flex justify-center text-emerald-500 font-bold italic shrink-0">Tap</div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">Tap Electric</span>
                                <a href="https://www.tapelectric.app/nl/" target="_blank" rel="noopener noreferrer" className="text-blue-500"><ExternalLink size={14}/></a>
                            </div>
                            <span className="text-sm text-gray-500 block mt-1 leading-snug">U betaalt de kale marktprijs plus een vast maandbedrag of sessie-fee. Geen onzichtbare marges op uw stroomverbruik.</span>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="bg-white p-2 rounded-lg border border-gray-200 h-fit shadow-sm w-12 flex justify-center text-orange-500 font-bold shrink-0 text-xl">E</div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">E-Flux</span>
                                <a href="https://www.e-flux.io/nl/ev-driver" target="_blank" rel="noopener noreferrer" className="text-blue-500"><ExternalLink size={14}/></a>
                            </div>
                            <span className="text-sm text-gray-500 block mt-1 leading-snug">Werkt met een abonnement. Zeer betrouwbaar en geeft de laadpaalprijs direct door.</span>
                        </div>
                    </li>
                </ul>
                
                <div className="bg-blue-100/50 p-4 rounded-xl border border-blue-200 flex gap-3">
                    <Info className="text-blue-600 flex-shrink-0" size={20} />
                    <p className="text-sm text-blue-900 leading-tight">
                        Laadt u meer dan 2x per maand publiek? Dan is een abonnement (ca. €3,-) vaak al goedkoper dan de opslag per kWh betalen.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* --- MRA DETAILS SECTION (AANGEPAST) --- */}
      <div className="bg-slate-50 rounded-3xl p-8 mb-12 border border-slate-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tarieven in Regio MRA: Noord-Holland, Flevoland & Utrecht</h2>

        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NIEUW */}
            <div>
                <h4 className="flex items-center gap-2 font-bold text-green-700 mb-4">
                    <CheckCircle2 size={18} /> Nieuwe laadpalen (vanaf 1 juli 2024)
                </h4>
                <p className="text-xs text-gray-500 mb-4 italic leading-relaxed">Te herkennen aan het digitale scherm. Deze palen vallen onder de nieuwste prijsafspraken.</p>
                <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                        <span className="text-sm font-medium">TotalEnergies</span>
                        <span className="font-mono font-bold">€0,37 <span className="text-[10px] font-normal opacity-50">(1/2/25)</span></span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                        <span className="text-sm font-medium">Shell ubitricity</span>
                        <span className="font-mono font-bold">€0,35 <span className="text-[10px] font-normal opacity-50">(1/2/25)</span></span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                        <span className="text-sm font-medium">Vattenfall InCharge</span>
                        <span className="font-mono font-bold">€0,36 <span className="text-[10px] font-normal opacity-50">(5/2/25)</span></span>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-green-100/50 rounded-lg">
                    <p className="text-xs text-green-800 leading-relaxed font-medium">
                        <strong>Korting door Slim Laden:</strong> Bij deze palen krijgt u extra korting als u laadt buiten de piekuren via direct gebruik (QR of app).
                    </p>
                </div>
            </div>

            {/* OUD */}
            <div>
                <h4 className="flex items-center gap-2 font-bold text-red-700 mb-4">
                    <AlertTriangle size={18} /> Laadpalen geplaatst vóór 1 juli 2024
                </h4>
                <p className="text-xs text-gray-500 mb-4 italic leading-relaxed">Deze locaties behouden hun oude tariefstelling, ook als ze fysiek vernieuwd worden.</p>
                <div className="space-y-2 opacity-80">
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-slate-200">
                        <span className="text-sm font-medium">TotalEnergies</span>
                        <span className="font-mono">€0,48 <span className="text-[10px] opacity-50">(1/8/25)</span></span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-slate-200">
                        <span className="text-sm font-medium">Shell ubitricity</span>
                        <span className="font-mono">€0,47 <span className="text-[10px] opacity-50">(16/4/25)</span></span>
                    </div>
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-slate-200">
                        <span className="text-sm font-medium">Vattenfall InCharge</span>
                        <span className="font-mono">€0,52 <span className="text-[10px] opacity-50">(1/1/26)</span></span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* CTA FOOTER */}
      <div className="text-center bg-gray-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
         <h3 className="text-2xl md:text-3xl font-bold mb-4">Wat kost dit in de praktijk?</h3>
         <p className="text-gray-300 mb-8 max-w-2xl mx-auto italic text-sm font-light leading-relaxed">
            Nu u weet hoe de markt werkt, kunt u uw eigen voordeel berekenen. Vergelijk de kosten van publiek laden direct met uw huidige benzineauto.
         </p>
         
         <Link href="/elektrisch-laden/kosten-en-besparingen?laadtype=publiek" className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 hover:shadow-lg transition transform hover:-translate-y-1">
            <BatteryCharging className="w-5 h-5" /> 
            Naar de Besparingscalculator
        </Link>
      </div>

    </main>
  );
}
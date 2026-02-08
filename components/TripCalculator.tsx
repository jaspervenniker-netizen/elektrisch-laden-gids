"use client";

import { useState, useMemo, useEffect } from "react"; // <--- ADDED useEffect
import { Car, Sun, CloudSun, Snowflake, TrendingUp, Zap, Info, ChevronRight, Clock, ShieldCheck, Server } from "lucide-react";
import { carDatabase } from "@/app/lib/carData";
import { track } from '@vercel/analytics/react';


// --- CONSTANTEN ---
const HOME_RATE = 0.23;
const CHARGING_LOSS = 1.15; // 15% system loss
const AVG_HIGHWAY_SPEED = 104; 
const REAL_WORLD_ADJUSTMENT = 0.95; 

export default function TripCalculator() {
  // --- STATE ---
  const [distance, setDistance] = useState(2400); 
  const [selectedCarId, setSelectedCarId] = useState(carDatabase[0].id);
  const [batteryHealth, setBatteryHealth] = useState(94);
  const [tripType, setTripType] = useState<'summer' | 'mild' | 'winter'>('mild');
  const [gasPrice, setGasPrice] = useState(2.05);
  const [gasConsumption, setGasConsumption] = useState(7.5);
  const [showDetails, setShowDetails] = useState(false);

  const selectedCar = carDatabase.find(c => c.id === selectedCarId) || carDatabase[0];

  // --- CALCULATION ENGINE ---
  const results = useMemo(() => {
    // Smart Tiered Pricing Logic
    const isShortTrip = distance < 500;
    const appliedSubFee = isShortTrip ? 0 : 12.99;
    const appliedFastRate = isShortTrip ? 0.55 : 0.39;
    const pricingLabel = isShortTrip ? "(flex tarief)" : "(Incl. €12,99 abonnement)";

    const highwaySummer = selectedCar.highMild / 10; 
    const highwayWinter = selectedCar.highCold / 10;

    // 1. Efficiency setup
    let baseConsumption = highwaySummer;
    
    if (tripType === 'winter') baseConsumption = highwayWinter; 
    if (tripType === 'mild') baseConsumption = (highwaySummer * 0.70) + (highwayWinter * 0.30); 
    if (tripType === 'summer') baseConsumption = highwaySummer; 
    
    const consumption = baseConsumption * REAL_WORLD_ADJUSTMENT;
    const usableBatteryReal = selectedCar.batteryUsable * (batteryHealth / 100);
    
    const oneWayKm = distance / 2;
    const totalKwhNeededOneWay = (oneWayKm / 100) * consumption;
    const totalKwhNeededBothWays = (distance / 100) * consumption;
    
    const energyFromInitialCharge = usableBatteryReal * 0.9; 
    const fastChargeKwhNeededOneWay = Math.max(0, totalKwhNeededOneWay - energyFromInitialCharge);
    
    // 2. Stop Logic
    const legRange = (usableBatteryReal * 0.7 / consumption) * 100; 
    const firstLegRange = (usableBatteryReal * 0.9 / consumption) * 100; 
    
    let stops = 0;
    if (oneWayKm > firstLegRange) {
        stops = Math.ceil((oneWayKm - firstLegRange) / legRange);
    }

    // 3. Time Calculations
    const chargingTimeNetMin = (fastChargeKwhNeededOneWay / selectedCar.avgChargePower) * 60;
    const overheadPerStop = 5; 
    const chargingTimeMin = chargingTimeNetMin + (stops * overheadPerStop);
    
    const driveTimeMin = (oneWayKm / AVG_HIGHWAY_SPEED) * 60;
    const totalTimeMin = driveTimeMin + chargingTimeMin;

    // 4. Cost Logic
    const fastChargeKwhTotal = Math.max(0, totalKwhNeededBothWays - usableBatteryReal);
    
    const costEv = (usableBatteryReal * HOME_RATE) + 
                   (fastChargeKwhTotal * CHARGING_LOSS * appliedFastRate) + 
                   appliedSubFee;
    
    const costGas = (distance / 100) * gasConsumption * gasPrice;
    
    return {
        costEv, costGas, savings: costGas - costEv,
        stops, chargingTimeMin, driveTimeMin, totalTimeMin,
        realRange: (usableBatteryReal / consumption) * 100, 
        oneWayKm,
        pricingLabel
    };
  }, [distance, selectedCar, batteryHealth, tripType, gasPrice, gasConsumption]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[3rem] border border-gray-100 shadow-lg overflow-hidden">
        
        {/* --- LINKER PANEEL (INPUTS) --- */}
        <div className="lg:col-span-5 p-8 space-y-8">
            <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Route & Seizoen</label>
                <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100 flex gap-1 mb-4">
                    {[{ l: 'Limburg', k: 400 }, { l: 'Berlijn', k: 1300 }, { l: 'Zuid-Frankrijk', k: 2400 }].map((p) => (
                        <button key={p.l} onClick={() => setDistance(p.k)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${distance === p.k ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-100'}`}>{p.l}</button>
                    ))}
                </div>
                
                <div className="flex justify-between items-end mt-6 mb-2">
                    <span className="text-sm font-bold text-gray-600 italic">Afstand (Heen & Terug)</span>
                    <span className="text-lg font-black text-blue-600">{distance.toLocaleString('nl-NL')} km</span>
                </div>
                <input type="range" min="200" max="4000" step="50" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"/>

                <div className="grid grid-cols-3 gap-2 mt-6">
                  <button 
                    onClick={() => setTripType('summer')} 
                    className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border-2 transition-all ${
                      tripType === 'summer' 
                      ? 'border-orange-400 bg-orange-50 text-orange-700' 
                      : 'border-gray-100 bg-white text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <Sun size={16} className="mb-1" /> 
                    <span className="text-[9px] font-black uppercase tracking-tighter leading-none text-center">Optimale Condities</span>
                    <span className="text-[8px] mt-1 opacity-60">Zon (23°C)</span>
                  </button>

                  <button 
                    onClick={() => setTripType('mild')} 
                    className={`relative flex flex-col items-center justify-center py-3 px-1 rounded-2xl border-2 transition-all ${
                      tripType === 'mild' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                      : 'border-gray-100 bg-white text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <CloudSun size={16} className="mb-1" /> 
                    <span className="text-[9px] font-black uppercase tracking-tighter leading-none text-center">Standaard Condities</span>
                    <span className="text-[8px] mt-1 opacity-60">Gemiddeld weer</span>
                  </button>

                  <button 
                    onClick={() => setTripType('winter')} 
                    className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border-2 transition-all ${
                      tripType === 'winter' 
                      ? 'border-indigo-400 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-100 bg-white text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <Snowflake size={16} className="mb-1" /> 
                    <span className="text-[9px] font-black uppercase tracking-tighter leading-none text-center">Extreme Condities</span>
                    <span className="text-[8px] mt-1 opacity-60">Strenge vorst (-10°C)</span>
                  </button>
                </div>
            </div>

            <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Elektrisch Voertuig</label>
                <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <div className="text-blue-600 shrink-0"><Car size={20} /></div>
                    <select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)} className="w-full py-4 pl-3 bg-transparent border-none font-bold text-gray-700 outline-none appearance-none cursor-pointer">
                        {carDatabase.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <div className="text-gray-400 shrink-0 pointer-events-none"><ChevronRight size={16} className="rotate-90" /></div>
                </div>
                
                {/* Pro Choice Text Update */}
                <p className="mt-2 text-[10px] text-gray-400 leading-relaxed italic">
                  Berekening o.b.v. praktijkdata (EV Database). We rekenen met 110 km/u en 15% systeemverlies voor een eerlijke planning.
                </p>
                
                <div className="flex justify-between items-end mt-6 mb-2">
                    <span className="text-sm font-bold text-gray-600 italic">Accu Gezondheid (SOH)</span>
                    <span className="text-lg font-black text-blue-600">{batteryHealth}%</span>
                </div>
                <input type="range" min="80" max="100" value={batteryHealth} onChange={(e) => setBatteryHealth(Number(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
            </div>

            <div>
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Vergelijking (Huidige auto)</label>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-1 block">Benzineprijs (€/L)</label>
                        <input type="number" step="0.01" value={gasPrice} onChange={(e) => setGasPrice(Number(e.target.value))} className="w-full p-3 bg-gray-50 border-none rounded-xl font-bold text-center ring-1 ring-gray-100"/>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-1 block">Verbruik (L/100km)</label>
                        <input type="number" step="0.1" value={gasConsumption} onChange={(e) => setGasConsumption(Number(e.target.value))} className="w-full p-3 bg-gray-50 border-none rounded-xl font-bold text-center ring-1 ring-gray-100"/>
                    </div>
                </div>
            </div>
        </div>
        
        {/* --- RECHTER PANEEL (RESULTS) --- */}
        <div className="lg:col-span-7 bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between">
            <div className="border-b border-white/10 pb-10 mb-10">
                <h3 className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8 flex items-center gap-2"><TrendingUp size={14}/> Route Analyse (Enkele reis: {results.oneWayKm.toFixed(0)} km)</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="col-span-2 md:col-span-1">
                        <div className="text-5xl md:text-6xl font-black mb-1 tracking-tighter text-blue-400">
                             {Math.floor(results.totalTimeMin/60)}u {Math.round(results.totalTimeMin%60)}m
                        </div>
                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Totale Reistijd</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-4xl font-black mb-1 tracking-tighter text-slate-400">
                             {Math.floor(results.driveTimeMin/60)}u {Math.round(results.driveTimeMin%60)}m
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Clock size={10}/> Rijden</div>
                    </div>
                    <div>
                        <div className="text-2xl md:text-4xl font-black mb-1 text-blue-300 tracking-tighter">
                            {Math.floor(results.chargingTimeMin/60)}u {Math.round(results.chargingTimeMin%60)}m
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Zap size={10} className="fill-current text-yellow-400"/> Pauze en Laden</div>
                    </div>
                    <div>
    <div className="text-lg md:text-xl font-black mb-1 tracking-tighter leading-tight">
        {results.stops === 0 ? "Non-stop route" : `${results.stops} stops`}
    </div>
    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Stops</div>
    <div className="text-[9px] text-slate-400 italic leading-none">
        {results.stops === 0 
            ? "U rijdt deze route in één keer zonder te laden." 
            : `Gem. ${selectedCar.chargeTime10to80} min. Ideaal voor een koffie, lunch of sanitaire pauze.`
        }
    </div>
</div>
                </div>
            </div>

            <div className="flex-grow">
                <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-8">Kostenvergelijking (Heen & Terug)</h3>
                <div className="space-y-8 mb-10">
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-3 text-slate-400 italic"><span>Benzineauto</span><span>€ {results.costGas.toFixed(0)}</span></div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full"><div className="h-full bg-white/20 w-full rounded-full"></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-3">
                            <span className="text-blue-400 font-black uppercase tracking-widest">
                                {/* Tier Label Update */}
                                Occasion EV ✨ <span className="text-[9px] opacity-60 font-normal normal-case ml-1">{results.pricingLabel}</span>
                            </span>
                            <span>€ {results.costEv.toFixed(0)}</span>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5"><div className="h-full bg-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.3)]" style={{ width: `${Math.min((results.costEv / results.costGas) * 100, 100)}%` }}></div></div>
                    </div>
                </div>

                <div className="pt-8 border-t border-dashed border-white/10 mt-auto">
                    <span className="text-[11px] font-black text-slate-500 uppercase block mb-2 tracking-widest">Uw Reis Voordeel</span>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-6xl sm:text-7xl md:text-8xl font-black text-emerald-400 tracking-tighter">€ {results.savings.toFixed(0)}</div>
                            <button onClick={() => setShowDetails(!showDetails)} className={`p-2.5 rounded-full transition-all shrink-0 ${showDetails ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-white/5 hover:bg-white/10 text-slate-400'}`}><Info size={22} /></button>
                        </div>
                        <div className="hidden sm:block text-right">
                            <p className="text-[10px] text-slate-500 leading-tight italic">Op basis van<br />{distance.toLocaleString('nl-NL')} km</p>
                        </div>
                    </div>
                </div>

                {showDetails && (
                    <div className="mt-6 p-5 bg-white/5 rounded-2xl text-[10px] text-slate-400 space-y-4 leading-relaxed border border-white/10 animate-in fade-in slide-in-from-top-2">
                        <div>
                            <p className="text-white font-bold mb-1 uppercase tracking-wider text-[9px]">💰 KOSTEN & EFFICIËNTIE</p>
                            {/* Updated ShowDetails Explanation */}
                            <p>Voor ritten onder de 500km rekenen we met een Flex-tarief (€0,55) via o.a. Tesla of Fastned, zonder vaste kosten. Voor langere reizen adviseren we het Ionity-abonnement (€0,39) voor maximaal voordeel. De berekening is inclusief 15% systeemverlies (laden & stand-by).</p>
                        </div>
                        <div>
                            <p className="text-white font-bold mb-1 uppercase tracking-wider text-[9px]">🌨️ Weer, Snelheid & Nuance</p>
                            <p>De data gaat uit van een constante snelheid van 110 km/u (gemiddeld 104 km/u incl. verkeer).
• Optimale: 'Best-case' scenario bij 23°C zonder verwarming/airco.
• Standaard: Realistische mix (70/30 zomer/winter).
• Extreme: 'Worst-case' scenario bij -10°C met maximale verwarming.
De data is afkomstig uit de onafhankelijke EV Database™. Let op: Bij extreme kou kan de laadsnelheid in de praktijk lager uitvallen als de accu niet optimaal is voorverwarmd (cold-gate).</p>
                        </div>
                        <div>
                            <p className="text-white font-bold mb-1 uppercase tracking-wider text-[9px]">🔌 Laadstrategie (10-80% regel)</p>
                            <p>De calculator rekent met stops van 10% naar 80%. Boven de 80% vlakt de laadsnelheid bij vrijwel elke EV sterk af. Het is sneller om vaker en korter te laden. We rekenen met 5 minuten overhead per stop voor het aan- en afkoppelen bij de lader.</p>
                        </div>
                        <div>
                            <p className="text-white font-bold mb-1 uppercase tracking-wider text-[9px]">🔋 Accugezondheid (SOH)</p>
                            <p>De SOH-schuif simuleert de natuurlijke degradatie van de accu. Een occasion met 90% SOH heeft een 10% kleinere 'brandstoftank' dan een nieuwe auto. Dit heeft invloed op de actieradius tussen stops, maar niet op de efficiëntie van de motor.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* --- SECURITY INFO BLOCK --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        <div className="flex items-start gap-3 bg-white/50 p-4 rounded-2xl border border-gray-100">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 shrink-0">
            <Server size={18} />
          </div>
          <div>
            <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Beschikbaarheid</p>
            <p className="text-[11px] text-gray-500 leading-snug">Hoogste betrouwbaarheid via het IONITY & Tesla netwerk (99% uptime).</p>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-white/50 p-4 rounded-2xl border border-gray-100">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Laadsnelheid</p>
            <p className="text-[11px] text-gray-500 leading-snug">Dit model laadt van 10-80% in slechts {selectedCar.chargeTime10to80} minuten.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
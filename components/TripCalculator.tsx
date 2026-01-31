"use client";

import { useState, useMemo } from "react";
import { Car, Sun, Snowflake, TrendingUp, Zap, Info, ChevronRight, Clock } from "lucide-react";
import { carDatabase } from "@/app/lib/carData";

// --- CONSTANTEN ---
const HOME_RATE = 0.23;
const SUB_FAST_RATE = 0.39; 
const CHARGING_LOSS = 1.10; 
const SUB_FEE = 12.99;
const AVG_HIGHWAY_SPEED = 95; 

export default function TripCalculator() {
  // --- STATE ---
  const [distance, setDistance] = useState(2600);
  const [selectedCarId, setSelectedCarId] = useState(carDatabase[0].id);
  const [batteryHealth, setBatteryHealth] = useState(94);
  const [tripType, setTripType] = useState<'summer' | 'winter'>('summer');
  const [gasPrice, setGasPrice] = useState(2.05);
  const [gasConsumption, setGasConsumption] = useState(7.5);
  const [showDetails, setShowDetails] = useState(false);

  const selectedCar = carDatabase.find(c => c.id === selectedCarId) || carDatabase[0];

  // --- CALCULATION ENGINE ---
  const results = useMemo(() => {
    const consumption = tripType === 'winter' ? selectedCar.highwayWinter : selectedCar.highway;
    const usableBatteryReal = selectedCar.batteryUsable * (batteryHealth / 100);
    const totalKwhNeeded = (distance / 100) * consumption * CHARGING_LOSS;
    const fromHomeKwh = Math.min(usableBatteryReal, totalKwhNeeded);
    const fastChargeKwh = Math.max(0, totalKwhNeeded - fromHomeKwh);
    const costEv = (fromHomeKwh * HOME_RATE) + (fastChargeKwh * SUB_FAST_RATE) + SUB_FEE;
    
    const costGas = (distance / 100) * gasConsumption * gasPrice;

    const oneWayKm = distance / 2;
    const realRange = (usableBatteryReal / consumption) * 100;
    const firstLeg = realRange * 0.85; 
    const nextLegs = realRange * 0.70; 
    
    let stops = 0;
    if (oneWayKm > firstLeg) {
        stops = Math.ceil((oneWayKm - firstLeg) / nextLegs);
    }
    const chargingTimeMin = stops * selectedCar.chargeTime10to80;
    const driveTimeMin = (oneWayKm / AVG_HIGHWAY_SPEED) * 60;

    return {
        costEv, costGas, savings: costGas - costEv,
        stops, chargingTimeMin, driveTimeMin,
        realRange, oneWayKm
    };
  }, [distance, selectedCar, batteryHealth, tripType, gasPrice, gasConsumption]);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[3rem] border border-gray-100 shadow-lg overflow-hidden">
        
        {/* --- LINKER PANEEL (INPUTS) --- */}
        <div className="lg:col-span-5 p-8 space-y-8">
            <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Route & Seizoen</label>
                <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100 flex gap-1 mb-4">
                    {[{ l: 'Limburg', k: 400 }, { l: 'Berlijn', k: 1300 }, { l: 'Zuid-Frankrijk', k: 2600 }].map((p) => (
                        <button key={p.l} onClick={() => setDistance(p.k)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${distance === p.k ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-100'}`}>{p.l}</button>
                    ))}
                </div>
                
                <div className="flex justify-between items-end mt-6 mb-2">
                    <span className="text-sm font-bold text-gray-600 italic">Afstand (Heen & Terug)</span>
                    <span className="text-lg font-black text-blue-600">{distance.toLocaleString('nl-NL')} km</span>
                </div>
                <input type="range" min="200" max="4000" step="50" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"/>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <button onClick={() => setTripType('summer')} className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${tripType === 'summer' ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-100 text-gray-400'}`}><Sun size={18} /> <span className="text-xs font-bold">Zomer</span></button>
                    <button onClick={() => setTripType('winter')} className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${tripType === 'winter' ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-400'}`}><Snowflake size={18} /> <span className="text-xs font-bold">Winter</span></button>
                </div>
            </div>

            <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Elektrisch Voertuig</label>
                
                {/* --- FIX: FLEXBOX WRAPPER --- */}
                <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    {/* Icon is separate and stays on the left */}
                    <div className="text-blue-600 shrink-0">
                        <Car size={20} />
                    </div>
                    
                    {/* Select box starts AFTER the icon. No padding-left issues possible now. */}
                    <select 
                        value={selectedCarId} 
                        onChange={(e) => setSelectedCarId(e.target.value)} 
                        className="w-full py-4 pl-3 bg-transparent border-none font-bold text-gray-700 outline-none appearance-none cursor-pointer"
                    >
                        {carDatabase.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>

                    {/* Custom Arrow because appearance-none removes it */}
                    <div className="text-gray-400 shrink-0 pointer-events-none">
                        <ChevronRight size={16} className="rotate-90" />
                    </div>
                </div>
                
                <p className="text-[11px] text-gray-400 italic mt-3 px-2">
                  Verbruikscijfers o.b.v. realistische snelwegdata (<a href="https://ev-database.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">EV Database</a>).
                </p>

                <div className="flex justify-between items-end mt-4 mb-2">
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
                
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <div className="text-5xl md:text-6xl font-black mb-1 tracking-tighter">{results.stops}</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Laadstops</div>
                    </div>
                    <div>
                        <div className="text-5xl md:text-6xl font-black mb-1 tracking-tighter">
                            {Math.floor(results.driveTimeMin/60)}u {Math.round(results.driveTimeMin%60)}m
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                           <Clock size={10}/> Reistijd
                        </div>
                    </div>
                    <div>
                        <div className="text-5xl md:text-6xl font-black mb-1 text-blue-300 tracking-tighter">
                            {Math.floor(results.chargingTimeMin/60)}u {Math.round(results.chargingTimeMin%60)}m
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                            <Zap size={10} className="fill-current text-yellow-400"/> Extra Laadtijd
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow">
                <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-8">Kostenvergelijking (Heen & Terug)</h3>
                <div className="space-y-8 mb-10">
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-3 text-slate-400 italic"><span>Huidige Benzineauto</span><span>€ {results.costGas.toFixed(0)}</span></div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full"><div className="h-full bg-white/20 w-full rounded-full"></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-3"><span className="text-blue-400 font-black uppercase tracking-widest">Occasion EV ✨</span><span>€ {results.costEv.toFixed(0)}</span></div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5"><div className="h-full bg-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.3)]" style={{ width: `${Math.min((results.costEv / results.costGas) * 100, 100)}%` }}></div></div>
                    </div>
                </div>

                <div className="pt-8 border-t border-dashed border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <span className="text-[11px] font-black text-slate-500 uppercase block mb-1 tracking-widest">Uw Vakantie Voordeel</span>
                        <div className="text-7xl md:text-8xl font-black text-white tracking-tighter">€ {results.savings.toFixed(0)}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <button onClick={() => setShowDetails(!showDetails)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-all"><Info size={24} /></button>
                        <p className="text-[10px] text-slate-500 text-right">Op basis van {distance} km</p>
                    </div>
                </div>

                {showDetails && (
                    <div className="mt-6 p-5 bg-white/5 rounded-2xl text-[10px] text-slate-400 space-y-2 leading-relaxed border border-white/10 animate-in fade-in slide-in-from-top-2">
                        <p><strong>• Berekening:</strong> Vertrek met volle accu thuis (€{HOME_RATE.toFixed(2)}/kWh). Onderweg snelladen met abonnement (gem. €{SUB_FAST_RATE.toFixed(2)}/kWh). Inclusief €{SUB_FEE.toFixed(2)} abonnementskosten en 10% laadverlies.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
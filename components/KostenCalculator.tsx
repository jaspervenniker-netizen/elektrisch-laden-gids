"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from "next/link";
import { Sun, Snowflake, Scale, Home, Fuel, ArrowRight, Sparkles, Info, MapPin, ChevronRight } from "lucide-react"; 

// 1. Import the central database
import { carDatabase as sourceData } from "@/app/lib/carData";

// 2. Merge "Custom" option with your central data
// The calculator will simply ignore the extra fields (highway, battery) from the DB
const carList = [
  { id: "custom", name: "Kies uw model...", summer: 0, winter: 0 },
  ...sourceData
];

export default function KostenCalculator() {
  const [kms, setKms] = useState(15000);
  const [season, setSeason] = useState<'combined' | 'summer' | 'winter'>('combined');
  
  const [kwhPrice, setKwhPrice] = useState(0.22);
  const [gasPrice, setGasPrice] = useState(2.05);
  const [lossFactor, setLossFactor] = useState(1.15); 
  const [activeScenario, setActiveScenario] = useState<'home' | 'public'>('home');
  const [includeEre, setIncludeEre] = useState(false);

  // 3. Set default car dynamically (safest option)
  // If database has cars, pick the first one. Otherwise default to custom.
  const defaultCar = sourceData.length > 0 ? sourceData[0].id : "custom";
  const [selectedCar, setSelectedCar] = useState(defaultCar); 

  const [evConsumption, setEvConsumption] = useState(18.25); 
  const [gasConsumption, setGasConsumption] = useState(7.5); 

  const searchParams = useSearchParams();

  useEffect(() => {
    const laadType = searchParams.get('laadtype');
    const scenario = searchParams.get('scenario');

    if (laadType === 'publiek') {
        setActiveScenario('public');
        setKwhPrice(0.45);
        setIncludeEre(false);
    } else {
        setActiveScenario('home');
        if (scenario === 'solar') setKwhPrice(0.10); 
        else if (scenario === 'dynamic') setKwhPrice(0.19); 
        else if (scenario === 'fixed') setKwhPrice(0.23); 
    }
  }, [searchParams]);

  const setPreset = (type: 'home' | 'public') => {
    setActiveScenario(type); 
    if (type === 'home') { setKwhPrice(0.22); }
    else { setKwhPrice(0.45); setIncludeEre(false); }
  };

  useEffect(() => {
    // 4. Look up in carList instead of carDatabase
    const car = carList.find((c) => c.id === selectedCar);
    
    if (car && car.id !== "custom") {
      let usage = 0;
      // Because carData.ts uses the same property names (summer/winter), this just works!
      if (season === 'summer') usage = car.summer;
      else if (season === 'winter') usage = car.winter;
      else usage = (car.summer + car.winter) / 2;
      
      setEvConsumption(usage);
    }
  }, [selectedCar, season]);

  // BEREKENINGEN
  const realConsumption = evConsumption * lossFactor; 
  const pricePer100kmEV = realConsumption * kwhPrice;
  const pricePer100kmGas = gasConsumption * gasPrice;
  const savingsPer100km = pricePer100kmGas - pricePer100kmEV;
  
  const annualKwh = (kms / 100) * realConsumption;
  const ereCashback = includeEre ? (annualKwh * 0.08) : 0;

  const annualCostEV = ((kms / 100) * pricePer100kmEV) - ereCashback;
  const annualCostGas = (kms / 100) * pricePer100kmGas;
  const annualSavings = annualCostGas - annualCostEV;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Bereken Uw Voordeel</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
            {/* SEIZOEN TABS */}
            <div className="bg-gray-100 p-1 rounded-lg flex w-full gap-1">
                <button onClick={() => setSeason('combined')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${season === 'combined' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Scale size={16} /> Gemiddeld</button>
                <button onClick={() => setSeason('summer')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${season === 'summer' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Sun size={16} /> Zomer</button>
                <button onClick={() => setSeason('winter')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${season === 'winter' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Snowflake size={16} /> Winter</button>
            </div>
            
            <p className="text-[10px] text-gray-400 mt-1 text-center italic leading-tight">*Data gebaseerd op 'EV Database' praktijkcijfers.</p>

            {/* AUTO SELECTIE */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Elektrische Auto</label>
                <select 
                    value={selectedCar} 
                    onChange={(e) => setSelectedCar(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                    {/* 5. Map over carList */}
                    {carList.map((car) => {
                        let displayUsage = 0;
                        if (season === 'summer') displayUsage = car.summer;
                        else if (season === 'winter') displayUsage = car.winter;
                        else displayUsage = (car.summer + car.winter) / 2;
                        
                        return (
                            <option key={car.id} value={car.id}>
                                {car.name} {car.id !== 'custom' && `(${displayUsage.toFixed(1)} kWh/100km)`}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* BENZINE VERBRUIK */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Verbruik benzine/diesel auto (L/100km)</label>
                <div className="flex items-center gap-3">
                    <input type="number" step="0.1" value={gasConsumption} onChange={(e) => setGasConsumption(Number(e.target.value))} className="w-24 p-2 border rounded-lg text-center font-semibold focus:ring-2 focus:ring-blue-500 outline-none" />
                    <span className="text-sm text-gray-500 font-medium">(Dat is 1 op {(100 / gasConsumption).toFixed(1)})</span>
                </div>
            </div>

            {/* KILOMETERS */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Jaarlijkse kilometers: <span className="text-blue-600">{kms.toLocaleString()} km</span></label>
                <input type="range" min="5000" max="50000" step="1000" value={kms} onChange={(e) => setKms(Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            </div>
            
            <div className="border-t pt-4">
                <label className="block text-sm font-bold text-gray-700 mb-3">Hoe gaat u laden?</label>
                
                <div className="grid grid-cols-2 gap-3 mb-2">
                    <button onClick={() => setPreset('home')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${activeScenario === 'home' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300'}`}><Home size={20} className="mb-1" /><span className="text-xs font-bold">Thuis</span></button>
                    
                    <button onClick={() => setPreset('public')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${activeScenario === 'public' ? 'border-gray-100 bg-gray-100 text-gray-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300'}`}><Fuel size={20} className="mb-1" /><span className="text-xs font-bold">Publiek</span></button>
                </div>
                
                <Link href="/elektrisch-laden/snelladen-en-vakantie" className="block text-center text-xs text-blue-600 hover:underline mb-4 font-medium flex items-center justify-center gap-1">
                    Gaat u op verder van huis? Bereken hier snelladen & extra reistijd <ArrowRight size={12} />
                </Link>

                {/* ERE CASHBACK TOGGLE */}
                {activeScenario === 'home' && (
                <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-600" />
                        <div>
                        <p className="text-[11px] font-bold text-emerald-900 leading-none">ERE-Vergoeding (Cashback)</p>
                        <Link href="/elektrisch-laden/ere-uitleg" className="text-[9px] text-emerald-600 underline">Hoe werkt dit?</Link>
                        </div>
                    </div>
                    <input type="checkbox" checked={includeEre} onChange={(e) => setIncludeEre(e.target.checked)} className="w-4 h-4 accent-emerald-500 cursor-pointer" />
                    </div>
                    {includeEre && (
                    <p className="text-[9px] text-emerald-700 leading-tight italic">
                        * Wij rekenen met een realistische netto opbrengst van <strong>€0,08 per kWh</strong>.
                    </p>
                    )}
                </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stroomprijs (€/kWh)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500 text-sm">€</span>
                            <input type="number" step="0.01" value={kwhPrice} onChange={(e) => setKwhPrice(Number(e.target.value))} className="w-full pl-7 p-2 border rounded-lg font-mono text-sm" />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 italic">*Incl. 15% laadverlies</p>
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Benzineprijs (€/L)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500 text-sm">€</span>
                            <input type="number" step="0.01" value={gasPrice} onChange={(e) => setGasPrice(Number(e.target.value))} className="w-full pl-7 p-2 border rounded-lg font-mono text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* RESULTATEN RECHTS */}
        <div className="bg-blue-600 text-white p-6 md:p-8 rounded-xl flex flex-col justify-between relative overflow-hidden shadow-inner">
            <div>
                <h3 className="text-white/90 font-medium mb-1 text-sm">Uw jaarlijkse besparing</h3>
                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-extrabold tracking-tight">€{annualSavings.toFixed(0)}</span>
                    <span className="text-lg opacity-80">/ jaar</span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/10">
                    <h4 className="text-xs font-bold text-white/90 uppercase mb-3 border-b border-white/20 pb-2">Kosten per 100 km</h4>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-100 text-sm">⛽ Benzine:</span>
                        <span className="font-mono text-lg font-bold">€{pricePer100kmGas.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-blue-100 text-sm">⚡ Elektrisch:</span>
                        <span className="font-mono text-lg font-bold text-green-300">€{pricePer100kmEV.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between items-center pt-2 border-t border-white/20">
                        <span className="text-white font-bold text-sm">U bespaart per 100km:</span>
                        <span className="font-mono text-xl font-bold text-white">€{savingsPer100km.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-3 text-sm">
                <p className="text-center text-blue-100 text-[10px] mb-2 italic">Op basis van {kms.toLocaleString()} km per jaar</p>
                <div className="flex justify-between border-b border-white/20 pb-2">
                    <span className="text-blue-100">Totaal Benzine:</span>
                    <span className="font-mono opacity-90">€{annualCostGas.toFixed(0)}</span>
                </div>

                {includeEre && (
                  <div className="flex justify-between border-b border-white/20 pb-2 text-emerald-300 font-bold">
                    <span className="italic text-xs flex items-center gap-1 uppercase tracking-wider"><Sparkles size={10} /> ERE-Vergoeding:</span>
                    <span className="font-mono">- €{ereCashback.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-1">
                    <span className="text-blue-100">Totaal Elektrisch:</span>
                    <span className="font-mono font-bold text-white">€{annualCostEV.toFixed(0)}</span>
                </div>
            </div>
        </div>
      </div>

      {/* --- FOOTER TIP: VPA (Geen eigen oprit) --- */}
      <div className="mt-8 border-t border-gray-100 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="bg-white p-2.5 rounded-full shadow-sm shrink-0 hidden sm:block">
                  <MapPin className="text-indigo-600" size={20} />
              </div>
              <div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-bold">Stadstip:</span> Woont u in de stad zonder eigen oprit? 
                      In veel gemeentes mag u <span className="text-indigo-600 font-semibold italic">thuis laden via de stoep</span> (VPA).
                  </p>
              </div>
          </div>
          <Link 
              href="/elektrisch-laden/thuis-laden#vpa" 
              className="shrink-0 px-5 py-2.5 bg-white border border-indigo-100 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
              Bekijk de regels →
          </Link>
      </div>

    </div>
  );
}
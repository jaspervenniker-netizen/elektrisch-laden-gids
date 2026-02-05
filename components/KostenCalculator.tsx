"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
// Wrench toegevoegd aan imports
import { Leaf, Scale, Zap, Home, Fuel, Sparkles, MapPin, Info, Wrench } from "lucide-react"; 

// 1. Central database import
import { carDatabase as sourceData } from "@/app/lib/carData";

const carList = [
  { id: "custom", name: "Kies uw model...", summer: 0, winter: 0 },
  ...sourceData
];

export default function KostenCalculator() {
  const [kms, setKms] = useState(15000);
  const [profile, setProfile] = useState<'gemiddeld' | 'zuinig' | 'intensief'>('gemiddeld');
  
  const [kwhPrice, setKwhPrice] = useState(0.22);
  const [gasPrice, setGasPrice] = useState(2.05);
  const [lossFactor, setLossFactor] = useState(1.15); 
  const [activeScenario, setActiveScenario] = useState<'home' | 'public'>('home');
  const [includeEre, setIncludeEre] = useState(false);

  const defaultCar = sourceData.length > 0 ? sourceData[0].id : "custom";
  const [selectedCar, setSelectedCar] = useState(defaultCar); 

  const [evConsumption, setEvConsumption] = useState(18.25); 
  const [gasConsumption, setGasConsumption] = useState(7.5); 

  const searchParams = useSearchParams();

  // BOVAG Onderhoudscijfers 2024
  const maintenanceCostGas = 743; // Gemiddelde jaarnota brandstofauto
  const maintenanceCostEV = 332;  // Gemiddelde jaarnota EV
  const maintenanceSavings = maintenanceCostGas - maintenanceCostEV;

  useEffect(() => {
  const laadType = searchParams.get('laadtype');
  const scenario = searchParams.get('scenario');
  const modelParam = searchParams.get('model');

  // Handle Car Model Parameter
  if (modelParam) {
    const carExists = carList.some(c => c.id === modelParam);
    if (carExists) { setSelectedCar(modelParam); }
  }

  // Handle Scenario Selection
  if (laadType === 'publiek') {
    // Force Public if specifically requested in URL
    setActiveScenario('public');
    setKwhPrice(0.45);
    setIncludeEre(false);
  } else {
    // DEFAULT: Select 'home' if laadType is missing or set to home
    setActiveScenario('home');
    
    // Check for specific sub-scenarios, otherwise default to standard home price
    if (scenario === 'solar') {
      setKwhPrice(0.10); 
    } else if (scenario === 'dynamic') {
      setKwhPrice(0.19); 
    } else {
      // Standard Refresh / Main Menu default
      setKwhPrice(0.22); 
    }
  }
}, [searchParams]);

  const setPreset = (type: 'home' | 'public') => {
    setActiveScenario(type); 
    if (type === 'home') { setKwhPrice(0.22); }
    else { setKwhPrice(0.45); setIncludeEre(false); }
  };

  const calculateConsumption = (car: any, targetProfile: string) => {
    if (!car || car.id === "custom") return evConsumption;
    let valSummer = 0, valWinter = 0;

    if (targetProfile === 'zuinig') {
        valSummer = car.cityMild || (car.summer * 0.9);
        valWinter = car.cityCold || (car.winter * 0.9);
    } else if (targetProfile === 'intensief') {
        valSummer = car.highMild || car.highway || car.winter;
        valWinter = car.highCold || car.highwayWinter || (car.winter * 1.15);
    } else {
        valSummer = car.combMild || car.summer;
        valWinter = car.combCold || car.winter;
    }

    let weighted = (valSummer * 0.70) + (valWinter * 0.30);
    if (weighted > 50) weighted = weighted / 10;
    return weighted;
  };

  useEffect(() => {
    const car = carList.find((c) => c.id === selectedCar);
    if (car && car.id !== "custom") {
      setEvConsumption(calculateConsumption(car, profile));
    }
  }, [selectedCar, profile]);

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
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Bereken Uw Brandstof Voordeel</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
            {/* RIJPROFIEL TABS */}
            <div className="bg-gray-100 p-1 rounded-lg flex w-full gap-1">
                <button onClick={() => setProfile('zuinig')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 ${profile === 'zuinig' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Leaf size={14} /> Zuinig / Stad
                </button>
                <button onClick={() => setProfile('gemiddeld')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 ${profile === 'gemiddeld' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Scale size={14} /> Gemiddeld
                </button>
                <button onClick={() => setProfile('intensief')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2 ${profile === 'intensief' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Zap size={14} /> Snelweg / Intensief
                </button>
            </div>
            
            {/* DYNAMISCHE SUBTEKST */}
            <div className="flex items-start gap-2 text-[11px] text-gray-500 italic leading-tight px-1">
                <Info size={14} className="shrink-0 text-blue-400 mt-0.5" />
                {profile === 'zuinig' && <p>Optimale efficiëntie: Stad & 80km-wegen. Gebaseerd op EV Database™ 'City' data met een realistische 70/30 weer-correctie.</p>}
                {profile === 'gemiddeld' && <p>Een gemiddeld jaaroverzicht: Een gewogen mix van alle wegtypes. Gebaseerd op EV Database™ cijfers een realistische 70/30 weer-correctie.</p>}
                {profile === 'intensief' && <p>Voor de doorrijder: Veel snelwegkilometers of sportief rijden. Gebaseerd op de EV Database™ cijfers 'Highway' normen een realistische 70/30 weer-correctie.</p>}
            </div>

            {/* AUTO SELECTIE */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Elektrische Auto</label>
                <select 
                    value={selectedCar} 
                    onChange={(e) => setSelectedCar(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                    {carList.map((car) => {
                        const usage = calculateConsumption(car, profile);
                        return (
                            <option key={car.id} value={car.id}>
                                {car.name} {car.id !== 'custom' && `(${usage.toFixed(1)} kWh/100km)`}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* BENZINE VERBRUIK */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Verbruik huidige auto (L/100km)</label>
                <div className="flex items-center gap-3">
                    <input type="number" step="0.1" value={gasConsumption} onChange={(e) => setGasConsumption(Number(e.target.value))} className="w-24 p-2 border rounded-lg text-center font-semibold focus:ring-2 focus:ring-blue-500 outline-none" />
                    <span className="text-sm text-gray-500 font-medium">(Gelijk aan 1 op {(100 / gasConsumption).toFixed(1)})</span>
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
    {/* THUIS BUTTON */}
    <button onClick={() => setPreset('home')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${activeScenario === 'home' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300'}`}>
        <Home size={20} className="mb-1" />
        <span className="text-xs font-bold">Thuis</span>
    </button>

    {/* PUBLIEK BUTTON (Updated) */}
    <button onClick={() => setPreset('public')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${activeScenario === 'public' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300'}`}>
        <Fuel size={20} className="mb-1" />
        <span className="text-xs font-bold">Publiek</span>
    </button>
</div>

                {activeScenario === 'home' && (
                <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-600" />
                        <div>
                        <p className="text-[11px] font-bold text-emerald-900 leading-none">ERE-Vergoeding (Cashback)</p>
                        <Link href="/elektrisch-laden/ere-uitleg" className="text-[9px] text-emerald-600 underline">Wat is dit?</Link>
                        </div>
                    </div>
                    <input type="checkbox" checked={includeEre} onChange={(e) => setIncludeEre(e.target.checked)} className="w-4 h-4 accent-emerald-500 cursor-pointer" />
                    </div>
                </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stroomprijs (€/kWh)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500 text-sm">€</span>
                            <input type="number" step="0.01" value={kwhPrice} onChange={(e) => setKwhPrice(Number(e.target.value))} className="w-full pl-7 p-2 border rounded-lg font-mono text-sm" />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 italic">*Gecorrigeerd voor 15% laadverlies en netwerk-efficiëntie</p>
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
                <h3 className="text-white/90 font-medium mb-1 text-sm">Uw jaarlijkse brandstof besparing</h3>
                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-extrabold tracking-tight">€{annualSavings.toFixed(0)}</span>
                    <span className="text-lg opacity-80">/ jaar</span>
                </div>

                {/* KOSTEN PER 100 KM */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/10">
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

                {/* NIEUW: EXTRA ONDERHOUDSVOORDEEL (Wordt niet opgeteld bij totaal) */}
                <div className="bg-lime-500/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-lime-400/20">
    <div className="flex items-center gap-2 mb-2">
        <Wrench size={14} className="text-lime-400" />
        <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider">Extra Besparing: Onderhoud</h4>
    </div>
    <div className="flex justify-between items-baseline">
        <span className="text-4xl font-extrabold text-white">€{maintenanceSavings.toFixed(0)}</span>
        <span className="text-xs text-lime-100/80 italic">Jaarlijks gemiddelde*</span>
    </div>
    <p className="text-[10px] text-lime-100/70 mt-2 leading-tight">
        *Onderzoek toont aan dat EV-onderhoud 60% goedkoper is door het ontbreken van olie, filters en een uitlaat. (Bron: BOVAG 2024).
    </p>
</div>
            </div>
            
            <div className="space-y-3 text-sm">
                <p className="text-center text-blue-100 text-[10px] mb-2 italic">Op basis van {kms.toLocaleString()} km per jaar</p>
                <div className="flex justify-between border-b border-white/20 pb-2">
                    <span className="text-blue-100">Jaarkosten Benzine:</span>
                    <span className="font-mono opacity-90">€{annualCostGas.toFixed(0)}</span>
                </div>

                {includeEre && (
                  <div className="flex justify-between border-b border-white/20 pb-2 text-emerald-300 font-bold">
                    <span className="italic text-xs flex items-center gap-1 uppercase tracking-wider"><Sparkles size={10} /> ERE-Vergoeding:</span>
                    <span className="font-mono">- €{ereCashback.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-1">
                    <span className="text-blue-100">Jaarkosten Elektrisch:</span>
                    <span className="font-mono font-bold text-white">€{annualCostEV.toFixed(0)}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-100 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="bg-white p-2.5 rounded-full shadow-sm shrink-0 hidden sm:block">
                  <MapPin className="text-indigo-600" size={20} />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold">Stadstip:</span> Woont u in de stad zonder oprit? 
                  U mag vaak <span className="text-indigo-600 font-semibold italic">thuis laden via de stoep</span> (VPA).
              </p>
          </div>
          <Link href="/elektrisch-laden/thuis-laden#vpa" className="shrink-0 px-5 py-2.5 bg-white border border-indigo-100 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">Bekijk regels →</Link>
      </div>
    </div>
  );
}
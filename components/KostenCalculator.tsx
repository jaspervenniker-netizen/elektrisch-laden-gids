"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'; // <-- 1. IMPORTEREN
import { Sun, Snowflake, Scale } from "lucide-react"; 

const carDatabase = [
  { id: "custom", name: "Kies uw model...", summer: 0, winter: 0 },
  { id: "volvo_ex30", name: "Volvo EX30 Single Motor ER", summer: 15.5, winter: 21.0 },
  { id: "polestar_2", name: "Polestar 2 (LR Dual Motor)", summer: 16.9, winter: 22.7 },
  { id: "tesla_3_sr", name: "Tesla Model 3 Standard Range+", summer: 13.0, winter: 18.1 },
  { id: "tesla_s_75d", name: "Tesla Model S 75D", summer: 16.7, winter: 22.7 },
  { id: "volvo_xc40", name: "Volvo XC40 Recharge", summer: 20.0, winter: 26.3 },
  { id: "tesla_y", name: "Tesla Model Y (Long Range)", summer: 14.9, winter: 19.5 },
  { id: "vw_id4", name: "Volkswagen ID.4", summer: 16.5, winter: 21.5 },
];

export default function KostenCalculator() {
  const [kms, setKms] = useState(15000);
  const [season, setSeason] = useState<'combined' | 'summer' | 'winter'>('combined');
  const [kwhPrice, setKwhPrice] = useState(0.22);
  const [gasPrice, setGasPrice] = useState(2.05);
  const [lossFactor, setLossFactor] = useState(1.15); 
  const [selectedCar, setSelectedCar] = useState(carDatabase[1].id); 
  const [evConsumption, setEvConsumption] = useState(18.25); 
  const [gasConsumption, setGasConsumption] = useState(7.5); 

  const searchParams = useSearchParams(); // <-- 2. INITIALISEREN

  // NIEUW: Deze useEffect checkt de URL en past de preset aan
  useEffect(() => {
    const laadType = searchParams.get('laadtype');
    if (laadType === 'thuis') {
      setPreset('home');
    } else if (laadType === 'publiek') {
      setPreset('public');
    }
  }, [searchParams]);

  useEffect(() => {
    const car = carDatabase.find((c) => c.id === selectedCar);
    if (car && car.id !== "custom") {
      let usage = 0;
      if (season === 'summer') usage = car.summer;
      else if (season === 'winter') usage = car.winter;
      else usage = (car.summer + car.winter) / 2;
      setEvConsumption(usage);
    }
  }, [selectedCar, season]);

  const realConsumption = evConsumption * lossFactor; 
  const pricePer100kmEV = realConsumption * kwhPrice;
  const pricePer100kmGas = gasConsumption * gasPrice;
  const savingsPer100km = pricePer100kmGas - pricePer100kmEV;
  const annualCostEV = (kms / 100) * pricePer100kmEV;
  const annualCostGas = (kms / 100) * pricePer100kmGas;
  const annualSavings = annualCostGas - annualCostEV;

  const setPreset = (type: 'home' | 'public' | 'fast') => {
    if (type === 'home') { setKwhPrice(0.22); setLossFactor(1.15); }
    else if (type === 'public') { setKwhPrice(0.45); setLossFactor(1.15); }
    else if (type === 'fast') { setKwhPrice(0.75); setLossFactor(1.05); }
  };

  const getCardGradient = () => {
    if (season === 'winter') return 'bg-gradient-to-br from-slate-700 to-slate-900';
    if (season === 'summer') return 'bg-gradient-to-br from-orange-500 to-red-600';
    return 'bg-gradient-to-br from-blue-600 to-blue-800'; 
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Bereken Uw Voordeel</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* --- INPUTS --- */}
        <div className="space-y-6">
            
            <div className="bg-gray-100 p-1 rounded-lg flex w-full gap-1">
                <button onClick={() => setSeason('combined')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${season === 'combined' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Scale size={16} /> Gemiddeld</button>
                <button onClick={() => setSeason('summer')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${season === 'summer' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Sun size={16} /> Zomer</button>
                <button onClick={() => setSeason('winter')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${season === 'winter' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Snowflake size={16} /> Winter</button>
            </div>
            
            {/* NIEUWE DISCLAIMER */}
            <p className="text-[10px] text-gray-400 mt-1 text-center italic leading-tight">
              *Data gebaseerd op 'EV Database' praktijkcijfers: optimale zomercondities vs. slechtste winterscenario (-10°C).
            </p>

            {/* AUTO SELECTOR */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Auto Model</label>
                <select 
                    value={selectedCar} 
                    onChange={(e) => setSelectedCar(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    {carDatabase.map((car) => {
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
                <p className="text-xs text-gray-400 mt-1">*Verbruik update automatisch op basis van gekozen seizoen.</p>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Verbruik Benzineauto (L/100km)</label>
                <div className="flex items-center gap-3">
                    <input type="number" step="0.1" value={gasConsumption} onChange={(e) => setGasConsumption(Number(e.target.value))} className="w-24 p-2 border rounded-lg text-center font-semibold" />
                    <span className="text-sm text-gray-500">(1 op {(100 / gasConsumption).toFixed(1)})</span>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Jaarlijkse kilometers: <span className="text-blue-600">{kms.toLocaleString()} km</span></label>
                <input type="range" min="5000" max="50000" step="1000" value={kms} onChange={(e) => setKms(Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            </div>
            
            {/* PRIJZEN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Stroomprijs (€/kWh)</label>
                    <div className="flex gap-2 mb-2">
                        {/* UPDATE KNOP THUIS NAAR 0.22 */}
                        <button onClick={() => setPreset('home')} className={`text-xs px-2 py-1 rounded border ${kwhPrice === 0.22 ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-gray-50 hover:bg-gray-100'}`}>Thuis</button>
                        <button onClick={() => setPreset('public')} className={`text-xs px-2 py-1 rounded border ${kwhPrice === 0.45 ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-gray-50 hover:bg-gray-100'}`}>Publiek</button>
                        <button onClick={() => setPreset('fast')} className={`text-xs px-2 py-1 rounded border ${kwhPrice === 0.75 ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-gray-50 hover:bg-gray-100'}`}>Snel</button>
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">€</span>
                        <input type="number" step="0.01" value={kwhPrice} onChange={(e) => setKwhPrice(Number(e.target.value))} className="w-full pl-7 p-2 border rounded-lg font-mono" />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">*Incl. {Math.round((lossFactor - 1) * 100)}% laadverlies</p>
                </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 mt-[26px]">Benzineprijs (€/L)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">€</span>
                        <input type="number" step="0.01" value={gasPrice} onChange={(e) => setGasPrice(Number(e.target.value))} className="w-full pl-7 p-2 border rounded-lg font-mono" />
                    </div>
                </div>
            </div>
        </div>
        
        {/* --- RESULTATEN --- */}
        <div className={`text-white p-6 md:p-8 rounded-xl flex flex-col justify-between relative overflow-hidden shadow-inner transition-all duration-500 ${getCardGradient()}`}>
            
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
            {season === 'summer' && <div className="absolute top-10 right-10 text-6xl opacity-20 pointer-events-none animate-pulse">☀️</div>}
            {season === 'winter' && <div className="absolute top-10 right-10 text-6xl opacity-20 pointer-events-none">❄️</div>}
            {season === 'combined' && <div className="absolute top-10 right-10 text-6xl opacity-10 pointer-events-none">⚖️</div>}

            <div>
                <h3 className="text-white/90 font-medium mb-1">
                    Uw jaarlijkse besparing 
                    {season === 'summer' && ' (Zomer)'}
                    {season === 'winter' && ' (Winter)'}
                    {season === 'combined' && ' (Gemiddeld)'}
                </h3>
                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-extrabold tracking-tight">€{annualSavings.toFixed(0)}</span>
                    <span className="text-lg opacity-80">/ jaar</span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/10">
                    <h4 className="text-sm font-bold text-white/90 uppercase mb-3 border-b border-white/20 pb-2">Kosten per 100 km</h4>
                    
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-100 text-sm">⛽ Benzine:</span>
                        <span className="font-mono text-lg">€{pricePer100kmGas.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-blue-100 text-sm">⚡ Elektrisch:</span>
                        <span className={`font-mono text-lg font-bold ${season === 'winter' ? 'text-yellow-300' : 'text-green-300'}`}>€{pricePer100kmEV.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between items-center pt-2 border-t border-white/20">
                        <span className="text-white font-bold text-sm">U bespaart per 100km:</span>
                        <span className="font-mono text-xl font-bold text-white">€{savingsPer100km.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-3 text-sm">
                <p className="text-center text-blue-100 text-xs mb-2">Op basis van {kms.toLocaleString()} km per jaar</p>
                <div className="flex justify-between border-b border-white/20 pb-2">
                    <span className="text-blue-100">Totaal Benzine:</span>
                    <span className="font-mono opacity-90">€{annualCostGas.toFixed(0)}</span>
                </div>
                <div className="flex justify-between pt-1">
                    <span className="text-blue-100">Totaal Elektrisch:</span>
                    <span className="font-mono font-bold text-white">€{annualCostEV.toFixed(0)}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
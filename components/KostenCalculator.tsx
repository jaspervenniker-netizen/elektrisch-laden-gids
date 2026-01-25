"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { Sun, Snowflake, Scale, Home, Fuel, Plane, ArrowRight } from "lucide-react"; 

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
  
  // HIER IS DE MAGIE: We slaan de prijzen apart op in een object
  const [prices, setPrices] = useState({
    home: 0.22,
    public: 0.45
  });
  
  const [gasPrice, setGasPrice] = useState(2.05);
  const [lossFactor, setLossFactor] = useState(1.15); 
  const [activeScenario, setActiveScenario] = useState<'home' | 'public'>('home');

  const [selectedCar, setSelectedCar] = useState(carDatabase[1].id); 
  const [evConsumption, setEvConsumption] = useState(18.25); 
  const [gasConsumption, setGasConsumption] = useState(7.5); 

  const searchParams = useSearchParams();

  // Helper om prijs te updaten voor het actieve scenario
  const handlePriceChange = (val: number) => {
    setPrices(prev => ({ ...prev, [activeScenario]: val }));
  };

  useEffect(() => {
    const laadType = searchParams.get('laadtype');
    const scenario = searchParams.get('scenario');

    if (laadType === 'publiek') {
        setActiveScenario('public');
    } else {
        setActiveScenario('home');
        // Check of er een specifieke prijs uit de URL komt (bv. zonnepanelen)
        if (scenario === 'solar') handlePriceChange(0.10);
        else if (scenario === 'dynamic') handlePriceChange(0.19);
        else if (scenario === 'fixed') handlePriceChange(0.23);
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

  // Berekening gebruikt nu de prijs uit het geheugen object
  const currentKwhPrice = prices[activeScenario];
  
  const realConsumption = evConsumption * lossFactor; 
  const pricePer100kmEV = realConsumption * currentKwhPrice;
  const pricePer100kmGas = gasConsumption * gasPrice;
  const savingsPer100km = pricePer100kmGas - pricePer100kmEV;
  const annualCostEV = (kms / 100) * pricePer100kmEV;
  const annualCostGas = (kms / 100) * pricePer100kmGas;
  const annualSavings = annualCostGas - annualCostEV;

  const getCardGradient = () => {
    if (season === 'winter') return 'bg-gradient-to-br from-slate-700 to-slate-900';
    if (season === 'summer') return 'bg-gradient-to-br from-orange-500 to-red-600';
    return 'bg-gradient-to-br from-blue-600 to-blue-800'; 
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Bereken Uw Voordeel</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
            <div className="bg-gray-100 p-1 rounded-lg flex w-full gap-1">
                <button onClick={() => setSeason('combined')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${season === 'combined' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Scale size={16} /> Gemiddeld</button>
                <button onClick={() => setSeason('summer')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${season === 'summer' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Sun size={16} /> Zomer</button>
                <button onClick={() => setSeason('winter')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${season === 'winter' ? 'bg-white text-cyan-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Snowflake size={16} /> Winter</button>
            </div>
            
            <p className="text-[10px] text-gray-400 mt-1 text-center italic leading-tight">*Data gebaseerd op 'EV Database' praktijkcijfers.</p>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Auto Model</label>
                <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none">
                    {carDatabase.map((car) => {
                        let displayUsage = 0;
                        if (season === 'summer') displayUsage = car.summer;
                        else if (season === 'winter') displayUsage = car.winter;
                        else displayUsage = (car.summer + car.winter) / 2;
                        return <option key={car.id} value={car.id}>{car.name} {car.id !== 'custom' && `(${displayUsage.toFixed(1)} kWh/100km)`}</option>;
                    })}
                </select>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Jaarlijkse kilometers: <span className="text-blue-600">{kms.toLocaleString()} km</span></label>
                <input type="range" min="5000" max="50000" step="1000" value={kms} onChange={(e) => setKms(Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            </div>
            
            <div className="border-t pt-4">
                <label className="block text-sm font-bold text-gray-700 mb-3">Hoe gaat u laden?</label>
                
                {/* 3 KNOPPEN: THUIS / PUBLIEK / VAKANTIE LINK */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <button 
                        onClick={() => setActiveScenario('home')} 
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${activeScenario === 'home' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300'}`}
                    >
                        <Home size={20} className="mb-1" /><span className="text-xs font-bold">Thuis</span>
                    </button>
                    <button 
                        onClick={() => setActiveScenario('public')} 
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${activeScenario === 'public' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300'}`}
                    >
                        <Fuel size={20} className="mb-1" /><span className="text-xs font-bold">Publiek</span>
                    </button>
                    
                    {/* LINK NAAR VAKANTIE PAGINA */}
                    <Link href="/elektrisch-laden/snelladen-en-vakantie" className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-yellow-100 bg-yellow-50 text-yellow-700 hover:border-yellow-300 hover:bg-yellow-100 transition-all">
                        <Plane size={20} className="mb-1" /><span className="text-xs font-bold flex items-center gap-1">Vakantie <ArrowRight size={10} /></span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stroomprijs (€/kWh)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">€</span>
                            <input 
                                type="number" 
                                step="0.01" 
                                value={currentKwhPrice} 
                                onChange={(e) => handlePriceChange(Number(e.target.value))} 
                                className="w-full pl-7 p-2 border rounded-lg font-mono transition-all focus:ring-2 ring-blue-200" 
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">*Incl. {Math.round((lossFactor - 1) * 100)}% laadverlies</p>
                    </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Benzineprijs (€/L)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">€</span>
                            <input type="number" step="0.01" value={gasPrice} onChange={(e) => setGasPrice(Number(e.target.value))} className="w-full pl-7 p-2 border rounded-lg font-mono" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className={`text-white p-6 md:p-8 rounded-xl flex flex-col justify-between relative overflow-hidden shadow-inner transition-all duration-500 ${getCardGradient()}`}>
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
            {season === 'summer' && <div className="absolute top-10 right-10 text-6xl opacity-20 pointer-events-none animate-pulse">☀️</div>}
            {season === 'winter' && <div className="absolute top-10 right-10 text-6xl opacity-20 pointer-events-none">❄️</div>}
            {season === 'combined' && <div className="absolute top-10 right-10 text-6xl opacity-10 pointer-events-none">⚖️</div>}

            <div>
                <h3 className="text-white/90 font-medium mb-1">Uw jaarlijkse besparing</h3>
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
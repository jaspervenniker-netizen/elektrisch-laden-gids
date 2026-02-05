"use client";

import React, { useState, useMemo } from 'react';
import { 
  BatteryCharging, Wallet, MapPin, Printer, 
  Globe, Leaf, Scale, Zap, Wrench, Heart, Calendar 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { carDatabase } from '@/app/lib/carData';

export default function LabelPage() {
  // Inputs
  const [selectedId, setSelectedId] = useState(carDatabase[0].id);
  const [soh, setSoh] = useState(92); 
  const [year, setYear] = useState("2021");

  // Find selected car
  const car = useMemo(() => 
    carDatabase.find(c => c.id === selectedId) || carDatabase[0]
  , [selectedId]);

  // MATH LOGIC (Aligned with your calculator)
  const metrics = useMemo(() => {
    // Constants from your calculator
    const kms = 15000;
    const gasPrice = 2.05;
    const gasConsumption = 7.5; // L/100km
    const kwhPrice = 0.22; // Default home price
    const lossFactor = 1.15; // 15% charging loss
    const sohFactor = soh / 100;

    // Helper: 70/30 weighting (Mild/Cold) 
    // and converting Wh/km to kWh/100km (divide by 10)
    const getWeightedKwh = (mild: number, cold: number) => {
      const weighted = (mild * 0.70) + (cold * 0.30);
      return weighted / 10; 
    };

    // 1. Calculate weighted consumption for each profile
    const consStad = getWeightedKwh(car.cityMild, car.cityCold);
    const consMix = getWeightedKwh(car.combMild, car.combCold);
    const consHigh = getWeightedKwh(car.highMild, car.highCold);

    // 2. Calculate Ranges (kms)
    // Formula: (Battery / Consumption per km) * SOH
    const stadRange = (car.batteryUsable / (consStad / 100)) * sohFactor;
    const mixRange = (car.batteryUsable / (consMix / 100)) * sohFactor;
    const highRange = (car.batteryUsable / (consHigh / 100)) * sohFactor;

    // 3. Financial Savings
    const annualCostGas = (kms / 100) * gasConsumption * gasPrice;
    
    // EV Cost includes the lossFactor (1.15) just like your calculator
    const realEvCons = consMix * lossFactor;
    const annualCostEV = (kms / 100) * realEvCons * kwhPrice;
    
    const fuelSavings = Math.round(annualCostGas - annualCostEV);
    const maintenanceSavings = 411; // BOVAG 2024 Average

    return { 
      stad: Math.round(stadRange), 
      mix: Math.round(mixRange), 
      high: Math.round(highRange), 
      fuelSavings,
      maintenanceSavings 
    };
  }, [car, soh]);

  const dynamicUrl = `https://evstartpakket.nl/elektrisch-laden/kosten-en-besparingen?model=${car.id}`;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-row bg-slate-900 overflow-hidden font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .no-print { display: none !important; }
          .print-container { padding: 0 !important; margin: 0 !important; background: none !important; display: block !important; }
          .print-sheet { width: 210mm; height: 297mm; box-shadow: none !important; margin: 0 !important; }
        }
      `}} />

      {/* SIDEBAR */}
      <div className="no-print w-80 bg-slate-800 text-white flex flex-col border-r border-slate-700 shrink-0">
        <div className="p-6 border-b border-slate-700">
          <button onClick={() => window.print()} className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg uppercase tracking-tight">
            <Printer size={18} /> Print Label
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Model Selection */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Auto Model</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-xs text-white outline-none" 
              value={selectedId} 
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {carDatabase.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Year Input */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Bouwjaar</label>
            <div className="relative">
               <Calendar className="absolute left-3 top-3 text-slate-500" size={16} />
               <input 
                 type="text" 
                 className="w-full bg-slate-900 border border-slate-700 p-3 pl-10 rounded-xl text-xs text-white outline-none" 
                 value={year} 
                 onChange={(e) => setYear(e.target.value)}
               />
            </div>
          </div>

          {/* SOH Slider */}
          <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-700">
            <label className="block text-[10px] font-black text-green-400 uppercase mb-2 tracking-widest">Batterij Conditie (SOH): {soh}%</label>
            <input 
              type="range" min="50" max="100" 
              className="w-full h-2 accent-green-500 cursor-pointer" 
              value={soh} 
              onChange={(e) => setSoh(parseInt(e.target.value))} 
            />
            <p className="text-[9px] text-slate-500 mt-2 italic">Verlaagt het bereik proportioneel</p>
          </div>
        </div>
      </div>

      {/* PREVIEW */}
      <div className="print-container flex-1 bg-slate-200 p-10 overflow-y-auto flex justify-center h-full">
        <div className="print-sheet w-[210mm] min-h-[297mm] h-auto bg-white shadow-2xl flex flex-col relative shrink-0">
          
          <div className="print-header bg-[#131826] text-white p-10 pb-12">
             <div className="flex justify-between items-center mb-6">
                <div className="bg-white p-3 rounded-xl shadow-lg">
                   <img src="/logo.png" alt="Welovo" className="h-8 w-auto object-contain" />
                </div>
             </div>
             <h1 className={`${car.name.length > 30 ? 'text-[30px]' : 'text-[38px]'} font-black leading-tight mb-2 tracking-tight`}>{car.name}</h1>
             <p className="text-slate-400 text-lg opacity-80 font-medium tracking-tight">Bouwjaar {year} • {car.batteryUsable} kWh Accu • Occasion</p>
          </div>

          <div className="print-soh-card mx-10 -mt-6 bg-white p-6 rounded-2xl shadow-xl border-l-[10px] border-green-500 flex items-center justify-between z-10">
             <div className="flex items-center gap-6">
               <div className="p-4 bg-green-50 text-green-600 rounded-full shadow-inner"><BatteryCharging size={32} /></div>
               <div>
                 <p className="text-[10px] text-slate-400 uppercase font-black mb-1 tracking-wider">Batterij Conditie (SOH)</p>
                 <div className="flex items-center gap-3">
                   <p className="text-[44px] font-black text-slate-900 leading-none">{soh}%</p>
                   <div className="text-[8px] text-green-600 font-black border border-green-100 px-2 py-1 rounded uppercase">Geverifieerd</div>
                 </div>
               </div>
             </div>
             <div className="text-right border-l border-slate-100 pl-8 shrink-0">
               <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Snel Laden (10-80%)</p>
               <p className="text-3xl font-black text-slate-900">{car.chargeTime10to80} min</p>
             </div>
          </div>

          <div className="print-main-content px-10 py-6 flex-1 flex flex-col justify-center">
            <div className="flex items-end justify-between mb-4 border-b pb-4">
              <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                <MapPin className="text-[#131826]" size={24} /> 
                Realistisch Bereik <span className="text-slate-300 font-medium text-lg">/ km</span>
              </h2>
              <span className="text-[10px] font-black text-white bg-[#131826] px-3 py-1 rounded uppercase tracking-wider">INCL. {soh}% SOH</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100 text-center">
                 <Leaf className="mx-auto mb-3 text-emerald-600" size={24} />
                 <p className="text-[9px] font-black text-slate-400 uppercase">STAD</p>
                 <p className="text-[44px] font-black text-slate-900 leading-none">{metrics.stad}</p>
                 <p className="text-[8px] text-emerald-600 font-bold mt-2 uppercase">Zuinig</p>
              </div>
              <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-100 text-center">
                 <Scale className="mx-auto mb-3 text-blue-600" size={24} />
                 <p className="text-[9px] font-black text-slate-400 uppercase">MIX</p>
                 <p className="text-[44px] font-black text-slate-800 leading-none">{metrics.mix}</p>
                 <p className="text-[8px] text-blue-500 font-bold mt-2 uppercase">Gemiddeld</p>
              </div>
              <div className="bg-orange-50/30 p-5 rounded-2xl border border-orange-100 text-center">
                 <Zap className="mx-auto mb-3 text-orange-500" size={24} />
                 <p className="text-[9px] font-black text-slate-400 uppercase">SNELWEG</p>
                 <p className="text-[44px] font-black text-slate-900 leading-none">{metrics.high}</p>
                 <p className="text-[8px] text-orange-600 font-bold mt-2 uppercase">Intensief</p>
              </div>
            </div>
          </div>

          <div className="print-savings-card bg-slate-50 mx-10 p-6 rounded-3xl border border-slate-200 shadow-inner mb-6 space-y-3">
             <h2 className="text-xl font-black mb-2 flex items-center gap-3 tracking-tighter"><Wallet className="text-green-600" size={22} /> Uw Financieel Voordeel</h2>
             
             <div className="flex justify-between items-center border-b border-slate-200 pb-3">
               <div>
                  <span className="block text-slate-500 font-black text-lg uppercase tracking-tighter leading-none mb-1">Jaarlijkse Brandstof Besparing</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">t.o.v. brandstofauto (15.000km/j @ 7.5L/100km)</span>
               </div>
               <span className="text-[52px] font-black text-green-600 tracking-tighter leading-none">€ {metrics.fuelSavings}</span>
             </div>

             <div className="flex justify-between items-center font-black text-slate-900 border-b border-slate-100 pb-3">
               <span className="uppercase text-[10px] text-slate-400 font-black leading-none tracking-widest">Maandelijkse Besparing op Brandstof</span>
               <span className="text-2xl font-black leading-none">-€ {Math.round(metrics.fuelSavings/12)} / mnd</span>
             </div>

             <div className="flex justify-between items-center pt-1">
                <div className="flex items-center gap-3">
                   <Wrench size={18} className="text-slate-400" />
                   <div>
                      <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Jaarlijkse Besparing Onderhoud</h4>
                      <p className="text-[8px] text-slate-400 font-medium max-w-[320px] leading-tight italic">
                         EV-onderhoud is ca. 60% goedkoper (Bron: BOVAG 2024).
                      </p>
                   </div>
                </div>
                <div className="text-right">
                   <span className="text-2xl font-black text-slate-800 leading-none">€{metrics.maintenanceSavings}</span>
                </div>
             </div>
          </div>

          <div className="print-footer mt-auto bg-[#131826] text-white p-10 pb-16 flex items-center justify-between">
             <div className="max-w-[70%]">
               <h3 className="text-[26px] font-black mb-2 text-white tracking-tighter uppercase italic">Bespaarberekening op maat?</h3>
               <p className="text-[14px] text-slate-300 leading-relaxed font-medium mb-6">Scan de QR-code voor een berekening op basis van uw eigen stroomprijs en kilometers via evstartpakket.nl</p>
               <div className="flex items-center gap-6 text-slate-400 font-black text-[11px] tracking-widest border-t border-white/10 pt-5">
                 <div className="flex items-center gap-2 uppercase italic"><Heart size={12} fill="currentColor" className="text-red-500"/> Vragen? Onze adviseurs staan voor u klaar.</div>
                 <div className="flex items-center gap-2"><Globe size={14} className="text-green-500"/> evstartpakket.nl</div>
               </div>
             </div>
             <div className="bg-white p-4 rounded-2xl shadow-2xl shrink-0">
               <div className="w-24 h-24 bg-white flex flex-col items-center justify-center text-[#131826]">
                 <QRCodeSVG value={dynamicUrl} size={90} level={"H"} />
                 <span className="text-[8px] font-black uppercase mt-2 leading-none">Scan & Bereken</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
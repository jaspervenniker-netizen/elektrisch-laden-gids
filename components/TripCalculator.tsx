"use client";
import { useState, useEffect } from "react";
import { Zap, Clock, Euro } from "lucide-react";

// Vereenvoudigde database met accugrootte
const carTripDatabase = [
  { id: "volvo_ex30", name: "Volvo EX30 SR", battery: 51, summer: 15.5, winter: 21.0 },
  { id: "polestar_2", name: "Polestar 2 LR", battery: 78, summer: 16.9, winter: 22.7 },
  { id: "tesla_y", name: "Tesla Model Y LR", battery: 75, summer: 14.9, winter: 19.5 },
  { id: "volvo_xc40", name: "Volvo XC40", battery: 78, summer: 20.0, winter: 26.3 },
];

export default function TripCalculator() {
  const [tripDistance, setTripDistance] = useState(500);
  const [selectedCarId, setSelectedCarId] = useState(carTripDatabase[0].id);
  const [season, setSeason] = useState<'summer' | 'winter'>('summer');

  // Resultaten
  const [stops, setStops] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const car = carTripDatabase.find(c => c.id === selectedCarId);
    if (!car) return;

    // --- LOGICA ---
    const fastChargePrice = 0.75; // €/kWh
    const timePerStop = 25; // minuten (10-80%)
    
    const consumption = season === 'summer' ? car.summer : car.winter;
    const usableBattery = car.battery * 0.7; // We gebruiken 70% van de accu (van 10% tot 80%)
    
    // De realistische actieradius per laadstop
    const rangePerCharge = (usableBattery / consumption) * 100;
    
    // Bereken het aantal stops
    const numStops = tripDistance > rangePerCharge ? Math.ceil(tripDistance / rangePerCharge) - 1 : 0;
    
    // Bereken de totale kosten
    const totalEnergyNeeded = (tripDistance / 100) * consumption;
    const cost = totalEnergyNeeded * fastChargePrice;

    // Update de resultaten
    setStops(numStops);
    setTotalTime(numStops * timePerStop);
    setTotalCost(cost);

  }, [tripDistance, selectedCarId, season]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Plan uw Reis</h2>
        
        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Reisafstand (km)</label>
                <input type="number" value={tripDistance} onChange={(e) => setTripDistance(Number(e.target.value))} className="w-full p-3 border rounded-lg font-semibold" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Auto Model</label>
                <select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50">
                    {carTripDatabase.map(car => (
                        <option key={car.id} value={car.id}>{car.name}</option>
                    ))}
                </select>
            </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Seizoen</label>
                <select value={season} onChange={(e) => setSeason(e.target.value as any)} className="w-full p-3 border rounded-lg bg-gray-50">
                    <option value="summer">☀️ Zomer</option>
                    <option value="winter">❄️ Winter</option>
                </select>
            </div>
        </div>

        {/* RESULTATEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
                <Zap className="mx-auto text-blue-500 mb-2" />
                <span className="block text-3xl font-bold text-blue-800">{stops}</span>
                <span className="text-sm text-gray-600">Laadstops</span>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
                <Clock className="mx-auto text-green-500 mb-2" />
                <span className="block text-3xl font-bold text-green-800">~{totalTime} min</span>
                <span className="text-sm text-gray-600">Totale Laadtijd</span>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
                <Euro className="mx-auto text-yellow-500 mb-2" />
                <span className="block text-3xl font-bold text-yellow-800">€{totalCost.toFixed(0)}</span>
                <span className="text-sm text-gray-600">Energiekosten</span>
            </div>
        </div>
    </div>
  );
}
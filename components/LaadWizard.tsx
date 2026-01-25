"use client"; // Nodig omdat dit interactief is (state)

import { useState } from "react";
import Link from "next/link";

export default function LaadWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ location: "", solar: "", trips: "" });

  const handleAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
  };

  // Logica voor het profiel (Versimpeld voorbeeld)
  const getProfile = () => {
    if (answers.location === "own" && answers.trips === "long") return "Thuis-lader met vakantieplannen";
    if (answers.location === "street") return "De Publieke Lader";
    return "De Flexibele Elektrische Rijder";
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-10 border border-gray-100">
      {/* STAP 1 */}
      {step === 1 && (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Stap 1/3: Waar parkeert u 's nachts meestal?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => handleAnswer("location", "own")} className="p-6 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition">
              🏠<br/>Eigen oprit / Garage
            </button>
            <button onClick={() => handleAnswer("location", "apt")} className="p-6 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition">
              🏢<br/>Appartement (Parkeervak)
            </button>
            <button onClick={() => handleAnswer("location", "street")} className="p-6 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition">
              🚗<br/>Op straat
            </button>
          </div>
        </div>
      )}

      {/* STAP 2 */}
      {step === 2 && (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Stap 2/3: Heeft u zonnepanelen?</h3>
          <div className="flex justify-center gap-4">
            <button onClick={() => handleAnswer("solar", "yes")} className="px-8 py-3 bg-green-100 text-green-800 rounded-full font-semibold hover:bg-green-200">Ja</button>
            <button onClick={() => handleAnswer("solar", "no")} className="px-8 py-3 bg-gray-100 text-gray-800 rounded-full font-semibold hover:bg-gray-200">Nee</button>
          </div>
        </div>
      )}

      {/* STAP 3 */}
      {step === 3 && (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Stap 3/3: Rijdt u vaak lange afstanden (&gt;250km)?</h3>
          <div className="flex flex-col gap-3">
             <button onClick={() => handleAnswer("trips", "daily")} className="p-4 border rounded hover:bg-blue-50">Dagelijks</button>
             <button onClick={() => handleAnswer("trips", "weekly")} className="p-4 border rounded hover:bg-blue-50">Wekelijks</button>
             <button onClick={() => handleAnswer("trips", "rarely")} className="p-4 border rounded hover:bg-blue-50">Zelden / Alleen vakantie</button>
          </div>
        </div>
      )}

      {/* RESULTAAT */}
      {step === 4 && (
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Uw Profiel:</h2>
          <p className="text-xl text-blue-600 font-semibold mb-6">"{getProfile()}"</p>
          
          <p className="mb-6 text-gray-600">Op basis van uw situatie raden we aan om deze pagina's te lezen:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dynamische links op basis van antwoorden */}
            {answers.location === "own" ? (
                <Link href="/elektrisch-laden/thuis-laden" className="block p-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                  Bekijk Thuis Laden &rarr;
                </Link>
            ) : (
                <Link href="/elektrisch-laden/publiek-laden" className="block p-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                  Bekijk Publiek Laden &rarr;
                </Link>
            )}
            
            <Link href="/elektrisch-laden/kosten-en-besparingen" className="block p-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">
               Bereken uw besparing &rarr;
            </Link>
          </div>
          
          <button onClick={() => setStep(1)} className="mt-6 text-gray-400 text-sm underline">Begin opnieuw</button>
        </div>
      )}
    </div>
  );
}
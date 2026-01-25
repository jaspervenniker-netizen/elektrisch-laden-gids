"use client";
import { useState } from "react";
import Link from "next/link";

export default function ThuisLadenPage() {
  const [hasSolar, setHasSolar] = useState(false);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/elektrisch-laden" className="text-blue-600 mb-8 block">&larr; Terug naar overzicht</Link>
      
      <h1 className="text-4xl font-bold mb-4">Thuis Laden: Voordelig & Gemakkelijk</h1>
      <p className="text-xl text-gray-600 mb-8">
        Begin de dag altijd met een volle accu. Thuis laden is niet alleen het meest comfortabel, 
        maar vaak ook de goedkoopste optie.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Haal het maximale uit uw laadsessie</h2>
        
        <div className="flex gap-4 mb-6">
          <button onClick={() => setHasSolar(false)} className={`px-6 py-2 rounded-full font-semibold transition ${!hasSolar ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600'}`}>Standaard Contract</button>
          <button onClick={() => setHasSolar(true)} className={`px-6 py-2 rounded-full font-semibold transition ${hasSolar ? 'bg-green-600 text-white' : 'bg-white border text-gray-600'}`}>Met Zonnepanelen ☀️</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          {hasSolar ? (
            <div> {/* Inhoud voor zonnepanelen */} </div>
          ) : (
             <div> {/* Inhoud voor standaard contract */} </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
            {/* HIER DE SLIMME LINK: */}
            <Link href="/elektrisch-laden/kosten-en-besparingen?laadtype=thuis" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                Bereken uw besparing met thuisladen
            </Link>
        </div>
      </div>
    </main>
  );
}
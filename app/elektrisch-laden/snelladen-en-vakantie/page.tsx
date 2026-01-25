import Link from "next/link";

export default function SnelladenPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/elektrisch-laden" className="text-blue-600 mb-8 block">&larr; Terug naar overzicht</Link>

      <h1 className="text-4xl font-bold mb-4">Zorgeloos op vakantie met uw EV</h1>
      <p className="text-xl text-gray-600 mb-12">
        Lange ritten door Europa zijn geen enkel probleem. Langs de snelwegen vindt u snelladers 
        die uw accu in 20-40 minuten weer voor 80% vol laden.
      </p>

      {/* SECTIE: Netwerken */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
           <h3 className="text-2xl font-bold text-red-600 mb-2">Tesla Superchargers</h3>
           <p className="text-gray-700 mb-4">
             Niet alleen voor Tesla's! Vaak de goedkoopste en meest betrouwbare optie langs de snelweg.
             Download de Tesla-app om te starten.
           </p>
           <span className="text-sm font-semibold bg-white px-3 py-1 rounded border">Ca. €0,35 - €0,45 / kWh</span>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
           <h3 className="text-2xl font-bold text-gray-800 mb-2">IONITY & Fastned</h3>
           <p className="text-gray-700 mb-4">
             Supersnel laden langs de snelweg. Zonder abonnement vaak duur, maar zeer betrouwbaar.
             Ideaal voor de snelle tussenstop.
           </p>
           <span className="text-sm font-semibold bg-white px-3 py-1 rounded border">Ca. €0,60 - €0,79 / kWh</span>
        </div>
      </div>

      {/* SECTIE: Tips */}
      <div className="bg-blue-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Onze Vakantie Tips</h2>
        <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li><strong>Plan met apps:</strong> Gebruik 'A Better Routeplanner' (ABRP) voor de ideale route inclusief laadstops.</li>
            <li><strong>De 80% regel:</strong> Laad bij een snellader tot 80%. De laatste 20% gaat heel langzaam en is zonde van uw tijd.</li>
            <li><strong>Zorg voor back-up:</strong> Neem altijd een laadpas mee voor het geval een app niet werkt in het buitenland.</li>
        </ul>
      </div>
    </main>
  );
}
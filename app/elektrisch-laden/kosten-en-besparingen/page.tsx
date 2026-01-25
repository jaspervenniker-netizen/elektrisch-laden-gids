import Link from "next/link";
import KostenCalculator from "@/components/KostenCalculator"; 

export default function KostenPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/elektrisch-laden" className="text-blue-600 mb-8 block">&larr; Terug naar overzicht</Link>

      <h1 className="text-4xl font-bold mb-4">Wat kost elektrisch rijden nu echt?</h1>
      <p className="text-xl text-gray-600 mb-12">
        Vergeet dure tankbeurten. Uw 'brandstofkosten' worden bepaald door de stroomprijs. 
        Bereken hieronder uw persoonlijke voordeel.
      </p>

      {/* DE CALCULATOR */}
      <section className="mb-12 shadow-xl rounded-xl overflow-hidden">
        <KostenCalculator />
      </section>

      {/* EXTRA INFO */}
      <section className="bg-gray-100 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Waar hangt de besparing van af?</h2>
        
        {/* HIER DE AANGEPASTE TEKST: */}
        <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>
                <strong>Brandstofkosten:</strong> Thuis laden (ca. €0,22/kWh) is aanzienlijk goedkoper dan benzine (ca. €2,05/L). Dit is uw grootste besparing.
            </li>
            <li>
                <strong>Onderhoud:</strong> Een elektrische auto heeft veel minder bewegende delen. Geen olie verversen, geen nieuwe uitlaat, en remmen slijten minder snel door regeneratief remmen.
            </li>
            <li>
                <strong>Wegenbelasting (MRB):</strong> Ook in 2026 blijft elektrisch rijden fiscaal aantrekkelijk. U betaalt slechts <strong>70% van het tarief</strong> dat voor een vergelijkbare benzineauto geldt. Deze korting van 30% compenseert het hogere gewicht van de accu.
            </li>
        </ul>
      </section>
    </main>
  );
}
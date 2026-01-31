// 1. Suspense importeren uit React
import { Suspense } from 'react';
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

      <section className="mb-12 shadow-xl rounded-xl overflow-hidden">
        {/* 2. De Calculator "inpakken" in een Suspense component */}
        <Suspense fallback={<div className="p-8 text-center">Calculator wordt geladen...</div>}>
          <KostenCalculator />
        </Suspense>
      </section>

<section className="bg-gray-100 p-8 rounded-xl">
    <h2 className="text-2xl font-bold mb-4">Waar hangt de besparing van af?</h2>
    <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>
            <strong>Brandstofkosten:</strong> Thuis laden (ca. €0,22/kWh) is aanzienlijk goedkoper dan benzine (ca. €2,05/L). Dit is uw grootste besparing.
        </li>
        <li>
            <strong>ERE-vergoeding (Cashback):</strong> Een nieuwe inkomstenbron vanaf 2026. Door de CO₂-besparing van uw laadsessies te verkopen, ontvangt u circa <strong>€0,08 per kWh</strong> retour. Dit verlaagt uw effectieve stroomprijs direct. <em>(Vereist een MID-meter in de laadpaal)</em>.
        </li>
        <li>
            <strong>Onderhoud:</strong> Een elektrische auto heeft veel minder bewegende delen. Geen olie verversen, geen nieuwe uitlaat, en de remmen slijten minder snel door regeneratief remmen.
        </li>
        <li>
            <strong>Wegenbelasting (MRB):</strong> Ook in 2026 blijft elektrisch rijden fiscaal aantrekkelijk. U betaalt slechts <strong>70% van het tarief</strong> dat voor een vergelijkbare benzineauto geldt. Deze korting van 30% compenseert het hogere gewicht van de accu.
        </li>
    </ul>
</section>
    </main>
  );
}
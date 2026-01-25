import Link from "next/link";

export default function PubliekLadenPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/elektrisch-laden" className="text-blue-600 mb-8 block">&larr; Terug naar overzicht</Link>

      <h1 className="text-4xl font-bold mb-4">Geen eigen oprit? Geen probleem.</h1>
      <p className="text-xl text-gray-600 mb-12">
        Het openbare laadnetwerk in Nederland is één van de beste ter wereld. 
        Zo werkt laden op straat.
      </p>

      {/* ... (de 2 kaarten met info) ... */}

      <div className="bg-blue-50 p-8 rounded-xl text-center">
        <h3 className="text-2xl font-bold mb-4">Wat kost dit in de praktijk?</h3>
        <p className="mb-6">Vergelijk de kosten van publiek laden direct met uw huidige benzineauto.</p>
        {/* HIER DE SLIMME LINK: */}
        <Link href="/elektrisch-laden/kosten-en-besparingen?laadtype=publiek" className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition">
            Bereken uw besparing met publiek laden
        </Link>
      </div>
    </main>
  );
}
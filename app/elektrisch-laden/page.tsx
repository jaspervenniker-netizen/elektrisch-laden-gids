import Link from 'next/link';
// HIERVOEGEN WE HET CALCULATOR ICOON TOE:
import { Home, Zap, Fuel, Calculator } from 'lucide-react'; 

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTIE */}
      <section className="bg-gray-900 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Alles over Elektrisch Laden
          </h1>
          <p className="text-xl text-gray-300">
            Uw persoonlijke gids voor thuis, onderweg en op reis.
          </p>
        </div>
      </section>

      {/* OVERZICHT SECTIE */}
      <section className="py-16 max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        {/* AANGEPAST: Grid is nu 2x2 op medium schermen, 4 op een rij op grote schermen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* KAART 1: THUIS LADEN */}
          <Link href="/elektrisch-laden/thuis-laden" className="group block bg-white p-8 border rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 mb-2">Thuis Laden</h3>
            <p className="text-gray-600">De goedkoopste en makkelijkste manier. Alles over wallboxen en kosten.</p>
            <span className="mt-6 inline-block font-bold text-blue-600">Lees meer &rarr;</span>
          </Link>

          {/* KAART 2: PUBLIEK LADEN */}
          <Link href="/elektrisch-laden/publiek-laden" className="group block bg-white p-8 border rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Fuel className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 mb-2">Publiek Laden</h3>
            <p className="text-gray-600">Laden in de stad, bij de supermarkt of als u geen eigen oprit heeft.</p>
            <span className="mt-6 inline-block font-bold text-green-600">Lees meer &rarr;</span>
          </Link>

          {/* KAART 3: SNELLADEN & REIZEN */}
          <Link href="/elektrisch-laden/snelladen-en-vakantie" className="group block bg-white p-8 border rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-yellow-600 mb-2">Snelladen & Reizen</h3>
            <p className="text-gray-600">Zorgeloos op vakantie en lange afstanden. Inclusief reis-calculator.</p>
            <span className="mt-6 inline-block font-bold text-yellow-600">Lees meer &rarr;</span>
          </Link>
          
          {/* NIEUW: KAART 4 - DIRECT NAAR DE CALCULATOR */}
          <Link href="/elektrisch-laden/kosten-en-besparingen" className="group block bg-white p-8 border rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 mb-2">Bereken uw Voordeel</h3>
            <p className="text-gray-600">Zie direct hoeveel u per jaar bespaart t.o.v. uw huidige benzineauto.</p>
            <span className="mt-6 inline-block font-bold text-purple-600">Start met rekenen &rarr;</span>
          </Link>

        </div>
      </section>
    </main>
  );
}
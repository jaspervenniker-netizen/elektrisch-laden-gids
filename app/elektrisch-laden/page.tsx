import Link from 'next/link';
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
      <section className="py-16 max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        
        {/* We gebruiken hier 'order' classes om de volgorde te veranderen per schermgrootte */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* --- KAART: CALCULATOR --- */}
          {/* Op Mobiel: order-1 (Bovenaan). Op Desktop: order-4 (Helemaal Rechts) */}
          <Link href="/elektrisch-laden/kosten-en-besparingen" className="order-1 lg:order-4 group block bg-blue-50 p-8 border-2 border-blue-500 rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-blue-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 mb-2">Bereken uw Voordeel</h3>
            <p className="text-gray-700">Zie direct hoeveel u bespaart t.o.v. uw huidige benzineauto.</p>
            <span className="mt-6 inline-block font-bold text-blue-600 group-hover:underline">Start met rekenen &rarr;</span>
          </Link>

          {/* --- KAART: THUIS LADEN --- */}
          {/* Op Mobiel: order-2. Op Desktop: order-1 (Helemaal Links) */}
          <Link href="/elektrisch-laden/thuis-laden" className="order-2 lg:order-1 group block bg-white p-8 border rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 mb-2">Thuis Laden</h3>
            <p className="text-gray-600">De goedkoopste en makkelijkste manier. Voor een eigen oprit óf via de stoep in de stad (VPA).</p>
            <span className="mt-6 inline-block font-bold text-blue-600">Lees meer &rarr;</span>
          </Link>

          {/* --- KAART: PUBLIEK LADEN --- */}
          {/* Op Mobiel: order-3. Op Desktop: order-2 */}
          <Link href="/elektrisch-laden/publiek-laden" className="order-3 lg:order-2 group block bg-white p-8 border rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Fuel className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 mb-2">Publiek Laden</h3>
            <p className="text-gray-600">Laden in de stad? Vind de beste methode voor Amsterdam, Noord-Holland, Utrecht en daarbuiten.</p>
            <span className="mt-6 inline-block font-bold text-green-600">Lees meer &rarr;</span>
          </Link>

          {/* --- KAART: SNELLADEN --- */}
          {/* Op Mobiel: order-4. Op Desktop: order-3 */}
          <Link href="/elektrisch-laden/snelladen-en-vakantie" className="order-4 lg:order-3 group block bg-white p-8 border rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-yellow-600 mb-2">Snelladen & Reizen</h3>
            <p className="text-gray-600">Zorgeloos onderweg. Alles over snelladen langs de snelweg en slimme vakantieplanning.</p>
            <span className="mt-6 inline-block font-bold text-yellow-600">Lees meer &rarr;</span>
          </Link>

        </div>
      </section>
    </main>
  );
}
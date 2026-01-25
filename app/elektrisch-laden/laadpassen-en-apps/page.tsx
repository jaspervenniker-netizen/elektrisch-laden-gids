import Link from "next/link";

export default function LaadpassenPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/elektrisch-laden" className="text-blue-600 mb-8 block">&larr; Terug naar overzicht</Link>

      <h1 className="text-4xl font-bold mb-4">Laadpassen & Apps: Uw Sleutel</h1>
      <p className="text-xl text-gray-600 mb-12">
        Om een laadsessie te starten en betalen, gebruikt u een pasje of een app. 
        De keuze is reuze, maar wij maken het simpel voor u.
      </p>

      <div className="space-y-8">
        {/* OPTIE 1 */}
        <div className="flex flex-col md:flex-row gap-6 items-start border p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-yellow-100 p-4 rounded-full text-4xl">🏠</div>
            <div>
                <h3 className="text-xl font-bold mb-1">De "Ik laad vooral thuis" optie</h3>
                <p className="text-sm text-gray-500 font-bold mb-2 uppercase">Advies: Vattenfall InCharge (Gratis Pas)</p>
                <p className="text-gray-600">
                    Als u meestal thuis laadt, wilt u geen maandelijkse kosten voor een pasje. 
                    Deze pas is gratis aan te vragen. U betaalt alleen een klein bedrag per keer dat u hem gebruikt bij een publieke paal.
                </p>
            </div>
        </div>

        {/* OPTIE 2 */}
        <div className="flex flex-col md:flex-row gap-6 items-start border p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 p-4 rounded-full text-4xl">🏙️</div>
            <div>
                <h3 className="text-xl font-bold mb-1">De "Publieke Lader" optie</h3>
                <p className="text-sm text-gray-500 font-bold mb-2 uppercase">Advies: E-Flux of Shell Recharge (Met Abonnement)</p>
                <p className="text-gray-600">
                    Laadt u vaak op straat? Neem dan een pas met een klein maandbedrag (ca. €3). 
                    Hiermee vervalt het starttarief per laadsessie, wat u al snel geld bespaart.
                </p>
            </div>
        </div>
      </div>

      <div className="mt-12 text-center">
         <p className="text-gray-600 mb-4">Twijfelt u nog?</p>
         <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
             Vraag onze experts om advies
         </button>
      </div>
    </main>
  );
}
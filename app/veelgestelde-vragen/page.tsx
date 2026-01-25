import Link from "next/link";

export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/elektrisch-laden" className="text-blue-600 mb-8 block">&larr; Terug naar overzicht</Link>

      <h1 className="text-4xl font-bold mb-8">Veelgestelde Vragen</h1>

      <div className="space-y-4">
        
        {/* VRAAG 1 */}
        <details className="group bg-white border border-gray-200 rounded-lg p-4 cursor-pointer open:ring-2 open:ring-blue-100">
            <summary className="font-bold text-lg list-none flex justify-between items-center text-gray-800">
                Hoe lang duurt het om een auto op te laden?
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600 leading-relaxed">
                Dit hangt af van de lader. Thuis (11kW) duurt een volle lading ongeveer 4 tot 8 uur (vaak 's nachts). 
                Bij een snellader langs de snelweg duurt het 20 tot 40 minuten om tot 80% te laden.
            </div>
        </details>

        {/* VRAAG 2 */}
        <details className="group bg-white border border-gray-200 rounded-lg p-4 cursor-pointer open:ring-2 open:ring-blue-100">
            <summary className="font-bold text-lg list-none flex justify-between items-center text-gray-800">
                Kan ik laden in de regen?
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600 leading-relaxed">
                Ja, absoluut. Elektrische auto's en laadpalen zijn volledig waterdicht en beveiligd. 
                U kunt veilig de stekker aansluiten, zelfs tijdens een hevige regenbui.
            </div>
        </details>

        {/* VRAAG 3 */}
        <details className="group bg-white border border-gray-200 rounded-lg p-4 cursor-pointer open:ring-2 open:ring-blue-100">
            <summary className="font-bold text-lg list-none flex justify-between items-center text-gray-800">
                Wat is het verschil tussen AC en DC laden?
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600 leading-relaxed">
                <strong>AC (Wisselstroom)</strong> is normaal laden, zoals thuis of bij een publieke paal in de straat. 
                <strong>DC (Gelijkstroom)</strong> is snelladen, wat u vooral langs snelwegen vindt. DC laden gaat veel sneller omdat de stroom direct de batterij in gaat.
            </div>
        </details>

         {/* VRAAG 4 */}
         <details className="group bg-white border border-gray-200 rounded-lg p-4 cursor-pointer open:ring-2 open:ring-blue-100">
            <summary className="font-bold text-lg list-none flex justify-between items-center text-gray-800">
                Heeft het weer invloed op mijn bereik (actieradius)?
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600 leading-relaxed">
                Ja. In de winter kan de actieradius 10% tot 20% lager zijn dan in de zomer. 
                Dit komt omdat de batterij kouder is en omdat verwarming energie kost. Moderne auto's met een warmtepomp hebben hier minder last van.
            </div>
        </details>

      </div>
      
      <div className="mt-12 text-center bg-gray-50 p-6 rounded-xl">
        <p className="font-bold text-gray-800">Staat uw vraag er niet bij?</p>
        <button className="mt-2 text-blue-600 underline hover:text-blue-800">Neem contact met ons op</button>
      </div>

    </main>
  );
}
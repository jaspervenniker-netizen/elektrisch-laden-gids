import Link from 'next/link';
import { ChevronLeft, ShieldCheck, EyeOff, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/elektrisch-laden" className="text-blue-600 mb-8 inline-flex items-center hover:underline font-medium">
        <ChevronLeft size={16} className="mr-1" /> Terug naar de gids
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 p-2 rounded-lg">
          <ShieldCheck className="text-blue-600" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Privacy & Transparantie</h1>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed text-sm md:text-base">
        <p>
          EV Startpakket (een initiatief van <strong>WeLovo</strong>) is gebouwd met een "Privacy-First" principe. Wij geloven dat u eerlijk advies moet kunnen krijgen zonder dat uw gegevens overal worden opgeslagen.
        </p>

        {/* SECTIE 1: GEEN DATA OPSLAG */}
        <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <EyeOff className="text-blue-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Geen gegevensverzameling</h2>
          </div>
          <p>
            Wij verzamelen <strong>geen persoonlijke gegevens</strong>. U hoeft niet in te loggen, wij vragen niet om uw e-mailadres en wij slaan uw invoer in de calculators niet op in een database. De berekeningen vinden volledig plaats in uw eigen browser.
          </p>
        </section>

        {/* SECTIE 2: GEEN COOKIES */}
        <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="text-blue-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Geen cookies of tracking</h2>
          </div>
          <p>
            Deze website maakt <strong>geen gebruik van tracking cookies</strong> of marketing-pixels. Omdat wij uw gedrag niet volgen, ziet u op deze website ook geen irritante cookiebanner. Wij gebruiken uitsluitend geanonimiseerde statistieken (via Vercel Analytics) om te zien welke pagina's populair zijn, zonder dat dit herleidbaar is naar u als persoon.
          </p>
        </section>

        {/* SECTIE 3: EXTERNE LINKS */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">Externe links & Diensten</h2>
          <p>
            Deze gids bevat links naar externe apps (zoals Charge Assist of Tibber) en de voorraadpagina van de dealer. Zodra u deze website verlaat, is het privacybeleid van de betreffende partij van toepassing. Wij raden u aan om bij die partijen hun eigen privacyverklaring te raadplegen.
          </p>
        </section>

        {/* SECTIE 4: CONTACT */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">Vragen?</h2>
          <p>
            Heeft u vragen over de zekerheid van uw informatie op deze site? Neem contact op met <strong>WeLovo</strong> via de contactgegevens op onze hoofdwebsite.
          </p>
        </section>
        
        <div className="pt-8 border-t border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-mono italic text-center">
          Laatst gecontroleerd: {new Date().toLocaleDateString('nl-NL')}
        </div>
      </div>
    </main>
  );
}
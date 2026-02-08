import Link from 'next/link';
import { ExternalLink, ShieldCheck, Car } from 'lucide-react';
import { track } from '@vercel/analytics/react';
export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* BOVENSTE DEEL: DEALER PROMOTIE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="hidden sm:block w-24 h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                <img 
                    src="/hartje.png"  // Zorg dat deze naam PRECIES klopt met je bestand in de public map
                    alt="Logo Dealer" 
                    className="w-full h-full object-contain" // 'object-contain' is goed voor logo's, 'object-cover' voor foto's
                />
                </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Klaar voor de volgende stap?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Deze gids wordt u aangeboden door <strong>WeLovo</strong>. Bekijk onze actuele voorraad elektrische modellen.
              </p>
              <a 
        href="https://www.welovo.nl/aanbod?brandstof=E" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={() => track('Click_Dealer_Inventory', { location: 'footer' })} // <--- Add this
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
      >
        <Car size={16} /> Bekijk onze voorraad <ExternalLink size={14} />
      </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Informatie zekerheid:</strong> De berekeningen op deze site zijn gebaseerd op praktijkcijfers van EV Database, actuele energieprijzen en de nieuwe ERE-wetgeving in 2026. Omdat de markt voor emissierechten nieuw is en de waarde van certificaten kan fluctueren, zijn alle resultaten indicatief.
              </p>
            </div>
            <p className="text-[10px] text-gray-400 pl-8 leading-tight italic">
              *Aan de getoonde berekeningen kunnen geen rechten worden ontleend. Energieprijzen en overheidsregels zijn aan verandering onderhevig.
            </p>
          </div>
        </div>

{/* ONDERSTE DEEL: COPYRIGHT & LINKS */}
<div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
  <p className="text-xs text-gray-400">
    © {new Date().getFullYear()} EV Startpakket - Een initiatief van Welovo
  </p>
  <div className="flex gap-6">
    {/* Interne link naar de FAQ die we al hebben */}
    <Link href="/elektrisch-laden/veelgestelde-vragen" className="text-xs text-gray-500 hover:text-blue-600 transition">
      Veelgestelde vragen
    </Link>

    {/* Externe link naar dealer website */}
        <Link href="/elektrisch-laden/privacy" className="text-xs text-gray-500 hover:text-blue-600 transition">
        Privacybeleid
        </Link>

    {/* Externe link naar dealer contactpagina */}
    <a 
      href="https://www.welovo.nl/contact" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-xs text-gray-500 hover:text-blue-600 transition"
    >
      Contact
    </a>
  </div>
</div>
      </div>
    </footer>
  );
}
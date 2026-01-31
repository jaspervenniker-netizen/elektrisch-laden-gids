"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, Fuel, Calculator, ChevronLeft } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  // We tonen de header NIET op de hoofdpagina (hub)
  if (pathname === '/elektrisch-laden') return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* LOGO / TERUG NAAR HUB */}
        <Link href="/elektrisch-laden" className="flex items-center gap-2 text-gray-900 font-bold hover:text-blue-600 transition-colors">
          <div className="bg-gray-900 text-white p-1.5 rounded-lg">
            <Zap size={16} fill="currentColor" />
          </div>
          <span className="hidden sm:inline text-sm tracking-tight uppercase">EV Startpakket</span>
          <span className="sm:hidden text-sm">Home</span>
        </Link>

        {/* SNELLE NAVIGATIE (Iconen) */}
        <div className="flex gap-1 md:gap-4">
          <NavLink href="/elektrisch-laden/thuis-laden" icon={<Home size={18} />} active={pathname.includes('thuis')} />
          <NavLink href="/elektrisch-laden/publiek-laden" icon={<Fuel size={18} />} active={pathname.includes('publiek')} />
          <NavLink href="/elektrisch-laden/snelladen-en-vakantie" icon={<Zap size={18} />} active={pathname.includes('snelladen')} />
          <NavLink href="/elektrisch-laden/kosten-en-besparingen" icon={<Calculator size={18} />} active={pathname.includes('kosten')} />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, active }: { href: string, icon: React.ReactNode, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`p-2 rounded-xl transition-all ${active ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
    >
      {icon}
    </Link>
  );
}
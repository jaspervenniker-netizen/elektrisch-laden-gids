"use client"; // <--- THIS IS THE FIX

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, Fuel, Calculator } from 'lucide-react';
import { track } from '@vercel/analytics/react';

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* LEFT SIDE: Logo & Dealer Link */}
        <div className="flex items-center gap-3">
          <Link href="/elektrisch-laden" className="flex items-center gap-2 group">
            <div className="bg-gray-900 text-white p-1.5 rounded-lg group-hover:bg-blue-600 transition-colors">
              <Zap size={16} fill="currentColor" />
            </div>
            <span className="text-sm font-black tracking-tight uppercase text-gray-900">
                EV Startpakket
            </span>
          </Link>

          <a 
            href="https://www.welovo.nl/aanbod?brandstof=E" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => track('Click_Dealer_Inventory', { location: 'header' })}
            className="flex items-center gap-2 border-l border-gray-200 pl-3 ml-1 hover:opacity-70 transition-opacity group/dealer"
          >
             <span className="hidden sm:inline text-[11px] font-semibold text-gray-400 uppercase tracking-wide mt-0.5">Door</span>
             <img src="/hartje.jpg" alt="WeLovo" className="h-4 w-4 object-contain rounded-sm" />
             <span className="text-xs font-bold text-black group-hover/dealer:text-blue-600 transition-colors">WeLovo</span>
          </a>
        </div>

        {/* RIGHT SIDE: Navigation Icons */}
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
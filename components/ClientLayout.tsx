"use client"; // This component runs on the client

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if we are on the specific label page
  const isLabelPage = pathname === '/elektrisch-laden/label';

  // If it's the label page, render ONLY the children (the tool)
  // This removes the header, footer, and any wrapper styling associated with them.
  if (isLabelPage) {
    return <>{children}</>;
  }

  // For all other pages, render the standard layout
  return (
    <>
      <Header />
      {/* If your original layout had a <main> tag here, keep it inside this block */}
      <main className="flex-grow"> 
        {children}
      </main>
      <Footer />
    </>
  );
}
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // Import the component we made in Step 1

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Now Metadata works perfectly because this is a Server Component!
export const metadata: Metadata = {
  metadataBase: new URL('https://evstartpakket.nl'), // Replace with your real domain later
  title: {
    default: 'EV Startpakket | Onafhankelijke Gids voor Elektrisch Laden',
    template: '%s | EV Startpakket'
  },
  description: 'Bereken uw besparing, ontdek de nieuwe ERE-vergoeding in 2026 en plan uw elektrische vakantie. De eerlijke gids voor (nieuwe) EV-rijders.',
  openGraph: {
    title: 'EV Startpakket - Wat kost elektrisch rijden echt?',
    description: 'Bereken direct uw voordeel t.o.v. benzine.',
    images: ['/logo.png'], 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`antialiased font-sans ${geistSans.variable}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        {/* This tracks page views automatically */}
        <Analytics /> 
      </body>
    </html>
  );
}
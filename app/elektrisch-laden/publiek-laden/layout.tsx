import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publiek Laden: Slimmer en goedkoper laden op straat',
  description: 'Vind de beste laadstrategie voor Amsterdam, Noord-Holland en Utrecht. Bespaar tot 16 cent per kWh door de juiste app of QR-code te gebruiken.',
  alternates: {
    canonical: '/elektrisch-laden/publiek-laden',
  },
};

export default function PubliekLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
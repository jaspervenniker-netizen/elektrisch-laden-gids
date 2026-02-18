import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ERE-Certificaten 2026: Geld verdienen met uw laadpaal',
  description: 'Alles over de nieuwe ERE-vergoeding. Ontvang tot €0,08 per kWh cashback op uw laadsessies thuis. Bekijk de voorwaarden en MID-meters.',
  alternates: {
    canonical: '/elektrisch-laden/ere-uitleg',
  },
};

export default function EreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
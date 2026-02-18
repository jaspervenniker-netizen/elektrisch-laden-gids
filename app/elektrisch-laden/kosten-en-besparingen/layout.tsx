import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Besparing Elektrische Auto Berekenen (Benzine vs. EV)',
  description: 'Vergelijk de kosten van uw huidige benzineauto met een elektrische occasion. Inclusief onderhoudsvoordeel en stroomprijzen.',
  alternates: {
    canonical: '/elektrisch-laden/kosten-en-besparingen',
  },
};

export default function KostenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
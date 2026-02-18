import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thuis Laden: Zonnepanelen, Slimme Meters & Laden zonder oprit',
  description: 'Optimaliseer uw laadkosten thuis met dynamische tarieven en zonnestroom. Alles over de VPA-regeling (laden via de stoep) in uw gemeente.',
  alternates: {
    canonical: '/elektrisch-laden/thuis-laden',
  },
};

export default function ThuisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
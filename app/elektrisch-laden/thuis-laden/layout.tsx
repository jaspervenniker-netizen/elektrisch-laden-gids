import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thuis Laden: Slimme Meters, Zonnepanelen & VPA (Laden op de stoep)',
  description: 'Optimaliseer uw laadkosten met dynamische tarieven en zonnestroom. Uitleg over de VPA-regeling voor laden zonder oprit.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
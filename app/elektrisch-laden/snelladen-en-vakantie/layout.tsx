import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snelladen & Reis Planner: Met de EV naar het buitenland',
  description: 'Plan uw route, bereken stops en vergelijk laadkosten onderweg. Tips voor Tesla Superchargers en het Ionity netwerk.',
  alternates: {
    canonical: '/elektrisch-laden/snelladen-en-vakantie',
  },
};

export default function ReisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
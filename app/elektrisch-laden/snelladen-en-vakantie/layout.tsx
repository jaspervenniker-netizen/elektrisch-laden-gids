import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snelladen & Vakantie Planner: Met de EV naar Frankrijk of Italië',
  description: 'Plan uw route, bereken stops en vergelijk laadkosten onderweg. Tips voor Tesla Superchargers en het Ionity netwerk.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
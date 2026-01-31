import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bereken uw Voordeel",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Publiek Laden",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
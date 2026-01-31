import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx

export const metadata = {
  title: {
    default: "EV Startpakket - Alles over elektrisch rijden", // The name of your homepage
    template: "%s | EV Startpakket" // This adds the suffix to all other pages
  },
  description: "De complete gids voor het laden van uw elektrische auto.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="antialiased font-sans bg-white">
        <Header /> {/* De slimme header */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
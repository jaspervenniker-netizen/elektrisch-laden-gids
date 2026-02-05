import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // Import the component we made in Step 1

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Now Metadata works perfectly because this is a Server Component!
export const metadata: Metadata = {
  title: "EV Startpakket",
  description: "Alles over elektrisch rijden",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      {/* 
         We keep the body class neutral. 
         Your LabelGenerator handles its own background (bg-slate-900).
         The other pages will likely get their background from globals.css or the main tag.
      */}
      <body className={`antialiased font-sans ${geistSans.variable}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
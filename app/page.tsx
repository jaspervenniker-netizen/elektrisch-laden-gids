import { redirect } from 'next/navigation';

export default function Home() {
  // Stuur bezoekers direct door naar de gids
  redirect('/elektrisch-laden');
}
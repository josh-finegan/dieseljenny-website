import { Logo } from '@/components/Logo';
import { Bio } from '@/components/Bio';
import { Links } from '@/components/Links';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diesel Jenny | Home',
  description: 'Official hub for the electronic producer Diesel Jenny.',
  openGraph: {
    title: 'Diesel Jenny',
    description: 'Official hub for the electronic producer Diesel Jenny.',
    // Add your site URL and a preview image
    // url: 'https://www.dieseljenny.com', 
    // images: [
    //   {
    //     url: '/og-image.png', // Place an image in the `public` folder
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <Logo />
        <Bio />
        <Links />
      </div>
    </main>
  );
}

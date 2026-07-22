import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inclusive_Sans } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/common/SmoothScroll';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/screens/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const inclusiveSans = Inclusive_Sans({
  subsets: ['latin'],
  variable: '--font-inclusive-sans',
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SnooSpace',
  description:
    'An event-first social platform focused on helping people discover communities, attend local events, make genuine friends, and spend more time offline.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inclusiveSans.variable}`}>
      <body className="font-sans antialiased bg-[#FAFCFF] text-[#0F172A]">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

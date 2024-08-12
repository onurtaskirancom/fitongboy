import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import ThemeProvider from './components/ThemeProvider';
import ScrollToTop from './components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fitongboy | Fitness ve Vücut Geliştirme Platformu',
  description:
    'Fitongboy, fitness, vücut geliştirme ve güç antrenmanı konularında doğru bilgileri sunar. Hedeflerinize ulaşmanız için buradayız.',
  openGraph: {
    title: 'Fitongboy | Fitness ve Vücut Geliştirme Platformu',
    description:
      'Fitongboy, fitness, vücut geliştirme ve güç antrenmanı konularında doğru bilgileri sunar. Hedeflerinize ulaşmanız için buradayız.',
    url: 'https://www.fit.ongboy.com',
    type: 'website',
    images: [
      {
        url: 'https://www.fit.ongboy.com/images/fitongboy-logo.png',
        width: 800,
        height: 600,
        alt: 'Fitongboy Logo',
      },
    ],
    site_name: 'Fitongboy',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Fitongboy',
    title: 'Fitongboy | Fitness ve Vücut Geliştirme Platformu',
    description:
      'Fitongboy, fitness, vücut geliştirme ve güç antrenmanı konularında doğru bilgileri sunar. Hedeflerinize ulaşmanız için buradayız.',
    image: 'https://www.fit.ongboy.com/images/fitongboy-logo.png',
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${inter.className} min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white`}
      >
        <ThemeProvider>
          <Navbar />
          <ScrollToTop />
          <div className="pt-16">
            <div className="mx-auto">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

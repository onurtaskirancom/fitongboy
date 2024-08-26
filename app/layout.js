import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import ThemeProvider from './components/ThemeProvider';
import ScrollToTop from './components/ScrollToTop';
import CanonicalHead from './components/CanonicalHead';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fitongboy | Fitness ve Vücut Geliştirme Platformu',
  description:
    'Fitongboy, fitness, vücut geliştirme ve güç antrenmanı konularında doğru bilgileri sunar. Hedeflerinize ulaşmanız için buradayız.',
  openGraph: {
    title: 'Fitongboy | Fitness ve Vücut Geliştirme Platformu',
    description:
      'Fitongboy, fitness, vücut geliştirme ve güç antrenmanı konularında doğru bilgileri sunar. Hedeflerinize ulaşmanız için buradayız.',
    url: process.env.SITE_URL || 'http://localhost:3000',
    type: 'website',
    images: [
      {
        url: `${
          process.env.SITE_URL || 'http://localhost:3000'
        }/images/fitongboy-logo.png`,
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
    image: `${
      process.env.SITE_URL || 'http://localhost:3000'
    }/images/fitongboy-logo.png`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${inter.className} min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white`}
      >
        <CanonicalHead
          siteUrl={process.env.SITE_URL || 'http://localhost:3000'}
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-6L1VSV4F3R"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6L1VSV4F3R');
            `,
          }}
        />
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

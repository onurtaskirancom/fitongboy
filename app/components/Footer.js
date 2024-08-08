'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white py-6 mt-8">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col justify-center items-center">
        <div className="mb-4">
          <Image
            src="/images/fitongboy-logo.svg"
            alt="Fitongboy Logo"
            width={90}
            height={90}
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <Link href="/" className="hover:text-blue-400 hover:no-underline">
            Anasayfa
          </Link>
          <Link
            href="/hakkimizda"
            className="hover:text-blue-400 hover:no-underline"
          >
            Hakkımızda
          </Link>
          <Link
            href="/iletisim"
            className="hover:text-blue-400 hover:no-underline"
          >
            İletişim
          </Link>
          <Link
            href="/antrenman"
            className="hover:text-blue-400 hover:no-underline"
          >
            Antrenman
          </Link>
          <Link
            href="/beslenme"
            className="hover:text-blue-400 hover:no-underline"
          >
            Beslenme
          </Link>
        </div>
        <div className="text-center">
          <p>Copyright © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

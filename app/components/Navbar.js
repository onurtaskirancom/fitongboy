'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/fitongboy-logo.svg"
                alt="Fitongboy Logo"
                width={95}
                height={95}
              />
              <span className="ml-2 text-3xl font-bold text-gray-800 dark:text-white">
                Fitongboy
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Anasayfa
              </Link>
              <Link
                href="/hakkimizda"
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                İletişim
              </Link>
              <Link
                href="/antrenman"
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Antrenman
              </Link>
              <Link
                href="/beslenme"
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Beslenme
              </Link>
              <Link
                href="/kocluk-al"
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Koçluk Al
              </Link>
              <button
                onClick={toggleTheme}
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                {theme === 'dark' ? (
                  <FaSun className="mr-2" />
                ) : (
                  <FaMoon className="mr-2" />
                )}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Anasayfa
          </Link>
          <Link
            href="/hakkimizda"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Hakkımızda
          </Link>
          <Link
            href="/iletisim"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          >
            İletişim
          </Link>
          <Link
            href="/antrenman"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Antrenman
          </Link>
          <Link
            href="/beslenme"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Beslenme
          </Link>
          <button
            onClick={toggleTheme}
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium flex items-center w-full"
          >
            {theme === 'dark' ? (
              <FaSun className="mr-2" />
            ) : (
              <FaMoon className="mr-2" />
            )}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

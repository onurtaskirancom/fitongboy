'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-md text-lg font-medium"
  >
    {theme === 'dark' ? <FaSun /> : <FaMoon />}
  </button>
);

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false); 
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <Image
                src="/images/fitongboy-logo.svg"
                alt="Fitongboy Logo"
                width={95}
                height={95}
                priority
                className="w-24 h-24 sm:w-20 sm:h-20"
              />
              <span className="ml-2 text-3xl font-bold text-gray-800 dark:text-white sm:text-2xl">
                Fitongboy
              </span>
            </Link>
          </div>
          <div className="hidden xl:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              onClick={closeMenu}
            >
              Anasayfa
            </Link>
            <Link
              href="/hakkimizda"
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              onClick={closeMenu}
            >
              Hakkımızda
            </Link>
            <Link
              href="/antrenman"
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              onClick={closeMenu}
            >
              Antrenman
            </Link>
            <Link
              href="/beslenme"
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              onClick={closeMenu}
            >
              Beslenme
            </Link>
            <Link
              href="/kocluk-al"
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              onClick={closeMenu}
            >
              Koçluk Al
            </Link>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                className="px-3 py-1 rounded-md text-sm bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none"
                placeholder="Ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSearch}
                className="text-gray-800 dark:text-white"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="flex xl:hidden items-center space-x-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Ana menüyü aç</span>
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
      <div className={`xl:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Anasayfa
          </Link>
          <Link
            href="/hakkimizda"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Hakkımızda
          </Link>
          <Link
            href="/antrenman"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Antrenman
          </Link>
          <Link
            href="/beslenme"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Beslenme
          </Link>
          <Link
            href="/kocluk-al"
            className="block text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium"
            onClick={closeMenu}
          >
            Koçluk Al
          </Link>
          <form
            onSubmit={handleSearch}
            className="flex items-center space-x-1 mt-2"
          >
            <input
              type="text"
              className="px-2 py-1 rounded-md text-sm bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none w-full"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSearch}
              className="text-gray-800 dark:text-white"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

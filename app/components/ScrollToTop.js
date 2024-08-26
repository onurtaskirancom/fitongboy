'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-500 text-white cursor-pointer shadow-lg hover:bg-blue-400 transition-all duration-300 z-50"
      >
        <FaArrowUp size={20} />
      </div>
    )
  );
};

export default ScrollToTop;

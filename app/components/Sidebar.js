'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaRss, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../utils/firebaseConfig';

const replaceTurkishCharacters = (str) => {
  const turkishMap = {
    ş: 's',
    Ş: 'S',
    ı: 'i',
    İ: 'I',
    ç: 'c',
    Ç: 'C',
    ü: 'u',
    Ü: 'U',
    ö: 'o',
    Ö: 'O',
    ğ: 'g',
    Ğ: 'G',
  };
  return str
    .split('')
    .map((char) => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/\s+/g, '-');
};

const Sidebar = ({ categories = [], recentPosts }) => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const defaultImage = '/images/default.jpg';

  useEffect(() => {
    async function fetchPopularPosts() {
      try {
        const postsRef = ref(database, 'views/');
        const snapshot = await get(postsRef);

        const response = await fetch('/api/posts');
        const allPosts = await response.json();

        if (snapshot.exists()) {
          const postsArray = [];
          snapshot.forEach((childSnapshot) => {
            const views = childSnapshot.val().views || 0;
            const slug = childSnapshot.key;
            const postData = allPosts.find(post => post.slug === slug);
            if (postData) {
              postsArray.push({
                slug: slug,
                title: postData.title,
                views: views,
                image: postData.image
              });
            }
          });

          const sortedPosts = postsArray
            .filter((post) => post.views > 0)
            .sort((a, b) => b.views - a.views);

          setPopularPosts(sortedPosts);
        } else {
          setPopularPosts([]);
        }
      } catch (error) {
        console.error('Error fetching popular posts:', error);
        setPopularPosts([]);
      }
    }

    fetchPopularPosts();
  }, []);

  const handleImageError = (slug) => {
    setImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  return (
    <div>
      <section className="mb-4 pb-4">
        <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-3">
          Sosyal Medya
        </h3>
        <div className="flex space-x-4 pt-3 ml-4">
          <Link href="https://www.twitter.com/fitongboy" aria-label="Twitter">
            <FaXTwitter className="w-8 h-8 hover:text-blue-400" />
          </Link>
          <Link
            href="https://www.instagram.com/fitongboy"
            aria-label="Instagram"
          >
            <FaInstagram className="w-8 h-8 hover:text-pink-600" />
          </Link>
          <Link href="https://www.youtube.com" aria-label="YouTube">
            <FaYoutube className="w-8 h-8 hover:text-red-600" />
          </Link>
          <Link href="/rss.xml" aria-label="RSS">
            <FaRss className="w-8 h-8 hover:text-orange-600" />
          </Link>
        </div>
      </section>
      <section className="mb-4 pb-4">
        <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-3">
          En Çok Okunanlar
        </h3>
        <ul className="pt-2 space-y-4">
          {popularPosts.length > 0 ? (
            popularPosts.slice(0, 5).map((post) => (
              <li key={post.slug} className="relative">
                <Link
                  href={`/${post.slug}`}
                  className="block overflow-hidden rounded shadow hover:shadow-lg transition-shadow duration-200"
                >
                  <Image
                    src={imageErrors[post.slug] ? defaultImage : post.image}
                    alt={post.title}
                    width={500}
                    height={200}
                    className="w-full h-32 object-cover transition-transform duration-300 transform hover:scale-105"
                    priority
                    onError={() => handleImageError(post.slug)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <h2 className="text-sm font-bold">{post.title}</h2>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li key="loading">Popüler gönderiler yükleniyor...</li>
          )}
        </ul>
      </section>
      <section className="mb-4 pb-4">
        <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-3">
          Son Gönderiler
        </h3>
        <ul className="pt-2 space-y-4">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <li key={post.slug} className="relative">
                <Link
                  href={`/${post.slug}`}
                  className="block overflow-hidden rounded shadow hover:shadow-lg transition-shadow duration-200"
                >
                  <Image
                    src={imageErrors[post.slug] ? defaultImage : post.image}
                    alt={post.title}
                    width={500}
                    height={200}
                    className="w-full h-32 object-cover transition-transform duration-300 transform hover:scale-105"
                    priority
                    onError={() => handleImageError(post.slug)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <h2 className="text-sm font-bold">{post.title}</h2>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li key="no-recent">Son gönderi bulunamadı</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Sidebar;

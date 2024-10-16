'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const TrendPosts = ({ title, category }) => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchTrendPosts = async () => {
      try {
        const response = await fetch(
          `/api/posts?category=${encodeURIComponent(category)}`
        );
        if (!response.ok) {
          console.error('Failed to fetch trend posts');
          return;
        }

        const data = await response.json();
        setPosts(data); // Store all posts in state

        // Initially determine the number of posts to display based on screen size
        if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
          setDisplayPosts(data.slice(0, 3));
        } else {
          setDisplayPosts(data.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching trend posts:', error);
      }
    };

    fetchTrendPosts();
  }, [category]);

  useEffect(() => {
    const updateDisplayPosts = () => {
      if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setDisplayPosts(posts.slice(0, 3));
      } else {
        setDisplayPosts(posts.slice(0, 4));
      }
    };

    updateDisplayPosts();
    window.addEventListener('resize', updateDisplayPosts);

    return () => {
      window.removeEventListener('resize', updateDisplayPosts);
    };
  }, [posts]);

  const handleImageError = (slug) => {
    setImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {displayPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div
              className="relative overflow-hidden"
              style={{ height: '12rem' }}
            >
              <Image
                src={
                  imageErrors[post.slug] ? '/images/default.jpg' : post.image
                }
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
                priority={true}
                className="transition-transform duration-300 transform hover:scale-105"
                onError={() => handleImageError(post.slug)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h2 className="text-xl font-bold">{post.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendPosts;

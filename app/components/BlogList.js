'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const BlogList = ({ posts }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (slug) => {
    setImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  const defaultImage = '/images/default.jpg';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
        >
          <div className="relative overflow-hidden" style={{ height: '12rem' }}>
            <Image
              src={imageErrors[post.slug] ? defaultImage : post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={true}
              className="transition-transform duration-300 transform hover:scale-105"
              onError={() => handleImageError(post.slug)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-zinc-900 h-full">
            <p className="text-black dark:text-slate-300">{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;

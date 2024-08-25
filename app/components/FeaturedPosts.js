'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const FeaturedPosts = ({ posts }) => {
  if (posts.length < 3) return null;

  const [firstPostError, setFirstPostError] = useState(false);
  const [secondPostError, setSecondPostError] = useState(false);
  const [thirdPostError, setThirdPostError] = useState(false);

  const defaultImage = '/images/default.jpg';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 px-4 md:px-4">
      <div className="md:col-span-2">
        <Link
          href={`/${posts[0].slug}`}
          className="block rounded shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          <div className="relative w-full h-56 md:h-96">
            <Image
              src={firstPostError ? defaultImage : posts[0].image}
              alt={posts[0].title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={true}
              onError={() => setFirstPostError(true)}
              className="transition-transform duration-300 transform hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-lg md:text-xl font-bold">{posts[0].title}</h2>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col md:space-y-4">
        <Link
          href={`/${posts[1].slug}`}
          className="block rounded shadow hover:shadow-lg transition-shadow duration-200 relative overflow-hidden flex-grow"
        >
          <div className="relative w-full h-56 md:h-full">
            <Image
              src={secondPostError ? defaultImage : posts[1].image}
              alt={posts[1].title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={true}
              onError={() => setSecondPostError(true)}
              className="transition-transform duration-300 transform hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h2 className="text-sm md:text-lg font-bold">{posts[1].title}</h2>
            </div>
          </div>
        </Link>
        <Link
          href={`/${posts[2].slug}`}
          className="block rounded shadow hover:shadow-lg transition-shadow duration-200 relative overflow-hidden flex-grow"
        >
          <div className="relative w-full h-56 md:h-full">
            <Image
              src={thirdPostError ? defaultImage : posts[2].image}
              alt={posts[2].title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={true}
              onError={() => setThirdPostError(true)}
              className="transition-transform duration-300 transform hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h2 className="text-sm md:text-lg font-bold">{posts[2].title}</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPosts;

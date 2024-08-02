'use client';

import Link from 'next/link';

const BlogList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
        >
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
            </div>
          </div>
          <div className="p-4">
            <p className="text-black dark:text-white">{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;

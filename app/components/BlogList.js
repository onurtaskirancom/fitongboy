'use client';

import Link from 'next/link';

const BlogList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
        >
          <div className="relative overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-zinc-900">
            <p className="text-black dark:text-slate-300">{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;

'use client';

import Link from 'next/link';

const Sidebar = ({ categories = [], popularPosts, recentPosts }) => {
  return (
    <div>
      <section className="mb-4">
        <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-3">
          En Çok Okunanlar
        </h3>
        <ul className="pt-2 space-y-4">
          {popularPosts.length > 0 ? (
            popularPosts.map((post) => (
              <li key={post.slug} className="relative">
                <Link
                  href={`/${post.slug}`}
                  className="block overflow-hidden rounded shadow hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <h2 className="text-sm font-bold">{post.title}</h2>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li key="no-popular">En çok okunan yazı bulunamadı</li>
          )}
        </ul>
      </section>
      <section className="mb-4">
        <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-3">
          Son Yazılar
        </h3>
        <ul className="pt-2 space-y-4">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <li key={post.slug} className="relative">
                <Link
                  href={`/${post.slug}`}
                  className="block overflow-hidden rounded shadow hover:shadow-lg transition-shadow duration-200"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <h2 className="text-sm font-bold">{post.title}</h2>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li key="no-recent">Son yazı bulunamadı</li>
          )}
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-3">
          Kategoriler
        </h3>
        <ul className="pt-2">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <li key={index} className="float-right mr-2">
                <Link
                  href={`/kategori/${category
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                  className="block text-center text-gray-800 dark:text-blue-300 hover:bg-gradient-to-r hover:from-gray-200 hover:to-blue-300 dark:hover:from-gray-800 dark:hover:to-blue-500 hover:scale-105 transition-all duration-300 py-1 rounded"
                >
                  {category}
                </Link>
              </li>
            ))
          ) : (
            <li key="no-category">Kategori bulunamadı</li>
          )}
        </ul>
        <div className="clear-both"></div>
      </section>
    </div>
  );
};

export default Sidebar;

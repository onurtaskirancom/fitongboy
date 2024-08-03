'use client';

import Link from 'next/link';

const Sidebar = ({ categories, popularPosts, recentPosts }) => {
  return (
    <div>
      <section className="mb-4">
        <h3 className="text-xl font-bold">En Çok Okunanlar</h3>
        <ul className="space-y-4">
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
                    className="w-full h-32 object-cover"
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
        <h3 className="text-xl font-bold">Son Yazılar</h3>
        <ul className="space-y-4">
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
                    className="w-full h-32 object-cover"
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
        <h3 className="text-xl font-bold">Kategoriler</h3>
        <ul className="list-disc list-inside">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <li key={index}>
                <Link
                  href={`/kategori/${category.toLowerCase()}`}
                  className="text-blue-500 hover:underline"
                >
                  {category}
                </Link>
              </li>
            ))
          ) : (
            <li key="no-category">Kategori bulunamadı</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Sidebar;

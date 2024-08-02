'use client';

import Link from 'next/link';

const Sidebar = ({ categories, popularPosts, recentPosts }) => {
  return (
    <div>
      <section className="mb-4">
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
      <section className="mb-4">
        <h3 className="text-xl font-bold">En Çok Okunanlar</h3>
        <ul className="list-disc list-inside">
          {popularPosts.length > 0 ? (
            popularPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${post.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))
          ) : (
            <li key="no-popular">En çok okunan yazı bulunamadı</li>
          )}
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-bold">Son Yazılar</h3>
        <ul className="list-disc list-inside">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${post.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))
          ) : (
            <li key="no-recent">Son yazı bulunamadı</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Sidebar;


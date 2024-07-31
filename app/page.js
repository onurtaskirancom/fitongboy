'use client';

import { useEffect, useState } from 'react';
import BlogList from './components/BlogList';
import Sidebar from './components/Sidebar';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      if (!res.ok) {
        console.error('Failed to fetch posts');
        return;
      }
      const data = await res.json();
      setPosts(data.sort((a, b) => new Date(b.date) - new Date(a.date))); // Son yazıları sıralamak için
      setPopularPosts(
        data
          .slice()
          .sort((a, b) => b.views - a.views)
          .slice(0, 5)
      ); // En çok okunanları sıralamak için
      setRecentPosts(
        data
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
      );
    }

    async function fetchCategories() {
      const res = await fetch('/api/categories');
      if (!res.ok) {
        console.error('Failed to fetch categories');
        return;
      }
      const data = await res.json();
      setCategories(data.categories);
    }

    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row pt-16">
      <main className="w-full md:w-3/4 p-4">
        <BlogList posts={posts} />
      </main>
      <aside className="w-full md:w-1/4 p-4">
        <Sidebar
          categories={categories}
          popularPosts={popularPosts}
          recentPosts={recentPosts}
        />
      </aside>
    </div>
  );
}

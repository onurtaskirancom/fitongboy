'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogList from './components/BlogList';
import Sidebar from './components/Sidebar';
import FeaturedPosts from './components/FeaturedPosts';
import TrendPosts from './components/TrendPosts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoryList from './components/CategoryList';

const parseDate = (dateString) => {
  if (dateString.includes('-')) {
    const parts = dateString.split('-');
    if (parts[2].length === 4) {
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    } else {
      return new Date(dateString);
    }
  }
  return new Date(dateString);
};

const filterPostsByCategory = (posts, category) => {
  return posts.filter((post) => post.categories.includes(category));
};

const getTopPostsByViews = (posts, count) => {
  return posts
    .slice()
    .sort((a, b) => b.views - a.views)
    .slice(0, count);
};

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      if (!res.ok) {
        console.error('Failed to fetch posts');
        return;
      }
      const data = await res.json();
      const validPosts = data.filter(
        (post) => post.date && typeof post.date === 'string'
      );

      const sortedPosts = validPosts.sort(
        (a, b) => parseDate(b.date) - parseDate(a.date)
      );

      setPosts(sortedPosts);
      setPopularPosts(
        sortedPosts
          .slice()
          .sort((a, b) => b.views - a.views)
          .slice(0, 5)
      );
      setRecentPosts(sortedPosts.slice(0, 5));
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

  const remainingPosts = posts.slice(3);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts =
    currentPage === 1
      ? remainingPosts.slice(0, postsPerPage)
      : remainingPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(remainingPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; 
    router.push(`/?page=${pageNumber}`);
  };

  const antrenmanPosts = getTopPostsByViews(
    filterPostsByCategory(posts, 'Antrenman'),
    6
  );
  const beslenmePosts = getTopPostsByViews(
    filterPostsByCategory(posts, 'Beslenme'),
    6
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto flex flex-col pt-16">
        {currentPage === 1 && (
          <>
            <FeaturedPosts posts={posts.slice(0, 3)} />
            <TrendPosts
              title="Antrenmanlarda Trend Olanlar"
              posts={antrenmanPosts}
            />
            <TrendPosts
              title="Beslenmede Trend Olanlar"
              posts={beslenmePosts}
            />
          </>
        )}
        <div className="flex flex-col md:flex-row">
          <main className="w-full md:w-3/4 p-4">
            <BlogList posts={currentPosts} />
            <div className="pagination mt-4 flex justify-center items-center space-x-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === 1
                    ? 'bg-gray-300 text-black cursor-default'
                    : 'bg-blue-400 text-white cursor-pointer'
                }`}
                disabled={currentPage === 1}
              >
                Önceki
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-400 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-black cursor-default'
                    : 'bg-blue-400 text-white cursor-pointer'
                }`}
                disabled={currentPage === totalPages}
              >
                Sonraki
              </button>
            </div>
          </main>
          <aside className="w-full md:w-1/4 p-4">
            <Sidebar
              categories={categories}
              popularPosts={popularPosts}
              recentPosts={recentPosts}
            />
          </aside>
        </div>
      </div>
      <CategoryList categories={categories} />
      <Footer />
    </div>
  );
}

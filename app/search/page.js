'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';

export default function SearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ''; 
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;

  const [posts, setPosts] = useState([]);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const res = await fetch(`/api/posts?q=${encodeURIComponent(query)}`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  // Check if posts is an array before slicing
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(posts)
    ? posts.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const totalPages = Math.ceil(
    Array.isArray(posts) ? posts.length / postsPerPage : 1
  );

  const paginate = (pageNumber) => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=${pageNumber}`);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          Arama Sonuçları: "{query}"
        </h1>
        {currentPosts.length > 0 ? (
          <>
            <BlogList posts={currentPosts} />
            <div className="pagination mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center">Sonuç bulunamadı.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

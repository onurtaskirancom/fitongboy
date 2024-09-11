'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogList from '../components/BlogList';
import Footer from '../components/Footer';

export default function SearchResultsClient({ searchParams }) {
  const router = useRouter();
  const query = searchParams?.q || '';
  const page = searchParams?.page || 1;
  const currentPage = parseInt(page, 10);

  const [posts, setPosts] = useState([]);
  const postsPerPage = 6;

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const res = await fetch(`/api/posts?q=${encodeURIComponent(query)}`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        
        // Parse and sort dates
        const sortedPosts = data
          .filter(post => post.date && /^\d{2}-\d{2}-\d{4}$/.test(post.date))
          .sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('-').map(Number);
            const [dayB, monthB, yearB] = b.date.split('-').map(Number);
            
            // Compare dates
            if (yearA !== yearB) return yearB - yearA;
            if (monthA !== monthB) return monthB - monthA;
            return dayB - dayA;
          });
        
        console.log('Sıralanmış arama sonuçları:', sortedPosts.map(post => ({ title: post.title, date: post.date })));
        
        setPosts(sortedPosts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    }

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; 
    router.push(`/search?q=${encodeURIComponent(query)}&page=${pageNumber}`);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          Arama Sonuçları: &quot;{query}&quot;
        </h1>
        {currentPosts.length > 0 ? (
          <>
            <BlogList posts={currentPosts} />
            <div className="pagination mt-4 flex flex-wrap justify-center items-center space-x-1 space-y-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`px-4 py-2 mx-1 rounded text-sm ${
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
                  className={`px-4 py-2 mx-1 rounded text-sm ${
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
                className={`px-4 py-2 mx-1 rounded text-sm ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-black cursor-default'
                    : 'bg-blue-400 text-white cursor-pointer'
                }`}
                disabled={currentPage === totalPages}
              >
                Sonraki
              </button>
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

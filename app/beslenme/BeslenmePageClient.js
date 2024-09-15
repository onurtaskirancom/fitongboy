'use client';

import { useEffect, useState } from 'react';
import BlogList from '../components/BlogList';
import { useRouter, useSearchParams } from 'next/navigation';
import Footer from '../components/Footer';

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

export default function BeslenmePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;

  const [posts, setPosts] = useState([]);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    async function fetchBeslenmePosts() {
      try {
        const res = await fetch('/api/posts?category=beslenme');
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        const validPosts = data.filter(
          (post) => post.date && typeof post.date === 'string'
        );

        const sortedPosts = validPosts.sort(
          (a, b) => parseDate(b.date) - parseDate(a.date)
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error occurred while fetching posts:', error);
      }
    }

    fetchBeslenmePosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    router.push(`/beslenme?page=${pageNumber}`);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          Beslenme Yazıları
        </h1>
        <BlogList posts={currentPosts} />
        <div className="pagination mt-4 flex justify-center">
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
        </div>
      </div>
      <Footer />
    </>
  );
}

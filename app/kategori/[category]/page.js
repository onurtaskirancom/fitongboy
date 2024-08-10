'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import BlogList from '../../components/BlogList';
import replaceTurkishChars from '../../utils/turkishChars';
import Footer from '@/app/components/Footer';

const formatCategoryName = (category) => {
  return replaceTurkishChars(category).toLowerCase().replace(/\s+/g, '-');
};

const decodeCategoryName = (category) => {
  return replaceTurkishChars(category.replace(/-/g, ' '));
};

export default function CategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { category } = useParams();
  const formattedCategory = decodeCategoryName(category);
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;

  const [posts, setPosts] = useState([]);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    async function fetchCategoryPosts() {
      try {
        const res = await fetch(`/api/posts?category=${formattedCategory}`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data || []); // Default to an empty array if undefined
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // Default to an empty array on error
      }
    }

    fetchCategoryPosts();
  }, [category]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    router.push(`/kategori/${category}?page=${pageNumber}`);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          {formattedCategory.charAt(0).toUpperCase() +
            formattedCategory.slice(1)}{' '}
          Yazıları
        </h1>
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
      </div>
      <Footer />
    </>
  );
}

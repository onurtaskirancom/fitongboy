// app/[slug]/page.js

'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const MDXRemote = dynamic(() =>
  import('next-mdx-remote').then((mod) => mod.MDXRemote)
);

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const hasIncrementedViews = useRef(false);
  const firstRender = useRef(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/mdx?slug=${slug}`);
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await res.json();
        if (isMounted) {
          setPost(data);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!slug || hasIncrementedViews.current || !firstRender.current) {
      return;
    }

    firstRender.current = false;

    async function incrementViews() {
      try {
        const res = await fetch('/api/increment-views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });
        if (!res.ok) {
          const errorResponse = await res.json();
          console.error('Failed to increment views:', errorResponse);
          throw new Error('Failed to increment views');
        }
        const data = await res.json();
        hasIncrementedViews.current = true;
      } catch (error) {
        console.error('Error in incrementViews:', error);
      }
    }

    incrementViews();
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-screen-md mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold text-center">
        {post.frontmatter.title}
      </h1>
      <img
        src={post.frontmatter.image}
        alt={post.frontmatter.title}
        className="w-full h-auto mb-4 mx-auto rounded-lg"
      />
      <p className="text-gray-500 text-center">{post.frontmatter.date}</p>
      <div className="prose mx-auto">
        <MDXRemote {...post.mdxSource} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Kategoriler</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.frontmatter.categories.map((category) => (
            <span
              key={category}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

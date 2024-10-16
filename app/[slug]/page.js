import PostPageClient from './PostPageClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const post = await fetch(
    `${process.env.SITE_URL || 'http://localhost:3000'}/api/mdx?slug=${
      params.slug
    }`
  ).then((res) => res.json());

  if (!post || !post.frontmatter || !post.frontmatter.title) {
    return notFound();
  }

  return {
    title: `${post.frontmatter.title} | Fitongboy`,
    description: post.frontmatter.excerpt || 'Fitongboy blog yazısı',
    openGraph: {
      title: `${post.frontmatter.title} | Fitongboy`,
      description: post.frontmatter.excerpt || 'Fitongboy blog yazısı',
      url: `${process.env.SITE_URL || 'http://localhost:3000'}/${params.slug}`,
      type: 'article',
      images: [
        {
          url: `${process.env.SITE_URL || 'http://localhost:3000'}${
            post.frontmatter.image
          }`,
          width: 800,
          height: 600,
          alt: post.frontmatter.title,
        },
      ],
      site_name: 'Fitongboy',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@fitongboy',
      title: `${post.frontmatter.title} | Fitongboy`,
      description: post.frontmatter.description || 'Fitongboy blog post',
      image: `${process.env.SITE_URL || 'http://localhost:3000'}${
        post.frontmatter.image
      }`,
    },
  };
}

export default function PostPage({ params }) {
  return (
    <div>
      <PostPageClient slug={params.slug} />
    </div>
  );
}

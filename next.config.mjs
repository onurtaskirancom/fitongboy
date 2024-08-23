import path from 'path';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from '@mapbox/rehype-prism';
import withPlugins from 'next-compose-plugins';
import withMDX from '@next/mdx';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/rss.xml',
        destination: '/api/rss',
        permanent: true,
      },
    ];
  },
};

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrism],
  },
})(nextConfig);

export default withPlugins([], mdxConfig);

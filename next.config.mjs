import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
};

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
})(nextConfig);

export default mdxConfig;

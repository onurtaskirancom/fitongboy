import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Feed } from 'feed';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('RSS feed generation started');

  try {
    const siteUrl = process.env.SITE_URL || 'https://www.fitongboy.com';
    const blogDirectory = path.join(process.cwd(), 'app', 'posts');

    console.log(`Blog dizini: ${blogDirectory}`);

    if (!fs.existsSync(blogDirectory)) {
      console.error(`Dizin bulunamadı: ${blogDirectory}`);
      return new NextResponse('Error: Posts directory not found', {
        status: 500,
      });
    }

    const files = fs.readdirSync(blogDirectory);
    console.log(`Found ${files.length} files`);

    const feed = new Feed({
      title: 'Fitongboy',
      description:
        'Fitnes, vücut geliştirme, güç antrenmanları üzerine bir spor sitesi',
      id: siteUrl,
      link: siteUrl,
      language: 'tr',
      favicon: `${siteUrl}/favicon.ico`,
      copyright: `Tüm hakları saklıdır ${new Date().getFullYear()}`,
      author: {
        name: 'Fitongboy',
        email: 'ongboycom@gmail.com',
        link: siteUrl,
      },
      feedLinks: {
        rss2: `${siteUrl}/rss.xml`,
      },
    });

    files.forEach((fileName) => {
      const filePath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      feed.addItem({
        title: data.title,
        id: `${siteUrl}/${fileName.replace('.mdx', '')}`,
        link: `${siteUrl}/${fileName.replace('.mdx', '')}`,
        description: data.excerpt,
        content: content,
        author: [
          {
            name: 'Fitongboy',
            email: 'ongboycom@gmail.com',
            link: siteUrl,
          },
        ],
        date: new Date(data.date),
      });
    });

    console.log('RSS feed generated successfully');

    return new NextResponse(feed.rss2(), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse(`Error generating RSS feed: ${error.message}`, {
      status: 500,
    });
  }
}

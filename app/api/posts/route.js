import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import replaceTurkishChars from '../../utils/turkishChars';
import { database } from '../../utils/firebaseConfig';
import { get, ref, child } from 'firebase/database';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category')?.toLowerCase();

  try {
    const blogDirectory = path.join(process.cwd(), 'app', 'posts');
    if (!fs.existsSync(blogDirectory)) {
      throw new Error(`Directory not found: ${blogDirectory}`);
    }

    const files = fs.readdirSync(blogDirectory);
    if (!files.length) {
      throw new Error(`No files found in directory: ${blogDirectory}`);
    }

    // Fetch posts from MDX files
    let posts = files
      .filter((filename) => filename.endsWith('.mdx'))
      .map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content } = matter(markdownWithMeta);

        return {
          slug: filename.replace('.mdx', ''),
          ...frontmatter,
          content: content.toLowerCase(),
          views: 0, // Set default value to 0
        };
      });

    // Fetch view counts from Firebase
    const fetchViewsFromFirebase = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'views'));

        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.error('No data available in Firebase');
          return {};
        }
      } catch (error) {
        console.error('Error fetching views from Firebase:', error);
        return {};
      }
    };

    // Fetch view counts and add them to posts
    const viewsData = await fetchViewsFromFirebase();
    posts = posts.map((post) => ({
      ...post,
      views: viewsData[post.slug]?.views || 0,
    }));

    // Filter posts by category (if a category is specified)
    if (category) {
      posts = posts.filter(
        (post) =>
          post.categories &&
          post.categories
            .map((c) => replaceTurkishChars(c.toLowerCase()))
            .includes(category)
      );
    }

    // Sort posts by view count (descending order)
    posts.sort((a, b) => b.views - a.views);

    // Filter posts based on search query (if a query is specified)
    if (query) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.includes(query)
      );
    }

    return new Response(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to load posts', details: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

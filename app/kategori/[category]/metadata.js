import replaceTurkishChars from '../../utils/turkishChars';

export async function generateMetadata({ params }) {
  const category = params.category;
  const formattedCategory = replaceTurkishChars(category)
    .replace(/-/g, ' ')
    .toLowerCase();

  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/kategori/${category}`;

  return {
    title: `Fitongboy | ${
      formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
    } Yazıları`,
    description: `Fitongboy platformunda ${
      formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
    } kategorisindeki en iyi yazıları keşfedin.`,
    openGraph: {
      title: `Fitongboy | ${
        formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
      } Yazıları`,
      description: `Fitongboy platformunda ${
        formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
      } kategorisindeki en iyi yazıları keşfedin.`,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/fitongboy-logo.png`,
          width: 800,
          height: 600,
          alt: 'Fitongboy Logo',
        },
      ],
      site_name: 'Fitongboy',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@fitongboy',
      title: `Fitongboy | ${
        formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
      } Yazıları`,
      description: `Fitongboy platformunda ${
        formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)
      } kategorisindeki en iyi yazıları keşfedin.`,
      image: `${siteUrl}/images/fitongboy-logo.png`,
    },
  };
}

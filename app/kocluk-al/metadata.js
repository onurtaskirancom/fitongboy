export async function generateMetadata() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/kocluk-al`;

  return {
    title: 'Fitongboy | Koçluk Talebi',
    description: 'Fitongboy ile koçluk talebinde bulunun.',
    openGraph: {
      title: 'Fitongboy | Koçluk Talebi',
      description: 'Fitongboy ile koçluk talebinde bulunun.',
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
      title: 'Fitongboy | Koçluk Talebi',
      description: 'Fitongboy ile koçluk talebinde bulunun.',
      images: `${siteUrl}/images/fitongboy-logo.png`,
    },
  };
}

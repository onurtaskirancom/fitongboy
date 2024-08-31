export async function generateMetadata() {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/iletisim`;

  return {
    title: 'Fitongboy | İletişim',
    description: 'Fitongboy ile iletişime geçin.',
    openGraph: {
      title: 'Fitongboy | İletişim',
      description: 'Fitongboy ile iletişime geçin.',
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
      title: 'Fitongboy | İletişim',
      description: 'Fitongboy ile iletişime geçin.',
      images: `${siteUrl}/images/fitongboy-logo.png`,
    },
  };
}

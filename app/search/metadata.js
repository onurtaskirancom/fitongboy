export async function generateMetadata({ params, searchParams }) {
  const query = searchParams?.q || ''; // We get the query parameter using searchParams.q
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  const title = query
    ? `Arama Sonuçları: "${query}" | Fitongboy`
    : 'Arama | Fitongboy';
  const description = query
    ? `Fitongboy üzerinde "${query}" araması için sonuçlar.`
    : 'Fitongboy üzerinde arama yapın ve ilginizi çeken içerikleri keşfedin.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/search?q=${encodeURIComponent(query)}`,
    },
  };
}

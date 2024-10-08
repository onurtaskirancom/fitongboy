import Image from 'next/image';
import Footer from '../components/Footer';

export const generateMetadata = () => {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const canonicalUrl = `${siteUrl}/hakkimizda`;

  return {
    title: 'Fitongboy | Hakkımızda',
    description: 'Fitongboy hakkında bilgi edinin.',
    openGraph: {
      title: 'Fitongboy | Hakkımızda',
      description: 'Fitongboy hakkında bilgi edinin.',
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
      title: 'Fitongboy | Hakkımızda',
      description: 'Fitongboy hakkında bilgi edinin.',
      images: `${siteUrl}/images/fitongboy-logo.png`,
    },
  };
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-screen-lg mx-auto p-4 mt-16 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white mb-6">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/fitongboy-logo.svg"
            alt="Fitongboy Logo"
            className="w-3/5"
            width={350}
            height={350}
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Hakkımızda</h1>
        <div className="space-y-4">
          <p>
            <strong>Fitongboy</strong> olarak fitness, vücut geliştirme, güç
            antrenmanı ve makale paylaşımı konusunda uzmanlaşmış bir platformuz.
            Amacımız, sizlere en güncel ve doğru bilgileri sunarak, sağlıklı ve
            güçlü bir vücuda ulaşmanızda yardımcı olmaktır.
          </p>
          <p>
            Sitemizde çeşitli antrenman programları, beslenme önerileri ve
            fitness hakkında detaylı makaleler bulabilirsiniz. İster yeni
            başlayan olun, ister ileri seviye bir sporcu, herkes için uygun
            içerikler sunmaktayız.
          </p>
          <p>
            Ayrıca, kişiye özel antrenman programları ve danışmanlık hizmetleri
            de sunuyoruz. İhtiyaçlarınıza ve hedeflerinize uygun bir program
            oluşturmak için bizimle iletişime geçebilirsiniz.
          </p>
          <p>
            Sağlıklı yaşam yolculuğunuzda <strong>Fitongboy</strong> olarak
            yanınızdayız. Hedeflerinize ulaşmanız için gereken motivasyonu ve
            bilgiyi sizlere sağlamak için buradayız.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

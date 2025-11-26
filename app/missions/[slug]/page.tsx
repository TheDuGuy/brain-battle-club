import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getMissionBySlug, getAllMissions, getMissionColorClasses } from '@/lib/missions';
import { getKits, Product } from '@/lib/shopify';

// Generate static params for all missions
export async function generateStaticParams() {
  const missions = getAllMissions();
  return missions.map((mission) => ({
    slug: mission.slug,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mission = getMissionBySlug(slug);

  if (!mission) {
    return {
      title: 'Mission Not Found',
    };
  }

  return {
    title: `${mission.label} | Brain Battle Club`,
    description: mission.tagline,
  };
}

export default async function MissionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mission = getMissionBySlug(slug);

  if (!mission) return notFound();

  const colors = getMissionColorClasses(mission.color);

  // Get all kits and filter by mission slug
  const allKits = await getKits();
  const matchingKits = allKits.filter((kit) => kit.missionSlug === slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${colors.gradient} py-12 sm:py-16`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-text-light">/</li>
              <li>
                <Link href="/missions" className="text-text-secondary hover:text-text-primary transition-colors">
                  Missions
                </Link>
              </li>
              <li className="text-text-light">/</li>
              <li className="text-text-primary font-medium">{mission.shortLabel}</li>
            </ol>
          </nav>

          {/* Mission Header */}
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <span
              className={`inline-flex items-center rounded-full ${colors.bg} text-white px-3 py-1 text-xs font-semibold`}
            >
              Mission
            </span>
            <span
              className={`inline-flex items-center rounded-md ${colors.bgLight} ${colors.text} px-2.5 py-1 text-xs font-medium border ${colors.border}`}
            >
              {mission.ageRange}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            {mission.label}
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
            {mission.tagline}
          </p>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left Column - What they'll practise */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
                What your child will practise
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                {mission.description}
              </p>

              <ul className="space-y-3">
                {mission.whatTheyPractice.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.bgLight} ${colors.text} flex items-center justify-center mr-3 mt-0.5`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column - What parents get */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
                What this gives you as a parent
              </h2>

              <ul className="space-y-3 mb-8">
                {mission.whatParentsGet.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.bgLight} ${colors.text} flex items-center justify-center mr-3 mt-0.5`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Best For Card */}
              <div className={`rounded-xl ${colors.bgLight} border ${colors.border} p-5`}>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Best for:</h3>
                <ul className="space-y-2">
                  {mission.idealFor.map((item, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <svg className={`w-4 h-4 ${colors.text} mr-2 mt-0.5 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kits that unlock this mission */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">
            Kits that unlock this mission
          </h2>

          {matchingKits.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingKits.map((kit) => (
                <KitCard key={kit.id} kit={kit} missionShortLabel={mission.shortLabel} colors={colors} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-text-secondary mb-4">
                We&apos;re still setting up kits for this mission. Check back soon or browse all study kits.
              </p>
              <Link
                href="/#kits"
                className="inline-flex items-center text-brand-purple font-semibold hover:underline"
              >
                Browse all kits
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* App Integration Teaser */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 border border-brand-blue/20 p-8 sm:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                  How this works in the Brain Battle Academy app
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  When you buy a kit that unlocks this mission, you&apos;ll get a code to access matching
                  missions in the Brain Battle Academy app. Missions guide your child through short,
                  focused sessions and track their progress over time.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#kits"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-brand-pink hover:bg-brand-pink-dark rounded-xl transition-all shadow-soft hover:shadow-glow-pink"
              >
                Browse kits
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-brand-purple bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
              >
                Learn about the app
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back to missions link */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link
          href="/missions"
          className="inline-flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all missions
        </Link>
      </div>
    </div>
  );
}

// Kit Card Component
function KitCard({
  kit,
  missionShortLabel,
  colors,
}: {
  kit: Product;
  missionShortLabel: string;
  colors: ReturnType<typeof getMissionColorClasses>;
}) {
  return (
    <Link
      href={`/products/${kit.handle}`}
      className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
    >
      <div className="aspect-square relative bg-gray-50">
        {kit.featuredImage ? (
          <Image
            src={kit.featuredImage.url}
            alt={kit.featuredImage.altText || kit.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-light">
            No Image
          </div>
        )}

        {/* Mission badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center rounded-full ${colors.bg} text-white px-2.5 py-1 text-xs font-semibold shadow-soft`}>
            {missionShortLabel}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-text-primary mb-2 group-hover:text-brand-purple transition-colors">
          {kit.title}
        </h3>
        <p className="text-lg font-bold text-brand-navy mb-3">
          {kit.priceRange.minVariantPrice.currencyCode}{' '}
          {parseFloat(kit.priceRange.minVariantPrice.amount).toFixed(2)}
        </p>
        <span className="inline-flex items-center text-sm font-semibold text-brand-purple group-hover:underline">
          View kit
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

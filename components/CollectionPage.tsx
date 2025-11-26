import Link from 'next/link';
import { Collection } from '@/lib/shopify';
import { ProductCard } from '@/components/ProductCard';
import {
  IconAll,
  IconBundles,
  IconMaths,
  IconVerbal,
  IconTools,
} from '@/components/CategoryIcons';

// Collection route configuration
export const COLLECTION_CONFIG: Record<
  string,
  {
    shopifyHandle: string;
    title: string;
    description: string;
    heroGradient: string;
  }
> = {
  kits: {
    shopifyHandle: 'kits',
    title: 'Study Kits',
    description: 'Mission-ready study kits for 11+ prep. Each kit combines physical tools with digital missions in our Brain Battle Academy app.',
    heroGradient: 'from-brand-purple/10 via-brand-pink/5 to-brand-orange/5',
  },
  bundles: {
    shopifyHandle: 'bundles',
    title: 'Bundles',
    description: 'Complete study bundles that include everything you need. Save money and get more with our curated bundles.',
    heroGradient: 'from-brand-orange/10 via-brand-yellow/5 to-brand-pink/5',
  },
  maths: {
    shopifyHandle: 'maths',
    title: 'Maths',
    description: 'Build numerical confidence with our maths-focused kits. Perfect for 11+ maths preparation.',
    heroGradient: 'from-brand-blue/10 via-brand-purple/5 to-brand-green/5',
  },
  'verbal-reasoning': {
    shopifyHandle: 'verbal-reasoning',
    title: 'Verbal Reasoning',
    description: 'Strengthen vocabulary and verbal reasoning skills with targeted practice tools and missions.',
    heroGradient: 'from-brand-pink/10 via-brand-purple/5 to-brand-blue/5',
  },
  tools: {
    // TODO: Adjust handle if your Shopify collection handle is different (e.g., "study-tools" or "focus-tools")
    shopifyHandle: 'study-tools',
    title: 'Study Tools',
    description: 'Essential tools for focused, organized study sessions. From desk organizers to fidget tools.',
    heroGradient: 'from-brand-green/10 via-brand-blue/5 to-brand-purple/5',
  },
};

// Category pill links
const CATEGORY_PILLS = [
  { name: 'All Kits', href: '/kits', icon: IconAll, color: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' },
  { name: 'Bundles', href: '/bundles', icon: IconBundles, color: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' },
  { name: 'Maths', href: '/maths', icon: IconMaths, color: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
  { name: 'Verbal', href: '/verbal-reasoning', icon: IconVerbal, color: 'bg-brand-pink/10 text-brand-pink border-brand-pink/20' },
  { name: 'Tools', href: '/tools', icon: IconTools, color: 'bg-brand-green/10 text-brand-green border-brand-green/20' },
];

interface CollectionPageLayoutProps {
  collection: Collection | null;
  config: (typeof COLLECTION_CONFIG)[string];
  currentPath: string;
}

export function CollectionPageLayout({
  collection,
  config,
  currentPath,
}: CollectionPageLayoutProps) {
  const products = collection?.products ?? [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${config.heroGradient} py-12 sm:py-16`}>
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
              <li className="text-text-primary font-medium">{config.title}</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            {config.title}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            {config.description}
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORY_PILLS.map((pill) => {
              const isActive = currentPath === pill.href;
              const IconComponent = pill.icon;
              return (
                <Link
                  key={pill.href}
                  href={pill.href}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    isActive
                      ? 'bg-brand-navy text-white border-brand-navy'
                      : `${pill.color} hover:scale-105`
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {pill.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <EmptyCollectionState />
          ) : (
            <>
              <p className="text-sm text-text-secondary mb-6">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function EmptyCollectionState() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-text-light"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">
        No products found
      </h2>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        We&apos;re still setting up this collection. Check back soon or browse all our study kits.
      </p>
      <Link
        href="/kits"
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-brand-pink hover:bg-brand-pink-dark rounded-xl transition-all shadow-soft hover:shadow-glow-pink"
      >
        Browse all kits
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

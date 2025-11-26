import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { searchProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/ProductCard';
import { SearchForm } from '@/components/SearchForm';

export const metadata: Metadata = {
  title: 'Search | Brain Battle Club',
  description: 'Search for study kits, tools, and resources for 11+ exam preparation.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const products = query ? await searchProducts(query) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue/10 via-brand-purple/5 to-brand-pink/5 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            Search
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Find study kits, tools and resources for 11+ prep
          </p>

          {/* Search Form wrapped in Suspense for useSearchParams */}
          <Suspense fallback={<SearchFormFallback />}>
            <SearchForm />
          </Suspense>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {!query ? (
            <EmptyQueryState />
          ) : products.length === 0 ? (
            <NoResultsState query={query} />
          ) : (
            <SearchResults query={query} products={products} />
          )}
        </div>
      </section>
    </div>
  );
}

function SearchFormFallback() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="w-full h-14 rounded-xl bg-white/50 border border-gray-200 animate-pulse" />
    </div>
  );
}

function EmptyQueryState() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-purple/10 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-brand-purple"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">
        Start searching
      </h2>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        Enter a search term above to find study kits, tools, and resources.
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

function NoResultsState({ query }: { query: string }) {
  return (
    <div className="text-center py-12">
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
            d="M9.172 9.172a4 4 0 015.656 0M9 21h6M12 18v-6m-7-5a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">
        No results for &ldquo;{query}&rdquo;
      </h2>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        We couldn&apos;t find any products matching your search. Try another topic or browse all our kits.
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

function SearchResults({
  query,
  products,
}: {
  query: string;
  products: Awaited<ReturnType<typeof searchProducts>>;
}) {
  return (
    <>
      <p className="text-sm text-text-secondary mb-6">
        Showing {products.length} {products.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </>
  );
}

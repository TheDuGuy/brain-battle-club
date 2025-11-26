import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/shopify';
import { getBundleInfo } from '@/lib/bundles';
import { getMission } from '@/lib/missions';
import { MissionBadge } from '@/components/MissionBadge';

// Brand tinted backgrounds for visual variety
const BG_COLORS = [
  'bg-brand-purple/5',
  'bg-brand-blue/5',
  'bg-brand-orange/5',
  'bg-brand-green/5',
  'bg-brand-pink/5',
  'bg-brand-yellow/5',
];

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const bundle = getBundleInfo(product.handle);
  const mission = product.missionSlug ? getMission(product.missionSlug) : null;
  const bgColor = BG_COLORS[index % BG_COLORS.length];

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
    >
      <div className={`aspect-square relative ${bgColor}`}>
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-light">
            No Image
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.missionLabel && (
            <MissionBadge
              label={product.missionLabel}
              slug={product.missionSlug}
              size="sm"
              color={mission?.color}
            />
          )}
          {bundle ? (
            <span className="inline-flex items-center rounded-full bg-primary text-white px-2.5 py-1 text-xs font-semibold">
              Bundle
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-accent text-brand-navy px-2.5 py-1 text-xs font-semibold">
              Individual
            </span>
          )}
          {bundle?.includesAppAccess && (
            <span className="inline-flex items-center rounded-full bg-mission text-brand-navy px-2.5 py-1 text-xs font-semibold">
              + App
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-text-primary mb-2">
          {product.title}
        </h3>

        {/* Subject & Age Badges */}
        {bundle && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="inline-flex items-center rounded-md bg-brand-purple/10 text-brand-purple px-2 py-0.5 text-xs font-medium border border-brand-purple/20">
              {bundle.subject}
            </span>
            <span className="inline-flex items-center rounded-md bg-brand-orange/10 text-brand-orange-dark px-2 py-0.5 text-xs font-medium border border-brand-orange/20">
              {bundle.ageRange}
            </span>
          </div>
        )}

        <p className="text-xl font-bold text-text-primary">
          {product.priceRange.minVariantPrice.currencyCode}{' '}
          {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

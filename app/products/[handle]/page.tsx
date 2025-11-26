import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { getProductByHandle } from '@/lib/shopify';
import { getCartIdFromCookie, setCartIdCookie } from '@/lib/cart-cookie';
import { createCart, addLinesToCart, getCart } from '@/lib/cart';
import { getBundleInfo } from '@/lib/bundles';
import { getMission, getMissionColorClasses } from '@/lib/missions';
import { IconCheck } from '@/components/CategoryIcons';

async function addToCartAction(formData: FormData) {
  'use server';

  try {
    const merchandiseId = formData.get('merchandiseId') as string;
    const quantity = parseInt(formData.get('quantity') as string) || 1;

    let cartId = await getCartIdFromCookie();

    if (!cartId) {
      const cart = await createCart();
      cartId = cart.id;
      await setCartIdCookie(cartId);
    }

    const existingCart = await getCart(cartId);
    if (!existingCart) {
      const cart = await createCart();
      cartId = cart.id;
      await setCartIdCookie(cartId);
    }

    await addLinesToCart(cartId, [{ merchandiseId, quantity }]);
    redirect('/cart');
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('[Add to Cart] Error:', error);
    throw error;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const bundle = getBundleInfo(product.handle);
  const firstVariant = product.variants.edges[0]?.node;
  const mission = product.missionSlug ? getMission(product.missionSlug) : null;
  const missionColors = mission ? getMissionColorClasses(mission.color) : null;

  if (!firstVariant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-red-600 text-center">This product is not available for purchase.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-text-secondary">
          <Link href="/" className="hover:text-text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/#kits" className="hover:text-text-primary">Study Kits</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
            {product.featuredImage ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-light">
                No Image Available
              </div>
            )}

            {/* Product Type Badge on Image */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {bundle ? (
                <span className="inline-flex items-center rounded-full bg-primary text-white px-3 py-1.5 text-xs font-semibold">
                  Bundle
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-accent text-brand-navy px-3 py-1.5 text-xs font-semibold">
                  Individual
                </span>
              )}
              {bundle?.includesAppAccess && (
                <span className="inline-flex items-center rounded-full bg-mission text-brand-navy px-3 py-1.5 text-xs font-semibold">
                  + App
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-text-primary mb-3">{product.title}</h1>

            {/* Linked Mission Panel */}
            {product.missionLabel && product.missionSlug && mission && missionColors && (
              <div className={`mt-4 mb-6 rounded-xl ${missionColors.bgLight} border ${missionColors.border} p-4`}>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
                  Linked Mission
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center rounded-full ${missionColors.bg} text-white px-3 py-1 text-xs font-semibold`}>
                    {mission.label}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  This kit unlocks the <span className="font-medium">{mission.label}</span> in the Brain Battle Academy app.
                </p>
                <Link
                  href={`/missions/${product.missionSlug}`}
                  className={`inline-flex items-center text-sm font-semibold ${missionColors.text} hover:underline`}
                >
                  See mission details
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Simplified Badges */}
            {bundle && (
              <div className="mb-4 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center rounded-md bg-brand-purple-light text-brand-purple px-2.5 py-1 text-xs font-medium border border-brand-purple/20">
                  {bundle.subject}
                </span>
                <span className="inline-flex items-center rounded-md bg-brand-orange-light text-brand-orange-dark px-2.5 py-1 text-xs font-medium border border-brand-orange/20">
                  {bundle.ageRange}
                </span>
              </div>
            )}

            <p className="text-3xl font-bold text-brand-navy mb-6">
              {product.priceRange.minVariantPrice.currencyCode}{' '}
              {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>

            {product.description && (
              <div className="mb-6">
                <p className="text-text-secondary leading-relaxed text-sm">{product.description}</p>
              </div>
            )}

            {/* Simplified App Access Panel */}
            {bundle?.includesAppAccess && (
              <div className="mb-6 rounded-xl border border-brand-blue/30 bg-brand-blue-light p-5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-blue flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-brand-navy mb-1">
                      Includes Brain Battle Academy Access
                    </p>
                    <p className="text-xs text-text-secondary">
                      This kit unlocks the matching mission pack in our 11+ prep app
                      {bundle.missionPackSlug &&
                        `: "${bundle.missionPackSlug.replace(/-/g, ' ')}"`}
                      . Scan the QR code in the box to get started.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form action={addToCartAction} className="mb-6">
              <input type="hidden" name="merchandiseId" value={firstVariant.id} />
              <input type="hidden" name="quantity" value="1" />

              <button
                type="submit"
                className="w-full bg-brand-pink hover:bg-brand-pink-dark text-white font-semibold py-4 px-8 rounded-xl transition-all text-base shadow-soft hover:shadow-glow-pink hover:scale-105 transform"
              >
                Add to cart
              </button>
            </form>

            {/* Delivery & Returns Trust Block */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green-light flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-text-secondary">Free UK delivery over £30</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue-light flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-text-secondary">30-day easy returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-purple-light flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-text-secondary">Dispatched in 1–2 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange-light flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-xs text-text-secondary">Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Inside This Kit - Visual Icon Grid */}
        {bundle && bundle.whatsInside && bundle.whatsInside.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              What&apos;s inside this kit
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {bundle.whatsInside.map((item, index) => {
                // Assign different colors to each item
                const colorSchemes = [
                  { bg: 'bg-brand-purple-light', icon: 'text-brand-purple', border: 'border-brand-purple/20' },
                  { bg: 'bg-brand-green-light', icon: 'text-brand-green', border: 'border-brand-green/20' },
                  { bg: 'bg-brand-orange-light', icon: 'text-brand-orange', border: 'border-brand-orange/20' },
                  { bg: 'bg-brand-blue-light', icon: 'text-brand-blue', border: 'border-brand-blue/20' },
                ];
                const scheme = colorSchemes[index % colorSchemes.length];

                return (
                  <div
                    key={item}
                    className={`rounded-2xl ${scheme.bg} border ${scheme.border} p-4 sm:p-5 text-center`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-white/80 flex items-center justify-center shadow-soft`}>
                      <svg className={`w-6 h-6 ${scheme.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-text-primary leading-snug">{item}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* How It Works - Visual Flow Diagram */}
        {bundle?.includesAppAccess && (
          <section className="mt-12 sm:mt-16">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              How it works
            </h2>
            <div className="rounded-2xl bg-gradient-to-br from-brand-purple/5 via-brand-blue/5 to-brand-green/5 border border-gray-200 p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2">
                {/* Step 1: Kit */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-purple flex items-center justify-center mb-3 shadow-soft">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="font-bold text-brand-navy text-sm mb-1">1. Get your kit</p>
                  <p className="text-xs text-text-secondary">Physical tools delivered to your door</p>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center justify-center">
                  <svg className="w-8 h-8 text-brand-purple/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Step 2: Mission */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-green flex items-center justify-center mb-3 shadow-soft">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <p className="font-bold text-brand-navy text-sm mb-1">2. Unlock mission</p>
                  <p className="text-xs text-text-secondary">Scan QR code in the box</p>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center justify-center">
                  <svg className="w-8 h-8 text-brand-green/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Step 3: App */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue flex items-center justify-center mb-3 shadow-soft">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-bold text-brand-navy text-sm mb-1">3. Use the app</p>
                  <p className="text-xs text-text-secondary">Short guided sessions</p>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center justify-center">
                  <svg className="w-8 h-8 text-brand-blue/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Step 4: Progress */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-orange flex items-center justify-center mb-3 shadow-soft">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="font-bold text-brand-navy text-sm mb-1">4. Track progress</p>
                  <p className="text-xs text-text-secondary">Watch confidence grow</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Perfect For - Enhanced Badges Section */}
        {bundle && bundle.idealFor && bundle.idealFor.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">
              Perfect for
            </h2>
            <div className="flex flex-wrap gap-3">
              {bundle.idealFor.map((tag, index) => {
                const iconColors = [
                  { bg: 'bg-brand-purple-light', text: 'text-brand-purple', border: 'border-brand-purple/20' },
                  { bg: 'bg-brand-green-light', text: 'text-brand-green', border: 'border-brand-green/20' },
                  { bg: 'bg-brand-orange-light', text: 'text-brand-orange', border: 'border-brand-orange/20' },
                ];
                const scheme = iconColors[index % iconColors.length];

                return (
                  <div
                    key={tag}
                    className={`inline-flex items-center gap-2 rounded-full ${scheme.bg} ${scheme.text} px-4 py-2 text-sm font-medium border ${scheme.border}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {tag}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Mission Link Card */}
        {mission && missionColors && product.missionSlug && (
          <section className="mt-12 sm:mt-16">
            <div className={`rounded-2xl ${missionColors.bgLight} border ${missionColors.border} p-6 sm:p-8`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${missionColors.bg} flex items-center justify-center shadow-soft`}>
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-brand-navy mb-1">
                    {mission.label}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    {mission.tagline}
                  </p>
                  <Link
                    href={`/missions/${product.missionSlug}`}
                    className={`inline-flex items-center text-sm font-semibold ${missionColors.text} hover:underline`}
                  >
                    Learn more about this mission
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* You May Also Like Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cross-sell Product 1 */}
            <Link href="/#kits" className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
              <div className="aspect-square bg-brand-purple-light relative"></div>
              <div className="p-4">
                <span className="inline-flex items-center rounded-full bg-accent text-brand-navy px-2.5 py-1 text-xs font-semibold mb-2">
                  Individual
                </span>
                <h3 className="font-bold text-text-primary mb-2 text-sm">
                  Verbal Reasoning Workbook
                </h3>
                <p className="text-lg font-bold text-brand-navy">GBP 12.99</p>
              </div>
            </Link>

            {/* Cross-sell Product 2 */}
            <Link href="/#kits" className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
              <div className="aspect-square bg-brand-orange-light relative"></div>
              <div className="p-4">
                <span className="inline-flex items-center rounded-full bg-primary text-white px-2.5 py-1 text-xs font-semibold mb-2">
                  Bundle
                </span>
                <h3 className="font-bold text-text-primary mb-2 text-sm">
                  Maths Toolkit Bundle
                </h3>
                <p className="text-lg font-bold text-brand-navy">GBP 34.99</p>
              </div>
            </Link>

            {/* Cross-sell Product 3 */}
            <Link href="/#kits" className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
              <div className="aspect-square bg-brand-blue-light relative"></div>
              <div className="p-4">
                <span className="inline-flex items-center rounded-full bg-accent text-brand-navy px-2.5 py-1 text-xs font-semibold mb-2">
                  Individual
                </span>
                <h3 className="font-bold text-text-primary mb-2 text-sm">
                  Premium Study Supplies
                </h3>
                <p className="text-lg font-bold text-brand-navy">GBP 18.99</p>
              </div>
            </Link>

            {/* Cross-sell Product 4 */}
            <Link href="/#kits" className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
              <div className="aspect-square bg-brand-green-light relative"></div>
              <div className="p-4">
                <span className="inline-flex items-center rounded-full bg-primary text-white px-2.5 py-1 text-xs font-semibold mb-2">
                  Bundle
                </span>
                <h3 className="font-bold text-text-primary mb-2 text-sm">
                  Complete Starter Kit
                </h3>
                <p className="text-lg font-bold text-brand-navy">GBP 49.99</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

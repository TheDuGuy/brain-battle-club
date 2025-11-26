import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { getProductByHandle } from '@/lib/shopify';
import { getCartIdFromCookie, setCartIdCookie } from '@/lib/cart-cookie';
import { createCart, addLinesToCart, getCart } from '@/lib/cart';
import { getBundleInfo } from '@/lib/bundles';
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

            {/* What's Inside This Kit */}
            {bundle && bundle.whatsInside && bundle.whatsInside.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-lg font-bold text-text-primary mb-4">
                  What&apos;s inside this kit
                </h2>
                <ul className="space-y-2">
                  {bundle.whatsInside.map((item) => (
                    <li key={item} className="flex items-start">
                      <IconCheck className="w-4 h-4 text-mission mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ideal For Tags */}
            {bundle && bundle.idealFor && bundle.idealFor.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-text-primary mb-3">Perfect for</h3>
                <div className="flex flex-wrap gap-1.5">
                  {bundle.idealFor.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-brand-purple-light text-brand-purple px-2.5 py-1 text-xs font-medium border border-brand-purple/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

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

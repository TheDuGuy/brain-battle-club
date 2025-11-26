import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getCart, updateCartLines, removeCartLines } from '@/lib/cart';
import { getCartIdFromCookie, clearCartCookie } from '@/lib/cart-cookie';
import { BrandLogo } from '@/components/BrandLogo';
import { IconVerbal, IconCalculator, IconPencil, IconTarget } from '@/components/CategoryIcons';

async function updateQuantityAction(formData: FormData) {
  'use server';

  const lineId = formData.get('lineId') as string;
  const quantity = parseInt(formData.get('quantity') as string);

  if (quantity < 1) {
    return removeLineAction(formData);
  }

  const cartId = await getCartIdFromCookie();
  if (!cartId) {
    redirect('/cart');
    return;
  }

  try {
    await updateCartLines(cartId, [{ id: lineId, quantity }]);
  } catch (error) {
    console.error('Error updating cart line:', error);
  }

  redirect('/cart');
}

async function removeLineAction(formData: FormData) {
  'use server';

  const lineId = formData.get('lineId') as string;

  const cartId = await getCartIdFromCookie();
  if (!cartId) {
    redirect('/cart');
    return;
  }

  try {
    await removeCartLines(cartId, [lineId]);
  } catch (error) {
    console.error('Error removing cart line:', error);
  }

  redirect('/cart');
}

export default async function CartPage() {
  const cartId = await getCartIdFromCookie();

  if (!cartId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-6">
            <BrandLogo size="lg" className="mx-auto opacity-30" />
          </div>
          <h1 className="text-3xl font-bold text-brand-navy mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some study kits to get started!</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-brand-pink hover:bg-brand-pink-dark rounded-xl transition-all shadow-soft-lg hover:shadow-glow-pink hover:scale-105 transform"
          >
            Browse kits
          </Link>
        </div>
      </div>
    );
  }

  const cart = await getCart(cartId);

  if (!cart || cart.lines.length === 0) {
    if (!cart) {
      await clearCartCookie();
    }

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-6">
            <BrandLogo size="lg" className="mx-auto opacity-30" />
          </div>
          <h1 className="text-3xl font-bold text-brand-navy mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some study kits to get started!</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-brand-pink hover:bg-brand-pink-dark rounded-xl transition-all shadow-soft-lg hover:shadow-glow-pink hover:scale-105 transform"
          >
            Browse kits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-text-secondary">
        <Link href="/" className="hover:text-text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-text-primary">Shopping Cart</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Shopping Cart</h1>
        <Link href="/" className="text-sm font-medium text-text-secondary hover:text-text-primary">
          Continue shopping
        </Link>
      </div>

      {/* Cart Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-bold text-text-primary">Product</th>
                <th className="text-left py-4 px-6 text-sm font-bold text-text-primary hidden md:table-cell">Price</th>
                <th className="text-center py-4 px-6 text-sm font-bold text-text-primary">Quantity</th>
                <th className="text-right py-4 px-6 text-sm font-bold text-text-primary">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.lines.map((line) => (
                <tr key={line.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <Link href={`/products/${line.handle}`} className="flex-shrink-0">
                        <div className="w-20 h-20 relative bg-gray-50 rounded-lg overflow-hidden">
                          {line.image ? (
                            <Image
                              src={line.image.url}
                              alt={line.image.altText || line.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No image
                            </div>
                          )}
                        </div>
                      </Link>
                      <Link href={`/products/${line.handle}`} className="flex-1">
                        <h3 className="font-bold text-text-primary hover:text-primary transition-colors">
                          {line.title}
                        </h3>
                        <p className="text-sm text-text-secondary md:hidden mt-1">
                          {line.price.currencyCode} {parseFloat(line.price.amount).toFixed(2)}
                        </p>
                      </Link>
                    </div>
                  </td>
                  <td className="py-6 px-6 hidden md:table-cell">
                    <p className="text-brand-navy font-semibold">
                      {line.price.currencyCode} {parseFloat(line.price.amount).toFixed(2)}
                    </p>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center border-2 border-brand-purple/20 rounded-lg overflow-hidden bg-white">
                        <form action={updateQuantityAction} className="flex items-center">
                          <input type="hidden" name="lineId" value={line.id} />
                          <input type="hidden" name="quantity" value={Math.max(1, line.quantity - 1)} />
                          <button
                            type="submit"
                            className="px-3 py-2 hover:bg-brand-purple/10 text-brand-purple font-bold transition-colors"
                          >
                            −
                          </button>
                        </form>
                        <span className="px-4 py-2 text-brand-navy font-semibold min-w-[40px] text-center">
                          {line.quantity}
                        </span>
                        <form action={updateQuantityAction} className="flex items-center">
                          <input type="hidden" name="lineId" value={line.id} />
                          <input type="hidden" name="quantity" value={line.quantity + 1} />
                          <button
                            type="submit"
                            className="px-3 py-2 hover:bg-brand-purple/10 text-brand-purple font-bold transition-colors"
                          >
                            +
                          </button>
                        </form>
                      </div>
                      <form action={removeLineAction}>
                        <input type="hidden" name="lineId" value={line.id} />
                        <button
                          type="submit"
                          className="text-xs text-brand-pink hover:text-brand-pink-dark underline font-medium"
                        >
                          Remove
                        </button>
                      </form>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <p className="text-lg font-bold text-brand-navy">
                      {line.price.currencyCode} {(parseFloat(line.price.amount) * line.quantity).toFixed(2)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Summary in Table */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <div className="w-full md:w-96 space-y-3">
              <div className="flex justify-between text-text-secondary text-sm">
                <span>Subtotal</span>
                <span className="font-bold text-brand-navy text-base">
                  {cart.subtotal.currencyCode} {parseFloat(cart.subtotal.amount).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Tax included and shipping calculated at checkout
              </p>
              <a
                href={cart.checkoutUrl}
                className="block w-full bg-brand-pink hover:bg-brand-pink-dark text-white font-semibold py-4 px-6 rounded-xl text-center transition-all shadow-soft hover:shadow-glow-pink hover:scale-105 transform mt-4"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* You May Be Interested Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-text-primary mb-6">You May Be Interested</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cross-sell Product 1 */}
          <Link href="/#kits" className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
            <div className="aspect-square bg-brand-purple-light relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-purple">
                <IconVerbal className="w-12 h-12" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-text-primary mb-2 text-sm">
                Verbal Reasoning Kit
              </h3>
              <p className="text-lg font-bold text-brand-navy">GBP 14.99</p>
            </div>
          </Link>

          {/* Cross-sell Product 2 */}
          <Link href="/#kits" className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
            <div className="aspect-square bg-brand-orange-light relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-orange">
                <IconCalculator className="w-12 h-12" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-text-primary mb-2 text-sm">
                Maths Mastery Bundle
              </h3>
              <p className="text-lg font-bold text-brand-navy">GBP 14.99</p>
            </div>
          </Link>

          {/* Cross-sell Product 3 */}
          <Link href="/#kits" className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
            <div className="aspect-square bg-brand-blue-light relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-blue">
                <IconPencil className="w-12 h-12" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-text-primary mb-2 text-sm">
                Study Supplies Set
              </h3>
              <p className="text-lg font-bold text-brand-navy">GBP 14.99</p>
            </div>
          </Link>

          {/* Cross-sell Product 4 */}
          <Link href="/#kits" className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden">
            <div className="aspect-square bg-brand-green-light relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-green">
                <IconTarget className="w-12 h-12" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-text-primary mb-2 text-sm">
                Complete Starter Kit
              </h3>
              <p className="text-lg font-bold text-brand-navy">GBP 14.99</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

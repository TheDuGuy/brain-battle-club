import { cookies } from 'next/headers';

const CART_COOKIE_NAME = 'bbc_cart_id';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getCartIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(CART_COOKIE_NAME);
  return cartCookie?.value || null;
}

export async function setCartIdCookie(cartId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, cartId, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function clearCartCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE_NAME);
}

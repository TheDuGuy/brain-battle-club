import { shopifyFetch } from './shopify';

export type CartLine = {
  id: string;
  quantity: number;
  title: string;
  handle: string;
  image?: { url: string; altText: string | null };
  price: { amount: string; currencyCode: string };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  subtotal: { amount: string; currencyCode: string };
  lines: CartLine[];
};

interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      handle: string;
      title: string;
      featuredImage?: {
        url: string;
        altText: string | null;
      };
    };
    priceV2: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
}

function mapShopifyCartToCart(shopifyCart: ShopifyCart): Cart {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    subtotal: shopifyCart.cost.subtotalAmount,
    lines: shopifyCart.lines.edges.map((edge) => ({
      id: edge.node.id,
      quantity: edge.node.quantity,
      title: edge.node.merchandise.product.title,
      handle: edge.node.merchandise.product.handle,
      image: edge.node.merchandise.product.featuredImage,
      price: edge.node.merchandise.priceV2,
    })),
  };
}

export async function createCart(): Promise<Cart> {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          id
          checkoutUrl
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      handle
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({ query });
  return mapShopifyCartToCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    handle
                    title
                    featuredImage {
                      url
                      altText
                    }
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
      query,
      variables: { cartId },
    });

    if (!data.cart) {
      return null;
    }

    return mapShopifyCartToCart(data.cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

export async function addLinesToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      handle
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query,
    variables: {
      cartId,
      lines: lines.map((line) => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      })),
    },
  });

  return mapShopifyCartToCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      handle
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query,
    variables: { cartId, lines },
  });

  return mapShopifyCartToCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      handle
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query,
    variables: { cartId, lineIds },
  });

  return mapShopifyCartToCart(data.cartLinesRemove.cart);
}

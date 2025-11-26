const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;

if (!domain || !storefrontAccessToken) {
  throw new Error(
    'Missing required Shopify environment variables. Please check SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_API_TOKEN.'
  );
}

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Shopify API Error Details:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
      endpoint,
      tokenPrefix: storefrontAccessToken.substring(0, 10) + '...',
    });
    throw new Error(
      `Shopify API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage?: {
    url: string;
    altText?: string;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

interface CollectionProductsResponse {
  collection: {
    products: {
      edges: Array<{
        node: Product;
      }>;
    };
  };
}

interface ProductByHandleResponse {
  product: Product | null;
}

export async function getKits(): Promise<Product[]> {
  const query = `
    query GetKitsCollection {
      collection(handle: "kits") {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<CollectionProductsResponse>({ query });

  if (!data.collection) {
    return [];
  }

  return data.collection.products.edges.map((edge) => edge.node);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<ProductByHandleResponse>({
    query,
    variables: { handle },
  });

  return data.product;
}

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
  missionLabel?: string | null;
  missionSlug?: string | null;
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

interface RawProduct {
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
  variants?: {
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
  metafieldMissionLabel?: { value: string } | null;
  metafieldMissionSlug?: { value: string } | null;
}

function mapRawProduct(raw: RawProduct): Product {
  return {
    ...raw,
    variants: raw.variants ?? { edges: [] },
    missionLabel: raw.metafieldMissionLabel?.value ?? null,
    missionSlug: raw.metafieldMissionSlug?.value ?? null,
  };
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
              metafieldMissionLabel: metafield(namespace: "bbc", key: "mission_label") {
                value
              }
              metafieldMissionSlug: metafield(namespace: "bbc", key: "mission_slug") {
                value
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

  return data.collection.products.edges.map((edge) => mapRawProduct(edge.node as unknown as RawProduct));
}

// Collection type with metadata
export interface Collection {
  handle: string;
  title: string;
  description: string;
  products: Product[];
}

interface CollectionResponse {
  collection: {
    handle: string;
    title: string;
    description: string;
    products: {
      edges: Array<{
        node: RawProduct;
      }>;
    };
  } | null;
}

/**
 * Get a collection by its handle with all products
 */
export async function getCollectionByHandle(
  handle: string,
  options?: { first?: number }
): Promise<Collection | null> {
  const first = options?.first ?? 50;

  const query = `
    query GetCollectionByHandle($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        handle
        title
        description
        products(first: $first) {
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
              metafieldMissionLabel: metafield(namespace: "bbc", key: "mission_label") {
                value
              }
              metafieldMissionSlug: metafield(namespace: "bbc", key: "mission_slug") {
                value
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<CollectionResponse>({
    query,
    variables: { handle, first },
  });

  if (!data.collection) {
    return null;
  }

  return {
    handle: data.collection.handle,
    title: data.collection.title,
    description: data.collection.description,
    products: data.collection.products.edges.map((edge) => mapRawProduct(edge.node)),
  };
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
        metafieldMissionLabel: metafield(namespace: "bbc", key: "mission_label") {
          value
        }
        metafieldMissionSlug: metafield(namespace: "bbc", key: "mission_slug") {
          value
        }
      }
    }
  `;

  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query,
    variables: { handle },
  });

  return data.product ? mapRawProduct(data.product) : null;
}

/**
 * Search products using Shopify's search
 */
export async function searchProducts(
  searchQuery: string,
  options?: { first?: number }
): Promise<Product[]> {
  const first = options?.first ?? 20;

  // Return empty if no search query
  if (!searchQuery.trim()) {
    return [];
  }

  const query = `
    query SearchProducts($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
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
            metafieldMissionLabel: metafield(namespace: "bbc", key: "mission_label") {
              value
            }
            metafieldMissionSlug: metafield(namespace: "bbc", key: "mission_slug") {
              value
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: {
      edges: Array<{ node: RawProduct }>;
    };
  }>({
    query,
    variables: { query: searchQuery, first },
  });

  return data.products.edges.map((edge) => mapRawProduct(edge.node));
}

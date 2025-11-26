import { Metadata } from 'next';
import { getCollectionByHandle } from '@/lib/shopify';
import { CollectionPageLayout, COLLECTION_CONFIG } from '@/components/CollectionPage';

const config = COLLECTION_CONFIG.tools;

export const metadata: Metadata = {
  title: `${config.title} | Brain Battle Club`,
  description: config.description,
};

export default async function ToolsPage() {
  const collection = await getCollectionByHandle(config.shopifyHandle);

  return (
    <CollectionPageLayout
      collection={collection}
      config={config}
      currentPath="/tools"
    />
  );
}

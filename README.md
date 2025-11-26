# Brain Battle Club

A modern e-commerce storefront for educational toys and learning kits, built with Next.js 14 and Shopify Storefront API.

## Features

- 🛍️ Custom storefront with Shopify backend
- 📦 Product catalog from Shopify collections
- 🎨 Tailwind CSS styling
- ⚡ Server-side rendering with Next.js 14
- 🔒 Type-safe with TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Shopify store with Storefront API access
- Products organized in a "kits" collection

### Setup

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then fill in your Shopify credentials:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=your_storefront_api_token_here
```

### Getting Your Shopify Credentials

1. Go to your Shopify Admin
2. Navigate to **Settings > Apps and sales channels**
3. Click **Develop apps**
4. Create a new app or select an existing one
5. Configure **Storefront API scopes** (enable product read access)
6. Get your **Storefront API access token**

### Create a "kits" Collection

1. In Shopify Admin, go to **Products > Collections**
2. Create a new collection with handle: `kits`
3. Add your educational toy products to this collection

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
brain-battle-club/
├── app/
│   ├── page.tsx              # Homepage - lists all kits
│   └── products/
│       └── [handle]/
│           ├── page.tsx      # Product detail page
│           └── not-found.tsx # 404 page
├── lib/
│   └── shopify.ts           # Shopify API helper functions
└── .env.local.example       # Environment variables template
```

## API Functions

### `getKits()`

Fetches all products from the "kits" collection.

```typescript
const kits = await getKits();
```

### `getProductByHandle(handle)`

Fetches a single product by its URL handle.

```typescript
const product = await getProductByHandle('stem-learning-kit');
```

## Coming Soon

- 🛒 Shopping cart functionality
- 💳 Checkout flow
- 📦 Bundle builder (combine physical + digital products)
- 📝 Blog and educational content sections
- 🔗 Integration with 11+ learning app

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Shopify Storefront API
- **Deployment:** Vercel (recommended)

## Deployment

Deploy to Vercel with one click:

```bash
vercel
```

Make sure to add your environment variables in the Vercel dashboard.

## License

Private project for Brain Battle Club.

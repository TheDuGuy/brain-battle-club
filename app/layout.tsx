import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Brain Battle Club | Study Kits for 11+ Prep',
  description: 'Study kits that combine physical learning tools with digital app missions. Perfect for 11+ exam prep and building strong study habits.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white antialiased font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo / Brand */}
              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
                <BrandLogo size="sm" />
                <span className="text-xl sm:text-2xl font-bold text-text-primary">
                  Brain Battle Club
                </span>
              </Link>

              {/* Navigation */}
              <div className="flex items-center gap-4 sm:gap-6">
                <Link
                  href="/"
                  className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors border-b-2 border-transparent hover:border-brand-purple pb-1 hidden sm:block"
                >
                  Kits
                </Link>
                <Link
                  href="/#why-it-works"
                  className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors border-b-2 border-transparent hover:border-brand-purple pb-1 hidden sm:block"
                >
                  Why it works
                </Link>
                <Link
                  href="#"
                  className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors border-b-2 border-transparent hover:border-brand-purple pb-1 hidden md:block"
                >
                  App
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-brand-pink hover:bg-brand-pink-dark rounded-lg transition-all"
                >
                  Cart
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BrandLogo size="md" />
                  <p className="text-lg font-bold text-text-primary">Brain Battle Club</p>
                </div>
                <p className="text-sm text-text-secondary">
                  Part of the Brain Battle learning universe
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-3">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      Shipping & Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* App Link */}
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-3">Brain Battle Academy</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Our digital 11+ prep app
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-purple hover:text-brand-purple-dark transition-colors"
                >
                  Learn more →
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-text-light">
                © {new Date().getFullYear()} Brain Battle Club. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

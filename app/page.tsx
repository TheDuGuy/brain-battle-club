import Link from 'next/link';
import Image from 'next/image';
import { getKits } from '@/lib/shopify';
import { getBundleInfo } from '@/lib/bundles';
import {
  IconAll,
  IconBundles,
  IconMaths,
  IconVerbal,
  IconTools,
  IconBooks,
  IconFamily,
  IconLightning,
  IconLink,
  IconUser,
  IconStar,
  IconShirt,
  IconTeddy,
  IconChair,
  IconPalette,
  IconBottle,
} from '@/components/CategoryIcons';

export default async function Home() {
  const kits = await getKits();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-pink/5 via-brand-orange/5 to-brand-yellow/5 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Study kits that turn{' '}
            <span className="text-primary">
              11+ prep into missions
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Physical learning tools combined with digital app missions.
            Everything a parent needs to make exam prep engaging, structured, and stress-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#kits"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-all"
            >
              Browse kits
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl transition-all"
            >
              Learn about the app
            </a>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: 'All Products', icon: IconAll, color: 'bg-brand-purple/10 text-brand-purple' },
              { name: 'Bundles', icon: IconBundles, color: 'bg-brand-orange/10 text-brand-orange' },
              { name: 'Maths', icon: IconMaths, color: 'bg-brand-blue/10 text-brand-blue' },
              { name: 'Verbal Reasoning', icon: IconVerbal, color: 'bg-brand-pink/10 text-brand-pink' },
              { name: 'Study Tools', icon: IconTools, color: 'bg-brand-green/10 text-brand-green' },
              { name: 'Books', icon: IconBooks, color: 'bg-brand-yellow/10 text-brand-yellow-dark' },
            ].map((category) => {
              const IconComponent = category.icon;
              return (
                <a
                  key={category.name}
                  href="#kits"
                  className="group flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                >
                  <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center border border-gray-100`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                    {category.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured/Bestsellers Section */}
      <section className="py-16 bg-gradient-to-b from-white via-brand-purple/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Featured Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Feature Card 1 */}
            <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-brand-purple/10 to-brand-pink/10">
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-brand-pink text-white px-3 py-1.5 text-xs font-semibold">
                    BEST SELLER
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Complete 11+ Starter Bundle
                </h3>
                <p className="text-text-secondary mb-4 text-sm">Everything you need to begin 11+ prep with confidence</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-text-primary">GBP 49.99</p>
                  <a href="#kits" className="text-brand-purple font-semibold text-sm hover:underline">
                    View Details →
                  </a>
                </div>
              </div>
            </div>

            {/* Large Feature Card 2 */}
            <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-brand-orange/10 to-brand-yellow/10">
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-brand-orange text-white px-3 py-1.5 text-xs font-semibold">
                    NEW ARRIVAL
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Maths Mastery Kit
                </h3>
                <p className="text-text-secondary mb-4 text-sm">Master numerical reasoning with hands-on tools</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-text-primary">GBP 34.99</p>
                  <a href="#kits" className="text-brand-orange font-semibold text-sm hover:underline">
                    View Details →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs + Kits Grid Section */}
      <section id="kits" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {['All', 'Bundles', 'Individual Items', 'Maths', 'Verbal Reasoning', 'Books'].map((tab, index) => (
                <button
                  key={tab}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all text-sm ${
                    index === 0
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-secondary border border-gray-200 hover:border-gray-300 hover:text-text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {kits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg">
                No kits available yet. Add products to your &quot;kits&quot; collection in Shopify.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                  Our Study Kits
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Each kit combines carefully selected physical tools with digital missions in our Brain Battle Academy app.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {kits.map((kit, index) => {
                  const bundle = getBundleInfo(kit.handle);

                  // Brand tinted backgrounds
                  const bgColors = [
                    'bg-brand-purple/5',
                    'bg-brand-blue/5',
                    'bg-brand-orange/5',
                    'bg-brand-green/5',
                    'bg-brand-pink/5',
                    'bg-brand-yellow/5',
                  ];
                  const bgColor = bgColors[index % bgColors.length];

                  return (
                    <Link
                      key={kit.id}
                      href={`/products/${kit.handle}`}
                      className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
                    >
                      <div className={`aspect-square relative ${bgColor}`}>
                        {kit.featuredImage ? (
                          <Image
                            src={kit.featuredImage.url}
                            alt={kit.featuredImage.altText || kit.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-light">
                            No Image
                          </div>
                        )}

                        {/* Simplified Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {bundle ? (
                            <span className="inline-flex items-center rounded-full bg-primary text-white px-2.5 py-1 text-xs font-semibold">
                              Bundle
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-accent text-brand-navy px-2.5 py-1 text-xs font-semibold">
                              Individual
                            </span>
                          )}
                          {bundle?.includesAppAccess && (
                            <span className="inline-flex items-center rounded-full bg-mission text-brand-navy px-2.5 py-1 text-xs font-semibold">
                              + App
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-text-primary mb-2">
                          {kit.title}
                        </h3>

                        {/* Subject & Age Badges */}
                        {bundle && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            <span className="inline-flex items-center rounded-md bg-brand-purple/10 text-brand-purple px-2 py-0.5 text-xs font-medium border border-brand-purple/20">
                              {bundle.subject}
                            </span>
                            <span className="inline-flex items-center rounded-md bg-brand-orange/10 text-brand-orange-dark px-2 py-0.5 text-xs font-medium border border-brand-orange/20">
                              {bundle.ageRange}
                            </span>
                          </div>
                        )}

                        <p className="text-xl font-bold text-text-primary">
                          {kit.priceRange.minVariantPrice.currencyCode}{' '}
                          {parseFloat(kit.priceRange.minVariantPrice.amount).toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why It Works Section */}
      <section id="why-it-works" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Why it works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A complete system designed by parents, for parents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl bg-white border border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-purple/10 text-brand-purple mb-6">
                <IconFamily className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">
                Designed with parents in mind
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                No more guessing what to buy. Each kit has everything you need to create a focused study space and routine.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl bg-white border border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-orange/10 text-brand-orange mb-6">
                <IconLightning className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">
                Short daily missions
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                15-minute focused sessions, not endless worksheets. Physical tools keep hands busy while minds stay sharp.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl bg-white border border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue/10 text-brand-blue mb-6">
                <IconLink className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">
                Physical + digital together
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Kits unlock matching missions in our Brain Battle Academy app. Track progress, earn rewards, build confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              What Parents Are Saying
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Real feedback from families using Brain Battle Club
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                  <IconUser className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">Sarah M.</h4>
                  <p className="text-xs text-text-secondary">London parent</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconStar key={star} className="w-4 h-4 text-brand-orange" />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                &ldquo;My daughter actually looks forward to study time now! The missions make it feel like a game, and I love that everything is organized in one kit.&rdquo;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <IconUser className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">James T.</h4>
                  <p className="text-xs text-text-secondary">Manchester parent</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconStar key={star} className="w-4 h-4 text-brand-orange" />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                &ldquo;Finally, a system that works! The 15-minute sessions fit perfectly into our busy schedule. His confidence has grown so much.&rdquo;
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <IconUser className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">Priya K.</h4>
                  <p className="text-xs text-text-secondary">Birmingham parent</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconStar key={star} className="w-4 h-4 text-brand-orange" />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                &ldquo;The physical tools combined with the app are genius. My son stays engaged and I can track his progress without nagging. Worth every penny!&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Study Tips & Parent Guides Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Study Tips & Parent Guides
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Expert advice to help you support your child&apos;s 11+ journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tip Card 1 */}
            <a href="#" className="group bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-4">
                <IconShirt className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Styling Your Little Ones
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                A guide to the latest trends in kids&apos; clothing and how to make study time comfortable
              </p>
              <span className="text-brand-purple font-semibold text-sm group-hover:underline">Read More →</span>
            </a>

            {/* Tip Card 2 */}
            <a href="#" className="group bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4">
                <IconTeddy className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Snuggle Time Tips
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                Finding the softest and cuddliest toys to reward study milestones
              </p>
              <span className="text-brand-purple font-semibold text-sm group-hover:underline">Read More →</span>
            </a>

            {/* Tip Card 3 */}
            <a href="#" className="group bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
                <IconBooks className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Love for Reading
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                A guide to choosing the best books to boost verbal reasoning skills
              </p>
              <span className="text-brand-purple font-semibold text-sm group-hover:underline">Read More →</span>
            </a>

            {/* Tip Card 4 */}
            <a href="#" className="group bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink mb-4">
                <IconChair className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Furniture for Kids
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                A practical guide to choosing the best study space furniture
              </p>
              <span className="text-brand-purple font-semibold text-sm group-hover:underline">Read More →</span>
            </a>

            {/* Tip Card 5 */}
            <a href="#" className="group bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow-dark mb-4">
                <IconPalette className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Imaginative Play
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                A guide to selecting the best role play toys for creative breaks
              </p>
              <span className="text-brand-purple font-semibold text-sm group-hover:underline">Read More →</span>
            </a>

            {/* Tip Card 6 */}
            <a href="#" className="group bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-4">
                <IconBottle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Best Cups & Bottles
              </h3>
              <p className="text-text-secondary text-sm mb-3">
                A complete guide to keeping kids hydrated during study sessions
              </p>
              <span className="text-brand-purple font-semibold text-sm group-hover:underline">Read More →</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

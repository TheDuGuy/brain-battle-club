import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMission, getMissionColorClasses } from '@/lib/missions';
import { WaitlistForm } from './WaitlistForm';

function renderMarkdown(content: string) {
  // Simple markdown renderer for our use case
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 mb-4 text-text-secondary">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={key++} className="text-lg font-bold text-text-primary mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      currentList.push(line.slice(2));
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={key++} className="text-text-secondary mb-3">
          {line}
        </p>
      );
    }
  }
  flushList();

  return elements;
}

export default async function MissionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mission = getMission(slug);

  if (!mission) return notFound();

  const colors = getMissionColorClasses(mission.color);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/#kits"
            className="inline-flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Kits
          </Link>
        </div>

        {/* Mission Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center rounded-full ${colors.bg} text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide`}
          >
            Mission
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4">
          {mission.label}
        </h1>

        {/* Short Description */}
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          {mission.shortDescription}
        </p>

        {/* Mission Icon + Hero Card */}
        <div className={`rounded-xl ${colors.bgLight} border ${colors.border} p-6 sm:p-8 mb-8`}>
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-2">
                Part of Brain Battle Academy
              </h2>
              <p className="text-sm text-text-secondary">
                This mission combines physical tools from your kit with guided activities in our app.
                Complete missions together to build lasting skills and habits.
              </p>
            </div>
          </div>
        </div>

        {/* Long Description Content */}
        <div className="prose prose-sm max-w-none mb-12">
          {renderMarkdown(mission.longDescription)}
        </div>

        {/* Waitlist Section */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-text-primary mb-2">
              Get notified when this mission launches
            </h2>
            <p className="text-sm text-text-secondary">
              Join the waitlist to be first to access this mission in the Brain Battle Academy app.
            </p>
          </div>

          <WaitlistForm mission={slug} />

          <p className="text-xs text-text-light text-center mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>

        {/* Back to Kits CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#kits"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-all"
          >
            Browse study kits
          </Link>
        </div>
      </div>
    </div>
  );
}

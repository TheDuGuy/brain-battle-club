import Link from 'next/link';
import { Metadata } from 'next';
import { getAllMissions, getMissionColorClasses } from '@/lib/missions';

export const metadata: Metadata = {
  title: 'Brain Battle Missions | Study Kits for 11+ Prep',
  description:
    'Each kit unlocks a guided mission inside the Brain Battle Academy app. Short sessions, parent-friendly, combining app and physical tools for 11+ prep.',
};

export default function MissionsPage() {
  const missions = getAllMissions();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-purple/5 via-brand-orange/5 to-brand-green/5 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            Brain Battle Missions
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Each kit unlocks a guided mission inside the Brain Battle Academy app, so 11+ prep
            becomes clear, structured and repeatable.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-text-primary shadow-soft">
              <svg className="w-4 h-4 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Short sessions
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-text-primary shadow-soft">
              <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Parent-friendly
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-text-primary shadow-soft">
              <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              App + physical tools
            </span>
          </div>
        </div>
      </section>

      {/* Mission Cards Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission) => {
              const colors = getMissionColorClasses(mission.color);

              return (
                <div
                  key={mission.slug}
                  className={`group bg-white rounded-2xl border ${colors.border} hover:shadow-lg transition-all overflow-hidden`}
                >
                  {/* Card Header with gradient */}
                  <div className={`bg-gradient-to-br ${colors.gradient} p-6 border-b ${colors.border}`}>
                    <span
                      className={`inline-flex items-center rounded-full ${colors.bg} text-white px-3 py-1 text-xs font-semibold mb-3`}
                    >
                      {mission.label}
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {mission.tagline}
                    </p>
                    <div className="mt-3">
                      <span className={`inline-flex items-center rounded-md ${colors.bgLight} ${colors.text} px-2 py-0.5 text-xs font-medium`}>
                        {mission.ageRange}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-text-primary mb-3">
                      What they&apos;ll practise:
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {mission.whatTheyPractice.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-text-secondary">
                          <svg
                            className={`w-4 h-4 ${colors.text} mr-2 mt-0.5 flex-shrink-0`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/missions/${mission.slug}`}
                      className={`inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold ${colors.text} bg-white border ${colors.border} rounded-xl hover:${colors.bgLight} transition-all group-hover:shadow-soft`}
                    >
                      View mission
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Missions Connect to Kits */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              How missions connect to kits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-purple-light text-brand-purple font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Pick a kit</h3>
              <p className="text-sm text-text-secondary">
                Each kit in the shop has a mission badge showing which mission it unlocks.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-green-light text-brand-green font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Unlock the mission</h3>
              <p className="text-sm text-text-secondary">
                When you buy a kit, you get access to matching missions in the Brain Battle Academy app.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange-light text-brand-orange font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Track progress</h3>
              <p className="text-sm text-text-secondary">
                Complete missions together, build habits, and watch your child grow in confidence.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/#kits"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-brand-pink hover:bg-brand-pink-dark rounded-xl transition-all shadow-soft hover:shadow-glow-pink"
            >
              Browse kits
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export type MissionColor = 'purple' | 'green' | 'orange';

export interface Mission {
  slug: string;
  label: string;
  shortLabel: string;
  tagline: string;
  color: MissionColor;
  ageRange: string;
  idealFor: string[];
  description: string;
  whatTheyPractice: string[];
  whatParentsGet: string[];
}

export const MISSIONS: Mission[] = [
  {
    slug: 'focus-calm',
    label: 'Focus & Calm Mission',
    shortLabel: 'Focus & Calm',
    tagline: 'Build focus, self-regulation and calm exam habits.',
    color: 'purple',
    ageRange: 'Ages 8–12',
    idealFor: [
      'Kids who fidget or find it hard to sit still',
      'Anxious test-takers who need calmer routines',
    ],
    description:
      'Short, hands-on missions that teach children how to channel their energy, calm their nervous system, and build a "ready to learn" routine before homework or 11+ practice.',
    whatTheyPractice: [
      'Simple breathing and grounding before study',
      'Tactile fidget activities that support focus not distraction',
      'Mini "calm down" checklists they can follow on their own',
      'Linking calm routines with starting a study session',
    ],
    whatParentsGet: [
      'A repeatable pre-study routine you can rely on',
      'Language and prompts to coach your child without nagging',
      'Less resistance at homework / revision time',
    ],
  },
  {
    slug: 'study-hub',
    label: 'Study Hub Mission',
    shortLabel: 'Study Hub',
    tagline: 'Turn the kitchen table into a mission control study hub.',
    color: 'green',
    ageRange: 'Ages 9–13',
    idealFor: [
      'Families who want a smoother homework routine',
      'Kids who lose track of what to do next',
    ],
    description:
      'This mission turns a simple desk or kitchen table into a "study hub" where everything has a place and each session feels achievable, not overwhelming.',
    whatTheyPractice: [
      'Setting up a neat workspace in under 3 minutes',
      'Breaking tasks into 15-minute missions',
      'Tracking progress with simple checklists',
      'Ending each session with a quick tidy-up routine',
    ],
    whatParentsGet: [
      'A clear structure for after-school study time',
      'Less clutter, fewer "Where\'s my…?" battles',
      'Confidence that small daily efforts are adding up',
    ],
  },
  {
    slug: 'maths-mission',
    label: '11+ Maths Mission',
    shortLabel: '11+ Maths',
    tagline: 'Grow confident with the key 11+ maths skills step by step.',
    color: 'orange',
    ageRange: 'Ages 9–11',
    idealFor: [
      'Children preparing for 11+ exams',
      'Parents who want structure beyond workbooks',
    ],
    description:
      'Bite-sized maths missions that match the 11+ syllabus. Hands-on tools and app missions help children practise number, problem solving and reasoning without endless worksheets.',
    whatTheyPractice: [
      'Core number facts and mental arithmetic',
      'Word problems and multi-step reasoning',
      'Working accurately under gentle time pressure',
      'Reflecting on mistakes and trying again',
    ],
    whatParentsGet: [
      'A clear map of the maths topics covered',
      'Short sessions you can actually fit into busy evenings',
      'Progress you can see in both the kit and the app',
    ],
  },
];

// Lookup helpers
export function getMissionBySlug(slug: string): Mission | undefined {
  return MISSIONS.find((m) => m.slug === slug);
}

export function getAllMissions(): Mission[] {
  return MISSIONS;
}

// Legacy alias for backwards compatibility
export function getMission(slug: string): Mission | null {
  return getMissionBySlug(slug) ?? null;
}

// Color class helpers
export function getMissionColorClasses(color: MissionColor): {
  bg: string;
  bgLight: string;
  text: string;
  border: string;
  gradient: string;
} {
  switch (color) {
    case 'purple':
      return {
        bg: 'bg-brand-purple',
        bgLight: 'bg-brand-purple-light',
        text: 'text-brand-purple',
        border: 'border-brand-purple/20',
        gradient: 'from-brand-purple/10 to-brand-purple/5',
      };
    case 'green':
      return {
        bg: 'bg-brand-green',
        bgLight: 'bg-brand-green-light',
        text: 'text-brand-green',
        border: 'border-brand-green/20',
        gradient: 'from-brand-green/10 to-brand-green/5',
      };
    case 'orange':
      return {
        bg: 'bg-brand-orange',
        bgLight: 'bg-brand-orange-light',
        text: 'text-brand-orange',
        border: 'border-brand-orange/20',
        gradient: 'from-brand-orange/10 to-brand-orange/5',
      };
  }
}

// Get color from slug (for cases where we only have the slug)
export function getMissionColorFromSlug(slug: string): MissionColor {
  const mission = getMissionBySlug(slug);
  return mission?.color ?? 'purple';
}

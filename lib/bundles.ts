export type BundleInfo = {
  handle: string;
  displayName: string;
  subject: string;
  ageRange: string;
  includesAppAccess: boolean;
  missionPackSlug?: string; // Brain Battle Academy mission pack key
  whatsInside: string[];    // List of items
  idealFor: string[];       // Use cases
};

export const BUNDLES: Record<string, BundleInfo> = {
  'focus-fidget-kit': {
    handle: 'focus-fidget-kit',
    displayName: 'Focus & Fidget Kit',
    subject: 'Focus & Self-Regulation',
    ageRange: 'Ages 8–12',
    includesAppAccess: false,
    whatsInside: [
      'Set of 3 quiet fidget toys',
      'Textured sensory ball',
      'Desk-friendly fidget cube',
      'Calming colour palette to reduce visual noise',
    ],
    idealFor: ['Homework time', 'Neurodivergent learners', 'Long study sessions'],
  },
  'homework-hub-starter-kit': {
    handle: 'homework-hub-starter-kit',
    displayName: 'Homework Hub Starter Kit',
    subject: 'Study Skills',
    ageRange: 'Ages 9–13',
    includesAppAccess: true,
    missionPackSlug: 'study-skills-starter',
    whatsInside: [
      'Desk organiser tray',
      'Revision notebook',
      'Sticky notes & page markers',
      'Highlighters & colour pens set',
    ],
    idealFor: ['Daily homework', 'Creating a study zone', 'Building routines'],
  },
  '11-plus-maths-mission-kit': {
    handle: '11-plus-maths-mission-kit',
    displayName: '11+ Maths Mission Kit',
    subject: '11+ Maths',
    ageRange: 'Ages 10–11',
    includesAppAccess: true,
    missionPackSlug: '11-plus-maths',
    whatsInside: [
      'Whiteboard & dry-wipe marker',
      'Fraction & decimal flash cards',
      'Mini number line bookmark',
      'Reward sticker sheet',
    ],
    idealFor: ['11+ exam prep', 'Short daily practice', 'Parents who want structure'],
  },
  'verbal-reasoning-pro-kit': {
    handle: 'verbal-reasoning-pro-kit',
    displayName: 'Verbal Reasoning Pro Kit',
    subject: '11+ Verbal Reasoning',
    ageRange: 'Ages 10–11',
    includesAppAccess: true,
    missionPackSlug: '11-plus-verbal',
    whatsInside: [
      'Word puzzle booklet',
      'Vocabulary flash cards (100 cards)',
      'Synonym & antonym wheel',
      'Progress tracking chart',
    ],
    idealFor: ['11+ exam prep', 'Vocabulary building', 'Pattern recognition'],
  },
  'exam-confidence-bundle': {
    handle: 'exam-confidence-bundle',
    displayName: 'Exam Confidence Bundle',
    subject: 'Test Prep & Mindset',
    ageRange: 'Ages 10–12',
    includesAppAccess: true,
    missionPackSlug: 'exam-confidence',
    whatsInside: [
      'Breathing & calm techniques cards',
      'Exam day checklist poster',
      'Motivational stickers',
      'Mini stress ball',
      'Water bottle reminder band',
    ],
    idealFor: ['Test anxiety', 'Building confidence', 'Pre-exam preparation'],
  },
};

/**
 * Get bundle information for a product handle
 * Returns null if no bundle config exists
 */
export function getBundleInfo(handle: string): BundleInfo | null {
  return BUNDLES[handle] || null;
}

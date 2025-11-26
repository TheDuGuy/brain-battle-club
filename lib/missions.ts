export type MissionColor = 'purple' | 'green' | 'orange';

export interface Mission {
  label: string;
  shortDescription: string;
  longDescription: string;
  color: MissionColor;
  icon?: string;
}

export const missions: Record<string, Mission> = {
  'focus-calm': {
    label: 'Focus & Calm Mission',
    color: 'purple',
    shortDescription:
      'Helps children settle, regulate, and get into the right headspace before studying.',
    longDescription: `
### What this mission helps with
- Improves emotional self-regulation
- Reduces overwhelm before homework or revision
- Helps children transition from play to focus time smoothly

### How it works
Children complete calming micro-missions in the Brain Battle app while using tools from the kit.
These small 2-5 minute steps help them reset attention before longer tasks.

### Ideal for
- Ages 8-12
- Kids who struggle with starting tasks
- Busy after-school schedules
`,
  },

  'study-hub': {
    label: 'Study Hub Mission',
    color: 'green',
    shortDescription:
      'Builds strong study routines, organisation skills, and independent work habits.',
    longDescription: `
### What this mission helps with
- Builds consistent homework routines
- Strengthens organisation & self-monitoring
- Teaches planning & checking strategies

### How it works
Kids follow structured missions that guide them through preparing, completing,
and reviewing homework sessions using the Study Hub kit tools.

### Ideal for
- Ages 9-13
- Children preparing for secondary school
- Families wanting to reduce homework battles
`,
  },

  'maths-mission': {
    label: '11+ Maths Mission',
    color: 'orange',
    shortDescription:
      'Daily 11+ style practice combined with app missions that teach strategy, not just answers.',
    longDescription: `
### What this mission helps with
- 11+ arithmetic and reasoning
- Mistake-finding & strategy-building
- Speed, accuracy, and exam confidence

### How it works
The kit provides physical resources while the app runs bite-size missions
that adapt to your child's performance, keeping them motivated and progressing.

### Ideal for
- Ages 9-11
- Children preparing for 11+ exams
- Parents wanting structured practice without tutors
`,
  },
};

export function getMission(slug: string): Mission | null {
  return missions[slug] ?? null;
}

export function getMissionColorClasses(color: MissionColor): {
  bg: string;
  bgLight: string;
  text: string;
  border: string;
} {
  switch (color) {
    case 'purple':
      return {
        bg: 'bg-brand-purple',
        bgLight: 'bg-brand-purple-light',
        text: 'text-brand-purple',
        border: 'border-brand-purple/20',
      };
    case 'green':
      return {
        bg: 'bg-brand-green',
        bgLight: 'bg-brand-green-light',
        text: 'text-brand-green',
        border: 'border-brand-green/20',
      };
    case 'orange':
      return {
        bg: 'bg-brand-orange',
        bgLight: 'bg-brand-orange-light',
        text: 'text-brand-orange',
        border: 'border-brand-orange/20',
      };
  }
}

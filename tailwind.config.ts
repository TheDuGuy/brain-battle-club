import type { Config } from 'tailwindcss';

/**
 * Brain Battle Club Design System
 *
 * Brand Direction: Playful, vibrant, energetic — Inspired by the rainbow brain logo
 * Fun for kids, trustworthy for parents
 * Colorful learning journey with stars, organic shapes, and spectrum colors
 *
 * Color Philosophy inspired by the Brain Logo:
 * - Purple/Blue (Stars): Creativity, learning, wisdom
 * - Pink/Red: Energy, passion, excitement
 * - Orange/Yellow: Optimism, warmth, intelligence
 * - Green/Cyan: Growth, progress, achievement
 * - Dark text for maximum readability
 */

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from the infinity starburst logo
        brand: {
          pink: {
            DEFAULT: '#E84A8A',
            light: '#FDE7F1',
            dark: '#D23670',
          },
          orange: {
            DEFAULT: '#F59F2F',
            light: '#FEF3E0',
            dark: '#E88A1A',
          },
          yellow: {
            DEFAULT: '#F8D34A',
            light: '#FEF9E7',
            dark: '#F0C030',
          },
          green: {
            DEFAULT: '#7AC66C',
            light: '#EDF9EB',
            dark: '#5FB24F',
          },
          blue: {
            DEFAULT: '#70C8F0',
            light: '#E8F7FC',
            dark: '#4BB8E8',
          },
          purple: {
            DEFAULT: '#A55FEF',
            light: '#F3EBFD',
            dark: '#8F42E6',
          },
          navy: {
            DEFAULT: '#233B99',
            light: '#475569',
            dark: '#1A2A6E',
          },
        },
        // Aliases for backward compatibility
        primary: {
          DEFAULT: '#A55FEF', // brand purple
          light: '#F3EBFD',
          dark: '#8F42E6',
        },
        secondary: {
          DEFAULT: '#E84A8A', // brand pink
          light: '#FDE7F1',
          dark: '#D23670',
        },
        accent: {
          DEFAULT: '#F59F2F', // brand orange
          light: '#FEF3E0',
          dark: '#E88A1A',
        },
        mission: {
          DEFAULT: '#7AC66C', // brand green
          light: '#EDF9EB',
          dark: '#5FB24F',
        },
        // Dark, readable text
        text: {
          primary: '#233B99', // brand navy for brand consistency
          secondary: '#475569',
          light: '#64748B',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'soft-xl': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

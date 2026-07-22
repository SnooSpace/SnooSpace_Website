/**
 * SnooSpace Typography Design Tokens
 * Family: Manrope (Display, Body, Buttons, Metadata)
 */

export const typography = {
  fontFamily: {
    sans: 'var(--font-manrope), "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
    serif: 'var(--font-editorial-serif), "Instrument Serif", Georgia, serif',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  sizes: {
    display: {
      fontSize: 'clamp(3rem, 7vw, 5.5rem)',
      lineHeight: '1.05',
      letterSpacing: '-0.035em',
      fontWeight: 800,
    },
    hero: {
      fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
      lineHeight: '1.1',
      letterSpacing: '-0.03em',
      fontWeight: 700,
    },
    h1: {
      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
      lineHeight: '1.15',
      letterSpacing: '-0.025em',
      fontWeight: 700,
    },
    h2: {
      fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      lineHeight: '1.3',
      letterSpacing: '-0.015em',
      fontWeight: 600,
    },
    bodyLarge: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.65',
      letterSpacing: '-0.01em',
      fontWeight: 500,
    },
    bodyRegular: {
      fontSize: '1rem', // 16px
      lineHeight: '1.6',
      letterSpacing: '0',
      fontWeight: 500,
    },
    button: {
      fontSize: '1rem',
      lineHeight: '1',
      letterSpacing: '-0.01em',
      fontWeight: 600,
    },
    metadata: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.4',
      letterSpacing: '0.01em',
      fontWeight: 600,
    },
    badge: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1',
      letterSpacing: '0.04em',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
  },
} as const;

export type Typography = typeof typography;

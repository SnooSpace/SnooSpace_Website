/**
 * SnooSpace Spacing & Layout Tokens
 * 8px Grid System & Container Constraints
 */

export const spacing = {
  scale: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
  },
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    max: '1440px',
  },
  section: {
    py: 'clamp(4rem, 8vw, 8rem)',
    pyCompact: 'clamp(3rem, 5vw, 5rem)',
    px: 'clamp(1.25rem, 5vw, 3rem)',
  },
} as const;

export type Spacing = typeof spacing;

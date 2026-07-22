/**
 * SnooSpace Border Radius Tokens
 * Soft, Premium Editorial Corners
 */

export const radius = {
  none: '0px',
  sm: '8px',     // Badges, small inputs
  md: '12px',    // Standard buttons, small cards
  lg: '16px',    // Standard cards, dropdowns
  xl: '24px',    // Hero cards, modals
  '2xl': '32px',  // Large container banners
  full: '9999px', // Pill buttons, avatar rings
} as const;

export type Radius = typeof radius;

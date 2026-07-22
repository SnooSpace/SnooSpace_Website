/**
 * SnooSpace Elevation & Shadow Tokens
 * Soft, Multi-Layered Editorial Depth
 */

export const elevation = {
  none: 'none',
  subtle: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
  card: '0 8px 24px -6px rgba(15, 23, 42, 0.06), 0 2px 6px -2px rgba(15, 23, 42, 0.03)',
  cardHover: '0 16px 36px -8px rgba(53, 101, 242, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
  float: '0 20px 48px -12px rgba(15, 23, 42, 0.12), 0 8px 20px -4px rgba(53, 101, 242, 0.08)',
  glow: '0 0 32px 0 rgba(53, 101, 242, 0.22)',
  glowCyan: '0 0 40px 0 rgba(206, 242, 242, 0.6)',
} as const;

export type Elevation = typeof elevation;

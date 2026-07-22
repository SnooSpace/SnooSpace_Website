/**
 * SnooSpace Color Design Tokens
 * Bright Editorial Palette
 */

export const colors = {
  brand: {
    primary: '#3565F2', // Signature SnooSpace Blue
    bright: '#3D79F2',  // Vibrant Accent Blue
    soft: '#6BB3F2',    // Medium Soft Blue
    cyan: '#CEF2F2',    // Ice Cyan Tint
    deep: '#1E3A8A',    // Deep Royal Navy Accent
  },
  surface: {
    white: '#FFFFFF',
    offWhite: '#FAFCFF',
    lightBlue: '#F2F7FE',
    card: '#FFFFFF',
    cardHover: '#F7FAFE',
    border: '#E2E8F0',
    borderHover: '#CBD5E1',
    glow: 'rgba(53, 101, 242, 0.12)',
  },
  text: {
    primary: '#0F172A',
    secondary: '#334155',
    muted: '#64748B',
    accent: '#3565F2',
    inverse: '#FFFFFF',
  },
  gradient: {
    heroGlow: 'radial-gradient(circle at 50% 30%, rgba(206, 242, 242, 0.5) 0%, rgba(242, 247, 254, 0.2) 60%, rgba(255, 255, 255, 0) 100%)',
    editorialBlue: 'linear-gradient(135deg, #3565F2 0%, #3D79F2 50%, #6BB3F2 100%)',
    softSurface: 'linear-gradient(180deg, #FFFFFF 0%, #F2F7FE 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(242, 247, 254, 0.7) 100%)',
  }
} as const;

export type Colors = typeof colors;

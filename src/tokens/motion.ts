/**
 * SnooSpace Motion Tokens
 * Restraint, Editorial Precision, and Spring Physics Curves
 */

export const motion = {
  duration: {
    instant: '0.1s',
    fast: '0.2s',
    medium: '0.4s',
    slow: '0.7s',
    cinematic: '1.2s',
  },
  easing: {
    // Custom cubic-bezier spring and editorial curves
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
    smoothOut: 'cubic-bezier(0.25, 1, 0.5, 1)',
    softBounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    linear: 'linear',
  },
  gsapEase: {
    editorial: 'power3.out',
    cinematic: 'power4.out',
    reveal: 'expo.out',
    smooth: 'sine.out',
  },
  stagger: {
    fast: 0.06,
    medium: 0.12,
    slow: 0.2,
  },
} as const;

export type Motion = typeof motion;

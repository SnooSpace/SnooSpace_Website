/**
 * SnooSpace Design System Master Tokens Export
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { motion } from './motion';
import { radius } from './radius';
import { elevation } from './elevation';

export const tokens = {
  colors,
  typography,
  spacing,
  motion,
  radius,
  elevation,
} as const;

export type Tokens = typeof tokens;

export { colors, typography, spacing, motion, radius, elevation };

export const colors = {
  // Backgrounds
  bgPrimary: '#F5F4F1',
  bgSurface: '#FFFFFF',
  bgElevated: '#FAFAF8',
  bgMuted: '#EDECEA',

  // Text
  textPrimary: '#1A1918',
  textSecondary: '#6D6C6A',
  textTertiary: '#9C9B99',

  // Borders
  borderSubtle: '#E5E4E1',
  borderStrong: '#D1D0CD',

  // Accents
  accentPrimary: '#3D8A5A',
  accentLight: '#C8F0D8',
  accentWarm: '#D89575',
  accentWarmLight: '#F5E6DC',
  accentBlue: '#5B8FB9',
  accentBlueLight: '#EBF4FF',
  accentPurple: '#8B7BB5',
  accentPurpleLight: '#F3F0FF',
  accentOrange: '#D4A64A',
  accentOrangeLight: '#FFF8E6',
  accentRed: '#D08068',
  accentRedLight: '#FFEFEB',
  accentTeal: '#5BA39B',
  accentTealLight: '#E6F5F3',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 100,
};

export const typography = {
  fontFamily: 'System',
  sizes: {
    caption: 11,
    small: 12,
    footnote: 13,
    body: 15,
    headline: 18,
    title: 22,
    largeTitle: 32,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

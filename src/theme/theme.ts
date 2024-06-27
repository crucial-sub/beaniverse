interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_36: number;
  space_40: number;
  space_60: number;
  space_100: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
  space_40: 40,
  space_60: 60,
  space_100: 100,
};

interface Color {
  primaryRedHex: string;
  primaryOrangeHex: string;
  primaryBlackHex: string;
  primaryDarkGreyHex: string;
  secondaryDarkGreyHex: string;
  primaryGreyHex: string;
  secondaryGreyHex: string;
  primarySilverGreyHex: string;
  secondarySilverGreyHex: string;
  primaryLightGreyHex: string;
  secondaryLightGreyHex: string;
  primaryWhiteHex: string;
  secondaryWhiteHex: string;
  primaryBlackRGBA: string;
  secondaryBlackRGBA: string;
  tertiaryBlackRGBA: string;
  quaternaryBlackRGBA: string;
}

export const COLORS: Color = {
  primaryRedHex: '#DC3535',
  primaryOrangeHex: '#D17842',
  primaryBlackHex: '#0C0F14',
  primaryDarkGreyHex: '#141921',
  secondaryDarkGreyHex: '#21262E',
  primaryGreyHex: '#252A32',
  secondaryGreyHex: '#252A32',
  primarySilverGreyHex: '#FFFFFF2E',
  secondarySilverGreyHex: '#333333',
  primaryLightGreyHex: '#52555A',
  secondaryLightGreyHex: '#AEAEAE',
  primaryWhiteHex: '#FFFFFF',
  secondaryWhiteHex: '#D9D9D9',
  primaryBlackRGBA: 'rgba(12,15,20,0.5)',
  secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
  tertiaryBlackRGBA: 'rgba(0,0,0,0.5)',
  quaternaryBlackRGBA: 'rgba(12, 15, 20, 0.1)',
};

interface FontFamily {
  poppins_black: string; //900
  poppins_bold: string; //700
  poppins_extrabold: string; //800
  poppins_extralight: string; //200
  poppins_light: string; //300
  poppins_medium: string; //500
  poppins_regular: string; //400
  poppins_semibold: string; //600
  poppins_thin: string; //100
}

export const FONTFAMILY: FontFamily = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};

interface FontSize {
  size_8: number;
  size_9: number;
  size_10: number;
  size_12: number;
  size_13: number;
  size_14: number;
  size_15: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_28: number;
  size_30: number;
}

export const FONTSIZE: FontSize = {
  size_8: 8,
  size_9: 9,
  size_10: 10,
  size_12: 12,
  size_13: 13,
  size_14: 14,
  size_15: 15,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_28: 28,
  size_30: 30,
};

interface BorderRadius {
  radius_4: number;
  radius_7: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_16: number;
  radius_20: number;
  radius_23: number;
  radius_25: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_7: 7,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_16: 16,
  radius_20: 20,
  radius_23: 23,
  radius_25: 25,
};

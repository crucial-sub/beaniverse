import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import HeartIcon from '../../assets/svg_images/heart.svg';
import {COLORS, SPACING} from '../../theme/theme';
import GradientBGIcon from '../GradientBGIcon';

const HeartButton = () => {
  return (
    <TouchableOpacity>
      <GradientBGIcon size={SPACING.space_30}>
        <HeartIcon fill={COLORS.secondaryWhiteHex} width={17} height={17} />
      </GradientBGIcon>
    </TouchableOpacity>
  );
};

export default HeartButton;

const styles = StyleSheet.create({});

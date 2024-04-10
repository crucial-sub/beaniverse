import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MenuIcon from '../../assets/svg_images/menu.svg';
import {COLORS, SPACING} from '../../theme/theme';
import GradientBGIcon from '../GradientBGIcon';

const MenuButton = () => {
  return (
    <TouchableOpacity>
      <GradientBGIcon size={SPACING.space_30}>
        <MenuIcon fill={COLORS.primarySilverGreyHex} />
      </GradientBGIcon>
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({});

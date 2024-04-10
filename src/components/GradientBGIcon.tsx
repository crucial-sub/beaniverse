import React, {ReactElement} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING} from '../theme/theme';

interface GradientBGIconProps {
  children: ReactElement;
  size: number;
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({children, size}) => {
  const iconSize: ViewStyle = {width: size, height: size};

  return (
    <View style={styles.Container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={[styles.LinearGradientBG, iconSize]}>
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 1,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
  },
  LinearGradientBG: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: 30,
    // height: 30,
  },
});

export default GradientBGIcon;

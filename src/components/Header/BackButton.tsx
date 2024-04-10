import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LeftIcon from '../../assets/svg_images/left.svg';
import {COLORS, SPACING} from '../../theme/theme';
import GradientBGIcon from '../GradientBGIcon';

const BackButton = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleGoBack}>
      <GradientBGIcon size={SPACING.space_30}>
        <LeftIcon fill={COLORS.primarySilverGreyHex} />
      </GradientBGIcon>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});

import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageAssets} from '../../assets/app_images/ImageAssets';
import {SPACING} from '../../theme/theme';

const ProfileImage = () => {
  return (
    <FastImage source={ImageAssets.profileImage} style={styles.profileImage} />
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  profileImage: {
    width: SPACING.space_30,
    height: SPACING.space_30,
  },
});

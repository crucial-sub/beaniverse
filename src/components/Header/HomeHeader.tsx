import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {userState} from '../../recoil';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';

const HomeHeader = () => {
  const user = useRecoilValue(userState);

  return (
    <View style={styles.HeaderWrapper}>
      <Image source={{uri: user?.profileImage}} style={styles.ProfileImage} />
      <Text style={styles.HeaderText}>{`Welcome ${user?.user_name}`}</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  HeaderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.space_15,
    gap: SPACING.space_15,
  },
  ProfileImage: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  HeaderText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
  },
});

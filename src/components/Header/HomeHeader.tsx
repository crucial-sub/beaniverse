import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useRecoilValue} from 'recoil';
import {userState} from '../../recoil';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';

const HomeHeader = () => {
  const user = useRecoilValue(userState);
  return (
    <View style={styles.headerWrapper}>
      <FastImage
        source={{uri: user?.profileImage}}
        style={styles.profileImage}
      />
      <Text style={styles.headerText}>{`Welcome ${user?.user_name}`}</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.space_15,
    gap: SPACING.space_15,
  },
  profileImage: {
    width: 35,
    height: 35,
  },
  headerText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
  },
});

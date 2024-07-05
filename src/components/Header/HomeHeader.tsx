import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {removeStorageData} from '../../lib/storage-helper';
import {isLoginState, userState} from '../../recoil';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';

const HomeHeader = () => {
  const user = useRecoilValue(userState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const signOut = async () => {
    await removeStorageData('accessToken');
    setIsLogin(false);
  };

  return (
    <View style={styles.HeaderWrapper}>
      <FastImage
        source={{uri: user?.profileImage}}
        style={styles.ProfileImage}
      />
      <Text style={styles.HeaderText}>{`Welcome ${user?.user_name}`}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={{color: COLORS.primaryWhiteHex}}>LogOut</Text>
      </TouchableOpacity>
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

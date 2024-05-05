import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useRecoilState} from 'recoil';
import CoffeeList from '../components/CoffeeList/CoffeeList';
import {userState} from '../recoil';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const HomeScreen = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <FastImage
            source={{uri: user?.profileImage}}
            style={styles.profileImage}
          />
          <Text style={styles.headerText}>{`Welcome ${user?.user_name}`}</Text>
        </View>
        <CoffeeList />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: SPACING.space_30,
    gap: SPACING.space_30,
  },
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

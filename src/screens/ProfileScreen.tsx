import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useRecoilValue} from 'recoil';
import InfoIcon from '../assets/svg_images/info-circle.svg';
import OrderIcon from '../assets/svg_images/order.svg';
import RightIcon from '../assets/svg_images/right.svg';
import UserIcon from '../assets/svg_images/user.svg';
import {userState} from '../recoil';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

const ProfileScreen = () => {
  const user = useRecoilValue(userState);
  const navigation = useNavigation();
  const handleNavigate = (screenName: never) => {
    navigation.navigate(screenName);
  };
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.Container}>
        <Text style={styles.Title}>My Profile</Text>
        <View style={styles.UserInfoWrapper}>
          <FastImage
            source={{uri: user?.profileImage}}
            style={styles.ProfileImage}
          />
          <Text style={styles.UserName}>{user?.user_name}</Text>
        </View>
        <View style={styles.MyProfileMenuWrapper}>
          <TouchableOpacity
            style={styles.MenuItemWrapper}
            onPress={() => handleNavigate('EditProfile' as never)}>
            <View style={styles.MenuItemLeft}>
              <UserIcon />
              <Text style={styles.MenuItemText}>Profile</Text>
            </View>
            <RightIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.MenuItemWrapper}
            onPress={() => handleNavigate('OrderHistory' as never)}>
            <View style={styles.MenuItemLeft}>
              <OrderIcon />
              <Text style={styles.MenuItemText}>Order History</Text>
            </View>
            <RightIcon />
          </TouchableOpacity>
          <View style={styles.MenuItemWrapper}>
            <View style={styles.MenuItemLeft}>
              <InfoIcon />
              <Text style={styles.MenuItemText}>App Version 1.1.0</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  Container: {
    alignItems: 'center',
    gap: 50,
  },
  Title: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  UserInfoWrapper: {
    alignItems: 'center',
    gap: 20,
  },
  ProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  UserName: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  MyProfileMenuWrapper: {
    width: 308,
  },
  MenuItemWrapper: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  MenuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  MenuItemText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

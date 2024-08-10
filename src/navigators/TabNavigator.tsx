import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import BagIcon from '../assets/svg_images/bag-2.svg';
import HeartIcon from '../assets/svg_images/heart.svg';
import HomeIcon from '../assets/svg_images/home.svg';
import ProfileIcon from '../assets/svg_images/profile.svg';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {COLORS} from '../theme/theme';

const getIconColor = (focused: boolean) => {
  return focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex;
};

export type BottomTabParamList = {
  Home: undefined;
  Cart: undefined;
  Favorite: undefined;
  Profile: undefined;
};

export type BottomTabStackNavigationProp =
  BottomTabNavigationProp<BottomTabParamList>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.TabBarStyle,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => <HomeIcon fill={getIconColor(focused)} />,
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => <BagIcon fill={getIconColor(focused)} />,
        }}
      />
      <BottomTab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused}) => <HeartIcon fill={getIconColor(focused)} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <ProfileIcon fill={getIconColor(focused)} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default memo(TabNavigator);

const styles = StyleSheet.create({
  TabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
});

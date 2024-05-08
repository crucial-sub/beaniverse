import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CoffeeCategories from '../components/CoffeeList/CoffeeCategories';
import CoffeeList from '../components/CoffeeList/CoffeeList';
import HomeHeader from '../components/Header/HomeHeader';
import {COLORS, SPACING} from '../theme/theme';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <HomeHeader />
        <CoffeeCategories />
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
});

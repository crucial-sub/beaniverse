import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import HeaderBar from '../components/Header/HeaderBar';
import BeansData from '../data/BeansData';
import CoffeeData from '../data/CoffeeData';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const HomeScreen = () => {
  const coffeeList = CoffeeData;
  const beanList = BeansData;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <HeaderBar leftIcon="menu" />
        <Text style={styles.titleText}>Find the best coffee for you</Text>
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
    gap: 30,
  },
  titleText: {
    width: 195,
    lineHeight: 36,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
  },
});

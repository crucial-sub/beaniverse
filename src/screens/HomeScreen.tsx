import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import CoffeeBeans from '../components/CoffeeBeans/CoffeeBeans';
import CoffeeCategories from '../components/CoffeeList/CoffeeCategories';
import CoffeeList from '../components/CoffeeList/CoffeeList';
import SearchInput from '../components/CoffeeList/SearchInput';
import HomeHeader from '../components/Header/HomeHeader';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView
        style={styles.ScrollView}
        contentContainerStyle={{paddingBottom: 25}}>
        <View style={styles.SectionContainer}>
          <HomeHeader />
          <SearchInput />
        </View>

        <CoffeeCategories />

        <View style={styles.SectionContainer}>
          <CoffeeList />

          <View style={styles.CoffeeBeansWrapper}>
            <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
            <CoffeeBeans />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  Container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: SPACING.space_30,
  },
  ScrollView: {
    marginBottom: 50,
  },
  SectionContainer: {
    paddingHorizontal: 30,
    gap: 20,
  },
  CoffeeWrapper: {
    gap: SPACING.space_30,
    marginBottom: 24,
  },
  CoffeeBeansWrapper: {},
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    marginBottom: 15,
  },
});

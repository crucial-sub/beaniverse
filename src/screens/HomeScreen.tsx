import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CoffeeList from '../components/CoffeeList/CoffeeList';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Find the best coffee for you</Text>
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
    gap: 30,
  },
  titleText: {
    width: 195,
    lineHeight: 36,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    marginTop: SPACING.space_40,
  },
});

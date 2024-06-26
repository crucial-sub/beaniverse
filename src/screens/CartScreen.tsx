import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import PaymentCartBottom from '../components/PaymentCart/PaymentCartBottom';
import PaymentCartList from '../components/PaymentCart/PaymentCartList';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.Container}>
        <Text style={styles.Title}>Cart</Text>
        <PaymentCartList />
        <PaymentCartBottom />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    paddingBottom: 50,
  },
  Title: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    height: 36,
    lineHeight: 36,
  },
});

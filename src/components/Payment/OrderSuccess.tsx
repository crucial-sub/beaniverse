import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SuccessIcon from '../../assets/svg_images/check.svg';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

const OrderSuccess = () => {
  return (
    <View style={styles.Wrapper}>
      <SuccessIcon width={87.5} height={87.5} />
      <View style={styles.TextWrapper}>
        <Text style={styles.Text}>Thank you!</Text>
        <Text style={styles.Text}>your order is confirmed</Text>
      </View>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  TextWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
  },
  Text: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    lineHeight: 20,
  },
});

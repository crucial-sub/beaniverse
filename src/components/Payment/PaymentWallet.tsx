import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaymentWalletType } from '../../api/apiPayment';
import { COLORS } from '../../theme/theme';

type PaymentWalletPropsType = {
  wallet: PaymentWalletType;
};

const PaymentWallet = ({wallet}: PaymentWalletPropsType) => {
  return (
    <View>
      <Text style={styles.text}>{wallet.created_at}</Text>
    </View>
  );
};

export default PaymentWallet;

const styles = StyleSheet.create({
  text: {
    color: COLORS.primaryWhiteHex,
  },
});

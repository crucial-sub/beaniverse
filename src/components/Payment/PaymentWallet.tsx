import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRecoilState} from 'recoil';
import {PaymentWalletType} from '../../api/apiPayment';
import WalletIcon from '../../assets/svg_images/wallet.svg';
import {paymentMethodState} from '../../recoil';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

type PaymentWalletPropsType = {
  wallet: PaymentWalletType;
};

const PaymentWallet = ({wallet}: PaymentWalletPropsType) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useRecoilState(paymentMethodState);
  const selectMethod = () => {
    setSelectedPaymentMethod('WALLET');
  };

  return (
    <TouchableOpacity onPress={selectMethod}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={[
          styles.LinearGradientBG,
          selectedPaymentMethod === 'WALLET' && styles.Selected,
        ]}>
        <View style={styles.PaymentWalletLeft}>
          <WalletIcon />
          <Text style={styles.PaymentWalletText}>Wallet</Text>
        </View>
        <Text style={styles.PaymentWalletBalance}>{`$ ${wallet.balance.toFixed(
          2,
        )}`}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PaymentWallet;

const styles = StyleSheet.create({
  LinearGradientBG: {
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.secondaryDarkGreyHex,
    width: 350,
    height: 50,
    padding: 15,
    borderWidth: 2,
    borderColor: COLORS.tertiaryGreyHex,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Selected: {
    borderColor: COLORS.primaryOrangeHex,
  },
  PaymentWalletLeft: {
    flexDirection: 'row',
    gap: 14,
  },
  PaymentWalletText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
  },
  PaymentWalletBalance: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
});

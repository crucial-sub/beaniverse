import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {selectedPaymentMethodState, totalPriceState} from '../../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';

type PaymentBottomPropsType = {
  walletBalance: number;
};

const PaymentBottom = ({walletBalance}: PaymentBottomPropsType) => {
  const selectedPaymentMethod = useRecoilValue(selectedPaymentMethodState);
  const totalPrice = useRecoilValue(totalPriceState).toFixed(2);
  const payableState = !(
    selectedPaymentMethod?.methodType === 'WALLET' &&
    Number(totalPrice) > walletBalance
  );

  const handlePress = () => {};

  return (
    <View style={styles.BottomWrapper}>
      <View style={styles.PriceWrapper}>
        <Text style={styles.PriceTitle}>Total Price</Text>
        <View style={styles.PriceTextWrapper}>
          <Text style={styles.DollarSign}>$ </Text>
          <Text style={styles.PriceText}>{totalPrice}</Text>
        </View>
      </View>
      {payableState ? (
        <TouchableOpacity style={styles.PayButton} onPress={handlePress}>
          <Text style={styles.PayButtonText}>{`Pay from ${
            selectedPaymentMethod?.methodType === 'CREDIT_CARD'
              ? 'Credit Card'
              : 'Wallet'
          }`}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.InActiveButton}>
          <Text style={styles.PayButtonText}>Insufficient Balance</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PaymentBottom;

const styles = StyleSheet.create({
  BottomWrapper: {
    position: 'absolute',
    width: '100%',
    height: SPACING.space_60,
    bottom: 0,
    paddingHorizontal: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  PriceWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  PriceTextWrapper: {
    flexDirection: 'row',
  },
  DollarSign: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  PayButton: {
    width: 240,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InActiveButton: {
    width: 240,
    backgroundColor: COLORS.secondarySilverGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PayButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});

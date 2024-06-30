import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PaymentCardType} from '../../api/apiPayment';
import IcChipIcon from '../../assets/svg_images/ic-chip.svg';
import MastercardIcon from '../../assets/svg_images/mastercard-mark.svg';
import VisaIcon from '../../assets/svg_images/visa-mark.svg';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

type PaymentCardItemPropsType = {
  item: PaymentCardType;
};

const PaymentCardItem = ({item}: PaymentCardItemPropsType) => {
  const formatCardNumber = item.card_number
    .toString()
    .replace(/(\d{4})(?=\d)/g, '$1 ');
  const [year, month, _] = item.expiry_date.split('-');
  const formatExpiryDate = `${month}/${year.slice(2)}`;

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.LinearGradientBG}>
      <View style={styles.CardTopWrapper}>
        <IcChipIcon />
        {item.card_type === 'VISA' && <VisaIcon />}
        {item.card_type === 'MASTERCARD' && <MastercardIcon />}
      </View>
      <Text style={styles.CardNumber}>{formatCardNumber}</Text>
      <View style={styles.CardBottomWrapper}>
        <View style={styles.CardBottomLeft}>
          <Text style={styles.CardBottomLeftTitle}>Card Holder Name</Text>
          <Text style={styles.CardHolderName}>{item.holder_name}</Text>
        </View>
        <View style={styles.CardBottomRight}>
          <Text style={styles.CardBottomRightTitle}>Expiry Date</Text>
          <Text style={styles.CardExpiryDate}>{formatExpiryDate}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default PaymentCardItem;

const styles = StyleSheet.create({
  LinearGradientBG: {
    borderRadius: BORDERRADIUS.radius_15,
    backgroundColor: COLORS.secondaryDarkGreyHex,
    width: 320,
    height: 186,
    padding: 12,
  },
  CardTopWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 35,
  },
  CardNumber: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    letterSpacing: 8,
    paddingBottom: 42,
  },
  CardBottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  CardBottomLeft: {},
  CardBottomLeftTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    opacity: 0.5,
    lineHeight: 20,
  },
  CardHolderName: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    lineHeight: 20,
  },
  CardBottomRight: {},
  CardBottomRightTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    opacity: 0.5,
    lineHeight: 20,
  },
  CardExpiryDate: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    lineHeight: 20,
  },
});

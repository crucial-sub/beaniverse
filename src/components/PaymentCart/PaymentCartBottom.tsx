import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {MainStackNavigationProp} from '../../navigators/MainStackNavigator';
import {totalPriceState} from '../../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';

const PaymentCartBottom = () => {
  const totalPrice = useRecoilValue(totalPriceState).toFixed(2);
  const navigation = useNavigation<MainStackNavigationProp>();

  const handlePress = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.BottomWrapper}>
      <View style={styles.PriceWrapper}>
        <Text style={styles.PriceTitle}>Total Price</Text>
        <View style={styles.PriceTextWrapper}>
          <Text style={styles.DollarSign}>$ </Text>
          <Text style={styles.PriceText}>{totalPrice}</Text>
        </View>
      </View>
      {Number(totalPrice) > 0 ? (
        <TouchableOpacity style={styles.PayButton} onPress={handlePress}>
          <Text style={styles.PayButtonText}>Pay</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.InActiveButton} disabled>
          <Text style={styles.PayButtonText}>Nothing to Pay</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PaymentCartBottom;

const styles = StyleSheet.create({
  BottomWrapper: {
    width: '100%',
    height: SPACING.space_60,
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
  PayButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  InActiveButton: {
    width: 240,
    backgroundColor: COLORS.secondarySilverGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

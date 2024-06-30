import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValueLoadable} from 'recoil';
import {RootNavigationProp} from '../../navigators/navigation';
import {totalPriceState} from '../../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';

const PaymentCartBottom = () => {
  const totalPriceLoadable = useRecoilValueLoadable(totalPriceState);
  const navigation = useNavigation<RootNavigationProp>();

  let totalPriceDisplay;
  switch (totalPriceLoadable.state) {
    case 'hasValue':
      totalPriceDisplay = totalPriceLoadable.contents.toFixed(2);
      break;
    case 'loading':
      totalPriceDisplay = 'Loading...';
      break;
    case 'hasError':
      totalPriceDisplay = 'Error';
      break;
  }

  const handlePress = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.BottomWrapper}>
      <View style={styles.PriceWrapper}>
        <Text style={styles.PriceTitle}>Total Price</Text>
        <View style={styles.PriceTextWrapper}>
          <Text style={styles.DollarSign}>$ </Text>
          <Text style={styles.PriceText}>{totalPriceDisplay}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.AddButton} onPress={handlePress}>
        <Text style={styles.AddButtonText}>Pay</Text>
      </TouchableOpacity>
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
  AddButton: {
    width: 240,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});

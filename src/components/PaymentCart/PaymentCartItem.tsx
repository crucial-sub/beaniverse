import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {DETAIL_SAMPLE} from '../../data';
import {CoffeeAndBeansDetailType} from '../../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';

interface PaymentCartItemProps {
  coffeeId: number;
}

const PaymentCartItem = ({coffeeId}: PaymentCartItemProps) => {
  const {data, isLoading} = useQuery<CoffeeAndBeansDetailType, Error>({
    queryKey: ['get-coffee-details', coffeeId],
    // queryFn: () => getCoffeeDetails(coffeeId),
    queryFn: () => DETAIL_SAMPLE[coffeeId - 1],
    staleTime: 5 * 60 * 1000,
  });

  return data ? (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.LinearGradientBG}>
      <View style={styles.CoffeeInfoWrapper}>
        <ImageBackground
          source={{uri: data.imageUrl}}
          style={styles.CoffeeImageBG}
        />
        <View style={styles.CoffeeDetailWrapper}>
          <View>
            <Text style={styles.CoffeeName}>{data.name}</Text>
            <Text style={styles.CoffeeMilk}>With Steamed Milk</Text>
          </View>
          <View style={styles.CoffeeRoastTypeBox}>
            <Text style={styles.CoffeeRoastTypeText}>
              {data.roastType.name}
            </Text>
          </View>
        </View>
      </View>
      <View></View>
    </LinearGradient>
  ) : null;
};

export default PaymentCartItem;

const styles = StyleSheet.create({
  LinearGradientBG: {
    borderWidth: 1,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_23,
    backgroundColor: COLORS.secondaryDarkGreyHex,
    width: 330,
    height: 255,
    padding: 12,
    gap: SPACING.space_10,
  },
  CoffeeInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  CoffeeImageBG: {
    width: 100,
    height: 100,
    borderRadius: BORDERRADIUS.radius_16,
    overflow: 'hidden',
  },
  CoffeeDetailWrapper: {
    height: 92,
    justifyContent: 'space-between',
  },
  Title: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
  },

  CoffeeName: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  CoffeeMilk: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.secondaryLightGreyHex,
  },

  CoffeeRoastTypeBox: {
    width: 118,
    height: 40,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CoffeeRoastTypeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.secondaryLightGreyHex,
  },
});

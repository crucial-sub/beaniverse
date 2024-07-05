import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CoffeeAndBeansDetailType, getCoffeeDetails} from '../../api/apiCoffee';
import {SectionDataType} from '../../screens/OrderHistoryScreen';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

type OrderItemPropsType = {
  item: SectionDataType;
};

const OrderItem = ({item}: OrderItemPropsType) => {
  const {data: coffeeDetail, isLoading} = useQuery<
    CoffeeAndBeansDetailType,
    Error
  >({
    queryKey: ['get-coffee-details', item.itemId],
    queryFn: () => getCoffeeDetails(Number(item.itemId)),
    staleTime: 5 * 60 * 1000,
  });

  const getOptionPrice = (optionName: string) => {
    if (!coffeeDetail) return 0;
    const opt = coffeeDetail.options.find(opt => opt.option === optionName);
    return opt ? opt.price : 0;
  };

  const totalItemPrice = item.options
    .reduce((total, option) => {
      return total + getOptionPrice(option.option) * option.quantity;
    }, 0)
    .toFixed(2);

  if (isLoading)
    return (
      <ActivityIndicator
        size={'large'}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.primaryBlackHex,
        }}
      />
    );

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.LinearGradientBG}>
      <View style={styles.OrderItemHeader}>
        <ImageBackground
          source={{uri: item.imageUrl}}
          style={styles.OrderItemImageBG}
        />
        <Text style={styles.OrderItemName}>{item.name}</Text>
        <View style={styles.PriceWrapper}>
          <Text style={styles.DollarSign}>$ </Text>
          <Text style={styles.OrderItemTotalPrice}>{totalItemPrice}</Text>
        </View>
      </View>
      {item.options.map((option, index) => (
        <View key={index} style={styles.OptionContainer}>
          <View style={styles.OptionInfoWrapper}>
            <View style={styles.OptionNameWrapper}>
              <Text
                style={
                  coffeeDetail?.type === 'COFFEE'
                    ? styles.CoffeeOptionName
                    : styles.BeanOptionName
                }>
                {coffeeDetail?.type === 'COFFEE'
                  ? option.option.toUpperCase()
                  : option.option === '1000'
                  ? '1kg'
                  : `${option.option}gm`}
              </Text>
            </View>
            <View style={styles.Separator} />
            <View style={styles.OptionPriceWrapper}>
              <Text style={styles.OptionPriceDollarSign}>$ </Text>
              <Text style={styles.OptionPriceText}>
                {getOptionPrice(option.option).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.QuantityWrapper}>
            <Text style={styles.OptionQuantityMultiplySign}>X </Text>
            <Text style={styles.OptionQuantityText}>{option.quantity}</Text>
          </View>
          <Text style={styles.OptionOrderPrice}>
            {(getOptionPrice(option.option) * option.quantity).toFixed(2)}
          </Text>
        </View>
      ))}
    </LinearGradient>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  LinearGradientBG: {
    borderRadius: BORDERRADIUS.radius_23,
    backgroundColor: COLORS.secondaryDarkGreyHex,
    width: 330,
    paddingHorizontal: 18,
    paddingTop: 13,
    paddingBottom: 18,
    alignSelf: 'center',
  },
  OrderItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  OrderItemImageBG: {
    width: 60,
    height: 60,
    borderRadius: BORDERRADIUS.radius_16,
    overflow: 'hidden',
  },
  OrderItemName: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  PriceWrapper: {
    flexDirection: 'row',
  },
  DollarSign: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  OrderItemTotalPrice: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  OptionContainer: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  OptionInfoWrapper: {
    flexDirection: 'row',
    width: 141,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: 5,
  },
  OptionNameWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  CoffeeOptionName: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BeanOptionName: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  Separator: {
    height: 35,
    borderWidth: 1,
    borderColor: COLORS.secondaryDarkGreyHex,
  },
  OptionPriceWrapper: {
    flexDirection: 'row',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  OptionPriceDollarSign: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  OptionPriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },

  QuantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  OptionQuantityMultiplySign: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  OptionQuantityText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  OptionOrderPrice: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

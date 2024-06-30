import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRecoilState} from 'recoil';
import {CoffeeAndBeansDetailType, getCoffeeDetails} from '../../api/apiCoffee';
import MinusIcon from '../../assets/svg_images/minus.svg';
import PlusIcon from '../../assets/svg_images/plus.svg';
import {PaymentCartType, paymentCartListState} from '../../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import {GroupedPaymentCartType} from './PaymentCartList';

interface PaymentCartItemProps {
  item: GroupedPaymentCartType;
}

const PaymentCartItem = ({item}: PaymentCartItemProps) => {
  const [paymentCartList, setPaymentCartList] =
    useRecoilState<PaymentCartType[]>(paymentCartListState);
  const {data: coffeeDetail} = useQuery<CoffeeAndBeansDetailType, Error>({
    queryKey: ['get-coffee-details', item.coffeeId],
    queryFn: () => getCoffeeDetails(item.coffeeId),
    staleTime: 5 * 60 * 1000,
  });

  const handlePlusButton = (optionId: number) => {
    const newPaymentCartList = paymentCartList.map(cartItem =>
      cartItem.coffeeId === coffeeDetail?.id && cartItem.optionId === optionId
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem,
    );
    setPaymentCartList(newPaymentCartList);
  };
  const handleMinusButton = (optionId: number) => {
    const newPaymentCartList = paymentCartList.map(cartItem =>
      cartItem.coffeeId === coffeeDetail?.id && cartItem.optionId === optionId
        ? {...cartItem, quantity: Math.max(cartItem.quantity - 1, 0)}
        : cartItem,
    );
    setPaymentCartList(newPaymentCartList);
  };

  return coffeeDetail ? (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.LinearGradientBG}>
      <View style={styles.CoffeeInfoWrapper}>
        <ImageBackground
          source={{uri: coffeeDetail.imageUrl}}
          style={styles.CoffeeImageBG}
        />
        <View style={styles.CoffeeDetailWrapper}>
          <View>
            <Text style={styles.CoffeeName}>{coffeeDetail.name}</Text>
            <Text style={styles.CoffeeMilk}>With Steamed Milk</Text>
          </View>
          <View style={styles.CoffeeRoastTypeBox}>
            <Text style={styles.CoffeeRoastTypeText}>
              {coffeeDetail.roastType.name}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.CoffeeOptionsWrapper}>
        {coffeeDetail.options.map(opt => {
          const quantity =
            item.items.find(e => e.optionId === opt.id)?.quantity || 0;

          return (
            <View
              key={`item-option-${coffeeDetail.id}-${opt.id}`}
              style={styles.OptionWrapper}>
              <View style={styles.CoffeeSizeBox}>
                <Text
                  style={
                    coffeeDetail.type === 'COFFEE'
                      ? styles.CoffeeSizeText
                      : styles.CoffeeBeanSizeText
                  }>
                  {coffeeDetail.type === 'COFFEE'
                    ? opt.option.toUpperCase()
                    : `${opt.option}gm`}
                </Text>
              </View>
              <View style={styles.CoffeePriceWrapper}>
                <Text style={styles.DollarSign}>$</Text>
                <Text style={styles.CoffeePrice}>{opt.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.PlusMinusButton}
                onPress={() => handleMinusButton(opt.id)}>
                <MinusIcon />
              </TouchableOpacity>
              <View style={styles.QuantityBox}>
                <Text style={styles.QuantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.PlusMinusButton}
                onPress={() => handlePlusButton(opt.id)}>
                <PlusIcon />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </LinearGradient>
  ) : null;
};

export default React.memo(PaymentCartItem);

const styles = StyleSheet.create({
  LinearGradientBG: {
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
  CoffeeOptionsWrapper: {
    gap: 10,
  },
  OptionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CoffeeSizeBox: {
    width: 72,
    height: 35,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CoffeeSizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  CoffeeBeanSizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.secondaryLightGreyHex,
  },
  CoffeePriceWrapper: {
    flexDirection: 'row',
  },
  DollarSign: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  CoffeePrice: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  PlusMinusButton: {
    width: 28.44,
    height: 28.44,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  QuantityBox: {
    width: 50,
    height: 30,
    borderRadius: BORDERRADIUS.radius_7,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  QuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});

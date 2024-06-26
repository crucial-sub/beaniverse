import React from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRecoilState} from 'recoil';
import {
  PaymentCartType,
  beansState,
  coffeeListState,
  paymentCartListState,
} from '../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface GroupedPaymentCartType {
  coffeeId: number;
  items: PaymentCartType[];
}

const CartScreen = () => {
  const [paymentCartList, setPaymentCartList] =
    useRecoilState<PaymentCartType[]>(paymentCartListState);
  const [coffeeList, setCoffeeList] = useRecoilState(coffeeListState);
  const [coffeeBeans, setCoffeeBeans] = useRecoilState(beansState);
  const [] = React.useState();

  const groupByCoffeeId = paymentCartList.reduce((acc, item) => {
    if (!acc[item.coffeeId]) {
      acc[item.coffeeId] = [];
    }
    acc[item.coffeeId].push(item);
    return acc;
  }, {} as Record<number, PaymentCartType[]>);

  const groupedPaymentCartList: GroupedPaymentCartType[] = Object.keys(
    groupByCoffeeId,
  ).map(coffeeId => ({
    coffeeId: Number(coffeeId),
    items: groupByCoffeeId[Number(coffeeId)],
  }));

  const renderItem = ({item}: {item: GroupedPaymentCartType}) => {
    if (!coffeeList || !coffeeBeans) return null;
    const coffeeData =
      coffeeList.find(coffee => coffee.id === item.coffeeId) ||
      coffeeBeans.find(bean => bean.id === item.coffeeId);
    if (!coffeeData) return null;
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.LinearGradientBG}>
        <View style={styles.CoffeeInfoWrapper}>
          <ImageBackground
            source={{uri: coffeeData.imageUrl}}
            style={styles.CoffeeImageBG}
          />
          <View style={styles.CoffeeDetailWrapper}>
            <View>
              <Text style={styles.CoffeeName}>{coffeeData.name}</Text>
              <Text style={styles.CoffeeMilk}>With Steamed Milk</Text>
            </View>
            <View style={styles.CoffeeRoastTypeBox}>
              <Text style={styles.CoffeeRoastTypeText}>
                {coffeeData.roastType.name}
              </Text>
            </View>
          </View>
        </View>
        <View></View>
      </LinearGradient>
    );
  };
  const keyExtractor = (item: GroupedPaymentCartType) =>
    `cart-flat-list-item-${item.coffeeId}`;

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.Container}>
        <Text style={styles.Title}>Cart</Text>
        <FlatList
          data={groupedPaymentCartList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{gap: 30}}
        />
        <View style={styles.BottomWrapper}>
          <View style={styles.PriceWrapper}>
            <Text style={styles.PriceTitle}>Price</Text>
            <View style={styles.PriceTextWrapper}>
              <Text style={styles.DollarSign}>$ </Text>
              <Text style={styles.PriceText}>10.40</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.AddButton} onPress={() => {}}>
            <Text style={styles.AddButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  Container: {
    alignItems: 'center',
    paddingBottom: 50,
  },
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

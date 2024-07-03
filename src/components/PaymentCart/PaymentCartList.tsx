import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {PaymentCartStateType, paymentCartListState} from '../../recoil';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';
import PaymentCartItem from './PaymentCartItem';

export interface GroupedPaymentCartType {
  coffeeId: number;
  items: PaymentCartStateType[];
}

const PaymentCartList = () => {
  const [paymentCartList, setPaymentCartList] =
    useRecoilState<PaymentCartStateType[]>(paymentCartListState);

  const [renderData, setRenderData] = React.useState<GroupedPaymentCartType[]>(
    [],
  );

  React.useEffect(() => {
    const groupByCoffeeId = paymentCartList.reduce((acc, item) => {
      if (!acc[item.coffeeId]) {
        acc[item.coffeeId] = [];
      }
      acc[item.coffeeId].push(item);
      return acc;
    }, {} as Record<number, PaymentCartStateType[]>);

    const groupedPaymentCartList: GroupedPaymentCartType[] = Object.keys(
      groupByCoffeeId,
    ).map(coffeeId => ({
      coffeeId: Number(coffeeId),
      items: groupByCoffeeId[Number(coffeeId)],
    }));

    setRenderData(groupedPaymentCartList);
  }, [paymentCartList]);

  const renderItem = React.useCallback(
    ({item}: {item: GroupedPaymentCartType}) => {
      return <PaymentCartItem item={item} />;
    },
    [],
  );
  const keyExtractor = (item: GroupedPaymentCartType) =>
    `cart-flat-list-item-${item.coffeeId}`;

  if (!paymentCartList.length)
    return (
      <View style={style.EmptyList}>
        <Text style={style.EmptyText}>Your cart is empty!</Text>
      </View>
    );

  return (
    <FlatList
      data={renderData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{gap: 30}}
    />
  );
};

export default PaymentCartList;

const style = StyleSheet.create({
  EmptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  EmptyText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
  },
});

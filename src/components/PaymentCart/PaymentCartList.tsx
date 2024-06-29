import React from 'react';
import {FlatList} from 'react-native';
import {useRecoilState} from 'recoil';
import {
  PaymentCartType,
  beansState,
  coffeeListState,
  paymentCartListState,
} from '../../recoil';
import PaymentCartItem from './PaymentCartItem';

export interface GroupedPaymentCartType {
  coffeeId: number;
  items: PaymentCartType[];
}

const PaymentCartList = () => {
  const [paymentCartList, setPaymentCartList] =
    useRecoilState<PaymentCartType[]>(paymentCartListState);
  const [coffeeList, setCoffeeList] = useRecoilState(coffeeListState);
  const [coffeeBeans, setCoffeeBeans] = useRecoilState(beansState);

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

  const renderItem = React.useCallback(
    ({item}: {item: GroupedPaymentCartType}) => {
      return <PaymentCartItem item={item} />;
    },
    [],
  );
  const keyExtractor = (item: GroupedPaymentCartType) =>
    `cart-flat-list-item-${item.coffeeId}`;

  return (
    <FlatList
      data={groupedPaymentCartList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{gap: 30}}
    />
  );
};

export default PaymentCartList;

import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {PaymentCardType, PaymentMethodType} from '../../api/apiPayment';
import PaymentCardItem from './PaymentCardItem';
import PaymentWallet from './PaymentWallet';

type PaymentMethodPropsType = {
  paymentMethod: PaymentMethodType;
};
const PaymentMethod = ({paymentMethod}: PaymentMethodPropsType) => {
  const renderItem = React.useCallback(
    ({item}: {item: PaymentCardType}) => {
      return <PaymentCardItem item={item} />;
    },
    [paymentMethod],
  );

  const keyExtractor = (item: PaymentCardType) => `payment-card-${item.id}`;
  const renderListFooterComponent = React.useCallback(() => {
    if (!paymentMethod) return;
    return <PaymentWallet wallet={paymentMethod.wallet} />;
  }, [paymentMethod]);
  return (
    <FlatList
      data={paymentMethod.cards}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderListFooterComponent}
      contentContainerStyle={{alignItems: 'center', gap: 10}}
    />
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({});

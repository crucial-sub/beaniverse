import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {PaymentMethodType, getPaymentMethod} from '../api/apiPayment';
import HeaderWithoutBottomTab from '../components/Header/HeaderWithoutBottomTab';
import OrderSuccess from '../components/Payment/OrderSuccess';
import PaymentBottom from '../components/Payment/PaymentBottom';
import PaymentMethod from '../components/Payment/PaymentMethod';
import {useResetCartAndOrderState} from '../hooks/useResetCartAndOrderState';
import {
  SelectedPaymentMethodType,
  orderSuccessState,
  selectedPaymentMethodState,
} from '../recoil';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

const PaymentScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useRecoilState(
    selectedPaymentMethodState,
  );
  const orderSuccess = useRecoilValue(orderSuccessState);
  const navigation = useNavigation();
  const resetStates = useResetCartAndOrderState();
  const {
    data: paymentMethod,
    isLoading,
    isSuccess,
  } = useQuery<PaymentMethodType, Error>({
    queryKey: ['get-payment-method'],
    queryFn: getPaymentMethod,
    staleTime: 5 * 60 * 1000,
  });

  React.useEffect(() => {
    if (!paymentMethod || selectedPaymentMethod) return;
    const initialPaymentMethod: SelectedPaymentMethodType = paymentMethod.cards
      ? {
          methodType: 'CREDIT_CARD',
          creditCardId: paymentMethod.cards[0].id,
        }
      : {
          methodType: 'WALLET',
        };
    setSelectedPaymentMethod(initialPaymentMethod);
  }, [isSuccess]);

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
    paymentMethod && (
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.Container}>
          <HeaderWithoutBottomTab title="payment" />
          {orderSuccess ? (
            <OrderSuccess />
          ) : (
            <PaymentMethod paymentMethod={paymentMethod} />
          )}
          <PaymentBottom walletBalance={paymentMethod.wallet.balance} />
        </View>
      </SafeAreaView>
    )
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  Container: {
    flex: 1,
    gap: 30,
    paddingBottom: 90,
    alignItems: 'center',
  },
  Title: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    height: 36,
    lineHeight: 36,
  },
});

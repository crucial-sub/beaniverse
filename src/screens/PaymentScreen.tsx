import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {PaymentMethodType, getPaymentMethod} from '../api/apiPayment';
import PaymentBottom from '../components/Payment/PaymentBottom';
import PaymentMethod from '../components/Payment/PaymentMethod';
import {PaymentCartType, paymentCartListState} from '../recoil';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

const PaymentScreen = () => {
  const [paymentCartList, setPaymentCartList] =
    useRecoilState<PaymentCartType[]>(paymentCartListState);
  const {data: paymentMethod, isLoading} = useQuery<PaymentMethodType, Error>({
    queryKey: ['get-payment-method'],
    queryFn: getPaymentMethod,
    staleTime: 5 * 60 * 1000,
  });

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
          <Text style={styles.Title}>Payment</Text>
          <PaymentMethod paymentMethod={paymentMethod} />
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
    paddingBottom: 50,
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

import {CommonActions, useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {paymentOrder} from '../../api/apiPayment';
import {RootNavigationProp} from '../../navigators/navigation';
import {
  orderSuccessState,
  paymentCartListState,
  selectedPaymentMethodState,
  totalPriceState,
} from '../../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';

type PaymentBottomPropsType = {
  walletBalance: number;
};

const PaymentBottom = ({walletBalance}: PaymentBottomPropsType) => {
  const selectedPaymentMethod = useRecoilValue(selectedPaymentMethodState);
  const paymentCart = useRecoilValue(paymentCartListState).map(item => ({
    coffeeId: item.coffeeId,
    optionId: item.optionId,
    quantity: item.quantity,
  }));
  const totalPrice = useRecoilValue(totalPriceState).toFixed(2);
  const payableState = !(
    selectedPaymentMethod?.methodType === 'WALLET' &&
    Number(totalPrice) > walletBalance
  );
  const [orderSuccess, setOrderSuccess] = useRecoilState(orderSuccessState);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: paymentOrder,
    onSuccess: () => {
      setOrderSuccess(true);
      queryClient.invalidateQueries({queryKey: ['get-order-history']});
    },
    onError: error => {
      throw new Error(error.message);
    },
  });

  const handleOrderRequest = () => {
    if (!selectedPaymentMethod) return;
    const body = {
      cart: paymentCart.filter(item => item.quantity !== 0),
      paymentMethod: selectedPaymentMethod?.methodType,
      creditCardId:
        selectedPaymentMethod.methodType === 'CREDIT_CARD'
          ? selectedPaymentMethod.creditCardId
          : undefined,
    };
    mutation.mutate(body);
  };

  const navigation = useNavigation<RootNavigationProp>();

  const handleGoToOrderHistory = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Tab'}, {name: 'OrderHistory'}],
      }),
    );
  };

  return (
    <View style={styles.BottomWrapper}>
      {orderSuccess ? (
        <TouchableOpacity
          style={styles.OrderHistoryButton}
          onPress={handleGoToOrderHistory}>
          <Text style={styles.ButtonText}>Order History</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.PriceWrapper}>
            <Text style={styles.PriceTitle}>Total Price</Text>
            <View style={styles.PriceTextWrapper}>
              <Text style={styles.DollarSign}>$ </Text>
              <Text style={styles.PriceText}>{totalPrice}</Text>
            </View>
          </View>
          {payableState ? (
            <TouchableOpacity
              style={styles.PayButton}
              onPress={handleOrderRequest}>
              <Text style={styles.ButtonText}>{`Pay from ${
                selectedPaymentMethod?.methodType === 'CREDIT_CARD'
                  ? 'Credit Card'
                  : 'Wallet'
              }`}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.InActiveButton} disabled>
              <Text style={styles.ButtonText}>Insufficient Balance</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default PaymentBottom;

const styles = StyleSheet.create({
  BottomWrapper: {
    position: 'absolute',
    width: '100%',
    height: SPACING.space_60,
    bottom: 0,
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
  PayButton: {
    width: 240,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InActiveButton: {
    width: 240,
    backgroundColor: COLORS.secondarySilverGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  OrderHistoryButton: {
    width: '100%',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

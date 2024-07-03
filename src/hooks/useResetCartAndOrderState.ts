import {useSetRecoilState} from 'recoil';
import {orderSuccessState, paymentCartListState} from '../recoil';

export const useResetCartAndOrderState = () => {
  const setPaymentCartList = useSetRecoilState(paymentCartListState);
  const setOrderSuccess = useSetRecoilState(orderSuccessState);

  const resetStates = () => {
    setPaymentCartList([]);
    setOrderSuccess(false);
  };

  return resetStates;
};

import {PaymentCartType} from '../recoil';
import apiClient from './apiClient';

export interface PaymentMethodType {
  cards: PaymentCardType[];
  wallet: PaymentWalletType;
}

export interface PaymentCardType {
  card_number: number;
  card_type: string;
  created_at: string;
  expiry_date: string;
  holder_id: number;
  holder_name: string;
  id: number;
}
export interface PaymentWalletType {
  balance: number;
  created_at: string;
  id: number;
  updated_at: string;
  user_id: number;
}

export const getPaymentMethod = async (): Promise<PaymentMethodType> => {
  try {
    const {data} = await apiClient.get('payment/methods');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export interface OrderRequest {
  cart: PaymentCartType[];
  paymentMethod: SelectedPaymentCategoryType;
  creditCardId?: number;
}

export type SelectedPaymentCategoryType = 'WALLET' | 'CREDIT_CARD';

export const order = async (req: OrderRequest): Promise<any> => {
  const {data} = await apiClient.post<any>('payment/order', req);

  return data;
};

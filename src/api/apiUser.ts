import {UserType} from '../recoil';
import apiClient from './apiClient';
import {PaymentCategoryType} from './apiPayment';

export const getUser = async (): Promise<UserType | null> => {
  try {
    const {data} = await apiClient.get('user/me');
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export interface OrderHistoryType {
  createdAt: string;
  id: number;
  orderGroupByCoffeeId: OrderGroupByCoffeeIdType;
  paymentMethod: PaymentCategoryType;
  totalPrice: number;
}

export interface OrderGroupByCoffeeIdType {
  [key: string]: CoffeeOrderType;
}

export interface CoffeeOrderType {
  imageUrl: string;
  name: string;
  options: CoffeeOptionType[];
}

export interface CoffeeOptionType {
  option: string;
  quantity: number;
}

export const getOrderHistory = async (): Promise<OrderHistoryType[]> => {
  try {
    const {data} = await apiClient.get('user/me/orders');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavorites = async (): Promise<any> => {
  try {
    const {data} = await apiClient.get('user/me/favorites');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editFavorites = async (coffeeId: number) => {
  const {data} = await apiClient.post(`user/me/favorites/${coffeeId}`);

  return data;
};

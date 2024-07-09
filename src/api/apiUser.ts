import {UserType} from '../recoil';
import apiClient from './apiClient';
import {PaymentCategoryType} from './apiPayment';

export const getUser = async (): Promise<UserType | null> => {
  try {
    const {data} = await apiClient.get('user/me');
    return data;
  } catch (error) {
    console.error(error);
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

export interface FavoritesType {
  category: string | null;
  id: number;
  imageUrl: string;
  isFavorite: boolean;
  name: string;
  origin: string;
  price: number;
  rating: {average: number; total: number};
  roastType: string;
  type: 'COFFEE' | 'COFFEE_BEAN';
}

export const getFavorites = async (): Promise<FavoritesType[]> => {
  try {
    const {data} = await apiClient.get('user/me/favorites');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editFavorites = async (coffeeId: number) => {
  try {
    const {data} = await apiClient.post(`user/me/favorite/${coffeeId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchProfile = async (data: FormData) => {
  await apiClient.patch('user/me', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

import {atom, selector} from 'recoil';
import {SelectedPaymentCategoryType} from '../api/apiPayment';

export const isLoginState = atom<boolean>({
  key: 'isLoginState',
  default: false,
});

export interface UserType {
  email: string;
  id: number;
  profileImage: string;
  user_name: string;
}

export const userState = atom<UserType | null>({
  key: 'user-state',
  default: null,
});

export interface CoffeeAndBeansType {
  category: {id: number; name: string} | null;
  id: number;
  imageUrl: string;
  isFavorite: boolean;
  name: string;
  origin: {country: string; id: number};
  price: number;
  rating: number;
  roastType: {id: number; name: string};
  type: 'COFFEE' | 'COFFEE_BEAN';
}

export const coffeeListState = atom<CoffeeAndBeansType[] | null>({
  key: 'coffee-list-state',
  default: null,
});

export const beansState = atom<CoffeeAndBeansType[] | null>({
  key: 'beans-state',
  default: null,
});

export const searchTextState = atom({
  key: 'search-text-state',
  default: '',
});

export interface CoffeeCategoryType {
  id: number;
  name: string;
}

export const coffeeCategoriesState = atom<CoffeeCategoryType[] | null>({
  key: 'coffee-categories-state',
  default: null,
});

export const selectedCoffeeCategoryState = atom({
  key: 'selected-coffee-category-state',
  default: 'all',
});

export interface PaymentCartType {
  coffeeId: number;
  optionId: number;
  quantity: number;
  price: number;
}

export const paymentCartListState = atom<PaymentCartType[]>({
  key: 'payment-cart-list-state',
  default: [],
});

export const totalPriceState = selector({
  key: 'total-price-state',
  get: ({get}) => {
    const paymentCartList = get(paymentCartListState);
    let totalPrice = 0;
    paymentCartList.forEach(item => (totalPrice += item.price * item.quantity));
    return totalPrice;
  },
});

export interface SelectedPaymentMethodType {
  methodType: SelectedPaymentCategoryType;
  creditCardId?: number;
}

export const selectedPaymentMethodState =
  atom<SelectedPaymentMethodType | null>({
    key: 'selected-payment-method-state',
    default: null,
  });

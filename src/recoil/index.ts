import {atom, selector} from 'recoil';
import {PaymentCartType, PaymentCategoryType} from '../api/apiPayment';
import {editFavorites, getFavorites} from '../api/apiUser';

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

export interface PaymentCartStateType extends PaymentCartType {
  price: number;
}

export const paymentCartListState = atom<PaymentCartStateType[]>({
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
  methodType: PaymentCategoryType;
  creditCardId?: number;
}

export const selectedPaymentMethodState =
  atom<SelectedPaymentMethodType | null>({
    key: 'selected-payment-method-state',
    default: null,
  });

export const orderSuccessState = atom({
  key: 'payment-success-state',
  default: false,
});

export const favoritesState = atom<number[]>({
  key: 'favoritesState',
  default: selector({
    key: 'favoritesState/default',
    get: async () => {
      try {
        const data = await getFavorites();
        return data.map((item: any) => item.coffeeId);
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  }),
});

export const toggleFavorite = async (coffeeId: number, setFavorites: any) => {
  try {
    await editFavorites(coffeeId);
    setFavorites((prevFavorites: number[]) =>
      prevFavorites.includes(coffeeId)
        ? prevFavorites.filter(id => id !== coffeeId)
        : [...prevFavorites, coffeeId],
    );
  } catch (error) {
    console.error(error);
  }
};

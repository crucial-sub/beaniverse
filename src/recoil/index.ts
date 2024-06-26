import {atom} from 'recoil';

export const accessTokenState = atom({
  key: 'access-token-state',
  default: '',
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

export interface CoffeeAndBeansDetailType extends CoffeeAndBeansType {
  ratingCount: number;
  options: {
    id: number;
    size: string;
    price: number;
  }[];
  description: string;
}

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
}

export const paymentCartListState = atom<PaymentCartType[]>({
  key: 'payment-cart-list-state',
  default: [],
});

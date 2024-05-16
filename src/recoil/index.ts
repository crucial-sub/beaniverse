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

export interface CoffeeType {
  category: {id: number; name: string};
  id: number;
  imageUrl: string;
  isFavorite: boolean;
  name: string;
  origin: {country: string; id: number};
  price: number;
  rating: number;
  roastType: {id: number; name: string};
  type: 'COFFEE';
}

export const coffeeListState = atom<CoffeeType[] | null>({
  key: 'coffee-list-state',
  default: null,
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

export interface CoffeeBeanType {
  category: null;
  id: number;
  imageUrl: string;
  isFavorite: boolean;
  name: string;
  origin: {country: string; id: number};
  price: number;
  rating: number;
  roastType: {id: number; name: string};
  type: 'COFFEE_BEAN';
}

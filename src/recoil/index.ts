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
  type: string;
}

export const coffeeListState = atom<CoffeeType[] | null>({
  key: 'coffee-list-state',
  default: null,
});

import {atom, selector} from 'recoil';
import {DETAIL_SAMPLE} from '../data';

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

export const totalPriceState = selector({
  key: 'total-price-state',
  get: async ({get}) => {
    const paymentCartList = get(paymentCartListState);
    let totalPrice = 0;

    for (const item of paymentCartList) {
      // const coffeeDetail = await getCoffeeDetails(item.coffeeId);
      const coffeeDetail = await DETAIL_SAMPLE[item.coffeeId - 1];

      const option = coffeeDetail.options.find(opt => opt.id === item.optionId);
      const price = option ? option.price : 0;
      totalPrice += price * item.quantity;
    }

    return totalPrice;
  },
});

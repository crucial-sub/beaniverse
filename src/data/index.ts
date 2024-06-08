import {
  CoffeeAndBeansDetailType,
  CoffeeAndBeansType,
  CoffeeCategoryType,
  UserType,
} from '../recoil';

export const COFFEEANDBEANS_SAMPLE: CoffeeAndBeansType[] = [
  {
    category: {id: 1, name: 'category1'},
    id: 1,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee1',
    origin: {country: 'country1', id: 1},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 1, name: 'roast1'},
    type: 'COFFEE',
  },
  {
    category: {id: 2, name: 'category2'},
    id: 2,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee2',
    origin: {country: 'country2', id: 2},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 2, name: 'roast2'},
    type: 'COFFEE',
  },
  {
    category: {id: 3, name: 'category3'},
    id: 3,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee3',
    origin: {country: 'country3', id: 3},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 3, name: 'roast3'},
    type: 'COFFEE',
  },
  {
    category: {id: 4, name: 'category4'},
    id: 4,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee4',
    origin: {country: 'country4', id: 4},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 4, name: 'roast4'},
    type: 'COFFEE',
  },
  {
    category: {id: 5, name: 'category5'},
    id: 5,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee5',
    origin: {country: 'country5', id: 5},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 5, name: 'roast5'},
    type: 'COFFEE',
  },
  {
    category: null,
    id: 6,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean1',
    origin: {country: 'country1', id: 1},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 1, name: 'roast1'},
    type: 'COFFEE_BEAN',
  },
  {
    category: null,
    id: 7,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean2',
    origin: {country: 'country2', id: 2},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 2, name: 'roast2'},
    type: 'COFFEE_BEAN',
  },
  {
    category: null,
    id: 8,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean3',
    origin: {country: 'country3', id: 3},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 3, name: 'roast3'},
    type: 'COFFEE_BEAN',
  },
  {
    category: null,
    id: 9,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean4',
    origin: {country: 'country4', id: 4},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 4, name: 'roast4'},
    type: 'COFFEE_BEAN',
  },
  {
    category: null,
    id: 10,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean5',
    origin: {country: 'country5', id: 5},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 5, name: 'roast5'},
    type: 'COFFEE_BEAN',
  },
];

export const USER_SAMPLE: UserType = {
  email: 'amgona94@naver.com',
  id: 1,
  profileImage:
    'https://github.com/crucial-sub/odot/assets/87363422/35768867-7237-406e-88fb-0aebca19416e',
  user_name: 'amgona',
};

export const CATEGORIES_SAMPLE: CoffeeCategoryType[] = [
  {
    id: 1,
    name: 'category1',
  },
  {
    id: 2,
    name: 'category2',
  },
  {
    id: 3,
    name: 'category3',
  },
  {
    id: 4,
    name: 'category4',
  },
  {
    id: 5,
    name: 'category5',
  },
];

export const DETAIL_SAMPLE: CoffeeAndBeansDetailType[] = [
  {
    category: {id: 1, name: 'category1'},
    id: 1,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee1',
    origin: {country: 'country1', id: 1},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 1, name: 'roast1'},
    type: 'COFFEE',
    option: [
      {id: 1, size: 'S', price: 10.5},
      {id: 2, size: 'M', price: 21},
      {id: 3, size: 'L', price: 31.5},
    ],
  },
  {
    category: {id: 2, name: 'category2'},
    id: 2,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee2',
    origin: {country: 'country2', id: 2},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 2, name: 'roast2'},
    type: 'COFFEE',
    option: [
      {id: 1, size: 'S', price: 10.5},
      {id: 2, size: 'M', price: 21},
      {id: 3, size: 'L', price: 31.5},
    ],
  },
  {
    category: {id: 3, name: 'category3'},
    id: 3,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee3',
    origin: {country: 'country3', id: 3},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 3, name: 'roast3'},
    type: 'COFFEE',
    option: [
      {id: 1, size: 'S', price: 10.5},
      {id: 2, size: 'M', price: 21},
      {id: 3, size: 'L', price: 31.5},
    ],
  },
  {
    category: {id: 4, name: 'category4'},
    id: 4,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee4',
    origin: {country: 'country4', id: 4},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 4, name: 'roast4'},
    type: 'COFFEE',
    option: [
      {id: 1, size: 'S', price: 10.5},
      {id: 2, size: 'M', price: 21},
      {id: 3, size: 'L', price: 31.5},
    ],
  },
  {
    category: {id: 5, name: 'category5'},
    id: 5,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/d79a37ba-a024-4481-9f24-71ba94015d01',
    isFavorite: false,
    name: 'coffee5',
    origin: {country: 'country5', id: 5},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 5, name: 'roast5'},
    type: 'COFFEE',
    option: [
      {id: 1, size: 'S', price: 10.5},
      {id: 2, size: 'M', price: 21},
      {id: 3, size: 'L', price: 31.5},
    ],
  },
  {
    category: null,
    id: 6,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean1',
    origin: {country: 'country1', id: 1},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 1, name: 'roast1'},
    type: 'COFFEE_BEAN',
    option: [
      {id: 1, size: '250gm', price: 10.5},
      {id: 2, size: '500gm', price: 21},
      {id: 3, size: '1000gm', price: 31.5},
    ],
  },
  {
    category: null,
    id: 7,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean2',
    origin: {country: 'country2', id: 2},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 2, name: 'roast2'},
    type: 'COFFEE_BEAN',
    option: [
      {id: 1, size: '250gm', price: 10.5},
      {id: 2, size: '500gm', price: 21},
      {id: 3, size: '1000gm', price: 31.5},
    ],
  },
  {
    category: null,
    id: 8,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean3',
    origin: {country: 'country3', id: 3},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 3, name: 'roast3'},
    type: 'COFFEE_BEAN',
    option: [
      {id: 1, size: '250gm', price: 10.5},
      {id: 2, size: '500gm', price: 21},
      {id: 3, size: '1000gm', price: 31.5},
    ],
  },
  {
    category: null,
    id: 9,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean4',
    origin: {country: 'country4', id: 4},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 4, name: 'roast4'},
    type: 'COFFEE_BEAN',
    option: [
      {id: 1, size: '250gm', price: 10.5},
      {id: 2, size: '500gm', price: 21},
      {id: 3, size: '1000gm', price: 31.5},
    ],
  },
  {
    category: null,
    id: 10,
    imageUrl:
      'https://github.com/crucial-sub/odot/assets/87363422/dfdf7b08-f256-4b53-aa3b-210afe3614b7',
    isFavorite: false,
    name: 'bean5',
    origin: {country: 'country5', id: 5},
    price: 10.5,
    rating: 4.5,
    roastType: {id: 5, name: 'roast5'},
    type: 'COFFEE_BEAN',
    option: [
      {id: 1, size: '250gm', price: 10.5},
      {id: 2, size: '500gm', price: 21},
      {id: 3, size: '1000gm', price: 31.5},
    ],
  },
];

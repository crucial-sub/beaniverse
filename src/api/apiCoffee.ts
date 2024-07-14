import {CoffeeAndBeansType, CoffeeCategoryType} from '../recoil';
import apiClient from './apiClient';

export const getCoffeeAndBeans = async (): Promise<
  CoffeeAndBeansType[] | null
> => {
  try {
    const {data} = await apiClient.get('coffee/');
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCoffeeCategories = async (): Promise<
  CoffeeCategoryType[] | null
> => {
  try {
    const {data} = await apiClient.get('coffee/categories');
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export interface CoffeeAndBeansDetailType {
  category: {id: number; name: string} | null;
  description: string;
  id: number;
  imageUrl: string;
  isFavorite: boolean;
  name: string;
  options: {
    id: number;
    option: string;
    price: number;
  }[];
  origin: {country: string; id: number};
  rating: {average: number; total: number};
  roastType: {id: number; name: string};
  type: 'COFFEE' | 'COFFEE_BEAN';
}

export const getCoffeeDetails = async (
  id: number,
): Promise<CoffeeAndBeansDetailType> => {
  try {
    const {data} = await apiClient.get<CoffeeAndBeansDetailType>(
      `coffee/${id}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Network response was not ok');
  }
};

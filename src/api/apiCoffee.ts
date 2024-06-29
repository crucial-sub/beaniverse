import {
  CoffeeAndBeansDetailType,
  CoffeeAndBeansType,
  CoffeeCategoryType,
} from '../recoil';
import apiClient from './apiClient';

export const getCoffeeAndBeans = async (): Promise<
  CoffeeAndBeansType[] | null
> => {
  try {
    const {data} = await apiClient.get('coffee/');
    return data;
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return null;
  }
};

export const getCoffeeDetails = async (
  id: number,
): Promise<CoffeeAndBeansDetailType | null> => {
  try {
    const {data} = await apiClient.get(`coffee/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

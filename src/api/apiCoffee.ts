import apiClient from './apiClient';

export const getCoffeeAndBeans = async () => {
  try {
    const {data} = await apiClient.get('coffee/');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoffeeCategories = async () => {
  try {
    const {data} = await apiClient.get('coffee/categories');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoffeeDetails = async (id: number) => {
  try {
    const {data} = await apiClient.get(`coffee/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

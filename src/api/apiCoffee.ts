import apiClient from './apiClient';

export const getCoffeeList = async (accessToken: string) => {
  try {
    const {data} = await apiClient.get('coffee/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoffeeCategories = async (accessToken: string) => {
  try {
    const {data} = await apiClient.get('coffee/categories', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCoffeeDetails = async (accessToken: string, id: number) => {
  try {
    const {data} = await apiClient.get(`coffee/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

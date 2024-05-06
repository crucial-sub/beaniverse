import apiClient from './apiClient';

export const getCoffee = async (accessToken: string) => {
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

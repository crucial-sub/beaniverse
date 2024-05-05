import apiClient from './apiClient';

export const getUser = async (accessToken: string) => {
  try {
    const {data} = await apiClient.get('user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

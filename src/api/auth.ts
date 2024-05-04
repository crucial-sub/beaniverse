import apiClient from './apiClient';

export const signIn = async (email: string, password: string) => {
  try {
    const {data} = await apiClient.post('auth/login', {
      email,
      password,
    });

    return data;
  } catch (error) {
    return {accessToken: null};
  }
};

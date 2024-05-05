import apiClient from './apiClient';

export const signIn = async (email: string, password: string) => {
  try {
    const {
      data: {accessToken},
    } = await apiClient.post('auth/login', {
      email,
      password,
    });

    return accessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

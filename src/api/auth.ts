import apiClient from './apiClient';

export const signIn = async (email: string, password: string) => {
  const {data} = await apiClient.post('auth/login', {
    email,
    password,
  });

  return data;
};

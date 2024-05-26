import apiClient, {setAuthHeader} from './apiClient';

export const signIn = async (email: string, password: string) => {
  try {
    const {
      data: {accessToken},
    } = await apiClient.post('auth/login', {
      email,
      password,
    });

    setAuthHeader(accessToken);

    return accessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
